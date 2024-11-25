package com.pcplanet.service;

import com.pcplanet.dto.CategoryDTO;
import com.pcplanet.dto.CategoryInfoDTO;

import java.util.List;

public interface CategoryService {
    List<CategoryInfoDTO> getCategories();

    CategoryDTO getCategoryDetailsByName(String categoryName);
}
