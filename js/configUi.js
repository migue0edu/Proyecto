function setAcciones() {
    let acciones = document.querySelector('#accion');
    let option;
    let actions = ['Suma','Resta','Multiplicacion','Multiplicacion(Escalar)','Reflejo',
                    'Desplazamiento','Diezmacion','Interpolacion','Convolucion'];
    for (let i = 0; i < actions.length; i++) {
        option = document.createElement('option');
        option.text = actions[i];
        option.value = actions[i];
        acciones.add(option);
    }
}

function setTiposInterpolacion() {
    let tipos = document.querySelector('#tipoI');
    let option;
    let types = ['Cero', 'Escalón', 'Lineal'];
    for(let i=0; i<types.length;i++){
        option = document.createElement('option');
        option.text = types[i];
        option.value = types[i];
        tipos.add(option);
    }
    document.querySelector('#tipoInterpolacion').style.display = 'none'
}

function actualizarUI(){
    let accion = document.querySelector('#accion').value;
    if(document.querySelector('#serieY').style.display === 'none'){
        document.querySelector('#serieY').style.display = 'initial'
    }
    if (accion === 'Suma' || accion === 'Resta' || accion === 'Multiplicacion' || accion === 'Convolucion' ){
        document.querySelector('#tipoInterpolacion').style.display = 'none';
        document.querySelector('#serieY').style.visibility = 'visible';
        document.querySelector('#parametro').disabled = true;
    }
    if(accion === 'Multiplicacion(Escalar)' || accion === 'Reflejo' || accion === 'Desplazamiento' || accion === 'Diezmacion' ){
        document.querySelector('#tipoInterpolacion').style.display = 'none';
        document.querySelector('#serieY').style.visibility = 'hidden';
        document.querySelector('#parametro').disabled = false;
    }
    if(accion === 'Interpolacion'){
        document.querySelector('#serieY').style.display = 'none';
        document.querySelector('#tipoInterpolacion').style.display = 'initial';
    }
}

function cambiarGrafica(grafica) {
    if(grafica === 'res'){
        document.querySelector('#tabres').style.display ='initial';
        document.querySelector('#tabx').style.display ='none';
        document.querySelector('#tabh').style.display ='none';
    }
    if(grafica === 'x'){
        document.querySelector('#tabres').style.display ='none';
        document.querySelector('#tabx').style.display ='initial';
        document.querySelector('#tabh').style.display ='none';
    }
    if(grafica === 'h'){
        document.querySelector('#tabres').style.display ='none';
        document.querySelector('#tabx').style.display ='none';
        document.querySelector('#tabh').style.display ='initial';
    }
}

setAcciones();
setTiposInterpolacion();