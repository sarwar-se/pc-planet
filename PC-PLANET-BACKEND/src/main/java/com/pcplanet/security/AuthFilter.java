package com.pcplanet.security;

import com.pcplanet.Constants;
import com.pcplanet.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Date;


public class AuthFilter extends OncePerRequestFilter {
    private static final String AUTHORIZATION_HEADER_NAME = "Authorization";
    private static final String AUTHORIZATION_HEADER_VALUE_PREFIX = "Bearer ";

    @Value("${security.token.http-status-on-expiration}")
    private int httpStatusOnTokenExpiration;
    private final String loginEndpoint;
    private final String refreshTokenEndpoint;
    private final UserService userService;
    private final TokenService tokenService;

    public AuthFilter(String loginEndpoint,
                      String refreshTokenEndpoint,
                      UserService userService,
                      TokenService tokenService) {
        this.loginEndpoint = loginEndpoint;
        this.refreshTokenEndpoint = refreshTokenEndpoint;
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var requestURI = request.getRequestURI();

        if (requestURI.startsWith(loginEndpoint) || requestURI.startsWith(refreshTokenEndpoint)) {
            filterChain.doFilter(request, response);
            return;
        }

        var authToken = getAuthTokenFromHeader(request);

        try {
            if (authToken != null) {
                var auth = createAuth(authToken);
                setCurrentAuth(auth);
            }
        } catch (TokenNeedsToBeRefreshedException e) {
            response.setStatus(httpStatusOnTokenExpiration);
        } catch (Exception e) {
            logger.info("Expired/Tampered/NonParseable jwt token");
        }

        try {
            filterChain.doFilter(request, response);
        } finally {
            MDC.clear();
        }
    }

    public static String getAuthTokenFromHeader(HttpServletRequest request) {
        var authorizationHeader = request.getHeader(AUTHORIZATION_HEADER_NAME);

        if (authorizationHeader == null || !authorizationHeader.startsWith(AUTHORIZATION_HEADER_VALUE_PREFIX)) {
            return null;
        }

        return authorizationHeader.replace(AUTHORIZATION_HEADER_VALUE_PREFIX, "");
    }

    private AppAuthentication createAuth(String token) throws TokenNeedsToBeRefreshedException {
        var tokenDetails = tokenService.parseToken(token);

        if (tokenDetails != null) {
            if (tokenDetails.getExpiresAt().before(new Date())) {
                throw new TokenNeedsToBeRefreshedException();
            }
            MDC.put(Constants.LOGGER_USERINFO_KEY, tokenDetails.getUser().toString());
            return new AppAuthentication(tokenDetails.getUser(), true);
        }
        throw new AuthenticationServiceException("Non Parseable JWT");
    }

    private static void setCurrentAuth(AppAuthentication auth) {
        if (auth != null) {
            var sc = SecurityContextHolder.createEmptyContext();
            sc.setAuthentication(auth);
            SecurityContextHolder.setContext(sc);
        }
    }
}
