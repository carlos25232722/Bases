import { multiplicar, restar } from "../../shared/utils/calculator.js";

export function generarLiquidacionMensual(datos) {
  const pagoDiario = multiplicar(datos.horasPorDia, datos.valorHora);
  const granTotal = multiplicar(pagoDiario, datos.diasPeriodo);
  const descuentos = multiplicar(pagoDiario, datos.diasInasistencia);
  const totalPagar = restar(granTotal, descuentos);

  return { granTotal, descuentos, totalPagar };
}