package com.curtisnewbie.persistence;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.curtisnewbie.dto.RepoDTO;

/**
 * ------------------------------------
 * <p>
 * Author: Yongjie Zhuang
 * <p>
 * ------------------------------------
 * <p>
 * Representation of a Repository
 * </p>
 */
@Entity
public class Repository {

    @Id
    private Long id;

    @NotNull
    @Column(name = "repo_name", unique = true)
    private String name;

    @NotNull
    @Column(unique = true)
    private String fullName;

    @NotNull
    @Embedded
    @Valid
    private Owner owner;

    @NotNull
    @Column(length = 500)
    private String description;

    @NotNull
    private Date created_at;

    @NotNull
    private Date updated_at;

    @NotNull
    private Date pushed_at;

    @NotNull
    private Integer stargazers_count;

    @NotNull
    @Embedded
    @Valid
    private License license;

    @OneToMany(mappedBy = "repo", orphanRemoval = true)
    private List<Comment> comments;

    @NotNull
    private String language;

    public Repository() {

    }

    public Repository(RepoDTO dto) {
        this.id = dto.id;
        this.name = dto.name;
        this.fullName = dto.full_name;
        this.owner = new Owner(dto.owner);
        this.description = dto.description;
        this.created_at = dto.created_at;
        this.updated_at = dto.updated_at;
        this.pushed_at = dto.pushed_at;
        this.stargazers_count = dto.stargazers_count;
        this.license = new License(dto.license);
        this.language = dto.language;
    }

    /**
     * @return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Long id) {
        this.id = id;
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

    /**
     * @return the fullName
     */
    public String getFullName() {
        return fullName;
    }

    /**
     * @param fullName the fullName to set
     */
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    /**
     * @return the owner
     */
    public Owner getOwner() {
        return owner;
    }

    /**
     * @param owner the owner to set
     */
    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return the created_at
     */
    public Date getCreated_at() {
        return created_at;
    }

    /**
     * @param created_at the created_at to set
     */
    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    /**
     * @return the updated_at
     */
    public Date getUpdated_at() {
        return updated_at;
    }

    /**
     * @param updated_at the updated_at to set
     */
    public void setUpdated_at(Date updated_at) {
        this.updated_at = updated_at;
    }

    /**
     * @return the pushed_at
     */
    public Date getPushed_at() {
        return pushed_at;
    }

    /**
     * @param pushed_at the pushed_at to set
     */
    public void setPushed_at(Date pushed_at) {
        this.pushed_at = pushed_at;
    }

    /**
     * @return the stargazers_count
     */
    public Integer getStargazers_count() {
        return stargazers_count;
    }

    /**
     * @param stargazers_count the stargazers_count to set
     */
    public void setStargazers_count(Integer stargazers_count) {
        this.stargazers_count = stargazers_count;
    }

    /**
     * @return the license
     */
    public License getLicense() {
        return license;
    }

    /**
     * @param license the license to set
     */
    public void setLicense(License license) {
        this.license = license;
    }

    /**
     * @return the language
     */
    public String getLanguage() {
        return language;
    }

    /**
     * @param language the language to set
     */
    public void setLanguage(String language) {
        this.language = language;
    }

    /**
     * @return the comments
     */
    public List<Comment> getComments() {
        return comments;
    }

    /**
     * @param comments the comments to set
     */
    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}