// global vars
var pgwidth;
var eage;  // estimated earth age (read from html #xopt)
var title;
var rightAge;
var leftAge;
var ticks;
var setNo;
var color;
var mainChartEl;
var currEon;
var currEra;
var currPer;
var portion; // portion of earth's age being viewed
var percentchart;
var resizeFlag = true; // prevents rapid-fire events during resize

/*    
 * FUNCTION DEFINITIONS 
*/
// ----------- CHARTING ----------
function setChartDims(divId, canvasEl, ht) {
    // At this point, all charts are full width of the page
    var fullWidth = $(window).innerWidth();
    var div = "#" + divId;
    $(div).width(fullWidth);
    canvasEl.width = fullWidth;
    //var parentHeight = canvasEl.parentNode.offsetHeight;
    canvasEl.height = ht;
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
function drawChart(canvasId) {
    var chartData = defineData();
    ChartObj.render(canvasId, chartData);
}
function storeChartParms() {
    sessionStorage.setItem('left', leftAge);
    sessionStorage.setItem('right', rightAge);
    sessionStorage.setItem('ticks', ticks);
    sessionStorage.setItem('setNo', setNo);
    sessionStorage.setItem('title', title);
    sessionStorage.setItem('color', color);
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
    switch (chartNo) {
        case MAIN:
            color = MAINCOLOR;
            break;
        case HADEAN:
            color = HADCOLOR;
            break;
        case ARCHEAN:
            color = ARCHCOLOR;
            break;
        case PROTO:
            color = PROTOCOLOR;
            break;
        case PHAN:
            color = PHANCOLOR;
            break;
        default:
            color = 'darkblue';
    }
}
// -------- SETUP "MAIN" SECTION OF DISPLAY ----------
function mainSizes() {
    // text size
    pgwidth = $(window).width();
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
function getTextWidth(text, font) {
    // Hadean & Phanerozoic Eons require text adjustment w/resizing
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}
function drawPortion() {
    var portionPx = PCHART * pgwidth;
    var curreon = sessionStorage.getItem('dispEon');
    $('#box1').show();
    $('#box2').show();
    $('#box3').show();
    if (curreon !== 'off') { // then chartDefs are set
        var currera = sessionStorage.getItem('dispEra');
        if (currera !== 'off') {
            var currper = sessionStorage.getItem('dispPer');
            if (currper !== 'off') { // period as percentage

            } else { // era as percentage

            }
        } else { // eon as percentage
            if (leftAge === eage) {
                $('#box1').hide();
                var box1 = 0.00;
            } else {
                var box1 = portionPx * (eage - leftAge)/eage;
            }
            var box2 = (leftAge - rightAge)/eage;
            var portion = 100 * box2;
            portion = portion.toFixed(2);
            box2 *= portionPx;
            if (rightAge === 0) {
                $('#box3').hide();
                var box3 = 0.00;
            } else {
                var box3 = portionPx - (box1 + box2);
            }
            $('#box1').width(box1);
            $('#box2').width(box2);
            $('#box3').width(box3);
        }
    } else {
        $('#box1').hide();
        $('#box2').width(portionPx);
        $('#box3').hide();
        var portion = 100;
    }
    $('#percent').text(portion + "%");
}
// ---------- EON DISPLAY ----------
function resetEonDisplays() {
    $('#hadbox').hide();
    $('#archbox').hide();
    $('#protobox').hide();
    $('#phanbox').hide();
}
function drawEon(id) {
    var eonId = '#' + id + 'box';
    $(eonId).show();
    leftAge = sessionStorage.getItem('left');
    rightAge = sessionStorage.getItem('right');
    ticks = sessionStorage.getItem('ticks');
    setNo = sessionStorage.getItem('setNo');
    title = sessionStorage.getItem('title');
    color = sessionStorage.getItem('color');
    var el = document.getElementById('eon');
    setChartDims('eonline', el, EONHT);
    drawChart('eon');
    // if not hadean, inner boxes must be drawn...
    var bwpx = $('.archdivs').css('border-left-width'); // has 'px' appended
    var bwidth = 2 * parseInt(bwpx);
    if (id === 'arch') {
        var archlgth = chartParms[ARCHEAN].left - chartParms[ARCHEAN].right;
        var scale = pgwidth/archlgth;
        $('#archbox').show(); // temp for debug (on in drawEon())
        var eo = Math.floor(400 * scale);
        $('#areo').width(eo - bwidth);
        $('#areo').css('background-color', ARCHCOLOR);
        var paleo = Math.floor(400 * scale);
        $('#arpaleo').width(paleo - bwidth);
        $('#arpaleo').css('background-color', ARCHCOLOR);
        var meso = Math.floor(400 * scale);
        $('#armeso').width(meso - bwidth);
        $('#armeso').css('background-color', ARCHCOLOR);
        var neo = pgwidth - (eo + paleo + meso);
        $('#arneo').width(neo - bwidth);
        $('#arneo').css('background-color', ARCHCOLOR);
    } else if (id === 'proto') {
        var protolgth = chartParms[PROTO].left - chartParms[PROTO].right;
        var scale = pgwidth/protolgth;
        $('#protobox').show();
        var paleo = Math.floor(900 * scale);
        $('#prpaleo').width(paleo - bwidth);
        $('#prpaleo').css('background-color', PROTOCOLOR);
        var meso = Math.floor(600 * scale);
        $('#prmeso').width(meso - bwidth);
        $('#prmeso').css('background-color', PROTOCOLOR);
        var neo = pgwidth - (paleo + meso);
        $('#prneo').width(neo - bwidth);
        $('#prneo').css('background-color', PROTOCOLOR);
    }
    // Eras only shown if eon is shown...
}

$(document).ready( function() {
    // Display Assignments:
    if (sessionStorage.length === 0) {
        sessionStorage.setItem('dispEon', 'off');
        sessionStorage.setItem('dispEra', 'off');
        sessionStorage.setItem('dispPer', 'off');
        var subs = false;
    } else {
        var subs = true;
    }
    eage = $('#xopt').text(); // page startup default for earth's age
    mainSizes();
    if (subs) {
        // pg refresh: if any settings are on, dispEon must be also
        var refeon = sessionStorage.getItem('dispEon');
        if (refeon !== 'off') {
            drawEon(refeon);
        }
    } 
    drawPortion(); // pgwidth not defined until mainSizes is invoked
    /* 
     * This section of code renders the main graph itself:
     * The main timeline doesn't change with click events;
     * sessionStorage not defined at this point.
     */
    chartDefs(MAIN);
    mainChartEl = document.getElementById('mainline');
    setChartDims('events', mainChartEl, MAINHT);
    drawChart('mainline');
    // Any secondary charts clicked on previously (refresh or resize)
    var sub = sessionStorage.getItem('dispEon');
    if (sub !=='off') {
        drawEon(sub);
    }

    /*
     * EVENT DEFINITIONS
     */
    // Clickable EONS:
    $('#hadean').on('click', function() {
        sessionStorage.setItem('dispEon', 'had');
        resetEonDisplays();
        chartDefs(HADEAN);
        $('#hadbox').text("Hadean Eon");
        $('#hadbox').css('text-align','center');
        $('#hadbox').css('padding-top','6px');
        $('#hadbox').css('background-color',HADCOLOR);
        $('#eonadder').text("No Era's Defined in Hadean Eon");
        storeChartParms();
        drawEon('had');
        drawPortion();
    });
    $('#archean').on('click', function() {
        sessionStorage.setItem('dispEon', 'arch');
        $('#eonadder').text("No Periods Defined for Archean Eras")
        resetEonDisplays();
        chartDefs(ARCHEAN);
        storeChartParms();
        drawEon('arch');
        drawPortion();
    });
    $('#proto').on('click', function() {
        sessionStorage.setItem('dispEon', 'proto');
        $('#eonadder').text("");
        resetEonDisplays();
        chartDefs(PROTO);
        storeChartParms();
        drawEon('proto');
        drawPortion();
    });
    $('#phan').on('click', function() {
        sessionStorage.setItem('dispEon', 'phan');
        $('#eonadder').text("");
        resetEonDisplays();
        chartDefs(PHAN);
        storeChartParms();
        drawEon('phan');
        drawPortion();
    });
    // Clickable ERAS (Proterozoic & Phanerozoic)
    $('#prpaleo').on('click', function() {

    });
    $('#prmeso').on('click', function() {

    });
    $('#prneo').on('click', function() {

    });

    // RESIZING OF WINDOW:
    $(window).resize( function() {
        if (resizeFlag) {
            resizeFlag = false;
            setTimeout( function() {
                chartDefs(MAIN);
                setChartDims('events', mainChartEl, MAINHT);
                drawChart('mainline');
                mainSizes(); // this redefines global 'pgwidth'
                var eondisp = sessionStorage.getItem('dispEon');
                if (eondisp !== 'off') {
                    drawEon(eondisp);
                }
                drawPortion();
                resizeFlag = true; 
            }, 300);      
        }  
    });
});