package com.pcplanet.dto.category;

import com.pcplanet.dto.BrandDTO;
import com.pcplanet.dto.subCategory.SubCategoryInfoDTO;
import com.pcplanet.entity.Category;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CategoryInfoDTO {
    private Integer id;
    private String name;
    private List<SubCategoryInfoDTO> subCategories;

    public static CategoryInfoDTO ofEntity(Category category) {
        var categoryDTO = new CategoryInfoDTO();

        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());

        List<SubCategoryInfoDTO> subCategoryInfoDTOList = category.getSubCategories()
                .stream()
                .map(subCategory -> {
                    var subCategoryInfoDTO = new SubCategoryInfoDTO();
                    subCategoryInfoDTO.setId(subCategory.getId());
                    subCategoryInfoDTO.setName(subCategory.getName());

                    List<BrandDTO> brandDTOList = subCategory.getBrands()
                            .stream()
                            .map(brand -> new BrandDTO(brand.getId(), brand.getName())).toList();

                    subCategoryInfoDTO.setBrands(brandDTOList);

                    return subCategoryInfoDTO;
                }).toList();

        categoryDTO.setSubCategories(subCategoryInfoDTOList);

        return categoryDTO;
    }
}
