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
        const objProduto = {
            "nome": produto.title,
            "imagem": produto.image,
            "preco": produto.price,
            "descricao": produto.description,
        };

        let produtosSelecionados = localStorage.getItem('produtos-selecionados');

        if (produtosSelecionados) {
            produtosSelecionados = JSON.parse(produtosSelecionados);
        } else {
            produtosSelecionados = [];
        }
        
        produtosSelecionados.push(objProduto);
        localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));
    })

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
