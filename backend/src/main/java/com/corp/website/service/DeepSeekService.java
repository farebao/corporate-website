package com.corp.website.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class DeepSeekService {

    @Value("${deepseek.api-key}")
    private String apiKey;

    @Value("${deepseek.api-url}")
    private String apiUrl;

    @Value("${deepseek.model}")
    private String model;

    @Value("${deepseek.max-tokens}")
    private int maxTokens;

    @Value("${deepseek.temperature}")
    private double temperature;

    @Value("${deepseek.system-prompt}")
    private String systemPrompt;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * 调用 DeepSeek Chat API
     *
     * @param historyMessages 历史消息列表，每条包含 role 和 content
     * @param userMessage     当前用户消息
     * @return AI回复内容
     */
    public String chat(List<Map<String, String>> historyMessages, String userMessage) {
        try {
            // 构建请求体
            ObjectNode requestBody = objectMapper.createObjectNode();
            requestBody.put("model", model);
            requestBody.put("max_tokens", maxTokens);
            requestBody.put("temperature", temperature);

            // 构建 messages 数组
            ArrayNode messages = objectMapper.createArrayNode();

            // System prompt
            ObjectNode systemMsg = objectMapper.createObjectNode();
            systemMsg.put("role", "system");
            systemMsg.put("content", systemPrompt);
            messages.add(systemMsg);

            // 历史消息
            for (Map<String, String> msg : historyMessages) {
                ObjectNode historyMsg = objectMapper.createObjectNode();
                historyMsg.put("role", msg.get("role"));
                historyMsg.put("content", msg.get("content"));
                messages.add(historyMsg);
            }

            // 当前用户消息
            ObjectNode userMsg = objectMapper.createObjectNode();
            userMsg.put("role", "user");
            userMsg.put("content", userMessage);
            messages.add(userMsg);

            requestBody.set("messages", messages);

            // 设置请求头
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            HttpEntity<String> entity = new HttpEntity<>(objectMapper.writeValueAsString(requestBody), headers);

            // 发送请求
            ResponseEntity<String> response = restTemplate.exchange(
                    apiUrl,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            // 解析响应
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                JsonNode root = objectMapper.readTree(response.getBody());
                JsonNode choices = root.path("choices");
                if (choices.isArray() && choices.size() > 0) {
                    return choices.get(0).path("message").path("content").asText();
                }
            }

            return "抱歉，AI服务暂时无法响应，请稍后再试。";

        } catch (Exception e) {
            System.err.println("[DeepSeek API 调用失败] " + e.getMessage());
            return "抱歉，AI服务暂时不可用。您可以留下联系方式，我们的顾问会尽快与您联系。";
        }
    }
}
