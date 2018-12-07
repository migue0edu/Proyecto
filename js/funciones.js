let operacionBasica = ()=>{
    let rango, x, h, ox, oh, parcial, mayorOrgn;
    let textoX = document.querySelector('#serieX').value;
    let textoH = document.querySelector('#serieH').value;
    x = transformar(textoX);
    h = transformar(textoH);
    ox = obtenerOrigen(x);
    oh = obtenerOrigen(h);
    rango = obtenerRango(x, h);
    parcial = 0;
    x = aNumeros(x);
    h = aNumeros(h);
    let resultado = [];

    for(let i=rango.limInf; i <= rango.limSup; i++){
        parcial = 0;
        if(ox + i >= 0 && ox + i <= x.length-1){
            parcial = x[ox+i];
        }
        if(oh + i >= 0 && oh + i <= h.length-1){
            switch (document.querySelector('#accion').value) {
                case 'Suma':
                    parcial += h[oh+i];
                    break;

                case 'Resta':
                    parcial -= h[oh+i];
                    break;

                case 'Multiplicacion':
                    parcial *= h[oh+i];
            }
        }
        else{
            if(document.querySelector('#accion').value === 'Multiplicacion'){
                parcial = 0;
            }
        }
        resultado.push(parcial);
    }

    resultado = limapiarResultado(resultado, ox);
    mayorOrgn = ox;
    if(oh > mayorOrgn){
        mayorOrgn = oh;
    }
    let textResultado = aTexto(resultado, mayorOrgn);
    console.log(textResultado);
    document.querySelector('#resultado').value = textResultado.toString();
    return {
        resultado,
        origen: mayorOrgn
    };
};

let multiplicarEscalar = ()=> {
    let x, ox;
    let textoX = document.querySelector('#serieX').value;
    let param = document.querySelector('#parametro').value;
    let resultado = [];
    param = Number.parseInt(param);
    x = transformar(textoX);
    ox = obtenerOrigen(x);
    x = aNumeros(x);
    for(let i=0; i<x.length; i++){
        resultado.push(x[i]*param);
    }
    let textResultado = aTexto(resultado, ox);
    document.querySelector('#resultado').value = textResultado.toString();
    return {
        resultado,
        origen: ox
    };
};

let reflejar = () => {
    let textoX = document.querySelector('#serieX').value;
    let resultado = transformar(textoX);
    resultado.reverse();
    let ox = obtenerOrigen(resultado);
    resultado = aNumeros(resultado);
    let textResultado = aTexto(resultado, ox);
    document.querySelector('#resultado').value = textResultado.toString();
    return {
        resultado,
        origen: ox
    };

};

let desplazar = () => {
    let ox, x, nuevoOrgn;
    let textoX = document.querySelector('#serieX').value;
    let param = document.querySelector('#parametro').value;
    let resultado = [];
    param = Number.parseInt(param);
    x = transformar(textoX);
    ox = obtenerOrigen(x);
    nuevoOrgn = ox - param;
    console.log(param, ox, nuevoOrgn, x);
    if(nuevoOrgn < 0){
        for(let i=nuevoOrgn; i<0;i++){
            resultado.push('0');
        }
    }

    for(let i=0; i<x.length;i++){
        resultado.push(x[i]);
    }

    if(nuevoOrgn > x.length-1){
        for(let i=x.length; i<=nuevoOrgn; i++){
            resultado.push('0');
        }
    }
    resultado = aNumeros(resultado);
    if(nuevoOrgn < 0){
        nuevoOrgn = 0;
    }

    let textResultado = aTexto(resultado, nuevoOrgn);
    console.log(textResultado, nuevoOrgn);
    document.querySelector('#resultado').value = textResultado.toString();
    return {
        resultado,
        origen: nuevoOrgn
    };
};

let diezmar = () => {
    let ox, x, nuevoOrgn, i;
    let textoX = document.querySelector('#serieX').value;
    let param = document.querySelector('#parametro').value;
    let resultado = [];
    param = Number.parseInt(param);
    param = Math.abs(param);
    x = transformar(textoX);
    ox = obtenerOrigen(x);
    x = aNumeros(x);
    i = ox;
    nuevoOrgn = 0;
    while(i >= param){
        i -= param;
        nuevoOrgn++;
        resultado.unshift(x[i]);
    }
    resultado.push(x[ox]);
    i = ox;
    while(i < x.length-param){
        i += param;
        resultado.push(x[i]);
    }
    console.log(resultado);
    let textResultado = aTexto(resultado, nuevoOrgn);

    document.querySelector('#resultado').value = textResultado.toString();
    return {
        resultado,
        origen: nuevoOrgn
    };
};

let interpolar = () => {
    let textoX = document.querySelector('#serieX').value;
    let tipo = document.querySelector('#tipoI').value;
    let param = document.querySelector('#parametro').value;
    let x = transformar(textoX);
    let ox = obtenerOrigen(x);
    let val;
    let resultado = [];
    x = aNumeros(x);
    if(tipo !== 'Lineal') {
        let val = '0';
        for(let i=0; i<x.length;i++){
            resultado.push(x[i]);
            if(tipo === 'Escalón'){
                val = x[i];
            }
            for(let j=1; j<param; j++){
                resultado.push(val);
            }
        }
    }
    else{
        for(let i=0; i<x.length-1;i++){
            resultado.push(x[i]);
            val = Math.abs(x[i] - x[i+1]) / param;
            if(x[i] > x[i+1]){
                val *= -1;
            }
            for(let j=1; j<param; j++){
                resultado.push(x[i] + (val * j));
            }
        }
        val =  Math.abs(x[x.length-1]) / param;
        if(x[x.length-1] > 0){
            val *= -1;
        }
        resultado.push(x[x.length-1]);
        for(let i=1; i<param;i++){
            resultado.push(x[x.length-i] + val);
        }
    }
    ox += ox*(param-1);
    let textResultado = aTexto(resultado, ox);
    document.querySelector('#resultado').value = textResultado.toString();
    return {
        resultado,
        origen: ox
    };
};

let convolucionar = () => {
    let x, h, ox, oh, nuevoOrgn;
    let textoX = document.querySelector('#serieX').value;
    let textoH = document.querySelector('#serieH').value;
    let resultado = [];
    x = transformar(textoX);
    h = transformar(textoH);
    console.log(x, h);
    ox = obtenerOrigen(x);
    oh = obtenerOrigen(h);
    x = aNumeros(x);
    h = aNumeros(h);
    let i,j;
    for(i=0; i<x.length + h.length -1;i++){
        resultado.push(0);
    }

    for(i=0;i<x.length; i++){
        for(j=0;j<h.length;j++){
            resultado[i+j]=resultado[i+j]+x[i]*h[j];
        }
        console.log(resultado);
    }

    nuevoOrgn = ox + oh;
    let textResultado = aTexto(resultado, nuevoOrgn);

    document.querySelector('#resultado').value = textResultado.toString();
    return {
        resultado,
        origen: nuevoOrgn
    };
};

//====================================================================================================================

let obtenerOrigen = (elementos)=>{
    let index = -1;
    for (let i = 0; i < elementos.length; i++) {
        if(elementos[i].includes('*') | elementos[i].includes('\'') | elementos[i].includes('\"')){
            index = i;
        }
    }
    return index;
};

let obtenerRango = (x, h) => {
    let limInf , limSup;
    let ox = obtenerOrigen(x);
    let oh = obtenerOrigen(h);
    if(ox > oh){
        limInf = ox * -1;
    }
    else{
        limInf = oh * -1;
    }
    limSup = x.length - ox - 1;
    if(limSup < h.length - oh -1){
        limSup = h.length - oh -1;
    }
    return {limInf, limSup};
};

let transformar = (texto) => {
    let elementos = texto.split(',');
    if(elementos.length === 1){
        elementos = elementos[0].split(' ');
    }
    return elementos;
};

let aNumeros = (x) => {
    let arrNumeros = [];
  for(let i=0 ; i<x.length; i++){
      if(x[i].includes('*')){
          if(x[i].charAt(0) === '*'){
              x[i] = x[i].substring(1);
          }
          if(x[i].charAt(1) === '*' && x[i].charAt(0) === ' '){
              x[i] = x[i].substring(2);
          }
          if(x[i].charAt(x[i].length-1) === '*'){
              x[i] = x[i].substring(0,(x[i].length)-1);
          }
      }
      arrNumeros.push(Number.parseFloat(x[i]));
  }
  return arrNumeros;
};

let aTexto = (x, origen) => {
  let arrTexto = [];
  for(let i= 0; i < x.length; i++){
      arrTexto.push(" ".concat(x[i].toString()));
  }
  arrTexto[origen] = arrTexto[origen].concat('*');
  return arrTexto;
};

let limapiarResultado = (x, ox) => {
  while(x[0] === 0 && ox !== 0){

      x.shift();
  }
  while(x[x.length-1] === 0 && ox !== x.length-1){
      x.pop();
  }
  return x;
};

module.exports = {
    operacionBasica,
    reflejar,
    desplazar,
    multiplicarEscalar,
    diezmar,
    interpolar,
    convolucionar,
    transformar,
    obtenerOrigen,
    aNumeros
};