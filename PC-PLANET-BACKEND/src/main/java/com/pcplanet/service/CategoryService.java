package com.pcplanet.service;

import com.pcplanet.dto.CategoryDTO;

public interface CategoryService {
    CategoryDTO getCategoryDetailsByName(String categoryName);
}
