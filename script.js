document.getElementById("calc-form").addEventListener("submit", function (event) {

  event.preventDefault();

  const resultados = document.getElementById("resultados");

  // ==========================
  // OBTENER DATOS
  // ==========================

  const precioCompra = Number(
    document.getElementById("precioCompra").value
  );

  const valorFinal = Number(
    document.getElementById("valorFinal").value
  );

  const periodoAnos = Number(
    document.getElementById("periodoAnos").value
  );

  const kmAno = Number(
    document.getElementById("kmAno").value
  );

  const consumo = Number(
    document.getElementById("consumo").value
  );

  const precioCombustible = Number(
    document.getElementById("precioCombustible").value
  );

  const seguro = Number(
    document.getElementById("seguro").value
  );

  const mantenimiento = Number(
    document.getElementById("mantenimiento").value
  );

  const otrosGastos = Number(
    document.getElementById("otrosGastos").value
  );


  // ==========================
  // VALIDACIONES
  // ==========================

  if (precioCompra <= 0) {
    alert("El precio de compra debe ser mayor que 0.");
    return;
  }

  if (valorFinal < 0) {
    alert("El valor final no puede ser negativo.");
    return;
  }

  if (valorFinal > precioCompra) {
    alert(
      "El valor final no puede ser superior al precio de compra."
    );
    return;
  }

  if (periodoAnos <= 0) {
    alert("El periodo de propiedad debe ser mayor que 0.");
    return;
  }

  if (kmAno <= 0) {
    alert("Los kilómetros al año deben ser mayores que 0.");
    return;
  }

  if (consumo < 0) {
    alert("El consumo no puede ser negativo.");
    return;
  }

  if (precioCombustible < 0) {
    alert("El precio del combustible no puede ser negativo.");
    return;
  }

  if (seguro < 0) {
    alert("El seguro no puede ser negativo.");
    return;
  }

  if (mantenimiento < 0) {
    alert("El mantenimiento no puede ser negativo.");
    return;
  }

  if (otrosGastos < 0) {
    alert("Los otros gastos no pueden ser negativos.");
    return;
  }


  // ==========================
  // DEPRECIACIÓN
  // ==========================

  const depreciacionTotal =
    precioCompra - valorFinal;

  const depreciacionAnual =
    depreciacionTotal / periodoAnos;

  const depreciacionMensual =
    depreciacionAnual / 12;


  // ==========================
  // COMBUSTIBLE
  // ==========================

  const combustibleAnual =
    (kmAno / 100) *
    consumo *
    precioCombustible;


  // ==========================
  // COSTE DE BOLSILLO
  // ==========================

  const bolsilloAnual =
    combustibleAnual +
    seguro +
    mantenimiento +
    otrosGastos;

  const bolsilloMensual =
    bolsilloAnual / 12;


  // ==========================
  // COSTE REAL
  // ==========================

  const costeRealAnual =
    bolsilloAnual +
    depreciacionAnual;

  const costeRealMensual =
    costeRealAnual / 12;

  const costeRealKm =
    costeRealAnual / kmAno;


  // ==========================
  // FORMATO ESPAÑOL
  // ==========================

  function formatoEuro(valor) {

    return new Intl.NumberFormat("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(valor);

  }


  function formatoKm(valor) {

    return new Intl.NumberFormat("es-ES", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(valor);

  }


  // ==========================
  // MOSTRAR RESULTADOS
  // ==========================

  document.getElementById("pocketAnual").textContent =
    formatoEuro(bolsilloAnual);

  document.getElementById("pocketMensual").textContent =
    formatoEuro(bolsilloMensual);


  document.getElementById("deprecTotal").textContent =
    formatoEuro(depreciacionTotal);

  document.getElementById("deprecAnual").textContent =
    formatoEuro(depreciacionAnual);

  document.getElementById("deprecMensual").textContent =
    formatoEuro(depreciacionMensual);


  // Resultado principal

  document.getElementById("realMensual").textContent =
    formatoEuro(costeRealMensual);

  document.getElementById("realAnual").textContent =
    formatoEuro(costeRealAnual);

  document.getElementById("realKm").textContent =
    formatoKm(costeRealKm);


  // Resultado secundario

  document.getElementById("realMensualSecondary").textContent =
    formatoEuro(costeRealMensual);

  document.getElementById("realAnualSecondary").textContent =
    formatoEuro(costeRealAnual);

  document.getElementById("realKmSecondary").textContent =
    formatoKm(costeRealKm);


  // Mostrar resultados

  resultados.classList.remove("hidden");

  // Llevar al usuario hacia los resultados

  resultados.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

});


// ======================================
// BOTÓN COMPARTIR
// ======================================

document
  .getElementById("btn-compartir")
  .addEventListener("click", async function () {

    const mensual =
      document.getElementById("realMensual").textContent;

    const anual =
      document.getElementById("realAnual").textContent;

    const kilometro =
      document.getElementById("realKm").textContent;


    const texto =
      "Mi coche me cuesta realmente " +
      mensual +
      " € al mes, " +
      anual +
      " € al año y " +
      kilometro +
      " €/km.";


    // Compartir mediante el sistema del móvil

    if (navigator.share) {

      try {

        await navigator.share({
          title: "Coste Real de mi C