package entornos.iskill.auth.model;

import entornos.iskill.usuario.model.Usuario;

public class LoginDTO {
    private String usuario;
    private String password;
    private Usuario usuarioObj;

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

    public Usuario getUsuarioObj() {
        return usuarioObj;
    }

    public void setusuario(Usuario usuarioObj) {
        this.usuarioObj = usuarioObj;
    }

}
