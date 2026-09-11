document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('calc-form');
  const btnCalcular = document.getElementById('btn-calcular');

  function procesarCalculo(e) {
    if (e) e.preventDefault();

    const resultadosDiv = document.getElementById('resultados');
    if (!resultadosDiv) return;

    const precioCompra = parseFloat(document.getElementById('precioCompra')?.value) || 0;
    const valorFinal = parseFloat(document.getElementById('valorFinal')?.value) || 0;
    const periodoAnos = parseFloat(document.getElementById('periodoAnos')?.value) || 1;
    const kmAno = parseFloat(document.getElementById('kmAno')?.value) || 0;
    const consumo = parseFloat(document.getElementById('consumo')?.value) || 0;
    const precioCombustible = parseFloat(document.getElementById('precioCombustible')?.value) || 0;
    const seguro = parseFloat(document.getElementById('seguro')?.value) || 0;
    const mantenimiento = parseFloat(document.getElementById('mantenimiento')?.value) || 0;
    const otrosGastos = parseFloat(document.getElementById('otrosGastos')?.value) || 0;

    if (precioCompra <= 0 || kmAno <= 0 || periodoAnos <= 0) {
      alert('Ingresa valores válidos en el precio, kilómetros y años.');
      return;
    }

    if (valorFinal > precioCompra) {
      alert('El valor estimado final no puede superar el precio de compra.');
      return;
    }

    // CÁLCULOS
    const depreciacionTotal = precioCompra - valorFinal;
    const depreciacionAnual = depreciacionTotal / periodoAnos;
    const depreciacionMensual = depreciacionAnual / 12;

    const gastoCombustibleAnual = (kmAno / 100) * consumo * precioCombustible;
    const bolsilloAnual = gastoCombustibleAnual + seguro + mantenimiento + otrosGastos;
    const bolsilloMensual = bolsilloAnual / 12;

    const costeRealAnual = bolsilloAnual + depreciacionAnual;
    const costeRealMensual = costeRealAnual / 12;
    const costeRealPeriodo = costeRealAnual * periodoAnos;
    const costeRealKm = costeRealAnual / kmAno;

    const totalCombustible = gastoCombustibleAnual * periodoAnos;
    const totalSeguro = seguro * periodoAnos;
    const totalMantenimiento = mantenimiento * periodoAnos;
    const totalOtros = otrosGastos * periodoAnos;
    const totalDepreciacion = depreciacionTotal;

    const pctCombustible = ((totalCombustible / costeRealPeriodo) * 100).toFixed(1);
    const pctSeguro = ((totalSeguro / costeRealPeriodo) * 100).toFixed(1);
    const pctMantenimiento = ((totalMantenimiento / costeRealPeriodo) * 100).toFixed(1);
    const pctOtros = ((totalOtros / costeRealPeriodo) * 100).toFixed(1);
    const pctDeprec = ((totalDepreciacion / costeRealPeriodo) * 100).toFixed(1);

    const setTexto = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    };

    setTexto('lblAnosPeriodo', periodoAnos);
    setTexto('realPeriodo', costeRealPeriodo.toFixed(2));
    setTexto('realMensual', costeRealMensual.toFixed(2));
    setTexto('realAnual', costeRealAnual.toFixed(2));
    setTexto('realKm', costeRealKm.toFixed(3));

    setTexto('compBolsillo', bolsilloMensual.toFixed(2));
    setTexto('compReal', costeRealMensual.toFixed(2));
    setTexto('compDiferencia', depreciacionMensual.toFixed(2));

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
    if (barMant) barMant.style.width = pctMant + '%';

    setTexto('costoOtros', totalOtros.toFixed(2));
    setTexto('pctOtros', pctOtros);
    const barOtros = document.getElementById('barOtros');
    if (barOtros) barOtros.style.width = pctOtros + '%';

    setTexto('costoDeprec', totalDepreciacion.toFixed(2));
    setTexto('pctDeprec', pctDeprec);
    const barDeprec = document.getElementById('barDeprec');
    if (barDeprec) barDeprec.style.width = pctDeprec + '%';

    resultadosDiv.classList.remove('hidden');
    resultadosDiv.scrollIntoView({ behavior: 'smooth' });
  }

  if (form) form.addEventListener('submit', procesarCalculo);
  if (btnCalcular) {
    btnCalcular.addEventListener('click', function(e) {
      if (form && form.checkValidity()) procesarCalculo(e);
    });
  }

  // Compartir
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
        alert('¡Enlace copiado!');
      }
    });
  }

  // Exportar a PDF
  const btnPdf = document.getElementById('btn-pdf');
  if (btnPdf) {
    btnPdf.addEventListener('click', function () {
      const element = document.getElementById('informe-card');
      const opt = {
        margin:       10,
        filename:     'informe-coste-real-coche.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save();
    });
  }
});
