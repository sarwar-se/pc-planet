package com.pcplanet.dto.category;

import com.pcplanet.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CategoryDTO {
    private Integer id;
    private String name;

    public static CategoryDTO ofEntity(Category category) {
        return CategoryDTO
                .builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }

    public static Category ofDTO(CategoryDTO categoryDTO) {
        var category = new Category();
        category.setId(categoryDTO.getId());
        category.setName(categoryDTO.getName());

        return category;
    }
}
