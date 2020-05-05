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
import com.curtisnewbie.util.DTOConvertor;

import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;

/**
 * ------------------------------------
 * <p>
 * Author: Yongjie Zhuang
 * <p>
 * ------------------------------------
 * <p>
 * REST endpoints for {@code Comment} resources
 * </p>
 */
@ApplicationScoped
@Path("/comments")
@Produces(MediaType.APPLICATION_JSON)
public class CommentResources {

    @Inject
    protected CommentRepository crepo;

    @APIResponse(description = "Get all top-level/parent comments, the JSON is more or less like a tree structure, where the child comments can be accessed by traversing the fields 'childComments' in the parent comments.")
    @GET
    @Path("/all")
    public void getAllComments(@Suspended AsyncResponse asyncResp) {
        List<Comment> parents = crepo.getAllParentComments();
        List<CommentDTO> dtos = new ArrayList<>();
        for (var p : parents) {
            dtos.add(DTOConvertor.toDto(p));
        }
        asyncResp.resume(dtos);
    }

    @APIResponse(description = "Get all top-level/parent comments, the JSON is more or less like a tree structure, where the child comments can be accessed by traversing the fields 'childComments' in the parent comments.")
    @GET
    @Path("/parent/{parentCommentId}")
    public void getChildCommentsOf(@Suspended AsyncResponse asyncResp,
            @NotNull @PathParam("parentCommentId") long parentCommentId) {
        List<Comment> parents = crepo.getChildCommentsOf(parentCommentId);
        List<CommentDTO> dtos = new ArrayList<>();
        for (var p : parents) {
            dtos.add(DTOConvertor.toDto(p));
        }
        asyncResp.resume(dtos);
    }

    @APIResponse(description = "Add a comment, this comment can belong to another comment(as a reply). Such comment is a child of another comment (which is considered as a parent comment.")
    @POST
    public void addComment(@Suspended AsyncResponse asyncResp, @NotNull @QueryParam("message") String msg,
            @QueryParam("parentCommentId") Long parentCommentId) {
        if (msg.isEmpty()) {
            throw new WebApplicationException("Illegal Parameter: message cannot be empty");
        }
        crepo.addComment(msg, parentCommentId);
        asyncResp.resume(Response.ok().build());
    }

}