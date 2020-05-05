package com.curtisnewbie.persistence;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;
import javax.ws.rs.WebApplicationException;

import org.jboss.logging.Logger;

/**
 * ------------------------------------
 * <p>
 * Author: Yongjie Zhuang
 * <p>
 * ------------------------------------
 * <p>
 * Repository for {@code Comment} resources
 * </p>
 */
@ApplicationScoped
@Transactional(value = TxType.REQUIRED)
public class CommentRepository {

    private final Logger logger = Logger.getLogger(this.getClass());

    @Inject
    protected EntityManager em;

    /**
     * Add/Persist a {@code Comment}
     * 
     * @param comment
     */
    public void addComment(Comment comment) {
        em.persist(comment);
    }

    /**
     * Add a {@code Comment}, and which may or may not be a child (i.e., reply) of a
     * specified parentComment ({@code parentCommentId})
     * 
     * @param msg
     * @param parentCommentId
     */
    public void addComment(String msg, Long parentCommentId) {
        Comment c = new Comment();
        c.setMessage(msg);
        c.setParentComment(parentCommentId == null ? null : em.find(Comment.class, parentCommentId));
        em.persist(c);
    }

    /**
     * Remove a {@code Comment}
     * 
     * @param comment
     */
    // TODO: Not really realistic without authentication, find a way to achieve
    // this.
    public void removeComment(Comment comment) {
        em.remove(comment);
    }

    /**
     * Get all child {@code Comment}(s) of a {@code Comment}
     * 
     * @param repositoryId
     * @return all child {@code Comment}(s) of a {@code Comment}
     */
    public List<Comment> getChildCommentsOf(long commentId) {
        var p = em.find(Comment.class, commentId);
        if (p != null)
            return p.getChildComments();
        else
            throw new WebApplicationException("Entity Not Exists");
    }

    /**
     * Get all parent {@code Comment}(s) (i.e., top-level comments). Parent
     * {@code Comment} refers to those that do not have a Parent.
     * 
     * @return a list of parent {@code Comment}(s)
     */
    public List<Comment> getAllParentComments() {
        TypedQuery<Comment> q = em.createQuery("SELECT c FROM Comment c WHERE c.parentComment IS NULL", Comment.class);
        return q.getResultList();
    }
}