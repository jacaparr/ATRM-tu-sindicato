import json
import os

def cargar_json(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def generar_texto_interiores():
    base_path = 'c:/Users/jach1/Documents/ATRM-tu-sindicato/data'
    tabla = cargar_json(os.path.join(base_path, 'tabla_salarial_interiores.json'))
    
    lines = []
    lines.append(f"=== {tabla.get('convenio', 'CONVENIO INTERIORES')} ===")
    lines.append(f"Vigencia: {tabla.get('vigencia', '')}")
    lines.append("\n")
    
    lines.append("--- CATEGORÍAS PROFESIONALES Y SALARIOS ---")
    for grupo in tabla.get('categorias', []):
        lines.append(f"Grupo: {grupo.get('grupo', 'Varias')}")
        for cat in grupo.get('categorias', []):
            lines.append(f"  * Puesto: {cat['nombre']}")
            lines.append(f"    - Salario Base Mensual: {cat.get('salario_base_mensual', 0)}€")
            if 'descripcion' in cat:
                lines.append(f"    - Descripción: {cat['descripcion']}")
        lines.append("")
    
    output_path = os.path.join(base_path, 'datos_interiores.txt')
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    
    print(f"Archivo generado correctamente: {output_path}")

if __name__ == "__main__":
    generar_texto_interiores()
