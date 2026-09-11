document.addEventListener("DOMContentLoaded", function () {

  const formulario = document.getElementById("calc-form");
  const resultados = document.getElementById("resultados");
  const btnCompartir = document.getElementById("btn-compartir");
  const btnRecalcular = document.getElementById("btn-recalcular");

  formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const precioCompra = Number(document.getElementById("precioCompra").value);
    const valorFinal = Number(document.getElementById("valorFinal").value);
    const periodoAnos = Number(document.getElementById("periodoAnos").value);
    const kmAno = Number(document.getElementById("kmAno").value);
    const consumo = Number(document.getElementById("consumo").value);
    const precioCombustible = Number(document.getElementById("precioCombustible").value);
    const seguro = Number(document.getElementById("seguro").value);
    const mantenimiento = Number(document.getElementById("mantenimiento").value);
    const otrosGastos = Number(document.getElementById("otrosGastos").value);

    if (precioCompra <= 0) {
      alert("El precio de compra debe ser mayor que 0.");
      return;
    }

    if (valorFinal < 0 || valorFinal > precioCompra) {
      alert("El valor final debe estar entre 0 € y el precio de compra.");
      return;
    }

    if (periodoAnos <= 0 || kmAno <= 0) {
      alert("El periodo y los kilómetros deben ser mayores que 0.");
      return;
    }

    if (
      consumo < 0 ||
      precioCombustible < 0 ||
      seguro < 0 ||
      mantenimiento < 0 ||
      otrosGastos < 0
    ) {
      alert("Los gastos no pueden ser negativos.");
      return;
    }

    // DEPRECIACIÓN

    const depreciacionTotal = precioCompra - valorFinal;
    const depreciacionAnual = depreciacionTotal / periodoAnos;
    const depreciacionMensual = depreciacionAnual / 12;

    // COMBUSTIBLE

    const combustibleAnual =
      (kmAno / 100) * consumo * precioCombustible;

    // COSTE DE BOLSILLO

    const bolsilloAnual =
      combustibleAnual +
      seguro +
      mantenimiento +
      otrosGastos;

    const bolsilloMensual = bolsilloAnual / 12;

    // COSTE REAL

    const costeRealAnual =
      bolsilloAnual + depreciacionAnual;

    const costeRealMensual =
      costeRealAnual / 12;

    const costeRealKm =
      costeRealAnual / kmAno;

    // FORMATO

    const euro = new Intl.NumberFormat("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    const km = new Intl.NumberFormat("es-ES", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    });

    // MOSTRAR RESULTADOS

    document.getElementById("pocketAnual").textContent =
      euro.format(bolsilloAnual);

    document.getElementById("pocketMensual").textContent =
      euro.format(bolsilloMensual);

    document.getElementById("deprecTotal").textContent =
      euro.format(depreciacionTotal);

    document.getElementById("deprecAnual").textContent =
      euro.format(depreciacionAnual);

    document.getElementById("deprecMensual").textContent =
      euro.format(depreciacionMensual);

    document.getElementById("realMensual").textContent =
      euro.format(costeRealMensual);

    document.getElementById("realAnual").textContent =
      euro.format(costeRealAnual);

    document.getElementById("realKm").textContent =
      km.format(costeRealKm);

    document.getElementById("realMensualSecondary").textContent =
      euro.format(costeRealMensual);

    document.getElementById("realAnualSecondary").textContent =
      euro.format(costeRealAnual);

    document.getElementById("realKmSecondary").textContent =
      km.format(costeRealKm);

    resultados.classList.remove("hidden");

    resultados.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });


  // COMPARTIR

  btnCompartir.addEventListener("click", async function () {

    const mensual = document.getElementById("realMensual").textContent;
    const anual = document.getElementById("realAnual").textContent;
    const kilometro = document.getElementById("realKm").textContent;

    const texto =
      "Mi coche me cuesta realmente " +
      mensual +
      " € al mes, " +
      anual +
      " € al año y " +
      kilometro +
      " €/km.";

    if (navigator.share) {

      try {
        await navigator.share({
          title: "Coste Real de mi Coche",
          text: texto
        });
      } catch (error) {
        // Cancelado por el usuario.
      }

    } else {

      try {
        await navigator.clipboard.writeText(texto);

        const mensaje = document.getElementById("share-message");

        mensaje.classList.remove("hidden");

        setTimeout(function () {
          mensaje.classList.add("hidden");
        }, 3000);

      } catch (error) {
        alert(texto);
      }
    }
  });


  // CALCULAR DE NUEVO

  btnRecalcular.addEventListener("click", function () {

    resultados.classList.add("hidden");

    formulario.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    document.getElementById("precioCompra").focus();
  });

});