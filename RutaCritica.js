class Nodo {
  
    constructor(duracion, predecesores){

        this.duracion = duracion;
        this.predecesores = predecesores;
        this.inicioCercano = 0;
        this.inicioLejano = 0;
        this.finalCercano = 0;
        this.finalLejano = 0;

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

    getDuracion(){

        return this.duracion;

    }

    getPredesesores(){

        return this.predecesores;

    }

}

function imprimir(){

    const a = new Nodo(100, null);
    const nodo = new Nodo(100, a);

    console.log(nodo.getDuracion());
    
    nodo.setInicioCercano(40);
    nodo.setInicioLejano(50);
    nodo.setFinalCercano(60);
    nodo.setFinalLejano(70);

    console.log(nodo.getInicioCercano());
    console.log(nodo.getInicioLejano());
    console.log(nodo.getFinalCercano());
    console.log(nodo.getFinalLejano());
    console.log(nodo.getPredesesores());

}
