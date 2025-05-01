package com.pcplanet.service;

import com.pcplanet.dto.UserDTO;
import com.pcplanet.dto.UserRegisterDTO;

public interface UserService {
    UserDTO getUserDetailsById(int id);

    void registerUser(UserRegisterDTO userDTO);
}
