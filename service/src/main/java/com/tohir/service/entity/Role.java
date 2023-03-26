package com.tohir.service.entity;

import com.tohir.service.entity.temp.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Column;
import javax.persistence.Entity;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Role extends AbsEntity implements GrantedAuthority {

    @Column(name = "role_name")
    private String roleName;

    @Override
    public String getAuthority() {
        return roleName;
    }

    public Role(String id, String roleName) {
        super(id);
        this.roleName = roleName;
    }

}
