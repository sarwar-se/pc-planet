package com.pcplanet.dto.product;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductSpecificationPropertyDTO {
    private Integer id;
    private String name;
    private List<ProductSpecificationDetailsDTO> details;
}
