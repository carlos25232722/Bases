import { multiplicar, restar, sumar } from "../../shared/utils/calculator.js";

export function generarLiquidacionMensual(datos) {
	const pagoDiario = multiplicar(datos.horasPorDia, datos.valorHora);
	const granTotal = multiplicar(pagoDiario, datos.diasPeriodo);
	const diasDescontados = sumar(datos.diasInasistencia, datos.festivos);
	const descuentoFaltas = multiplicar(pagoDiario, datos.diasInasistencia);
	const descuentoFestivos = multiplicar(pagoDiario, datos.festivos);
	const totalDescuentos = multiplicar(pagoDiario, diasDescontados);

	return {
		granTotal,
		descuentos: {
			diasFaltados: datos.diasInasistencia,
			festivos: datos.festivos,
			descuentoFaltas,
			descuentoFestivos,
			total: totalDescuentos
		},
		totalPagar: restar(granTotal, totalDescuentos)
	};
}
