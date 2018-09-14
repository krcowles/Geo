// global vars
var eage;  // estimated earth age (read from html #xopt)
var title;
var start;
var span;
var ticks;
var setNo;
var resizeFlag = true; // allow re-sizing even
// Pre-assigned constants for charts:
const MAINHT = 80;
const EONHT = 80;

// global functions
function setChartDims(divId, canvasEl, ht) {
    var fullWidth = $(window).innerWidth();
    var div = "#" + divId;
    $(div).width(fullWidth);
    canvasEl.width = fullWidth;
    //var parentHeight = canvasEl.parentNode.offsetHeight;
    canvasEl.height = ht;
}
function drawChart(canvasId) {
    var chartData = defineData();
    ChartObj.render(canvasId, chartData);
}
function defineData() {
    // data object for the chart:
    var dataDef = {
        title: title,
        start: start,
        span: span,
        ticks: ticks,
        xLabel: '', 
        yLabel: '',
        labelFont: '10pt Arial', 
        dataPointFont: '8pt Arial',
        renderTypes: [ChartObj.renderType.lines, ChartObj.renderType.points],
        dataPoints: dataSets[setNo]
    };
    return dataDef;
}

$(document).ready( function() {
    /* --- Function definitions */
    /* Hadean and Phanerozoic require text sizing... */
    function getTextWidth(text, font) {
        // re-use canvas object for better performance
        var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
        var context = canvas.getContext("2d");
        context.font = font;
        var metrics = context.measureText(text);
        return metrics.width;
    }
    function sizes() {
        // text size
        var pgwidth = $(window).innerWidth();
        var opt = $('#xopt').text();
        var scale = pgwidth/opt;  // px per Million Years (MY)
        var bwpx = $('.edivs').css('border-left-width'); // has 'px' appended
        var bwidth = 2 * parseInt(bwpx);
        var crypto = Math.floor(pgwidth - 541 * scale);
        $('#crypto').width(crypto - 2);  // border-width for crypto fixed at 1
        var hadean = Math.floor(pgwidth - 4000 * scale);
        $('#hadean').width(hadean - bwidth);
        var hsize = getTextWidth("Hadean Eon", "14px verdana");
        if ((hadean - bwidth) < hsize) {
            $('#hadean').text("Hadean");
        } else {
            $('#hadean').text("Hadean Eon");
        }
        var archend = Math.floor(pgwidth - 2500 * scale);
        var arch = archend - hadean;
        $('#archean').width(arch - bwidth);
        var proto = crypto - hadean - arch;
        $('#proto').width(proto - bwidth);
        var phan = pgwidth - crypto;
        $('#phan').width(phan - bwidth);
        var psize = getTextWidth("Phanerozoic Eon", "14px verdana");
        if ((phan - bwidth) < psize) {
            $('#phan').text("Phanerozoic");
        } else {
            $('#phan').text("Phanerozoic Eon");
        }
    }
    /* --- end functions */
    eage = $('#xopt').text(); // page startup default for earth's age
    sizes();
    if (sessionStorage.length === 0) {
        sessionStorage.setItem('start', 0);
        sessionStorage.setItem('span', eage);
        sessionStorage.setItem('ticks', 250);
        sessionStorage.setItem('setNo', 0);
        sessionStorage.setItem('title','Event Timeline')
    } 
    start = parseInt(sessionStorage.getItem('start'));
    span = parseInt(sessionStorage.getItem('span'));
    ticks = parseInt(sessionStorage.getItem('ticks'));
    setNo = parseInt(sessionStorage.getItem('setNo'));
    title = sessionStorage.getItem('title');
    /* This section of code renders the graph itself */
    var mainChartEl = document.getElementById('mainline');
    // NOTE: All canvases at this point will have the same chart dims:
    setChartDims('events', mainChartEl, MAINHT);
    drawChart('mainline');

    // Clickable EONS:
    $('#hadean').on('click', function() {
        $('#eonic').show();
        start = 4000;
        sessionStorage.setItem('start', start);
        span = eage - start;
        sessionStorage.setItem('span', span);
        ticks = 25;
        sessionStorage.setItem('ticks', ticks);
        setNo = 1;
        sessionStorage.setItem('setNo', 1);
        title = 'Hadean Timeline';
        sessionStorage.setItem('title', title);
        var hadeanEl = document.getElementById('eon');
        setChartDims('eonline', hadeanEl, EONHT);
        drawChart('eon');
    });
    $(window).resize( function() {
        if (resizeFlag) {
            sizes();
            resizeFlag = false;
            setTimeout( function() {
                setChartDims();
                var chartData = defineData();
                ChartObj.render('mainline', chartData);
                resizeFlag = true; 
            }, 300);      
        }  
    });
});