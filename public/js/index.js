//funções
function addNota(btnAdicionar) {
    const descricao = document.querySelector("#input-descricao").value;
    var adicaoTarefa = document.getElementById('adicaoTarefa');
    var btnAddTarefa = document.getElementById('btnAddTarefa');
    if ((descricao) && (btnAdicionar == 1)) {
        //clona o tamplate
        const template = document.querySelector(".template");
        const novaNota = template.cloneNode(true);

        //adiciona nota 
        novaNota.querySelector(".corpoNota2 p").textContent = descricao;

        //removendo coisas desnecessarias
        novaNota.classList.remove("template");
        novaNota.classList.remove("hide");

        // adicionar nota na lista
        const list = document.querySelector("#listaNotas");
        list.appendChild(novaNota);


        //volta para o botao anteriores
        btnAddTarefa.style.display = 'flex';
        adicaoTarefa.style.display = 'none';

        //concluir tarefa 
        const btnConcluir = novaNota.querySelector(".itens").addEventListener("click", function (e) {

            console.log(status);
            concluirNota(this);
        });

    } if ((descricao == "") && (btnAdicionar == 1)) {
        alert("Não é possivel criar uma nota vazia!");
    }
}

function mudarOpcao(e) {
    var btnAddTarefa = document.getElementById('btnAddTarefa');
    var adicaoTarefa = document.getElementById('adicaoTarefa');
    if (btnAddTarefa.onclick != true) {
        btnAddTarefa.style.display = 'none';
        adicaoTarefa.style.display = 'block';
    }
}

function concluirNota(nota) {
    const notaCompleta = nota.parentNode;

    notaCompleta.classList.toggle("concluido");
}

//___________________________________________________________________
const btnAdicionar = document.querySelector("#submit-Adicionar");

btnAdicionar.addEventListener("click", function (e) {
    e.preventDefault(); // vai precisar remover isso na hora de salvar no navegador
    if (btnAdicionar.onclick = ! true) {
        var verificaClick = 0;
    } else {
        var verificaClick = 1;
    }
    addNota(verificaClick);
})










/*function addNota() {

    const btn = document.querySelector("#submit-Adicionar");
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        const inputDescricao = document.querySelector("#input-descricao");

        const value = inputDescricao.value;

        var novaNota = document.createElement("p");
        var nota = document.createTextNode(value);
        novaNota.appendChild(nota);

        var notas1 = document.querySelector(".corpoNota1");

        notas1.appendChild(novaNota);
        console.log(notas1);
    })

}*/
