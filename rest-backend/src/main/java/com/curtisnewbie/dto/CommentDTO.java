package com.curtisnewbie.dto;

import java.util.Date;
import java.util.List;

/**
 * ------------------------------------
 * <p>
 * Author: Yongjie Zhuang
 * <p>
 * ------------------------------------
 * <p>
 * DTO for {@code Comment} model
 * </p>
 */
public class CommentDTO {

    public Long id;
    public String message;
    public Date timestamp;
    public List<CommentDTO> childComments;
}