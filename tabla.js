var map = new Map();
map.set("1", "A");
map.set("2", "B");
map.set("3", "C");
map.set("4", "D");
map.set("5", "E");
map.set("6", "F");
map.set("7", "G");
map.set("8", "H");

function generar_tabla() {
  console.log(
    "Numero de actividades: " + document.getElementById("texto").value
  );
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
      var textoCelda = document.createTextNode(
        "Numero de Predecesores (ej. C,B)"
      );
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

  var btCalcular = document.createElement("button");
  btCalcular.type = "button";
  btCalcular.innerText = "Enviar tabla ...";
  btCalcular.setAttribute("onclick", "enviarTabla()");
  document.body.appendChild(btCalcular);
}

class Nodo {
  constructor(id) {
    this.id = id;
    this.duracion = 0;
    this.predecesores = "";
    this.nodosPadre = [];
    this.nodosHijos = [];
    this.inicioCercano = 0;
    this.inicioLejano = 0;
    this.finalCercano = 0;
    this.finalLejano = 0;
    this.color = "";
  }

  getId() {
    return this.id;
  }

  setNodosHijo(lista) {
    this.nodosHijos = lista;
  }

  getNodosHijo() {
    return this.nodosHijos;
  }

  setNodosPadre(lista) {
    this.nodosPadre = lista;
  }

  getNodosPadre(lista) {
    return this.nodosPadre;
  }

  setInicioCercano(n) {
    this.inicioCercano = n;
  }

  getInicioCercano() {
    return this.inicioCercano;
  }

  setInicioLejano(n) {
    this.inicioLejano = n;
  }

  getInicioLejano() {
    return this.inicioLejano;
  }

  setFinalCercano(n) {
    this.finalCercano = n;
  }

  getFinalCercano() {
    return this.finalCercano;
  }

  setFinalLejano(n) {
    this.finalLejano = n;
  }

  getFinalLejano() {
    return this.finalLejano;
  }

  setDuracion(n) {
    this.duracion = n;
  }

  getDuracion() {
    return this.duracion;
  }

  setPredecesores(texto) {
    this.predecesores = texto;
  }

  getPredecesores() {
    return this.predecesores;
  }
}

function enviarTabla() {
  var nodos = [];

  nodos.push(new Nodo(""));

  actividades = document.getElementById("texto").value;
  actividades = parseInt(actividades);
  var datosTablaInicial = [];
  for (var i = 1; i <= actividades; i++) {
    datosTablaInicial.push(i);
    datosTablaInicial.push(map.get(i.toString()));

    var nodo = new Nodo(map.get(i.toString()));

    for (var j = 2; j < 4; j++) {
      console.log(i.toString() + "," + j.toString());
      datosTablaInicial.push(
        document.getElementById(i.toString() + j.toString()).value
      );
      console.log(datosTablaInicial);

      if (j == 2) {
        nodo.setDuracion(
          document.getElementById(i.toString() + j.toString()).value
        );
      } else if (j == 3) {
        nodo.setPredecesores(
          document.getElementById(i.toString() + j.toString()).value
        );
      }
    }

    nodos.push(nodo);
  }

  var i = 1;

  while (i < nodos.length) {
    tempNodo = nodos[i];
    padres = [];
    var letra = tempNodo.getPredecesores();
    var tamaño = letra.length;
    var l = 0;

    while (letra[l] != "" && l < tamaño) {
      if (letra[l] != ",") {
        for (var j = 0; j < nodos.length; j++) {
          tempPadre = nodos[j];

          if (tempPadre.getId() == letra[l]) {
            tempNodo.getNodosPadre().push(tempPadre);
            tempPadre.getNodosHijo().push(tempNodo);
          }
        }
      }

      l = l + 2;
    }

    console.log(letra);

    if (letra == "") {
      nodos[0].getNodosHijo().push(tempNodo);
    }

    i++;
  }

  console.log(nodos);

  crearGrafico(nodos);

  calcularHolgura(nodos);
}

function calcularHolgura(nodo) {
  var arrayNodos = [];
  nodo.map((n) => {
    var obj = {
      id: n.id,
      nodosPadre: n.nodosPadre.map((p) => p.id).join(),
      inicioTemprano: n.inicioCercano,
      inicioTardio: n.inicioLejano,
    };
    arrayNodos.push(obj);
  });

  //valor HIJOS inicial

  var hijosA = arrayNodos.filter((a) => a.nodosPadre.includes("A"));
  var sumaA = hijosA.map((s, i) => {
    var objSuma = {
      suma: i + 1,
      id: s.id,
    };
    //  if(s.inicioTardio !== 0) {
    //     objSuma.suma = s.inicioTardio - s.inicioTemprano
    //  }
    return objSuma;
  });

  var valor = [];
  var objs;
  for (i = 0; i < sumaA.length; i++) {
    var hijoAIterar1 = asignarSuma(sumaA[i].id, arrayNodos);
    if (hijoAIterar1.length > 0) {
      for (j = 0; j < hijoAIterar1.length; j++) {
        var hijoAIterar2 = asignarSuma(hijoAIterar1[j].id, arrayNodos);
        if (hijoAIterar2.length > 0) {
          for (h = 0; h < hijoAIterar2.length; h++) {
            var hijoAIterar3 = asignarSuma(hijoAIterar2[h].id, arrayNodos);
            if (hijoAIterar3.length > 0) {
                for(k =0; k< hijoAIterar3.length; k++) {
                    var hijoAIterar4 = asignarSuma(hijoAIterar3[k].id,arrayNodos);
                    if (hijoAIterar4.length > 0) {

                    } else {
                        objs = {
                            numeroTotal: hijoAIterar1[j].suma + hijoAIterar2[h].suma + hijoAIterar3[k].suma + sumaA[i].suma,
                            ids: ["A", sumaA[i].id, hijoAIterar1[j].id, hijoAIterar2[h].id],
                          };
                          valor.push(objs);
                    }
                }
            } else {
                objs = {
                    numeroTotal: hijoAIterar1[j].suma + hijoAIterar2[h].suma + sumaA[i].suma,
                    ids: ["A", sumaA[i].id, hijoAIterar1[j].id],
                  };
                  valor.push(objs);
            }
          }
        } else {
          objs = {
            numeroTotal: hijoAIterar1[j].suma + sumaA[i].suma,
            ids: ["A", sumaA[i].id, hijoAIterar1[j].id],
          };
          valor.push(objs);
        }
      }
    } else {
        objs = {
            numeroTotal: sumaA[i].suma,
            ids: ["A", sumaA[i].id],
          };
        valor.push(objs);
    }
  }
  console.log(valor);

  console.log(arrayNodos);
}

function asignarSuma(letra, arrayNodos) {
  switch (letra) {
    case "B":
      var hijosB = arrayNodos.filter((a) => a.nodosPadre.includes("B"));
      var sumaB = hijosB.map((s) => {
        var objSuma = {
          suma: i+2,
          id: s.id,
        };
        // if (s.inicioTardio !== 0) {
        //   objSuma.suma = s.inicioTardio - s.inicioTemprano;
        // }
        return objSuma;
      });
      return sumaB;
      break;
    case "C":
      var hijosC = arrayNodos.filter((a) => a.nodosPadre.includes("C"));
      var sumaC = hijosC.map((s) => {
        var objSuma = {
          suma: 0,
          id: s.id,
        };
        // if (s.inicioTardio !== 0) {
        //   objSuma.suma = s.inicioTardio - s.inicioTemprano;
        // }
        return objSuma;
      });
      return sumaC;
      break;
    case "D":
      var hijosD = arrayNodos.filter((a) => a.nodosPadre.includes("D"));
      var sumaD = hijosD.map((s) => {
        var objSuma = {
          suma: 0,
          id: s.id,
        };
        // if (s.inicioTardio !== 0) {
        //   objSuma.suma = s.inicioTardio - s.inicioTemprano;
        // }
        return objSuma;
      });
      return sumaD;
      break;
    case "E":
      var hijosE = arrayNodos.filter((a) => a.nodosPadre.includes("E"));
      var sumaE = hijosE.map((s) => {
        var objSuma = {
          suma: 0,
          id: s.id,
        };
        // if (s.inicioTardio !== 0) {
        //   objSuma.suma = s.inicioTardio - s.inicioTemprano;
        // }
        return objSuma;
      });
      return sumaE;
      break;
    case "F":
      var hijosF = arrayNodos.filter((a) => a.nodosPadre.includes("F"));
      var sumaF = hijosF.map((s) => {
        var objSuma = {
          suma: 0,
          id: s.id,
        };
        // if (s.inicioTardio !== 0) {
        //   objSuma.suma = s.inicioTardio - s.inicioTemprano;
        // }
        return objSuma;
      });
      return sumaF;
      break;
    case "G":
      var hijosG = arrayNodos.filter((a) => a.nodosPadre.includes("G"));
      var sumaG = hijosG.map((s) => {
        var objSuma = {
          suma: 0,
          id: s.id,
        };
        // if (s.inicioTardio !== 0) {
        //   objSuma.suma = s.inicioTardio - s.inicioTemprano;
        // }
        return objSuma;
      });
      return sumaG;
      break;
  }
}

function crearGrafico(nodo) {
  let divGrafico = document.getElementById("grafico");
  for (i = 1; i < nodo.length; i++) {
    let divNodo = document.createElement("div");
    divNodo.setAttribute("id", "divNodo");
    let nodoActual = nodo[i];
    var color = "";
    switch (nodoActual.id) {
      case "A":
        color = "#E08E79";
        break;
      case "B":
        color = "#FC9D9A";
        break;
      case "C":
        color = "#F9CDAD";
        break;
      case "D":
        color = "#C8C8A9";
        break;
      case "E":
        color = "#83AF9B";
        break;
      case "F":
        color = "#FCEEB8";
        break;
      case "G":
        color = "#FC7BD5";
        break;
      case "H":
        color = "#C4EBFC";
        break;
    }
    divNodo.style.background = color;
    if (nodoActual.nodosPadre.length == 0) {
      let divInicio = document.createElement("div");
      let divDescripcion = document.createElement("div");
      let imagenRaiz = document.createElement("img");
      divInicio.setAttribute("id", "divInicio");
      divDescripcion.setAttribute("id", "divDescripcion");

      imagenRaiz.setAttribute("src", "./assets/inicio.png");

      divInicio.append(imagenRaiz);

      let titulo = document.createElement("span");
      titulo.innerText = nodoActual.id;
      divDescripcion.appendChild(titulo);

      let inicioCercano = document.createElement("span");
      inicioCercano.innerText = "Inicio cercano :" + nodoActual.inicioCercano;
      divDescripcion.appendChild(inicioCercano);

      let inicioTardio = document.createElement("span");
      inicioTardio.innerText = "Inicio tardio :" + nodoActual.inicioLejano;
      divDescripcion.appendChild(inicioTardio);

      let finalCercano = document.createElement("span");
      finalCercano.innerText = "Final cercano :" + nodoActual.finalCercano;
      divDescripcion.appendChild(finalCercano);

      let finalTardio = document.createElement("span");
      finalTardio.innerText = "Final tardio :" + nodoActual.finalLejano;
      divDescripcion.appendChild(finalTardio);

      divNodo.style.background = "none";
      divDescripcion.style.background = "#E08E79";
      divNodo.appendChild(divInicio);
      divNodo.appendChild(divDescripcion);
    } else {
      let divsPadre = document.createElement("div");
      divsPadre.setAttribute("id", "divsPadre");

      let divDescripcion = document.createElement("div");
      divDescripcion.setAttribute("id", "divDescripcion");

      let titulo = document.createElement("span");
      titulo.innerText = nodoActual.id;
      divDescripcion.appendChild(titulo);

      let inicioCercano = document.createElement("span");
      inicioCercano.innerText = "Inicio cercano :" + nodoActual.inicioCercano;
      divDescripcion.appendChild(inicioCercano);

      let inicioTardio = document.createElement("span");
      inicioTardio.innerText = "Inicio tardio :" + nodoActual.inicioLejano;
      divDescripcion.appendChild(inicioTardio);

      let finalCercano = document.createElement("span");
      finalCercano.innerText = "Final cercano :" + nodoActual.finalCercano;
      divDescripcion.appendChild(finalCercano);

      let finalTardio = document.createElement("span");
      finalTardio.innerText = "Final tardio :" + nodoActual.finalLejano;
      divDescripcion.appendChild(finalTardio);

      for (j = 0; j < nodoActual.nodosPadre.length; j++) {
        var color = "";
        switch (nodoActual.nodosPadre[j].id) {
          case "A":
            color = "#E08E79";
            break;
          case "B":
            color = "#FC9D9A";
            break;
          case "C":
            color = "#F9CDAD";
            break;
          case "D":
            color = "#C8C8A9";
            break;
          case "E":
            color = "#83AF9B";
            break;
          case "F":
            color = "#FCEEB8";
            break;
          case "G":
            color = "#FC7BD5";
            break;
          case "H":
            color = "#C4EBFC";
            break;
        }

        let divPadre = document.createElement("div");
        divPadre.setAttribute("id", "divPadre");
        let titulo = document.createElement("span");
        titulo.innerText = "Nodo padre " + nodoActual.nodosPadre[j].id;
        titulo.style.width = "100%";
        divPadre.appendChild(titulo);
        let inicioCercano = document.createElement("span");
        inicioCercano.innerText =
          "Inicio cercano " + nodoActual.nodosPadre[j].inicioCercano;
        divPadre.appendChild(inicioCercano);

        let inicioTardio = document.createElement("span");
        inicioTardio.innerText =
          "Inicio tardio " + nodoActual.nodosPadre[j].inicioLejano;
        divPadre.appendChild(inicioTardio);

        let finalCercano = document.createElement("span");
        finalCercano.innerText =
          "Final cercano " + nodoActual.nodosPadre[j].finalCercano;
        divPadre.appendChild(finalCercano);

        let finalTardio = document.createElement("span");
        finalTardio.innerText =
          "Final tardio " + nodoActual.nodosPadre[j].finalLejano;

        divPadre.style.background = color;
        divPadre.appendChild(finalTardio);

        divsPadre.appendChild(divPadre);
      }

      divNodo.append(divsPadre);
      divNodo.appendChild(divDescripcion);
    }

    divGrafico.append(divNodo);
  }
  let divFinal = document.createElement("div");
  let imagenFinal = document.createElement("img");
  divFinal.setAttribute("id", "divFinal");
  imagenFinal.setAttribute("src", "./assets/fin.png");

  divFinal.appendChild(imagenFinal);
  divGrafico.appendChild(divFinal);
}
