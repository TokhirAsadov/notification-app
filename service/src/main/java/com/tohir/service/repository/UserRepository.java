package com.tohir.service.repository;

import com.tohir.service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User,String> {
    User getUserByLogin(String username);
}
