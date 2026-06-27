package com.corp.website.repository;

import com.corp.website.entity.ChatMessage;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    /**
     * 获取指定会话的最近N条消息（按时间正序）
     */
    @Query("SELECT m FROM ChatMessage m WHERE m.sessionId = :sessionId ORDER BY m.createdAt DESC")
    List<ChatMessage> findRecentBySessionId(@Param("sessionId") String sessionId, Pageable pageable);

    List<ChatMessage> findBySessionIdOrderByCreatedAtAsc(String sessionId);

    long countBySessionId(String sessionId);
}
