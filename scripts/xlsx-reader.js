/**
 *  --- IMPORTANT ---
 * Script 'xlsx.core.min.js' must already be loaded; this supplies the
 * XLSX utilities for converting uploaded binaries into readable data.
 * 
 * This script utilizes the XMLHttpRequest to bypass use of <input type="file" />
 * for FileReader() --- argument for this is a blob instead of a filename
 * 
 * Thanks to:
 * https://www.c-sharpcorner.com/article/reading-a-excel-file-using-html5-jquery/
 * For supplying an easy-to-understand-and-apply website on FileReader for XLSX
 * 
 * @fileoverview Notes on procedure: 
 *  There are four 'views' presented: MAIN View (Whole Earth Span),
 *  EON View, ERA View, and PERIOD View. In each view there are three 
 *  distinct pieces:
 *    1) timeline blocks containing, one or more 'boxes'); 
 *    2) timeline charts of events corresponding to the box, and 
 *    3) timeline tables - an expanded text version of the chart.
 *  Each piece has its own JSON object defining the parameters used to 
 *  populate the DOM. Each object is formed/updated from an Excel
 *  spreadsheet as identified below. To keep from entering objects with
 *  duplicate data, timeline chart endpoints and tables are derived from
 *  the shapes data (timelime blocks), which contains each shape's 
 *  time boundaries and event list.
 * @author Ken Cowles
 * @version 1.0
 */
// Chart paramters:
var chart_setup = "chart.xlsx";
var chartParms = [];
var parmObj = {};
// Chart & Table Events:
var events = "events.xlsx";
var eventSets = {};
var currBox = '';
var obj_key;
var event_member = {};
// Shapes:
var shapes = "shapes.xlsx";
var eonShapes = {};
var eraShapes = {};
var periodShapes = {};
var epochShapes = {};
var shapeName = '';
var shapeBox = '';
var shape = {};
// Establish display data
var chartDef = $.Deferred();
updateObject(chart_setup, chartDef);
var eventDef = $.Deferred();
updateObject(events, eventDef);
var shapeDef = $.Deferred();
updateObject(shapes, shapeDef);

/**
 * This function establishes data for main.js by reading the associated
 * Excel workbook and extracting key information.
 * 
 * @param {string}         xlsx_file file.xlsx
 * @param {JQueryDeferred} deferred  asynchronous promise
 * 
 * @returns {null}
 */
function updateObject(xlsx_file, deferred) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', xlsx_file, true);
    xhr.responseType = 'blob'; // this allows capturing the file contents as a js blob object
    xhr.onload = function(ev) {
        if (this.status == 200 || this.status == 304) {
            var xl_blob = this.response;
            reader = new FileReader();
            reader.readAsArrayBuffer(xl_blob);
            reader.onload = function (e) {  
                var data = e.target.result;  
                // Converts the excel data in to object 
                var workbook = XLSX.read(data, { type: 'binary' });  
                // Gets all the sheetnames of excel in to a variable
                var sheet_name_list = workbook.SheetNames;
                // This is used for restricting the script to consider only first sheet of excel
                var cnt = 0; 
                sheet_name_list.forEach(function (y) { // Iterate through all sheets 
                    // Convert the cell values of the sheet to JSON  
                    var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);  
                    if (exceljson.length > 0 && cnt == 0) {  
                        BindTable(exceljson, '#exceltable', xlsx_file, deferred);  
                        cnt++;  
                    }  
                });    
            }  
        } else {
            alert("Trouble reading " + xlsx_file);
        }
    };
    xhr.send();
    return;
}
/**
 * This function will convert Excel jsondata to html 
 * 
 * @param {JSON}           jsondata  data obtained from Excel workbook
 * @param {string}         tableid   html table for section
 * @param {string}         chartname to be applied to chart
 * @param {JQueryDeferred} deferred  promise
 * 
 * @returns {null}
 */ 
function BindTable(jsondata, tableid, chartname, deferred) {
    // Gets all the column headings of Excel:
    var columns = BindTableHeader(jsondata, tableid);
    // Every jsondata item is a row of the table:
    for (var i = 0; i < jsondata.length; i++) {  
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {  
            var cellValue = jsondata[i][columns[colIndex]];  
            if (cellValue == null) {
                cellValue = "";
            }
            var data = cellValue.trim();
            // set up JSON objects depending on spreadsheet name:
            if (chartname == chart_setup) {
                convertToParms(colIndex, data);  
            } else if (chartname === events) {
                convertToEvents(colIndex, data);
            } else if (chartname === shapes) {
                convertToShapes(colIndex, data);
            }
        }
    }
    deferred.resolve();
    return;  
} 
/**
 * Get all column names from JSON and bind the html table header:
 *
 * @param {JSON}   jsondata Excel data from workbook
 * @param {string} tableid  html table id
 * 
 * @returns {string[]} columnSet 
 */
function BindTableHeader(jsondata, tableid) {  
    var columnSet = [];  
    var headerTr$ = $('<tr/>');  
    for (var i = 0; i < jsondata.length; i++) {  
        var rowHash = jsondata[i];  
        for (var key in rowHash) {  
            if (rowHash.hasOwnProperty(key)) { 
                // Adding each unique column name to a variable array 
                if ($.inArray(key, columnSet) == -1) {  
                    columnSet.push(key);  
                    headerTr$.append($('<th/>').html(key));  
                }  
            }  
        }  
    }  
    $(tableid).append(headerTr$);  
    return columnSet;  
}
/**
 * Convert the data to a parm object and push onto chartParms
 * 
 * @param {number} xl_column column number in spreadsheet
 * @param {string} parm      parameter to be added
 * 
 * @returns {null}
 */
function convertToParms(xl_column, parm) {
    if (xl_column === 0) {
        parmObj.ticks = parm;
    } else if (xl_column === 1) {
        parmObj.evId = parm;
    } else if (xl_column === 2) {
        parmObj.title = parm;
    } else if (xl_column === 3) {
        parmObj.color = parm;
    } else if (xl_column === 4) {
        parmObj.adder = parm;
        /* Can't push the object directly onto the array, since only a 'reference'
         * to the object gets pushed, and changing the object then changes
         * everything in the array...
         */
        chartParms.push(JSON.parse(JSON.stringify(parmObj)));
    }
    return;
}
/**
 *  Convert the data to an event object and add to eventSets
 * 
 * @param {number} xl_column Column number on the spreadsheet
 * @param {string} ev_data   data for event
 * 
 * @returns {null}
 */
function convertToEvents(xl_column, ev_data) {
    // Note: times and marker labels may be repeated in .xlsx file
    if (xl_column === 0) {
        if (ev_data !== currBox) {
            // set the object's key (whose value is an array)
            obj_key = ev_data;
            eventSets[obj_key] = [];
            currBox = ev_data;
        }
    } else if (xl_column === 1) {
        event_member.x = ev_data;
    } else if (xl_column === 2) {
        event_member.mrkr = ev_data;
    } else if (xl_column === 3) {
        event_member.des = ev_data;
        eventSets[obj_key].push(JSON.parse(JSON.stringify(event_member)));
    }
    return;
}
/**
 * Convert the data to a shape object and add to section's Shape object
 * @param {number} xl_column column number in spreadsheet
 * @param {string} shape_dat name of shape
 * 
 * @returns {null}
 */
function convertToShapes(xl_column, shape_dat) {
    if (xl_column === 0) {
        if (shape_dat !== shapeName) {
            shapeName = shape_dat;
        }
    } else if(xl_column === 1) {
        if (shape_dat !== shapeBox) {
            shapeBox = shape_dat;
            switch(shapeName) {
                case "era":
                    eraShapes[shapeBox] = [];
                    break;
                case "period":
                    periodShapes[shapeBox] = [];
                    break;
                case "epoch":
                    epochShapes[shapeBox] = [];
            }
        }   
    } else if(xl_column === 2) {
        shape.left = shape_dat;
    } else if(xl_column === 3) {
        shape.right = shape_dat;

    } else if (xl_column === 4) {
        shape.color = shape_dat;
        switch(shapeName) {
            case "eon":
                eonShapes[shapeBox] = JSON.parse(JSON.stringify(shape));
                break;
            case "era":
                eraShapes[shapeBox].push(JSON.parse(JSON.stringify(shape)));
                break;
            case "period":
                periodShapes[shapeBox].push(JSON.parse(JSON.stringify(shape)));
                break;
            case "epoch":
                epochShapes[shapeBox].push(JSON.parse(JSON.stringify(shape)));
                break;
            default:
                console.log("convertToShapes shapeName unrecognized");
        }
    }
    return;
}
/* the jQuery file upload, which requires the extra step of setting up
 * 'Transport' for binary data uploads:
 * https://www.henryalgus.com/reading-binary-files-using-jquery-ajax/
 * 
// use this transport for "binary" data type
$.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
    // check for conditions and support for blob / arraybuffer response type
    if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob)))))
    {
        return {
            // create new XMLHttpRequest
            send: function(headers, callback){
		// setup all variables
                var xhr = new XMLHttpRequest(),
		url = options.url,
		type = options.type,
		async = options.async || true,
		// blob or arraybuffer. Default is blob
		dataType = options.responseType || "blob",
		data = options.data || null,
		username = options.username || null,
		password = options.password || null;
					
                xhr.addEventListener('load', function(){
			var data = {};
			data[options.dataType] = xhr.response;
			// make callback and send data
			callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                });
 
                xhr.open(type, url, async, username, password);
				
		// setup custom headers
		for (var i in headers ) {
			xhr.setRequestHeader(i, headers[i] );
		}
				
                xhr.responseType = dataType;
                xhr.send(data);
            },
            abort: function(){
                jqXHR.abort();
            }
        };
    }
});
$.ajax({
    url: chart_setup,
    type: 'GET',
    dataType: 'binary',
    processData: false,
    success: function(result) {
        alert("Ajaxed in");
    }

});
*/
