package com.pcplanet.security;

import com.pcplanet.dto.UserDTO;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class TokenDetails {
    private UserDTO user;
    private String token;
    private Date expiresAt;
    private Date refreshBefore;
}
