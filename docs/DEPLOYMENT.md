# 本地部署步骤

> 适用于 Windows 环境，已安装 IDEA、Navicat、Postman、MySQL

---

## 一、环境要求

| 工具 | 版本要求 | 用途 |
|------|---------|------|
| JDK | 17+ | SpringBoot 运行环境 |
| Maven | 3.8+ | 项目构建 |
| MySQL | 8.0+ | 数据库 |
| Node.js | 18+ | 前端开发服务器 |
| IDEA | 2023+ | 后端开发/运行 |
| Navicat | 任意 | 数据库管理 |
| Postman | 任意 | API 测试 |

---

## 二、数据库初始化

### 步骤1：创建数据库

打开 Navicat，连接本地 MySQL，新建查询执行：

```sql
CREATE DATABASE IF NOT EXISTS corporate_website
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;
```

或者直接执行 `backend/src/main/resources/schema.sql` 中的完整建表脚本。

### 步骤2：执行建表SQL

在 Navicat 中打开 `corporate_website` 数据库，执行以下 SQL：

```sql
USE corporate_website;

-- 留言表
CREATE TABLE IF NOT EXISTS messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL COMMENT '姓名',
    email VARCHAR(200) NOT NULL COMMENT '邮箱',
    company VARCHAR(200) DEFAULT NULL COMMENT '公司名称',
    subject VARCHAR(200) DEFAULT NULL COMMENT '咨询主题',
    message TEXT NOT NULL COMMENT '留言内容',
    status TINYINT DEFAULT 0 COMMENT '状态: 0=未读, 1=已读, 2=已回复',
    admin_reply TEXT DEFAULT NULL COMMENT '管理员回复内容',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 聊天会话表
CREATE TABLE IF NOT EXISTS chat_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(64) NOT NULL UNIQUE COMMENT '会话唯一标识',
    visitor_ip VARCHAR(64) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_session_id (session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 聊天消息表
CREATE TABLE IF NOT EXISTS chat_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(64) NOT NULL,
    role ENUM('user', 'assistant', 'system') NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_session_id (session_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 管理员表
CREATE TABLE IF NOT EXISTS admins (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(200) NOT NULL,
    display_name VARCHAR(100) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

> **注意：** 管理员数据会在应用首次启动时自动创建（admin / admin123），无需手动插入。

### 步骤3：验证数据库

在 Navicat 中刷新 `corporate_website` 数据库，确认4张表已创建。

---

## 三、后端配置与启动

### 步骤1：配置数据库连接

编辑 `backend/src/main/resources/application.yml`，修改数据库账号密码：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/corporate_website?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true&useSSL=false
    username: root        # ← 改为你的MySQL用户名
    password: root        # ← 改为你的MySQL密码
```

### 步骤2：配置 DeepSeek API Key

1. 访问 https://platform.deepseek.com/ 注册账号
2. 在「API Keys」页面创建新的 API Key
3. 编辑 `application.yml`，填入你的 Key：

```yaml
deepseek:
  api-key: sk-xxxxxxxxxxxxxxxxxxxxxxxx    # ← 替换为你的API Key
```

> **注意：** 不配置 API Key 也可以启动，AI客服会提示"服务不可用"并建议留联系方式。

### 步骤3：用 IDEA 打开后端项目

1. 打开 IDEA → File → Open
2. 选择 `企业级官网/backend/` 目录
3. IDEA 会自动识别为 Maven 项目，等待依赖下载完成
4. 如果提示 "Maven projects need to be imported"，点击 "Import Changes"

### 步骤4：启动后端

**方式A：IDEA 中启动**
- 找到 `CorporateWebsiteApplication.java`
- 右键 → Run 'CorporateWebsiteApplication'
- 等待控制台出现 `Started CorporateWebsiteApplication`

**方式B：命令行启动**
```bash
cd backend
mvn spring-boot:run
```

### 步骤5：验证后端启动

浏览器或 Postman 访问：
```
POST http://localhost:8080/api/messages
Body (JSON):
{"name":"测试","email":"test@test.com","message":"这是一条测试留言内容，超过十个字符。"}
```

应返回：
```json
{"success": true, "message": "留言提交成功", "data": {"id": 1}}
```

在 Navicat 中查询 `SELECT * FROM messages;` 确认数据已入库。

---

## 四、前端启动与联调

### 步骤1：安装依赖

```bash
# 在项目根目录（企业级官网/）
npm install
```

### 步骤2：创建环境变量文件

在项目根目录创建 `.env.local`：

```
NEXT_PUBLIC_API_BASE=http://localhost:8080/api
```

### 步骤3：启动前端

```bash
npm run dev
```

访问 http://localhost:3000/corporate-website/

### 步骤4：联调测试

1. **留言测试：** 打开联系页面 → 填写表单 → 提交 → Navicat 查库
2. **AI客服测试：** 点击右下角聊天 → 发送消息 → 观察回复
3. **管理后台测试：** 用 Postman 登录 → 查询留言列表

---

## 五、Postman 完整测试流程

### 1. 导入测试（手动创建请求）

**请求1：管理员登录**
```
POST http://localhost:8080/api/admin/login
Headers: Content-Type: application/json
Body:
{
    "username": "admin",
    "password": "admin123"
}
```
→ 复制返回的 `token`

**请求2：查询留言列表**
```
GET http://localhost:8080/api/admin/messages?page=0&size=10
Headers: Authorization: Bearer <粘贴token>
```

**请求3：查看单条留言**
```
GET http://localhost:8080/api/admin/messages/1
Headers: Authorization: Bearer <粘贴token>
```

**请求4：回复留言**
```
PUT http://localhost:8080/api/admin/messages/1
Headers: 
  Content-Type: application/json
  Authorization: Bearer <粘贴token>
Body:
{
    "status": 2,
    "adminReply": "感谢您的咨询，我们的顾问会尽快联系您！"
}
```

**请求5：提交前台留言**
```
POST http://localhost:8080/api/messages
Headers: Content-Type: application/json
Body:
{
    "name": "李四",
    "email": "lisi@company.com",
    "company": "XYZ科技",
    "subject": "产品咨询",
    "message": "想了解你们的数字化转型解决方案，能否安排一次会议？"
}
```

**请求6：AI客服对话**
```
POST http://localhost:8080/api/chat/send
Headers: Content-Type: application/json
Body:
{
    "sessionId": "test-session-001",
    "content": "你好，请问你们提供哪些服务？"
}
```

**请求7：获取聊天历史**
```
GET http://localhost:8080/api/chat/history/test-session-001
```

---

## 六、项目结构总览

```
企业级官网/
├── backend/                          # SpringBoot 后端
│   ├── pom.xml                       # Maven 配置
│   └── src/main/
│       ├── java/com/corp/website/
│       │   ├── CorporateWebsiteApplication.java   # 启动类
│       │   ├── config/               # 配置类
│       │   │   ├── CorsConfig.java
│       │   │   ├── SecurityConfig.java
│       │   │   ├── JwtAuthFilter.java
│       │   │   ├── WebConfig.java
│       │   │   └── GlobalExceptionHandler.java
│       │   ├── controller/           # 控制器
│       │   │   ├── MessageController.java
│       │   │   ├── ChatController.java
│       │   │   └── AdminController.java
│       │   ├── entity/               # 实体类
│       │   │   ├── Message.java
│       │   │   ├── ChatSession.java
│       │   │   ├── ChatMessage.java
│       │   │   └── Admin.java
│       │   ├── repository/           # 数据访问层
│       │   │   ├── MessageRepository.java
│       │   │   ├── ChatSessionRepository.java
│       │   │   ├── ChatMessageRepository.java
│       │   │   └── AdminRepository.java
│       │   ├── service/              # 业务逻辑层
│       │   │   ├── MessageService.java
│       │   │   ├── ChatService.java
│       │   │   ├── DeepSeekService.java
│       │   │   └── AdminService.java
│       │   ├── dto/                  # 数据传输对象
│       │   │   ├── MessageDTO.java
│       │   │   ├── ChatRequest.java
│       │   │   ├── ChatResponse.java
│       │   │   ├── LoginRequest.java
│       │   │   ├── LoginResponse.java
│       │   │   ├── MessageReplyDTO.java
│       │   │   └── PageResult.java
│       │   └── util/
│       │       └── JwtUtil.java
│       └── resources/
│           ├── application.yml       # 应用配置
│           └── schema.sql            # 建表SQL
├── docs/                             # 文档
│   ├── API.md                        # 接口文档
│   ├── FRONTEND-INTEGRATION.md       # 联调教程
│   └── DEPLOYMENT.md                 # 部署步骤（本文档）
├── src/                              # Next.js 前端（已有修改）
│   └── ...
└── package.json
```

---

## 七、常见问题排查

### Q1: Maven 依赖下载慢
**解决：** 配置阿里云镜像仓库，在 `~/.m2/settings.xml` 中添加：
```xml
<mirrors>
  <mirror>
    <id>aliyun</id>
    <mirrorOf>central</mirrorOf>
    <url>https://maven.aliyun.com/repository/central</url>
  </mirror>
</mirrors>
```

### Q2: MySQL 连接失败 `Access denied`
**解决：** 检查 `application.yml` 中的 `username` 和 `password` 是否与你的 MySQL 一致

### Q3: MySQL 连接失败 `Public Key Retrieval`
**解决：** URL 中已包含 `allowPublicKeyRetrieval=true`，如仍有问题尝试 `useSSL=false`

### Q4: 端口 8080 被占用
**解决：** 修改 `application.yml` 中的 `server.port` 为其他端口（如 8081），同时修改前端 `.env.local`

### Q5: SpringBoot 启动报 `table doesn't exist`
**解决：** 确认已执行 `schema.sql` 建表脚本，或者检查 `ddl-auto: update` 配置是否正确

### Q6: AI客服无响应
**原因：** DeepSeek API Key 未配置或网络不通
**验证：** 检查后端控制台是否有 `[DeepSeek API 调用失败]` 日志
**解决：** 配置有效的 API Key，或确认可以访问 https://api.deepseek.com
