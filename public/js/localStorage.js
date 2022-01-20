class Cartao {
    constructor(cor_corpo, finalizado, arquivado, desc) {
        this.cor_corpo = cor_corpo;
        this.finalizado = finalizado;
        this.arquivado = arquivado;
        this.descricao = desc;
    }
}
// ================================================================
function salvamentoTeste(){
    let novoCartao1 = new Cartao('#dcd0f3',true,false,'Primeira terafa do dia');
    let novoCartao2 = new Cartao('#d1fecb',false,false,'Segunda terafa do dia');
    let listaDeTarefas = [novoCartao1,novoCartao2];
    
    window.localStorage.setItem('listaDeTarefas', JSON.stringify(listaDeTarefas));
}
function salvarTarefa(){
    
}

function carregarTarefa(){
    let listaDeTarefas = JSON.parse(window.localStorage.getItem('listaDeTarefas') || []);
    console.log(listaDeTarefas);
    
}
window.onload = carregarTarefa();

function deletarTarefa(){

}
