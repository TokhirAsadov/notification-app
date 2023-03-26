package com.tohir.service.service.role;

import com.tohir.service.entity.Role;
import com.tohir.service.payload.ApiResponse;
import com.tohir.service.payload.RoleDto;

import java.util.List;

public interface RoleService {
    ApiResponse findAll();

    ApiResponse saveOrUpdate(RoleDto dto);

    ApiResponse deleteById(String id);

    ApiResponse findById(String id);
    RoleDto generateRoleDto(Role role);
    Role generateRole(RoleDto role);
}
