package com.curtisnewbie.persistence;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;

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
     * Add a {@code Comment} that belongs to a {@code Repository}, and which may or
     * may not be a child (i.e., reply) of a specified parentComment
     * ({@code parentCommentId})
     * 
     * @param msg
     * @param repositoryId
     * @param parentCommentId
     */
    public void addComment(String msg, Long repositoryId, Long parentCommentId) {
        Comment c = new Comment();
        c.setMessage(msg);
        c.setRepo(em.find(Repository.class, repositoryId));
        c.setParentComment(parentCommentId == null ? null : em.find(Comment.class, parentCommentId));
        em.persist(c);
    }

    /**
     * Remove a {@code Comment}
     * 
     * @param comment
     */
    public void removeComment(Comment comment) {
        em.remove(comment);
    }

    /**
     * Get all {@code Comment}(s) of a {@code Repository}
     * 
     * @param repositoryId
     * @return all {@code Comment}(s) of a {@code Repository}
     */
    public List<Comment> getCommentsOfRepo(long repositoryId) {
        TypedQuery<Comment> q = em.createQuery("SELECT c FROM Comment c WHERE c.repo.id = :repoId", Comment.class);
        q.setParameter("repoId", repositoryId);
        return q.getResultList();
    }

    /**
     * Get all parent {@code Comment}(s) (i.e., top-level comments) of a
     * {@code Repository}. Parent {@code Comment} refers to those that do not have a
     * Parent.
     * 
     * @param repositoryId
     * @return a list of parent {@code Comment}(s)
     */
    public List<Comment> getParentCommentsOfRepo(long repositoryId) {
        TypedQuery<Comment> q = em.createQuery(
                "SELECT c FROM Comment c WHERE c.repo.id = :repoId AND c.parentComment IS NULL", Comment.class);
        q.setParameter("repoId", repositoryId);
        return q.getResultList();
    }
}