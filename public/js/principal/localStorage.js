// MANIPULAÇÃO DO LOCAL STORAGE
function salvarNoStorage(){
    window.localStorage.setItem('listaDeTarefas', JSON.stringify(this.listaDeTarefa));
}

function carregarStorage(){
    let listaDeTarefas = JSON.parse(window.localStorage.getItem('listaDeTarefas') || []);
    //console.log(listaDeTarefas);
    return listaDeTarefas;    
}


