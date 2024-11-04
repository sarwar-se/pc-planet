package com.pcplanet.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.pcplanet.enums.ProductStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "product")
public class Product extends BaseEntity {

    @NotBlank
    @Column(name = "name")
    private String name;

    @NotBlank
    @Column(name = "code")
    @Size(min = 6, max = 12)
    private String code;

    @NotBlank
    @Column(name = "model")
    private String model;

    @NotNull
    @Column(name = "price")
    private Double price;

    @NotNull
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "brand_id", foreignKey = @ForeignKey(name = "fk_product_brand"))
    private Brand brand;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "fk_product_category"))
    private Category category;

    @OneToMany(mappedBy = "product", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    @JsonManagedReference
    private List<ProductSpecification> specifications;
}
