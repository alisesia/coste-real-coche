document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('calc-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const resultadosDiv = document.getElementById('resultados');

    const precioCompra = parseFloat(document.getElementById('precioCompra').value) || 0;
    const valorFinal = parseFloat(document.getElementById('valorFinal').value) || 0;
    const periodoAnos = parseFloat(document.getElementById('periodoAnos').value) || 1;
    const kmAno = parseFloat(document.getElementById('kmAno').value) || 0;
    const consumo = parseFloat(document.getElementById('consumo').value) || 0;
    const precioCombustible = parseFloat(document.getElementById('precioCombustible').value) || 0;
    const seguro = parseFloat(document.getElementById('seguro').value) || 0;
    const mantenimiento = parseFloat(document.getElementById('mantenimiento').value) || 0;
    const otrosGastos = parseFloat(document.getElementById('otrosGastos').value) || 0;

    if (precioCompra <= 0 || kmAno <= 0 || periodoAnos <= 0) {
      alert('Ingresa valores válidos en el precio, kilómetros y años.');
      return;
    }

    if (valorFinal > precioCompra) {
      alert('El valor estimado final no puede superar el precio de compra.');
      return;
    }

    // Depreciación
    const depreciacionTotal = precioCompra - valorFinal;
    const depreciacionAnual = depreciacionTotal / periodoAnos;
    const depreciacionMensual = depreciacionAnual / 12;

    // Bolsillo
    const gastoCombustibleAnual = (kmAno / 100) * consumo * precioCombustible;
    const bolsilloAnual = gastoCombustibleAnual + seguro + mantenimiento + otrosGastos;
    const bolsilloMensual = bolsilloAnual / 12;

    // Real
    const costeRealAnual = bolsilloAnual + depreciacionAnual;
    const costeRealMensual = costeRealAnual / 12;
    const costeRealKm = costeRealAnual / kmAno;

    // Renderizar resultados
    document.getElementById('pocketAnual').textContent = bolsilloAnual.toFixed(2);
    document.getElementById('pocketMensual').textContent = bolsilloMensual.toFixed(2);

    document.getElementById('deprecTotal').textContent = depreciacionTotal.toFixed(2);
    document.getElementById('deprecAnual').textContent = depreciacionAnual.toFixed(2);
    document.getElementById('deprecMensual').textContent = depreciacionMensual.toFixed(2);

    document.getElementById('realAnual').textContent = costeRealAnual.toFixed(2);
    document.getElementById('realMensual').textContent = costeRealMensual.toFixed(2);
    document.getElementById('realKm').textContent = costeRealKm.toFixed(3);

    resultadosDiv.classList.remove('hidden');
    resultadosDiv.scrollIntoView({ behavior: 'smooth' });
  });
});
