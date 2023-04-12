package com.tohir.service.service.user;

import com.tohir.service.entity.User;
import com.tohir.service.payload.ApiResponse;
import com.tohir.service.payload.ResToken;
import com.tohir.service.payload.SignInDto;
import com.tohir.service.payload.UserDto;
import com.tohir.service.repository.UserRepository;
import com.tohir.service.security.JwtProvider;
import com.tohir.service.service.role.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserImplService implements UserService{
    private final UserRepository userRepository;
    private final RoleService roleService;

    private final AuthenticationManager manager;
    private final JwtProvider provider;
    public final PasswordEncoder passwordEncoder;

    @Override
    public ApiResponse findAll() {
        return new ApiResponse(true,"all users",userRepository.findAll().stream().map(this::generateUserDto2).collect(Collectors.toList()));
    }

    @Override
    public ApiResponse saveOrUpdate(UserDto dto) {
        if (dto.getId()==null){
            return save(dto);
        }
        else {
            return update(dto);
        }
    }

    @Override
    public ApiResponse getUserByEmail(String email) {
        User userByEmail = userRepository.findUserByEmail(email);
        if (userByEmail!=null){
            return new ApiResponse(true,"find user by email",generateUserDto(userByEmail));
        }
        else {
            return new ApiResponse(false,"not fount user by "+email+" email");
        }
//        Optional<Role> optional = repository.findById(id);
//        return optional
//                .map(role -> new ApiResponse(true, "Fount role by id", generateRoleDto(role)))
//                .orElseGet(() -> new ApiResponse(false, "Not fount role by id."));

    }

    @Override
    public ApiResponse deleteById(String id) {
        Optional<User> optional = userRepository.findById(id);
        if (optional.isPresent()) {
            userRepository.deleteById(id);
            return new ApiResponse(true,optional.get().getFirstName()+" user delete successfully");
        }
        return new ApiResponse(false,"Error! Not fount user.");
    }

    @Override
    public ApiResponse findById(String id) {
        Optional<User> optional = userRepository.findById(id);
        return optional
                .map(user -> new ApiResponse(true, "Fount user by id", generateUserDto(user)))
                .orElseGet(() -> new ApiResponse(false, "Not fount user by "+id+" id."));
    }

    @Override
    public ResToken login(SignInDto signInDto){
        Authentication auth = manager.authenticate(new UsernamePasswordAuthenticationToken(
                signInDto.getLogin(),
                signInDto.getPassword()
        ));
        User user = (User) auth.getPrincipal();
        String token = provider.generateToken(user);
        return new ResToken(token);
    }

    @Override
    public UserDto getUserFields(String id) {
        Optional<User> optional = userRepository.findById(id);
        return optional
                .map(this::generateUserDto)
                .orElseGet(UserDto::new);
    }

    public ApiResponse update(UserDto dto){
        Optional<User> optional = userRepository.findById(dto.getId());
        if (optional.isPresent()){
            User user = optional.get();
            User userByEmail = userRepository.findUserByEmail(dto.getEmail());
            User userByLogin = userRepository.getUserByLogin(dto.getLogin());

            if (userByLogin !=null && userByEmail !=null ) {
                if (
                        Objects.equals(userByLogin.getId(), user.getId())
                                &&
                                Objects.equals(userByEmail.getId(), user.getId())
                ) {
                    user.setFirstName(dto.getFirstName());
                    user.setLastName(dto.getLastName());
                    user.setMiddleName(dto.getMiddleName());
                    user.setLogin(dto.getLogin());
                    user.setPassword(passwordEncoder.encode(dto.getPassword()));
                    user.setEmail(dto.getEmail());
                    user.setRoles(dto.getRoles().stream().map(roleService::generateRole).collect(Collectors.toSet()));
                    userRepository.save(user);
                    return new ApiResponse(true, "user updated successfully");
                } else {
                    return new ApiResponse(
                            false,
                            "error! nor updated user! Please, enter other login,email or RFID"
                    );
                }
            }
            else if (userByLogin != null) {

                if ( Objects.equals(userByLogin.getId(), user.getId()) ){
                    user.setFirstName(dto.getFirstName());
                    user.setLastName(dto.getLastName());
                    user.setMiddleName(dto.getMiddleName());
                    user.setLogin(dto.getLogin());
                    user.setPassword(passwordEncoder.encode(dto.getPassword()));
                    user.setEmail(dto.getEmail());
                    user.setRoles(dto.getRoles().stream().map(roleService::generateRole).collect(Collectors.toSet()));
                    userRepository.save(user);
                    return new ApiResponse(true, "user updated successfully");
                }
                else {
                    return new ApiResponse(
                            false,
                            "error! nor updated user! Please, enter other login,email or RFID"
                    );
                }

            }
            else if (userByEmail != null) {

                if (Objects.equals(userByEmail.getId(), user.getId())){
                    user.setFirstName(dto.getFirstName());
                    user.setLastName(dto.getLastName());
                    user.setMiddleName(dto.getMiddleName());
                    user.setLogin(dto.getLogin());
                    user.setPassword(passwordEncoder.encode(dto.getPassword()));
                    user.setEmail(dto.getEmail());
                    user.setRoles(dto.getRoles().stream().map(roleService::generateRole).collect(Collectors.toSet()));
                    userRepository.save(user);
                    return new ApiResponse(true, "user updated successfully");
                }
                else {
                    return new ApiResponse(
                            false,
                            "error! nor updated user! Please, enter other login,email or RFID"
                    );
                }

            }
            else {
                user.setFirstName(dto.getFirstName());
                user.setLastName(dto.getLastName());
                user.setMiddleName(dto.getMiddleName());
                user.setLogin(dto.getLogin());
                user.setPassword(passwordEncoder.encode(dto.getPassword()));
                user.setEmail(dto.getEmail());
                user.setRoles(dto.getRoles().stream().map(roleService::generateRole).collect(Collectors.toSet()));
                userRepository.save(user);
                return new ApiResponse(true, "user updated successfully");
            }

        }
        else {
            return new ApiResponse(
                    false,
                    "error! not fount user!"
            );
        }
    }

    public ApiResponse save(UserDto dto){
        if (!userRepository.existsUserByLoginOrEmail(dto.getLogin(), dto.getEmail())){
            User user = generateUser(dto);
            userRepository.saveAndFlush(user);
            return new ApiResponse(true,"new user saved successfully");
        }
        else {
            return new ApiResponse(
                    false,
                    "error! nor saved user! Please, enter other login or email"
            );
        }
    }


    public User generateUser(UserDto dto) {
        return new User(
                dto.getId(),
                dto.getFirstName(),
                dto.getLastName(),
                dto.getMiddleName(),
                dto.getLogin(),
                passwordEncoder.encode(dto.getPassword()),
                dto.getEmail(),
                dto.getRoles().stream().map(roleService::generateRole).collect(Collectors.toSet())
        );
    }

    @Override
    public UserDto generateUserDto(User user) {
        return new UserDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getMiddleName(),
//                user.getLogin(),
//                user.getPassword(),
                user.getEmail(),
                user.getRoles().stream().map(roleService::generateRoleDto).collect(Collectors.toSet())
        );
    }

    public UserDto generateUserDto2(User user) {
        return new UserDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getMiddleName(),
                user.getLogin(),
                user.getPassword(),
                user.getEmail(),
                user.getRoles().stream().map(roleService::generateRoleDto).collect(Collectors.toSet())
        );
    }

}
