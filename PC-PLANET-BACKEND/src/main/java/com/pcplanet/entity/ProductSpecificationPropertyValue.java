package com.pcplanet.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "product_specification_property_value")
public class ProductSpecificationPropertyValue extends BaseEntity {

    @NotBlank
    @Column(name = "value")
    private String value;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "spec_property_id", foreignKey = @ForeignKey(name = "fk_ps_details_spec_property"))
    private ProductSpecificationProperty specificationProperty;
}
