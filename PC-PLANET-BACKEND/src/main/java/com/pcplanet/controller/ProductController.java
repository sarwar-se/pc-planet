package com.pcplanet.controller;

import com.pcplanet.dto.ProductDetailsDTO;
import com.pcplanet.dto.ProductInfoDTO;
import com.pcplanet.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/all")
    public List<ProductInfoDTO> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("/all/{productId}/details")
    public ProductDetailsDTO getProductDetails(@PathVariable int productId) {
        return productService.getProductDetailsById(productId);
    }

    @PostMapping("/save")
    public void saveProduct(@RequestBody ProductDetailsDTO productDetailsDTO) {
        productService.saveProduct(productDetailsDTO);
    }

    @DeleteMapping("/all/{productId}/delete")
    public void deleteProduct(@PathVariable int productId) {
        productService.deleteProductById(productId);
    }

    @PutMapping("/update")
    public ProductDetailsDTO updateProduct(@RequestBody ProductDetailsDTO product) {
        return productService.updateProduct(product);
    }
}
