document.getElementById('calc-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Obtener referencias del DOM
  const resultadosDiv = document.getElementById('resultados');

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

  // VALIDACIONES
  if (isNaN(precioCompra) || precioCompra <= 0) {
    alert('El precio de compra debe ser un número mayor que 0.');
    return;
  }

  if (isNaN(valorFinal) || valorFinal < 0) {
    alert('El valor estimado final no puede ser un número negativo.');
    return;
  }

  if (valorFinal > precioCompra) {
    alert('El valor estimado final del coche no puede ser superior al precio de compra.');
    return;
  }

  if (isNaN(periodoAnos) || periodoAnos <= 0) {
    alert('El periodo de propiedad debe ser al menos de 1 año.');
    return;
  }

  if (isNaN(kmAno) || kmAno <= 0) {
    alert('Los kilómetros al año deben ser un número mayor que 0.');
    return;
  }

  if (isNaN(consumo) || consumo < 0) {
    alert('El consumo de combustible no puede ser un valor negativo.');
    return;
  }

  if (isNaN(precioCombustible) || precioCombustible < 0) {
    alert('El precio del combustible no puede ser un valor negativo.');
    return;
  }

  if (isNaN(seguro) || seguro < 0) {
    alert('El coste del seguro no puede ser un valor negativo.');
    return;
  }

  if (isNaN(mantenimiento) || mantenimiento < 0) {
    alert('El coste de mantenimiento no puede ser un valor negativo.');
    return;
  }

  if (isNaN(otrosGastos) || otrosGastos < 0) {
    alert('Los otros gastos anuales no pueden ser un valor negativo.');
    return;
  }

  // CÁLCULOS
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

  // INYECCIÓN DE DATOS
  document.getElementById('pocketAnual').textContent = bolsilloAnual.toFixed(2);
  document.getElementById('pocketMensual').textContent = bolsilloMensual.toFixed(2);

  document.getElementById('deprecTotal').textContent = depreciacionTotal.toFixed(2);
  document.getElementById('deprecAnual').textContent = depreciacionAnual.toFixed(2);
  document.getElementById('deprecMensual').textContent = depreciacionMensual.toFixed(2);

  document.getElementById('realAnual').textContent = costeRealAnual.toFixed(2);
  document.getElementById('realMensual').textContent = costeRealMensual.toFixed(2);
  document.getElementById('realKm').textContent = costeRealKm.toFixed(3);

  // MUESTRA DE RESULTADOS
  resultadosDiv.classList.remove('hidden');
  resultadosDiv.scrollIntoView({ behavior: 'smooth' });
});
