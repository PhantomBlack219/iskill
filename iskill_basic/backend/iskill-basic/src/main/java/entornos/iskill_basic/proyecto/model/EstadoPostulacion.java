package entornos.iskill_basic.proyecto.model;

public enum EstadoPostulacion {
    APLICADO("Aplicado"),
    SELECCIONADO("Seleccionado");

    private final String displayName;

    EstadoPostulacion(String displayName) {
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
