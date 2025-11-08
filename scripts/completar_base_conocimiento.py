import json

# Cargar el archivo actual
with open(r'c:\Users\jach1\Documents\ATRM-tu-sindicato\data\casos.json', 'r', encoding='utf-8') as f:
    datos = json.load(f)

# Añadir los 2 últimos temas avanzados

datos["casos"]["igualdad_discriminacion"] = {
    "keywords": ["igualdad", "discriminación", "género", "sexo", "raza", "orientación sexual", "religión", "edad", "discapacidad"],
    "titulo": "Igualdad y no discriminación",
    "resumen": "Derecho fundamental a no ser discriminado en el trabajo",
    "detalle": "⚖️ **Igualdad y no discriminación:**\n\n**Prohibido discriminar por:**\n- Género, sexo, orientación sexual\n- Raza, origen étnico, nacionalidad\n- Religión o convicciones\n- Discapacidad\n- Edad\n- Afiliación sindical\n- Embarazo o maternidad/paternidad\n\n**Discriminación directa:**\n- Trato desfavorable explícito\n- Ejemplo: no contratar mujeres\n\n**Discriminación indirecta:**\n- Normas aparentemente neutras pero con efecto discriminatorio\n- Ejemplo: requisitos físicos innecesarios\n\n**Acoso sexual y por razón de sexo:**\n- Prohibido y sancionable\n- Protección especial a víctimas\n\n**Igualdad retributiva:**\n- Mismo salario por trabajo de igual valor\n- Registro salarial obligatorio en empresas\n- Brecha salarial debe ser justificada objetivamente\n\n**Medidas de acción positiva:**\n- Planes de igualdad en empresas >50 trabajadores\n- Protocolos contra el acoso\n- Medidas de conciliación\n\nSi sufres discriminación, contacta ATRM inmediatamente. Es un derecho fundamental protegido.",
    "documentos": ["Pruebas de discriminación", "Testimonios", "Emails o mensajes", "Plan de Igualdad de la empresa"],
    "casos_reales": [
        "Trabajadora: salario inferior a compañero mismo puesto → equiparación salarial + atrasos",
        "Empleado: no promocionado por edad → reconocimiento discriminación y promoción forzosa"
    ],
    "comparativa_sectorial": "Normativa igual en toda España (ley estatal).",
    "contacto": "ATRM 968 626 511"
}

datos["casos"]["prl_seguridad"] = {
    "keywords": ["prevención riesgos", "seguridad trabajo", "PRL", "accidente laboral", "riesgo", "EPI", "equipos protección"],
    "titulo": "Prevención de Riesgos Laborales",
    "resumen": "Derecho a trabajar en condiciones seguras",
    "detalle": "🦺 **Prevención de Riesgos Laborales:**\n\n**Obligaciones de la empresa:**\n- Evaluación de riesgos\n- Formación en PRL\n- Información sobre riesgos\n- Vigilancia de la salud\n- EPIs gratuitos y adecuados\n- Medidas de emergencia\n\n**Tus derechos:**\n- Trabajar en condiciones seguras\n- Recibir EPIs sin coste\n- Formación específica\n- Reconocimientos médicos\n- Paralizar trabajo si hay riesgo grave\n- No ser sancionado por ejercer derechos PRL\n\n**Delegados de Prevención:**\n- Representantes elegidos\n- Velan por tu seguridad\n- Pueden paralizar trabajos peligrosos\n\n**Accidente laboral:**\n- Avisa inmediatamente\n- Debe investigarse la causa\n- Derecho a prestación IT con mejores condiciones\n- Posible reclamación de daños y perjuicios\n\n**Riesgo grave e inminente:**\n- Puedes negarte a trabajar\n- Derecho a abandonar puesto\n- No puede haber represalias\n\nSi tu empresa no cumple la PRL, contacta ATRM o denuncia en Inspección de Trabajo.",
    "documentos": ["Evaluación de riesgos", "Fichas de entrega EPIs", "Certificados formación PRL", "Parte de accidente"],
    "casos_reales": [
        "Brigada recogida: sin EPIs adecuados → denuncia, inspección y entrega inmediata + sanción empresa",
        "Trabajador: accidente por falta de formación → indemnización daños + IT con complemento"
    ],
    "comparativa_sectorial": "Valencia: igual. Madrid: igual. Cataluña: mayor vigilancia inspección.",
    "contacto": "ATRM 968 626 511"
}

# Guardar archivo actualizado
with open(r'c:\Users\jach1\Documents\ATRM-tu-sindicato\data\casos.json', 'w', encoding='utf-8') as f:
    json.dump(datos, f, ensure_ascii=False, indent=2)

print(f"✅ Base de conocimiento completa: {len(datos['casos'])} temas")
print("\nTemas finales:")
for i, tema in enumerate(datos['casos'].keys(), 1):
    titulo = datos['casos'][tema]['titulo']
    print(f"  {i}. {titulo}")
