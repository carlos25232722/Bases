import test from "node:test";
import assert from "node:assert/strict";
import { sanitizarDatosSalariales } from "./adapter.js";
import { generarLiquidacionMensual } from "./service.js";

function crearDatosCrudos() {
	return {
		horasPorDia: "8",
		valorHora: "10000",
		diasPeriodo: "30",
		diasInasistencia: "2",
		festivos: "1"
	};
}

test("calcula total y descuenta días faltados y festivos", () => {
	const datos = sanitizarDatosSalariales(crearDatosCrudos());
	const liquidacion = generarLiquidacionMensual(datos);

	assert.equal(liquidacion.granTotal, 2400000);
	assert.equal(liquidacion.descuentos.descuentoFaltas, 160000);
	assert.equal(liquidacion.descuentos.descuentoFestivos, 80000);
	assert.equal(liquidacion.descuentos.total, 240000);
	assert.equal(liquidacion.totalPagar, 2160000);
});

test("acepta periodos de 28 a 31 días", () => {
	for (const diasPeriodo of ["28", "29", "30", "31"]) {
		const datos = crearDatosCrudos();
		datos.diasPeriodo = diasPeriodo;
		assert.doesNotThrow(() => sanitizarDatosSalariales(datos));
	}
});

test("rechaza horas diarias superiores a 12 y días del periodo inválidos", () => {
	const horasExcedidas = crearDatosCrudos();
	horasExcedidas.horasPorDia = "12.1";
	assert.throws(() => sanitizarDatosSalariales(horasExcedidas), /no pueden superar 12/);

	for (const diasPeriodo of ["27", "32", "30.5", ""]) {
		const datos = crearDatosCrudos();
		datos.diasPeriodo = diasPeriodo;
		assert.throws(() => sanitizarDatosSalariales(datos), /días del mes o periodo/);
	}
});

test("rechaza faltas o festivos no enteros y sumas superiores al periodo", () => {
	for (const campo of ["diasInasistencia", "festivos"]) {
		for (const valor of ["-1", "1.5", "31", ""]) {
			const datos = crearDatosCrudos();
			datos[campo] = valor;
			assert.throws(() => sanitizarDatosSalariales(datos));
		}
	}

	const diasExcedidos = crearDatosCrudos();
	diasExcedidos.diasInasistencia = "20";
	diasExcedidos.festivos = "11";
	assert.throws(() => sanitizarDatosSalariales(diasExcedidos), /no puede superar los días del periodo/);
});
