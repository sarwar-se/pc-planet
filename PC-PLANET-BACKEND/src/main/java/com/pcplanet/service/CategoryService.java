package com.pcplanet.service;

import com.pcplanet.dto.ProductAttributeDTO;
import com.pcplanet.dto.category.CategoryDTO;
import com.pcplanet.dto.category.CategoryDetailsDTO;
import com.pcplanet.dto.category.CategoryInfoDTO;

import java.util.List;

public interface CategoryService {
    List<CategoryDTO> getAllCategory();

    List<CategoryInfoDTO> getCategories();

    CategoryDetailsDTO getCategoryDetailsByName(String categoryName);

    List<ProductAttributeDTO> getProductAttributesByCategoryId(int categoryId);
}
