tableau.extensions.initializeAsync().then(function() {
    tableau.extensions.dashboardContent.dashboard.objects.forEach(function(object){
        console.log(object.name + ":" + object.type + ":" + object.id + ":" + object.isVisible);
      });

    let navZone = ["Navigation"];
    let extensionName = ["LogixReports Button Show/Hide"]; 
    let extensionVisibilityObject = {};
    let navVisibilityObject = {}; 

    tableau.extensions.dashboardContent.dashboard.objects.forEach(function(object){
      if(extensionName.includes(object.name)){
        extensionVisibilityObject[object.id] = tableau.ZoneVisibilityType.Hide;
      }
      else if(navZone.includes(object.name)){
        navVisibilityObject[object.id] = tableau.ZoneVisibilityType.Hide;
        extensionVisibilityObject[object.id] = tableau.ZoneVisibilityType.Hide;
      }
    });  

    tableau.extensions.dashboardContent.dashboard.setZoneVisibilityAsync(extensionVisibilityObject).then(() => {
      console.log("done");
    }).then(()=>{
      worksheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(ws => ws.name === "State Map");
      worksheet.addEventListener(tableau.TableauEventType.MarkSelectionChanged, selection)
    })

    function selection(data) {
      data.getMarksAsync().then(marks => {
          if (marks.data[0].data.length === 1) {
            togglenavVisibility(tableau.ZoneVisibilityType.Show);
          } else {
            togglenavVisibility(tableau.ZoneVisibilityType.Hide); 
          }
      })
  }

  function togglenavVisibility(visibility) {
    for(let key in navVisibilityObject) {
      navVisibilityObject[key] = visibility;
    }
    tableau.extensions.dashboardContent.dashboard.setZoneVisibilityAsync(navVisibilityObject).then(() => {
      console.log("done");
    });
  }

  });