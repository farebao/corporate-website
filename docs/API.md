# RESTful 接口文档

> 基础路径: `http://localhost:8080/api`
>
> Content-Type: `application/json`

---

## 一、前台公开接口（无需认证）

### 1. 提交留言

**POST** `/messages`

**请求体：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | ✅ | 姓名（≥2字符） |
| email | string | ✅ | 邮箱（需符合格式） |
| company | string | ❌ | 公司名称 |
| subject | string | ❌ | 咨询主题 |
| message | string | ✅ | 留言内容（≥10字符） |

**请求示例：**

```json
{
  "name": "张三",
  "email": "zhangsan@example.com",
  "company": "ABC科技有限公司",
  "subject": "数字化转型咨询",
  "message": "我们公司想了解数字化转型的解决方案，请联系我。"
}
```

**成功响应（200）：**

```json
{
  "success": true,
  "message": "留言提交成功",
  "data": {
    "id": 1
  }
}
```

**失败响应（400）：**

```json
{
  "code": 400,
  "message": "参数校验失败",
  "errors": {
    "name": "姓名不能为空",
    "email": "请输入有效的邮箱地址",
    "message": "留言内容至少10个字符"
  }
}
```

---

### 2. AI客服发送消息

**POST** `/chat/send`

**请求体：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| sessionId | string | ✅ | 会话ID（前端生成UUID） |
| content | string | ✅ | 用户消息内容 |

**请求示例：**

```json
{
  "sessionId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "content": "你们的服务有哪些？"
}
```

**成功响应（200）：**

```json
{
  "reply": "我们提供一体化的企业级解决方案，涵盖技术研发、品牌营销、数字化转型咨询等。您可以在\"产品服务\"页面了解详情。",
  "sessionId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

**说明：**
- 后端会自动创建会话并保存聊天记录
- AI会参考最近10条历史消息进行回复
- 如果 DeepSeek API 不可用，会返回降级提示

---

### 3. 获取聊天历史

**GET** `/chat/history/{sessionId}`

**路径参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| sessionId | string | 会话ID |

**成功响应（200）：**

```json
[
  {
    "id": 1,
    "sessionId": "a1b2c3d4-...",
    "role": "user",
    "content": "你们的服务有哪些？",
    "createdAt": "2024-01-15T10:30:00"
  },
  {
    "id": 2,
    "sessionId": "a1b2c3d4-...",
    "role": "assistant",
    "content": "我们提供一体化的企业级解决方案...",
    "createdAt": "2024-01-15T10:30:02"
  }
]
```

---

## 二、管理员接口（需JWT认证）

> 所有管理员接口需在请求头中携带：
> ```
> Authorization: Bearer <token>
> ```

### 4. 管理员登录

**POST** `/admin/login`

**请求体：**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**成功响应（200）：**

```json
{
  "token": "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcwNTIwMDAwMCwiZXhwIjoxNzA1Mjg2NDAwfQ.xxx",
  "username": "admin",
  "displayName": "系统管理员"
}
```

**失败响应（401）：**

```json
{
  "code": 401,
  "message": "用户名或密码错误"
}
```

---

### 5. 获取管理员信息

**GET** `/admin/profile`

**请求头：** `Authorization: Bearer <token>`

**成功响应（200）：**

```json
{
  "username": "admin",
  "displayName": "系统管理员"
}
```

---

### 6. 查询留言列表

**GET** `/admin/messages?page=0&size=10&status=0`

**请求头：** `Authorization: Bearer <token>`

**查询参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | int | ❌ | 页码（从0开始，默认0） |
| size | int | ❌ | 每页条数（默认10） |
| status | int | ❌ | 筛选状态：0=未读, 1=已读, 2=已回复（不传则查全部） |

**成功响应（200）：**

```json
{
  "content": [
    {
      "id": 1,
      "name": "张三",
      "email": "zhangsan@example.com",
      "company": "ABC科技",
      "subject": "数字化转型咨询",
      "message": "我们公司想了解...",
      "status": 0,
      "adminReply": null,
      "createdAt": "2024-01-15T10:30:00",
      "updatedAt": "2024-01-15T10:30:00"
    }
  ],
  "page": 0,
  "size": 10,
  "totalElements": 25,
  "totalPages": 3
}
```

---

### 7. 获取单条留言详情

**GET** `/admin/messages/{id}`

**请求头：** `Authorization: Bearer <token>`

**说明：** 自动将未读留言标记为已读

**成功响应（200）：**

```json
{
  "id": 1,
  "name": "张三",
  "email": "zhangsan@example.com",
  "company": "ABC科技",
  "subject": "数字化转型咨询",
  "message": "我们公司想了解数字化转型的解决方案，请联系我。",
  "status": 1,
  "adminReply": null,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:35:00"
}
```

---

### 8. 更新留言（回复/改状态）

**PUT** `/admin/messages/{id}`

**请求头：** `Authorization: Bearer <token>`

**请求体：**

| 字段 | 类型 | 说明 |
|------|------|------|
| status | int | 状态：0=未读, 1=已读, 2=已回复 |
| adminReply | string | 管理员回复内容（设置此字段会自动将status改为2） |

**请求示例：**

```json
{
  "status": 2,
  "adminReply": "感谢您的咨询！我们的顾问会在24小时内与您联系。"
}
```

**成功响应（200）：**

```json
{
  "success": true,
  "message": "更新成功",
  "data": {
    "id": 1,
    "name": "张三",
    "status": 2,
    "adminReply": "感谢您的咨询！我们的顾问会在24小时内与您联系。",
    "updatedAt": "2024-01-15T11:00:00"
  }
}
```

---

### 9. 删除留言

**DELETE** `/admin/messages/{id}`

**请求头：** `Authorization: Bearer <token>`

**成功响应（200）：**

```json
{
  "success": true,
  "message": "删除成功"
}
```

---

### 10. 获取统计数据

**GET** `/admin/stats`

**请求头：** `Authorization: Bearer <token>`

**成功响应（200）：**

```json
{
  "unreadMessages": 5
}
```

---

## 三、错误码说明

| HTTP状态码 | 说明 |
|-----------|------|
| 200 | 成功 |
| 400 | 参数校验失败 |
| 401 | 未认证/Token无效/密码错误 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 四、Postman 快速测试

### 步骤1：登录获取Token
```
POST http://localhost:8080/api/admin/login
Body (raw JSON):
{"username": "admin", "password": "admin123"}
```

### 步骤2：使用Token访问管理接口
```
GET http://localhost:8080/api/admin/messages
Headers:
  Authorization: Bearer <上一步返回的token>
```

### 步骤3：测试前台留言
```
POST http://localhost:8080/api/messages
Body (raw JSON):
{
  "name": "测试用户",
  "email": "test@example.com",
  "company": "测试公司",
  "subject": "测试主题",
  "message": "这是一条测试留言，至少需要10个字符。"
}
```

### 步骤4：测试AI客服
```
POST http://localhost:8080/api/chat/send
Body (raw JSON):
{
  "sessionId": "test-session-001",
  "content": "你们的服务有哪些？"
}
```
