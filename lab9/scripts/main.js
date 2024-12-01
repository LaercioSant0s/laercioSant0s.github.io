import { produtos } from "./produtos.js";

if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

function criarProduto(produto) {

    const artigo = document.createElement('article');
    
    const nome = document.createElement('p');
    nome.className = 'nomeProduto';
    nome.textContent = produto.title;

    const imagem = document.createElement('img');
    imagem.className = 'imgProduto';
    imagem.setAttribute('src', produto.image);
    imagem.setAttribute('width', '400px');
    imagem.setAttribute('height', '500px');

    const preco = document.createElement('p');
    preco.className = 'precoProduto';
    preco.textContent = `Custo total: ${produto.price} €`;

    const descricao = document.createElement('p');
    descricao.className = 'descricaoProduto';
    descricao.textContent = produto.description;

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = `+ Adicionar ao cesto`;

    artigo.appendChild(nome);
    artigo.appendChild(imagem);
    artigo.appendChild(preco);
    artigo.appendChild(descricao);
    artigo.appendChild(button);
    
    button.addEventListener('click', ()=> {
        
        let produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || []; 
        produtosSelecionados.push(produto);
        localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));
   
        atualizarCesto();
        atualizarPreco();

    });

    return artigo;

}

function carregarProdutos(produtos) {
 
    const section = document.querySelector('.produtos');

    produtos.forEach(produto => {
        
        const artigo = criarProduto(produto);
        section.appendChild(artigo);

    })

}

function removerArtigoHTML(produto) {

    const cesto = document.querySelector('.selecionados');

    const artigos = cesto.querySelectorAll('article');

    let int = 0;

    artigos.forEach(artigo => {

        const nomeProduto = artigo.querySelector('.nomeProduto');

        if (int < 1 && nomeProduto.textContent === produto.title) {
            cesto.removeChild(artigo);
            int = 1;
        }

    });

}

function criarProdutoCesto(produto) {

    const artigo = document.createElement('article');
    
    const nome = document.createElement('p');
    nome.className = 'nomeProduto';
    nome.textContent = produto.title;

    const imagem = document.createElement('img');
    imagem.className = 'imgProduto';
    imagem.setAttribute('src', produto.image);
    imagem.setAttribute('width', '400px');
    imagem.setAttribute('height', '500px');

    const preco = document.createElement('p');
    preco.className = 'precoProduto';
    preco.textContent = `Custo total: ${produto.price} €`;

    const descricao = document.createElement('p');
    descricao.className = 'descricaoProduto';
    descricao.textContent = produto.description;

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = `- Remover do cesto`;

    artigo.appendChild(nome);
    artigo.appendChild(imagem);
    artigo.appendChild(preco);
    artigo.appendChild(descricao);
    artigo.appendChild(button);
    
    button.addEventListener('click', ()=> {

        removerArtigoHTML(produto);

        let selecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

        const index = selecionados.findIndex(artigo => artigo.title === produto.title);

        if (index != -1) {
            selecionados.splice(index, 1);
        }

        localStorage.setItem('produtos-selecionados', JSON.stringify(selecionados));

        atualizarPreco();

    });

    return artigo;

}

function atualizarCesto() {

    const selecionados = document.querySelector('.selecionados');

    while (selecionados.firstChild) {
        selecionados.removeChild(selecionados.firstChild);
    }

    const cesto = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    let artigo;

    cesto.forEach(produto => {
        artigo = criarProdutoCesto(produto);
        selecionados.appendChild(artigo);
    });
        
}

function atualizarPreco() {

    const idTotal = document.querySelector('#total');
    const cesto = JSON.parse(localStorage.getItem('produtos-selecionados'));

    let total = 0;
    
    cesto.forEach(produto => {
        total += parseFloat(produto.price);
    })

    idTotal.textContent = `Custo total: ${total} €`;

}

document.addEventListener('DOMContentLoaded', () => {    
    carregarProdutos(produtos); // Chama a função com a variável produtos
    atualizarCesto();
    atualizarPreco();
});
