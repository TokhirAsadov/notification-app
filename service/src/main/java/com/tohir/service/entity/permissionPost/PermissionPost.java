package com.tohir.service.entity.permissionPost;

import com.tohir.service.entity.enums.PPostStatus;
import com.tohir.service.entity.temp.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PermissionPost extends AbsEntity {
    @Column(name = "content")
    private String content;
    @Column(name = "from_date")
    private Date fromDate;
    @Column(name = "to_date")
    private Date toDate;
    @Column(name = "description")
    private String description;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private PPostStatus status;

    @OneToMany(fetch = FetchType.EAGER)
    private Set<PCommit> commits;

    public PermissionPost(String id, String content, Date fromDate, Date toDate, String description, PPostStatus status, Set<PCommit> commits) {
        super(id);
        this.content = content;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.description = description;
        this.status = status;
        this.commits = commits;
    }
}
