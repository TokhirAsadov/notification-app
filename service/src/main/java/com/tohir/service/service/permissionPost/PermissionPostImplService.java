package com.tohir.service.service.permissionPost;

import com.tohir.service.entity.User;
import com.tohir.service.entity.enums.PPostStatus;
import com.tohir.service.entity.permissionPost.PCommit;
import com.tohir.service.entity.permissionPost.PNotification;
import com.tohir.service.entity.permissionPost.PermissionPost;
import com.tohir.service.payload.ChangeStatusDto;
import com.tohir.service.payload.CommentRequest;
import com.tohir.service.payload.PPermissionDto;
import com.tohir.service.repository.PCommitRepository;
import com.tohir.service.repository.PermissionPostRepository;
import com.tohir.service.repository.UserRepository;
import com.tohir.service.service.notification.PNotificationService;
import com.tohir.service.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

import java.time.Duration;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PermissionPostImplService implements PermissionPostService{
    private final PermissionPostRepository postRepository;
    private final PCommitRepository commitRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final PNotificationService notificationService;



    @Override
    public PermissionPost getPostByID(String postID) {
        return postRepository.findById(postID).orElseThrow(() -> new RuntimeException("permission post not found!"));
    }

    @Override
    public List<PPermissionDto> getAll() {
        return postRepository.findAllByOrderByCreatedAtDesc().stream().map(this::generateDto).collect(Collectors.toList());
    }

    @Override
    public List<PPermissionDto> getAllById(String userId) {
        return postRepository.findAllByCreatedByOrderByCreatedAtDesc(userId).stream().map(this::generateDto).collect(Collectors.toList());
    }

    @Override
    public PermissionPost create(User user,PermissionPost post) {

        User tohir = userRepository.getUserByLogin("tohir");
        notificationService.save(PNotification.builder()
                .delivered(false)
                .content("new permission from " + user.getFirstName().charAt(0)+"."+user.getLastName())
                .type(PPostStatus.COMMENT)
                .userFrom(user)
                .userTo(tohir).build());

        return postRepository.save(post);
    }

    @Override
    public PermissionPost createCommit(User user, CommentRequest request) {
        PermissionPost post = getPostByID(request.getPermissionPostId());
        PCommit commit = new PCommit(request.getCommit());
        commitRepository.save(commit);
        post.getCommits().add(commit);

        if (Objects.equals(post.getCreatedBy(), user.getId())){
            User tohir = userRepository.getUserByLogin("tohir");
            notificationService.save(PNotification.builder()
                    .delivered(false)
                    .content("new comment from " + user.getFirstName().charAt(0)+"."+user.getLastName())
                    .type(PPostStatus.COMMENT)
                    .userFrom(user)
                    .userTo(tohir).build());
        }
        else {
            Optional<User> userOptional = userRepository.findById(post.getCreatedBy());
            notificationService.save(PNotification.builder()
                    .delivered(false)
                    .content("new comment from " + user.getFirstName().charAt(0)+"."+user.getLastName())
                    .type(PPostStatus.COMMENT)
                    .userFrom(user)
                    .userTo(userOptional.get()).build());
        }

        //todo ------------------------   notification quwiw kk





        return postRepository.save(post);
    }

    @Override
    public PermissionPost deletePCommit(User user, String postId, String pcommitId) {
        PermissionPost post = getPostByID(postId);

        var updatedComments = post.getCommits()
                .stream()
                .filter(x -> !Objects.equals(x.getId(), pcommitId))
                .collect(Collectors.toSet());
        post.setCommits(updatedComments);

        commitRepository.deleteById(pcommitId);

        //todo ------------------------   notification quwiw kk

        return postRepository.save(post);
    }

    @Override
    public String deletePermissionPost(User user, String postId) {
        postRepository.deleteById(postId);
        return "deleted success fully!.";
    }

    @Override
    public PermissionPost changeStatusOfPost(User user, ChangeStatusDto dto) {
        PermissionPost postByID = getPostByID(dto.getId());
        postByID.setStatus(dto.getStatus());

        Optional<User> userOptional = userRepository.findById(postByID.getCreatedBy());
        notificationService.save(PNotification.builder()
                .delivered(false)
                .content(dto.getStatus().toString()+" new answer from " + user.getFirstName().charAt(0)+"."+user.getLastName())
                .type(PPostStatus.COMMENT)
                .userFrom(user)
                .userTo(userOptional.get()).build());

        return postRepository.save(postByID);
    }

    @Override
    public Flux<ServerSentEvent<List<PPermissionDto>>> streamPosts(String userId) {
        return Flux.interval(Duration.ofSeconds(1))
                .publishOn(Schedulers.boundedElastic())
                .map(sequence -> ServerSentEvent.<List<PPermissionDto>>builder().id(String.valueOf(sequence))
                        .event("post-list-event").data(userId==null ? getAll() : getAllById(userId))
                        .build());
    }

    public PPermissionDto generateDto(PermissionPost post){
        return new PPermissionDto(
                post.getId(),
                post.getCreatedAt(),
                post.getUpdatedAt(),
                post.getCreatedBy(),
                post.getUpdatedBy(),

                post.getContent(),
                post.getFromDate(),
                post.getToDate(),
                post.getDescription(),
                post.getStatus(),
                post.getCommits(),
                userService.getUserFields(post.getCreatedBy())
        );
    }



    /*

     public Flux<ServerSentEvent<List<Post>>> streamPosts() {
        return Flux.interval(Duration.ofSeconds(2))
                .publishOn(Schedulers.boundedElastic())
                .map(sequence -> ServerSentEvent.<List<Post>>builder().id(String.valueOf(sequence))
                        .event("post-list-event").data(getAll())
                        .build());

    }

    * */
}
