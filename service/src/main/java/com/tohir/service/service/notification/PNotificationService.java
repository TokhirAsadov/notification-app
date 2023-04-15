package com.tohir.service.service.notification;

import com.tohir.service.entity.permissionPost.PNotification;
import org.springframework.http.codec.ServerSentEvent;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

public interface PNotificationService {

     Flux<ServerSentEvent<List<PNotification>>> getNotificationsForAdmin(String userId);

    List<PNotification> getNotifs(String userID);

    PNotification save(PNotification notification);

}
