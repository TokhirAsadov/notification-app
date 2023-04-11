package com.tohir.service.service.permissionPost;

import com.tohir.service.entity.User;
import com.tohir.service.entity.permissionPost.PCommit;
import com.tohir.service.entity.permissionPost.PermissionPost;
import com.tohir.service.payload.CommentRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import reactor.core.publisher.Flux;

import java.util.List;

public interface PermissionPostService {

    Flux<ServerSentEvent<List<PermissionPost>>> streamPosts(String userId);

    PermissionPost getPostByID(String postID);

    List<PermissionPost> getAll();
    List<PermissionPost> getAllById(String userId);

   PermissionPost create(User user,PermissionPost post);

    PermissionPost createCommit(User user, CommentRequest request);

    PermissionPost deletePCommit(User user, String postId, String pcommitId);
}
