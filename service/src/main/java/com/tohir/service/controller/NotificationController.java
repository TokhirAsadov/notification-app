package com.tohir.service.controller;

import com.tohir.service.entity.permissionPost.PNotification;
import com.tohir.service.payload.PPermissionDto;
import com.tohir.service.service.notification.PNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.util.List;

@RestController
@RequestMapping(BaseUrl.BASE_URL+"/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final PNotificationService notificationService;

    @GetMapping("/stream")
    public Flux<ServerSentEvent<List<PNotification>>> streamNotificationForAdmin(@RequestParam(required = false,name="userId") String userId) {
        return notificationService.getNotificationsForAdmin(userId);
    }
}
