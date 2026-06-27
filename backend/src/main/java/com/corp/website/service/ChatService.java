package com.corp.website.service;

import com.corp.website.dto.ChatRequest;
import com.corp.website.dto.ChatResponse;
import com.corp.website.entity.ChatMessage;
import com.corp.website.entity.ChatSession;
import com.corp.website.repository.ChatMessageRepository;
import com.corp.website.repository.ChatSessionRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ChatSessionRepository chatSessionRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final DeepSeekService deepSeekService;

    public ChatService(ChatSessionRepository chatSessionRepository,
                       ChatMessageRepository chatMessageRepository,
                       DeepSeekService deepSeekService) {
        this.chatSessionRepository = chatSessionRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.deepSeekService = deepSeekService;
    }

    /**
     * 处理用户发送的消息：保存 → 调用AI → 保存回复
     */
    @Transactional
    public ChatResponse sendMessage(ChatRequest request, String visitorIp) {
        String sessionId = request.getSessionId();

        // 确保会话存在
        ensureSession(sessionId, visitorIp);

        // 保存用户消息
        ChatMessage userMsg = new ChatMessage();
        userMsg.setSessionId(sessionId);
        userMsg.setRole(ChatMessage.MessageRole.user);
        userMsg.setContent(request.getContent());
        chatMessageRepository.save(userMsg);

        // 获取历史上下文（最近10条消息）
        List<Map<String, String>> history = getRecentHistory(sessionId, 10);

        // 调用 DeepSeek API
        String aiReply = deepSeekService.chat(history, request.getContent());

        // 保存AI回复
        ChatMessage botMsg = new ChatMessage();
        botMsg.setSessionId(sessionId);
        botMsg.setRole(ChatMessage.MessageRole.assistant);
        botMsg.setContent(aiReply);
        chatMessageRepository.save(botMsg);

        return new ChatResponse(aiReply, sessionId);
    }

    /**
     * 获取指定会话的完整聊天历史
     */
    public List<ChatMessage> getChatHistory(String sessionId) {
        return chatMessageRepository.findBySessionIdOrderByCreatedAtAsc(sessionId);
    }

    /**
     * 确保会话存在，不存在则创建
     */
    private void ensureSession(String sessionId, String visitorIp) {
        if (!chatSessionRepository.existsBySessionId(sessionId)) {
            ChatSession session = new ChatSession();
            session.setSessionId(sessionId);
            session.setVisitorIp(visitorIp);
            chatSessionRepository.save(session);
        }
    }

    /**
     * 获取最近N条历史消息，转换为API格式
     */
    private List<Map<String, String>> getRecentHistory(String sessionId, int limit) {
        List<ChatMessage> recent = chatMessageRepository
                .findRecentBySessionId(sessionId, PageRequest.of(0, limit));

        // 按时间正序排列（最近的在后）
        Collections.reverse(recent);

        return recent.stream()
                .map(msg -> Map.of(
                        "role", msg.getRole().name(),
                        "content", msg.getContent()
                ))
                .collect(Collectors.toList());
    }
}
