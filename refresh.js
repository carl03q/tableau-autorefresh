'use strict';
$(document).ready(function () {
  // Inicializa la extensión
  tableau.extensions.initializeAsync().then(function () {
      refresh();
  }, function () { console.log('Error while Initializing: ' + err.toString()); });
});

function refresh() {
  // Obtiene la lista de hojas de trabajo y agrega cada una a la página web como botones.
  $("#worksheets").text("a");

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
    }, 10 * 1000);

  });
}