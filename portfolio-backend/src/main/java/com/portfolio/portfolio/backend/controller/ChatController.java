package com.portfolio.portfolio.backend.controller;

import com.portfolio.portfolio.backend.dto.ChatRequest;
import com.portfolio.portfolio.backend.dto.ChatResponse;
import com.portfolio.portfolio.backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping
    public ResponseEntity<ChatResponse> ask(@RequestBody ChatRequest request) {
        String answer = chatService.askQuestion(request.getQuestion());
        return ResponseEntity.ok(new ChatResponse(answer));
    }
}