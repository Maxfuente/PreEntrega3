// Función para calcular los intereses
function calcularIntereses(prestamo, tasaInteres) {
    return prestamo * tasaInteres;
  }

  // Función para calcular el valor de la cuota mensual
  function calcularCuotaMensual(prestamo, plazo, tasaInteres) {
    const intereses = calcularIntereses(prestamo, tasaInteres);
    const montoTotal = prestamo + intereses;
    const cuotaMensual = montoTotal / plazo;
    return cuotaMensual;
  }

  // Función para simular el crédito
  function simularCredito() {
    const nombre = document.getElementById("nombre").value;
    const prestamo = parseFloat(document.getElementById("prestamo").value);
    const plazo = parseInt(document.getElementById("plazo").value);

    let tasaInteres = 0.08;

    if (plazo >= 18) {
      tasaInteres = 0.12;
    }

    const cuotaMensual = calcularCuotaMensual(prestamo, plazo, tasaInteres);

    // Mostrar el resultado en la página
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
      <h2>Resultado de la simulación</h2>
      <p>Nombre: ${nombre}</p>
      <p>Monto del préstamo: ${prestamo}</p>
      <p>Plazo en meses: ${plazo}</p>
      <p>Tasa de interés: ${(tasaInteres * 100).toFixed(2)}%</p>
      <p>Cuota mensual: ${cuotaMensual.toFixed(2)}</p>
    `;

    // Crear objeto de simulación
    const simulacion = {
      nombre: nombre,
      prestamo: prestamo,
      plazo: plazo,
      tasaInteres: tasaInteres,
      cuotaMensual: cuotaMensual.toFixed(2)
    };

    // Guardar la simulación en el almacenamiento local
    guardarSimulacion(simulacion);
  }

  // Función para guardar la simulación en el almacenamiento local
  function guardarSimulacion(simulacion) {
    // Obtener las simulaciones existentes del almacenamiento local
    let simulaciones = JSON.parse(localStorage.getItem("simulaciones")) || [];

    // Agregar la nueva simulación al array de simulaciones
    simulaciones.push(simulacion);

    // Guardar las simulaciones actualizadas en el almacenamiento local
    localStorage.setItem("simulaciones", JSON.stringify(simulaciones));
  }

  // Obtener y mostrar las simulaciones guardadas
  function mostrarSimulacionesGuardadas() {
    const simulacionesDiv = document.getElementById("simulaciones");

    // Obtener las simulaciones del almacenamiento local
    const simulaciones = JSON.parse(localStorage.getItem("simulaciones")) || [];

    // Mostrar cada simulación en el div de simulaciones
    simulacionesDiv.innerHTML = "";

    simulaciones.forEach(function(simulacion, index) {
      const simulacionDiv = document.createElement("div");
      simulacionDiv.innerHTML = `
        <h2>Simulación ${index + 1}</h2>
        <p>Nombre: ${simulacion.nombre}</p>
        <p>Monto del préstamo: ${simulacion.prestamo}</p>
        <p>Plazo en meses: ${simulacion.plazo}</p>
        <p>Tasa de interés: ${(simulacion.tasaInteres * 100).toFixed(2)}%</p>
        <p>Cuota mensual: ${simulacion.cuotaMensual}</p>
      `;

      simulacionesDiv.appendChild(simulacionDiv);
    });
  }

  // Agregar evento de click al botón de simulación
  const simularButton = document.getElementById("simular");
  simularButton.addEventListener("click", simularCredito);

  // Mostrar simulaciones guardadas al cargar la página
  mostrarSimulacionesGuardadas();