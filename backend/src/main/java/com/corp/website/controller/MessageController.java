package com.corp.website.controller;

import com.corp.website.dto.MessageDTO;
import com.corp.website.entity.Message;
import com.corp.website.service.MessageService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 前台留言接口（无需认证）
 */
@RestController
@RequestMapping("/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    /**
     * 提交留言
     * POST /api/messages
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createMessage(@Valid @RequestBody MessageDTO dto) {
        Message message = messageService.createMessage(dto);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "留言提交成功",
                "data", Map.of("id", message.getId())
        ));
    }
}
