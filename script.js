"use strict";


/* =====================================================
   ELEMENTOS DEL FORMULARIO
===================================================== */

const purchasePriceInput = document.getElementById("purchasePrice");
const residualValueInput = document.getElementById("residualValue");
const yearsInput = document.getElementById("years");
const kmYearInput = document.getElementById("kmYear");
const consumptionInput = document.getElementById("consumption");
const fuelPriceInput = document.getElementById("fuelPrice");
const fixedCostsInput = document.getElementById("fixedCosts");

const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const errorMessage = document.getElementById("errorMessage");


/* =====================================================
   ELEMENTOS DE RESULTADOS
===================================================== */

const monthlyTotal = document.getElementById("monthlyTotal");
const annualTotal = document.getElementById("annualTotal");
const costPerKm = document.getElementById("costPerKm");
const periodTotal = document.getElementById("periodTotal");

const pocketAnnual = document.getElementById("pocketAnnual");
const pocketMonthly = document.getElementById("pocketMonthly");

const depreciationTotal = document.getElementById("depreciationTotal");
const depreciationAnnual = document.getElementById("depreciationAnnual");

const fuelAnnual = document.getElementById("fuelAnnual");
const fuelMonthly = document.getElementById("fuelMonthly");

const fixedAnnual = document.getElementById("fixedAnnual");
const fixedMonthly = document.getElementById("fixedMonthly");


/* =====================================================
   FORMATO DE EUROS
===================================================== */

function formatEuro(value) {

    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);

}


/* =====================================================
   FORMATO NÚMEROS
===================================================== */

function formatNumber(value) {

    return new Intl.NumberFormat("es-ES", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(value);

}


/* =====================================================
   OBTENER VALOR NUMÉRICO
===================================================== */

function getNumber(input) {

    return Number(input.value);


}


/* =====================================================
   VALIDACIÓN
===================================================== */

function validateInputs() {

    const purchasePrice = getNumber(purchasePriceInput);
    const residualValue = getNumber(residualValueInput);
    const years = getNumber(yearsInput);
    const kmYear = getNumber(kmYearInput);
    const consumption = getNumber(consumptionInput);
    const fuelPrice = getNumber(fuelPriceInput);
    const fixedCosts = getNumber(fixedCostsInput);


    if (
        !Number.isFinite(purchasePrice) ||
        !Number.isFinite(residualValue) ||
        !Number.isFinite(years) ||
        !Number.isFinite(kmYear) ||
        !Number.isFinite(consumption) ||
        !Number.isFinite(fuelPrice) ||
        !Number.isFinite(fixedCosts)
    ) {

        showError("Completa todos los campos antes de calcular.");

        return false;

    }


    if (purchasePrice <= 0) {

        showError("El precio de compra debe ser mayor que 0 €.");

        purchasePriceInput.focus();

        return false;

    }


    if (residualValue < 0) {

        showError("El valor final no puede ser negativo.");

        residualValueInput.focus();

        return false;

    }


    if (years <= 0) {

        showError("El periodo debe ser mayor que 0 años.");

        yearsInput.focus();

        return false;

    }


    if (kmYear <= 0) {

        showError("Los kilómetros anuales deben ser mayores que 0.");

        kmYearInput.focus();

        return false;

    }


    if (consumption < 0) {

        showError("El consumo no puede ser negativo.");

        consumptionInput.focus();

        return false;

    }


    if (fuelPrice < 0) {

        showError("El precio del combustible no puede ser negativo.");

        fuelPriceInput.focus();

        return false;

    }


    if (fixedCosts < 0) {

        showError("Los gastos fijos no pueden ser negativos.");

        fixedCostsInput.focus();

        return false;

    }


    clearError();

    return true;

}


/* =====================================================
   ERROR
===================================================== */

function showError(message) {

    errorMessage.textContent = message;

}


function clearError() {

    errorMessage.textContent = "";

}


/* =====================================================
   CALCULAR
===================================================== */

function calculateCosts() {

    if (!validateInputs()) {
        return;
    }


    /* ---------------------------------------------
       DATOS
    --------------------------------------------- */

    const purchasePrice = getNumber(purchasePriceInput);
    const residualValue = getNumber(residualValueInput);
    const years = getNumber(yearsInput);
    const kmYear = getNumber(kmYearInput);
    const consumption = getNumber(consumptionInput);
    const fuelPrice = getNumber(fuelPriceInput);
    const fixedCosts = getNumber(fixedCostsInput);


    /* ---------------------------------------------
       COMBUSTIBLE
       
       km/año ÷ 100 × L/100 km × €/L
    --------------------------------------------- */

    const litersYear =
        (kmYear / 100) * consumption;

    const annualFuelCost =
        litersYear * fuelPrice;

    const monthlyFuelCost =
        annualFuelCost / 12;


    /* ---------------------------------------------
       COSTE DE BOLSILLO
       
       Combustible + gastos fijos
    --------------------------------------------- */

    const annualPocketCost =
        annualFuelCost + fixedCosts;

    const monthlyPocketCost =
        annualPocketCost / 12;


    /* ---------------------------------------------
       DEPRECIACIÓN
       
       Precio compra - valor final
    --------------------------------------------- */

    const totalDepreciation =
        purchasePrice - residualValue;

    const annualDepreciation =
        totalDepreciation / years;

    const monthlyDepreciation =
        annualDepreciation / 12;


    /* ---------------------------------------------
       COSTE REAL ANUAL
    --------------------------------------------- */

    const annualRealCost =
        annualPocketCost + annualDepreciation;


    /* ---------------------------------------------
       COSTE REAL MENSUAL
    --------------------------------------------- */

    const monthlyRealCost =
        annualRealCost / 12;


    /* ---------------------------------------------
       COSTE REAL POR KM
    --------------------------------------------- */

    const realCostPerKm =
        annualRealCost / kmYear;


    /* ---------------------------------------------
       COSTE TOTAL DEL PERIODO
       
       Gastos de bolsillo durante todo el periodo
       + depreciación
    --------------------------------------------- */

    const totalPocketPeriod =
        annualPocketCost * years;

    const totalRealPeriod =
        totalPocketPeriod + totalDepreciation;


    /* ---------------------------------------------
       MOSTRAR RESULTADOS
    --------------------------------------------- */

    monthlyTotal.textContent =
        formatEuro(monthlyRealCost);


    annualTotal.textContent =
        formatEuro(annualRealCost);


    costPerKm.textContent =
        formatEuro(realCostPerKm);


    periodTotal.textContent =
        formatEuro(totalRealPeriod);


    /* ---------------------------------------------
       COSTE DE BOLSILLO
    --------------------------------------------- */

    pocketAnnual.textContent =
        formatEuro(annualPocketCost);


    pocketMonthly.textContent =
        formatEuro(monthlyPocketCost) + "/mes";


    /* ---------------------------------------------
       DEPRECIACIÓN
    --------------------------------------------- */

    depreciationTotal.textContent =
        formatEuro(totalDepreciation);


    depreciationAnnual.textContent =
        formatEuro(annualDepreciation) + "/año";


    /* ---------------------------------------------
       COMBUSTIBLE
    --------------------------------------------- */

    fuelAnnual.textContent =
        formatEuro(annualFuelCost);


    fuelMonthly.textContent =
        formatEuro(monthlyFuelCost) + "/mes";


    /* ---------------------------------------------
       GASTOS FIJOS
    --------------------------------------------- */

    fixedAnnual.textContent =
        formatEuro(fixedCosts);


    fixedMonthly.textContent =
        formatEuro(fixedCosts / 12) + "/mes";


    /* ---------------------------------------------
       GUARDAR DATOS
    --------------------------------------------- */

    saveData();

}


/* =====================================================
   REINICIAR
===================================================== */

function resetCalculator() {

    purchasePriceInput.value = "";
    residualValueInput.value = "";
    yearsInput.value = "";
    kmYearInput.value = "";
    consumptionInput.value = "";
    fuelPriceInput.value = "";
    fixedCostsInput.value = "";


    monthlyTotal.textContent = "0,00 €";
    annualTotal.textContent = "0,00 €";
    costPerKm.textContent = "0,00 €";
    periodTotal.textContent = "0,00 €";

    pocketAnnual.textContent = "0,00 €";
    pocketMonthly.textContent = "0,00 €/mes";

    depreciationTotal.textContent = "0,00 €";
    depreciationAnnual.textContent = "0,00 €/año";

    fuelAnnual.textContent = "0,00 €";
    fuelMonthly.textContent = "0,00 €/mes";

    fixedAnnual.textContent = "0,00 €";
    fixedMonthly.textContent = "0,00 €/mes";

    clearError();

    localStorage.removeItem("carCostCalculator");

}


/* =====================================================
   GUARDAR DATOS
===================================================== */

function saveData() {

    const data = {

        purchasePrice: purchasePriceInput.value,
        residualValue: residualValueInput.value,
        years: yearsInput.value,
        kmYear: kmYearInput.value,
        consumption: consumptionInput.value,
        fuelPrice: fuelPriceInput.value,
        fixedCosts: fixedCostsInput.value

    };


    localStorage.setItem(
        "carCostCalculator",
        JSON.stringify(data)
    );

}


/* =====================================================
   CARGAR DATOS
===================================================== */

function loadData() {

    const savedData =
        localStorage.getItem("carCostCalculator");


    if (!savedData) {
        return;
    }


    try {

        const data =
            JSON.parse(savedData);


        purchasePriceInput.value =
            data.purchasePrice || "";

        residualValueInput.value =
            data.residualValue || "";

        yearsInput.value =
            data.years || "";

        kmYearInput.value =
            data.kmYear || "";

        consumptionInput.value =
            data.consumption || "";

        fuelPriceInput.value =
            data.fuelPrice || "";

        fixedCostsInput.value =
            data.fixedCosts || "";


    } catch (error) {

        localStorage.removeItem(
            "carCostCalculator"
        );

    }

}


/* =====================================================
   EVENTOS
===================================================== */

calculateBtn.addEventListener(
    "click",
    calculateCosts
);


resetBtn.addEventListener(
    "click",
    resetCalculator
);


/* =====================================================
   ENTER PARA CALCULAR
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            calculateCosts();

        }

    }
);


/* =====================================================
   CARGAR DATOS AL ABRIR
===================================================== */

loadData();