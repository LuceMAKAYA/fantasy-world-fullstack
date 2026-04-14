package com.ynov.fantasyworld.infra.controller;

import com.ynov.fantasyworld.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String password = request.get("password");

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            String token = jwtService.generateToken(username);
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "username", username
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