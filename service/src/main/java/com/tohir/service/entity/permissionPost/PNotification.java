package com.tohir.service.entity.permissionPost;

import com.tohir.service.entity.User;
import com.tohir.service.entity.enums.PPostStatus;
import com.tohir.service.entity.temp.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class PNotification extends AbsEntity {

    @Column(name = "content")
    private String content;

    @ManyToOne(fetch = FetchType.EAGER)
    private User userTo;


    @ManyToOne(fetch = FetchType.EAGER)
    private User userFrom;

    @Enumerated(EnumType.STRING)
    @Column(name = "PNotification_type")
    private PPostStatus PNotificationType;

    @Column(name = "delivered")
    private boolean delivered;

    @Column(name = "read")
    private boolean read;

}
