package com.portfolio.portfolio.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Toute requête vers /images/** sera servie depuis le dossier physique "images/"
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:images/");
    }
}