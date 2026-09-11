function calculate() {
    const price = parseFloat(document.getElementById('price').value) || 0;
    const km = parseFloat(document.getElementById('km').value) || 0;
    const consumption = parseFloat(document.getElementById('consumption').value) || 0;
    const fuelPrice = parseFloat(document.getElementById('fuelPrice').value) || 0;
    const insurance = parseFloat(document.getElementById('insurance').value) || 0;
    const maintenance = parseFloat(document.getElementById('maintenance').value) || 0;
    const other = parseFloat(document.getElementById('other').value) || 0;

    if (km <= 0) {
        alert("Por favor, introduce una cantidad válida de kilómetros al año.");
        return;
    }

    // Cálculos principales
    const annualFuelCost = (km / 100) * consumption * fuelPrice;
    const totalAnnualCost = annualFuelCost + insurance + maintenance + other;
    const totalMonthlyCost = totalAnnualCost / 12;
    const costPerKm = totalAnnualCost / km;

    // Mostrar resultados formateados
    document.getElementById('fuelCostYear').textContent = annualFuelCost.toFixed(2) + ' €';
    document.getElementById('monthlyCost').textContent = totalMonthlyCost.toFixed(2) + ' €';
    document.getElementById('annualCost').textContent = totalAnnualCost.toFixed(2) + ' €';
    document.getElementById('costPerKm').textContent = costPerKm.toFixed(2) + ' €/km';

    // Hacer visible el bloque de resultados
    document.getElementById('results').classList.remove('hidden');
}
