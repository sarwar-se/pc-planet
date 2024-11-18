package com.pcplanet.entity;

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

    @ManyToMany(mappedBy = "brands")
    private List<Category> categories;
}
