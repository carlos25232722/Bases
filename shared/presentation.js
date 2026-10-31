export function mostrarResultados(resultados) {
	console.log("Resumen de liquidación mensual:");
	console.log("Gran total:", resultados.granTotal);
	console.log("Descuentos:", resultados.descuentos.total);
	console.log("Días faltados:", resultados.descuentos.diasFaltados);
	console.log("Descuento por faltas:", resultados.descuentos.descuentoFaltas);
	console.log("Días festivos descontados:", resultados.descuentos.festivos);
	console.log("Descuento por festivos:", resultados.descuentos.descuentoFestivos);
	console.log("Total a pagar:", resultados.totalPagar);
}

export function mostrarError(error) {
	console.error("Error:", error.message);
}
