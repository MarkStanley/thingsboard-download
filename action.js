// Download action button for community edition of Thingsboard 
// -  generates a CSV file of the data in a time series table or chart
//    for a single device (with 1 or more fields)

// Written by Mark Stanley, Oct 2022
// https://thingitude.com

// USE ENTIRELY AT YOUR OWN RISK.

// To use...
// Create a "custom action" in your widget with a widget header button.
// Paste this code into the custom action text box.

if (widgetContext.data) {
    // lets get the labels
    let totalLabels=widgetContext.data.length;
    var labels=["date","time"];
    var thisLabel;
    for(thisLabel=0;thisLabel<totalLabels;thisLabel++) {
        labels.push(widgetContext.data[thisLabel].dataKey.label);
    }
    console.log(labels);
    // now lets build the rows of data
    const totalRows=widgetContext.data[0].data.length;
    console.log("Total rows: "+totalRows);
    var rows=[];
    var rowNum=0;
    var fieldNum=0;
    for (rowNum=0;rowNum < totalRows; rowNum++) {
        // Add timestamp
        rows[rowNum]=[widgetContext.data[0].data[rowNum][0]];
        // Add data field(s)
        for(fieldNum=0; fieldNum < totalLabels; fieldNum++) {
            rows[rowNum].push(widgetContext.data[fieldNum].data[rowNum][1].toFixed(2));
        }
    }
    
    setTimeout(function() {
        widgetContext.dialogs.alert("Download", 
        ""+totalRows+" rows of data have been downloaded.")
        .subscribe();
    }, 100);


    createCSV(rows,labels);
}

function createCSV(rows,labels) {
    //generate the csv formatted data
    let csvContent = "data:text/csv;charset=utf-8,";
    // add labels as the header
    let header=labels.join();
    csvContent +=header +"\r\n";
    
    // now add the data as the body
    let numRows=rows.length;
    var thisRow;
    for(thisRow=0; thisRow<numRows; thisRow++) {
        let stamp=new Date(rows[thisRow][0]);
        rows[thisRow][0]=stamp.toLocaleString();
        let currentRow=rows[thisRow].join();
        csvContent += currentRow +"\r\n";
    }
    
    //now publish it
    var encodedUri = encodeURI(csvContent);
    const now=new Date();
    var filename="dash-"+now.toISOString()+".csv";
    var dl = document.createElement('a');
    dl.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodedUri);
    dl.setAttribute('download', filename);
    dl.click();
    
}
