package com.corp.website.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 参数校验异常
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        Map<String, Object> body = new HashMap<>();
        body.put("code", 400);
        body.put("message", "参数校验失败");
        body.put("errors", errors);
        return ResponseEntity.badRequest().body(body);
    }

    /**
     * 业务异常
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntime(RuntimeException ex) {
        Map<String, Object> body = new HashMap<>();
        String msg = ex.getMessage();

        if (msg != null && (msg.contains("不存在") || msg.contains("找不到"))) {
            body.put("code", 404);
            body.put("message", msg);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
        }

        if (msg != null && msg.contains("密码错误")) {
            body.put("code", 401);
            body.put("message", msg);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(body);
        }

        body.put("code", 500);
        body.put("message", msg != null ? msg : "服务器内部错误");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
}
