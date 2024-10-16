package entornos.iskill_basic.usuario.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long usuario_id;

    @ManyToOne
    @JoinColumn(name = "tipo_usuario_id")
    @NotNull
    private TipoUsuario tipo_usuario_id;

    @Column
    @NotNull
    private String nombre;

    @Column
    private String apellido;

    @Column
    @NotNull
    private String email;

    @Column
    @NotNull
    private String usuario;

    @Column
    @NotNull
    private String password;

    @Column
    private Date fecha_registro;

    @Column
    private String logros;

    @Column
    private String objetivos_carrera;

    // Constructors

    public Usuario() {
    }

    public Usuario(Long usuario_id, @NotNull TipoUsuario tipo_usuario_id, @NotNull String nombre, String apellido,
            @NotNull String email, @NotNull String usuario, @NotNull String password, Date fecha_registro,
            String logros, String objetivos_carrera) {
        this.usuario_id = usuario_id;
        this.tipo_usuario_id = tipo_usuario_id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.usuario = usuario;
        this.password = password;
        this.fecha_registro = fecha_registro;
        this.logros = logros;
        this.objetivos_carrera = objetivos_carrera;
    }

    // Getters and Setters

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

    @Override
    public String toString() {
        return "Usuario {id=" + usuario_id + ", tipousuario_id=" + tipo_usuario_id + ", nombre=" + nombre + ", apellido="
                + apellido + ", email=" + email + ", usuario=" + usuario + ", password=" + password + ", fecha_registro="
                + fecha_registro + ", logros=" + logros + ", objetivos_carrera=" + objetivos_carrera + "}";
    }

}
