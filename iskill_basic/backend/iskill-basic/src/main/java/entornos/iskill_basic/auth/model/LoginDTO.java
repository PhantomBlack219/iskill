package entornos.iskill_basic.auth.model;

import entornos.iskill_basic.usuario.model.TipoUsuario;

public class LoginDTO {
    private String usuario;
    private String password;
    private TipoUsuario tipoUsuario;

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

}
