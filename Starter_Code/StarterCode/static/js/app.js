const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function init() {


    let dropdownMenu = d3.select("#selDataset");

    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        
        let sample_names = data.names;

       
        sample_names.forEach((name) => {
            dropdownMenu.append("option").text(name).property("value", name);
        });

    let first_name = sample_names[0];

        demo(first_name);
        bar(first_name);
        bubble(first_name);
        gauge(first_name);
    });
}


function demo(selectedValue) {

    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        let metadata = data.metadata;
        let filteredData = metadata.filter((meta) => meta.id == selectedValue);
      
        
        let obj = filteredData[0]
        
        d3.select("#sample-metadata").html("");
  
    
        let entries = Object.entries(obj);
        
        
        entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

       
        console.log(entries);
    });
  }
  


function bar(selectedValue) {
    d3.json(url).then((data) => {

        console.log(`Data: ${data}`);

        let samples = data.samples;

    
        let filteredData = samples.filter((sample) => sample.id === selectedValue);

       
        let obj = filteredData[0];

        let yticks=obj.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse();
        console.log(yticks);
      
        let trace = [{
            
            x: obj.sample_values.slice(0,10).reverse(),
            y: yticks,
            text: obj.otu_labels.slice(0,10).reverse(),
            type: "bar",
            marker: {
                color: "royalblue"
            },
            orientation: "h"
        }];
        
       let barLayout = {
        title : "Top 10 Bacteria Cultures Found"
      };
        Plotly.newPlot("bar", trace,barLayout);
    });
}
  

function bubble(selectedValue) {
    
    d3.json(url).then((data) => {

      
        let samples = data.samples;
    
      
        let filteredData = samples.filter((sample) => sample.id === selectedValue);
    
       
        let obj = filteredData[0];
        
      
        let trace = [{
            x: obj.otu_ids,
            y: obj.sample_values,
            text: obj.otu_labels,
            mode: "markers",
            marker: {
                size: obj.sample_values,
                color: obj.otu_ids,
                colorscale: "Earth"
            }
        }];
    
        
        let layout = {
            title: "Bacteria Cultures Per Sample",
            xaxis: {title: "OTU ID"}
        };
    
      
        Plotly.newPlot("bubble", trace, layout);
    });
}

function gauge(selectedValue) {

    d3.json(url).then((data) => {
       
        let metadata = data.metadata;
        
        
        let filteredData = metadata.filter((meta) => meta.id == selectedValue);
      
        let obj = filteredData[0]

        
        
        var trace = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: obj.wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: {size: 24}},
            delta: { reference: 8, increasing: { color: "blue" } },
            type: "indicator", 
            mode: "gauge+number+delta",
            gauge: {
                axis: {range: [null, 9],tickmode: "linear",tickwidth: 1, tickcolor: "darkblue" }, 
                bar: { color: "green"},

                bgcolor: "white",
          
                borderwidth: 2,
          
                bordercolor: "gray",
                steps: [
                    {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
                    {range: [1, 2], color: "rgba(232, 226, 202, .5)"},
                    {range: [2, 3], color: "rgba(210, 206, 145, .5)"},
                    {range: [3, 4], color:  "rgba(202, 209, 95, .5)"},
                    {range: [4, 5], color:  "rgba(184, 205, 68, .5)"},
                    {range: [5, 6], color: "rgba(170, 202, 42, .5)"},
                    {range: [6, 7], color: "rgba(142, 178, 35 , .5)"},
                    {range: [7, 8], color:  "rgba(110, 154, 22, .5)"},
                    {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"}
                ],
                threshold: {

                    line: { color: "red", width: 4 },
            
                    thickness: 0.75,
            
                    value: 8.8
            
                  }  
            }
        }];

        var layout_g = { 
            width: 700, 
            height: 600, 
            margin: { t: 20, b: 40, l:100, r:100 } 
          };
         
         Plotly.newPlot("gauge", trace,layout_g);
    });
}


function optionChanged(selectedValue) {
    demo(selectedValue);
    bar(selectedValue);
    bubble(selectedValue);
    gauge(selectedValue)
}

init();