class Tarefa {
    constructor(id_banco, cor_corpo, cor_fonte, finalizado, arquivado, desc) {
        this.id_banco = id_banco;
        this.cor_corpo = cor_corpo;
        this.cor_fonte = cor_fonte;
        this.finalizado = finalizado;
        this.arquivado = arquivado;
        this.descricao = desc;
    }
}

var listaDeTarefa = [];
let btnAddTarefa = document.getElementById('submit-Adicionar');
let btnAdicao = document.getElementById('btnAdicao');
let adicaoTarefa = document.getElementById('adicaoTarefa');
//====================================================================================
window.onload = carregarListaStorage();
// Botão para a realizar o cadastro da nova Tarefa
btnAddTarefa.addEventListener('click', function (e) {
    const descricao = document.querySelector("#input-descricao").value;
    const select = document.getElementById('seletorDeCores').value;
    if (validation(descricao, select)) {
        //criação do objeto tarefa
        let objTarefa = criarObjTarefa(descricao, select);
        //Adição da nova tarefa na lista
        listaDeTarefa.push(objTarefa);

        // Salvar a nova lista no banco
        salvarNoStorage();
    } else {
        document.location.reload(true);
    }
});
btnAdicao.addEventListener('click', function (e) {
    console.log(adicaoTarefa);
    adicaoTarefa.style.display = 'block';
    btnAdicao.style.display = 'none';
});

function validation(desc, select) {
    if (select === '' && desc === '') {
        alert('Escolha uma cor e escreva a descrição da tarefa');
        return false;
    } else {
        if (select === '') {
            alert('Escolha uma cor');
            return false;
        }
        if (desc === '') {
            alert('Escreva uma descrição para a tarefa');
            return false;
        }
        return true;
    }
}
//====================================================================================
// Adição da nova li(card) na lista do html
function addNaListaHtml(li) {
    const list = document.querySelector("#listaNotas");
    list.appendChild(li);
}
function carregarListaStorage() {
    this.listaDeTarefa = carregarStorage();
    for (tarefaAtual of listaDeTarefa) {
        if (this.listaDeTarefa === []) {
            break;
        } else {
            if (tarefaAtual.arquivado === false) {
                addNaListaHtml(criarLi(tarefaAtual));
            }
        }
    }
}
function apagarTarefa(tarefa) {
    let id = tarefa.getAttribute('id');
    let cont = 0;
    let auxTarefa;
    for (tarefaAtual of listaDeTarefa) {
        if (tarefaAtual.id_banco === id) {
            auxTarefa = listaDeTarefa.splice(cont, 1);
            localStorage.clear();
            salvarNoStorage();
            document.location.reload(false);
        }
        cont += 1;
    }
    //carregarLista();
}
function arquivarTarefa(tarefa) {
    let id = tarefa.getAttribute('id');
    for (var i = 0; i < listaDeTarefa.length; i++) {
        if (listaDeTarefa[i].id_banco === id) {
            listaDeTarefa[i].arquivado = true;
            salvarNoStorage();
            document.location.reload(false);
        }
    }
}
//===================================================================================
// Criação do objeto tarefa com todas as especificações 
function criarObjTarefa(desc, cor) {
    const id_banco = gerarId();
    let cores = selecionarCor(cor);
    var novaTarefa = new Tarefa(id_banco, cores[0], cores[1], false, false, desc);
    return novaTarefa;
}
function selecionarCor(str_cor) {
    let listaDeCores = [
        { id: '1', css_id: 'liAzul', cor_corpo: 'background-color: #daf5fa', cor_font: 'color: #19b5dc' },
        { id: '2', css_id: 'liVerde', cor_corpo: 'background-color: #d1fecb', cor_font: 'color: #58a51d' },
        { id: '3', css_id: 'liRosa', cor_corpo: 'background-color: #f6d0f3', cor_font: 'color: #cb65cb' },
        { id: '4', css_id: 'liRoxo', cor_corpo: 'background-color: #dcd0f3', cor_font: 'color: #9763f9' },
        { id: '5', css_id: 'liAmarelo', cor_corpo: 'background-color: #fcfccb', cor_font: 'color: #8f8f69' },
        { id: '6', css_id: 'liLaranja', cor_corpo: 'background-color: #fbd4b4', cor_font: 'color: #ec842e' },
        { id: '7', css_id: 'liBranco', cor_corpo: 'background-color: #ffffff', cor_font: 'color: #727272' },
    ]
    for (let cor of listaDeCores) {
        if (cor.id === str_cor) {
            return [cor.cor_corpo, cor.cor_font];
        }
    }
}
function alterarStatus(tarefa) {
    let id = tarefa.getAttribute('id');
    for (var i = 0; i < listaDeTarefa.length; i++) {
        if (listaDeTarefa[i].id_banco === id) {
            if (listaDeTarefa[i].finalizado === true) {
                listaDeTarefa[i].finalizado = false;
                mudarcorStatus(id, false);
                salvarNoStorage();
            } else {
                listaDeTarefa[i].finalizado = true;
                mudarcorStatus(id, true);
                salvarNoStorage();
            }
        }
    }
}
function gerarId() {
    let idGerado = Math.floor((Math.random() * 1000) + 1);
    for (let i = 0; i < 100; i++) {
        if (idGerado !== listaDeTarefa[i]) {
            return 'A' + idGerado;
        } else {
            idGerado = Math.floor((Math.random() * 1000) + 1);
        }
    }
}
//====================================================================================

//====================================================================================
// criação dos cards na página
function criarLi(objTarefa) {
    let li = document.createElement('li');
    let div = document.createElement('div');
    const idDivPrincipal = 'EUMSM';
    div.setAttribute('id', objTarefa.id_banco);
    div.setAttribute('class', 'cartaoDeTarefa');

    div.setAttribute('style', objTarefa.cor_corpo + ';' + objTarefa.cor_fonte);

    div.appendChild(criarHeader(objTarefa.id_banco, objTarefa.finalizado));
    div.appendChild(criarMain(objTarefa.finalizado, objTarefa.descricao));
    div.appendChild(criarFooter(objTarefa.id_banco, objTarefa.finalizado));

    li.appendChild(div);
    return li;
}
// Cabeçalho
function criarHeader(id, finalizado) {
    let header = document.createElement('header');
    let div = document.createElement('div');
    let img = document.createElement('img');
    let p = document.createElement('p');
    //const funcaoDeChamada = 'mudarStatus('+id+')';
    header.setAttribute('id', 'cabecalho1');
    header.setAttribute('class', 'cabecalhoNota');

    if (finalizado === true) {
        [header, img, p] = headerFinalizado(header, img, p, id);

    } else {
        [header, img, p] = headerNaoFinalizado(header, img, p, id);
    }
    div.setAttribute('class', 'itens');
    img.setAttribute('class', 'btnConcluir');


    p.setAttribute('class', 'status');

    div.appendChild(img);
    div.appendChild(p);

    header.appendChild(div);
    return header;
}
// Texto principal
function criarMain(finalizado, descricao) {
    let main = document.createElement('main');
    let p = document.createElement('p');

    main.setAttribute('id', 'parteDeTexto');
    main.setAttribute('class', 'corpoNota');

    p.setAttribute("class", 'lblDescricao');
    p.innerText = descricao;
    if (finalizado === false) {
        p.setAttribute('style', 'text-decoration: none');
    } else {
        p.setAttribute('style', 'text-decoration: line-through');
    }
    main.appendChild(p);
    return main;
}
// Rodapé
function criarFooter(id, finalizado) {
    let footer = document.createElement('footer');
    let imgArquivar = document.createElement('img');
    let imgApagar = document.createElement('img');

    footer.setAttribute('class', 'rodapeNota');
    imgArquivar.setAttribute('class', 'feito');
    imgApagar.setAttribute('class', 'apagar');


    imgArquivar.setAttribute('id', 'feito');
    imgApagar.setAttribute('id', 'apagar');

    if (finalizado === false) {
        [imgApagar, imgArquivar] = footerNaoFinalizado(imgApagar, imgArquivar);

    } else {
        [imgApagar, imgArquivar] = footerFinalizado(imgApagar, imgArquivar, id);
    }


    footer.appendChild(imgArquivar);
    footer.appendChild(imgApagar);

    return footer;
}
// Mudar o layout do card
function mudarcorStatus(id, finalizado) {
    //let id = tarefa.getAttribute('id');
    let liPrincipal = document.getElementById(id);
    let header = liPrincipal.getElementsByClassName('cabecalhoNota')[0];
    let status = liPrincipal.getElementsByClassName('status')[0];
    let imgHeader = liPrincipal.getElementsByClassName('btnConcluir')[0];
    let imgArquivar = liPrincipal.getElementsByClassName('feito')[0];
    let imgApagar = liPrincipal.getElementsByClassName('apagar')[0];
    let lblDesc = liPrincipal.getElementsByClassName('lblDescricao')[0];

    if (finalizado === true) {
        [header, imgHeader, status] = headerFinalizado(header, imgHeader, status, id);
        lblDesc.setAttribute('style', 'text-decoration: line-through');
        [imgApagar, imgArquivar] = footerFinalizado(imgApagar, imgArquivar, id);
    } else {
        [header, imgHeader, status] = headerNaoFinalizado(header, imgHeader, status, id);
        lblDesc.setAttribute('style', 'text-decoration: none');
        [imgApagar, imgArquivar] = footerNaoFinalizado(imgApagar, imgArquivar);
    }
}
//====================================================================================================
// MANIPULAÇÃO DO LOCAL STORAGE
function salvarNoStorage() {
    window.localStorage.setItem('listaDeTarefas', JSON.stringify(this.listaDeTarefa));
}

function carregarStorage() {
    let listaDeTarefas = JSON.parse(window.localStorage.getItem('listaDeTarefas') || []);
    return listaDeTarefas;
}
//============================================
// Funções genéricas para alteração do layout dos cards
function headerFinalizado(header, img, p, id) {
    header.style.backgroundColor = '#b8ff99';
    header.style.color = "#2b5a07";
    img.setAttribute("src", "public/assets/checked.png");
    img.setAttribute('onclick', 'alterarStatus(' + id + ')');
   
    p.innerText = "Concluido";
    return [header, img, p];
}
function headerNaoFinalizado(header, img, p, id) {
    header.style.backgroundColor = '#ffa4a3';
    header.style.color = "#e42c28";
    img.setAttribute("src", "public/assets/unchecked.png");
    img.setAttribute('onclick', 'alterarStatus(' + id + ')');
    p.innerText = "Não concluido";
    return [header, img, p];
}

function footerFinalizado(imgApagar, imgArquivar, id) {
    imgArquivar.setAttribute('src', 'public/assets/archive-color.png');
    imgArquivar.setAttribute('onclick', 'arquivarTarefa(' + id + ')');
    imgArquivar.setAttribute('type', 'submit');
    imgApagar.setAttribute('src', 'public/assets/trash-gray-scale.png');
    imgArquivar.style.cursor = 'pointer';
    return [imgApagar, imgArquivar];
}

function footerNaoFinalizado(imgApagar, imgArquivar) {
    imgArquivar.setAttribute('src', 'public/assets/archive-gray-scale.png');
    imgArquivar.setAttribute('onclick', '');
    imgApagar.setAttribute('src', 'public/assets/trash-gray-scale.png');
    imgApagar.setAttribute('onclick', '');
    imgArquivar.style.cursor = 'auto';
    return [imgApagar, imgArquivar];
}