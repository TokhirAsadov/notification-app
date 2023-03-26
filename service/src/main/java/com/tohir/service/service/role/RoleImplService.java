package com.tohir.service.service.role;

import com.tohir.service.entity.Role;
import com.tohir.service.payload.ApiResponse;
import com.tohir.service.payload.RoleDto;
import com.tohir.service.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleImplService implements RoleService{
    private final RoleRepository repository;


    @Override
    public ApiResponse findAll() {
        List<Role> roles = repository.findAll();

        return new ApiResponse(true,"all roles", roles.stream().map(this::generateRoleDto).collect(Collectors.toList()));
    }

    @Override
    public ApiResponse saveOrUpdate(RoleDto roleDto) {
        if (roleDto.getId()==null){
            return save(roleDto);
        }
        else {
            return update(roleDto);
        }
    }

    @Override
    public ApiResponse deleteById(String id) {
        Optional<Role> optional = repository.findById(id);
        if (optional.isPresent()) {
            repository.deleteById(id);
            return new ApiResponse(true,optional.get().getRoleName()+" role delete successfully");
        }
        return new ApiResponse(false,"Error! Not fount role.");
    }

    @Override
    public ApiResponse findById(String id) {
        Optional<Role> optional = repository.findById(id);
        return optional
                .map(role -> new ApiResponse(true, "Fount role by id", generateRoleDto(role)))
                .orElseGet(() -> new ApiResponse(false, "Not fount role by id."));
    }

    public ApiResponse save(RoleDto dto){
        if (!repository.existsRoleByRoleName(dto.getRoleName())){
            Role role = generateRole(dto);
            repository.saveAndFlush(role);
            return new ApiResponse(true,"new role saved successfully!...");
        }
        else {
            return new ApiResponse(
                    false,
                    "error! not saved role! Please, enter other role userPositionName or choose other section!"
            );
        }
    }

    public ApiResponse update(RoleDto dto){
        Optional<Role> optional = repository.findById(dto.getId());
        if (optional.isPresent()){
            Role role = optional.get();
            Optional<Role> optionalRole = repository
                    .findRoleByRoleName(
                            dto.getRoleName()
                    );
            if (
                    Objects.equals(optionalRole.get().getId(), role.getId())
                            ||
                            !repository
                                    .existsRoleByRoleName(
                                            dto.getRoleName()
                                    )
            ){
                role.setRoleName(dto.getRoleName());
                repository.save(role);
                return new ApiResponse(true,"role updated successfully!..");
            }
            else {
                return new ApiResponse(
                        false,
                        "error! nor saved role! Please, enter other role userPositionName or choose other section."
                );
            }
        }
        else{
            return new ApiResponse(
                    false,
                    "error... not fount role"
            );
        }
    }

    @Override
    public RoleDto generateRoleDto(Role role) {
        return new RoleDto(
                role.getId(),
                role.getRoleName()
        );
    }

    @Override
    public Role generateRole(RoleDto dto) {
        return new Role(
                dto.getId(),
                dto.getRoleName()
        );
    }

}
