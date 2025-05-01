package com.pcplanet.security;

import com.pcplanet.dto.UserDTO;
import com.pcplanet.exception.ErrorCode;
import com.pcplanet.exception.ServiceException;
import com.pcplanet.repository.UserRepository;
import com.pcplanet.service.UserService;
import com.pcplanet.utils.ServiceUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class LoginServiceImpl implements LoginService {
    private final UserService userService;
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginServiceImpl(UserService userService,
                            TokenService tokenService,
                            UserRepository userRepository,
                            PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public TokenDetails validatedUserAndGenerateTokenDetails(String email, String password) {
        ServiceUtils.requireNotNull(email);
        ServiceUtils.requireNotNull(password);

        var user = userRepository.findByEmailIgnoreCase(email);
        if (user == null) {
            log.warn("User not found with email: {}", email);
            throw new ServiceException(ErrorCode.USER_NOT_FOUND);
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            log.warn("Bad credential provided");
            throw new ServiceException(ErrorCode.BAD_CREDENTIAL);
        }

        return getTokenDetails(user.getId());
    }

    @Override
    public TokenDetails refreshToken(String serializedAuthToken) {
        var tokenDetails = parseToken(serializedAuthToken);
        var tokenUser = tokenDetails.getUser();

        return tokenService.generateToken(tokenUser);
    }

    private TokenDetails getTokenDetails(int userId) {
        var user = getUserDetails(userId);
        return tokenService.generateToken(user);
    }

    private UserDTO getUserDetails(int userId) {
        return userService.getUserDetailsById(userId);
    }

    private TokenDetails parseToken(String serializedAuthToken) {
        var tokenDetails = tokenService.parseToken(serializedAuthToken);

        if (tokenDetails == null) {
            throw new ServiceException(ErrorCode.INVALID_REQUEST_TOKEN);
        }

        return tokenDetails;
    }
}
