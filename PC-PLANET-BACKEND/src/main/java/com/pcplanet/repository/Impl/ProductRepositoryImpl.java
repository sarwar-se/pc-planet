package com.pcplanet.repository.Impl;

import com.pcplanet.entity.Category;
import com.pcplanet.entity.FilterProperty;
import com.pcplanet.entity.Product;
import com.pcplanet.enums.ProductStatus;
import com.pcplanet.repository.ProductRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductRepositoryImpl implements ProductRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Product> findProducts(String categoryName, List<ProductStatus> statuses, List<String> brands, List<String> properties) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Product> query = cb.createQuery(Product.class);

        Root<Product> product = query.from(Product.class);
        Join<Product, Category> category = product.join("category", JoinType.LEFT);
        Join<Product, FilterProperty> filterProperty = product.join("properties", JoinType.LEFT);

        Predicate predicate = cb.conjunction();

        if (categoryName != null && !categoryName.isBlank()) {
            predicate = cb.and(predicate, cb.equal(category.get("name"), categoryName));
        }

        if (statuses != null && !statuses.isEmpty()) {
            predicate = cb.and(predicate, product.get("status").in(statuses));
        }

        if (brands != null && !brands.isEmpty()) {
            predicate = cb.and(predicate, product.get("brand").get("name").in(brands));
        }

        if (properties != null && !properties.isEmpty()) {
            predicate = cb.and(predicate, filterProperty.get("name").in(properties));
        }

        query.where(predicate);

        return entityManager.createQuery(query).getResultList();
    }
}