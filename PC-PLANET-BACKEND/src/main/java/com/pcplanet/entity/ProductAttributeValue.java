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
@Table(name = "product_attribute_value")
public class ProductAttributeValue extends BaseEntity {

    @NotBlank
    @Column(name = "value")
    private String value;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_attribute_id", foreignKey = @ForeignKey(name = "fk_pro_attribute_pro_attribute_value"))
    private ProductAttribute attribute;

    @JsonIgnore
    @ManyToMany(mappedBy = "attributeValues")
    private List<Product> products;
}
