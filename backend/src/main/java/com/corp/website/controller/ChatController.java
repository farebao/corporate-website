package com.corp.website.controller;

import com.corp.website.dto.ChatRequest;
import com.corp.website.dto.ChatResponse;
import com.corp.website.entity.ChatMessage;
import com.corp.website.service.ChatService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * AI客服聊天接口（无需认证）
 */
@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    /**
     * 发送消息并获取AI回复
     * POST /api/chat/send
     */
    @PostMapping("/send")
    public ResponseEntity<ChatResponse> sendMessage(@Valid @RequestBody ChatRequest request,
                                                     HttpServletRequest httpRequest) {
        String visitorIp = getClientIp(httpRequest);
        ChatResponse response = chatService.sendMessage(request, visitorIp);
        return ResponseEntity.ok(response);
    }

    /**
     * 获取会话聊天历史
     * GET /api/chat/history/{sessionId}
     */
    @GetMapping("/history/{sessionId}")
    public ResponseEntity<List<ChatMessage>> getChatHistory(@PathVariable String sessionId) {
        List<ChatMessage> history = chatService.getChatHistory(sessionId);
        return ResponseEntity.ok(history);
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        // 多级代理取第一个
        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }
        return ip;
    }
}
