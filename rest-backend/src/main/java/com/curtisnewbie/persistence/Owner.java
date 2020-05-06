package com.curtisnewbie.persistence;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

import com.curtisnewbie.dto.OwnerDTO;

/**
 * ------------------------------------
 * <p>
 * Author: Yongjie Zhuang
 * <p>
 * ------------------------------------
 * <p>
 * Representation of Owner
 * </p>
 */
@Embeddable
public class Owner {
    @NotNull
    private String loginName;
    private String avatar_url;
    private String html_url;

    public Owner() {
    }

    public Owner(OwnerDTO dto) {
        this.loginName = dto.login;
        this.avatar_url = dto.avatar_url;
        this.html_url = dto.html_url;
    }

    /**
     * @return the avatar_url
     */
    public String getAvatar_url() {
        return avatar_url;
    }

    /**
     * @param avatar_url the avatar_url to set
     */
    public void setAvatar_url(String avatar_url) {
        this.avatar_url = avatar_url;
    }

    /**
     * @return the html_url
     */
    public String getHtml_url() {
        return html_url;
    }

    /**
     * @param html_url the html_url to set
     */
    public void setHtml_url(String html_url) {
        this.html_url = html_url;
    }

    /**
     * @return the loginName
     */
    public String getLoginName() {
        return loginName;
    }

    /**
     * @param loginName the loginName to set
     */
    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

}