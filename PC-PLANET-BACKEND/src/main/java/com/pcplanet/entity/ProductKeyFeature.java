package com.pcplanet.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "product_key_feature")
public class ProductKeyFeature extends BaseEntity {

    @Column(name = "name")
    private String name;

    @NotBlank
    @Column(name = "value")
    private String value;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", foreignKey = @ForeignKey(name = "fk_pro_feature_product"))
    private Product product;
}
