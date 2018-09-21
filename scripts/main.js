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
var eons = ['had', 'arch', 'proto', 'phan'];
var currEon = 'off';
var currEra = 'off';
var currPer = 'off';
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
// -------- SETUP "MAIN" SECTION OF DISPLAY ----------
function mainSizes() {
    // text size
    pgwidth = $(window).width();
    var opt = $('#xopt').text();
    var scale = pgwidth/opt;  // px per Million Years (MY)
    var bwpx = $('.maindivs').css('border-left-width'); // has 'px' appended
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
    var marg = (pgwidth - portionPx)/2;
    $('#box0').width(marg);
    // some boxes may have been turned off previously...
    $('#box1').show(); 
    $('#box2').show(); 
    $('#box3').show();
    if (currEon !== 'off') { // then chartDefs are set
        if (currEra !== 'off') {
            if (currPer !== 'off') { // period as percentage

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
function mainChartDefs() {
    rightAge = 0;
    leftAge = eage;
    ticks = chartParms[0].ticks;
    setNo = 0;
    title = chartParms[0].title;
    color = chartParms[0].color;
}
// ---------- EON DISPLAY ----------
function eonDefs(eon) {
    $('#eonview').show();
    sessionStorage.setItem('dispEon', eon);
    resetEonDisplays();
    for (var i=0; i<eons.length; i++) {
        if (eons[i] === eon) {
            var chartNo = i + 1; // 0 => Main Chart
            break;
        }
    }
    rightAge = chartParms[chartNo].right;
    if (chartNo === 1) {
        leftAge = eage;
    } else {
        leftAge = chartParms[chartNo].left;
    }
    ticks = chartParms[chartNo].ticks;
    setNo = chartParms[chartNo].setNo;
    title = chartParms[chartNo].title;
    color = chartParms[chartNo].color;
    // eon chart settings:
    sessionStorage.setItem('eonleft', leftAge);
    sessionStorage.setItem('eonright', rightAge);
    sessionStorage.setItem('eonticks', ticks);
    sessionStorage.setItem('eonsetNo', setNo);
    sessionStorage.setItem('eontitle', title);
    sessionStorage.setItem('eoncolor', color);
    // eon box settings:
    var boxborder = $('.eondivs').css('border-left-width');
    var borders = 2 * parseInt(boxborder);
    var eondiv = "#" + eon + "box";
    var eonparts = $(eondiv).children().length;
    var eonscale = pgwidth/(chartParms[chartNo].left - chartParms[chartNo].right);
    if (eonparts === 0) { // eon is hadean
        $('#hadbox').width = pgwidth;
        $('#hadbox').css('background-color',HADCOLOR);
        $('#hadbox').text("Hadean Eon");
        $('#hadbox').css('text-align','center');
    } else {
        var accumbox = 0;
        for (var j=0; j<eonparts; j++) {
            var subeon = "#" + eon + j;
            if (j !== eonparts -1) {
                var subwidth = eraSizes[eon][j].left - eraSizes[eon][j].right;
                subwidth = Math.floor(eonscale * subwidth);
                accumbox += subwidth;
            } else { // last item:
                subwidth = pgwidth - accumbox;
            }
            var subcolor = eraSizes[eon][j].color;
            $(subeon).width(subwidth - borders);
            $(subeon).css('background-color',subcolor);
        }
    }
    $(eondiv).show();
    var adder = chartParms[chartNo].adder;
    $('#eonadder').text(adder);
}
function resetEonDisplays() {
    $('#hadbox').hide();
    $('#archbox').hide();
    $('#protobox').hide();
    $('#phanbox').hide();
}
function drawArea(section, member) {
    // section = viewing area; member = member to display
    if (section === 'eon') {
        currEon = member;
        eonDefs(member); // includes children of member
        var eonDiv = 'eonline';
        var eonChartId = 'eon';
        var eonChartEl = document.getElementById(eonChartId);
        setChartDims(eonDiv, eonChartEl, EONHT);
        drawChart(eonChartId);
    } else if (section === 'era') {
        if (key === 'proto') {
            var subs = periodSizes.proto.protos;
        } else {
            var subs = periodSizes.phan.phans;
        }
    } else if (section === 'period') {
        // later...
        var subs = 0;
    }
}


$(document).ready( function() {
    // Display Assignments:
    if (sessionStorage.length === 0) {
        sessionStorage.setItem('dispEon', 'off');
        sessionStorage.setItem('dispEra', 'off');
        sessionStorage.setItem('dispPer', 'off');
        var subs = false;
    } else {
        var subs = true; // this is a page refresh...
    }
    eage = $('#xopt').text(); // page startup default for earth's age
    mainSizes();
    drawPortion(); // pgwidth not defined until mainSizes is invoked
    /* 
     * This section of code renders the main graph itself:
     * The main timeline doesn't change with click events;
     * sessionStorage not defined at this point.
     */
    mainChartDefs();
    mainChartEl = document.getElementById('mainline');
    setChartDims('events', mainChartEl, MAINHT);
    drawChart('mainline');
    if (subs) {
        // pg refresh: if any settings are on, dispEon must be also
        currEon = sessionStorage.getItem('dispEon');
        if (currEon !== 'off') {
            drawArea('eon', currEon);
            drawPortion();
        }
    } 

    /*
     * EVENT DEFINITIONS
     */
    // Clickable EONS:
    $('#hadean').on('click', function() {
        sessionStorage.setItem('dispEon','had');
        drawArea('eon', 'had');
        drawPortion();
    });
    $('#archean').on('click', function() {
        sessionStorage.setItem('dispEon','arch');
        drawArea('eon', 'arch');
        drawPortion();
    });
    $('#proto').on('click', function() {
        sessionStorage.setItem('dispEon','proto');
        drawArea('eon', 'proto');
        drawPortion();
    });
    $('#phan').on('click', function() {
        sessionStorage.setItem('dispEon','phan');
        drawArea('eon', 'phan');
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
                mainChartDefs();
                setChartDims('events', mainChartEl, MAINHT);
                drawChart('mainline');
                mainSizes(); // this redefines global 'pgwidth'
                if (currEon !== 'off') {
                    drawArea('eon', currEon);
                }
                drawPortion();
                resizeFlag = true; 
            }, 300);      
        }  
    });
});