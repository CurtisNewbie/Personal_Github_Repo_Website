package com.curtisnewbie.persistence;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

/**
 * ------------------------------------
 * <p>
 * Author: Yongjie Zhuang
 * <p>
 * ------------------------------------
 * <p>
 * Representation of a Language which contains its name and its lines of code
 * </p>
 */
@Embeddable
public class Language {

    @NotNull
    @Column(nullable = false)
    private String name;

    /** Line of code */
    @NotNull
    @Column(nullable = false)
    private Long loc;

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

    /**
     * @return the loc
     */
    public Long getLoc() {
        return loc;
    }

    /**
     * @param loc the loc to set
     */
    public void setLoc(Long loc) {
        this.loc = loc;
    }
}