package com.tohir.service.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String id;
    private String firstName;
    private String lastName;
    private String middleName;
    private String login;
    private String password;
    private String email;

    private Set<RoleDto> roles;

    public UserDto(String id, String firstName, String lastName, String middleName, String email, Set<RoleDto> roles) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.email = email;
        this.roles = roles;
    }
}
