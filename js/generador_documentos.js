// Generador de documentos
class GeneradorDocumentos {
  constructor() {
    this.plantillas = {
      vacaciones: {
        titulo: 'Solicitud de Vacaciones',
        icono: '🏖️',
        campos: [
          { id: 'nombre', label: 'Nombre completo', tipo: 'text', requerido: true },
          { id: 'dni', label: 'DNI', tipo: 'text', requerido: true },
          { id: 'empresa', label: 'Empresa', tipo: 'text', requerido: true },
          { id: 'centro', label: 'Centro de trabajo', tipo: 'text', requerido: true },
          { id: 'fechaInicio', label: 'Fecha de inicio', tipo: 'date', requerido: true },
          { id: 'fechaFin', label: 'Fecha de fin', tipo: 'date', requerido: true },
          { id: 'diasSolicitados', label: 'Días solicitados', tipo: 'number', requerido: true },
          { id: 'observaciones', label: 'Observaciones', tipo: 'textarea', requerido: false }
        ],
        template: (datos) => `
          <div class="documento">
            <h3>SOLICITUD DE VACACIONES</h3>
            
            <p><strong>D./Dña.:</strong> ${datos.nombre}</p>
            <p><strong>DNI:</strong> ${datos.dni}</p>
            <p><strong>Empresa:</strong> ${datos.empresa}</p>
            <p><strong>Centro de trabajo:</strong> ${datos.centro}</p>
            
            <p>Mediante el presente escrito solicito el disfrute de mis vacaciones correspondientes al año en curso:</p>
            
            <ul>
              <li><strong>Fecha de inicio:</strong> ${this.formatearFecha(datos.fechaInicio)}</li>
              <li><strong>Fecha de fin:</strong> ${this.formatearFecha(datos.fechaFin)}</li>
              <li><strong>Total de días:</strong> ${datos.diasSolicitados} días naturales</li>
            </ul>
            
            ${datos.observaciones ? `<p><strong>Observaciones:</strong> ${datos.observaciones}</p>` : ''}
            
            <p>Sin otro particular, reciba un cordial saludo.</p>
            
            <div class="firma">
              <p>En _____________, a _____ de _____________ de 20____</p>
              <p>Fdo.: ${datos.nombre}</p>
            </div>
          </div>
        `
      },
      
      permiso: {
        titulo: 'Solicitud de Permiso',
        icono: '📅',
        campos: [
          { id: 'nombre', label: 'Nombre completo', tipo: 'text', requerido: true },
          { id: 'dni', label: 'DNI', tipo: 'text', requerido: true },
          { id: 'empresa', label: 'Empresa', tipo: 'text', requerido: true },
          { id: 'tipoPermiso', label: 'Tipo de permiso', tipo: 'select', opciones: [
            'Asuntos propios',
            'Médico propio',
            'Médico familiar',
            'Fallecimiento familiar',
            'Matrimonio',
            'Mudanza',
            'Exámenes',
            'Otro'
          ], requerido: true },
          { id: 'fecha', label: 'Fecha del permiso', tipo: 'date', requerido: true },
          { id: 'horas', label: 'Horas/Días solicitados', tipo: 'text', requerido: true },
          { id: 'motivo', label: 'Motivo detallado', tipo: 'textarea', requerido: true }
        ],
        template: (datos) => `
          <div class="documento">
            <h3>SOLICITUD DE PERMISO</h3>
            
            <p><strong>D./Dña.:</strong> ${datos.nombre}</p>
            <p><strong>DNI:</strong> ${datos.dni}</p>
            <p><strong>Empresa:</strong> ${datos.empresa}</p>
            
            <p>Mediante el presente escrito solicito permiso retribuido por:</p>
            
            <ul>
              <li><strong>Tipo de permiso:</strong> ${datos.tipoPermiso}</li>
              <li><strong>Fecha:</strong> ${this.formatearFecha(datos.fecha)}</li>
              <li><strong>Duración:</strong> ${datos.horas}</li>
            </ul>
            
            <p><strong>Motivo:</strong></p>
            <p>${datos.motivo}</p>
            
            <p>Quedo a la espera de su confirmación.</p>
            
            <div class="firma">
              <p>En _____________, a _____ de _____________ de 20____</p>
              <p>Fdo.: ${datos.nombre}</p>
            </div>
          </div>
        `
      },
      
      reclamacion: {
        titulo: 'Reclamación Laboral',
        icono: '⚠️',
        campos: [
          { id: 'nombre', label: 'Nombre completo', tipo: 'text', requerido: true },
          { id: 'dni', label: 'DNI', tipo: 'text', requerido: true },
          { id: 'empresa', label: 'Empresa', tipo: 'text', requerido: true },
          { id: 'tipoReclamacion', label: 'Tipo de reclamación', tipo: 'select', opciones: [
            'Salario impagado',
            'Horas extras no abonadas',
            'Condiciones de trabajo',
            'Incumplimiento de convenio',
            'Otro'
          ], requerido: true },
          { id: 'hechos', label: 'Descripción de los hechos', tipo: 'textarea', requerido: true },
          { id: 'peticion', label: 'Lo que solicita', tipo: 'textarea', requerido: true }
        ],
        template: (datos) => `
          <div class="documento">
            <h3>RECLAMACIÓN LABORAL</h3>
            
            <p><strong>D./Dña.:</strong> ${datos.nombre}</p>
            <p><strong>DNI:</strong> ${datos.dni}</p>
            <p><strong>Empresa:</strong> ${datos.empresa}</p>
            
            <p><strong>Tipo de reclamación:</strong> ${datos.tipoReclamacion}</p>
            
            <p><strong>HECHOS:</strong></p>
            <p>${datos.hechos.replace(/\n/g, '<br>')}</p>
            
            <p><strong>SOLICITO:</strong></p>
            <p>${datos.peticion.replace(/\n/g, '<br>')}</p>
            
            <p>Les ruego atiendan esta reclamación con la mayor celeridad posible.</p>
            
            <div class="firma">
              <p>En _____________, a _____ de _____________ de 20____</p>
              <p>Fdo.: ${datos.nombre}</p>
            </div>
          </div>
        `
      },
      
      baja: {
        titulo: 'Comunicación de Baja',
        icono: '🏥',
        campos: [
          { id: 'nombre', label: 'Nombre completo', tipo: 'text', requerido: true },
          { id: 'dni', label: 'DNI', tipo: 'text', requerido: true },
          { id: 'empresa', label: 'Empresa', tipo: 'text', requerido: true },
          { id: 'fechaBaja', label: 'Fecha de la baja', tipo: 'date', requerido: true },
          { id: 'motivoBaja', label: 'Motivo de la baja', tipo: 'select', opciones: [
            'Enfermedad común',
            'Accidente laboral',
            'Accidente no laboral',
            'Maternidad/Paternidad'
          ], requerido: true }
        ],
        template: (datos) => `
          <div class="documento">
            <h3>COMUNICACIÓN DE BAJA MÉDICA</h3>
            
            <p><strong>D./Dña.:</strong> ${datos.nombre}</p>
            <p><strong>DNI:</strong> ${datos.dni}</p>
            <p><strong>Empresa:</strong> ${datos.empresa}</p>
            
            <p>Mediante el presente escrito les comunico que me encuentro en situación de baja médica desde el día ${this.formatearFecha(datos.fechaBaja)}.</p>
            
            <p><strong>Motivo:</strong> ${datos.motivoBaja}</p>
            
            <p>Adjunto el parte de baja correspondiente.</p>
            
            <p>Les mantendré informados de la evolución.</p>
            
            <div class="firma">
              <p>En _____________, a _____ de _____________ de 20____</p>
              <p>Fdo.: ${datos.nombre}</p>
            </div>
          </div>
        `
      },
      
      certificado: {
        titulo: 'Solicitud de Certificado',
        icono: '📄',
        campos: [
          { id: 'nombre', label: 'Nombre completo', tipo: 'text', requerido: true },
          { id: 'dni', label: 'DNI', tipo: 'text', requerido: true },
          { id: 'empresa', label: 'Empresa', tipo: 'text', requerido: true },
          { id: 'tipoCertificado', label: 'Tipo de certificado', tipo: 'select', opciones: [
            'Vida laboral',
            'Certificado de empresa',
            'Certificado de salarios',
            'Certificado de antigüedad',
            'Otro'
          ], requerido: true },
          { id: 'finalidad', label: 'Finalidad', tipo: 'text', requerido: true }
        ],
        template: (datos) => `
          <div class="documento">
            <h3>SOLICITUD DE CERTIFICADO</h3>
            
            <p><strong>D./Dña.:</strong> ${datos.nombre}</p>
            <p><strong>DNI:</strong> ${datos.dni}</p>
            <p><strong>Empresa:</strong> ${datos.empresa}</p>
            
            <p>Mediante el presente escrito solicito:</p>
            
            <p><strong>Tipo de certificado:</strong> ${datos.tipoCertificado}</p>
            <p><strong>Finalidad:</strong> ${datos.finalidad}</p>
            
            <p>Les ruego me entreguen el certificado solicitado con la mayor brevedad posible.</p>
            
            <div class="firma">
              <p>En _____________, a _____ de _____________ de 20____</p>
              <p>Fdo.: ${datos.nombre}</p>
            </div>
          </div>
        `
      },
      
      excedencia: {
        titulo: 'Solicitud de Excedencia',
        icono: '⏸️',
        campos: [
          { id: 'nombre', label: 'Nombre completo', tipo: 'text', requerido: true },
          { id: 'dni', label: 'DNI', tipo: 'text', requerido: true },
          { id: 'empresa', label: 'Empresa', tipo: 'text', requerido: true },
          { id: 'tipoExcedencia', label: 'Tipo de excedencia', tipo: 'select', opciones: [
            'Voluntaria',
            'Cuidado de hijos',
            'Cuidado de familiar',
            'Formación'
          ], requerido: true },
          { id: 'fechaInicio', label: 'Fecha de inicio', tipo: 'date', requerido: true },
          { id: 'duracion', label: 'Duración estimada', tipo: 'text', requerido: true },
          { id: 'motivo', label: 'Motivo detallado', tipo: 'textarea', requerido: true }
        ],
        template: (datos) => `
          <div class="documento">
            <h3>SOLICITUD DE EXCEDENCIA</h3>
            
            <p><strong>D./Dña.:</strong> ${datos.nombre}</p>
            <p><strong>DNI:</strong> ${datos.dni}</p>
            <p><strong>Empresa:</strong> ${datos.empresa}</p>
            
            <p>Mediante el presente escrito solicito excedencia laboral:</p>
            
            <ul>
              <li><strong>Tipo de excedencia:</strong> ${datos.tipoExcedencia}</li>
              <li><strong>Fecha de inicio:</strong> ${this.formatearFecha(datos.fechaInicio)}</li>
              <li><strong>Duración estimada:</strong> ${datos.duracion}</li>
            </ul>
            
            <p><strong>Motivo:</strong></p>
            <p>${datos.motivo.replace(/\n/g, '<br>')}</p>
            
            <p>Quedo a la espera de su respuesta.</p>
            
            <div class="firma">
              <p>En _____________, a _____ de _____________ de 20____</p>
              <p>Fdo.: ${datos.nombre}</p>
            </div>
          </div>
        `
      }
    };
  }

  formatearFecha(fecha) {
    const date = new Date(fecha + 'T00:00:00');
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  obtenerPlantilla(tipo) {
    return this.plantillas[tipo];
  }
}

// Instancia global
const generador = new GeneradorDocumentos();
let plantillaActual = null;

function seleccionarPlantilla(tipo) {
  plantillaActual = tipo;
  const plantilla = generador.obtenerPlantilla(tipo);
  
  document.querySelector('.selector-plantillas').style.display = 'none';
  document.getElementById('formularioDocumento').style.display = 'block';
  document.getElementById('tituloFormulario').textContent = `${plantilla.icono} ${plantilla.titulo}`;
  
  // Generar campos del formulario
  const camposHTML = plantilla.campos.map(campo => {
    let inputHTML = '';
    
    if (campo.tipo === 'select') {
      inputHTML = `
        <select id="${campo.id}" ${campo.requerido ? 'required' : ''}>
          <option value="">Selecciona una opción</option>
          ${campo.opciones.map(op => `<option value="${op}">${op}</option>`).join('')}
        </select>
      `;
    } else if (campo.tipo === 'textarea') {
      inputHTML = `
        <textarea id="${campo.id}" rows="4" ${campo.requerido ? 'required' : ''}></textarea>
      `;
    } else {
      inputHTML = `
        <input type="${campo.tipo}" id="${campo.id}" ${campo.requerido ? 'required' : ''}>
      `;
    }
    
    return `
      <div class="form-group">
        <label for="${campo.id}">
          ${campo.label} ${campo.requerido ? '<span class="requerido">*</span>' : ''}
        </label>
        ${inputHTML}
      </div>
    `;
  }).join('');
  
  document.getElementById('camposFormulario').innerHTML = camposHTML;
}

function volverSelector() {
  document.getElementById('formularioDocumento').style.display = 'none';
  document.querySelector('.selector-plantillas').style.display = 'block';
  document.getElementById('formGenerador').reset();
  cerrarPreview();
}

function recopilarDatos() {
  const plantilla = generador.obtenerPlantilla(plantillaActual);
  const datos = {};
  
  for (const campo of plantilla.campos) {
    const valor = document.getElementById(campo.id).value;
    if (campo.requerido && !valor) {
      alert(`Por favor, completa el campo: ${campo.label}`);
      return null;
    }
    datos[campo.id] = valor;
  }
  
  return datos;
}

function previsualizarDocumento() {
  const datos = recopilarDatos();
  if (!datos) return;
  
  const plantilla = generador.obtenerPlantilla(plantillaActual);
  const html = plantilla.template.call(generador, datos);
  
  document.getElementById('contenidoPreview').innerHTML = html;
  document.getElementById('vistaPrevia').style.display = 'block';
}

function cerrarPreview() {
  document.getElementById('vistaPrevia').style.display = 'none';
}

function generarDocumento() {
  const datos = recopilarDatos();
  if (!datos) return;
  
  const plantilla = generador.obtenerPlantilla(plantillaActual);
  const html = plantilla.template.call(generador, datos);
  
  // Crear documento HTML completo
  const documentoCompleto = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>${plantilla.titulo}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          line-height: 1.6;
        }
        h3 {
          text-align: center;
          margin-bottom: 30px;
          color: #2c3e50;
        }
        p {
          margin: 15px 0;
        }
        ul {
          margin: 20px 0;
          padding-left: 20px;
        }
        li {
          margin: 8px 0;
        }
        .firma {
          margin-top: 50px;
          text-align: right;
        }
      </style>
    </head>
    <body>
      ${html}
    </body>
    </html>
  `;
  
  // Descargar como HTML
  const blob = new Blob([documentoCompleto], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${plantilla.titulo.replace(/\s+/g, '_')}_${new Date().getTime()}.html`;
  a.click();
  URL.revokeObjectURL(url);
  
  alert('✅ Documento descargado correctamente. Puedes abrirlo con tu navegador e imprimirlo o guardarlo como PDF.');
}
