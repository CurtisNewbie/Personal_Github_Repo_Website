package com.curtisnewbie.restclient;

import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.json.bind.JsonbConfig;

import com.curtisnewbie.persistence.RepoRepository;
import com.curtisnewbie.persistence.Repository;
import com.curtisnewbie.util.LanguagesDeserializer;
import com.curtisnewbie.persistence.Language;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jboss.logging.Logger;

import io.quarkus.runtime.StartupEvent;
import io.quarkus.scheduler.Scheduled;

/**
 * ------------------------------------
 * 
 * Author: Yongjie Zhuang
 * 
 * ------------------------------------
 * <p>
 * This class is responsible for fetching data of repositories from Github.
 * Which repositories to fetch are dependent on {@code config.repo.names} in
 * .properties.
 * </p>
 * 
 * @see GithubRepoFetcher#scheduledFetch()
 */
@ApplicationScoped
public class GithubRepoFetcher {
    private final Logger logger = Logger.getLogger(this.getClass());

    @ConfigProperty(name = "config.repo.names")
    protected List<String> repoNames;

    @ConfigProperty(name = "config.repo.username")
    protected String username;

    @Inject
    @RestClient
    protected GithubClient client;

    @Inject
    protected RepoRepository rrepo;

    /** Jsonb using {@code LanguagesDeserializer} */
    private Jsonb jsonb = JsonbBuilder.create(new JsonbConfig().withDeserializers(new LanguagesDeserializer()));

    /**
     * Start a new thread on app startup to fetch and update repositories
     * repeatively in every N minutes.
     * 
     * @param ev
     * @see {@link GithubRepoFetcher#freqInMin}
     */
    void onStart(@Observes StartupEvent ev) {
        logger.info(String.format("Initialising %s", this.getClass().getName()));
        logConfig();
    }

    /**
     * Fetch repo data in every 10 minutes
     */
    @Scheduled(every = "10m")
    protected void scheduledFetch() {
        if (repoNames.size() == 1 && repoNames.get(0).trim().equals("*")) {
            fetchAll();
        } else {
            fetch(repoNames);
        }
    }

    /**
     * Fetch a list of repository
     * 
     * @param repoName
     */
    private void fetch(List<String> repoNames) {
        for (String repoName : repoNames) {
            client.fetchRepo(username, repoName).thenAcceptAsync((repoDto) -> {
                logger.info(String.format("Fetched %s", repoDto.full_name));
                var repo = new Repository(repoDto);
                repo.setLanguages(fetchNParseLanguages(repo.getName()));
                rrepo.updateRepo(repo);
            }).whenComplete((input, exception) -> {
                if (exception != null)
                    logger.error(exception);
            });
        }
    }

    /**
     * Fetch all repositories that are accessible
     */
    private void fetchAll() {
        client.fetchAllRepos(username).thenAcceptAsync((list) -> {
            for (var repoDto : list) {
                logger.info(String.format("Fetched %s", repoDto.full_name));
                var repo = new Repository(repoDto);
                repo.setLanguages(fetchNParseLanguages(repo.getName()));
                rrepo.updateRepo(repo);
            }
        }).whenComplete((input, exception) -> {
            if (exception != null)
                logger.error(exception);
        });
    }

    /**
     * Fetch a list of {@code Language}
     * 
     * @param repoName
     * @return a list of {@code Language}
     * @see LanguagesDeserializer
     */
    private List<Language> fetchNParseLanguages(String repoName) {
        var langsJsonStr = client.fetchLanguesOfRepo(username, repoName);
        return jsonb.fromJson(langsJsonStr, new ArrayList<Language>() {
        }.getClass().getGenericSuperclass());
    }

    /**
     * Log config used
     */
    private void logConfig() {
        logger.info(String.format("%s (config.repo.names) will fetch repositories: %s", this.getClass().getName(),
                this.repoNames.toString()));
    }
}