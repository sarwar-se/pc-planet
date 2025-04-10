package com.pcplanet.repository.Impl;

import com.pcplanet.entity.Brand;
import com.pcplanet.entity.Category;
import com.pcplanet.entity.Product;
import com.pcplanet.entity.ProductAttributeValue;
import com.pcplanet.enums.ProductStatus;
import com.pcplanet.repository.ProductRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductRepositoryCustomImpl implements ProductRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Product> findProducts(String categoryName, String subCategoryName, String brandName, List<ProductStatus> statuses, List<String> brands, List<String> attributeValues) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Product> query = cb.createQuery(Product.class);

        Root<Product> product = query.from(Product.class);
        Join<Product, Category> category = product.join("category", JoinType.LEFT);
        Join<Product, Category> subCategory = product.join("subCategory", JoinType.LEFT);
        Join<Product, Brand> brand = product.join("brand", JoinType.LEFT);
        Join<Product, ProductAttributeValue> attributeValue = product.join("attributeValues", JoinType.LEFT);

        Predicate predicate = cb.conjunction();

        if (categoryName != null && !categoryName.isBlank()) {
            predicate = cb.and(predicate, cb.equal(category.get("name"), categoryName));
        }

        if (subCategoryName != null && !subCategoryName.isBlank()) {
            predicate = cb.and(predicate, cb.equal(subCategory.get("name"), subCategoryName));
        }

        if (brandName != null && !brandName.isBlank()) {
            predicate = cb.and(predicate, cb.equal(brand.get("name"), brandName));
        }

        if (statuses != null && !statuses.isEmpty()) {
            predicate = cb.and(predicate, product.get("status").in(statuses));
        }

        if (brands != null && !brands.isEmpty()) {
            predicate = cb.and(predicate, product.get("brand").get("name").in(brands));
        }

        if (attributeValues != null && !attributeValues.isEmpty()) {
            predicate = cb.and(predicate, attributeValue.get("value").in(attributeValues));
        }

        query.where(predicate);

        return entityManager.createQuery(query).getResultList();
    }
}