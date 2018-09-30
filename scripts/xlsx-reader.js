/*  --- IMPORTANT ---
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
 * Notes on procedure: 
 *  There are two distinct areas on the web page: timeline blocks and
 *  timeline charts. Each has its own JSON object defining the parameters
 *  used to created the page. Each object is formed/updated from an Excel
 *  spreadsheet as identified below. To keep from forming objects with
 *  duplicate data, timeline charts endpoints are derived from the shapes
 *  data (timelime blocks), which contains each shape's time boundaries.
 */
var xl_Imported_Timelines = [];
// For charts:
var event_chart = "chart.xlsx";
// obj definition (irrelevant values)
var geo_obj = {ticks:0, setNo:0, title:'', color:'allcharts', adder:''};
// For shapes:
var shapes = "ageShapes.xlsx";
updateObject(event_chart);

function updateObject(xlsx_file) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', xlsx_file, true);
    xhr.responseType = 'blob'; // this allows capturing the file contents as a js blob object
    xhr.onload = function(ev) {
        if (this.status == 200) {
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
                    // Convert the cell value to Json  
                    var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);  
                    if (exceljson.length > 0 && cnt == 0) {  
                        BindTable(exceljson, '#exceltable', xlsx_file);  
                        cnt++;  
                    }  
                });  
                $('#exceltable').show();  
            }  
        }
    };
    xhr.send();
}
// Function used to convert the JSON array to Html Table:  
function BindTable(jsondata, tableid, chartname) {
    // Gets all the column headings of Excel:
    var columns = BindTableHeader(jsondata, tableid);
    // Every jsondata item is a row of the table:
    for (var i = 0; i < jsondata.length; i++) {  
        var row$ = $('<tr/>'); 
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {  
            var cellValue = jsondata[i][columns[colIndex]];  
            if (cellValue == null) {
                cellValue = "";
            }
            var data = cellValue.trim();
            // set up JSON objects depending on spreadsheet name:
            if (chartname == event_chart) {
                convertToEvents(colIndex, data);
            } else if (chartname === shapes) {

            }
            row$.append($('<td/>').html(data));  
        }

        $(tableid).append(row$);  
    }  
} 
// Function used to get all column names from JSON and bind the html table header:
function BindTableHeader(jsondata, tableid) {  
    var columnSet = [];  
    var headerTr$ = $('<tr/>');  
    for (var i = 0; i < jsondata.length; i++) {  
        var rowHash = jsondata[i];  
        for (var key in rowHash) {  
            if (rowHash.hasOwnProperty(key)) { 
                // Adding each unique column names to a variable array 
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
function convertToEvents(xl_column, ev_data) {
    if (xl_column === 0) {
        geo_obj.ticks = ev_data;
    } else if (xl_column === 1) {
        geo_obj.setNo = ev_data;
    } else if (xl_column === 2) {
        geo_obj.title = ev_data;
    } else if (xl_column === 3) {
        geo_obj.color = ev_data;
    } else if (xl_column === 4) {
        geo_obj.adder = ev_data;
        /* Can't push the object directly onto the array, since only a 'reference'
         * to the object gets pushed, and changing the object then changes
         * everything in the array...
         */
        xl_Imported_Timelines.push(JSON.parse(JSON.stringify(geo_obj)));
    }
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
    url: event_chart,
    type: 'GET',
    dataType: 'binary',
    processData: false,
    success: function(result) {
        alert("Ajaxed in");
    }

});
*/
