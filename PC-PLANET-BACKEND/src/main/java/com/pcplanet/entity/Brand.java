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
@Table(name = "brand")
public class Brand extends BaseEntity {

    @NotBlank
    @Column(name = "name")
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "brands")
    private List<Category> categories;

    @JsonIgnore
    @ManyToMany(mappedBy = "brands")
    private List<SubCategory> subCategories;
}
