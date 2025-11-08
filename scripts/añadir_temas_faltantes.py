import json

# Cargar el archivo actual
with open(r'c:\Users\jach1\Documents\ATRM-tu-sindicato\data\casos.json', 'r', encoding='utf-8') as f:
    datos = json.load(f)

# Añadir los 3 temas que faltaban

datos["casos"]["horas_extra"] = {
    "keywords": ["horas extra", "horas extraordinarias", "trabajar más", "complementarias", "overtime", "pago horas"],
    "titulo": "Horas extraordinarias",
    "resumen": "Qué son, cómo se pagan y límites legales",
    "detalle": "⏱️ **Horas extraordinarias:**\n\n**Límites:**\n- Máximo 80 horas extra al año\n- No obligatorias salvo fuerza mayor\n- Voluntarias en condiciones normales\n\n**Retribución:**\n- Compensación económica: mínimo valor hora ordinaria + 75%\n- Compensación en descanso: mismo tiempo trabajado\n- La elección depende del acuerdo o convenio\n\n**Registro obligatorio:**\n- Deben quedar registradas en control horario\n- Si no aparecen, reclama\n\n**Prohibiciones:**\n- Personal nocturno\n- Menores de 18 años\n- Trabajadores con riesgos específicos\n\nContacta ATRM si no te pagan las horas extra o te obligan a hacerlas.",
    "documentos": ["Control horario", "Nómina", "Registro de horas extra"],
    "casos_reales": [
        "Peón limpieza: 15 horas extra sin pagar → reclamación y abono + sanción empresa",
        "Conductor: obligado a hacer horas extra → denuncia y cese de la práctica"
    ],
    "comparativa_sectorial": "Valencia: compensación 75%. Madrid: 80%. Cataluña: descanso preferente.",
    "contacto": "ATRM 968 626 511"
}

datos["casos"]["baja_medica"] = {
    "keywords": ["baja médica", "incapacidad temporal", "enfermedad", "lesión", "IT", "parte de baja", "enfermo"],
    "titulo": "Baja médica e incapacidad temporal",
    "resumen": "Derechos durante la baja y cómo solicitarla",
    "detalle": "🏥 **Baja médica (IT):**\n\n**Cómo tramitarla:**\n- El médico emite el parte de baja\n- Entrégalo en empresa en 3 días laborables\n- La empresa lo envía a la Seguridad Social\n\n**Prestación económica:**\n- Días 1-3: no se cobra\n- Días 4-15: 60% de la base reguladora\n- Día 16 en adelante: 75% de la base reguladora\n- Algunos convenios mejoran estas condiciones\n\n**Obligaciones:**\n- Entregar partes de confirmación\n- Acudir a reconocimientos médicos\n- No realizar actividades que impidan recuperación\n\n**Alta médica:**\n- Cuando el médico te da el alta\n- Si no estás de acuerdo, puedes reclamar\n- Derecho a revisión por Inspección Médica\n\n**Protección especial:**\n- No te pueden despedir estando de baja\n- Si lo hacen, despido nulo\n\nContacta ATRM si tienes problemas con tu baja o prestación.",
    "documentos": ["Parte de baja", "Partes de confirmación", "Parte de alta", "DNI"],
    "casos_reales": [
        "Trabajadora: alta médica prematura → recurso y baja confirmada por Inspección",
        "Empleado: empresa no envió parte de baja → intervención ATRM y prestación retroactiva"
    ],
    "comparativa_sectorial": "Valencia: 75% desde día 4 por convenio. Madrid: igual legal. Cataluña: complemento empresa desde día 1.",
    "contacto": "ATRM 968 626 511"
}

datos["casos"]["contratos_trabajo"] = {
    "keywords": ["contrato trabajo", "tipo contrato", "indefinido", "temporal", "fijo discontinuo", "obra y servicio", "eventual"],
    "titulo": "Tipos de contratos de trabajo",
    "resumen": "Diferencias entre contratos y tus derechos según cada uno",
    "detalle": "📝 **Tipos de contratos:**\n\n**Indefinido:**\n- Sin fecha de fin\n- Máxima estabilidad\n- Mayor indemnización si te despiden\n\n**Temporal:**\n- Máximo 6 meses (ampliable a 12)\n- Solo para causas justificadas\n- Conversión automática a indefinido si se incumple\n\n**Fijo discontinuo:**\n- Para trabajos estacionales o intermitentes\n- Derecho a ser llamado cada temporada\n- Antigüedad se mantiene\n\n**Formación y prácticas:**\n- Para jóvenes sin experiencia\n- Duración limitada\n- Salario reducido pero cotización completa\n\n**Encadenamiento de temporales:**\n- Más de 18 meses en 24 → indefinido\n- Más de 3 contratos temporales → indefinido\n\n**Fraude de ley:**\n- Temporales sin causa real\n- Fijos discontinuos falsos\n- Contacta ATRM para reclamar\n\nTodos los contratos deben ser por escrito y entregarte copia.",
    "documentos": ["Contrato firmado", "Copia para trabajador", "Anexos si los hay"],
    "casos_reales": [
        "Trabajador: 4 contratos temporales consecutivos → reconocido como indefinido tras reclamación",
        "Empleada: fijo discontinuo pero trabajo todo el año → conversión a indefinido ordinario"
    ],
    "comparativa_sectorial": "Valencia: igual. Madrid: igual. Cataluña: más protección autonómica.",
    "contacto": "ATRM 968 626 511"
}

# Guardar archivo actualizado
with open(r'c:\Users\jach1\Documents\ATRM-tu-sindicato\data\casos.json', 'w', encoding='utf-8') as f:
    json.dump(datos, f, ensure_ascii=False, indent=2)

print(f"✅ Archivo actualizado: {len(datos['casos'])} temas en total")
print("\nTemas incluidos:")
for i, tema in enumerate(datos['casos'].keys(), 1):
    print(f"  {i}. {tema}")
