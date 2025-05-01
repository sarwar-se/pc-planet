package com.pcplanet.service.impl;

import com.pcplanet.dto.UserDTO;
import com.pcplanet.dto.UserRegisterDTO;
import com.pcplanet.entity.User;
import com.pcplanet.enums.UserType;
import com.pcplanet.exception.ErrorCode;
import com.pcplanet.exception.ServiceException;
import com.pcplanet.repository.UserRepository;
import com.pcplanet.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDTO getUserDetailsById(int id) {
        var user = userRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("User not found with id: {}", id);
                    return new ServiceException(ErrorCode.USER_NOT_FOUND);
                });

        return getUserDetails(user);
    }

    @Override
    public void registerUser(UserRegisterDTO userDTO) {
        log.info("Start creating new user with email: {}", userDTO.getEmail());

        var userEmailExists = userRepository.findByEmailIgnoreCase(userDTO.getEmail());
        if (userEmailExists != null) {
            log.warn("Provided email already exists: {}", userDTO.getEmail());
            throw new ServiceException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        createUser(userDTO);
        log.info("User created successfully");
    }

    private UserDTO getUserDetails(User user) {
        return UserDTO.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .type(user.getUserType())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
    }

    private void createUser(UserRegisterDTO userDTO) {
        var user = new User();

        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setUserType(UserType.GENERAL);
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        userRepository.save(user);
    }
}
