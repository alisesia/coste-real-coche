document.getElementById('calc-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const errorBanner = document.getElementById('error-message');
  const resultadosDiv = document.getElementById('resultados');

  // Limpiar estados previos
  errorBanner.classList.add('hidden');
  errorBanner.textContent = '';
  resultadosDiv.classList.add('hidden');

  // Obtener valores del formulario
  const precioCompra = parseFloat(document.getElementById('precioCompra').value);
  const valorFinal = parseFloat(document.getElementById('valorFinal').value);
  const periodoAnos = parseFloat(document.getElementById('periodoAnos').value);
  const kmAno = parseFloat(document.getElementById('kmAno').value);
  const consumo = parseFloat(document.getElementById('consumo').value);
  const precioCombustible = parseFloat(document.getElementById('precioCombustible').value);
  const seguro = parseFloat(document.getElementById('seguro').value);
  const mantenimiento = parseFloat(document.getElementById('mantenimiento').value);
  const otrosGastos = parseFloat(document.getElementById('otrosGastos').value);

  // Función auxiliar para mostrar errores visuales integrados
  function mostrarError(mensaje) {
    errorBanner.textContent = mensaje;
    errorBanner.classList.remove('hidden');
  }

  // VALIDACIONES
  if (isNaN(precioCompra) || precioCompra <= 0) {
    mostrarError('El precio de compra debe ser mayor a 0 €.');
    return;
  }

  if (isNaN(valorFinal) || valorFinal < 0) {
    mostrarError('El valor estimado final no puede ser un valor negativo.');
    return;
  }

  if (valorFinal > precioCompra) {
    mostrarError('El valor estimado final del coche no puede ser superior al precio de compra.');
    return;
  }

  if (isNaN(periodoAnos) || periodoAnos <= 0) {
    mostrarError('El periodo de propiedad debe ser de al menos 1 año.');
    return;
  }

  if (isNaN(kmAno) || kmAno <= 0) {
    mostrarError('Los kilómetros anuales deben ser mayores a 0.');
    return;
  }

  if (isNaN(consumo) || consumo < 0) {
    mostrarError('El consumo de combustible no puede ser negativo.');
    return;
  }

  if (isNaN(precioCombustible) || precioCombustible < 0) {
    mostrarError('El precio del combustible no puede ser negativo.');
    return;
  }

  if (isNaN(seguro) || seguro < 0) {
    mostrarError('El coste del seguro no puede ser negativo.');
    return;
  }

  if (isNaN(mantenimiento) || mantenimiento < 0) {
    mostrarError('El coste de mantenimiento no puede ser negativo.');
    return;
  }

  if (isNaN(otrosGastos) || otrosGastos < 0) {
    mostrarError('Los otros gastos anuales no pueden ser negativos.');
    return;
  }

  // 1. Depreciación
  const depreciacionTotal = precioCompra - valorFinal;
  const depreciacionAnual = depreciacionTotal / periodoAnos;
  const depreciacionMensual = depreciacionAnual / 12;

  // 2. Coste de bolsillo
  const gastoCombustibleAnual = (kmAno / 100) * consumo * precioCombustible;
  const bolsilloAnual = gastoCombustibleAnual + seguro + mantenimiento + otrosGastos;
  const bolsilloMensual = bolsilloAnual / 12;

  // 3. Coste Real Total
  const costeRealAnual = bolsilloAnual + depreciacionAnual;
  const costeRealMensual = costeRealAnual / 12;
  const costeRealKm = costeRealAnual / kmAno;

  // Inyección de resultados en el DOM
  document.getElementById('pocketAnual').textContent = bolsilloAnual.toFixed(2);
  document.getElementById('pocketMensual').textContent = bolsilloMensual.toFixed(2);

  document.getElementById('deprecTotal').textContent = depreciacionTotal.toFixed(2);
  document.getElementById('deprecAnual').textContent = depreciacionAnual.toFixed(2);
  document.getElementById('deprecMensual').textContent = depreciacionMensual.toFixed(2);

  document.getElementById('realAnual').textContent = costeRealAnual.toFixed(2);
  document.getElementById('realMensual').textContent = costeRealMensual.toFixed(2);
  document.getElementById('realKm').textContent = costeRealKm.toFixed(3);

  // Mostrar bloque de resultados con animación fluida
  resultadosDiv.classList.remove('hidden');
  resultadosDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
