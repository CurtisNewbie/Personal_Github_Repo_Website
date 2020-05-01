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
 * Repository for Github repo resources
 * </p>
 */
@Transactional(value = TxType.REQUIRED)
@ApplicationScoped
public class RepoRepository {

    private final Logger logger = Logger.getLogger(this.getClass());

    @Inject
    protected EntityManager em;

    /**
     * Update a {@code Repository} model
     * 
     * @param repo
     * @return whether the model is updated in DB
     */
    public boolean updateRepo(Repository repo) {
        try {
            em.merge(repo);
            return true;
        } catch (Exception e) {
            logger.error(e);
            return false;
        }
    }

    /**
     * Add a {@code Repository} model
     * 
     * @param repo
     * @return whether the model is added in DB
     */
    public boolean addRepo(Repository repo) {
        try {
            em.persist(repo);
            return true;
        } catch (Exception e) {
            logger.error(e);
            return false;
        }
    }

    /**
     * Get all {@code Repository}(s) model
     * 
     * @return a list of {@code Repository}(s)
     */
    public List<Repository> getAllRepos() {
        TypedQuery<Repository> q = em.createQuery("SELECT r FROM Repository r", Repository.class);
        return q.getResultList();
    }
}