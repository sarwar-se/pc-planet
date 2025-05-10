package com.pcplanet.dto;

import com.pcplanet.enums.UserType;
import lombok.Getter;

@Getter
public class UserRegisterDTO {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String phone;
    private String password;
    private UserType type;
}
