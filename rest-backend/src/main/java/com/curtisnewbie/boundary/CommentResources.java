package com.curtisnewbie.boundary;

import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.AsyncResponse;
import javax.ws.rs.container.Suspended;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.curtisnewbie.dto.CommentDTO;
import com.curtisnewbie.dto.PostCommentDTO;
import com.curtisnewbie.persistence.Comment;
import com.curtisnewbie.persistence.CommentRepository;
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
 * REST endpoints for {@code Comment} resources
 * </p>
 */
@ApplicationScoped
@Path("/comments")
@Produces(MediaType.APPLICATION_JSON)
public class CommentResources {

    @Inject
    protected CommentRepository crepo;

    private Logger logger = Logger.getLogger(this.getClass());

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

    @APIResponse(description = "Add a comment, this comment can belong to another comment(as a reply). Such comment is considered as a child of another comment when its'parentCommentId is set. If parentCommentId is set to null or left empty, then this comment is treated as a top-level comment, i.e., it's not replying to any comment.")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void addComment(@Suspended AsyncResponse asyncResp, PostCommentDTO dto) {
        if (dto.message.isEmpty() || dto.message == null) {
            throw new WebApplicationException("Illegal Parameter: message empty or null");
        }
        crepo.addComment(dto.message, dto.parentCommentId);
        asyncResp.resume(Response.ok().build());
    }
}