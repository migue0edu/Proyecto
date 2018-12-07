let funciones = require('./js/funciones');

function ejecutar() {
    let accion = document.querySelector('#accion').value;
    if(accion === 'Suma' || accion === 'Resta' || accion === 'Multiplicacion' ){
        funciones.operacionBasica();
    }
    else{
        switch (accion) {
            case 'Multiplicacion(Escalar)':
                funciones.multiplicarEscalar();
                break;

            case 'Reflejo':
                funciones.reflejar();
                break;

            case 'Desplazamiento':
                funciones.desplazar();
                break;

            case 'Diezmacion':
                funciones.diezmar();
                break;

            case 'Interpolacion':
                funciones.interpolar();
                break;

            case 'Convolucion':
                funciones.convolucionar();
                break;
        }
    }

}