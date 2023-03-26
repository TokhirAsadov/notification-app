package com.tohir.service.controller;

import com.tohir.service.payload.ResToken;
import com.tohir.service.payload.SignInDto;
import com.tohir.service.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(BaseUrl.BASE_URL+"/auth")
@RequiredArgsConstructor
public class AuthController {
    public final UserService userService;

    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody SignInDto signInDto){
        ResToken resToken = userService.login(signInDto);
        return ResponseEntity.ok(resToken);
    }
}
