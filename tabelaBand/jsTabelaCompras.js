function cadastroDeObjetos (serie, referencia, produto, valor) {

    let tabela = document.getElementById('tbPessoas');
    let quantidadeDeLinhas = tabela.rows.length;
    let linha = tabela.insertRow(quantidadeDeLinhas);

    let cellCodigo = linha.insertCell(0);
    let cellSerie = linha.insertCell(1);
    let cellReferencia = linha.insertCell(2); 
    let cellProduto = linha.insertCell(3); 
    let cellValor = linha.insertCell(4); 
    
    cellCodigo.innerHTML = quantidadeDeLinhas;
    cellSerie.innerHTML = serie;
    cellReferencia.innerHTML = referencia;
    cellProduto.innerHTML = produto;
    cellValor.innerHTML = valor;

    document.getElementById('tbPessoas').value='';
    
}