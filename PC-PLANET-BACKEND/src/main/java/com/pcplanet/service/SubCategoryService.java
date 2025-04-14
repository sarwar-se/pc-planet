package com.pcplanet.service;

import com.pcplanet.dto.productAttribute.ProductAttributeDTO;
import com.pcplanet.dto.subCategory.CUSubCategoryDTO;
import com.pcplanet.dto.subCategory.SubCategoryDTO;
import com.pcplanet.dto.subCategory.SubCategoryDetailsDTO;

import java.util.List;

public interface SubCategoryService {
    List<SubCategoryDTO> getSubCategoriesByCategory(int categoryId);

    SubCategoryDetailsDTO getSubCategoryDetailsByName(String name);

    List<ProductAttributeDTO> getProductAttributesBySubCategory(int subCategoryId);

    void saveSubCategory(CUSubCategoryDTO subCategoryDTO);

    void deleteSubCategoryById(int id);
}
