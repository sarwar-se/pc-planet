package com.pcplanet.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "product_specification_details")
public class ProductSpecificationDetails extends BaseEntity {

    @NotBlank
    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "spec_property_id", foreignKey = @ForeignKey(name = "fk_ps_details_spec_property"))
    private ProductSpecificationProperty specificationProperty;
}
