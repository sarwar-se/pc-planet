package com.pcplanet.controller;

import com.pcplanet.dto.productAttribute.ProductAttributeDTO;
import com.pcplanet.dto.category.CategoryDTO;
import com.pcplanet.dto.category.CategoryDetailsDTO;
import com.pcplanet.dto.category.CategoryInfoDTO;
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
    public List<CategoryDTO> getAllCategory() {
        return categoryService.getAllCategory();
    }

    @GetMapping("/metadata")
    public List<CategoryInfoDTO> getCategories() {
        return categoryService.getCategories();
    }

    @GetMapping("/details")
    public CategoryDetailsDTO getCategoryDetails(@RequestParam String categoryName) {
        return categoryService.getCategoryDetailsByName(categoryName);
    }

    @GetMapping("/attributes")
    public List<ProductAttributeDTO> getProductAttributesByCategory(@RequestParam int categoryId) {
        return categoryService.getProductAttributesByCategoryId(categoryId);
    }

    @PostMapping("/save")
    public void createOrUpdateCategory(@RequestBody CategoryDTO categoryDTO) {
        categoryService.saveCategory(categoryDTO);
    }

    @DeleteMapping("/delete/{categoryId}")
    public void deleteProductCategory(@PathVariable int categoryId) {
        categoryService.deleteCategoryById(categoryId);
    }
}
