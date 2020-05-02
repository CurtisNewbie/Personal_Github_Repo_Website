package com.curtisnewbie.persistence;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;

/**
 * ------------------------------------
 * <p>
 * Author: Yongjie Zhuang
 * <p>
 * ------------------------------------
 * <p>
 * Representation of {@code Comment}. {@code Comment}(s) must belong to a
 * {@code Repository}. A {@code Comment} can have reference to another comment,
 * where such association means that a comment is to reply to a specific
 * comment. This can be considered as a tree-like structure.
 * <p>
 * With this in mind, we call the top-level {@code Comment}(s) the parent
 * {@code Comment}(s), and the ones below them the child {@code Comment}(s).
 * When the {@code Repository} that the {@code Comment}(s) belong to is removed,
 * all the {@code Comment}(s) are removed as well.
 * </p>
 */
@Entity
public class Comment {

    @Id
    private Long id;

    @NotNull
    @Column(length = 5000)
    private String message;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date timestamp;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "repo_id", referencedColumnName = "id", nullable = false)
    private Repository repo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "parent_comment_id", referencedColumnName = "id")
    private Comment parentComment;

    @OneToMany(mappedBy = "parentComment", fetch = FetchType.EAGER)
    private List<Comment> childComments;

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
     * @return the message
     */
    public String getMessage() {
        return message;
    }

    /**
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * @return the timestamp
     */
    public Date getTimestamp() {
        return timestamp;
    }

    /**
     * @param timestamp the timestamp to set
     */
    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    /**
     * @return the repo
     */
    public Repository getRepo() {
        return repo;
    }

    /**
     * @param repo the repo to set
     */
    public void setRepo(Repository repo) {
        this.repo = repo;
    }

    /**
     * @return the parentComment
     */
    public Comment getParentComment() {
        return parentComment;
    }

    /**
     * @param parentComment the parentComment to set
     */
    public void setParentComment(Comment parentComment) {
        this.parentComment = parentComment;
    }

    /**
     * @return the childComments
     */
    public List<Comment> getChildComments() {
        return childComments;
    }

    /**
     * @param childComments the childComments to set
     */
    public void setChildComments(List<Comment> childComments) {
        this.childComments = childComments;
    }

}