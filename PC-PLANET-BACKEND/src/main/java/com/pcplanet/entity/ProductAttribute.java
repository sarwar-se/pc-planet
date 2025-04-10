package com.pcplanet.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "product_attribute")
public class ProductAttribute extends BaseEntity {

    @NotBlank
    @Column(name = "name")
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "attributes")
    private List<Category> categories;

    @JsonIgnore
    @ManyToMany(mappedBy = "attributes")
    private List<SubCategory> subCategories;

    @JsonIgnore
    @OneToMany(mappedBy = "attribute", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    private List<ProductAttributeValue> attributeValues;
}
