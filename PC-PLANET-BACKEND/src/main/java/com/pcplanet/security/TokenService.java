package com.pcplanet.security;

import com.pcplanet.dto.UserDTO;

public interface TokenService {
    TokenDetails generateToken(UserDTO user);

    TokenDetails parseToken(String token);
}
