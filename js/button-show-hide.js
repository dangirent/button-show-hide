
// Setup some variable
let finNav = "Financial Summary Button";
let pFinName = "ShowFin";
let navVisibilityObject = {}; 
let pShowFin = "";

tableau.extensions.initializeAsync().then(function() {

  const dashboard = tableau.extensions.dashboardContent.dashboard;
  dashboard.findParameterAsync(pFinName).then(function(Parameter) {
    pShowFin = Parameter.currentValue.value;
    updateVis(pShowFin);
  });

  

});

function updateVis(pShowFinp) {

    tableau.extensions.dashboardContent.dashboard.objects.forEach(function(object) {

    if(finNav.includes(object.name)) {
      if(pShowFin == "Show") {
        navVisibilityObject[object.id] = tableau.ZoneVisibilityType.Show;
      }
      if(pShowFin == "Hide") {
        navVisibilityObject[object.id] = tableau.ZoneVisibilityType.Hide;
      }
    }
  });

  // Apply the default setting
  tableau.extensions.dashboardContent.dashboard.setZoneVisibilityAsync(navVisibilityObject).then(() => {
    console.log("Updated");
  });

}
