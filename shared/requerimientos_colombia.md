# Requerimientos del cálculo mensual

## Referencia legal

* La Ley 2101 de 2021 establece una jornada máxima ordinaria de 42 horas semanales.
* El artículo 22 de la Ley 50 de 1990 limita las horas extra a 2 diarias y 12 semanales.
* El marco indicado en los requisitos establece un tope de 10 horas laboradas al día. El límite de 12 horas que valida esta aplicación es una solicitud operativa y no una autorización legal para exceder ese tope.
* La jornada nocturna indicada en los requisitos es de 9:00 p. m. a 6:00 a. m., con recargo del 35 %.

## Datos solicitados

El programa solicita las horas trabajadas por día, el valor de la hora, los días del mes o periodo (28 a 31), los días faltados y los días festivos. No pide registros ni resúmenes por semana.

El adaptador valida que las horas por día no superen 12, que los días del periodo sean enteros y que los días faltados y festivos sean cantidades enteras no negativas cuya suma no supere los días del periodo.

## Cálculo

El pago diario se calcula como horas trabajadas por día multiplicadas por el valor de la hora. El total bruto es el pago diario multiplicado por los días del periodo.

Por solicitud del usuario, tanto los días faltados como los días festivos reportados se descuentan al valor del pago diario:

$$\text{Descuento Total} = (\text{Días Faltados} + \text{Días Festivos}) \times \text{Pago Diario}$$

El resumen muestra ambas cantidades y sus descuentos por separado. El descuento de festivos sigue esta regla operativa solicitada y no determina por sí solo si un festivo era legalmente remunerado.

## Alcance no calculado

Como el programa ya no solicita información semanal ni las horas correspondientes a cada tipo de jornada, no puede validar límites semanales, calcular recargos nocturnos ni determinar dominicales descontados. Esos cálculos requieren datos adicionales que no forman parte de esta captura simplificada.
