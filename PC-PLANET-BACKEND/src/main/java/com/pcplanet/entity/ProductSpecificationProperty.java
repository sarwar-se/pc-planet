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
@Table(name = "product_specification_property")
public class ProductSpecificationProperty extends BaseEntity {

    @NotBlank
    @Column(name = "name")
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "specificationProperty", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    private List<ProductSpecificationPropertyValue> specificationPropertyValues;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "specification_id", foreignKey = @ForeignKey(name = "fk_ps_property_specification"))
    private ProductSpecification specification;
}
