package com.tohir.service.repository;

import com.tohir.service.entity.permissionPost.PNotification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PNotificationRepository extends JpaRepository<PNotification,String> {
    List<PNotification> findByUserToIdAndDeliveredFalse(String userTo_id);
}
