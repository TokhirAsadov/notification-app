package com.tohir.service.controller;

import com.tohir.service.entity.User;
import com.tohir.service.payload.ApiResponse;
import com.tohir.service.payload.UserDto;
import com.tohir.service.repository.UserRepository;
import com.tohir.service.security.CurrentUser;
import com.tohir.service.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;


@RestController
@RequestMapping(BaseUrl.BASE_URL+"/user")
@RequiredArgsConstructor
public class UserController {
    public final UserService userService;
    public final UserRepository userRepository;
    public final PasswordEncoder passwordEncoder;


    @GetMapping("/me")
    public HttpEntity<?> me(@CurrentUser User user){
        return ResponseEntity.status(user!=null?200:409).body(new ApiResponse(user != null,"Ok"));
    }

    @GetMapping("/getAllUsers")
    public HttpEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }


    @PostMapping("/createUser")
    public HttpEntity<?> saveUser(@RequestBody UserDto dto) {
        return ResponseEntity.status(201).body(userService.saveOrUpdate(dto));
    }

    @GetMapping("/getUserById/{id}")
    public HttpEntity<?> getUserById(@PathVariable String  id){
            return ResponseEntity.ok(userService.findById(id));
    }

    @GetMapping("/getUserByEmail/{email}")
    public HttpEntity<?> getUserByEmail(@PathVariable String  email){
            return ResponseEntity.ok(userService.getUserByEmail(email));
    }
    @PutMapping("/updateUser")
    public HttpEntity<?> updateFaculty(@RequestBody UserDto dto){
        return ResponseEntity.status(202).body(userService.saveOrUpdate(dto));
    }

    @DeleteMapping("/deleteUser/{id}")
    public HttpEntity<?> deleteUser(@PathVariable String id){
        return ResponseEntity.status(204).body(userService.deleteById(id));
    }

    @GetMapping("/getUserFields")
    public HttpEntity<?> getUserFields(@CurrentUser User user){
        return ResponseEntity.ok(userService.getUserFields(user.getId()));
    }

}
