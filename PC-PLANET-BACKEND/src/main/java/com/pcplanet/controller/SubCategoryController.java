package com.pcplanet.controller;

import com.pcplanet.dto.productAttribute.ProductAttributeDTO;
import com.pcplanet.dto.subCategory.CUSubCategoryDTO;
import com.pcplanet.dto.subCategory.SubCategoryDTO;
import com.pcplanet.dto.subCategory.SubCategoryDetailsDTO;
import com.pcplanet.service.SubCategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-sub-category")
public class SubCategoryController {

    private final SubCategoryService subCategoryService;

    public SubCategoryController(SubCategoryService subCategoryService) {
        this.subCategoryService = subCategoryService;
    }

    @GetMapping("/{categoryId}")
    public List<SubCategoryDTO> getSubCategories(@PathVariable int categoryId) {
        return subCategoryService.getSubCategoriesByCategory(categoryId);
    }

    @GetMapping("/details")
    public SubCategoryDetailsDTO getCategoryDetails(@RequestParam String subCategoryName) {
        return subCategoryService.getSubCategoryDetailsByName(subCategoryName);
    }

    @GetMapping("/attributes")
    public List<ProductAttributeDTO> getProductAttributesBySubCategory(@RequestParam int subCategoryId) {
        return subCategoryService.getProductAttributesBySubCategory(subCategoryId);
    }

    @PostMapping("/save")
    public void createOrUpdateSubCategory(@RequestBody CUSubCategoryDTO subCategoryDTO) {
        subCategoryService.saveSubCategory(subCategoryDTO);
    }

    @DeleteMapping("/delete/{subCatId}")
    public void deleteProductSubCategory(@PathVariable int subCatId) {
        subCategoryService.deleteSubCategoryById(subCatId);
    }
}
