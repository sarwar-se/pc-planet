package com.pcplanet.dto.category;

import com.pcplanet.entity.SubCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class SubCategoryDTO {
    private Integer id;
    private String name;

    public static SubCategoryDTO ofEntity(SubCategory category) {
        return SubCategoryDTO
                .builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }
}
