package entornos.iskill_basic.auth.model;

import entornos.iskill_basic.usuario.model.TipoUsuario;
import entornos.iskill_basic.usuario.model.Usuario;

public class LoginResponse {
    private String token;
    private long expiresIn;
    private Usuario usuario;
    private TipoUsuario tipoUsuario;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }
}
