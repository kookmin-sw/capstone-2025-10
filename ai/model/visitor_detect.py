import torch.nn as nn
import torchvision.models as models
from torchvision.models import efficientnet_b0, EfficientNet_B0_Weights
from torchvision.models._api import WeightsEnum
from torch.hub import load_state_dict_from_url

def get_state_dict(self, *args, **kwargs):
    kwargs.pop("check_hash", None)
    return load_state_dict_from_url(self.url, *args, **kwargs)
WeightsEnum.get_state_dict = get_state_dict

efficientnet_b0(weights=EfficientNet_B0_Weights.IMAGENET1K_V1)
efficientnet_b0(weights="DEFAULT")

class MultiTaskEfficientNet(nn.Module):
    def __init__(self, num_gender_classes=2, num_age_groups=6):
        super(MultiTaskEfficientNet, self).__init__()
        weights = EfficientNet_B0_Weights.DEFAULT
        self.backbone = models.efficientnet_b0(weights=weights)
        num_features = self.backbone.classifier[1].in_features
        # EfficientNet의 classifier 제거 및 global average pooling 사용 (이미 EfficientNet은 글로벌 풀링 포함)
        self.backbone.classifier = nn.Identity()
        
        # 성별 분류 헤드 (변경 없음)
        self.gender_head = nn.Sequential(
            nn.Linear(num_features, 128),
            nn.ReLU(),
            nn.Linear(128, num_gender_classes)
        )
        # 나이 분류 헤드 강화: 추가 레이어, BatchNorm, Dropout 적용
        self.age_head = nn.Sequential(
            nn.Linear(num_features, 256),
            nn.BatchNorm1d(256),
            nn.ReLU(),
            nn.Dropout(0.45),  # 논문에서 dropout rate 0.45 적용
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, num_age_groups)
        )
        
    def forward(self, x):
        features = self.backbone(x)
        gender_logits = self.gender_head(features)
        age_logits = self.age_head(features)
        return gender_logits, age_logits