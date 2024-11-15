package com.pcplanet.service;

import com.pcplanet.dto.ProductDetailsDTO;
import com.pcplanet.dto.ProductInfoDTO;
import com.pcplanet.dto.param.ProductFilterParams;
import com.pcplanet.entity.Product;

import java.util.List;

public interface ProductService {
    List<ProductInfoDTO> getProducts(ProductFilterParams params);

    List<Product> getProducts();

    void saveProduct(ProductDetailsDTO productDetailsDTO);

    ProductDetailsDTO getProductDetailsById(int productId);

    void deleteProductById(int productId);

    ProductDetailsDTO updateProduct(ProductDetailsDTO product);

    List<ProductInfoDTO> searchProductsByName(String name);
}
