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
    //append btn

    return artigo;

}

function carregarProdutos(produtos) {
 
    const section = document.querySelector('.produtos');

    produtos.forEach(produto => {
        
        const artigo = criarProduto(produto);
        section.appendChild(artigo);

    })

}



document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos(produtos); // Chama a função com a variável produtos
});
