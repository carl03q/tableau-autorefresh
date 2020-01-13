'use strict';
 
(function () {
 
    $(document).ready(function () {
        // Al inicializar el la ventanda de dialog llamamos la función buildDialog
        tableau.extensions.initializeDialogAsync().then(function (openPayload) {
            buildDialog();
        });
    });
 
    // Obtenemos datos del libro de tableau para armar un menú de configuraciones.
    function buildDialog() {
        var val = tableau.extensions.settings.get("timeInterval")
        console.log(val)
        if (val != undefined){
            $("#timeInterval").val(val);    
        }
        
        $('#cancel').click(closeDialog);
        $('#save').click(saveButton);
    }
 
    function closeDialog() {
        tableau.extensions.ui.closeDialog("10");
    }
 
    // Agregamos los valores configurados a nuestro libro de trabajo. 
    function saveButton() {
        // El formato para agregar configuraciones es nombre del parámetro, valor
        tableau.extensions.settings.set("timeInterval", $("#timeInterval").val());
 
        tableau.extensions.settings.saveAsync().then((currentSettings) => {
            tableau.extensions.ui.closeDialog("10");
        });
    }
})();