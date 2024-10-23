package entornos.iskill_basic.auth.model;

import entornos.iskill_basic.usuario.model.TipoUsuario;

public class LoginDTO {
    private String usuario;
    private String password;
    private Long idUsuario;
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

    public Long getidUsuario() {
        return idUsuario;
    }

    public void setidUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

}
