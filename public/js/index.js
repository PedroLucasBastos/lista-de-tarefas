function criarLi(){
    const list = document.querySelector("#listaNotas");
    let li = document.createElement('li');

}

class Tarefa {
    constructor(cor_corpo, finalizado, arquivado, desc) {
        this.cor_corpo = cor_corpo;
        this.finalizado = finalizado;
        this.arquivado = arquivado;
        this.descricao = desc;
    }
}
//window.onload = carregarTarefas();
// ================= Manipulação do DOM ==========================================
function agrVai(){
    const list = document.querySelector("#listaNotas");
    list.appendChild(criarLi());
   
}
function criarLi(novaTarefa){
    let li = document.createElement('li');
    let div = document.createElement('div');
    div.setAttribute('id','coporInteiro');
    div.setAttribute('class','cartaoDeTarefa');
    
    div.appendChild(criarHeader());
    div.appendChild(criarMain());
    div.appendChild(criarFooter());
    
    li.appendChild(div);
    return li;
}
function criarHeader(){
    let header = document.createElement('header');
    let div = document.createElement('div');
    let img = document.createElement('img');
    let p = document.createElement('p');
    header.setAttribute('id','cabecalho1');
    header.setAttribute('class','cabecalhoNota');

    div.setAttribute('class','itens');
    img.setAttribute('id','btnConcluir');
    img.setAttribute('src','public/assets/unchecked.png');
    img.setAttribute('onclick','mudarStatus()');

    p.setAttribute('id','status');
    p.innerText = 'Não concluido';

    div.appendChild(img);
    div.appendChild(p);

    header.appendChild(div);
    return header;   
}
function criarMain(){
    let main = document.createElement('main');
    let p = document.createElement('p');

    main.setAttribute('id','parteDeTexto');
    main.setAttribute('class','corpoNota');

    p.innerText = 'Manipulação semi automática com js';

    main.appendChild(p);
    return main;
}
function criarFooter(){
    let footer = document.createElement('footer');
    let img1 = document.createElement('img');
    let img2 = document.createElement('img');

    footer.setAttribute('class','rodapeNota');
    img1.setAttribute('class','feito');
    img2.setAttribute('class','apagar');

    img1.setAttribute('id','feito');
    img2.setAttribute('id','apagar');

    img1.setAttribute('src','public/assets/archive-gray-scale.png');
    img2.setAttribute('src','public/assets/trash-gray-scale.png');

    footer.appendChild(img1);
    footer.appendChild(img2);

    return footer;
}


// ================= FIM ==========================================
function criarTask(){
    const list = document.querySelector("#listaNotas");
    const template = document.querySelector(".template");
    const novaNota = template.cloneNode(true);
    
    novaNota.querySelector(".corpoNota p").innerText = "Novo parado";

    const cabecalho = novaNota.querySelector("#cabecalhoNota");
    const status = novaNota.querySelector("#status");
    const btnConcluir = novaNota.querySelector("#btnConcluir");

    novaNota.classList.remove("template");
    novaNota.classList.remove("hide");

        
    cabecalho.style.color = "#2b5a07";
    cabecalho.style.backgroundColor = "#b8ff99";
    status.innerText = "Concluido";
    btnConcluir.setAttribute("src", "public/assets/checked.png"); 
    
    console.log(novaNota);
    
    list.appendChild(novaNota); 
}


function carregarTarefas(){
    let listaDeTarefas = carregarStorage();
    if(listaDeTarefas !== undefined){
         //clona o template
         const template = document.querySelector(".template");
         const notaNova = template.cloneNode(true);
         console.log(notaNova);

         for(i=0; i<listaDeTarefas.length; i++){
            tarefaAtual = listaDeTarefas[i];
            //console.log(tarefaAtual);
            //console.log(notaAtual);
            notaNova.querySelector("#notas").style.backgroundColor = tarefaAtual.cor_corpo;
            notaNova.querySelector("#corpoNota p").innerText = tarefaAtual.descricao;
            if(tarefaAtual.finalizado === true){

                console.log(tarefaAtual.finalizado);
                console.log(tarefaAtual.finalizado === true);
                console.log(tarefaAtual.descricao);
                const cabecalho = notaNova.querySelector("#cabecalhoNota");
                const status = notaNova.querySelector("#status");
                const btnConcluir = notaNova.querySelector("#btnConcluir");
                
                cabecalho.style.color = "#2b5a07";
                cabecalho.style.backgroundColor = "#b8ff99";
                status.innerText = "Concluido";
                btnConcluir.setAttribute("src", "public/assets/checked.png"); 
            }
            
            notaNova.classList.remove("template");
            notaNova.classList.remove("hide");

            // adicionar nota na lista
            const list = document.querySelector("#listaNotas");
            list.appendChild(notaNova);
         }
    }
}

function atualizarTemplates(novaNota,tarefa){
    novaNota.querySelector("#notas").style.backgroundColor = tarefa.cor_corpo;
    novaNota.querySelector("#corpoNota p").innerText = tarefa.descricao;
    if(tarefa.finalizado === true){
        console.log(tarefa);
        const cabecalho = novaNota.querySelector("#cabecalhoNota");
        const status = novaNota.querySelector("#status");
        const btnConcluir = novaNota.querySelector("#btnConcluir");
        
        cabecalho.style.color = "#2b5a07";
        cabecalho.style.backgroundColor = "#b8ff99";
        status.innerText = "Concluido";
        btnConcluir.setAttribute("src", "public/assets/checked.png"); 
    }
    return novaNota;
}


// ================= CARTÃO ======================================================
let cor_corpo;
function selecionarCor(str_cor){
    let listaDeCores = [
        {id:'0',css_id:'liAzul',cor:'#daf5fa'},
        {id:'1',css_id:'liVerde',cor:'#d1fecb'},
        {id:'2',css_id:'liRosa', cor:'#f6d0f3'},
        {id:'3',css_id:'liRoxo', cor:'#dcd0f3'},
        {id:'4',css_id:'liAmarelo', cor:'#fcfccb'},
        {id:'5',css_id:'liLaranja', cor:'#fbd4b4'},
        {id:'6',css_id:'liBranco', cor:'#ffffff'},
    ]
    for(let cor of listaDeCores){
        if(cor.id === str_cor){
            cor_corpo = cor.cor;
            /*
                console.log(cor.css_id);
                document.getElementById('notas').style.backgroundColor = cor.cor;
                console.log(document.getElementById('notas'));
             */
        }
    }
    console.log(cor_corpo);
}

function concluirTarefa(){
    const cabecalho = document.getElementById('cabecalhoNota');
    const status = document.getElementById('status');
    const btnConcluir = document.getElementById('btnConcluir');

    cabecalho.style.color = "#2b5a07";
    cabecalho.style.backgroundColor = "#b8ff99";

    status.innerText = "Concluido";

    btnConcluir.setAttribute("src", "public/assets/checked.png");
}



// ================= LOCAL STORAGE ===============================================
function salvarNoStorage(novaTarefa){
    var listaDeTarefas = carregarTarefa();
    listaDeTarefas.push(novaTarefa);
    window.localStorage.setItem('listaDeTarefas', JSON.stringify(listaDeTarefas));
}

function carregarStorage(){
    let listaDeTarefas = JSON.parse(window.localStorage.getItem('listaDeTarefas') || []);
    //console.log(listaDeTarefas.length);
    return listaDeTarefas;    
}


function deletarNoStorage(){

}

function salvamentoTeste(){
    let novaTarefa1 = new Cartao('#dcd0f3',true,false,'Primeira terafa do dia');
    let novaTarefa2 = new Cartao('#d1fecb',false,false,'Segunda terafa do dia');
    let listaDeTarefas = [novaTarefa1,novaTarefa2];
    
    window.localStorage.setItem('listaDeTarefas', JSON.stringify(listaDeTarefas));
}