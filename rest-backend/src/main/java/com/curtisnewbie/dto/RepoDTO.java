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
 * DTO of a Github Repository. Only part of the data are included in this DTO.
 * </p>
 */
public class RepoDTO {

    public Long id;
    public String name;
    public String full_name;
    public OwnerDTO owner;
    public String description;
    public Date created_at;
    public Date updated_at;
    public Date pushed_at;
    public int stargazers_count;
    public LicenseDTO license;
    public String language;
}