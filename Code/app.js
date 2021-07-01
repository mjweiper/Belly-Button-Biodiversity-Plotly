// Use d3.json() to fetch data from samples.JSON file
d3.json("samples.json").then(function(data) {
    console.log(data);

    var values = data.samples[0].sample_values.slice(0,10).reverse();
    console.log(values)
    var labels = data.samples[0].otu_labels.slice(0,10);
    console.log(labels)
    var hovertext = data.samples[0].otu_ids;
    console.log(hovertext);
    var bubble_x = data.samples[0].otu_ids;
    var bubble_y = data.samples[0].sample_values;
    var text1 = data.samples[0].otu_labels;

    // Create array for top 10 otu ids per id , reversing (use map)
    var otu_top10 = data.samples[0].otu_ids.slice(0,10).reverse();
    var new_array = otu_top10.map(function(el){
        return 'OTU' + el;
    });

    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
    var trace1 = {
        x: values,
        y: new_array,
        text: hovertext,
        type: "bar",
        orientation: "h",
    };

    var data= [trace1];

Plotly.newPlot("bar", data);

    // Create a bubble chart that displays each sample
    var trace2 = {
        x: bubble_x,
        y: bubble_y,
        mode: "markers",
        marker: {
            color: hovertext,
            size: bubble_y,
       },
            
        text: text1,
    };
    var layout2 = {
        title: "Bacteria Cultures Per Sample",
        xaxis: {title: "OTU ID"}
    };

    var data2 = [trace2];

Plotly.newPlot("bubble", data2, layout2);

});




