let CanvasJS = require("./canvasjs-2.2/canvasjs.min");
let funciones = require('./funciones');

let graficar = (data, accion) => {
    let min = 0 - data.origen;
    let puntos = [];
    for (let i = 0; i < data.resultado.length; i++) {
        puntos.push({y: data.resultado[i], label: min.toString()})
        min++;
    }
    console.log(puntos);
    let ancho = 760;
    if(puntos.length<7){
        ancho = 300;
    }

    let chart = new CanvasJS.Chart("tabres", {
        animationEnabled: true,
        dataPointWidth: 15,
        theme: "dark1", // "light1", "light2", "dark1", "dark2"
        title:{
            text: "H(n)"
        },
        axisY: {
            title: ""
        },
        data: [{
            type: "line",
            showInLegend: true,
	    borderColor: "rgba(255, 99, 132, 0.2)",
            legendMarkerColor: "grey",
            legendText: "n",
            dataPoints: puntos
        }],
        width: ancho,
        height: 500,
	lineTension: 10
    });

    chart.render();
    // chart.destroy();
    //
    let textoX = document.querySelector('#serieX').value;
    let x = funciones.transformar(textoX);
    let ox = funciones.obtenerOrigen(x);
    x = funciones.aNumeros(x);
    let minX = 0 - ox;
    let puntosX = [];
    for (let i = 0; i < x.length; i++) {
        puntosX.push({y: x[i], label: minX.toString()});
        minX++;
    }
    if(puntosX.length<7){
        ancho = 300;
    }

    let chartX = new CanvasJS.Chart("tabx", {
        animationEnabled: true,
        dataPointWidth: 15,
        theme: "dark2", // "light1", "light2", "dark1", "dark2"
        title:{
            text: "X(n)"
        },
        axisY: {
            title: " "
        },
        data: [{
            type: "line",
            showInLegend: true,
            legendMarkerColor: "grey",
            legendText: "n",
            dataPoints: puntosX
        }],
        width: ancho,
        height: 500
    });
    chartX.render();

    document.querySelector('#bh').disabled = true;
    if(accion === 'Suma' || accion === 'Resta' || accion === 'Multiplicacion' || accion === 'Interpolacion'){
        document.querySelector('#bh').disabled = false;
        let textoH = document.querySelector('#serieH').value;
        let h = funciones.transformar(textoH);
        let oh = funciones.obtenerOrigen(h);
        h = funciones.aNumeros(h);
        let minH = 0 - oh;
        let puntosH = [];
        for (let i = 0; i < h.length; i++) {
            puntosH.push({y: h[i], label: minH.toString()});
            minH++;
        }
        if(puntosH.length<7){
            ancho = 300;
        }

        let chartH = new CanvasJS.Chart("tabh", {
            animationEnabled: true,
            dataPointWidth: 15,
            theme: "dark2", // "light1", "light2", "dark1", "dark2"
            title:{
                text: "Y(n)"
            },
            axisY: {
                title: " "
            },
            data: [{
                type: "line",
                showInLegend: true,
                legendMarkerColor: "grey",
                legendText: "n",
                dataPoints: puntosH
            }],
            width: ancho,
            height: 500
        });
        chartH.render();
    }

};

module.exports = {
    graficar
};