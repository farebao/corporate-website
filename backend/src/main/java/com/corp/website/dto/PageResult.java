package com.corp.website.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
public class PageResult<T> {

    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
}
