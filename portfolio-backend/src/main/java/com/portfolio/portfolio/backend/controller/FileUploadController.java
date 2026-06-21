package com.portfolio.portfolio.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    private final String uploadDir = "images/";

    @PostMapping
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String uniqueFilename = UUID.randomUUID().toString() + extension;

            Path filePath = uploadPath.resolve(uniqueFilename);
            Files.copy(file.getInputStream(), filePath);

            Map<String, String> response = new HashMap<>();
            response.put("url", "/images/" + uniqueFilename);
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            return ResponseEntity.status(500).body(Map.of("error", "Erreur lors de l'upload"));
        }
    }

    // Supprime un fichier image du serveur à partir de son URL
    @DeleteMapping
    public ResponseEntity<Void> deleteFile(@RequestParam("url") String url) {
        try {
            // On extrait juste le nom du fichier depuis l'URL (ex: "/images/abc123.jpg" -> "abc123.jpg")
            String filename = url.substring(url.lastIndexOf("/") + 1);
            Path filePath = Paths.get(uploadDir, filename);
            Files.deleteIfExists(filePath);
            return ResponseEntity.noContent().build();
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }
}