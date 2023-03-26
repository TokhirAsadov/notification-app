package com.tohir.service.repository;


import com.tohir.service.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, String> {
    Optional<Role> findRoleByRoleName(String roleName);

    boolean existsRoleByRoleName(String roleName);

}
