const firstElement = document.querySelectorAll('ol li')[0];
let mouseover = firstElement.querySelectorAll('p')[0];

mouseover.addEventListener('mouseover', ()=> {
    mouseover.textContent=`Obrigado!`;
})

mouseover.addEventListener('mouseleave', ()=> {
    mouseover.textContent=`Atreve-te a fazer "MOUSE OVER!`;
})

const secondElement = document.querySelectorAll('ol li')[1];
const pinta = secondElement.querySelector('label');
const button1 = secondElement.querySelectorAll('button')[0];
const button2 = secondElement.querySelectorAll('button')[1];
const button3 = secondElement.querySelectorAll('button')[2];

const getRandomColor = () => { 
    const random255 = () => Math.floor(Math.random() * 256); 
    const r = random255(); 
    const g = random255(); 
    const b = random255(); 
    return `rgb(${r},${g},${b})`; 
};

button1.addEventListener('click', () => { pinta.style.color = "skyblue"; }); 
button2.addEventListener('click', () => { pinta.style.color = getRandomColor(); });
button3.addEventListener('click', () => { pinta.style.color = "grey"; });


const terceiroElemento = document.querySelectorAll('ol li')[2];
const colorChangeInput = terceiroElemento.querySelectorAll('input')[0];

//alternativa, função que devolve apenas 3 cores em sequencia
colorChangeInput.addEventListener('selectionchange', ()=>{colorChangeInput.style.backgroundColor= getRandomColor();})

const quartoElemento = document.querySelectorAll('ol li')[3];
const text = quartoElemento.querySelector('input');
const confirmButton = quartoElemento.querySelector('button');

confirmButton.addEventListener('click', ()=> {
    
    document.querySelector('body').style.background = text.value;
    
})

const contaButton = document.querySelectorAll('ol li')[4].querySelector('button');
const counter = document.querySelectorAll('ol li')[4].querySelector('p');

contaButton.addEventListener('click', ()=> {
    counter.textContent++;
})