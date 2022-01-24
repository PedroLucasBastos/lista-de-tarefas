var listaDeTarefa = [];
window.onload = carregarListaStorage();

function addNaListaHtmlArquivadas(li) {
    const list = document.querySelector("#listaNotas");
    list.appendChild(li);
}

function salvarNoStorage() {
    window.localStorage.setItem('listaDeTarefas', JSON.stringify(this.listaDeTarefa));
}
function carregarListaStorage() {
    listaDeTarefa = carregarStorage();
    let cont =0;
    for (let tarefaAtual of listaDeTarefa) {
        cont +=1;
        if (this.listaDeTarefa === []) {
            break;
        } else {
            if (tarefaAtual.arquivado === true && tarefaAtual.finalizado === true) {
                addNaListaHtmlArquivadas(criarLi(tarefaAtual));
            } else {
            }
        }
    }
}
function carregarStorage() {
    let listaDeTarefas = JSON.parse(window.localStorage.getItem('listaDeTarefas') || []);
    return listaDeTarefas;
}

function criarLi(objTarefa) {
    let li = document.createElement('li');
    let div = document.createElement('div');
    const idDivPrincipal = 'EUMSM';
    div.setAttribute('id', objTarefa.id_banco);
    div.setAttribute('class', 'cartaoDeTarefa');

    div.setAttribute('style', objTarefa.cor_corpo + ';' + objTarefa.cor_fonte);

    div.appendChild(criarHeaderArquivado());
    div.appendChild(criarMainArquivado(objTarefa.descricao));
    div.appendChild(criarFooterArquivado(objTarefa.id_banco));

    li.appendChild(div);
    return li;
}
// Cabeçalho
function criarHeaderArquivado() {
    let header = document.createElement('header');
    let div = document.createElement('div');
    let img = document.createElement('img');
    let p = document.createElement('p');

    header.setAttribute('id', 'cabecalho1');
    header.setAttribute('class', 'cabecalhoNota');

    [header, img, p] = headerArquivado(header, img, p);

    div.setAttribute('class', 'itens');
    img.setAttribute('class', 'btnConcluir');
    img.setAttribute('style', 'cursor: auto');
    p.setAttribute('class', 'status');

    div.appendChild(img);
    div.appendChild(p);

    header.appendChild(div);

    return header;
}
// Texto principal
function criarMainArquivado(descricao) {
    let main = document.createElement('main');
    let p = document.createElement('p');

    main.setAttribute('id', 'parteDeTexto');
    main.setAttribute('class', 'corpoNota');

    p.setAttribute("class", 'lblDescricao');
    p.innerText = descricao;
    p.setAttribute('style', 'text-decoration: line-through');
    main.appendChild(p);
    return main;
}
// Rodapé
function criarFooterArquivado(id) {
    let footer = document.createElement('footer');
    let imgApagar = document.createElement('img');

    footer.setAttribute('class', 'rodapeNota');
    imgApagar.setAttribute('class', 'apagar');


    imgApagar.setAttribute('id', 'apagar');

    imgApagar = footerArquivado(imgApagar, id);

    footer.appendChild(imgApagar);

    return footer;
}


// Funções genéricas para criação dos cards no html
function headerArquivado(header, img, p) {
    header.style.backgroundColor = '#b8ff99';
    header.style.color = "#2b5a07";
    img.setAttribute("src", "public/assets/checked.png");
    p.innerText = "Concluido";

    header.style.backgroundColor = '#b8ff99';
    header.style.color = "#2b5a07";
    img.setAttribute("src", "public/assets/checked.png");
    p.innerText = "Concluido";
    return [header, img, p];
    return [header, img, p];
}

function footerArquivado(imgApagar, id) {
    imgApagar.setAttribute('src', 'public/assets/trash-color.png');
    imgApagar.setAttribute('onclick', 'apagarTarefaArquivada(' + id + ')');
    imgApagar.setAttribute('type', 'submit');
    imgApagar.style.cursor = 'pointer';
    return imgApagar;
}

function apagarTarefaArquivada(tarefa) {
    let id = tarefa.getAttribute('id');
    let cont = 0;
    for (tarefaAtual of listaDeTarefa) {
        if (tarefaAtual.id_banco === id) {
            auxTarefa = listaDeTarefa.splice(cont, 1);
            localStorage.clear();
            salvarNoStorage();
            document.location.reload(false);
        }
        cont += 1;
    }
}