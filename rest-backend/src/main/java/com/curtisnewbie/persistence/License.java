package com.curtisnewbie.persistence;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

import com.curtisnewbie.dto.LicenseDTO;

/**
 * ------------------------------------
 * <p>
 * Author: Yongjie Zhuang
 * <p>
 * ------------------------------------
 * <p>
 * Representation of License
 * </p>
 */
@Embeddable
public class License {
    @NotNull
    @Column(name = "license_name")
    private String name;

    public License() {
    }

    public License(LicenseDTO dto) {
        this.name = dto.name;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

}