package com.ynov.fantasyworld.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        return switch (username) {
            case "admin" -> User.builder()
                    .username("admin")
                    .password("{noop}admin123")
                    .roles("ADMIN", "USER")
                    .build();
            case "user" -> User.builder()
                    .username("user")
                    .password("{noop}user123")
                    .roles("USER")
                    .build();
            default -> throw new UsernameNotFoundException(
                    "Utilisateur non trouvé : " + username);
        };
    }
}