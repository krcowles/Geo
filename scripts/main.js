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
var eras = ['proto_paleo', 'proto_meso', 'proto_neo', 'phan_paleo',
    'phan_meso', 'phan_ceno'];
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
    if (currEon !== 'off') {
        if (currEra !== 'off') {
            if (currPer !== 'off') { // period as percentage
                
            } else { // era as percentage
                var box1 = portionPx * (eage - leftAge)/eage;
                var box2 = (leftAge - rightAge)/eage;
                var portion = 100 * box2;
                portion = portion.toFixed(2);
                box2 *= portionPx;
                box3 = portionPx - (box1 + box2);
                $('#segment').text("Era");
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
            $('#segment').text("Eon");
        }
        $('#box1').width(box1);
        $('#box2').width(box2);
        $('#box3').width(box3);
    } else {
        $('#box1').hide();
        $('#box2').width(portionPx);
        $('#box3').hide();
        var portion = 100;
        $('#segment').text("span");
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
    // because pgwidth can change when scroll bars appear:
    pgwidth = $(window).width();
    //$('#eonview').show();
    sessionStorage.setItem('dispEon', eon);
    resetDisplays('eon');
    for (var i=0; i<eons.length; i++) {
        if (eons[i] === eon) {
            var chartNo = i + 1; // 0 => Main Chart
            break;
        }
    }
    // eon's chart parameters:
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
    // eon's children's box settings:
    var boxborder = $('.eondivs').css('border-left-width');
    var borders = 2 * parseInt(boxborder);
    var eondiv = "#" + eon + "box";
    var eonparts = $(eondiv).children().length;
    var eonscale = pgwidth/(leftAge - rightAge);
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
function eraDefs(era) {
    pgwidth = $(window).width();
    //$('#eraview').show();
    sessionStorage.setItem('dispEra', era); // NECESSARY?????
    resetDisplays('era');
    for (var i=0; i<eras.length; i++) {
        if (eras[i] === era) {
            var chartNo = i + eons.length + 1; // 0 => Main Chart
            break;
        }
    }
    rightAge = chartParms[chartNo].right;
    leftAge = chartParms[chartNo].left;
    ticks = chartParms[chartNo].ticks;
    setNo = chartParms[chartNo].setNo;
    title = chartParms[chartNo].title;
    color = chartParms[chartNo].color;
    // era's children's box settings:
    var boxborder = $('.eradivs').css('border-left-width');
    var borders = 2 * parseInt(boxborder);
    var eradiv = "#" + era + "box";
    var eraparts = $(eradiv).children().length;
    var erascale = pgwidth/(leftAge - rightAge);
    var accumbox = 0;
    for (var j=0; j<eraparts; j++) {
        var subera = "#" + era + j;
        if (j !== eraparts -1) {
            var subwidth = periodSizes[era][j].left - periodSizes[era][j].right;
            subwidth = Math.floor(erascale * subwidth);
            accumbox += subwidth;
        } else {
            subwidth = pgwidth - accumbox;
        }
        var subcolor = periodSizes[era][j].color;
        $(subera).width(subwidth - borders);
        $(subera).css('background-color',subcolor);
    }
    $(eradiv).show();
    var adder = chartParms[chartNo].adder;
    $('#eraadder').text(adder);
}
function resetDisplays(section) {
    var box;
    if (section === 'eon') {
        for (var j=0; j<eons.length; j++) {
            box = "#" + eons[j] + "box";
            $(box).hide();
        }
    } else if (section === 'era') {
        for (var k=0; k<eras.length; k++) {
            box = "#" + eras[k] + "box";
            $(box).hide();
        }
    }
}
function drawArea(section, member) {
    // section = viewing area; member = member to display
    if (section === 'eon') {
        currEon = member;
        eonDefs(member); // includes children of member
        // eon chart:
        var eonDiv = 'eonline';
        var eonChartId = 'eon';
        var eonChartEl = document.getElementById(eonChartId);
        setChartDims(eonDiv, eonChartEl, EONHT);
        drawChart(eonChartId);
    } else if (section === 'era') {
        currEra = member;
        eraDefs(member); // includes children of member
        // era chart:
        var eraDiv = 'eraline';
        var eraChartId = 'era';
        var eraChartEl = document.getElementById(eraChartId);
        setChartDims(eraDiv, eraChartEl, ERAHT);
        drawChart(eraChartId);
    } else if (section === 'period') {
        // later...
        var subs = 0;
    }
}
function expandArea(loc, content) {
    drawArea(loc, content);
    drawPortion();
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
    $('div[id$="box"]').hide();
    if (subs) {
        // pg refresh: if any settings are on, dispEon must be also
        currEon = sessionStorage.getItem('dispEon');
        if (currEon !== 'off') {
            drawArea('eon', currEon);
            drawPortion();
            currEra = sessionStorage.getItem('dispEra');
            if (currEra !== 'off') {
                drawArea('era', currEra);
                drawPortion();
            }
        }
    } 

    /*
     * EVENT DEFINITIONS
     */
    // Clickable EONS in MAIN VIEW (Always only one set of boxes):
    $('#hadean').on('click', function() {
        expandArea('eon', 'had');
        // Since these have no defined era, turn off those as
        // they may already have been displayed
        $('div[id^="era"] div[id$="box"]').hide();
        $('div[id^="per"] div[id$="box]').hide();
        if (currEra !== 'off') {
            $('#era').remove();
            $('#eraline').append('<canvas id="era"></canvas>');
            if (currPer !== 'off') {
                $('#period').remove();
                $('#periodline').append('<canvas id="period"></canvas>');
            }
        }
    });
    $('#archean').on('click', function() {
        expandArea('eon', 'arch');
        // Since these have no clickable eras, turn off those as
        // they may already have been displayed
        $('div[id^="era"] div[id$="box"]').hide();
        $('div[id^="per"] div[id$="box]').hide();
        if (currEra !== 'off') {
            $('#era').remove();
            $('#eraline').append('<canvas id="era"></canvas>');
            if (currPer !== 'off') {
                $('#period').remove();
                $('#periodline').append('<canvas id="period"></canvas>');
            }
        }
    });
    $('#proto').on('click', function() {
        expandArea('eon', 'proto');
    });
    $('#phan').on('click', function() {
        expandArea('eon', 'phan');
    });
    // Clickable ERAS (Proterozoic & Phanerozoic) IN EON VIEW:
    $('#proto0').on('click', function() {
        expandArea('era','proto_paleo');
    });
    $('#proto1').on('click', function() {
        expandArea('era', 'proto_meso');
    });
    $('#proto2').on('click', function() {
        expandArea('era', 'proto_neo');
    });
    $('#phan0').on('click', function() {
        expandArea('era', 'phan_paleo');
    });
    $('#phan1').on('click', function() {
        expandArea('era', 'phan_meso');
    });
    $('#phan2').on('click', function() {
        expandArea('era', 'phan_ceno');
    });
    // Clickable PERIODS in ERA VIEW:

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
                    if (currEra !== 'off') {
                        drawArea('era',currEra);
                    }
                }
                drawPortion();
                resizeFlag = true; 
            }, 400);      
        }  
    });
});