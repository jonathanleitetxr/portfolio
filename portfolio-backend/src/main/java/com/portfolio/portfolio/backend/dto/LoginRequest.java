package com.portfolio.portfolio.backend.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}