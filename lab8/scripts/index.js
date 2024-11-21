const firstElement = document.querySelectorAll('ol li')[0];
let mouseover = firstElement.querySelectorAll('p')[0];

mouseover.addEventListener('mouseover', ()=> {
    mouseover.textContent=`Obrigado!`;
})

mouseover.addEventListener('mouseleave', ()=> {
    mouseover.textContent=`Atreve-te a fazer "MOUSE OVER!`;
})



const getRandomColor = () => { 
    const random255 = () => Math.floor(Math.random() * 256); 
    const r = random255(); 
    const g = random255(); 
    const b = random255(); 
    return `rgb(${r},${g},${b})`; 
};
const buttons = document.querySelectorAll('ol li')[1];
const pinta = document.querySelectorAll('ol li')[1].querySelector('label');

buttons.querySelectorAll('button').forEach((e) => {
    e.addEventListener('click', ()=> {
        if (e.dataset.color === "random") {
            pinta.style.color = getRandomColor();
        } else {
            pinta.style.color = e.dataset.color;
        }
    });
});



const terceiroElemento = document.querySelectorAll('ol li')[2];
const colorChangeInput = terceiroElemento.querySelectorAll('input')[0];

//alternativa, função que devolve apenas 3 cores em sequencia
colorChangeInput.addEventListener('selectionchange', ()=>{colorChangeInput.style.backgroundColor= getRandomColor();})


//doesnt work
document.querySelector('#escolha').onchange = function() {
    if (this.value === "random") {
        document.querySelector('body').style.backgroundColor = getRandomColor();
    } else {
        document.querySelector('body').style.backgroundColor = this.value;
    }
};




const contaButton = document.querySelectorAll('ol li')[4].querySelector('button');

if (!localStorage.getItem('counter')) {
    localStorage.setItem('counter', 33);
}

let conta = localStorage.getItem('counter');

let counter = document.querySelectorAll('ol li')[4].querySelector('span');
counter.textContent = conta;


contaButton.addEventListener('click', ()=> {
    counter.textContent = ++conta;
    localStorage.setItem('counter', conta);
})


const nome = document.querySelector('#nome');
const idade = document.querySelector('#idade');
const phraseButton = document.querySelector('#phraseButton');
const phrase = document.querySelector('#phrase');

phraseButton.addEventListener('click', ()=> {

    if (nome.value != "" && idade.value != "") {
        phrase.textContent = `Olá, o ${nome.value} tem ${idade.value}!`;
    }

})





let num = 0;
const counter2 = document.querySelectorAll('ol li')[6].querySelectorAll('p')[1];

const automaticCounter = () => {
    counter2.textContent = ++num;
}

setInterval(automaticCounter, 1000);
