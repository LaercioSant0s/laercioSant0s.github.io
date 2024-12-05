if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

let apiProdutos;

async function fetchCategorias() {
    
    const resposta = await fetch("https://deisishop.pythonanywhere.com/categories");
    const categorias = await resposta.json();
    console.log(categorias);
    return categorias;

}

async function fetchProdutos() {
    
    const resposta = await fetch("https://deisishop.pythonanywhere.com/products");
    const produtos = await resposta.json();
    console.log(produtos);
    return produtos;

}

async function menuFiltrar() {

    const categoriasDEISIshop = await fetchCategorias();

    const menuFiltros = document.querySelector('#filtrar');

    categoriasDEISIshop.forEach(categoria => {
        
        const opcao = document.createElement('option');
        opcao.setAttribute('value', categoria);
        opcao.textContent = categoria;

        menuFiltros.appendChild(opcao);

    });

}

function criarProduto(produto) {

    const artigo = document.createElement('article');

    const categoria = document.createElement('p');
    categoria.className = 'categoria';
    categoria.textContent = produto.category;
    categoria.style.display = 'none';
    
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
    
    artigo.appendChild(categoria);
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

async function carregarProdutos(produtos) {
 
    const produtosDEISIstore = await fetchProdutos();
    const section = document.querySelector('.produtos');

    produtosDEISIstore.forEach(produto => {
        
        const artigo = criarProduto(produto);
        section.appendChild(artigo);

    });

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

    total = total.toFixed(2);

    idTotal.textContent = `Custo total: ${total} €`;

}

document.querySelector('#filtrar').addEventListener('change', (event) => {

    const selecionado = event.target.value;

    const produtos = document.querySelector('.produtos');

    produtos.querySelectorAll('article').forEach(artigo => {

        artigo.style.display = '';

        const categoria = artigo.querySelector('.categoria').textContent;

        if (selecionado !== categoria) {
            artigo.style.display = 'none';
        }

    });


})

document.querySelector('#ordenar').addEventListener('change', (event) => {
    const selecionado = event.target.value;
    const produtos = document.querySelector('.produtos');
    
    // Selecionar todos os articles dentro da seção .produtos
    const produtosArray = Array.from(produtos.querySelectorAll('article'));

    let ordemCertaProdutos = Array.from(apiProdutos);
    

    if (selecionado === "decrescente") {
        
        ordemCertaProdutos.sort((a, b) => parseFloat(b.rating.rate).toFixed(2) - parseFloat(a.rating.rate).toFixed(2)); 
    } else if (selecionado === "crescente") {
        ordemCertaProdutos.sort((a, b) => parseFloat(a.rating.rate).toFixed(2) - parseFloat(b.rating.rate).toFixed(2)); 
    }

    // Remover todos os articles do container
    while (produtos.firstChild) {
        produtos.removeChild(produtos.firstChild);
    }

    // Adicionar os articles ordenados de volta ao container
    
    ordemCertaProdutos.forEach(artigoCerto => {
        produtosArray.forEach(produto => {

            const titleProduto = produto.querySelector('.nomeProduto').textContent;

            if (artigoCerto.title === titleProduto) {
                produtos.appendChild(produto);
            }

        });
    });
    
    // Para verificar o resultado no console
    console.log("Produtos ordenados:", produtosArray.map(prod => extrairPreco(prod)));
});

document.querySelector('#resultadoProcura').addEventListener('input', (texto) => {

    const userInput = texto.target.value;
    const produtos = document.querySelector('.produtos').querySelectorAll('article');
    
    // Selecionar todos os articles dentro da seção .produtos
    
    produtos.forEach(produto => { 
        const tituloElemento = produto.querySelector('.nomeProduto'); 
        
        if (tituloElemento) { 
            const titulo = tituloElemento.textContent; 
            if (titulo.includes(userInput) || userInput === "") { 
                produto.style.display = 'block'; // Mostrar o produto 
            } else { 
                produto.style.display = 'none'; // Esconder o produto 
            } 
        } 
    });

});

async function pedidoCompra(dados) {

    const pedido = await fetch('https://deisishop.pythonanywhere.com/buy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(dados)
    });

    const resposta = await pedido.json();

    return resposta;
    
}

document.querySelector('#comprar').addEventListener('click', async ()=> {

    const products = JSON.parse(localStorage.getItem('produtos-selecionados')).map(produto => `${produto.id}`);
    const checkbox = document.querySelector('#estudante').checked;
    const desconto = document.querySelector('#desconto').value;
    let resposta;

    const data = {
        "products": products,
        "student": checkbox,
        "coupon": desconto
    }
      
    resposta = await pedidoCompra(data);

    const preco = document.createElement('p');
    preco.textContent = `Custo total: ${resposta.totalCost} €`;
    preco.style.fontSize = '24px';
    preco.style.fontWeight = 'bold';

    const referencia = document.createElement('p');
    referencia.textContent = `Referência de pagamento: ${resposta.reference}`;
    referencia.style.fontSize = '20px';
    referencia.style.fontWeight = 'bold';
    referencia.style.marginBottom = '20px';

    const pagamento = document.querySelector('#checkout');
    
    pagamento.querySelectorAll('*').forEach(element => element.setAttribute('hidden', ''));
    
    pagamento.appendChild(preco);
    pagamento.appendChild(referencia);

});


function adicionarTodosProdutos() {


    const arrayApiProdutos = Array.from(apiProdutos);
    
    arrayApiProdutos.forEach(produto => {

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

document.addEventListener('DOMContentLoaded', async() => {    
    
    document.querySelector('#checkout').querySelectorAll('*').forEach(element => element.removeAttribute('hidden'));
    const checkout = document.querySelector('#checkout');
    const elementos = Array.from(checkout.querySelectorAll('*'));

    // Filtrar elementos que têm o atributo 'id'
    const elementosComId = elementos.filter(elemento => {

        const sectionChild = elemento.querySelector('input') || elemento.querySelector('button');

        if (sectionChild) {
            return !sectionChild.hasAttribute('id')
        }

    });

    // Remover esses elementos do DOM
    if (elementosComId) {
        elementosComId.forEach(elemento => elemento.remove());
    }


    apiProdutos = await fetchProdutos();

    menuFiltrar();
    carregarProdutos();
    atualizarCesto();
    atualizarPreco();

});

