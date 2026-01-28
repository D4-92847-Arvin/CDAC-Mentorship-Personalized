package com.mentorship.security;

import java.util.Collection;
import java.util.List;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.mentorship.entities.User;

public class CustomUserDetails implements UserDetails {

	private final User user;
	
	public CustomUserDetails(User user) {
        this.user = user;
    }
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return List.of(new SimpleGrantedAuthority("ROLE_"+ user.getUserRole().name()));
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return user.getEmail();
	}
	
	public long getUserId() {
		return user.getUserId();

	}
	
	public String getFullName() {
		String firstName = user.getFirstName();
		String lastName = user.getLastName();
		if (lastName != null && !lastName.isEmpty()) {
			return firstName + " " + lastName;
		}
		return firstName;
	}
	
	public User getUser() {
		return user;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true; // Account is not expired
	}

	@Override
	public boolean isAccountNonLocked() {
		return true; // Account is not locked
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true; // Credentials are not expired
	}

	@Override
	public boolean isEnabled() {
		return true; // Account is enabled
	}

}
