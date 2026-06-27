-- ============================================
-- 企业官网数据库建表脚本
-- 数据库: corporate_website
-- 字符集: utf8mb4
-- ============================================

-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS corporate_website
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;

USE corporate_website;

-- ============================================
-- 1. 留言表 messages
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL COMMENT '姓名',
    email VARCHAR(200) NOT NULL COMMENT '邮箱',
    company VARCHAR(200) DEFAULT NULL COMMENT '公司名称',
    subject VARCHAR(200) DEFAULT NULL COMMENT '咨询主题',
    message TEXT NOT NULL COMMENT '留言内容',
    status TINYINT DEFAULT 0 COMMENT '状态: 0=未读, 1=已读, 2=已回复',
    admin_reply TEXT DEFAULT NULL COMMENT '管理员回复内容',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='客户留言表';

-- ============================================
-- 2. 聊天会话表 chat_sessions
-- ============================================
CREATE TABLE IF NOT EXISTS chat_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(64) NOT NULL UNIQUE COMMENT '会话唯一标识(UUID)',
    visitor_ip VARCHAR(64) DEFAULT NULL COMMENT '访客IP地址',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后活跃时间',
    INDEX idx_session_id (session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='AI客服会话表';

-- ============================================
-- 3. 聊天消息表 chat_messages
-- ============================================
CREATE TABLE IF NOT EXISTS chat_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(64) NOT NULL COMMENT '关联的会话ID',
    role ENUM('user', 'assistant', 'system') NOT NULL COMMENT '消息角色',
    content TEXT NOT NULL COMMENT '消息内容',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX idx_session_id (session_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='AI客服聊天消息表';

-- ============================================
-- 4. 管理员表 admins
-- ============================================
CREATE TABLE IF NOT EXISTS admins (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    password_hash VARCHAR(200) NOT NULL COMMENT 'BCrypt加密密码',
    display_name VARCHAR(100) DEFAULT NULL COMMENT '显示名称',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员表';

-- 注意：默认管理员账号由应用启动时自动创建（admin / admin123）
-- 密码通过 BCrypt 加密存储，详见 AdminService.initAdmin()
