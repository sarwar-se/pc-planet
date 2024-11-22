package com.pcplanet.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductSpecificationDTO {
    private Integer id;
    private String category;
    private List<ProductSpecificationPropertyDTO> specificationProperties;
}