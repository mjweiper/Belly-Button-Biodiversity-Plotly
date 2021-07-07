function Plots(sample) {
    // Use d3.json() to fetch data from samples.JSON file
    d3.json("samples.json").then((data) => {
        //console.log(data);

        //var values = data.samples[0].sample_values.slice(0,10).reverse(); ##TEST
        var samples = data.samples;
        var plotinfo = samples.filter(sampleObject => sampleObject.id == sample);
        var specific = plotinfo[0];
        var values = specific.sample_values;
        //console.log(values)
        var hovertext = specific.otu_labels;
        //console.log(hovertext)
        var labels = specific.otu_ids;
        //console.log(labels);
       
        
        // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
         // Create array for top 10 otu ids per id , reversing (use map)
        var trace1 = {
            x: values.slice(0,10).reverse(),
            y: labels.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
            text: hovertext.slice(0,10).reverse(),
            type: "bar",
            orientation: "h",
        };

        var layout1 = {
            title: "Top 10 Bacteria Cultures Found",
        };
        var data= [trace1];

    Plotly.newPlot("bar", data, layout1);

        // Create a bubble chart that displays each sample
        var trace2 = {
            x: labels,
            y: values,
            mode: "markers",
            marker: {
                color: labels,
                size: values,
            },
                
            text: hovertext,
        };

        var layout2 = {
            title: "Bacteria Cultures Per Sample",
            xaxis: {title: "OTU ID"}
        };

        var data2 = [trace2];

    Plotly.newPlot("bubble", data2, layout2);

    });
}

    // Display the sample metadata, i.e., an individual's demographic infromation ( Do same way with PLOTS)

function Demographics(sample) {
    
    d3.json("samples.json").then((data) => {
        var metadata= data.metadata;
        var info = metadata.filter(sampleObject => sampleObject.id == sample);
        var demo = info[0];
        var demographicInfo = d3.select("#sample-metadata");

        //reset info 
        demographicInfo.html("");

        Object.entries(demo).forEach(([key,value]) => {
            demographicInfo.append("h6").text(`${key}: ${value}`);
        });
        
    }); 

}

// New demoinfo
function optionChanged(sample) {
    Plots(sample);
    Demographics(sample);
}

// Update all of the plots any time thata new sample is selected
function init() {
        var dropdown = d3.select("#selDataset");

        d3.json("samples.json").then((data) => {
            var ids = data.names;
            ids.forEach(function(sample) {
            dropdown.append("option").text(sample).property("value", sample);

            });

            Plots(ids[0]);
            Demographics(ids[0]);
        
        });
}
init();




