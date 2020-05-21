var idSelect = d3.select("#selDataset");

d3.json("samples.json").then((data) => {
    var data_name = data.names;
        data_name.forEach((name, index) => {
            var name_select = idSelect.append("option");
            name_select.text(name);
            name_select.attr("value",`${index}`); 
        });
        });

//Initialize bar graph

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


function initPanel() {
    d3.json("samples.json").then((data) => {
        
        //Grab metadata object
        
        var sample_keys = Object.keys(data.metadata[0]);
        var sample_values = Object.values(data.metadata[0]);


        var addList = d3.select("#sample-metadata");

        //  
        addList.html("");

        for (var i = 0; i < 7; i++) {
            var name_select = addList.append("ul");
            name_select.text(`${sample_keys[i]}: ${sample_values[i]}`);
        };

      });

};

initPanel();

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

  addList.html("");

        for (var i = 0; i < 7; i++) {
            var name_select = addList.append("ul");
            name_select.text(`${filtered_key[i]}: ${filtered_value[i]}`);
        };

})};