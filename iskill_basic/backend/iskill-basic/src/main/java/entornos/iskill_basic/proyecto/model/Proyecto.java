package entornos.iskill_basic.proyecto.model;

import entornos.iskill_basic.usuario.model.Usuario;
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
@Table(name = "proyecto")
public class Proyecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long proyecto_id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @NotNull
    private Usuario usuario_id;

    @Column
    @NotNull
    private String nombre;

    @Column
    @NotNull
    private String descripcion;


    // Constructors

    public Proyecto() {
    }

        public Proyecto(Long proyecto_id, @NotNull Usuario usuario_id, @NotNull String nombre,
            @NotNull String descripcion) {
        this.proyecto_id = proyecto_id;
        this.usuario_id = usuario_id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

        public Long getProyecto_id() {
            return proyecto_id;
        }

        public void setProyecto_id(Long proyecto_id) {
            this.proyecto_id = proyecto_id;
        }

        public Usuario getUsuario_id() {
            return usuario_id;
        }

        public void setUsuario_id(Usuario usuario_id) {
            this.usuario_id = usuario_id;
        }

        public String getNombre() {
            return nombre;
        }

        public void setNombre(String nombre) {
            this.nombre = nombre;
        }

        public String getDescripcion() {
            return descripcion;
        }

        public void setDescripcion(String descripcion) {
            this.descripcion = descripcion;
        }

    

    
}