package com.pcplanet.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class LoginRequestDTO {
    @Email
    private String email;

    @NotBlank
    private String password;
}
