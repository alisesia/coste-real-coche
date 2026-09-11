document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('calc-form');
  const btnCalcular = document.getElementById('btn-calcular');

  // Función principal para procesar los cálculos
  function procesarCalculo(e) {
    if (e) e.preventDefault();

    const resultadosDiv = document.getElementById('resultados');
    if (!resultadosDiv) return;

    // Obtener y parsear los valores
    const precioCompra = parseFloat(document.getElementById('precioCompra')?.value) || 0;
    const valorFinal = parseFloat(document.getElementById('valorFinal')?.value) || 0;
    const periodoAnos = parseFloat(document.getElementById('periodoAnos')?.value) || 1;
    const kmAno = parseFloat(document.getElementById('kmAno')?.value) || 0;
    const consumo = parseFloat(document.getElementById('consumo')?.value) || 0;
    const precioCombustible = parseFloat(document.getElementById('precioCombustible')?.value) || 0;
    const seguro = parseFloat(document.getElementById('seguro')?.value) || 0;
    const mantenimiento = parseFloat(document.getElementById('mantenimiento')?.value) || 0;
    const otrosGastos = parseFloat(document.getElementById('otrosGastos')?.value) || 0;

    // Validaciones básicas
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

    // 3. Coste Real Total
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
    const setTexto = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    };

    setTexto('lblAnosPeriodo', periodoAnos);
    setTexto('realPeriodo', costeRealPeriodo.toFixed(2));
    setTexto('realMensual', costeRealMensual.toFixed(2));
    setTexto('realAnual', costeRealAnual.toFixed(2));
    setTexto('realKm', costeRealKm.toFixed(3));

    // Comparativa
    setTexto('compBolsillo', bolsilloMensual.toFixed(2));
    setTexto('compReal', costeRealMensual.toFixed(2));
    setTexto('compDiferencia', depreciacionMensual.toFixed(2));

    // Desglose
    setTexto('costoCombustible', totalCombustible.toFixed(2));
    setTexto('pctCombustible', pctCombustible);
    const barComb = document.getElementById('barCombustible');
    if (barComb) barComb.style.width = pctCombustible + '%';

    setTexto('costoSeguro', totalSeguro.toFixed(2));
    setTexto('pctSeguro', pctSeguro);
    const barSeg = document.getElementById('barSeguro');
    if (barSeg) barSeg.style.width = pctSeguro + '%';

    setTexto('costoMantenimiento', totalMantenimiento.toFixed(2));
    setTexto('pctMantenimiento', pctMantenimiento);
    const barMant = document.getElementById('barMantenimiento');
    if (barMant) barMant.style.width = pctMantenimiento + '%';

    setTexto('costoOtros', totalOtros.toFixed(2));
    setTexto('pctOtros', pctOtros);
    const barOtros = document.getElementById('barOtros');
    if (barOtros) barOtros.style.width = pctOtros + '%';

    setTexto('costoDeprec', totalDepreciacion.toFixed(2));
    setTexto('pctDeprec', pctDeprec);
    const barDeprec = document.getElementById('barDeprec');
    if (barDeprec) barDeprec.style.width = pctDeprec + '%';

    // Mostrar sección
    resultadosDiv.classList.remove('hidden');
    resultadosDiv.scrollIntoView({ behavior: 'smooth' });
  }

  // Escuchar tanto el evento submit como el click directo en el botón
  if (form) {
    form.addEventListener('submit', procesarCalculo);
  }
  if (btnCalcular) {
    btnCalcular.addEventListener('click', function(e) {
      if (form && form.checkValidity()) {
        procesarCalculo(e);
      }
    });
  }

  // Funcionalidad del botón de Compartir
  const btnCompartir = document.getElementById('btn-compartir');
  if (btnCompartir) {
    btnCompartir.addEventListener('click', function () {
      const realMensual = document.getElementById('realMensual')?.textContent || '0';
      const realKm = document.getElementById('realKm')?.textContent || '0';
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
