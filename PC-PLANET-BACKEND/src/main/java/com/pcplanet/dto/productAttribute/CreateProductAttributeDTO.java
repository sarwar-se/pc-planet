package com.pcplanet.dto.productAttribute;

import lombok.Getter;

import java.util.List;

@Getter
public class CreateProductAttributeDTO {
    private Integer id;
    private String name;
    private List<ProductAttributeValueDTO> attributeValues;
    private Integer categoryId;
    private Integer subCategoryId;
}
