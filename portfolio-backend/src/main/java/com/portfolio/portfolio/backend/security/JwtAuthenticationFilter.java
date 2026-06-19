package com.portfolio.portfolio.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        // On récupère le header "Authorization" de la requête
        String authHeader = request.getHeader("Authorization");

        // Si pas de header, ou s'il ne commence pas par "Bearer ", on laisse passer sans authentifier
        // (la route sera quand même bloquée plus tard si elle nécessite une authentification)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // On extrait le token en retirant le préfixe "Bearer "
        String token = authHeader.substring(7);

        // Si le token est valide, on authentifie la requête auprès de Spring Security
        if (jwtUtil.isTokenValid(token)) {
            String email = jwtUtil.extractEmail(token);

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // On continue le traitement normal de la requête
        filterChain.doFilter(request, response);
    }
}