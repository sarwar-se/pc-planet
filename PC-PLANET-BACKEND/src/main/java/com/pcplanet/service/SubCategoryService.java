package com.pcplanet.service;

import com.pcplanet.dto.ProductAttributeDTO;
import com.pcplanet.dto.subCategory.SubCategoryDTO;
import com.pcplanet.dto.subCategory.SubCategoryDetailsDTO;

import java.util.List;

public interface SubCategoryService {
    List<SubCategoryDTO> getSubCategoriesByCategory(int id);

    SubCategoryDetailsDTO getSubCategoryDetailsByName(String name);

    List<ProductAttributeDTO> getProductAttributesBySubCategory(int subCategoryId);
}
