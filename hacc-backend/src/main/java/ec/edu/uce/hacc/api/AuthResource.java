package ec.edu.uce.hacc.api;

import ec.edu.uce.hacc.service.AuthService;
import ec.edu.uce.hacc.service.AuthService.User;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/api/auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthResource {
    @Inject AuthService service;

    public static class LoginRequest {
        @NotBlank public String username;
        @NotBlank public String password;
    }

    @POST @Path("/login")
    public User login(@Valid LoginRequest request) {
        return service.login(request.username, request.password);
    }
}
