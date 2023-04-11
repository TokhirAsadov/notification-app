package com.tohir.service.repository;

import com.tohir.service.entity.permissionPost.PermissionPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PermissionPostRepository extends JpaRepository<PermissionPost,String> {

    List<PermissionPost> findAllByCreatedByOrderByCreatedAt(String createdBy);
}
