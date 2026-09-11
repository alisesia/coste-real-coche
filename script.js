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

    // CÁLCULOS
    // 1. Depreciación
    const depreciacionTotal = precioCompra - valorFinal;
    const depreciacionAnual = depreciacionTotal / periodoAnos;
    const depreciacionMensual = depreciacionAnual / 12;

    // 2. Bolsillo (Gastos directos)
    const gastoCombustibleAnual = (kmAno / 100) * consumo * precioCombustible;
    const bolsilloAnual = gastoCombustibleAnual + seguro + mantenimiento + otrosGastos;
    const bolsilloMensual = bolsilloAnual / 12;

    // 3. Coste Real
    const costeRealAnual = bolsilloAnual + depreciacionAnual;
    const costeRealMensual = costeRealAnual / 12;
    const costeRealPeriodo = costeRealAnual * periodoAnos;
    const costeRealKm = costeRealAnual / kmAno;

    // 4. Desglose Total en el Periodo
    const totalCombustible = gastoCombustibleAnual * periodoAnos;
    const totalSeguro = seguro * periodoAnos;
    const totalMantenimiento = mantenimiento * periodoAnos;
    const totalOtros = otrosGastos * periodoAnos;
    const totalDepreciacion = depreciacionTotal;

    // Porcentajes
    const pctCombustible = ((totalCombustible / costeRealPeriodo) * 100).toFixed(1);
    const pctSeguro = ((totalSeguro / costeRealPeriodo) * 100).toFixed(1);
    const pctMantenimiento = ((totalMantenimiento / costeRealPeriodo) * 100).toFixed(1);
    const pctOtros = ((totalOtros / costeRealPeriodo) * 100).toFixed(1);
    const pctDeprec = ((totalDepreciacion / costeRealPeriodo) * 100).toFixed(1);

    // INYECCIÓN DE DATOS
    document.getElementById('lblAnosPeriodo').textContent = periodoAnos;
    document.getElementById('realPeriodo').textContent = costeRealPeriodo.toFixed(2);
    document.getElementById('realMensual').textContent = costeRealMensual.toFixed(2);
    document.getElementById('realAnual').textContent = costeRealAnual.toFixed(2);
    document.getElementById('realKm').textContent = costeRealKm.toFixed(3);

    // Comparativa
    document.getElementById('compBolsillo').textContent = bolsilloMensual.toFixed(2);
    document.getElementById('compReal').textContent = costeRealMensual.toFixed(2);
    document.getElementById('compDiferencia').textContent = depreciacionMensual.toFixed(2);

    // Desglose
    document.getElementById('costoCombustible').textContent = totalCombustible.toFixed(2);
    document.getElementById('pctCombustible').textContent = pctCombustible;
    document.getElementById('barCombustible').style.width = pctCombustible + '%';

    document.getElementById('costoSeguro').textContent = totalSeguro.toFixed(2);
    document.getElementById('pctSeguro').textContent = pctSeguro;
    document.getElementById('barSeguro').style.width = pctSeguro + '%';

    document.getElementById('costoMantenimiento').textContent = totalMantenimiento.toFixed(2);
    document.getElementById('pctMantenimiento').textContent = pctMantenimiento;
    document.getElementById('barMantenimiento').style.width = pctMantenimiento + '%';

    document.getElementById('costoOtros').textContent = totalOtros.toFixed(2);
    document.getElementById('pctOtros').textContent = pctOtros;
    document.getElementById('barOtros').style.width = pctOtros + '%';

    document.getElementById('costoDeprec').textContent = totalDepreciacion.toFixed(2);
    document.getElementById('pctDeprec').textContent = pctDeprec;
    document.getElementById('barDeprec').style.width = pctDeprec + '%';

    resultadosDiv.classList.remove('hidden');
    resultadosDiv.scrollIntoView({ behavior: 'smooth' });
  });

  // Funcionalidad de Compartir
  const btnCompartir = document.getElementById('btn-compartir');
  if (btnCompartir) {
    btnCompartir.addEventListener('click', function () {
      const realMensual = document.getElementById('realMensual').textContent;
      const realKm = document.getElementById('realKm').textContent;
      const shareData = {
        title: 'Coste Real de mi Coche',
        text: `El coste real de mi coche es de ${realMensual}€/mes (${realKm}€/km). ¡Calcula el tuyo aquí!`,
        url: window.location.href
      };

      if (navigator.share) {
        navigator.share(shareData).catch(() => {});
      } else {
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('¡Enlace y resultado copiado al portapapeles!');
      }
    });
  }
});
