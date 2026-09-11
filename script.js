document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calc-form');
  if (!form) return;

  // Helper: parse numbers robustly (acepta coma decimal y elimina espacios)
  function getNumber(id) {
    const el = document.getElementById(id);
    if (!el) return NaN;
    let v = String(el.value || '').trim();
    // Reemplaza coma decimal por punto y quita espacios
    v = v.replace(/\s+/g, '').replace(/,/g, '.');
    if (v === '') return NaN;
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : NaN;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Ocultar resultados anteriores
    const resultadosDiv = document.getElementById('resultados');
    if (resultadosDiv) resultadosDiv.classList.add('hidden');

    // Obtener valores
    const precioCompra = getNumber('precioCompra');
    const valorFinal = getNumber('valorFinal');
    const periodoAnos = getNumber('periodoAnos');
    const kmAno = getNumber('kmAno');
    const consumo = getNumber('consumo');
    const precioCombustible = getNumber('precioCombustible');
    const seguro = getNumber('seguro');
    const mantenimiento = getNumber('mantenimiento');
    const otrosGastos = getNumber('otrosGastos');

    // ==========================
    // VALIDACIONES
    // ==========================
    if (isNaN(precioCompra) || precioCompra <= 0) {
      alert('El precio de compra debe ser un número mayor que 0.');
      const el = document.getElementById('precioCompra'); if (el) el.focus();
      return;
    }

    if (isNaN(valorFinal) || valorFinal < 0) {
      alert('El valor estimado final no puede ser un número negativo.');
      const el = document.getElementById('valorFinal'); if (el) el.focus();
      return;
    }

    if (valorFinal > precioCompra) {
      alert('El valor estimado final del coche no puede ser superior al precio de compra.');
      const el = document.getElementById('valorFinal'); if (el) el.focus();
      return;
    }

    if (isNaN(periodoAnos) || periodoAnos <= 0) {
      alert('El periodo de propiedad debe ser al menos de 1 año.');
      const el = document.getElementById('periodoAnos'); if (el) el.focus();
      return;
    }

    if (isNaN(kmAno) || kmAno <= 0) {
      alert('Los kilómetros al año deben ser un número mayor que 0.');
      const el = document.getElementById('kmAno'); if (el) el.focus();
      return;
    }

    if (isNaN(consumo) || consumo < 0) {
      alert('El consumo de combustible no puede ser un valor negativo.');
      const el = document.getElementById('consumo'); if (el) el.focus();
      return;
    }

    if (isNaN(precioCombustible) || precioCombustible < 0) {
      alert('El precio del combustible no puede ser un valor negativo.');
      const el = document.getElementById('precioCombustible'); if (el) el.focus();
      return;
    }

    if (isNaN(seguro) || seguro < 0) {
      alert('El coste del seguro no puede ser un valor negativo.');
      const el = document.getElementById('seguro'); if (el) el.focus();
      return;
    }

    if (isNaN(mantenimiento) || mantenimiento < 0) {
      alert('El coste de mantenimiento no puede ser un valor negativo.');
      const el = document.getElementById('mantenimiento'); if (el) el.focus();
      return;
    }

    if (isNaN(otrosGastos) || otrosGastos < 0) {
      alert('Los otros gastos anuales no pueden ser negativos.');
      const el = document.getElementById('otrosGastos'); if (el) el.focus();
      return;
    }

    // ==========================
    // 1. DEPRECIACIÓN
    // ==========================
    const depreciacionTotal = precioCompra - valorFinal;
    const depreciacionAnual = depreciacionTotal / periodoAnos;
    const depreciacionMensual = depreciacionAnual / 12;

    // ==========================
    // 2. COSTE DE BOLSILLO
    // ==========================
    const gastoCombustibleAnual = (kmAno / 100) * consumo * precioCombustible;
    const bolsilloAnual = gastoCombustibleAnual + seguro + mantenimiento + otrosGastos;
    const bolsilloMensual = bolsilloAnual / 12;

    // ==========================
    // 3. COSTE REAL
    // ==========================
    const costeRealAnual = bolsilloAnual + depreciacionAnual;
    const costeRealMensual = costeRealAnual / 12;
    const costeRealKm = costeRealAnual / kmAno;

    // ==========================
    // MOSTRAR RESULTADOS
    // ==========================
    function setText(id, value) {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    }

    setText('pocketAnual', bolsilloAnual.toFixed(2));
    setText('pocketMensual', bolsilloMensual.toFixed(2));
    setText('deprecTotal', depreciacionTotal.toFixed(2));
    setText('deprecAnual', depreciacionAnual.toFixed(2));
    setText('deprecMensual', depreciacionMensual.toFixed(2));
    setText('realAnual', costeRealAnual.toFixed(2));
    setText('realMensual', costeRealMensual.toFixed(2));
    setText('realKm', costeRealKm.toFixed(3));

    // Mostrar resultados
    if (resultadosDiv) resultadosDiv.classList.remove('hidden');
  });
});
