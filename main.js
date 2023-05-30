

// Función para calcular los intereses
    function calcularIntereses(credito, tasaInteres) {
        return credito * tasaInteres;
      }
  
      // Función para calcular el valor de la cuota mensual
      function calcularCuotaMensual(credito, plazo, tasaInteres) {
        const intereses = calcularIntereses(credito, tasaInteres);
        const montoTotal = credito + intereses;
        const cuotaMensual = montoTotal / plazo;
        return cuotaMensual.toFixed(2);
      }
  
      // Función para simular el crédito
      function simularCredito() {
        const nombre = document.getElementById("nombre").value;
        const credito = parseFloat(document.getElementById("credito").value);
        const plazo = parseInt(document.getElementById("plazo").value);
  
        let tasaInteres = 0.20;
  
        if (plazo >= 18) {
          tasaInteres = 0.15;
        }
  
        const cuotaMensual = calcularCuotaMensual(credito, plazo, tasaInteres);
  
        // Mostrar el resultado en la página
        const resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML = `
          <h2>Resultado de la simulación</h2>
          <p>Nombre: ${nombre}</p>
          <p>Monto del crédito: ${credito}</p>
          <p>Plazo en meses: ${plazo}</p>
          <p>Tasa de interés: ${(tasaInteres * 100).toFixed(2)}%</p>
          <p>Cuota mensual: ${cuotaMensual}</p>
        `;
  
        // Crear objeto de simulación
        const simulacion = {
          nombre: nombre,
          credito: credito,
          plazo: plazo,
          tasaInteres: tasaInteres,
          cuotaMensual: cuotaMensual
        };
  
        // Obtener simulaciones existentes
        const simulaciones = obtenerSimulaciones();
  
        // Agregar la nueva simulación al array de simulaciones
        simulaciones.push(simulacion);
  
        // Guardar simulaciones actualizadas en el almacenamiento local
        guardarSimulaciones(simulaciones);
  
        // Mostrar simulaciones guardadas
        mostrarSimulaciones();
      }
  
      // Evento de click en el botón de simulación
      const simularButton = document.getElementById("simular");
      simularButton.addEventListener("click", simularCredito);

       
  
      // Mostrar simulaciones guardadas al cargar la página
      mostrarSimulaciones();
    


    // Función para guardar simulaciones en el almacenamiento local
    function guardarSimulaciones(simulaciones) {
      localStorage.setItem("simulaciones", JSON.stringify(simulaciones));
    }

    // Función para obtener simulaciones desde el almacenamiento local
    function obtenerSimulaciones() {
      const simulaciones = localStorage.getItem("simulaciones");
      if (simulaciones) {
        return JSON.parse(simulaciones);
      }
      return [];
    }

    // Función para mostrar simulaciones guardadas
    function mostrarSimulaciones() {
      const simulacionesDiv = document.getElementById("simulaciones");
      simulacionesDiv.innerHTML = "";

      const simulaciones = obtenerSimulaciones();

      simulaciones.forEach(function(simulacion, index) {
        const simulacionDiv = document.createElement("div");
        simulacionDiv.classList.add("simulacion");

        const contenidoSimulacion = `
          <h2>Simulación ${index + 1}</h2>
          <p>Nombre: ${simulacion.nombre}</p>
          <p>Monto del crédito: ${simulacion.credito}</p>
          <p>Plazo en meses: ${simulacion.plazo}</p>
          <p>Tasa de interés: ${(simulacion.tasaInteres * 100).toFixed(2)}%</p>
          <p>Cuota mensual: ${simulacion.cuotaMensual}</p>
        `;

        simulacionDiv.innerHTML = contenidoSimulacion;
        simulacionesDiv.appendChild(simulacionDiv);
      });
    }


