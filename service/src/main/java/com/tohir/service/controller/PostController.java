package com.tohir.service.controller;

import com.tohir.service.entity.User;
import com.tohir.service.entity.permissionPost.PermissionPost;
import com.tohir.service.payload.ChangeStatusDto;
import com.tohir.service.payload.CommentRequest;
import com.tohir.service.payload.PPermissionDto;
import com.tohir.service.security.CurrentUser;
import com.tohir.service.service.permissionPost.PermissionPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.List;

@RestController
@RequestMapping(BaseUrl.BASE_URL+"/post")
@RequiredArgsConstructor
public class PostController {
    private final PermissionPostService postService;

    @GetMapping("/stream")
    public Flux<ServerSentEvent<List<PPermissionDto>>> streamPosts(@RequestParam(required = false,name="userId") String userId) {
        return postService.streamPosts(userId);
    }

    @PostMapping("/create")
    public ResponseEntity<PermissionPost> createPost(@CurrentUser User user, @RequestBody PermissionPost post) {
        return ResponseEntity.ok(postService.create(user,post));
    }

    @PutMapping("/change")
    public ResponseEntity<PermissionPost> changeStatusOfPost(@CurrentUser User user, @RequestBody ChangeStatusDto dto) {
        return ResponseEntity.ok(postService.changeStatusOfPost(user,dto));
    }

    @PostMapping("/commit")
    public ResponseEntity<PermissionPost> createPCommit(@CurrentUser User user, @RequestBody CommentRequest request) {
        return ResponseEntity.ok(postService.createCommit(user,request));
    }

    @DeleteMapping("/commit/{commitId}")
    public ResponseEntity<PermissionPost> deletePCommit(@CurrentUser User user, @PathVariable(name = "commitId") String pcommitId,@RequestParam(name = "postId") String postId) {
        return ResponseEntity.ok(postService.deletePCommit(user,postId,pcommitId));
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<String> deletePermissionPost(@CurrentUser User user, @PathVariable(name = "postId") String postId) {
        return ResponseEntity.ok(postService.deletePermissionPost(user,postId));
    }

}
