export function sumar(a, b) {
	return a + b;
}

export function restar(a, b) {
	return a - b;
}

export function multiplicar(a, b) {
	return a * b;
}

export function dividir(a, b) {
	if (b === 0) {
		throw new Error("No se puede dividir entre cero.");
	}

	return a / b;
}

export function calcularPromedio(valores) {
	if (valores.length === 0) {
		throw new Error("No se puede calcular el promedio de una lista vacía.");
	}

	const suma = valores.reduce((total, valor) => sumar(total, valor), 0);
	return dividir(suma, valores.length);
}
