// global vars
var eage;  // estimated earth age (read from html #xopt)
var title;
var rightAge;
var leftAge;
var ticks;
var setNo;
var color;
var mainChartEl;
var resizeFlag = true; // allow re-sizing even
// Pre-assigned constants for charts:
const MAIN = 0;
const HADEAN = 1;
const ARCHEAN = 2;
const PERIOD = 3;
const MAINHT = 80;
const EONHT = 80;
const ERAHT = 80;
const PERHT = 100;
// Display Assignments:
if (sessionStorage.length === 0) {
    sessionStorage.setItem('dispEon', 'off');
    sessionStorage.setItem('dispEra', 'off');
    sessionStorage.setItem('dispPer', 'off');
}

// global functions
function setChartDims(divId, canvasEl, ht) {
    // At this point, all charts are full width of the page
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
        right: rightAge,
        left: leftAge,
        ticks: ticks,
        xLabel: '', 
        yLabel: '',
        background: color,
        labelFont: '10pt Arial', 
        dataPointFont: '8pt Arial',
        renderTypes: [ChartObj.renderType.lines, ChartObj.renderType.points],
        dataPoints: dataSets[setNo]
    };
    return dataDef;
}
function drawEon() {
    $('#eonview').show();
    leftAge = sessionStorage.getItem('left');
    rightAge = sessionStorage.getItem('right');
    ticks = sessionStorage.getItem('ticks');
    setNo = sessionStorage.getItem('setNo');
    title = sessionStorage.getItem('title');
    color = sessionStorage.getItem('color');
    $('#eonbox').css('background-color', color);
    var el = document.getElementById('eon');
    setChartDims('eonline', el, EONHT);
    drawChart('eon');
    // Eras only shown if eon is shown...
}
function storeChartParms() {
    sessionStorage.setItem('left', leftAge);
    sessionStorage.setItem('right', rightAge);
    sessionStorage.setItem('ticks', ticks);
    sessionStorage.setItem('setNo', 1);
    sessionStorage.setItem('title', title);
    sessionStorage.setItem('color', color);
}

$(document).ready( function() {
    /* --- 'page-loaded' function definitions */
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
    function chartDefs(chartNo) {
        rightAge = chartParms[chartNo].right;
        if (chartNo < 2) {
            leftAge = eage;
        } else {
            leftAge = chartParms[chartNo].left;
        }
        ticks = chartParms[chartNo].ticks;
        setNo = chartParms[chartNo].setNo;
        title = chartParms[chartNo].title;
        color = chartParms[chartNo].color;
    }
    /* --- end 'page-loaded' functions */

    eage = $('#xopt').text(); // page startup default for earth's age
    sizes();
    /* 
     * This section of code renders the main graph itself:
     * The main timeline doesn't change with click events;
     * sessionStorage not defined at this point.
     */
    chartDefs(MAIN);
    mainChartEl = document.getElementById('mainline');
    setChartDims('events', mainChartEl, MAINHT);
    drawChart('mainline');
    // Any secondary charts that were clicked on:
    if (sessionStorage.getItem('dispEon') === 'on') {
        drawEon();
    }

    // Clickable EONS:
    $('#hadean').on('click', function() {
        sessionStorage.setItem('dispEon', 'on');
        $('#eonview').show();
        chartDefs(HADEAN);
        $('#eonbox').text("Hadean Eon (No Era's Defined)");
        $('#eonbox').css('background-color', color);
        storeChartParms();
        drawEon();
    });
    $('#archean').on('click', function() {
        sessionStorage.setItem('dispEon', 'on');
        $('#eonview').show();
        chartDefs(ARCHEAN);
        $('#eonbox').css('background-color', color);
        $('#eonbox').text("Archean Eon");
        storeChartParms();
        drawEon();
    });
    $(window).resize( function() {
        if (resizeFlag) {
            resizeFlag = false;
            setTimeout( function() {
                chartDefs(MAIN);
                setChartDims('events', mainChartEl, MAINHT);
                drawChart('mainline');
                if (sessionStorage.getItem('dispEon') === 'on') {
                    drawEon();
                }
                sizes();
                resizeFlag = true; 
            }, 300);      
        }  
    });
});