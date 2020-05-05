package com.curtisnewbie.dto;

/**
 * ------------------------------------
 * <p>
 * Author: Yongjie Zhuang
 * <p>
 * ------------------------------------
 * <p>
 * DTO for HTTP POST request that creates a new {@code Comment}.
 * </p>
 */
public class PostCommentDTO {
    public String message;
    public long parentCommentId;
}