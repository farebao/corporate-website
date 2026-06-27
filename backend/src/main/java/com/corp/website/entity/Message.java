package com.corp.website.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 200)
    private String email;

    @Column(length = 200)
    private String company;

    @Column(length = 200)
    private String subject;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    /**
     * 状态: 0=未读, 1=已读, 2=已回复
     */
    @Column(columnDefinition = "TINYINT DEFAULT 0")
    private Integer status = 0;

    @Column(columnDefinition = "TEXT")
    private String adminReply;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
