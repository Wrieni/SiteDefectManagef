package com.example.backend.Application.Controllers;

import com.example.backend.Domain.DTOs.AuthsDTOs.AuthDTO;
import com.example.backend.Domain.DTOs.AuthsDTOs.LoginDTO;
import com.example.backend.Domain.DTOs.UserDTO;
import com.example.backend.Domain.Mapper.UserMapper;
import com.example.backend.Domain.Role;
import com.example.backend.Domain.User;
import com.example.backend.Domain.UserDetails;
import com.example.backend.Infrastucture.Repos.RoleRepository;
import com.example.backend.Infrastucture.Repos.UserRepository;
import com.example.backend.Infrastucture.Services.JWTService;
import com.example.backend.Infrastucture.Services.UserDetailsServiceImpl;
import io.jsonwebtoken.Jwts;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/auth")
class AuthController {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final UserDetailsServiceImpl userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;

    public AuthController(UserRepository userRepository,
                          RoleRepository roleRepository,
                          PasswordEncoder passwordEncoder,
                          JWTService jwtService, UserDetailsServiceImpl userDetailsService,
                          AuthenticationManager authenticationManager,
                          UserMapper userMapper){
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.authenticationManager = authenticationManager;
        this.userMapper = userMapper;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthDTO> register(@Valid @RequestBody UserDTO userDTO){
        if(userRepository.findByEmail(userDTO.email()).isPresent()){
            throw new RuntimeException("Email already in use");
        }
        Role userrole = roleRepository.findById(userDTO.roleId()).orElseThrow(() -> new RuntimeException("Role Not Found"));

        User user = userMapper.toEntity(userDTO, userrole);
        user.setHashPassword(passwordEncoder.encode(userDTO.hashPassword()));

        User savedUser = userRepository.save(user);

        UserDetails userDetails = (UserDetails) userDetailsService.loadUserByUsername(savedUser.getEmail());

        String jwtToken = jwtService.generateToken(userDetails);

        return ResponseEntity.ok(new AuthDTO(jwtToken, savedUser.getEmail(), savedUser.getRole().getName()));

    }

    @PostMapping
    public ResponseEntity<AuthDTO> login(@Valid @RequestBody LoginDTO loginDTO){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.email(), loginDTO.password())
        );
        UserDetails userDetails = (UserDetails) userDetailsService.loadUserByUsername(loginDTO.email());

        User user = userRepository.findByEmail(loginDTO.email()).orElseThrow(() -> new RuntimeException("User not found"));
        String jwtToken = jwtService.generateToken(userDetails);
        return ResponseEntity.ok(new AuthDTO(jwtToken, user.getEmail(), user.getRole().getName()));
    }

}
