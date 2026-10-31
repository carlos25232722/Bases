import test from "node:test";
import assert from "node:assert/strict";
import { capturarDatosSalariales } from "./input-handler.js";
import { sanitizarDatosSalariales } from "../features/salary/adapter.js";
import { generarLiquidacionMensual } from "../features/salary/service.js";

test("captura los datos del periodo sin solicitar resúmenes semanales", () => {
	const respuestas = ["8", "10000", "30", "2", "1"];
	const preguntas = [];
	const datosCrudos = capturarDatosSalariales((pregunta) => {
		preguntas.push(pregunta);
		return respuestas.shift();
	});
	const datos = sanitizarDatosSalariales(datosCrudos);
	const liquidacion = generarLiquidacionMensual(datos);

	assert.equal(respuestas.length, 0);
	assert.equal(preguntas.length, 5);
	assert.equal(datos.diasPeriodo, 30);
	assert.equal(liquidacion.descuentos.total, 240000);
	assert.equal(liquidacion.totalPagar, 2160000);
});
