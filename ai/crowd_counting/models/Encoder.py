# Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved
import torch
import torch.nn as nn

# VGG backbone
class Base_VGG(nn.Module):
    def __init__(self, name: str = 'vgg16_bn', last_pool=False, num_channels=256):
        super().__init__()
        print("### VGG16: last_pool=", last_pool)

        from .backbones import vgg as models
        assert name == 'vgg16_bn', "Only 'vgg16_bn' is supported in this implementation."

        backbone = models.vgg16_bn(pretrained=True)
        features = list(backbone.features.children())

        self.body1 = nn.Sequential(*features[:13])
        self.body2 = nn.Sequential(*features[13:23])
        self.body3 = nn.Sequential(*features[23:33])
        self.body4 = nn.Sequential(*features[33:44]) if last_pool else nn.Sequential(*features[33:43])

        self.num_channels = num_channels
        self.last_pool = last_pool

    def get_outplanes(self):
        outplanes = []
        for i in range(4):
            layer = getattr(self, f'body{i+1}')
            for param in layer.parameters():
                if param.ndim == 4:
                    outplanes.append(param.shape[0])
                    break
        return outplanes

    def forward(self, x):
        out = []
        for layer in [self.body1, self.body2, self.body3, self.body4]:
            x = layer(x)
            out.append(x)
        return out
