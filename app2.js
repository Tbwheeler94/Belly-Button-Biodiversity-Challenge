//Select test subject ID no. and assign to a dropdown
var idSelect = d3.select("#selDataset");

//Select json data file samples
d3.json("samples.json").then((data) => {
    
    //Navivate to the names array
    var data_name = data.names;

        //Iterate through each value in the array
        data_name.forEach((name, index) => {

            // Append option html tags to #selDataset
            var name_select = idSelect.append("option");

            // Add text to dropdown tags
            name_select.text(name);

            // Data-bind index value
            name_select.attr("value",`${index}`); 
        });
        });

//Create function for Bar Chart

function initBar() {
    d3.json("samples.json").then((data) => {
        
        //Grab data object
        var sample_object = Object.values(data.samples[0])

        //Grab bar values
        var grabx = sample_object[2]
        var slicex = grabx.slice(0, 10);
        var x_values = slicex.reverse()

        //Grab otu values
        var graby = sample_object[1]
        var slicey = graby.slice(0, 10);
        var y_values = slicey.reverse()

        //Map OTU items to string
        var y_axis = y_values.map(item => `OTU ${item}`)

        //Map hover labels
        var grabhover = sample_object[3]
        var slicehover = grabhover.slice(0, 10);
        var hover_values = slicehover.reverse()

        // Create trace
        var trace = {
          x: x_values,
          y: y_axis,
          text: hover_values,
          type: "bar",
          orientation: "h"
        };
      
        // Create the data array for our plot
        var data = [trace];
      
        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", data);
      });
};

initBar();

// Creation function for Bubble chart

function initBubble() {
    d3.json("samples.json").then((data) => {
        
        //Grab data object
        var sample_object = Object.values(data.samples[0])

        //Grab bar values
        var grabx = sample_object[1]

        //Grab otu values
        var graby = sample_object[2]

        //Markers
        var markersize = sample_object[2]

        //Colors
        var colors = sample_object[1]

        //Hover labels
        var labels = sample_object[3]

        // Create trace
        var trace = {
          x: grabx,
          y: graby,
          text: labels,
          mode: "markers",
          marker: {
              size: markersize,
              color: colors
          }
        };

        var layout = {
            xaxis: {title: "OTU ID"},
        }
      
        // Create the data array for our plot
        var data = [trace];
      
        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bubble", data, layout);
      });
}

initBubble();

// Create default display in Demographic Info Panel

function initPanel() {
    d3.json("samples.json").then((data) => {
        
        //Grab keys and values from first object in the array
        var sample_keys = Object.keys(data.metadata[0]);
        var sample_values = Object.values(data.metadata[0]);

        //Select demographic info panel
        var addList = d3.select("#sample-metadata");

        //Loop through 7 values, append keys and values to an unordered list
        for (var i = 0; i < 7; i++) {
            var name_select = addList.append("ul");
            name_select.text(`${sample_keys[i]}: ${sample_values[i]}`);
        };

      });

};

initPanel();

// Create default display panel which updates when new value is selected

idSelect.on("change", optionChanged);

  function optionChanged () {
  
  // Select number value from dropdown
  var dataset_selected = idSelect.property('value');

  // Grab json file
  d3.json("samples.json").then((data) => {
        
  //Filter data based on dataset_selected
  filtered_key = Object.keys(data.metadata[dataset_selected]);
  filtered_value = Object.values(data.metadata[dataset_selected]);

  var addList = d3.select("#sample-metadata");

  //Clear existing values in panel
  addList.html("");

        //Loop through 7 items in arrays, append keys and values to an unordered list
        for (var i = 0; i < 7; i++) {
            var name_select = addList.append("ul");
            name_select.text(`${filtered_key[i]}: ${filtered_value[i]}`);
        };

})};