package entornos.iskill_basic.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import entornos.iskill_basic.auth.model.LoginDTO;
import entornos.iskill_basic.auth.model.LoginResponse;
import entornos.iskill_basic.auth.model.RegistrationDTO;
import entornos.iskill_basic.auth.service.AuthenticationService;
import entornos.iskill_basic.auth.service.JwtService;
import entornos.iskill_basic.usuario.model.Usuario;

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

            return ResponseEntity.ok(registeredUsuario);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginDTO loginDTO) {
        Usuario authenticatedUsuario = authenticationService.authenticate(loginDTO);

        String jwtToken = jwtService.generateToken(authenticatedUsuario);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());
        loginResponse.setTipoUsuario(authenticatedUsuario.getTipo_usuario_id());

        return ResponseEntity.ok(loginResponse);
    }

}
