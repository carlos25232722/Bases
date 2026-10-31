import { esNumero, esPositivo } from "../../shared/utils/validator.js";
import { sumar } from "../../shared/utils/calculator.js";

const DIAS_MES_MINIMO = 28;
const DIAS_MES_MAXIMO = 31;
const MAX_HORAS_DIA = 12;

function convertirNumero(valor, campo) {
	if (typeof valor !== "string" || valor.trim() === "") {
		throw new Error(`El campo ${campo} debe contener un número.`);
	}

	const numero = Number(valor);

	if (!esNumero(numero) || !esPositivo(numero)) {
		throw new Error(`El campo ${campo} debe ser un número mayor o igual a cero.`);
	}

	return numero;
}

function convertirNumeroPositivo(valor, campo) {
	const numero = convertirNumero(valor, campo);

	if (numero === 0) {
		throw new Error(`El campo ${campo} debe ser mayor que cero.`);
	}

	return numero;
}

export function sanitizarDatosSalariales(datosCrudos) {
	const horasPorDia = convertirNumeroPositivo(datosCrudos.horasPorDia, "horas trabajadas por día");
	const valorHora = convertirNumeroPositivo(datosCrudos.valorHora, "valor de la hora");
	const diasPeriodo = convertirNumero(datosCrudos.diasPeriodo, "días del mes o periodo");
	const diasInasistencia = convertirNumero(datosCrudos.diasInasistencia, "días faltados");
	const festivos = convertirNumero(datosCrudos.festivos, "días festivos");

	if (horasPorDia > MAX_HORAS_DIA) {
		throw new Error(`Las horas trabajadas por día no pueden superar ${MAX_HORAS_DIA}.`);
	}

	if (!Number.isInteger(diasPeriodo) || diasPeriodo < DIAS_MES_MINIMO || diasPeriodo > DIAS_MES_MAXIMO) {
		throw new Error(`Los días del mes o periodo deben ser un número entero entre ${DIAS_MES_MINIMO} y ${DIAS_MES_MAXIMO}.`);
	}

	if (!Number.isInteger(diasInasistencia) || diasInasistencia > diasPeriodo) {
		throw new Error("Los días faltados deben ser un número entero entre 0 y los días del periodo.");
	}

	if (!Number.isInteger(festivos) || festivos > diasPeriodo) {
		throw new Error("Los días festivos deben ser un número entero entre 0 y los días del periodo.");
	}

	if (sumar(diasInasistencia, festivos) > diasPeriodo) {
		throw new Error("La suma de días faltados y festivos no puede superar los días del periodo.");
	}

	return { horasPorDia, valorHora, diasPeriodo, diasInasistencia, festivos };
}
