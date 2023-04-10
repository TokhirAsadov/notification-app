package com.tohir.service.entity.permissionPost;

import com.tohir.service.entity.temp.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PCommit extends AbsEntity {

    @Column(name = "content")
    private String content;

    public PCommit(String id, String content) {
        super(id);
        this.content = content;
    }
}
