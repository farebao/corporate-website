package com.corp.website.service;

import com.corp.website.dto.MessageDTO;
import com.corp.website.dto.MessageReplyDTO;
import com.corp.website.dto.PageResult;
import com.corp.website.entity.Message;
import com.corp.website.repository.MessageRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    /**
     * 前台提交留言
     */
    @Transactional
    public Message createMessage(MessageDTO dto) {
        Message message = new Message();
        message.setName(dto.getName());
        message.setEmail(dto.getEmail());
        message.setCompany(dto.getCompany());
        message.setSubject(dto.getSubject());
        message.setMessage(dto.getMessage());
        message.setStatus(0);
        return messageRepository.save(message);
    }

    /**
     * 分页查询所有留言（管理员）
     */
    public PageResult<Message> getMessages(int page, int size, Integer status) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Message> pageData;
        if (status != null) {
            pageData = messageRepository.findByStatusOrderByCreatedAtDesc(status, pageRequest);
        } else {
            pageData = messageRepository.findAllByOrderByCreatedAtDesc(pageRequest);
        }
        return new PageResult<>(
                pageData.getContent(),
                pageData.getNumber(),
                pageData.getSize(),
                pageData.getTotalElements(),
                pageData.getTotalPages()
        );
    }

    /**
     * 获取单条留言详情
     */
    public Message getMessageById(Long id) {
        return messageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("留言不存在: " + id));
    }

    /**
     * 更新留言状态/回复
     */
    @Transactional
    public Message updateMessage(Long id, MessageReplyDTO dto) {
        Message message = getMessageById(id);
        if (dto.getStatus() != null) {
            message.setStatus(dto.getStatus());
        }
        if (dto.getAdminReply() != null) {
            message.setAdminReply(dto.getAdminReply());
            message.setStatus(2); // 已回复
        }
        return messageRepository.save(message);
    }

    /**
     * 删除留言
     */
    @Transactional
    public void deleteMessage(Long id) {
        if (!messageRepository.existsById(id)) {
            throw new RuntimeException("留言不存在: " + id);
        }
        messageRepository.deleteById(id);
    }

    /**
     * 获取未读留言数量
     */
    public long getUnreadCount() {
        return messageRepository.countByStatus(0);
    }
}
