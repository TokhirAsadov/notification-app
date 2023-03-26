package com.tohir.service.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResToken {
    private String tokenType="Bearer ";
    private String accessToken;

    public ResToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
