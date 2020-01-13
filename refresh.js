'use strict';
$(document).ready(function () {
  // Inicializa la extensión
  tableau.extensions.initializeAsync({ 'configure':configure }).then(function () {
      refresh();
  }, function () { console.log('Error while Initializing: ' + err.toString()); });
});

function refresh() {
  // Obtiene la lista de hojas de trabajo y agrega cada una a la página web como botones.
  var time_interval = tableau.extensions.settings.get("timeInterval");

  if (time_interval == undefined) {
    time_interval = 120
    tableau.extensions.settings.set("timeInterval", time_interval);
  }

  $("#worksheets").text("time interval: " + time_interval);

  var ws = tableau.extensions.dashboardContent.dashboard.worksheets[0];
  ws.getDataSourcesAsync().then(datasources => {
    console.log(datasources[0])
    return datasources[0]
  }).then( ds => {
    console.log(ds)
    var counter = 0
    setInterval( () => {
        ds.refreshAsync().then(console.log('refreshed'))
        counter ++;
        $("#worksheets").text(counter);
    }, time_interval * 1000);

  });
}

// Esta función se encarga de hacer llamado a una ventana popup con el sitio definido
// en dialog.html
function configure() {
  const popupUrl=`${window.location.origin}/tableau-autorefresh/dialog.html`;
  let defaultPayload="";
  tableau.extensions.ui.displayDialogAsync(popupUrl, defaultPayload, { height:350, width:500 }).then((closePayload) => {
    location.reload();
  }).catch((error) => {
    switch (error.errorCode) {
      case tableau.ErrorCodes.DialogClosedByUser:
        console.log("Dialog was closed by user");
        break;
      default:
        console.error(error.message);
    }
  });
}