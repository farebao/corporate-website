# 前后端联调修改教程

> 本文档说明如何将现有 Next.js 前端与 SpringBoot 后端联调。
> 已完成的修改（本项目中已自动应用）和可选的进一步配置。

---

## 一、已完成的修改

以下两个文件已经修改完毕，可以直接使用：

### 1. 联系表单 — `src/app/contact/ContactContent.tsx`

**修改内容：** 将 `handleSubmit` 中的模拟提交（setTimeout）替换为真实 API 调用。

**修改前（第48-58行）：**
```typescript
const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    showToast('感谢您的留言！我们会尽快与您联系。', 'success');
    setFormData({ name: '', email: '', company: '', subject: '', message: '' });
};
```

**修改后：**
```typescript
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080/api';

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || '提交失败');
      }
      showToast('感谢您的留言！我们会尽快与您联系。', 'success');
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
    } catch (error) {
      showToast(error instanceof Error ? error.message : '提交失败，请稍后重试', 'error');
    } finally {
      setIsSubmitting(false);
    }
};
```

### 2. AI客服 — `src/components/chatbot/ChatWidget.tsx`

**修改内容：** 将本地关键词匹配改为调用后端 DeepSeek API，后端不可用时自动降级到本地匹配。

**主要变更：**
- 新增 `getSessionId()` 函数，在 sessionStorage 中生成并持久化会话UUID
- `handleSend` 从同步改为异步，先尝试调用后端 `/api/chat/send`
- 如果后端不可用（网络错误、服务未启动等），自动降级到本地 `matchQuestion()`
- 使用 `useRef` 存储 sessionId，避免每次渲染重新生成

---

## 二、环境变量配置（可选）

### 创建 `.env.local` 文件

在项目根目录创建 `.env.local` 文件，配置后端API地址：

```bash
# .env.local
NEXT_PUBLIC_API_BASE=http://localhost:8080/api
```

**说明：**
- 变量名必须以 `NEXT_PUBLIC_` 开头，才能在客户端代码中访问
- 如果不配置，默认使用 `http://localhost:8080/api`
- 部署到生产环境时，修改为实际的后端地址

### 不同环境的配置

| 环境 | 文件 | API地址 |
|------|------|---------|
| 本地开发 | `.env.local` | `http://localhost:8080/api` |
| 测试环境 | `.env.development` | `http://test-api.yourdomain.com/api` |
| 生产环境 | `.env.production` | `https://api.yourdomain.com/api` |

---

## 三、本地联调步骤

### 第1步：启动后端

```bash
cd backend
mvn spring-boot:run
```

等待控制台出现：
```
Started CorporateWebsiteApplication in X.XX seconds
```

### 第2步：启动前端

```bash
# 在项目根目录
npm run dev
```

### 第3步：测试联调

1. **测试留言表单**
   - 打开 http://localhost:3000/corporate-website/contact/
   - 填写表单并提交
   - 检查后端控制台是否有 SQL 日志
   - 在 Navicat 中查询 `messages` 表确认数据已入库

2. **测试AI客服**
   - 点击右下角聊天图标
   - 发送消息（如"你们的服务有哪些？"）
   - 如果后端正常且 DeepSeek API Key 已配置，会收到AI回复
   - 如果后端不可用，会降级到本地关键词匹配

3. **测试管理后台**
   - 使用 Postman 调用登录接口获取 Token
   - 使用 Token 查询留言列表

---

## 四、CORS 跨域配置

后端已配置 CORS 允许以下来源：

```
http://localhost:*          （前端开发服务器）
https://farebao.github.io   （GitHub Pages 部署）
```

如果你的前端运行在其他端口或域名，需要修改 `backend/src/main/java/com/corp/website/config/CorsConfig.java`：

```java
config.setAllowedOriginPatterns(List.of(
    "http://localhost:*",
    "https://your-domain.com"  // 添加你的域名
));
```

---

## 五、常见问题

### Q1: 前端报 `Failed to fetch`
**原因：** 后端未启动或端口不对
**解决：** 确认后端在 8080 端口运行，访问 http://localhost:8080/api/messages 测试

### Q2: 前端报 `401 Unauthorized`
**原因：** 访问管理员接口时未携带 Token
**解决：** 这是正常行为，管理员接口需要登录后携带 Token 访问

### Q3: AI客服返回"AI服务暂时不可用"
**原因：** DeepSeek API Key 未配置或无效
**解决：** 修改 `backend/src/main/resources/application.yml` 中的 `deepseek.api-key`

### Q4: 前端静态导出后联调无效
**原因：** `npm run build` 生成的是纯静态文件，不支持动态环境变量
**解决：** 开发联调时使用 `npm run dev`，不要用静态导出
