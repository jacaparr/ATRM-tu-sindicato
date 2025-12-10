"""
Analizador mejorado de convenios - Extrae información estructurada
"""
import re
import json

def leer_convenio(archivo):
    """Lee el convenio y maneja encoding"""
    try:
        with open(archivo, 'r', encoding='utf-8') as f:
            return f.read()
    except:
        with open(archivo, 'r', encoding='latin-1') as f:
            return f.read()

def buscar_seccion(texto, titulo):
    """Busca una sección específica en el convenio"""
    # Patrones comunes de títulos de artículos
    patrones = [
        rf'Artículo.*{titulo}.*?\n(.*?)(?=Artículo|\Z)',
        rf'Art\w*\..*{titulo}.*?\n(.*?)(?=Art\w*\.|\Z)',
        rf'{titulo}.*?\n(.*?)(?=Artículo|Art\w*\.|\Z)'
    ]
    
    for patron in patrones:
        match = re.search(patron, texto, re.IGNORECASE | re.DOTALL)
        if match and match.group(1):
            return match.group(1)[:1000]  # Primeros 1000 caracteres
    return None

def extraer_permisos_retribuidos(texto):
    """Extrae información sobre permisos retribuidos"""
    seccion = buscar_seccion(texto, r'permisos retribuidos')
    if not seccion:
        seccion = buscar_seccion(texto, r'permiso')
    
    permisos = []
    # Buscar patrones como "15 días naturales por..."
    if seccion:
        lineas = seccion.split('\n')
        for linea in lineas:
            # Buscar días
            match = re.search(r'(\d+)\s+(días?|día)\s+(naturales?|laborables?|hábiles?)?.*?(?:por|para|en caso de)\s+(.{10,80})', linea, re.IGNORECASE)
            if match:
                permisos.append({
                    'dias': match.group(1),
                    'tipo': match.group(3) or 'días',
                    'motivo': match.group(4).strip()
                })
    
    return permisos

def extraer_vacaciones(texto):
    """Extrae información sobre vacaciones"""
    seccion = buscar_seccion(texto, r'vacaciones')
    if seccion:
        # Buscar días de vacaciones
        match = re.search(r'(\d+)\s+días?\s+(naturales|laborables|hábiles)', seccion, re.IGNORECASE)
        if match:
            return {
                'dias': match.group(1),
                'tipo': match.group(2),
                'texto': seccion[:500]
            }
    return None

def extraer_jornada(texto):
    """Extrae información sobre jornada laboral"""
    seccion = buscar_seccion(texto, r'jornada')
    if seccion:
        # Buscar horas semanales y anuales
        horas_semana = re.search(r'(\d+[,.]?\d*)\s+horas\s+semanales', seccion, re.IGNORECASE)
        horas_año = re.search(r'(\d+[,.]?\d*)\s+horas\s+anuales', seccion, re.IGNORECASE)
        
        return {
            'horas_semana': horas_semana.group(1) if horas_semana else None,
            'horas_año': horas_año.group(1) if horas_año else None,
            'texto': seccion[:500]
        }
    return None

def extraer_salarios(texto):
    """Extrae tablas salariales"""
    # Buscar sección de salarios
    seccion = buscar_seccion(texto, r'salarios|retribuciones|tabla salarial')
    
    if not seccion:
        # Buscar en todo el texto
        seccion = texto
    
    salarios = []
    # Buscar patrones de categorías y salarios
    patron = r'(Peón|Conductor|Oficial|Encargado|Jefe|Grupo\s+[IVX]+)[^\d]*?(\d{1,2}[.,]\d{3}[.,]\d{2})\s*€'
    matches = re.finditer(patron, seccion, re.IGNORECASE)
    
    for match in matches:
        salarios.append({
            'categoria': match.group(1).strip(),
            'salario': match.group(2).replace('.', '').replace(',', '.')
        })
    
    return salarios

# ANALIZAR CONVENIO DE VIARIA
print("="*70)
print("ANÁLISIS DETALLADO - CONVENIO LIMPIEZA VIARIA")
print("="*70)

texto_viaria = leer_convenio("convenio_viaria_texto.txt")

print("\n📋 PERMISOS RETRIBUIDOS")
print("-" * 50)
permisos = extraer_permisos_retribuidos(texto_viaria)
for p in permisos[:10]:
    print(f"✓ {p['dias']} {p['tipo']}: {p['motivo'][:60]}")

print("\n🏖️ VACACIONES")
print("-" * 50)
vacaciones = extraer_vacaciones(texto_viaria)
if vacaciones:
    print(f"✓ {vacaciones['dias']} días {vacaciones['tipo']}")
    print(f"  Extracto: {vacaciones['texto'][:200]}...")

print("\n⏰ JORNADA LABORAL")
print("-" * 50)
jornada = extraer_jornada(texto_viaria)
if jornada:
    if jornada['horas_semana']:
        print(f"✓ Jornada semanal: {jornada['horas_semana']} horas")
    if jornada['horas_año']:
        print(f"✓ Jornada anual: {jornada['horas_año']} horas")

print("\n💰 SALARIOS")
print("-" * 50)
salarios = extraer_salarios(texto_viaria)
if salarios:
    print(f"Encontrados {len(salarios)} registros salariales:")
    for s in salarios[:10]:
        print(f"✓ {s['categoria']}: {s['salario']} €/mes")
else:
    print("⚠️ No se encontraron salarios con formato estándar")

# GUARDAR RESUMEN
resumen_viaria = {
    'permisos': permisos[:10],
    'vacaciones': vacaciones,
    'jornada': jornada,
    'salarios': salarios[:20]
}

with open('resumen_viaria.json', 'w', encoding='utf-8') as f:
    json.dump(resumen_viaria, f, indent=2, ensure_ascii=False)
print("\n💾 Resumen guardado en: resumen_viaria.json")

# ANALIZAR CONVENIO DE INTERIORES
print("\n" + "="*70)
print("ANÁLISIS DETALLADO - CONVENIO LIMPIEZA INTERIORES")
print("="*70)

texto_interiores = leer_convenio("convenio_interiores_texto.txt")

print("\n📋 PERMISOS RETRIBUIDOS")
print("-" * 50)
permisos_int = extraer_permisos_retribuidos(texto_interiores)
for p in permisos_int[:10]:
    print(f"✓ {p['dias']} {p['tipo']}: {p['motivo'][:60]}")

print("\n🏖️ VACACIONES")
print("-" * 50)
vacaciones_int = extraer_vacaciones(texto_interiores)
if vacaciones_int:
    print(f"✓ {vacaciones_int['dias']} días {vacaciones_int['tipo']}")

print("\n⏰ JORNADA LABORAL")
print("-" * 50)
jornada_int = extraer_jornada(texto_interiores)
if jornada_int:
    if jornada_int['horas_semana']:
        print(f"✓ Jornada semanal: {jornada_int['horas_semana']} horas")
    if jornada_int['horas_año']:
        print(f"✓ Jornada anual: {jornada_int['horas_año']} horas")

print("\n💰 SALARIOS")
print("-" * 50)
salarios_int = extraer_salarios(texto_interiores)
if salarios_int:
    print(f"Encontrados {len(salarios_int)} registros salariales:")
    for s in salarios_int[:10]:
        print(f"✓ {s['categoria']}: {s['salario']} €/mes")

# GUARDAR RESUMEN
resumen_interiores = {
    'permisos': permisos_int[:10],
    'vacaciones': vacaciones_int,
    'jornada': jornada_int,
    'salarios': salarios_int[:20]
}

with open('resumen_interiores.json', 'w', encoding='utf-8') as f:
    json.dump(resumen_interiores, f, indent=2, ensure_ascii=False)
print("\n💾 Resumen guardado en: resumen_interiores.json")

print("\n✅ ANÁLISIS COMPLETADO")
print("\nArchivos generados:")
print("- resumen_viaria.json")
print("- resumen_interiores.json")
print("\nEstos archivos se pueden usar para actualizar data/casos.json")
