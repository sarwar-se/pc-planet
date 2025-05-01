package com.pcplanet.controller;

import com.pcplanet.dto.LoginRequestDTO;
import com.pcplanet.dto.UserRegisterDTO;
import com.pcplanet.security.AuthFilter;
import com.pcplanet.security.LoginService;
import com.pcplanet.security.TokenDetails;
import com.pcplanet.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final LoginService loginService;

    public AuthController(UserService userService, LoginService loginService) {
        this.userService = userService;
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public TokenDetails login(@RequestBody @Valid LoginRequestDTO loginRequest) {
        var email = loginRequest.getEmail();
        var password = loginRequest.getPassword();

        return loginService.validatedUserAndGenerateTokenDetails(email, password);
    }

    @PostMapping("/register")
    public void register(@RequestBody UserRegisterDTO userDTO) {
        userService.registerUser(userDTO);
    }

    @GetMapping("/refresh")
    public ResponseEntity<TokenDetails> refreshToken(HttpServletRequest request) {
        var token = AuthFilter.getAuthTokenFromHeader(request);
        try {
            return ResponseEntity.ok(loginService.refreshToken(token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}
