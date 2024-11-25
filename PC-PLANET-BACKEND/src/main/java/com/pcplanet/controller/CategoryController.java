package com.pcplanet.controller;

import com.pcplanet.dto.CategoryDTO;
import com.pcplanet.dto.CategoryInfoDTO;
import com.pcplanet.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/all")
    public List<CategoryInfoDTO> getCategories() {
        return categoryService.getCategories();
    }

    @GetMapping("/details")
    public CategoryDTO getCategoryDetails(@RequestParam String categoryName) {
        return categoryService.getCategoryDetailsByName(categoryName);
    }
}
