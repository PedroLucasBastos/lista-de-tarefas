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
//===================================================================================
// Criação do objeto tarefa com todas as especificações 
function criarObjTarefa(desc,cor){
    let numero = Math.floor((Math.random() * 100) + 1);
    const id_banco = ("A"+numero);
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
            //console.log(cor.css_id);
            //console.log(cor.cor_corpo);
            //console.log(cor.cor_font);
            return [cor.cor_corpo,cor.cor_font];
            /*
                console.log(cor.css_id);
                document.getElementById('notas').style.backgroundColor = cor.cor;
                console.log(document.getElementById('notas'));
             */
        }
    }
}
//====================================================================================
// Carregar a lista de tarefas armazenada no local storage e exibir
function carregarLista(){
    this.listaDeTarefa = carregarStorage();
    //console.log(listaDeTarefa);
    for(tarefaAtual of listaDeTarefa){
        console.log(tarefaAtual);
        addNaLista(criarLi(tarefaAtual));
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
    div.appendChild(criarFooter(objTarefa.finalizado));
    
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
    //console.log(header);
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
function criarFooter(finalizado){
    let footer = document.createElement('footer');
    let img1 = document.createElement('img');
    let img2 = document.createElement('img');

    footer.setAttribute('class','rodapeNota');
    img1.setAttribute('class','feito');
    img2.setAttribute('class','apagar');


    img1.setAttribute('id','feito');
    img2.setAttribute('id','apagar');

    if(finalizado === false){
        img1.setAttribute('src','public/assets/archive-gray-scale.png');
        img2.setAttribute('src','public/assets/trash-gray-scale.png');
    
    }else{
        img1.setAttribute('src','public/assets/archive-color.png');
        img2.setAttribute('src','public/assets/trash-color.png');
    }
    

    footer.appendChild(img1);
    footer.appendChild(img2);

    return footer;
}
// Mudar o status do card
function mudarStatus(id_tarefa){
    
    //console.log(id_tarefa.getAttribute());
    let liPrincipal = document.getElementById(id_tarefa.getAttribute('id'));
    
    let header = liPrincipal.getElementsByClassName('cabecalhoNota')[0];
    //console.log(header);
    let status = liPrincipal.getElementsByClassName('status')[0];
    let img = liPrincipal.getElementsByClassName('btnConcluir')[0];
    let imgFeito = liPrincipal.getElementsByClassName('feito')[0];
    let imgApagar = liPrincipal.getElementsByClassName('apagar')[0];
    let lblDesc = liPrincipal.getElementsByClassName('lblDescricao')[0];
    
    let tarefa;
    var posicao=0;
    for(tarefaAtual of listaDeTarefa){
        if(id_tarefa.getAttribute('id') === tarefaAtual.id_banco){
            tarefa = tarefaAtual;
            break;
        }
        posicao +=1;
    }
    if(tarefa.finalizado === false){
        header.style.backgroundColor='#b8ff99';
        header.style.color = "#2b5a07";
        status.innerText = "Concluido";
        img.setAttribute("src", "public/assets/checked.png");
        imgFeito.setAttribute('src','public/assets/archive-color.png');
        imgApagar.setAttribute('src','public/assets/trash-color.png');
        lblDesc.setAttribute('style','text-decoration: line-through')
        tarefa.finalizado = true;
        this.listaDeTarefa[posicao] = tarefa;
        salvarNoStorage();
    } else{
        header.style.backgroundColor='#ffa4a3';
        header.style.color = "#e42c28";
        status.innerText = "Não concluido";
        img.setAttribute("src", "public/assets/unchecked.png");
        imgFeito.setAttribute('src','public/assets/archive-gray-scale.png');
        imgApagar.setAttribute('src','public/assets/trash-gray-scale.png');
        lblDesc.setAttribute('style','text-decoration: none')
        tarefa.finalizado = false;
        this.listaDeTarefa[posicao] = tarefa;
        img.setAttribute('src','public/assets/unchecked.png');
        salvarNoStorage();
    }
    
}
//============================================
// MANIPULAÇÃO DO LOCAL STORAGE
function salvarNoStorage(){
    window.localStorage.setItem('listaDeTarefas', JSON.stringify(this.listaDeTarefa));
}

function carregarStorage(){
    let listaDeTarefas = JSON.parse(window.localStorage.getItem('listaDeTarefas') || []);
    //console.log(listaDeTarefas);
    return listaDeTarefas;    
}


// outros
function addNaLista(li){
    const list = document.querySelector("#listaNotas");
    list.appendChild(li); 
}