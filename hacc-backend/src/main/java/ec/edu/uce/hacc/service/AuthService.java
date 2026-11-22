package ec.edu.uce.hacc.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

import ec.edu.uce.hacc.repository.AuthRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.NotAuthorizedException;

@ApplicationScoped
public class AuthService {
    @Inject AuthRepository repository;

    public static class User {
        public long id;
        public String username;
        public String role;
        public Long personaId;
        public String personaName;
        public Long unidadId;
        public String unidadCodigo;
        public String bloque;
    }

    public User login(String username, String password) {
        Object[] row = repository.buscarUsuario(username.trim());
        if (row == null || !hash(password).equals(row[2])) throw new NotAuthorizedException("Usuario o contraseña incorrectos");

        User user = new User();
        user.id = ((Number) row[0]).longValue();
        user.username = (String) row[1];
        user.role = "ADMINISTRADOR".equals(row[3]) ? "admin" : "resident";
        user.personaId = row[4] == null ? null : ((Number) row[4]).longValue();
        user.personaName = row[5] == null ? "" : row[5] + " " + row[6];
        user.unidadId = row[7] == null ? null : ((Number) row[7]).longValue();
        user.unidadCodigo = (String) row[8];
        user.bloque = (String) row[9];
        return user;
    }

    private String hash(String password) {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-256").digest(password.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(digest);
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException(exception);
        }
    }
}
