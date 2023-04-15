package com.tohir.service.service.notification;

import com.tohir.service.entity.permissionPost.PNotification;
import com.tohir.service.repository.PNotificationRepository;
import com.tohir.service.repository.PermissionPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PNotificationImplService implements PNotificationService{
    private final PNotificationRepository notificationRepository;
    private final PermissionPostRepository postRepository;


    @Override
    public List<PNotification> getNotifs(String userID) {
        var notifs = notificationRepository.findByUserToIdAndDeliveredFalse(userID);
        notifs.forEach(x -> x.setDelivered(true));
        notificationRepository.saveAll(notifs);
        return notifs;
    }


    @Override
    public Flux<ServerSentEvent<List<PNotification>>> getNotificationsForAdmin(String userID) {

        if (userID != null && !userID.isBlank()) {
            return Flux.interval(Duration.ofSeconds(1))
                    .publishOn(Schedulers.boundedElastic())
                    .map(sequence -> ServerSentEvent.<List<PNotification>>builder().id(String.valueOf(sequence))
                            .event("user-list-event").data(getNotifs(userID))
                            .build());
        }

        return Flux.interval(Duration.ofSeconds(1)).map(sequence -> ServerSentEvent.<List<PNotification>>builder()
                .id(String.valueOf(sequence)).event("user-list-event").data(new ArrayList<>()).build());
    }


    public Flux<ServerSentEvent<List<PNotification>>> getNotificationsForAdminMessage(String userID) {



        if (userID != null && !userID.isBlank()) {
            return Flux.interval(Duration.ofSeconds(1))
                    .publishOn(Schedulers.boundedElastic())
                    .map(sequence -> ServerSentEvent.<List<PNotification>>builder().id(String.valueOf(sequence))
                            .event("user-list-event").data(getNotifs(userID))
                            .build());
        }

        return Flux.interval(Duration.ofSeconds(1)).map(sequence -> ServerSentEvent.<List<PNotification>>builder()
                .id(String.valueOf(sequence)).event("user-list-event").data(new ArrayList<>()).build());
    }


    @Override
    public PNotification save(PNotification notification) {
        return notificationRepository.save(notification);
    }
}
