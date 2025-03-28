package com.pcplanet.dto;

import com.pcplanet.entity.SubCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SubCategoryDTO {
    private Integer id;
    private String name;
    private List<BrandDTO> brands;
    private List<FilterKeyDTO> filterKeys;

    public SubCategoryDTO(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public static SubCategoryDTO ofEntity(SubCategory category) {
        var categoryDTO = new SubCategoryDTO();

        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());

        List<BrandDTO> brandDTOList = category.getBrands()
                .stream()
                .map(brand -> {
                    return new BrandDTO(brand.getId(), brand.getName());
                }).toList();

        categoryDTO.setBrands(brandDTOList);

        List<FilterKeyDTO> categoryFilterKeyDTOList = category.getFilterKeys()
                .stream()
                .map(categoryFilterKey -> {
                    var filterKeyDTO = new FilterKeyDTO();

                    filterKeyDTO.setId(categoryFilterKey.getId());
                    filterKeyDTO.setName(categoryFilterKey.getName());
                    List<FilterPropertyDTO> propertyDTOList = categoryFilterKey.getFilterProperties()
                            .stream()
                            .map(filterProperty -> {
                                var filterPropertyDTO = new FilterPropertyDTO();

                                filterPropertyDTO.setId(filterProperty.getId());
                                filterPropertyDTO.setName(filterProperty.getName());

                                return filterPropertyDTO;
                            }).toList();
                    filterKeyDTO.setFilterProperties(propertyDTOList);

                    return filterKeyDTO;
                }).toList();
        categoryDTO.setFilterKeys(categoryFilterKeyDTOList);

        return categoryDTO;
    }
}
