# Ultralytics YOLO 🚀, GPL-3.0 license

import json
import time
from collections import deque

import cv2
import hydra
import numpy as np
import torch
import torch.nn.functional as F
from kafka import KafkaProducer
from numpy import random
from torchvision import transforms
from ultralytics.yolo.engine.predictor import BasePredictor
from ultralytics.yolo.utils import DEFAULT_CONFIG, ROOT, ops
from ultralytics.yolo.utils.checks import check_imgsz
from ultralytics.yolo.utils.plotting import Annotator

palette = (2 ** 11 - 1, 2 ** 15 - 1, 2 ** 20 - 1)
data_deque = {}

deepsort = None


def init_tracker():
    from config import cfg as base_cfg, merge_from_file
    from deep_sort_pytorch.deep_sort import DeepSort
    from deep_sort_pytorch.utils.parser import get_config
    from models import build_model

    global deepsort
    cfg_deep = get_config()
    cfg_deep.merge_from_file("deep_sort_pytorch/configs/deep_sort.yaml")

    deepsort = DeepSort(cfg_deep.DEEPSORT.REID_CKPT,
                        max_dist=cfg_deep.DEEPSORT.MAX_DIST, min_confidence=cfg_deep.DEEPSORT.MIN_CONFIDENCE,
                        nms_max_overlap=cfg_deep.DEEPSORT.NMS_MAX_OVERLAP,
                        max_iou_distance=cfg_deep.DEEPSORT.MAX_IOU_DISTANCE,
                        max_age=cfg_deep.DEEPSORT.MAX_AGE, n_init=cfg_deep.DEEPSORT.N_INIT,
                        nn_budget=cfg_deep.DEEPSORT.NN_BUDGET,
                        use_cuda=True)


    # ---------- APGCC 모델 로드 ----------
    global apgcc_model
    global device_apgcc

    cfg_apgcc = merge_from_file(base_cfg, "./configs/SHHA_test.yml")
    cfg_apgcc.test = True
    apgcc_model = build_model(cfg_apgcc, training=False)
    apgcc_model.load_state_dict(torch.load("./SHHA_best.pth", map_location='cpu'))
    apgcc_model.eval()
    device_apgcc = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    apgcc_model.to(device_apgcc)

    global transform
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

def resize_and_pad(image, max_len=1024, block=128):
    orig_h, orig_w = image.shape[:2]
    scale = min(max_len / orig_h, max_len / orig_w)
    new_w = int(orig_w * scale)
    new_h = int(orig_h * scale)
    image_resized = cv2.resize(image, (new_w, new_h))
    pad_h = ((new_h - 1) // block + 1) * block - new_h
    pad_w = ((new_w - 1) // block + 1) * block - new_w
    padded_image = np.zeros((new_h + pad_h, new_w + pad_w, 3), dtype=image_resized.dtype)
    padded_image[:new_h, :new_w, :] = image_resized
    return padded_image, (new_h, new_w), (orig_h, orig_w), scale

@torch.no_grad()
def inference_and_restore(model, device, frame_rgb, threshold=0.5):
    padded_image, (new_h, new_w), _, scale = resize_and_pad(frame_rgb)
    input_tensor = transform(padded_image).unsqueeze(0).to(device)
    output = model(input_tensor)
    scores = F.softmax(output['pred_logits'], dim=-1)[0, :, 1]
    points = output['pred_points'][0][scores > threshold].detach().cpu().numpy()
    points[:, 0] = np.clip(points[:, 0], 0, new_w - 1) / scale
    points[:, 1] = np.clip(points[:, 1], 0, new_h - 1) / scale
    return points.tolist()


def xyxy_to_xywh(*xyxy):
    """" Calculates the relative bounding box from absolute pixel values. """
    bbox_left = min([xyxy[0].item(), xyxy[2].item()])
    bbox_top = min([xyxy[1].item(), xyxy[3].item()])
    bbox_w = abs(xyxy[0].item() - xyxy[2].item())
    bbox_h = abs(xyxy[1].item() - xyxy[3].item())
    x_c = (bbox_left + bbox_w / 2)
    y_c = (bbox_top + bbox_h / 2)
    w = bbox_w
    h = bbox_h
    return x_c, y_c, w, h

def xyxy_to_tlwh(bbox_xyxy):
    tlwh_bboxs = []
    for i, box in enumerate(bbox_xyxy):
        x1, y1, x2, y2 = [int(i) for i in box]
        top = x1
        left = y1
        w = int(x2 - x1)
        h = int(y2 - y1)
        tlwh_obj = [top, left, w, h]
        tlwh_bboxs.append(tlwh_obj)
    return tlwh_bboxs

def compute_color_for_labels(label):
    """
    Simple function that adds fixed color depending on the class
    """
    if label == 0: #person
        color = (85,45,255)
    elif label == 2: # Car
        color = (222,82,175)
    elif label == 3:  # Motobike
        color = (0, 204, 255)
    elif label == 5:  # Bus
        color = (0, 149, 255)
    else:
        color = [int((p * (label ** 2 - label + 1)) % 255) for p in palette]
    return tuple(color)

def draw_border(img, pt1, pt2, color, thickness, r, d):
    x1,y1 = pt1
    x2,y2 = pt2
    # Top left
    cv2.line(img, (x1 + r, y1), (x1 + r + d, y1), color, thickness)
    cv2.line(img, (x1, y1 + r), (x1, y1 + r + d), color, thickness)
    cv2.ellipse(img, (x1 + r, y1 + r), (r, r), 180, 0, 90, color, thickness)
    # Top right
    cv2.line(img, (x2 - r, y1), (x2 - r - d, y1), color, thickness)
    cv2.line(img, (x2, y1 + r), (x2, y1 + r + d), color, thickness)
    cv2.ellipse(img, (x2 - r, y1 + r), (r, r), 270, 0, 90, color, thickness)
    # Bottom left
    cv2.line(img, (x1 + r, y2), (x1 + r + d, y2), color, thickness)
    cv2.line(img, (x1, y2 - r), (x1, y2 - r - d), color, thickness)
    cv2.ellipse(img, (x1 + r, y2 - r), (r, r), 90, 0, 90, color, thickness)
    # Bottom right
    cv2.line(img, (x2 - r, y2), (x2 - r - d, y2), color, thickness)
    cv2.line(img, (x2, y2 - r), (x2, y2 - r - d), color, thickness)
    cv2.ellipse(img, (x2 - r, y2 - r), (r, r), 0, 0, 90, color, thickness)

    cv2.rectangle(img, (x1 + r, y1), (x2 - r, y2), color, -1, cv2.LINE_AA)
    cv2.rectangle(img, (x1, y1 + r), (x2, y2 - r - d), color, -1, cv2.LINE_AA)

    cv2.circle(img, (x1 +r, y1+r), 2, color, 12)
    cv2.circle(img, (x2 -r, y1+r), 2, color, 12)
    cv2.circle(img, (x1 +r, y2-r), 2, color, 12)
    cv2.circle(img, (x2 -r, y2-r), 2, color, 12)

    return img

def UI_box(x, img, color=None, label=None, line_thickness=None):
    # Plots one bounding box on image img
    tl = line_thickness or round(0.002 * (img.shape[0] + img.shape[1]) / 2) + 1  # line/font thickness
    color = color or [random.randint(0, 255) for _ in range(3)]
    c1, c2 = (int(x[0]), int(x[1])), (int(x[2]), int(x[3]))
    cv2.rectangle(img, c1, c2, color, thickness=tl, lineType=cv2.LINE_AA)
    if label:
        tf = max(tl - 1, 1)  # font thickness
        t_size = cv2.getTextSize(label, 0, fontScale=tl / 3, thickness=tf)[0]

        img = draw_border(img, (c1[0], c1[1] - t_size[1] -3), (c1[0] + t_size[0], c1[1]+3), color, 1, 8, 2)

        cv2.putText(img, label, (c1[0], c1[1] - 2), 0, tl / 3, [225, 255, 255], thickness=tf, lineType=cv2.LINE_AA)



def draw_boxes(img, bbox, names,object_id, identities=None, offset=(0, 0)):
    #cv2.line(img, line[0], line[1], (46,162,112), 3)

    height, width, _ = img.shape
    # remove tracked point from buffer if object is lost
    for key in list(data_deque):
      if key not in identities:
        data_deque.pop(key)

    for i, box in enumerate(bbox):
        x1, y1, x2, y2 = [int(i) for i in box]
        x1 += offset[0]
        x2 += offset[0]
        y1 += offset[1]
        y2 += offset[1]

        # code to find center of bottom edge
        center = (int((x2+x1)/ 2), int((y2+y2)/2))

        # get ID of object
        id = int(identities[i]) if identities is not None else 0

        # create new buffer for new object
        if id not in data_deque:
          data_deque[id] = deque(maxlen= 64)
        color = compute_color_for_labels(object_id[i])
        obj_name = names[object_id[i]]
        label = '{}{:d}'.format("", id) + ":"+ '%s' % (obj_name)

        # add center to buffer
        data_deque[id].appendleft(center)
        UI_box(box, img, label=label, color=color, line_thickness=2)
        # draw trail
        for i in range(1, len(data_deque[id])):
            # check if on buffer value is none
            if data_deque[id][i - 1] is None or data_deque[id][i] is None:
                continue
            # generate dynamic thickness of trails
            thickness = int(np.sqrt(64 / float(i + i)) * 1.5)
            # draw trails
            cv2.line(img, data_deque[id][i - 1], data_deque[id][i], color, thickness)
    return img


class DetectionPredictor(BasePredictor):
    def __init__(self, cfg):
        super().__init__(cfg)
        self.producer = KafkaProducer(
            bootstrap_servers='192.168.219.101:9092',
            value_serializer=lambda v: json.dumps(v).encode('utf-8'),
        )


    def get_annotator(self, img):
        return Annotator(img, line_width=self.args.line_thickness, example=str(self.model.names))

    def preprocess(self, img):
        img = torch.from_numpy(img).to(self.model.device)
        img = img.half() if self.model.fp16 else img.float()  # uint8 to fp16/32
        img /= 255  # 0 - 255 to 0.0 - 1.0
        return img

    def postprocess(self, preds, img, orig_img):
        preds = ops.non_max_suppression(preds,
                                        self.args.conf,
                                        self.args.iou,
                                        agnostic=self.args.agnostic_nms,
                                        max_det=self.args.max_det)

        for i, pred in enumerate(preds):
            shape = orig_img[i].shape if self.webcam else orig_img.shape
            pred[:, :4] = ops.scale_boxes(img.shape[2:], pred[:, :4], shape).round()

        return preds

    def write_results(self, idx, preds, batch):
        p, im, im0 = batch
        all_outputs = []
        log_string = ""
        if len(im.shape) == 3:
            im = im[None]  # expand for batch dim
        self.seen += 1
        im0 = im0.copy()
        if self.webcam:  # batch_size >= 1
            log_string += f'{idx}: '
            frame = self.dataset.count
        else:
            frame = getattr(self.dataset, 'frame', 0)

        self.data_path = p
        save_path = str(self.save_dir / p.name)  # im.jpg
        self.txt_path = str(self.save_dir / 'labels' / p.stem) + ('' if self.dataset.mode == 'image' else f'_{frame}')
        log_string += '%gx%g ' % im.shape[2:]  # print string
        self.annotator = self.get_annotator(im0)

        det = preds[idx]
        all_outputs.append(det)
        if len(det) == 0:
            return log_string

        det = det[det[:, 5] == 0] # 사람 클래스인 0번만 남도록 필터링 !!!
        if len(det) == 0:
            return log_string

        for c in det[:, 5].unique():
            n = (det[:, 5] == c).sum()  # detections per class
            log_string += f"{n} {self.model.names[int(c)]}{'s' * (n > 1)}, "
        # write
        gn = torch.tensor(im0.shape)[[1, 0, 1, 0]]  # normalization gain whwh
        xywh_bboxs = []
        confs = []
        oids = []
        outputs = []
        for *xyxy, conf, cls in reversed(det):
            x_c, y_c, bbox_w, bbox_h = xyxy_to_xywh(*xyxy)
            xywh_obj = [x_c, y_c, bbox_w, bbox_h]
            xywh_bboxs.append(xywh_obj)
            confs.append([conf.item()])
            oids.append(int(cls))
        xywhs = torch.Tensor(xywh_bboxs)
        confss = torch.Tensor(confs)

        outputs = deepsort.update(xywhs, confss, oids, im0)
        if len(outputs) > 0:
            bbox_xyxy = outputs[:, :4]
            identities = outputs[:, -2]
            object_id = outputs[:, -1]

            draw_boxes(im0, bbox_xyxy, self.model.names, object_id,identities)

            batch_messages = []
#             print(bbox_xyxy, identities, object_id)

#             for i, box in enumerate(bbox_xyxy):
#                 x1, y1, x2, y2 = [int(i) for i in box]
#
#                 src_pts = np.float32([
#                     [756, 142],
#                     [936, 151],
#                     [0,   626],
#                     [1080, 724]
#                 ])
#
#                 bev_width, bev_height = 1080, 608
#                 dst_pts = np.float32([
#                     [0, 0],
#                     [bev_width, 0],
#                     [0, bev_height],
#                     [bev_width, bev_height]
#                 ])
#
#                 # 변환 행렬 계산
#                 M = cv2.getPerspectiveTransform(src_pts, dst_pts)
#
#
#                 visitor_points = [(int((x2+x1)/ 2), int((y2+y2)/2))]
#
#                 def transform_points(points, matrix):
#                     pts = np.float32(points).reshape(-1, 1, 2)
#                     transformed = cv2.perspectiveTransform(pts, matrix)
#                     return transformed.reshape(-1, 2)
#
#
#                 bev_points = transform_points(visitor_points, M)


#                 for i, (orig, transformed) in enumerate(zip(visitor_points, bev_points)):
#                     print(transformed[0])
#                 print(bev_points)
#                 tracking_message = {
#                     "type": "tracking",
#                     "payload": {
#                         "dashboardId": 1,
#                         "detectedTime": int(time.time() * 1000),
#                         "visitorLabel": int(identities[i]),
#                         "gridList": f"[[{bev_points[0][0]}, {bev_points[0][1]}]]"
#                     }
#                 }
#                 print(tracking_message)
#                 batch_messages.append(tracking_message)
#
#             for msg in batch_messages:
#                 self.producer.send("vision-data-topic", msg)
#
#             self.producer.flush()
#             명시적으로 flush할 수도 있음
        frame_rgb = cv2.cvtColor(im0, cv2.COLOR_BGR2RGB)
        points = inference_and_restore(apgcc_model, device_apgcc, frame_rgb)

        # 시각화
        for pt in points:
            cv2.circle(im0, (int(pt[0]), int(pt[1])), 3, (0, 0, 255), -1)

#         Kafka로 heatmap 메시지 전송
        src_pts = np.float32([
            [756, 142],
            [936, 151],
            [0,   626],
            [1080, 724]
        ])

        bev_width, bev_height = 1080, 608
        dst_pts = np.float32([
            [0, 0],
            [bev_width, 0],
            [0, bev_height],
            [bev_width, bev_height]
        ])

        # 변환 행렬 계산
        M = cv2.getPerspectiveTransform(src_pts, dst_pts)

        def transform_points(points, matrix):
            pts = np.float32(points).reshape(-1, 1, 2)
            transformed = cv2.perspectiveTransform(pts, matrix)
            return transformed.reshape(-1, 2)

        bev_points = transform_points(points, M)
        print(bev_points)
        heatmap_msg = {
            "type": "heatmap",
            "payload": {
                "dashboardId": 1,
                "detectedTime": int(time.time() * 1000),
                "gridList": json.dumps(bev_points.tolist())
            }
        }
        self.producer.send("vision-data-topic", heatmap_msg)
        print(heatmap_msg)
        self.producer.flush()
        return log_string


@hydra.main(version_base=None, config_path=str(DEFAULT_CONFIG.parent), config_name=DEFAULT_CONFIG.name)
def predict(cfg):
    init_tracker()
    cfg.model = cfg.model or "yolov8n.pt"
    cfg.imgsz = check_imgsz(cfg.imgsz, min_dim=2)  # check image size
    cfg.source = cfg.source if cfg.source is not None else ROOT / "assets"
    predictor = DetectionPredictor(cfg)
    predictor()


if __name__ == "__main__":
    predict()
