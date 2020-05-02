package com.curtisnewbie.boundary;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.container.AsyncResponse;
import javax.ws.rs.container.Suspended;
import javax.ws.rs.core.MediaType;

import com.curtisnewbie.persistence.RepoRepository;
import com.curtisnewbie.util.DTOConvertor;

import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;

/**
 * ------------------------------------
 * <p>
 * Author: Yongjie Zhuang
 * <p>
 * ------------------------------------
 * <p>
 * REST endpoints for {@code Repository} resources.
 * </p>
 */
@Path(value = "/github/repo")
@Produces(MediaType.APPLICATION_JSON)
public class RepoResources {

    @Inject
    protected RepoRepository rrepo;

    @APIResponse(description = "Get all Repositories")
    @GET
    @Path("/all")
    public void getAllRepos(@Suspended AsyncResponse asyncResp) {
        asyncResp.resume(DTOConvertor.toRepoDtoList(rrepo.getAllRepos()));
    }

    @APIResponse(description = "Get a single Repository with the unique name")
    @GET
    @Path("/name/{repoName}")
    public void getRepoByName(@Suspended AsyncResponse asyncResp, @PathParam("repoName") String repoName) {
        asyncResp.resume(DTOConvertor.toDto(rrepo.getRepoByName(repoName)));
    }

    @APIResponse(description = "Get a list of Repositories with the license")
    @GET
    @Path("/license/{licenseName}")
    public void getReposByLicense(@Suspended AsyncResponse asyncResp, @PathParam("licenseName") String license) {
        asyncResp.resume(DTOConvertor.toRepoDtoList(rrepo.getReposByLicense(license)));
    }
}