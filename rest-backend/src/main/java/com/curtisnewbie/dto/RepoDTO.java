package com.curtisnewbie.dto;

import java.util.Date;

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
    public String fullName;
    public OwnerDTO owner;
    public String description;
    public Date created_at;
    public Date updated_at;
    public Date pushed_at;
    public int stargazers_count;
    public LicenseDTO license;
    public String language;

    // TODO: Use for testing only
    @Override
    public String toString() {
        return "RepoDTO [created_at=" + created_at + ", description=" + description + ", fullName=" + fullName + ", id="
                + id + ", language=" + language + ", license=" + license + ", name=" + name + ", owner=" + owner
                + ", pushed_at=" + pushed_at + ", stargazers_count=" + stargazers_count + ", updated_at=" + updated_at
                + "]";
    }

}