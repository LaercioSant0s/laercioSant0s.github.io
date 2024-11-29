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
        
        const objProduto = JSON.stringify(produto);

        let produtosSelecionados; 
        
        produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || []; 
        
        produtosSelecionados.push(objProduto);
        localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));
   
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

function removerProduto(produto) {

    const selecionados = document.querySelector('.selecionados');
    let produtos = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    let newList = [];
    let toRemove;

    produtos.forEach(artigo => {

        if (artigo.title !== produto.title && artigo.description !== produto.description) {
            newList.push(artigo);
        } else {
            toRemove = artigo;
        }
    
    });

    localStorage.setItem('produtos-selecionados', JSON.stringify(newList));


    selecionados.querySelectorAll('article').forEach(article => {

        const title = article.querySelector('.nomeProduto');
        const description = article.querySelectorAll('.descricaoProduto');

        if (title && description && title.textContent == toRemove.title && description.textContent == toRemove.description) {
            selecionados.removeChild(article);
            return;
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
        removerProduto(produto);
    })

    return artigo;

}

function atualizarCesto(produto) {

    const cesto = document.querySelector('.selecionados');
    const artigo = criarProdutoCesto();
    cesto.appendChild(artigo);
        
}


document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos(produtos); // Chama a função com a variável produtos
});
