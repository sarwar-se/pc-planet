package com.pcplanet.controller;

import com.pcplanet.dto.productAttribute.CUProductAttributeDTO;
import com.pcplanet.service.ProductAttributeService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/product-attribute")
public class ProductAttributeController {

    private final ProductAttributeService productAttributeService;

    public ProductAttributeController(ProductAttributeService productAttributeService) {
        this.productAttributeService = productAttributeService;
    }

    @PostMapping("/save")
    public void createOrUpdateProductAttribute(@RequestBody CUProductAttributeDTO attributeDTO) {
        productAttributeService.saveProductAttribute(attributeDTO);
    }

    @DeleteMapping("/delete/{attributeId}")
    public void deleteProductAttribute(@PathVariable int attributeId) {
        productAttributeService.deleteProductAttributeById(attributeId);
    }
}
