package com.portfolio.portfolio.backend.controller;

import com.portfolio.portfolio.backend.dto.LoginRequest;
import com.portfolio.portfolio.backend.dto.LoginResponse;
import com.portfolio.portfolio.backend.entity.User;
import com.portfolio.portfolio.backend.repository.UserRepository;
import com.portfolio.portfolio.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // On cherche l'utilisateur par email
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElse(null);

        // Si l'utilisateur n'existe pas, ou si le mot de passe ne correspond pas, on refuse
        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("Email ou mot de passe incorrect");
        }

        // Identifiants corrects : on génère un token et on le renvoie
        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(new LoginResponse(token));
    }
}