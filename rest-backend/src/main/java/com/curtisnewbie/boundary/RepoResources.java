package com.curtisnewbie.boundary;

import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.validation.constraints.NotNull;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.AsyncResponse;
import javax.ws.rs.container.Suspended;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.curtisnewbie.dto.CommentDTO;
import com.curtisnewbie.persistence.Comment;
import com.curtisnewbie.persistence.CommentRepository;
import com.curtisnewbie.persistence.RepoRepository;
import com.curtisnewbie.util.DTOConvertor;

import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.jboss.logging.Logger;

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
// TODO: Handle exceptions, may be custom response for these exceptions
@Path(value = "/github/repo")
@Produces(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class RepoResources {

    @Inject
    protected RepoRepository rrepo;

    @Inject
    protected CommentRepository crepo;

    protected Logger logger = Logger.getLogger(this.getClass());

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

    @APIResponse(description = "Get top-level/parent comments of a Repository, the JSON is more or less like a tree structure, where the child comments can be accessed by traversing the fields 'childComments' in the parent comments.")
    @GET
    @Path("/{repoId}/comments")
    public void getCommentsOfRepo(@Suspended AsyncResponse asyncResp, @PathParam("repoId") long repoId) {
        List<Comment> parents = crepo.getParentCommentsOfRepo(repoId);
        List<CommentDTO> dtos = new ArrayList<>();
        for (var p : parents) {
            dtos.add(DTOConvertor.toDto(p));
        }
        asyncResp.resume(dtos);
    }

    @APIResponse(description = "Add a comment to a Repository, where a comment can belonsg to another (or as a reply to another). Such comment is a child of another comment (which is considered as a parent comment.")
    @POST
    @Path("/{repoId}/comment")
    public void addCommentToRepo(@Suspended AsyncResponse asyncResp, @NotNull @QueryParam("message") String msg,
            @NotNull @PathParam("repoId") Long repoId, @QueryParam("parentCommentId") Long parentCommentId) {
        if (msg.isEmpty()) {
            throw new WebApplicationException("Illegal Parameter: message cannot be empty");
        }
        crepo.addComment(msg, repoId, parentCommentId);
        asyncResp.resume(Response.ok().build());
    }
}