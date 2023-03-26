package com.tohir.service.service.user;

import com.tohir.service.payload.*;

public interface UserService {
    ApiResponse findAll();

    ApiResponse saveOrUpdate(UserDto dto);

    ApiResponse getUserByEmail(String email);

    ApiResponse deleteById(String id);

    ApiResponse findById(String id);

    ResToken login(SignInDto signInDto);

    UserDto getUserFields(String id);
}
