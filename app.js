import { capturarDatosSalariales } from "./core/input-handler.js";
import { sanitizarDatosSalariales } from "./features/salary/adapter.js";
import { generarLiquidacionMensual } from "./features/salary/service.js";
import { mostrarError, mostrarResultados } from "./shared/presentation.js";

export function iniciarAplicacion() {
	try {
		const datosCrudos = capturarDatosSalariales();
		const datosSalariales = sanitizarDatosSalariales(datosCrudos);
		const liquidacion = generarLiquidacionMensual(datosSalariales);

		mostrarResultados(liquidacion);
	} catch (error) {
		mostrarError(error);
		process.exitCode = 1;
	}
}

iniciarAplicacion();
