import promptSync from "prompt-sync";

const prompt = promptSync();

export function preguntar(pregunta) {
	return prompt(pregunta);
}

export function capturarDatosSalariales(preguntarUsuario = preguntar) {
	if (preguntarUsuario === preguntar && !process.stdin.isTTY) {
		throw new Error("La captura de la liquidación requiere una terminal interactiva.");
	}

	const horasPorDia = preguntarUsuario("Horas trabajadas por día: ");
	const valorHora = preguntarUsuario("Valor monetario de la hora: ");
	const diasPeriodo = preguntarUsuario("Días del mes o periodo (28 a 31): ");
	const diasInasistencia = preguntarUsuario("Días faltados: ");
	const festivos = preguntarUsuario("Días festivos: ");

	return { horasPorDia, valorHora, diasPeriodo, diasInasistencia, festivos };
}
