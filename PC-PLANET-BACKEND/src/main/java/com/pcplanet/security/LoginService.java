package com.pcplanet.security;

public interface LoginService {
    TokenDetails validatedUserAndGenerateTokenDetails(String email, String password);

    TokenDetails refreshToken(String serializedAuthToken);
}
