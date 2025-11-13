// Calculadora de vacaciones y descansos ATRM

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('formVacaciones');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const jornada = parseFloat(document.getElementById('jornadaInput').value);
    const dias = parseInt(document.getElementById('diasInput').value);
    const resultadoDiv = document.getElementById('resultadoVacaciones');
    if (isNaN(jornada) || isNaN(dias) || jornada <= 0 || dias <= 0) {
      resultadoDiv.textContent = 'Por favor, introduce valores válidos.';
      return;
    }
    // Cálculo estándar según convenio
    // 30 días naturales de vacaciones por año completo trabajado
    // Descansos: 1 día de descanso semanal + festivos (aprox. 14)
    const vacaciones = 30;
    // Descansos semanales (52 semanas - 4 semanas de vacaciones)
    const descansos = Math.round((dias / 7));
    // Festivos nacionales/regionales/locales (aprox. 14)
    const festivos = 14;
    resultadoDiv.innerHTML =
      `<strong>Vacaciones:</strong> ${vacaciones} días naturales<br>` +
      `<strong>Descansos semanales:</strong> ${descansos} días<br>` +
      `<strong>Festivos:</strong> ${festivos} días<br>` +
      `<span style='color:#4CAF50'><strong>Total días de descanso:</strong> ${vacaciones + descansos + festivos}</span>`;
  });
});
