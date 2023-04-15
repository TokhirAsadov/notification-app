package com.tohir.service.repository;

import com.tohir.service.entity.enums.PPostStatus;
import com.tohir.service.entity.permissionPost.PermissionPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PermissionPostRepository extends JpaRepository<PermissionPost,String> {

    List<PermissionPost> findAllByStatusOrderByCreatedAt(PPostStatus status);

    List<PermissionPost> findAllByOrderByCreatedAtDesc();
    List<PermissionPost> findAllByCreatedByOrderByCreatedAtDesc(String createdBy);
}
