addEventListener('click', ()=> {
    alert('txe, clicaste');
});

const poema = document.querySelector('#poema');

const getRandomColor = () => { 
    const random255 = () => Math.floor(Math.random() * 256); 
    const r = random255(); 
    const g = random255(); 
    const b = random255(); 
    return `rgb(${r},${g},${b})`; 
};

poema.addEventListener('click', ()=> {
    poema.style.backgroundColor = getRandomColor();
});

const capitaisHeader = document.querySelector('header > h1');

capitaisHeader.addEventListener('mouseover', ()=> {capitaisHeader.style.color=getRandomColor();})

const nav = document.querySelector('nav');

nav.querySelectorAll('a')[0].addEventListener('mouseleave', ()=> {
    nav.querySelectorAll('a')[0].innerHTML="Puemuxo coloral";
});

nav.querySelectorAll('a')[1].addEventListener('mouseleave', ()=> {
    nav.querySelectorAll('a')[1].innerHTML="Hackeado!";
    nav.querySelectorAll('a')[1].style.color=getRandomColor();

});

nav.querySelectorAll('a')[2].addEventListener('mouseover', ()=> {
    nav.querySelectorAll('a')[2].innerHTML="< treta, eu sou normal";
});

nav.querySelectorAll('a')[3].addEventListener('mouseover', ()=> {
    nav.querySelectorAll('a')[3].style.backgroundColor=getRandomColor();
});

nav.querySelectorAll('a')[3].addEventListener('mouseleave', ()=> {
    nav.querySelectorAll('a')[3].style.color=getRandomColor();
});