package com.pcplanet.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SubCategoryInfoDTO {
    private Integer id;
    private String name;
    private List<BrandDTO> brands;
}
