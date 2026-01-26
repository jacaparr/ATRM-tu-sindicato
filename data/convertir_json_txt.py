import json
import os

def cargar_json(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def generar_texto():
    base_path = 'c:/Users/jach1/Documents/ATRM-tu-sindicato/data'
    tabla = cargar_json(os.path.join(base_path, 'tabla_salarial_2026.json'))
    conceptos = cargar_json(os.path.join(base_path, 'conceptos_salariales_2026.json'))

    lines = []
    lines.append("=== INFORME DE DATOS SALARIALES Y CONCEPTOS 2026 ===")
    lines.append(f"Año de vigencia: {tabla.get('año', 2026)}")
    lines.append(f"IPC Aplicado: {tabla.get('ipc_aplicado', 'No especificado')}%")
    lines.append("\n")

    lines.append("--- TABLA SALARIAL POR CATEGORÍA ---")
    lines.append("Esta sección detalla el salario base, pluses y pagas extras para cada categoría profesional.")
    lines.append("\n")

    for cat in tabla.get('categorias', []):
        lines.append(f"CATEGORÍA: {cat['nombre']}")
        lines.append(f"- Salario Base Mensual: {cat['salario_base']}€")
        lines.append(f"- Plus Tóxico/Penoso: {cat['toxico']}€")
        lines.append(f"- Plus Transporte: {cat['plus_transporte']}€")
        lines.append(f"- Paga Extra Marzo: {cat['ex_marzo']}€")
        lines.append(f"- Paga Extra Junio: {cat['ex_junio']}€")
        lines.append(f"- Paga Extra Septiembre: {cat['ex_sept']}€")
        lines.append(f"- Paga Extra Navidad: {cat['ex_navidad']}€")
        lines.append(f"- Paga Extra Enero: {cat['ex_enero']}€")
        lines.append(f"- Total Anual: {cat['total_anual']}€")
        lines.append("-" * 30)

    lines.append("\n")
    lines.append("--- OTROS CONCEPTOS SALARIALES Y EXTRAS ---")
    otros = conceptos.get('otros_conceptos_salariales', {})
    lines.append("Conceptos variables o específicos:")
    lines.append(f"- Retenes fines de semana (Art. 6): {otros.get('retenes_fines_semana_art6', 0)}€")
    lines.append(f"- Plus Festividad (Art. 21): {otros.get('plus_festividad_art21', 0)}€")
    lines.append(f"- Dieta (Art. 24): {otros.get('dieta_art24', 0)}€")
    lines.append(f"- Kilometraje (Art. 24): {otros.get('kilometraje_art24', 0)}€")
    lines.append(f"- Ayuda Social (Art. 31): {otros.get('ayuda_social_yg_art31', 0)}€")
    
    lines.append("\n")
    lines.append("--- PRESTACIONES NO SALARIALES ---")
    prestaciones = conceptos.get('prestaciones_no_salariales', {})
    lines.append(f"- Gratificación Matrimonio: {prestaciones.get('gratificacion_matrimonio_art6', 0)}€")
    lines.append(f"- Ayuda discapacitados a cargo: {prestaciones.get('ayuda_discapacitados_cargo_art33', 0)}€")
    lines.append(f"- Ayuda escolar/estudios: {prestaciones.get('ayuda_estudios_art34', 0)}€")

    output_path = os.path.join(base_path, 'datos_salariales_2026.txt')
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    
    print(f"Archivo generado correctamente: {output_path}")

if __name__ == "__main__":
    generar_texto()
