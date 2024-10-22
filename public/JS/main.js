$(document).ready(() => {

    // Validación en tiempo real para permitir solo números y operadores
    $('#inputOperacion').on('input', (e) => {
        let valor = e.target.value;
        valor = valor.replace(/[^0-9+\-*/()]/g, ''); // Elimina letras y caracteres inválidos
        valor = valor.replace(/--/g, '-'); // No permite doble signo negativo
        e.target.value = valor;
    });

    const mostrarAlerta = (mensaje) => {
        $('#alertaError').text(mensaje).removeClass('d-none');
    };

    const ocultarAlerta = () => {
        $('#alertaError').addClass('d-none');
    };

    const validarOperacion = (operacion) => {
        // Verificar si hay números negativos
        if (/-[0-9]/.test(operacion)) {
            mostrarAlerta('No se permiten números negativos.');
            return false;
        }
        // Validar que solo se permiten números, operadores +, -, *, / y paréntesis
        const regex = /^[0-9+\-*/\s()]+$/;
        if (!regex.test(operacion)) {
            mostrarAlerta('Operación inválida. Solo se permiten números y operadores.');
            return false;
        }
        ocultarAlerta();
        return true;
    };

    const evaluarOperacion = (operacion) => {
        try {
            // Evaluar las operaciones por partes
            const partes = operacion.split('+');
            const resultadoParcial = partes.map(parte => eval(parte.trim())).reduce((acc, num) => acc + num, 0);
            return resultadoParcial;
        } catch (error) {
            mostrarAlerta('Error en la operación.');
            return null;
        }
    };

    const mostrarResultado = (mensaje) => {
        $('#resultado').text(mensaje);
    };

    $('#btnCalcular').on('click', () => {
        const operacion = $('#inputOperacion').val();
        if (validarOperacion(operacion)) {
            const resultado = evaluarOperacion(operacion);
            if (resultado !== null) {
                mostrarResultado(`Resultado: ${resultado}`);
            }
        }
    });
});
