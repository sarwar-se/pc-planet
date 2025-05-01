package com.pcplanet.dto;

import com.pcplanet.enums.UserType;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserDTO {
    private int userId;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private Integer phone;
    private UserType type;
}
