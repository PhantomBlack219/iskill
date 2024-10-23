package entornos.iskill_basic.proyecto.model;

public enum EstadoVacante {
    BUSCANDO("Buscando"),
    EN_PROCESO("En proceso"),
    FINALIZADO("Finalizado");

    private final String displayName;

    EstadoVacante(String displayName) {
        this.displayName = displayName;
    }

    public String displayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }
}
