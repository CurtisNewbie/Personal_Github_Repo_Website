package com.curtisnewbie.restclient;

import java.util.List;

import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.json.bind.Jsonb;

import com.curtisnewbie.dto.RepoDTO;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jboss.logging.Logger;

import io.quarkus.runtime.StartupEvent;

/**
 * ------------------------------------
 * 
 * Author: Yongjie Zhuang
 * 
 * ------------------------------------
 * <p>
 * This class is responsible for fetching data of repositories from Github.
 * Which repositories to fetch are dependent on configuration in
 * {@code config.repo.names}, and how frequent (in minutes) should the
 * repositories be fetched is defined in {@code config.repo.freq.min}
 * </p>
 */
public class GithubRepoFetcher {
    private final int MIN = 60 * 1000;
    private final Logger logger = Logger.getLogger(this.getClass());

    @ConfigProperty(name = "config.repo.names")
    protected List<String> repoNames;

    @ConfigProperty(name = "config.repo.freq.min")
    protected int freqInMin;

    @Inject
    @RestClient
    protected GithubClient client;

    @Inject
    protected Jsonb jsonb;

    /**
     * Start a new thread on app startup to fetch and update repositories
     * repeatively in every N minutes.
     * 
     * @param ev
     * @see {@link GithubRepoFetcher#freqInMin}
     */
    void onStart(@Observes StartupEvent ev) {
        logConfig();
        new Thread(() -> {
            logger.info(String.format("Initialising %s", this.getClass().getName()));
            if (repoNames.size() == 0 && repoNames.get(0).trim().equals("*")) {
                fetchAll();
            } else {
                // TODO: Fix this when implementation is done
                // for (String repo : repoNames)
                // fetch(repo);
                fetch(repoNames.get(0));
            }
            try {
                Thread.sleep(freqInMin * MIN);
            } catch (InterruptedException e) {
                logger.error(e);
            }
        }).start();
    }

    /**
     * Fetch one repository
     * 
     * @param repoName
     */
    void fetch(String repoName) {
        // TODO: finish implentation
        String jsonStr = client.fetchRepo("curtisnewbie", repoName).readEntity(String.class);
        logger.info(jsonb.fromJson(jsonStr, RepoDTO.class));
    }

    /**
     * Fetch all repositories that are accessible
     */
    void fetchAll() {
        // TODO: finish implentation
        logger.info(client.fetchAllRepos("curtisnewbie").readEntity(String.class));
    }

    /**
     * Log config used
     */
    private void logConfig() {
        logger.info(String.format("%s using config: { config.repo.names : %s, config.repo.freq.min: %d }",
                this.getClass().getName(), this.repoNames.toString(), this.freqInMin));
    }
}