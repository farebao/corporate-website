package com.corp.website.service;

import com.corp.website.dto.LoginRequest;
import com.corp.website.dto.LoginResponse;
import com.corp.website.entity.Admin;
import com.corp.website.repository.AdminRepository;
import com.corp.website.util.JwtUtil;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // 从配置文件注入默认管理员信息
    @org.springframework.beans.factory.annotation.Value("${admin.username:admin}")
    private String defaultUsername;

    @org.springframework.beans.factory.annotation.Value("${admin.password:admin123}")
    private String defaultPassword;

    public AdminService(AdminRepository adminRepository,
                        PasswordEncoder passwordEncoder,
                        JwtUtil jwtUtil) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    /**
     * 应用启动时自动创建默认管理员
     */
    @PostConstruct
    public void initAdmin() {
        if (!adminRepository.existsByUsername(defaultUsername)) {
            Admin admin = new Admin();
            admin.setUsername(defaultUsername);
            admin.setPasswordHash(passwordEncoder.encode(defaultPassword));
            admin.setDisplayName("系统管理员");
            adminRepository.save(admin);
            System.out.println("[初始化] 默认管理员已创建: " + defaultUsername);
        }
    }

    /**
     * 管理员登录
     */
    public LoginResponse login(LoginRequest request) {
        Admin admin = adminRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("用户名或密码错误"));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPasswordHash())) {
            throw new RuntimeException("用户名或密码错误");
        }

        String token = jwtUtil.generateToken(admin.getUsername());
        return new LoginResponse(token, admin.getUsername(), admin.getDisplayName());
    }

    /**
     * 根据用户名获取管理员信息
     */
    public Admin getAdminByUsername(String username) {
        return adminRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("管理员不存在: " + username));
    }
}
