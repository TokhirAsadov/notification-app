package com.tohir.service.payload;

import com.tohir.service.entity.enums.PPostStatus;
import com.tohir.service.entity.permissionPost.PCommit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PPermissionDto {
    private String id;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String createdBy;
    private String updatedBy;

    private String content;
    private Date fromDate;
    private Date toDate;
    private String description;
    private PPostStatus status;
    private Set<PCommit> commits;
    private UserDto user;
}
