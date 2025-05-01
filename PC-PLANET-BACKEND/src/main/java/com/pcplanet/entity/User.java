package com.pcplanet.entity;

import com.pcplanet.enums.UserType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "user")
public class User extends BaseEntity {

    @NotBlank
    @Column(name = "first_name", length = 16, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 16)
    private String lastName;

    @Column(name = "username", length = 16)
    private String username;

    @NotBlank
    @Column(name = "email", length = 32, nullable = false)
    private String email;

    @NotNull
    @Column(name = "phone", length = 11, nullable = false)
    private Integer phone;

    @NotBlank
    @Column(name = "password", nullable = false)
    private String password;

    @NotNull
    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserType userType;
}
