package com.pcplanet.repository;

import com.pcplanet.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmailIgnoreCase(String email);
}
