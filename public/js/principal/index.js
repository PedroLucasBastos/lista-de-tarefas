class Tarefa {
    constructor(id_banco,cor_corpo, cor_fonte, finalizado, arquivado, desc) {
        this.id_banco = id_banco;
        this.cor_corpo = cor_corpo;
        this.cor_fonte = cor_fonte;
        this.finalizado = finalizado;
        this.arquivado = arquivado;
        this.descricao = desc;
    }
}

var listaDeTarefa = [];
//====================================================================================
// criação da nova tarefa
function addTarefa(){
    const descricao = document.querySelector("#input-descricao").value;
    const select = document.getElementById('seletorDeCores').value;
    //criação do objeto tarefa
    let objTarefa = criarObjTarefa(descricao,select);
    //Adição da nova tarefa na lista
    this.listaDeTarefa.push(objTarefa);

    // Salvar a nova lista no banco
    salvarNoStorage();

}
// Adição da nova li(card) na lista do html
function addNaLista(li){
    const list = document.querySelector("#listaNotas");
    list.appendChild(li); 
}
//===================================================================================
// Criação do objeto tarefa com todas as especificações 
function criarObjTarefa(desc,cor){
    const id_banco = gerarId();
    let cores = selecionarCor(cor);
    var novaTarefa = new Tarefa(id_banco,cores[0],cores[1],false,false,desc);
    console.log(novaTarefa);
    return novaTarefa;
}


function selecionarCor(str_cor){
    let listaDeCores = [
        {id:'1',css_id:'liAzul',cor_corpo:'background-color: #daf5fa',cor_font:'color: #19b5dc'},
        {id:'2',css_id:'liVerde',cor_corpo:'background-color: #d1fecb',cor_font:'color: #58a51d'},
        {id:'3',css_id:'liRosa', cor_corpo:'background-color: #f6d0f3',cor_font:'color: #cb65cb'},
        {id:'4',css_id:'liRoxo', cor_corpo:'background-color: #dcd0f3',cor_font:'color: #9763f9'},
        {id:'5',css_id:'liAmarelo', cor_corpo:'background-color: #fcfccb',cor_font:'color: #8f8f69'},
        {id:'6',css_id:'liLaranja', cor_corpo:'background-color: #fbd4b4',cor_font:'color: #ec842e'},
        {id:'7',css_id:'liBranco', cor_corpo:'background-color: #ffffff',cor_font:'color: #727272'},
    ]
    for(let cor of listaDeCores){
        if(cor.id === str_cor){
            return [cor.cor_corpo,cor.cor_font];
        }
    }
}
//====================================================================================
// Carregar a lista de tarefas armazenada no local storage e exibir
function carregarLista(){
    this.listaDeTarefa = carregarStorage();
    console.log(listaDeTarefa);
    for(tarefaAtual of listaDeTarefa){
        if(this.listaDeTarefa === []){
            console.log(listaDeTarefa);
            break;
        } else{
            addNaLista(criarLi(tarefaAtual));
            console.log(tarefaAtual);
        }
    }
}
window.onload = carregarLista();
//====================================================================================
// criação dos cards na página
function criarLi(objTarefa){
    let li = document.createElement('li');
    let div = document.createElement('div');
    const idDivPrincipal = 'EUMSM';
    div.setAttribute('id',objTarefa.id_banco);
    div.setAttribute('class','cartaoDeTarefa');
    
    div.setAttribute('style',objTarefa.cor_corpo+';'+objTarefa.cor_fonte);

    div.appendChild(criarHeader(objTarefa.id_banco,objTarefa.finalizado));
    //console.log(objTarefa.id_banco);
    div.appendChild(criarMain(objTarefa.finalizado,objTarefa.descricao));
    div.appendChild(criarFooter(objTarefa.id_banco,objTarefa.finalizado));
    
    li.appendChild(div);
    return li;
}
// Cabeçalho
function criarHeader(id,finalizado){
    let header = document.createElement('header');
    let div = document.createElement('div');
    let img = document.createElement('img');
    let p = document.createElement('p');
    //const funcaoDeChamada = 'mudarStatus('+id+')';
    header.setAttribute('id','cabecalho1');
    header.setAttribute('class','cabecalhoNota');
    
    if(finalizado == false){
        header.setAttribute('style','background-color: #ffa4a3;color: #e42c28');
        img.setAttribute('src','public/assets/unchecked.png');
        p.innerText = 'Não concluido';

    } else{
        header.setAttribute('style','background-color: #b8ff99; color: #2b5a07');
        img.setAttribute("src", "public/assets/checked.png");
        p.innerText = "Concluido";
    }
    div.setAttribute('class','itens');
    img.setAttribute('class','btnConcluir');
    img.setAttribute('onclick','mudarStatus('+id+')');

    p.setAttribute('class','status');
   
    div.appendChild(img);
    div.appendChild(p);

    header.appendChild(div);
    return header;   
}
// Texto principal
function criarMain(finalizado,descricao){
    let main = document.createElement('main');
    let p = document.createElement('p');

    main.setAttribute('id','parteDeTexto');
    main.setAttribute('class','corpoNota');

    p.setAttribute("class",'lblDescricao');
    p.innerText = descricao;
    if(finalizado === false){
        console.log(finalizado);
        p.setAttribute('style','text-decoration: none');
    } else{
        p.setAttribute('style','text-decoration: line-through');
    }
    main.appendChild(p);
    return main;
}
// Rodapé
function criarFooter(id,finalizado){
    let footer = document.createElement('footer');
    let imgArquivar = document.createElement('img');
    let imgApagar = document.createElement('img');

    footer.setAttribute('class','rodapeNota');
    imgArquivar.setAttribute('class','feito');
    imgApagar.setAttribute('class','apagar');


    imgArquivar.setAttribute('id','feito');
    imgApagar.setAttribute('id','apagar');

    if(finalizado === false){
        // Tarefa não finalizada
        imgArquivar.setAttribute('src','public/assets/archive-gray-scale.png');
        imgApagar.setAttribute('src','public/assets/trash-gray-scale.png');
        imgApagar.setAttribute('onclick','');
    
    }else{
        // Tarefa finalizada
        imgArquivar.setAttribute('src','public/assets/archive-color.png');
        imgApagar.setAttribute('src','public/assets/trash-color.png');
        imgApagar.setAttribute('onclick','apagarNoStorage('+id+')');
        imgApagar.setAttribute('type','submit');
    }
    

    footer.appendChild(imgArquivar);
    footer.appendChild(imgApagar);

    return footer;
}
// Mudar o status do card
function mudarStatus(tarefa){
    let id = tarefa.getAttribute('id');
    let liPrincipal = document.getElementById(id);
    let header = liPrincipal.getElementsByClassName('cabecalhoNota')[0];
    let status = liPrincipal.getElementsByClassName('status')[0];
    let img = liPrincipal.getElementsByClassName('btnConcluir')[0];
    let imgArquivar = liPrincipal.getElementsByClassName('feito')[0];
    let imgApagar = liPrincipal.getElementsByClassName('apagar')[0];
    let lblDesc = liPrincipal.getElementsByClassName('lblDescricao')[0];
    var cont=0;
    for(tarefaAtual of listaDeTarefa){
        if(tarefa.getAttribute('id') === tarefaAtual.id_banco){
            if(tarefaAtual.finalizado === false){
                header.style.backgroundColor='#b8ff99';
                header.style.color = "#2b5a07";
                status.innerText = "Concluido";

                img.setAttribute("src", "public/assets/checked.png");
                imgArquivar.setAttribute('src','public/assets/archive-color.png');
                imgApagar.setAttribute('src','public/assets/trash-color.png');
                imgApagar.setAttribute('onclick','apagarNoStorage('+id+')');
                lblDesc.setAttribute('style','text-decoration: line-through');

                tarefaAtual.finalizado = true;
                this.listaDeTarefa[cont] = tarefaAtual;
                salvarNoStorage();
            } else{
                header.style.backgroundColor='#ffa4a3';
                header.style.color = "#e42c28";
                status.innerText = "Não concluido";

                img.setAttribute("src", "public/assets/unchecked.png");
                imgArquivar.setAttribute('src','public/assets/archive-gray-scale.png');
                imgApagar.setAttribute('src','public/assets/trash-gray-scale.png');
                imgApagar.setAttribute('onclick','');

                lblDesc.setAttribute('style','text-decoration: none')
                
                tarefaAtual.finalizado = false;
                this.listaDeTarefa[cont] = tarefaAtual;
                salvarNoStorage();
            }
            break;
        }
        cont +=1;
    }
}
//====================================================================================================
// MANIPULAÇÃO DO LOCAL STORAGE
function salvarNoStorage(){
    window.localStorage.setItem('listaDeTarefas', JSON.stringify(this.listaDeTarefa));
}

function carregarStorage(){
    let listaDeTarefas = JSON.parse(window.localStorage.getItem('listaDeTarefas') || []);
    //console.log(listaDeTarefas);
    return listaDeTarefas;    
}
function apagarNoStorage(tarefa){
    let id = tarefa.getAttribute('id');
    console.log(id);
    let cont=0;
    let auxTarefa;
    for (tarefaAtual of listaDeTarefa){
        if(tarefaAtual.id_banco === id){
            auxTarefa = listaDeTarefa.splice(cont,1);
            localStorage.clear();
            salvarNoStorage();
            document.location.reload(false);
            console.log(listaDeTarefa);
        }
        cont +=1;
    }
    //carregarLista();
}
//============================================
// Funções genéricas para melhorar o fluxo do código
function gerarId(){
    let idGerado = Math.floor((Math.random() * 1000) + 1);
    for(let i =0; i<100;i++){
        if(idGerado !== listaDeTarefa[i]){
            return 'A'+idGerado;
        } else{
            idGerado = Math.floor((Math.random() * 1000) + 1);
        }
    }
}