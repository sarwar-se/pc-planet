package com.pcplanet.dto.brand;

import lombok.Getter;

@Getter
public class CreateBrandDTO {
    private Integer id;
    private String name;
    private Integer categoryId;
    private Integer subCategoryId;
}
