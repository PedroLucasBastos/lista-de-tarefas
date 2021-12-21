
function mudarOpcao(e) {
    var btnAddTarefa = document.getElementById('btnAddTarefa');
    var adicaoTarefa = document.getElementById('adicaoTarefa');
    if (btnAddTarefa.onclick != true) {
        btnAddTarefa.parentNode.removeChild(btnAddTarefa);
        adicaoTarefa.style.display = 'block';
    }
}
