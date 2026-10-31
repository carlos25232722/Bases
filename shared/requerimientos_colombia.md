# Análisis de Mejoras a las Actividades

Este documento detalla los requerimientos de negocio y normativos colombianos para el ajuste del módulo de liquidación y registro de horas trabajadas.

---

## 1. Horas de Trabajo al Día (Limitantes, etc.)

### Marco Legal
* **Jornada Máxima Ordinaria:** Según la Ley 2101 de 2021, la jornada máxima semanal en Colombia es de **42 horas**.
* **Límite de Horas Extra:** El artículo 22 de la Ley 50 de 1990 establece que las horas extra no pueden superar **2 horas diarias** ni **12 horas semanales**.
* **Tope Absoluto Diario:** Un trabajador no puede laborar más de **10 horas al día** (jornada ordinaria + máximo 2 horas extra).

### Requerimientos de Validación
* **Límite de Ingreso Diario:** El sistema debe limitar el ingreso de horas diarias a un máximo absoluto de **10 horas por día**.
* **Restricción de Horas Extra:** Bloquear el registro si las horas extraordinarias exceden **2 horas diarias**.
* **Clasificación de Recargos:**
  * **Jornada Diurna:** 6:00 a.m. a 9:00 p.m.
  * **Jornada Nocturna:** 9:00 p.m. a 6:00 a.m. (recargo nocturno del 35%).
* **Control de Interfaz:** Restringir el campo de entrada para evitar números negativos o valores superiores a 10.

---

## 2. Calendario, Días Trabajados (Clasificación por Semana, Días Faltados en cada Semana)

### Marco Operativo
* **Base Menstrual de Nómina:** En Colombia, el mes laboral se liquida comercialmente sobre **30 días**.

### Requerimientos de Calendario y Ausencias
* **Agrupación Semanal:** Mapear el calendario agrupando los días en semanas laborales para validar límites y asistencias.
* **Métrica de Horas Semanales:** Acumular las horas trabajadas en la semana para garantizar que no excedan las **42 horas ordinarias** semanales ni las **12 horas extra** permitidas.
* **Clasificación de Días por Semana:**
  * **Día Trabajado:** Registro de jornada completa o parcial autorizada dentro de la semana.
  * **Día Faltado:** Ausencia injustificada en un día hábil pactado de la semana.
  * **Permiso / Licencia / Incapacidad:** Novedad justificada que no cuenta como día faltado.

---

## 3. Análisis de Dominicales Descontados

### Marco Legal (CST Artículos 172 y 173)
* **Descanso Remunerado:** El trabajador tiene derecho al pago del descanso dominical si cumple con la totalidad de los días hábiles obligatorios de la semana.
* **Perdida del Dominical:** Si el trabajador falta **1 día de la semana sin justa causa**, pierde el derecho al pago del día faltado y también pierde el derecho a la remuneración del **día de descanso dominical** de esa semana.

### Requerimientos de Liquidación
* **Detección Automática de Ausencias:** Evaluar semana a semana los días faltados. Si en la semana hay al menos **1 día faltado** sin justificación:
  1. Se descuenta el valor del día ordinario no trabajado.
  2. Se descuenta adicionalmente el valor del **dominical remunerado** de esa misma semana.
* **Fórmula de Descuento:**
  $$\text{Valor Día} = \frac{\text{Salario Básico}}{30}$$
  $$\text{Descuento Total por Inasistencia} = (\text{Días Faltados en la Semana} \times \text{Valor Día}) + (\text{Dominicales Descontados de la Semana} \times \text{Valor Día})$$
* **Desglose en Resumen:** La aplicación debe reflejar explícitamente en el desprendible/resumen la cantidad de días ordinarios descontados y los dominicales descontados correspondientes a cada semana.