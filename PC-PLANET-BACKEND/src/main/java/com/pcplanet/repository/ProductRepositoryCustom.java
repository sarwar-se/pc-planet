package com.pcplanet.repository;

import com.pcplanet.entity.Product;
import com.pcplanet.enums.ProductStatus;

import java.util.List;

public interface ProductRepositoryCustom {
    List<Product> findProducts(String categoryName, List<ProductStatus> statuses, List<String> brands, List<String> properties);
}
