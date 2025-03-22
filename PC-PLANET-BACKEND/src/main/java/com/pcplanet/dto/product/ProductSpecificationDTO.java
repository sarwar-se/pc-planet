package com.pcplanet.dto.product;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductSpecificationDTO {
    private Integer id;
    private String type;
    private List<ProductSpecificationPropertyDTO> properties;
}