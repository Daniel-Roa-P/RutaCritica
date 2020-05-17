// Almacenar cuantas veces se ha presionado el boton de enviar.
var btEnviarTimes = 0;

// Diccionario que relaciona el numero de actividad con su nombre
var map = new Map();
map.set('1', 'A');
map.set('2', 'B');
map.set('3', 'C');
map.set('4', 'D');
map.set('5', 'E');
map.set('6', 'F');
map.set('7', 'G');
map.set('8', 'H');

// Función que genera la tabla para la introducción de datos
function generar_tabla() {

    btEnviarTimes += 1;

    // Evitar que el usuario presione el botón 'enviar' varias veces
    if (btEnviarTimes > 1) {
        // No hacer nada
    } else {
        // Mostrar por consola en numero de actividades y guardar el mismo en una variable local
        console.log("Numero de actividades: " + document.getElementById("texto").value);
        actividades = document.getElementById("texto").value;

        // Por el header de la tabla se le debe sumar una unidad al valor anterior
        actividades = parseInt(actividades) + 1;

        // Obtener la referencia del elemento body
        var body = document.getElementsByTagName("body")[0];

        // Crea un elemento <table> y un elemento <tbody>
        var tabla = document.createElement("table");
        var tblBody = document.createElement("tbody");

        // Crea las celdas
        for (var i = 0; i < actividades; i++) {
            // Crea las hileras de la tabla
            var hilera = document.createElement("tr");

            // Crear el header de la tabla
            if (i == 0) {
                var celda = document.createElement("th");
                var textoCelda = document.createTextNode("Numero de Actividad");
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);

                var celda = document.createElement("th");
                var textoCelda = document.createTextNode("Nombre de Actividad");
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);

                var celda = document.createElement("th");
                var textoCelda = document.createTextNode("Duracion (Semanas)");
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);

                var celda = document.createElement("th");
                var textoCelda = document.createTextNode("Numero de Predecesores (ej. C,B)");
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);

            } else {
                for (var j = 0; j < 4; j++) {
                    // Crea un elemento <td> y un nodo de texto, haz que el nodo de
                    // texto sea el contenido de <td>, ubica el elemento <td> al final
                    // de la hilera de la tabla
                    var celda = document.createElement("td");

                    // Numerar las actividades (j=0), nombrar las actividades (j=1) y crear los campos de texto 
                    if (j == 0) {
                        var textoCelda = document.createTextNode(i);
                        celda.appendChild(textoCelda);

                    } else if (j == 1) {
                        var textoCelda = document.createTextNode(map.get(i.toString()));
                        celda.appendChild(textoCelda);

                    } else {
                        var tfCelda = document.createElement("input");

                        if (j == 2) {
                            tfCelda.setAttribute("type", "number");
                            tfCelda.setAttribute("min", "0");
                        }

                        tfCelda.setAttribute("id", i.toString() + j.toString());
                        celda.appendChild(tfCelda);
                    }
                    hilera.appendChild(celda);
                }
            }

            // agrega la hilera al final de la tabla (al final del elemento tblbody)
            tblBody.appendChild(hilera);
        }

        // posiciona el <tbody> debajo del elemento <table>
        tabla.appendChild(tblBody);
        // appends <table> into <body>
        body.appendChild(tabla);
        // modifica el atributo "border" de la tabla y lo fija a "2";
        tabla.setAttribute("border", "2");
        tabla.setAttribute("id", "tablaInicial");

        // Crear un botón para enviar los datos consignados en la tabla.
        var btCalcular = document.createElement("button");
        btCalcular.type = 'button';
        btCalcular.innerText = 'Enviar tabla ...';
        btCalcular.setAttribute("onclick", "enviarTabla()");
        document.body.appendChild(btCalcular);
    }
}

// Función que envia los datos de la tabla.
function enviarTabla() {
    // Recuperar de nuevo el numero de actividades
    actividades = document.getElementById("texto").value;
    actividades = parseInt(actividades);

    // Inicializar una variable donde se guardará todos los datos de la tabla
    var datosTablaInicial = [];

    //Guardar los datos de la tabla
    for (var i = 1; i <= actividades; i++) {
        datosTablaInicial.push(i);
        datosTablaInicial.push(map.get(i.toString()));

        for (var j = 2; j < 4; j++) {
            console.log(i.toString() + "," + j.toString());
            datosTablaInicial.push(document.getElementById(i.toString() + j.toString()).value);
            console.log(datosTablaInicial);
        }
    }
}