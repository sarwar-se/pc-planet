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
@Table(name = "filter_key") // todo: entity name
public class FilterKey extends BaseEntity {

    @NotBlank
    @Column(name = "name")
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "filterKeys")
    private List<Category> categories;

    @JsonIgnore
    @ManyToMany(mappedBy = "filterKeys")
    private List<SubCategory> subCategories;

    @JsonIgnore
    @OneToMany(mappedBy = "filterKey", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    private List<FilterProperty> filterProperties;
}
