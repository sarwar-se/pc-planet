package com.pcplanet.security;

import com.pcplanet.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Value("${security.cors-domains}")
    private List<String> corsDomains;
    private static String LOGIN_ENDPOINT = "/login";
    private static String REFRESH_TOKEN_ENDPOINT = "/refresh";
    private final UserService userService;
    private final TokenService tokenService;

    public SecurityConfig(UserService userService, TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @Bean
    AuthFilter authFilter() {
        return new AuthFilter(LOGIN_ENDPOINT, REFRESH_TOKEN_ENDPOINT, userService, tokenService);
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(corsConfigurerCustomizer())
                .anonymous(AbstractHttpConfigurer::disable)
                .exceptionHandling(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth.requestMatchers(
                                new AntPathRequestMatcher("/auth/register"),
                                new AntPathRequestMatcher("/auth/login"),
                                new AntPathRequestMatcher("/auth/refresh"),
                                new AntPathRequestMatcher("/api/**")
                        )
                        .permitAll()
                        .anyRequest()
                        .authenticated())
                .sessionManagement(mgmt -> mgmt.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterAfter(authFilter(), LogoutFilter.class)
                .build();
    }

    private Customizer<CorsConfigurer<HttpSecurity>> corsConfigurerCustomizer() {
        return c -> c.configurationSource(request -> {
            var cors = new CorsConfiguration();

            cors.setAllowedOrigins(corsDomains);
            cors.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
            cors.setAllowedHeaders(List.of("*"));
            cors.setAllowCredentials(true);

            return cors;
        });
    }
}
