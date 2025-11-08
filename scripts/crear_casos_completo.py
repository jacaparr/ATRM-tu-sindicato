import json

# Script para crear casos.json completo con todos los temas recuperados del backup más nuevos

casos_completo = {
  "casos": {
    "experto_sindical": {
      "keywords": ["experto sindical", "asesor sindical", "consultor sindical", "especialista sindical", "experiencia sindical", "consejo sindical", "orientación sindical", "consultar experto", "pregunta sindical", "duda sindical", "quiero hablar con un experto", "necesito asesoramiento", "ayuda sindical", "consejo laboral"],
      "titulo": "Experto sindical ATRM",
      "resumen": "Asesoramiento experto sobre derechos laborales, convenios y acción sindical",
      "detalle": "🧑‍⚖️ **Como experto sindical de ATRM, puedo ayudarte con:**\n\n📚 **Derechos laborales:**\n- Interpretación del convenio colectivo\n- Permisos, vacaciones y licencias\n- Salarios, pluses y complementos\n- Jornada y horarios\n\n⚖️ **Conflictos laborales:**\n- Despidos y sanciones\n- Reclamaciones de nómina\n- Acoso laboral\n- Modificaciones de condiciones\n\n🤝 **Negociación colectiva:**\n- Análisis de propuestas empresariales\n- Estrategias de negociación\n- Elaboración de demandas\n- Comparativas sectoriales\n\n🗳️ **Representación sindical:**\n- Elecciones sindicales\n- Funciones de delegados\n- Garantías sindicales\n- Acción sindical\n\n💼 **Subrogaciones y cambios:**\n- Derechos en cambios de empresa\n- Antigüedad y condiciones\n- EREs y despidos colectivos\n\n¿En qué tema necesitas asesoramiento? Cuéntame tu situación y te orientaré con la información más precisa, ejemplos reales y referencias legales.",
      "documentos": ["Convenio colectivo sectorial", "Estatuto de los Trabajadores", "Normativa laboral específica", "Jurisprudencia aplicable"],
      "casos_reales": [
        "Delegado sindical: asesoramiento sobre negociación de plus de nocturnidad → mejora del 25% al 28% para toda la plantilla",
        "Afiliado: consulta sobre despido colectivo → intervención sindical y mejora de indemnizaciones en un 15%",
        "Trabajadora: duda sobre reducción de jornada → orientación completa y solicitud exitosa",
        "Peón recogida: reclamación de plus no pagado → recuperación de 1.200€ en atrasos"
      ],
      "comparativa_sectorial": "ATRM ofrece asesoría sindical especializada y personalizada, con experiencia de más de 20 años en el sector de limpieza pública viaria y servicios municipales de Murcia.",
      "contacto": "ATRM 968 626 511",
      "preguntas_followup": ["¿Qué tema sindical te preocupa?", "¿Necesitas asesoramiento jurídico?", "¿Tienes un conflicto laboral?"]
    },
    "hospitalizacion_familiar": {
      "keywords": ["operación", "intervención", "cirugía", "ingreso", "hospitalización", "hermano", "madre", "padre", "familiar", "hospital"],
      "titulo": "Hospitalización/Intervención de familiar",
      "resumen": "5 días retribuidos por ingreso hospitalario de familiares hasta 2º grado",
      "detalle": "✅ Tienes derecho a **5 días retribuidos** por:\n- Ingreso hospitalario de familiares hasta 2º grado\n- Accidente o enfermedad grave\n- Intervención quirúrgica\n\n👥 **Familiares incluidos:** madre, padre, hijos, hermanos, abuelos, suegros, cónyuge\n\n✨ **Ampliación:** Si la hospitalización supera 15 días, el permiso se puede ampliar",
      "documentos": ["Parte médico", "Justificante hospitalario", "Certificado de parentesco si es requerido"],
      "casos_reales": [
        "Trabajador peón recogida: hermano operado → 5 días concedidos + 2 días adicionales por hospitalización >15 días",
        "Conductora limpieza: madre ingresada en UCI → 5 días + desplazamiento reconocido (otra provincia)"
      ],
      "comparativa_sectorial": "Valencia: 4 días. Madrid: 5 días sin ampliación. Cataluña: 6 días máximo.",
      "contacto": "ATRM 968 626 511",
      "preguntas_followup": ["¿La hospitalización supera 15 días?", "¿Requiere desplazamiento significativo?"]
    },
    "dias_lluvia": {
      "keywords": ["lluvia", "tormenta", "llueve", "clima", "meteorología", "impermeable", "botas", "mal tiempo", "temporal"],
      "titulo": "Días de lluvia intensa",
      "resumen": "Decisión de parada según entrega de prendas por la empresa",
      "detalle": "🌧️ **Con lluvia intensa:**\n\n**Si la empresa facilitó impermeable y botas:**\n- La decisión de parar se toma conjuntamente entre empresa y representantes\n- Si no hay representantes, con los propios trabajadores\n\n**Si la empresa NO facilitó prendas:**\n- La decisión la toman los representantes de los trabajadores\n- Si no los hay, los propios trabajadores\n\n**Si se para por lluvia:**\n- Las personas trabajadoras permanecen en el centro durante la jornada",
      "documentos": ["No se requiere documentación especial"],
      "casos_reales": [
        "Brigada recogida Murcia centro: parada por tormenta sin prendas → decisión trabajadores, permanencia en centro",
        "Equipo limpieza viaria Cartagena: empresa entregó impermeables → decisión conjunta, trabajo mantenimiento interior"
      ],
      "comparativa_sectorial": "Valencia: criterio empresa. Madrid: comité seguridad decide. Cataluña: protocolo meteorológico específico.",
      "contacto": "ATRM 968 626 511"
    },
    "matrimonio": {
      "keywords": ["boda", "casarse", "matrimonio", "permiso", "me caso", "enlace"],
      "titulo": "Permiso por matrimonio",
      "resumen": "15 días de permiso retribuido + gratificación",
      "detalle": "💒 **Permiso por matrimonio:**\n\n✅ **15 días retribuidos**\n✅ **Gratificación económica** según tabla vigente\n✅ **Flexible:** puedes dividir los días (ej: 10+5) si lo necesitas\n\n📅 **Planificación:** solicitar con antelación mínima de 30 días",
      "documentos": ["Certificado literal de matrimonio", "Solicitud formal con fechas deseadas"],
      "casos_reales": [
        "Encargado brigada: boda en julio → 15 días + gratificación 691,55€ (2025)",
        "Peón limpieza: matrimonio civil → mismo derecho que religioso, sin diferencias"
      ],
      "comparativa_sectorial": "Valencia: 15 días sin gratificación. Madrid: 13 días + plus. Cataluña: 15 días + ayuda social.",
      "contacto": "ATRM 968 626 511"
    },
    "fallecimiento": {
      "keywords": ["fallecimiento", "muerte", "funeral", "entierro", "defunción", "ha muerto", "óbito"],
      "titulo": "Permiso por fallecimiento",
      "resumen": "Días según grado de parentesco + desplazamiento",
      "detalle": "⚫ **Permiso por fallecimiento:**\n\n**Cónyuge, hijos, padres:** hasta 5 días\n**Hermanos, abuelos, nietos:** hasta 3 días\n**Resto familiares 2º grado:** hasta 2 días\n\n**Con desplazamiento:** días adicionales según distancia y duración del viaje\n\n**Flexible:** se puede fraccionar si hay ceremonias en días diferentes",
      "documentos": ["Certificado de defunción", "Certificado de parentesco si es requerido", "Justificante desplazamiento si aplica"],
      "casos_reales": [
        "Conductor limpieza: fallecimiento padre → 5 días + 1 día desplazamiento (funeral en Almería)",
        "Peón recogida: fallecimiento abuelo → 3 días, fraccionado (2+1) por ceremonias separadas"
      ],
      "comparativa_sectorial": "Valencia: mismos días, sin desplazamiento. Madrid: +1 día general. Cataluña: hasta 6 días cónyuge/hijos.",
      "contacto": "ATRM 968 626 511"
    },
    "nocturnidad": {
      "keywords": ["nocturno", "noche", "22:00", "06:00", "turno", "plus", "trabajo nocturno", "horario nocturno"],
      "titulo": "Plus de nocturnidad",
      "resumen": "28% sobre salario base por trabajo nocturno (22:00-06:00h)",
      "detalle": "🌙 **Plus de nocturnidad (desde enero 2025):**\n\n✅ **28% sobre salario base**\n📅 **Horario:** 22:00 a 06:00 horas\n💰 **Cálculo:** se aplica sobre las horas efectivamente trabajadas en franja nocturna\n\n**Ejemplo:** Si trabajas de 23:00 a 07:00, el plus se aplica de 23:00 a 06:00 (7 horas)",
      "documentos": ["Control horario", "Parte de trabajo nocturno si es excepcional"],
      "casos_reales": [
        "Conductor recogida nocturna: salario base 1.394,30€ → plus nocturnidad 390,40€/mes (28%)",
        "Peón limpieza nocturna ocasional: 3 noches/semana → plus proporcional por horas"
      ],
      "comparativa_sectorial": "Valencia: 25%. Madrid: 30%. Cataluña: 25% + plus especial sábados.",
      "contacto": "ATRM 968 626 511"
    },
    "consultas_medicas": {
      "keywords": ["médico", "consulta médica", "doctor", "cita médica", "especialista", "permiso médico", "ir al médico"],
      "titulo": "Permiso para consultas médicas",
      "resumen": "Tiempo necesario para acudir a consultas médicas propias o de familiares",
      "detalle": "🏥 **Permiso para consultas médicas:**\n\n✅ **Consultas propias:** tiempo necesario justificado\n✅ **Familiares 1er grado:** cónyuge, hijos, padres\n✅ **Con desplazamiento:** se considera el tiempo de ida y vuelta\n\n📋 **Requisitos:**\n- Justificante médico\n- Avisar con antelación cuando sea posible\n- Presentar documentación al día siguiente\n\n⏰ **Duración:** el tiempo imprescindible para acudir y regresar",
      "documentos": ["Justificante de la consulta médica", "Certificado del centro sanitario"],
      "casos_reales": [
        "Encargado brigada: especialista en Murcia capital → 3h concedidas (consulta + desplazamiento desde pedanía)",
        "Conductora limpieza: urgencia oftalmológica → permiso concedido, justificante aportado al día siguiente"
      ],
      "comparativa_sectorial": "Valencia: 4h máximo. Madrid: tiempo necesario sin límite. Cataluña: 2h + desplazamiento sin condición distancia.",
      "contacto": "ATRM 968 626 511"
    },
    "permisos_retribuidos": {
      "keywords": ["permiso retribuido", "mudanza", "nacimiento", "examenes", "exámenes", "permiso especial", "asuntos propios", "licencia retribuida"],
      "titulo": "Permisos retribuidos",
      "resumen": "Días de permiso pagados por mudanza, nacimiento, exámenes y otros casos",
      "detalle": "📄 **Permisos retribuidos:**\n\n- **Mudanza:** 1 día\n- **Nacimiento de hijo/a:** 2 días\n- **Exámenes oficiales:** el tiempo necesario\n- **Asuntos propios:** según convenio y acuerdo\n\nConsulta el convenio o contacta ATRM para casos especiales.",
      "documentos": ["Justificante de mudanza", "Certificado de nacimiento", "Convocatoria de examen"],
      "casos_reales": [
        "Trabajador: mudanza de domicilio → 1 día retribuido",
        "Empleado: nacimiento de hijo → 2 días retribuidos",
        "Personal: examen oficial → permiso concedido con justificante"
      ],
      "comparativa_sectorial": "Valencia: 1 día mudanza. Madrid: 2 días nacimiento. Cataluña: 1 día mudanza, 2 días nacimiento.",
      "contacto": "ATRM 968 626 511"
    },
    "finiquito_despido": {
      "keywords": ["finiquito", "despido", "liquidación", "indemnización", "extinción contrato", "cese", "me despiden", "carta de despido"],
      "titulo": "Finiquito y despido",
      "resumen": "Qué incluye el finiquito y derechos ante un despido",
      "detalle": "💼 **Finiquito:**\nIncluye salario pendiente, vacaciones no disfrutadas, pagas extra y otros conceptos.\n\n**Despido:**\n- Tienes derecho a indemnización según tipo de despido\n- Plazo para reclamar: 20 días hábiles\n- Solicita carta de despido y finiquito por escrito\n\n**Tipos de despido:**\n- **Procedente:** indemnización según causa\n- **Improcedente:** 33 días por año trabajado (máx. 24 mensualidades)\n- **Nulo:** readmisión inmediata + salarios de tramitación\n\nContacta ATRM para asesoría jurídica inmediata.",
      "documentos": ["Carta de despido", "Recibo de finiquito", "Nóminas", "Contrato de trabajo"],
      "casos_reales": [
        "Trabajador: despido improcedente → indemnización 33 días/año + readmisión negociada",
        "Empleado: finiquito sin pagar vacaciones → reclamación y abono posterior con intereses"
      ],
      "comparativa_sectorial": "Valencia: igual. Madrid: igual. Cataluña: igual.",
      "contacto": "ATRM 968 626 511"
    },
    "reduccion_jornada": {
      "keywords": ["reducción jornada", "cuidado hijos", "cuidado familiar", "reducir jornada", "conciliación", "jornada parcial"],
      "titulo": "Reducción de jornada",
      "resumen": "Derecho a reducir jornada por cuidado de hijos o familiares",
      "detalle": "👨‍👩‍👧‍👦 **Reducción de jornada:**\n\n- Por cuidado de hijos menores de 12 años o familiares dependientes\n- Reducción entre 1/8 y 1/2 de la jornada\n- Protección frente a despido\n- Reducción proporcional del salario\n\n**Procedimiento:**\n- Solicítalo por escrito con 15 días de antelación\n- Especifica horario deseado\n- La empresa debe responder\n\nContacta ATRM para asesoría en la solicitud.",
      "documentos": ["Solicitud por escrito", "Libro de familia", "Certificado médico si es por familiar dependiente"],
      "casos_reales": [
        "Trabajadora: reducción por hijo menor → horario adaptado de 6h diarias",
        "Empleado: reducción por familiar dependiente → reducción 1/4 jornada con protección legal"
      ],
      "comparativa_sectorial": "Valencia: igual. Madrid: igual. Cataluña: igual.",
      "contacto": "ATRM 968 626 511"
    },
    "excedencias": {
      "keywords": ["excedencia", "excedencia voluntaria", "excedencia por cuidado", "excedencia especial", "dejar trabajo temporalmente", "permiso sin sueldo"],
      "titulo": "Excedencias",
      "resumen": "Tipos de excedencia y cómo solicitarlas",
      "detalle": "📝 **Excedencias:**\n\n**Voluntaria:**\n- Mínimo 4 meses, máximo 5 años\n- Sin reserva de puesto (solo preferencia)\n- Mínimo 1 año trabajado en la empresa\n\n**Por cuidado de hijos:**\n- Hasta 3 años por cada hijo\n- Reserva del puesto el primer año\n- Antigüedad se mantiene\n\n**Por cuidado de familiar:**\n- Hasta 2 años\n- Familiar hasta 2º grado\n- Reserva de puesto\n\nSolicítala por escrito y contacta ATRM para orientación.",
      "documentos": ["Solicitud por escrito", "Libro de familia", "Certificados médicos si aplica"],
      "casos_reales": [
        "Trabajadora: excedencia por hijo → reincorporación tras 2 años con antigüedad completa",
        "Empleado: excedencia voluntaria → regreso tras 1 año a puesto equivalente"
      ],
      "comparativa_sectorial": "Valencia: igual. Madrid: igual. Cataluña: igual.",
      "contacto": "ATRM 968 626 511"
    },
    "reclamacion_nomina": {
      "keywords": ["reclamar nómina", "nómina incorrecta", "no me pagan", "error nómina", "retraso pago", "salario impagado"],
      "titulo": "Reclamación de nómina",
      "resumen": "Qué hacer si no te pagan o hay errores en la nómina",
      "detalle": "💸 **Reclamación de nómina:**\n\n**Pasos a seguir:**\n1. Reclama por escrito a la empresa\n2. Guarda copia sellada de la reclamación\n3. Contacta ATRM si no hay respuesta en 10 días\n4. Plazo para reclamar: 1 año\n\n**Errores comunes:**\n- Falta de pluses (nocturnidad, peligrosidad, etc.)\n- Horas extra no pagadas\n- Vacaciones no liquidadas\n- Pagas extra incorrectas\n\n**Vías de reclamación:**\n- Papeleta de conciliación (SMAC)\n- Demanda judicial\n- Inspección de Trabajo\n\nContacta ATRM inmediatamente para asesoría.",
      "documentos": ["Reclamación por escrito", "Nóminas", "Contrato", "Control horario"],
      "casos_reales": [
        "Empleado: nómina impagada 2 meses → reclamación y abono total tras mediación + intereses",
        "Trabajador: error en plus nocturnidad → ajuste en nómina siguiente + atrasos de 6 meses"
      ],
      "comparativa_sectorial": "Valencia: igual. Madrid: igual. Cataluña: igual.",
      "contacto": "ATRM 968 626 511"
    },
    "acoso_laboral": {
      "keywords": ["acoso laboral", "mobbing", "discriminación", "trato vejatorio", "acoso", "insultos trabajo", "maltrato laboral", "hostigamiento"],
      "titulo": "Acoso laboral y discriminación",
      "resumen": "Qué hacer ante acoso laboral o discriminación",
      "detalle": "🚨 **Acoso laboral:**\n\n**¿Qué es acoso laboral?**\n- Conductas hostiles sistemáticas\n- Humillaciones o vejaciones\n- Aislamiento o exclusión\n- Sobrecarga o infracarga de trabajo\n- Amenazas o coacciones\n\n**Qué hacer:**\n1. Recoge pruebas (mensajes, emails, testigos, grabaciones)\n2. Documenta fechas, horas y hechos\n3. Parte médico si afecta a tu salud\n4. Comunícalo al delegado sindical o ATRM\n5. Denuncia ante Inspección de Trabajo o juzgado\n\n**Protección especial:**\n- Frente a represalias\n- Cambio de puesto si es necesario\n- Baja médica si procede\n\nContacta ATRM urgentemente para apoyo y asesoría jurídica.",
      "documentos": ["Pruebas de acoso", "Parte médico", "Testimonios escritos", "Emails o mensajes"],
      "casos_reales": [
        "Trabajadora: acoso por superior → denuncia, inspección y cambio de puesto + indemnización",
        "Empleado: insultos reiterados → intervención sindical, cese del acoso y sanción al responsable"
      ],
      "comparativa_sectorial": "Valencia: igual. Madrid: igual. Cataluña: igual.",
      "contacto": "ATRM 968 626 511"
    },
    "subrogacion": {
      "keywords": ["subrogación", "cambio empresa", "subrogar", "cambio de contrata", "nueva empresa", "traspaso empresa"],
      "titulo": "Subrogación y cambio de empresa",
      "resumen": "Derechos en caso de cambio de empresa o subrogación",
      "detalle": "🔄 **Subrogación:**\n\n**¿Qué es?**\nCuando cambia la empresa que presta el servicio pero tú sigues trabajando en el mismo puesto.\n\n**Tus derechos:**\n- Conservas toda tu antigüedad\n- Mantienes salario y condiciones\n- La nueva empresa debe respetar el convenio\n- No puedes ser despedido por la subrogación\n\n**Documentos importantes:**\n- Certificado de antigüedad\n- Copia del contrato anterior\n- Nóminas de los últimos 3 meses\n\n**Problemas comunes:**\n- Pérdida de antigüedad → reclamable\n- Reducción de salario → ilegal\n- Cambio de categoría → debe ser justificado\n\nConsulta ATRM si hay cambios o dudas sobre tus condiciones.",
      "documentos": ["Certificado de subrogación", "Contrato anterior", "Certificado de antigüedad", "Nóminas previas"],
      "casos_reales": [
        "Trabajador: subrogación → mantiene antigüedad de 8 años y salario tras reclamación sindical",
        "Empleado: cambio de empresa → condiciones respetadas tras intervención ATRM y auditoría"
      ],
      "comparativa_sectorial": "Valencia: igual. Madrid: igual. Cataluña: igual.",
      "contacto": "ATRM 968 626 511"
    },
    "certificados_jubilacion": {
      "keywords": ["certificado empresa", "vida laboral", "jubilación", "jubilación anticipada", "certificado trabajo", "jubilación parcial", "jubilarme"],
      "titulo": "Certificados y jubilación",
      "resumen": "Cómo solicitar certificados y opciones de jubilación",
      "detalle": "📑 **Certificados:**\n\n**Certificado de empresa:**\n- Solicita por escrito\n- La empresa tiene 10 días para entregarlo\n- Incluye: antigüedad, categoría, salario\n\n**Vida laboral:**\n- Solicita en Seguridad Social (online o presencial)\n- Gratuito e inmediato\n- Necesario para jubilación\n\n**Jubilación anticipada/parcial:**\n\n**Anticipada:**\n- Por voluntad propia: desde los 63 años (con penalización)\n- Involuntaria (despido): desde los 62 años\n\n**Parcial:**\n- Desde 60-62 años según convenio\n- Reducción jornada entre 25% y 50%\n- Requiere contrato de relevo\n\nContacta ATRM para orientación personalizada sobre tu situación.",
      "documentos": ["Solicitud por escrito", "DNI", "Vida laboral", "Certificado de empresa"],
      "casos_reales": [
        "Trabajador: certificado de empresa para jubilación → entregado en 3 días tras reclamación",
        "Empleado: jubilación parcial a los 62 años → asesoría ATRM para trámites y contrato de relevo"
      ],
      "comparativa_sectorial": "Valencia: igual. Madrid: igual. Cataluña: igual.",
      "contacto": "ATRM 968 626 511"
    },
    "vacaciones": {
      "keywords": ["vacaciones", "días de vacaciones", "disfrute vacaciones", "solicitar vacaciones", "periodo vacacional", "vacaciones anuales", "descanso anual"],
      "titulo": "Vacaciones anuales",
      "resumen": "Días de vacaciones, cómo solicitarlas y derechos",
      "detalle": "🌴 **Vacaciones anuales:**\n\n**Duración:**\n- Mínimo legal: 30 días naturales por año trabajado\n- Puede variar según convenio (consulta el tuyo)\n\n**Cómo se fijan:**\n- De común acuerdo entre empresa y trabajador\n- El calendario debe conocerse al menos 2 meses antes\n- Si no hay acuerdo, decide la empresa (respetando necesidades)\n\n**Importantes:**\n- No pueden ser sustituidas por dinero (salvo fin de contrato)\n- Si caes enfermo durante vacaciones, puedes recuperarlas\n- Se pueden dividir en varios periodos\n- Derecho a 2 semanas continuadas mínimo si las solicitas\n\n**Vacaciones no disfrutadas:**\n- Se pagan en finiquito\n- No prescriben hasta que termina el contrato\n\nConsulta ATRM si tienes problemas para disfrutarlas o dudas sobre el periodo.",
      "documentos": ["Solicitud de vacaciones", "Calendario laboral", "Convenio colectivo"],
      "casos_reales": [
        "Trabajador: vacaciones denegadas sin causa → intervención sindical y disfrute garantizado",
        "Empleado: vacaciones no comunicadas con antelación → reclamación y fijación de fechas según preferencia"
      ],
      "comparativa_sectorial": "Valencia: 30 días. Madrid: 30 días. Cataluña: 30 días.",
      "contacto": "ATRM 968 626 511"
    }
  },
  "jurisprudencia": [
    {
      "tema": "hospitalizacion_familiar",
      "resumen": "STSJ Murcia 2019: ampliación >15 días es derecho, no concesión graciable",
      "referencia": "STSJ Murcia 234/2019"
    },
    {
      "tema": "dias_lluvia",
      "resumen": "LAB Murcia 2022: empresa debe facilitar prendas o asumir criterio trabajadores",
      "referencia": "Laudo Arbitral 15/2022"
    },
    {
      "tema": "nocturnidad",
      "resumen": "STSJ Valencia 2024: plus nocturno se calcula sobre horas efectivas, no sobre jornada completa",
      "referencia": "STSJ Valencia 156/2024"
    }
  ],
  "gaps_detectados": [],
  "version": "1.2",
  "ultima_actualizacion": "2025-11-08"
}

# Guardar el archivo JSON completo
with open(r'c:\Users\jach1\Documents\ATRM-tu-sindicato\data\casos.json', 'w', encoding='utf-8') as f:
    json.dump(casos_completo, f, ensure_ascii=False, indent=2)

print("✅ Archivo casos.json creado correctamente con 16 temas completos")
