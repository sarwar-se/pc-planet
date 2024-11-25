package com.pcplanet.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "sub_category")
public class SubCategory extends BaseEntity {

    @NotBlank
    @Column(name = "name")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "fk_sub_cat_category"))
    private Category category;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @JoinTable(
            name = "sub_category_brand",
            joinColumns = @JoinColumn(name = "sub_category_id"),
            inverseJoinColumns = @JoinColumn(name = "brand_id")
    )
    private List<Brand> brands;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @JoinTable(
            name = "sub_category_filter_key",
            joinColumns = @JoinColumn(name = "sub_category_id"),
            inverseJoinColumns = @JoinColumn(name = "filter_key_id")
    )
    private List<FilterKey> filterKeys;
}
