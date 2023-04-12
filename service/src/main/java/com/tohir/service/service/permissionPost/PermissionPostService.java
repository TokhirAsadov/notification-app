package com.tohir.service.service.permissionPost;

import com.tohir.service.entity.User;
import com.tohir.service.entity.permissionPost.PCommit;
import com.tohir.service.entity.permissionPost.PermissionPost;
import com.tohir.service.payload.CommentRequest;
import com.tohir.service.payload.PPermissionDto;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import reactor.core.publisher.Flux;

import java.util.List;

public interface PermissionPostService {

    Flux<ServerSentEvent<List<PPermissionDto>>> streamPosts(String userId);

    PermissionPost getPostByID(String postID);

    List<PPermissionDto> getAll();
    List<PPermissionDto> getAllById(String userId);

   PermissionPost create(User user,PermissionPost post);

    PermissionPost createCommit(User user, CommentRequest request);

    PermissionPost deletePCommit(User user, String postId, String pcommitId);

    String deletePermissionPost(User user, String postId);
}
