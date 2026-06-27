package com.corp.website.controller;

import com.corp.website.dto.*;
import com.corp.website.entity.Admin;
import com.corp.website.entity.Message;
import com.corp.website.service.AdminService;
import com.corp.website.service.MessageService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 管理员接口（需要JWT认证）
 */
@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;
    private final MessageService messageService;

    public AdminController(AdminService adminService, MessageService messageService) {
        this.adminService = adminService;
        this.messageService = messageService;
    }

    // ==================== 认证 ====================

    /**
     * 管理员登录
     * POST /api/admin/login
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = adminService.login(request);
        return ResponseEntity.ok(response);
    }

    /**
     * 获取当前管理员信息
     * GET /api/admin/profile
     */
    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getProfile(Authentication authentication) {
        String username = authentication.getName();
        Admin admin = adminService.getAdminByUsername(username);
        return ResponseEntity.ok(Map.of(
                "username", admin.getUsername(),
                "displayName", admin.getDisplayName() != null ? admin.getDisplayName() : admin.getUsername()
        ));
    }

    // ==================== 留言管理 ====================

    /**
     * 分页查询留言列表
     * GET /api/admin/messages?page=0&size=10&status=0
     */
    @GetMapping("/messages")
    public ResponseEntity<PageResult<Message>> getMessages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Integer status) {
        PageResult<Message> result = messageService.getMessages(page, size, status);
        return ResponseEntity.ok(result);
    }

    /**
     * 获取单条留言详情
     * GET /api/admin/messages/{id}
     */
    @GetMapping("/messages/{id}")
    public ResponseEntity<Message> getMessage(@PathVariable Long id) {
        Message message = messageService.getMessageById(id);
        // 标记为已读
        if (message.getStatus() == 0) {
            MessageReplyDTO replyDTO = new MessageReplyDTO();
            replyDTO.setStatus(1);
            message = messageService.updateMessage(id, replyDTO);
        }
        return ResponseEntity.ok(message);
    }

    /**
     * 更新留言状态/回复
     * PUT /api/admin/messages/{id}
     */
    @PutMapping("/messages/{id}")
    public ResponseEntity<Map<String, Object>> updateMessage(
            @PathVariable Long id,
            @RequestBody MessageReplyDTO dto) {
        Message message = messageService.updateMessage(id, dto);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "更新成功",
                "data", message
        ));
    }

    /**
     * 删除留言
     * DELETE /api/admin/messages/{id}
     */
    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Map<String, Object>> deleteMessage(@PathVariable Long id) {
        messageService.deleteMessage(id);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "删除成功"
        ));
    }

    /**
     * 获取统计数据
     * GET /api/admin/stats
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        long unreadCount = messageService.getUnreadCount();
        return ResponseEntity.ok(Map.of(
                "unreadMessages", unreadCount
        ));
    }
}
