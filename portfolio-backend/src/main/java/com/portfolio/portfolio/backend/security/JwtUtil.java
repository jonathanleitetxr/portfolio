package com.portfolio.portfolio.backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    // Clé secrète utilisée pour signer les tokens (en production, à mettre dans une variable d'environnement)
    private final SecretKey secretKey = Keys.hmacShaKeyFor("MaCleSecreteSuperLonguePourSignerLesTokensJWT123456".getBytes());

    // Durée de validité du token : 24h en millisecondes
    private final long EXPIRATION_TIME = 24 * 60 * 60 * 1000;

    // Génère un nouveau token JWT pour un utilisateur donné (identifié par son email)
    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(secretKey)
                .compact();
    }

    // Extrait l'email contenu dans un token
    public String extractEmail(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    // Vérifie si un token est valide (signature correcte et pas expiré)
    public boolean isTokenValid(String token) {
        try {
            Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}