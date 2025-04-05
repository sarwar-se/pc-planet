package com.pcplanet.dto.subCategory;

import com.pcplanet.entity.SubCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
public class SubCategoryDTO {
    private Integer id;
    private String name;

    public static SubCategoryDTO ofEntity(SubCategory subCategory) {
        return SubCategoryDTO
                .builder()
                .id(subCategory.getId())
                .name(subCategory.getName())
                .build();
    }
}
