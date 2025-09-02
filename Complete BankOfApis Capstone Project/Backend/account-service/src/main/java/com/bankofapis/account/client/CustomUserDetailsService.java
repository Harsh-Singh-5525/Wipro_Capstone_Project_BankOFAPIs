package com.bankofapis.account.client;

import com.bankofapis.account.dto.UserDTO;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserClient userClient;

    public CustomUserDetailsService(UserClient userClient) {
        this.userClient = userClient;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDTO userDTO = userClient.getUserByUsername(username);
        if (userDTO == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return new User(
                userDTO.getUsername(),
                "", // Password not required here for token validation
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
}
