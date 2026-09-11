"use strict";


/* =====================================================
   ELEMENTOS PRINCIPALES
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
   RESULTADOS
===================================================== */

const monthlyTotal = document.getElementById("monthlyTotal");
const annualTotal = document.getElementById("annualTotal");
const costPerKm = document.getElementById("costPerKm");
const costPer1000Km = document.getElementById("costPer1000Km");
const periodTotal = document.getElementById("periodTotal");

const pocketAnnual = document.getElementById("pocketAnnual");
const pocketMonthly = document.getElementById("pocketMonthly");

const depreciationTotal = document.getElementById("depreciationTotal");
const depreciationAnnual = document.getElementById("depreciationAnnual");

const fuelAnnual = document.getElementById("fuelAnnual");
const fuelMonthly = document.getElementById("fuelMonthly");

const fixedAnnual = document.getElementById("fixedAnnual");
const fixedMonthly = document.getElementById("fixedMonthly");

const insightText = document.getElementById("insightText");


/* =====================================================
   COMPARADOR
===================================================== */

const carAName = document.getElementById("carAName");
const carBName = document.getElementById("carBName");

const compareBPurchase = document.getElementById("compareBPurchase");
const compareBResidual = document.getElementById("compareBResidual");
const compareBYears = document.getElementById("compareBYears");
const compareBKm = document.getElementById("compareBKm");
const compareBConsumption = document.getElementById("compareBConsumption");
const compareBFuelPrice = document.getElementById("compareBFuelPrice");
const compareBFixed = document.getElementById("compareBFixed");

const compareAMonthly = document.getElementById("compareAMonthly");
const compareAAnnual = document.getElementById("compareAAnnual");
const compareAKm = document.getElementById("compareAKm");

const compareBMonthly = document.getElementById("compareBMonthly");
const compareBAnnual = document.getElementById("compareBAnnual");
const compareBKm = document.getElementById("compareBKm");

const compareBtn = document.getElementById("compareBtn");
const comparisonWinner = document.getElementById("comparisonWinner");


/* =====================================================
   FORMATO
===================================================== */

function formatEuro(value) {

    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);

}


function getNumber(input) {

    return Number(input.value);

}


/* =====================================================
   CALCULAR VEHÍCULO
===================================================== */

function calculateVehicle(data) {

    const purchasePrice = data.purchasePrice;
    const residualValue = data.residualValue;
    const years = data.years;
    const kmYear = data.kmYear;
    const consumption = data.consumption;
    const fuelPrice = data.fuelPrice;
    const fixedCosts = data.fixedCosts;


    /*
        Combustible:
        km / 100 × consumo × precio
    */

    const litersYear =
        (kmYear / 100) * consumption;

    const annualFuelCost =
        litersYear * fuelPrice;


    /*
        Coste de bolsillo
    */

    const annualPocketCost =
        annualFuelCost + fixedCosts;


    /*
        Depreciación
    */

    const totalDepreciation =
        Math.max(0, purchasePrice - residualValue);

    const annualDepreciation =
        totalDepreciation / years;


    /*
        Coste real
    */

    const annualRealCost =
        annualPocketCost + annualDepreciation;

    const monthlyRealCost =
        annualRealCost / 12;

    const realCostPerKm =
        annualRealCost / kmYear;

    const realCostPer1000Km =
        realCostPerKm * 1000;


    /*
        Coste total durante todo el periodo
    */

    const totalPocketPeriod =
        annualPocketCost * years;

    const totalRealPeriod =
        totalPocketPeriod + totalDepreciation;


    return {

        annualFuelCost,
        monthlyFuelCost: annualFuelCost / 12,

        annualPocketCost,
        monthlyPocketCost: annualPocketCost / 12,

        totalDepreciation,
        annualDepreciation,

        annualRealCost,
        monthlyRealCost,

        realCostPerKm,
        realCostPer1000Km,

        totalRealPeriod

    };

}


/* =====================================================
   DATOS PRINCIPALES
===================================================== */

function getMainData() {

    return {

        purchasePrice: getNumber(purchasePriceInput),
        residualValue: getNumber(residualValueInput),
        years: getNumber(yearsInput),
        kmYear: getNumber(kmYearInput),
        consumption: getNumber(consumptionInput),
        fuelPrice: getNumber(fuelPriceInput),
        fixedCosts: getNumber(fixedCostsInput)

    };

}


/* =====================================================
   VALIDACIÓN PRINCIPAL
===================================================== */

function validateMainData() {

    const data = getMainData();

    const values = Object.values(data);

    if (values.some(value => !Number.isFinite(value))) {

        showError(
            "Completa todos los campos antes de calcular."
        );

        return false;

    }


    if (data.purchasePrice <= 0) {

        showError(
            "El precio de compra debe ser mayor que 0 €."
        );

        purchasePriceInput.focus();

        return false;

    }


    if (data.residualValue < 0) {

        showError(
            "El valor final no puede ser negativo."
        );

        residualValueInput.focus();

        return false;

    }


    if (data.residualValue > data.purchasePrice) {

        showError(
            "El valor final no debería ser superior al precio de compra."
        );

        residualValueInput.focus();

        return false;

    }


    if (data.years <= 0) {

        showError(
            "El periodo debe ser mayor que 0 años."
        );

        yearsInput.focus();

        return false;

    }


    if (data.kmYear <= 0) {

        showError(
            "Los kilómetros anuales deben ser mayores que 0."
        );

        kmYearInput.focus();

        return false;

    }


    if (data.consumption < 0) {

        showError(
            "El consumo no puede ser negativo."
        );

        consumptionInput.focus();

        return false;

    }


    if (data.fuelPrice < 0) {

        showError(
            "El precio del combustible no puede ser negativo."
        );

        fuelPriceInput.focus();

        return false;

    }


    if (data.fixedCosts < 0) {

        showError(
            "Los gastos fijos no pueden ser negativos."
        );

        fixedCostsInput.focus();

        return false;

    }


    clearError();

    return true;

}


/* =====================================================
   MOSTRAR RESULTADOS
===================================================== */

function displayResults(result) {

    monthlyTotal.textContent =
        formatEuro(result.monthlyRealCost);

    annualTotal.textContent =
        formatEuro(result.annualRealCost);

    costPerKm.textContent =
        formatEuro(result.realCostPerKm);

    costPer1000Km.textContent =
        formatEuro(result.realCostPer1000Km);

    periodTotal.textContent =
        formatEuro(result.totalRealPeriod);


    pocketAnnual.textContent =
        formatEuro(result.annualPocketCost);

    pocketMonthly.textContent =
        formatEuro(result.monthlyPocketCost) + "/mes";


    depreciationTotal.textContent =
        formatEuro(result.totalDepreciation);

    depreciationAnnual.textContent =
        formatEuro(result.annualDepreciation) + "/año";


    fuelAnnual.textContent =
        formatEuro(result.annualFuelCost);

    fuelMonthly.textContent =
        formatEuro(result.monthlyFuelCost) + "/mes";


    fixedAnnual.textContent =
        formatEuro(getNumber(fixedCostsInput));

    fixedMonthly.textContent =
        formatEuro(getNumber(fixedCostsInput) / 12) + "/mes";


    /*
        Dato clave
    */

    const fuelPercentage =
        result.annualRealCost > 0
            ? (result.annualFuelCost / result.annualRealCost) * 100
            : 0;


    const depreciationPercentage =
        result.annualRealCost > 0
            ? (result.annualDepreciation / result.annualRealCost) * 100
            : 0;


    if (depreciationPercentage >= fuelPercentage) {

        insightText.textContent =
            `La depreciación representa aproximadamente el ${depreciationPercentage.toFixed(0)}% de tu coste anual real. Comprar más barato o conservar mejor el valor del coche puede tener un impacto importante.`;

    } else {

        insightText.textContent =
            `El combustible representa aproximadamente el ${fuelPercentage.toFixed(0)}% de tu coste anual real. Reducir kilómetros, consumo o precio por litro tendría un impacto directo.`;

    }

}


/* =====================================================
   CALCULAR PRINCIPAL
===================================================== */

function calculateCosts() {

    if (!validateMainData()) {
        return;
    }

    const data = getMainData();

    const result =
        calculateVehicle(data);

    displayResults(result);

    saveData();

}


/* =====================================================
   COMPARADOR
===================================================== */

function getComparisonData() {

    return {

        purchasePrice: getNumber(compareBPurchase),
        residualValue: getNumber(compareBResidual),
        years: getNumber(compareBYears),
        kmYear: getNumber(compareBKm),
        consumption: getNumber(compareBConsumption),
        fuelPrice: getNumber(compareBFuelPrice),
        fixedCosts: getNumber(compareBFixed)

    };

}


function compareCars() {

    if (!validateMainData()) {
        return;
    }


    const dataA =
        getMainData();

    const dataB =
        getComparisonData();


    const valuesB =
        Object.values(dataB);


    if (valuesB.some(value => !Number.isFinite(value))) {

        comparisonWinner.textContent =
            "Completa todos los datos del coche B antes de comparar.";

        return;

    }


    if (dataB.purchasePrice <= 0) {

        comparisonWinner.textContent =
            "El precio de compra del coche B debe ser mayor que 0 €.";

        compareBPurchase.focus();

        return;

    }


    if (dataB.residualValue < 0) {

        comparisonWinner.textContent =
            "El valor final del coche B no puede ser negativo.";

        return;

    }


    if (dataB.residualValue > dataB.purchasePrice) {

        comparisonWinner.textContent =
            "El valor final del coche B no debería ser superior a su precio de compra.";

        return;

    }


    if (dataB.years <= 0 || dataB.kmYear <= 0) {

        comparisonWinner.textContent =
            "Los años y kilómetros del coche B deben ser mayores que 0.";

        return;

    }


    const resultA =
        calculateVehicle(dataA);

    const resultB =
        calculateVehicle(dataB);


    /*
        Mostrar coche A
    */

    compareAMonthly.textContent =
        formatEuro(resultA.monthlyRealCost);

    compareAAnnual.textContent =
        formatEuro(resultA.annualRealCost);

    compareAKm.textContent =
        formatEuro(resultA.realCostPerKm);


    /*
        Mostrar coche B
    */

    compareBMonthly.textContent =
        formatEuro(resultB.monthlyRealCost);

    compareBAnnual.textContent =
        formatEuro(resultB.annualRealCost);

    compareBKm.textContent =
        formatEuro(resultB.realCostPerKm);


    /*
        Nombres
    */

    const nameA =
        carAName.value.trim() || "Coche A";

    const nameB =
        carBName.value.trim() || "Coche B";


    /*
        Diferencia
    */

    const annualDifference =
        Math.abs(
            resultA.annualRealCost -
            resultB.annualRealCost
        );


    const monthlyDifference =
        annualDifference / 12;


    /*
        Ganador
    */

    if (resultA.annualRealCost < resultB.annualRealCost) {

        comparisonWinner.innerHTML =
            `<strong>${escapeHTML(nameA)}</strong> es más barato de mantener. 
            Ahorrarías aproximadamente <strong>${formatEuro(monthlyDifference)}/mes</strong> 
            o <strong>${formatEuro(annualDifference)}/año</strong> frente a ${escapeHTML(nameB)}.`;

    } else if (resultB.annualRealCost < resultA.annualRealCost) {

        comparisonWinner.innerHTML =
            `<strong>${escapeHTML(nameB)}</strong> es más barato de mantener. 
            Ahorrarías aproximadamente <strong>${formatEuro(monthlyDifference)}/mes</strong> 
            o <strong>${formatEuro(annualDifference)}/año</strong> frente a ${escapeHTML(nameA)}.`;

    } else {

        comparisonWinner.textContent =
            "Los dos coches tienen exactamente el mismo coste anual estimado.";

    }

}


/* =====================================================
   EVITAR HTML INSEGURO EN NOMBRES
===================================================== */

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================================
   ERROR
===================================================== */

function showError(message) {

    errorMessage.textContent =
        message;

}


function clearError() {

    errorMessage.textContent =
        "";

}


/* =====================================================
   RESET
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
    costPer1000Km.textContent = "0,00 €";
    periodTotal.textContent = "0,00 €";

    pocketAnnual.textContent = "0,00 €";
    pocketMonthly.textContent = "0,00 €/mes";

    depreciationTotal.textContent = "0,00 €";
    depreciationAnnual.textContent = "0,00 €/año";

    fuelAnnual.textContent = "0,00 €";
    fuelMonthly.textContent = "0,00 €/mes";

    fixedAnnual.textContent = "0,00 €";
    fixedMonthly.textContent = "0,00 €/mes";

    insightText.textContent =
        "Introduce tus datos para descubrir dónde se concentra el coste de tu coche.";


    carAName.value = "";
    carBName.value = "";

    compareBPurchase.value = "";
    compareBResidual.value = "";
    compareBYears.value = "";
    compareBKm.value = "";
    compareBConsumption.value = "";
    compareBFuelPrice.value = "";
    compareBFixed.value = "";


    compareAMonthly.textContent = "0,00 €";
    compareAAnnual.textContent = "0,00 €";
    compareAKm.textContent = "0,00 €";

    compareBMonthly.textContent = "0,00 €";
    compareBAnnual.textContent = "0,00 €";
    compareBKm.textContent = "0,00 €";


    comparisonWinner.textContent =
        "Introduce los datos del coche B y pulsa comparar.";


    clearError();

    localStorage.removeItem(
        "carCostCalculator"
    );

}


/* =====================================================
   GUARDAR
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
   CARGAR
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


compareBtn.addEventListener(
    "click",
    compareCars
);


/* =====================================================
   ENTER
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            document.activeElement !== carAName &&
            document.activeElement !== carBName
        ) {

            event.preventDefault();

            calculateCosts();

        }

    }
);


/* =====================================================
   CARGAR AL ABRIR
===================================================== */

loadData();