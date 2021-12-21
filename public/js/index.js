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
        novaNota.querySelector("#corpoNota p").textContent = descricao;

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
    //aqui é onde ocorre a mudança do cabecalho e do rodapé
    document.getElementById('btnConcluir').setAttribute("src", "public/assets/checked.png");
    document.getElementById('status').innerText = "Concluido";
    document.getElementById('cabecalhoNota').style.color = "#2b5a07";
    document.getElementById('cabecalhoNota').style.backgroundColor = "#b8ff99";
    document.getElementById('corpoNota').style.textDecoration = "line-through";
    document.getElementById('feito').setAttribute("src", "public/assets/archive-color.png")

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
