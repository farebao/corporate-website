package com.corp.website.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MessageDTO {

    @NotBlank(message = "姓名不能为空")
    @Min(value = 2, message = "姓名至少2个字符")
    private String name;

    @NotBlank(message = "邮箱不能为空")
    @Email(message = "请输入有效的邮箱地址")
    private String email;

    private String company;

    private String subject;

    @NotBlank(message = "留言内容不能为空")
    @Min(value = 10, message = "留言内容至少10个字符")
    private String message;
}
