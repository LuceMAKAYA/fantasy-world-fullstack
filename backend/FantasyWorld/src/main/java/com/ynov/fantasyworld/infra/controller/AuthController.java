package com.ynov.fantasyworld.infra.controller;

import com.ynov.fantasyworld.infra.repository.UserEntity;
import com.ynov.fantasyworld.infra.repository.UserJpaRepository;
import com.ynov.fantasyworld.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    private final UserJpaRepository userJpaRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtService jwtService,
                          UserJpaRepository userJpaRepository,
                          PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userJpaRepository = userJpaRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        String role = request.get("role");

        if (username == null || username.isBlank() || password == null || password.length() < 6) {
            ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
            problem.setDetail("Username requis et mot de passe minimum 6 caractères");
            return ResponseEntity.badRequest().body(problem);
        }

        if (userJpaRepository.existsByUsername(username)) {
            ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.CONFLICT);
            problem.setDetail("Nom d'utilisateur déjà pris");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(problem);
        }

        // Par défaut ROLE_USER, ROLE_ADMIN si demandé
        String springRole = "ADMIN".equalsIgnoreCase(role) ? "ROLE_ADMIN" : "ROLE_USER";

        UserEntity user = new UserEntity(
                username,
                passwordEncoder.encode(password),
                springRole
        );
        userJpaRepository.save(user);

        String token = jwtService.generateToken(username);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "token", token,
                "username", username,
                "role", springRole
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String password = request.get("password");

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            String role = userJpaRepository.findByUsername(username)
                    .map(UserEntity::getRole)
                    .orElse("ROLE_USER");


            String token = jwtService.generateToken(username);
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "username", username,
                    "role", role
            ));
        } catch (BadCredentialsException e) {
            ProblemDetail problem = ProblemDetail
                    .forStatus(HttpStatus.UNAUTHORIZED);
            problem.setTitle("Authentification échouée");
            problem.setDetail("Identifiants invalides");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(problem);
        }
    }
}