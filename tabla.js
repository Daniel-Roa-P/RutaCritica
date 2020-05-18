var map = new Map();
    map.set('1', 'A');
    map.set('2', 'B');
    map.set('3', 'C');
    map.set('4', 'D');
    map.set('5', 'E');
    map.set('6', 'F');
    map.set('7', 'G');
    map.set('8', 'H');

function generar_tabla() {
    console.log("Numero de actividades: " + document.getElementById("texto").value);
    actividades = document.getElementById("texto").value;

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
                if (j == 0) {
                    var textoCelda = document.createTextNode(i);
                    //textoCelda.setAttribute("id",i.toString()+j.toString());
                    //celda.setAttribute("value",i);
                    celda.appendChild(textoCelda);

                } else if (j == 1) {
                    var textoCelda = document.createTextNode(map.get(i.toString()));
                    //textoCelda.setAttribute("id",i.toString()+j.toString());
                    celda.appendChild(textoCelda);
                    //celda.setAttribute("value",map.get(i.toString()));
                } else {
                    var tfCelda = document.createElement("input");

                    if (j == 2) {
                        
                        tfCelda.setAttribute("type", "number");
                    } 
                    tfCelda.setAttribute("id",i.toString()+j.toString());
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

    var btCalcular = document.createElement("button");
    btCalcular.type = 'button';
    btCalcular.innerText = 'Enviar tabla ...';
    btCalcular.setAttribute("onclick", "enviarTabla()");
    document.body.appendChild(btCalcular);

}

class Nodo {
  
    constructor(id){

        this.id = id;
        this.duracion = 0;
        this.predecesores = 0;
        this.nodosPadre = null;
        this.dependientes = 0;
        this.inicioCercano = 0;
        this.inicioLejano = 0;
        this.finalCercano = 0;
        this.finalLejano = 0;

    }
    
    getId(){

        return this.id;

    }

    setNodosPadre(lista){

        this.nodosPadre = lista;

    }

    getNodosPadre(lista){

        return this.nodosPadre;

    }

    setInicioCercano(n){

        this.inicioCercano = n;

    }

    getInicioCercano(){

        return this.inicioCercano;

    }

    setInicioLejano(n){

        this.inicioLejano = n;

    }

    getInicioLejano(){

        return this.inicioLejano;

    }

    setFinalCercano(n){

        this.finalCercano = n;

    }

    getFinalCercano(){

        return this.finalCercano;

    }

    setFinalLejano(n){

        this.finalLejano = n;

    }

    getFinalLejano(){

        return this.finalLejano;

    }

    setDuracion(n){

        this.duracion = n;

    }

    getDuracion(){

        return this.duracion;

    }

    setPredecesores(texto){

        this.predecesores = texto;

    }

    getPredecesores(){

        return this.predecesores;

    }

}

function enviarTabla(){

    var nodos = [];

    // nodos.push( new Nodo("") );

    actividades = document.getElementById("texto").value;
    actividades = parseInt(actividades);
    var datosTablaInicial = []; 
    for(var i = 1; i <= actividades; i++){

        datosTablaInicial.push(i);
        datosTablaInicial.push(map.get(i.toString()));

        var nodo = new Nodo(map.get(i.toString()));

        for (var j = 2; j < 4; j++){
            console.log(i.toString() + "," + j.toString());
            datosTablaInicial.push(document.getElementById(i.toString()+j.toString()).value);
            console.log(datosTablaInicial);

            if(j == 2){

                nodo.setDuracion(document.getElementById(i.toString()+j.toString()).value)

            } else if(j == 3) {

                nodo.setPredecesores(document.getElementById(i.toString()+j.toString()).value)

            }

        }

        nodos.push(nodo);

    }   

    var i = 0;

    while(i<nodos.length){

        tempNodo = nodos[i];
        padres = [];
        var letra = tempNodo.getPredecesores();
        console.log(letra);
        var tamaño = letra.length;
        var l = 0;

        while(letra[l] != "" && l < tamaño){   

            if(letra[l] != ","){

                for(var j = 0; j<nodos.length; j++){

                    tempPadre = nodos[j];
    
                    if(tempPadre.getId() == letra[l] ){
    
                        padres.push(tempPadre);
    
                    }
    
                }

            }

            l = l + 2;

        }
        
        tempNodo.setNodosPadre(padres);
        i++;

    }

    console.log(nodos);

    

}