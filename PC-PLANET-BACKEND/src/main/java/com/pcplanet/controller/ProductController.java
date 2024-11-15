package com.pcplanet.controller;

import com.pcplanet.dto.ProductDetailsDTO;
import com.pcplanet.dto.ProductInfoDTO;
import com.pcplanet.dto.param.ProductFilterParams;
import com.pcplanet.entity.Product;
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
    public List<ProductInfoDTO> getProducts(@ModelAttribute ProductFilterParams params) {
        return productService.getProducts(params);
    }

    @GetMapping("/all/test") // Todo:
    public List<Product> getProducts() {
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

    @GetMapping("/search")
    public List<ProductInfoDTO> searchProducts(@RequestParam String query) {
        return productService.searchProductsByName(query);
    }
}
