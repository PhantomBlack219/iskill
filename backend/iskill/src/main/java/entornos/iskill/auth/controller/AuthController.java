package entornos.iskill.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import entornos.iskill.auth.model.LoginDTO;
import entornos.iskill.auth.model.LoginResponse;
import entornos.iskill.auth.model.RegistrationDTO;
import entornos.iskill.auth.service.AuthenticationService;
import entornos.iskill.auth.service.JwtService;
import entornos.iskill.usuario.model.Usuario;

import java.util.Map;

@RequestMapping("/auth")
@RestController
public class AuthController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationDTO registrationDTO) {
        try {
            Usuario registeredUsuario = authenticationService.registration(registrationDTO);

            return ResponseEntity.ok(Map.of("message", "Usuario registrado exitosamente", "usuario", registeredUsuario));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginDTO loginDTO) {
        Usuario authenticatedUsuario = authenticationService.authenticate(loginDTO);

        String jwtToken = jwtService.generateToken(authenticatedUsuario);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());
        loginResponse.setUsuario(authenticatedUsuario);

        return ResponseEntity.ok(loginResponse);
    }

}
