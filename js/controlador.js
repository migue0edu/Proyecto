let funciones = require('./js/funciones');
let grafica = require('./js/graficar.js');

function ejecutar() {
    let accion = document.querySelector('#accion').value;
    let data ;
    if(accion === 'Suma' || accion === 'Resta' || accion === 'Multiplicacion' ){
        data = funciones.operacionBasica();
    }
    else{
        switch (accion) {
            case 'Multiplicacion(Escalar)':
                data = funciones.multiplicarEscalar();
                break;

            case 'Reflejo':
                data = funciones.reflejar();
                break;

            case 'Desplazamiento':
                 data = funciones.desplazar();
                break;

            case 'Diezmacion':
                data = funciones.diezmar();
                break;

            case 'Interpolacion':
                data = funciones.interpolar();
                break;

            case 'Convolucion':
                data = funciones.convolucionar();
                break;
        }

    }
    console.log(data);
    grafica.graficar(data, accion);
}