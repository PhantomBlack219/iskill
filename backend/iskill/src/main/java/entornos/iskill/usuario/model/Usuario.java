package entornos.iskill.usuario.model;

import java.sql.Date;
import java.util.Collection;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import entornos.iskill.habilidad.model.HabilidadUsuario;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "usuario")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    @NotNull
    private Long usuario_id;

    @ManyToOne
    @JoinColumn(nullable = false, name = "tipo_usuario_id")
    @NotNull
    private TipoUsuario tipo_usuario_id;

    @Column(nullable = false)
    @NotNull
    private String nombre;

    @Column
    private String apellido;

    @Column(nullable = false)
    @NotNull
    private String email;

    @Column(nullable = false, unique = true)
    @NotNull
    private String usuario;

    @Column(nullable = false)
    @NotNull
    private String password;

    @CreationTimestamp
    @Column
    private Date fecha_registro;

    @Column
    private String logros;

    @Column
    private String objetivos_carrera;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<HabilidadUsuario> habilidadesUsuario;

    // Constructors

    public Usuario() {
    }

    public Usuario(Long usuario_id, TipoUsuario tipo_usuario_id, String nombre, String apellido,
            String email, String usuario, String password, Date fecha_registro,
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

    // JWT Methods
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return usuario;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "Usuario {id=" + usuario_id + ", tipousuario_id=" + tipo_usuario_id + ", nombre=" + nombre + ", apellido="
                + apellido + ", email=" + email + ", usuario=" + usuario + ", password=" + password + ", fecha_registro="
                + fecha_registro + ", logros=" + logros + ", objetivos_carrera=" + objetivos_carrera + "}";
    }

    public List<HabilidadUsuario> getHabilidadesUsuario() {
        return habilidadesUsuario;
    }

    public void setHabilidadesUsuario(List<HabilidadUsuario> habilidadesUsuario) {
        this.habilidadesUsuario = habilidadesUsuario;
    }

}
