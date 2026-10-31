import { preguntar } from "./core/input-handler.js";
import { sanitizarDatosSalariales } from "./features/salary/adapter.js";
import { generarLiquidacionMensual } from "./features/salary/service.js";
import { mostrarError, mostrarResultados } from "./shared/presentation.js";

export function iniciarAplicacion() {
	try {
		const horasPorDia = preguntar("Horas trabajadas por dia: ");
		const valorHora = preguntar("Valor monetario de la hora: ");
		const diasPeriodo = preguntar("Dias totales del periodo: ");
		const diasInasistencia = preguntar("Dias de inasistencia: ");

		const datosSalariales = sanitizarDatosSalariales(
			horasPorDia,
			valorHora,
			diasPeriodo,
			diasInasistencia,
		);
		const liquidacion = generarLiquidacionMensual(datosSalariales);

		mostrarResultados(liquidacion);
	} catch (error) {
		mostrarError(error);
	}
}

iniciarAplicacion();

