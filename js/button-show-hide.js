// Hardcoded variables
let pname = 'ShowFin';   // The name of the ShowFin parameter
let navFinButton = "navFinButton";


// Initialize the extension
tableau.extensions.initializeAsync().then(function() {

  updateVisibiliy();
  listen();

});


//-----------------------------------------------------------------------------------------------------

// Based on the above variables go through and get the dates from the data source, determine how to show them, and populate the parameter
function updateVisibiliy() {

  // Set the dashboard object
  const dashboard = tableau.extensions.dashboardContent.dashboard;
  
  // Look for the parameter named at the top
  dashboard.findParameterAsync(pname).then(function(parameter) {
    document.getElementById('dynamicparameter').value = parameter.currentValue.value;

    let navVisibilityObject = {}; 

    // Loop through the dashboard objects and look for the one named from the variable at the top
    tableau.extensions.dashboardContent.dashboard.objects.forEach(function(object) {
          
      if(navFinButton.includes(object.name)) {
        
        // Look for the value of the extension built object and update the visibility accordingly
        if(document.getElementById('dynamicparameter').value == "Show") {
          navVisibilityObject[object.id] = tableau.ZoneVisibilityType.Show;
        }
        else {
          navVisibilityObject[object.id] = tableau.ZoneVisibilityType.Hide;
        }
      }
    });

    // Apply the visibility setting
    tableau.extensions.dashboardContent.dashboard.setZoneVisibilityAsync(navVisibilityObject).then(() => {
    });
  });

}

// Listen for updates to the parameter dropdown
function listen() {

  // Set the dashboard object
  const dashboard = tableau.extensions.dashboardContent.dashboard;

  // Add a ParameterChanged event listener to the parameter
  dashboard.findParameterAsync(pname).then(function(parameter) {
    parameter.addEventListener(tableau.TableauEventType.ParameterChanged, updateVisibiliy);
  });

}
