package com.curtisnewbie.restclient;

import java.util.List;
import java.util.concurrent.CompletionStage;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.curtisnewbie.dto.RepoDTO;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

/**
 * ------------------------------------
 * <p>
 * Author: Yongjie Zhuang
 * <p>
 * ------------------------------------
 * <p>
 * RestClient for fetching repositories data from github. The base url is
 * defined in {@code config.repo.client} in properties. Only public accessible
 * repositories can be fetched, since this client does not use any
 * authentication mechanism.
 * </p>
 */
@RegisterRestClient(configKey = "config.repo.client")
public interface GithubClient {

    @GET
    @Path("/users/{username}/repos")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public CompletionStage<List<RepoDTO>> fetchAllRepos(@PathParam("username") String username);

    @GET
    @Path("/repos/{username}/{repo}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public CompletionStage<RepoDTO> fetchRepo(@PathParam("username") String username,
            @PathParam("repo") String repoName);

    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/repos/{username}/{repo}/languages")
    public String fetchLanguesOfRepo(@PathParam("username") String username, @PathParam("repo") String repoName);
}