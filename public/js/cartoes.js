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