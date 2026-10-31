import { esNumero, esPositivo } from "../../shared/utils/validator.js";

export function sanitizarDatosSalariales(
  horasPorDiaTexto,
  valorHoraTexto,
  diasPeriodoTexto,
  diasInasistenciaTexto,
) {
  const datos = {
    horasPorDia: Number(horasPorDiaTexto.trim() || "NaN"),
    valorHora: Number(valorHoraTexto.trim() || "NaN"),
    diasPeriodo: Number(diasPeriodoTexto.trim() || "NaN"),
    diasInasistencia: Number(diasInasistenciaTexto.trim() || "NaN"),
  };

  for (const [campo, valor] of Object.entries(datos)) {
    if (!esNumero(valor)) {
      throw new Error(`El campo ${campo} debe ser numerico.`);
    }

    if (!esPositivo(valor)) {
      throw new Error(`El campo ${campo} debe ser mayor o igual a cero.`);
    }
  }

  return datos;
}