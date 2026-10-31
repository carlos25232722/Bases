export function esNumero(valor) {
	return typeof valor === "number" && Number.isFinite(valor);
}

export function esPositivo(valor) {
	return esNumero(valor) && valor >= 0;
}
