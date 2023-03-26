package com.tohir.service.controller;

import com.tohir.service.payload.RoleDto;
import com.tohir.service.service.role.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(BaseUrl.BASE_URL+"/role")
@RequiredArgsConstructor
public class RoleController {
    public final RoleService roleService;

    @GetMapping("/findAll")
    public HttpEntity<?> allRoles(){
        return ResponseEntity.ok(roleService.findAll());
    }


    @GetMapping("/getRoleById/{id}")
    public HttpEntity<?> getRoleById(@PathVariable String id){
        return ResponseEntity.ok(roleService.findById(id));
    }

    @PostMapping("/createRole")
    public HttpEntity<?> createRole(@RequestBody RoleDto roleDto){
        return ResponseEntity.status(201).body(roleService.saveOrUpdate(roleDto));
    }

    @PutMapping("/updateRole")
    public HttpEntity<?> updateRole(@RequestBody RoleDto roleDto){
        return ResponseEntity.status(203).body(roleService.saveOrUpdate(roleDto));
    }

    @GetMapping("/deleteRole/{id}")
    public HttpEntity<?> deleteRole(@PathVariable String id){
        return ResponseEntity.status(204).body(roleService.deleteById(id));
    }
}
