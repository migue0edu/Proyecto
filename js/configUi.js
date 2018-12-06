function setAcciones() {
    let acciones = document.querySelector('#accion');
    let option;
    let actions = ['Suma','Multiplicacion','Reflejo','Dezplazamiento','Diezmacion','Interpolacion','Convolucion'];
    for (let i = 0; i < actions.length; i++) {
        option = document.createElement('option');
        option.text = actions[i];
        option.value = actions[i];
        acciones.add(option);
    }
}

setAcciones();