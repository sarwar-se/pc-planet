package com.pcplanet.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pcplanet.dto.UserDTO;
import com.pcplanet.utils.ServiceUtils;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.AeadAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Service
public class JWTTokenService implements TokenService {
    private static final AeadAlgorithm ENC_ALGORITHM = Jwts.ENC.A192CBC_HS384;
    private static final String ACCESS_TOKEN_EXPIRY_CLAIM_KEY = "rip";
    private static final String USER_CLAIM_KEY = "user";

    @Value("${security.token.lifetime-in-minute}")
    private int tokenLifetimeInHour;

    @Value("${security.token.refresh-in-minute}")
    private int refreshTimeInHour;

    @Value("${security.encryption-password}")
    private String encryptionKeyPassword;

    private SecretKey encryptionKey;

    private final ObjectMapper objectMapper;

    public JWTTokenService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public TokenDetails generateToken(UserDTO user) {
        ServiceUtils.requireNotNull(user);

        try {
            log.debug("Generation jwt token for user, email: {}", user.getEmail());
            var encryptionKey = getCryptoKey();
            var expiration = Date.from(Instant.now().plus(tokenLifetimeInHour, ChronoUnit.MINUTES));
            var refreshBefore = Date.from(Instant.now().plus(refreshTimeInHour, ChronoUnit.MINUTES));

            var token = Jwts.builder()
                    .claim(USER_CLAIM_KEY, objectMapper.writeValueAsString(user))
                    .claim(ACCESS_TOKEN_EXPIRY_CLAIM_KEY, expiration)
                    .expiration(refreshBefore)
                    .encryptWith(encryptionKey, ENC_ALGORITHM)
                    .compact();

            return TokenDetails.builder()
                    .user(user)
                    .token(token)
                    .expiresAt(expiration)
                    .refreshBefore(refreshBefore)
                    .build();
        } catch (Exception e) {
            log.error("Error while generating token for user, email: %s".formatted(user.getEmail()), e);
        }

        return null;
    }

    @Override
    public TokenDetails parseToken(String token) {
        if (StringUtils.isBlank(token)) {
            return null;
        }

        try {
            var decryptionKey = getCryptoKey();
            var content = Jwts.parser()
                    .decryptWith(decryptionKey)
                    .build()
                    .parseEncryptedClaims(token)
                    .getPayload();

            var user = objectMapper.readValue(content.get(USER_CLAIM_KEY, String.class), UserDTO.class);

            return TokenDetails.builder()
                    .user(user)
                    .expiresAt(new Date(content.get(ACCESS_TOKEN_EXPIRY_CLAIM_KEY, Long.class)))
                    .refreshBefore(content.getExpiration())
                    .build();
        } catch (Exception e) {
            log.info("Error while parsing JWT: {}", e.getMessage());
        }

        return null;
    }

    private SecretKey getCryptoKey() {
        if (encryptionKey == null) {
            encryptionKey = Keys.hmacShaKeyFor(encryptionKeyPassword.getBytes());
        }
        return encryptionKey;
    }
}
