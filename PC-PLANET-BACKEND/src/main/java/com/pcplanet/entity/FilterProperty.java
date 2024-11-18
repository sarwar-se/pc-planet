package com.pcplanet.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "filter_property") // todo: entity name
public class FilterProperty extends BaseEntity {

    @NotBlank
    @Column(name = "name")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cat_filter_key_id", foreignKey = @ForeignKey(name = "fk_filter_property_cat_filter_key"))
    private CategoryFilterKey categoryFilterKey;

    @ManyToMany(mappedBy = "properties")
    private List<Product> products;
}
