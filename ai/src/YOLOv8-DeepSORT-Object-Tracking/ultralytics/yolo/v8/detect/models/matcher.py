# Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved
"""
Hungarian Matcher for Crowd Counting (adapted from DETR).
"""
import torch
from scipy.optimize import linear_sum_assignment
from torch import nn

class HungarianMatcher_Crowd(nn.Module):
    def __init__(self, cost_class: float = 1, cost_point: float = 1):
        super().__init__()
        self.cost_class = cost_class
        self.cost_point = cost_point
        assert cost_class != 0 or cost_point != 0, "All costs can't be zero."

    @torch.no_grad()
    def forward(self, outputs, targets):
        bs, num_queries = outputs["pred_logits"].shape[:2]

        # Flatten predictions
        out_prob = outputs["pred_logits"].flatten(0, 1).softmax(-1)
        out_points = outputs["pred_points"].flatten(0, 1)

        # Concatenate target data
        tgt_ids = torch.cat([v["labels"] for v in targets])
        tgt_points = torch.cat([v["point"] for v in targets])

        # Compute classification and point costs
        cost_class = -out_prob[:, tgt_ids]
        cost_point = torch.cdist(out_points, tgt_points, p=2)

        # Final cost matrix
        C = self.cost_class * cost_class + self.cost_point * cost_point
        C = C.view(bs, num_queries, -1).cpu()

        sizes = [len(v["point"]) for v in targets]
        indices = [linear_sum_assignment(c[i]) for i, c in enumerate(C.split(sizes, -1))]

        return [(torch.as_tensor(i, dtype=torch.int64), torch.as_tensor(j, dtype=torch.int64)) for i, j in indices]

def build_matcher_crowd(cfg):
    return HungarianMatcher_Crowd(
        cost_class=cfg.MATCHER.SET_COST_CLASS,
        cost_point=cfg.MATCHER.SET_COST_POINT
    )
