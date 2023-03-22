package com.tohir.service.entity;

import com.tohir.service.entity.temp.AbsEntity;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Set;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "users")
public class User extends AbsEntity implements UserDetails {

    private String firstName;
    private String lastName;
    private String middleName;

    private String login;

    private String password;
    private String email;


    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> roles;

    @Column
    private Boolean accountNonExpired = true;
    @Column
    private Boolean accountNonLocked = true;
    @Column
    private Boolean credentialsNonExpired = true;
    @Column
    private Boolean enabled = true;





    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }



}
