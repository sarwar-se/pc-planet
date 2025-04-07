package com.pcplanet.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "product_description")
public class ProductDescription extends BaseEntity {

    @Column(name = "name")
    private String name;

    @NotBlank
    @Column(name = "value", length = 2048)
    private String value;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", foreignKey = @ForeignKey(name = "fk_pro_description_product"))
    private Product product;
}
