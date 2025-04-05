package com.pcplanet.service;

import com.pcplanet.dto.ProductVariantDTO;
import com.pcplanet.dto.category.CategoryDTO;
import com.pcplanet.dto.category.CategoryDetailsDTO;
import com.pcplanet.dto.category.CategoryInfoDTO;

import java.util.List;

public interface CategoryService {
    List<CategoryDTO> getAllCategory();

    List<CategoryInfoDTO> getCategories();

    CategoryDetailsDTO getCategoryDetailsByName(String categoryName);

    List<ProductVariantDTO> getProductVariantsByCategoryId(int categoryId);
}
