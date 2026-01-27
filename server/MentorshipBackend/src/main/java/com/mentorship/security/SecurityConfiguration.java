package com.mentorship.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@AllArgsConstructor
public class SecurityConfiguration {

	
	private final PasswordEncoder encoder;
	private final CustomJwtFilter customJwtFilter;
	private final JwtAuthEntryPoint jwtAuthEntryPoint;
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http)throws Exception{
		http.csrf(csrf -> csrf.disable());
		
		http.authorizeHttpRequests(request -> 
				request.requestMatchers("/swagger-ui/**", "/v**/api-docs/**",
				        "/users/signin", "/users/signup/**").permitAll()
				.requestMatchers("/error").permitAll()
				.requestMatchers(HttpMethod.OPTIONS).permitAll()
				.requestMatchers(HttpMethod.GET, "/students").permitAll()
				.requestMatchers("/**").hasRole("ADMIN")
				.anyRequest().authenticated());
		
		http.sessionManagement(session -> 
		session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		http.addFilterBefore(customJwtFilter, 
				UsernamePasswordAuthenticationFilter.class);
		
		http.exceptionHandling(ex->ex.authenticationEntryPoint(jwtAuthEntryPoint));
		
		return http.build();
	}
	
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration mgr) throws Exception{
		return mgr.getAuthenticationManager();
	}
}
