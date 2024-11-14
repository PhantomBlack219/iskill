package entornos.iskill_basic.auth.model;

import java.sql.Date;

import entornos.iskill_basic.usuario.model.TipoUsuario;

public class RegistrationDTO {
    private Long usuario_id;
    private TipoUsuario tipo_usuario_id;
    private String nombre;
    private String apellido;
    private String email;
    private String usuario;
    private String password;
    private Date fecha_registro;
    private String logros;
    private String objetivos_carrera;

    public Long getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(Long usuario_id) {
        this.usuario_id = usuario_id;
    }

    public TipoUsuario getTipo_usuario_id() {
        return tipo_usuario_id;
    }

    public void setTipo_usuario_id(TipoUsuario tipo_usuario_id) {
        this.tipo_usuario_id = tipo_usuario_id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

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

    public Date getFecha_registro() {
        return fecha_registro;
    }

    public void setFecha_registro(Date fecha_registro) {
        this.fecha_registro = fecha_registro;
    }

    public String getLogros() {
        return logros;
    }

    public void setLogros(String logros) {
        this.logros = logros;
    }

    public String getObjetivos_carrera() {
        return objetivos_carrera;
    }

    public void setObjetivos_carrera(String objetivos_carrera) {
        this.objetivos_carrera = objetivos_carrera;
    }

}
