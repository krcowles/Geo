// global vars
var pgwidth;
var scrollBars = scrollBarWidth();
/*
 * Use of the variable 'pgwidth' will always subtract the scrollBars
 * as the detection of scrollbars on the page is a non-trivial problem,
 * and Windows and Macs use different methods to display them.
*/
var eage;  // estimated earth age (read from html #xopt)
var title;
var rightAge;
var leftAge;
var ticks;
var setNo;
var color;
var mainChartEl;
var eons = ['hadean', 'archean', 'proto', 'phan'];
var eras = ['proto_paleo', 'proto_meso', 'proto_neo', 'phan_paleo',
    'phan_meso', 'phan_ceno'];
var periods = ['siderian', 'rhyacian', 'orosirian', 'statherian',
    'calymmian', 'ectasian', 'stenian', 'tonian', 'cryogenian',
    'ediacaran', 'eocambrian', 'cambrian', 'ordovician', 'silurian',
    'devonian', 'mississippian', 'pennsylvanian', 'permian',
    'triassic', 'jurassic', 'cretaceous', 'paleogene', 'neogene' ];
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
    var div = "#" + divId;
    $(div).width(pgwidth);
    canvasEl.width = pgwidth;
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
function setChartProps(chartNo) {
    ticks = chartParms[chartNo].ticks;
    setNo = chartNo;
    title = chartParms[chartNo].title;
    color = chartParms[chartNo].color;
}
// -------- SETUP "MAIN" SECTION OF DISPLAY ----------
function scrollBarWidth() {
    // see: https://davidwalsh.name/detect-scrollbar-width
    var scrollDiv = document.createElement("div");
    scrollDiv.className = "scrollbar-measure";
    document.body.appendChild(scrollDiv);
    var barwidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return barwidth;
}
function mainDefs() {
    // chart properties:
    rightAge = 0;
    leftAge = eage;
    setChartProps(MAIN);
    // boxes:
    var opt = $('#xopt').text();
    var scale = pgwidth/opt;  // px per Million Years (MY)
    var bwpx = $('.maindivs').css('border-left-width'); // has 'px' appended
    var bwidth = 2 * parseInt(bwpx);
    var crypto = Math.floor(pgwidth - eonShapes['proto'].right * scale);
    $('#crypto').width(crypto - 2);  // border-width for crypto fixed at 1
    var hadean = Math.floor(pgwidth - eonShapes['hadean'].right * scale);
    $('#hadean').width(hadean - bwidth);
    var hsize = getTextWidth("Hadean Eon", "14px verdana");
    // checking textwidth for smoother presentation (no word-wrap)
    if ((hadean - bwidth) < hsize) {
        $('#hadean').text("Hadean");
    } else {
        $('#hadean').text("Hadean Eon");
    }
    var archend = Math.floor(pgwidth - eonShapes['archean'].right * scale);
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
                var box1 = portionPx * (eage - leftAge)/eage;
                var box2 = (leftAge - rightAge)/eage;
                portion = 100 * box2
                portion = portion.toFixed(3);
                box2 *= portionPx;
                box3 = portionPx - (box1 + box2);
                $('#segment').text('Period');
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
// ---------- EON DISPLAY ----------
function eonDefs(eon) {
    // because pgwidth can change when scroll bars appear:
    sessionStorage.setItem('dispEon', eon);
    resetDisplays('eon');
    for (var i=0; i<eons.length; i++) {
        if (eons[i] === eon) {
            var chartNo = i + 1; // 0 => Main Chart
            break;
        }
    }
    // eon's chart parameters:
    setChartProps(chartNo);
    if (chartNo === HADEAN) {
        leftAge = eage;
    } else {
        leftAge = eonShapes[eon].left;
    }
    rightAge = eonShapes[eon].right;
    // eon's children's box settings (eras):
    var boxborder = $('.eondivs').css('border-left-width');
    var borders = 2 * parseInt(boxborder);
    var eondiv = "#" + eon + "box";
    var eonparts = $(eondiv).children().length;
    var eonscale = pgwidth/(leftAge - rightAge);
    if (eonparts === 0) { // eon is hadean - it has no children
        $('#hadeanbox').width(pgwidth - borders);
        $('#hadeanbox').css('background-color',HADCOLOR);
        $('#hadeanbox').text("Hadean Eon");
    } else {
        var accumbox = 0;
        for (var j=0; j<eonparts; j++) {
            var subeon = "#" + eon + j;
            if (j !== eonparts -1) {
                var subwidth = eraShapes[eon][j].left - eraShapes[eon][j].right;
                subwidth = Math.floor(eonscale * subwidth);
                accumbox += subwidth;
            } else { // last item:
                subwidth = pgwidth - accumbox;
            }
            var subcolor = eraShapes[eon][j].color;
            $(subeon).width(subwidth - borders);
            $(subeon).css('background-color',subcolor);
        }
    }
    $(eondiv).show();
    var adder = chartParms[chartNo].adder;
    $('#eonadder').text(adder);
    $('#eonadder').show();
}
function eraDefs(era) {
    sessionStorage.setItem('dispEra', era);
    resetDisplays('era');
    for (var i=0; i<eras.length; i++) {
        if (eras[i] === era) {
            var eraNo = i;
            // hacky, but lacking a better approach right now
            if (era.search('proto') === -1) {
                eraNo -= 3;
            }
            var chartNo = i + eons.length + 1; // 0 => Main Chart
            break;
        }
    }
    rightAge = eraShapes[currEon][eraNo].right;
    leftAge = eraShapes[currEon][eraNo].left;
    setChartProps(chartNo);
    // era's children's box settings (periods):
    var boxborder = $('.eradivs').css('border-left-width');
    var borders = 2 * parseInt(boxborder);
    var eradiv = "#" + era + "box";
    var eraparts = $(eradiv).children().length;
    var erascale = pgwidth/(leftAge - rightAge);
    var accumbox = 0;
    for (var j=0; j<eraparts; j++) {
        var subera = "#" + era + j;
        if (j !== eraparts -1) {
            var subwidth = periodShapes[era][j].left - periodShapes[era][j].right;
            subwidth = Math.floor(erascale * subwidth);
            accumbox += subwidth;
        } else {
            subwidth = pgwidth - accumbox;
        }
        var subcolor = periodShapes[era][j].color;
        $(subera).width(subwidth - borders);
        $(subera).css('background-color',subcolor);
    }
    $(eradiv).show();
    var adder = chartParms[chartNo].adder;
    $('#eraadder').text(adder);
    $('#eraadder').show();
}
function periodDefs(per) {
    sessionStorage.setItem('dispPer', era);
    resetDisplays('period');
    for (var i=0; i<periods.length; i++) {
        if (periods[i] === per) {
            var perNo = i;
            var offset;
            // a bit hacky, but can't come up with a better solution right now
            switch (currEra) {
                case 'proto_meso':
                    offset = 4
                    break;
                case 'proto_neo':
                    offset = 7
                    break;
                case 'phan_paleo':
                    offset = 10;
                    break;
                case 'phan_meso':
                    offset = 18;
                    break;
                case 'phan_ceno':
                    offset = 21;
                    break;
                default:
                    offset = 0;
            }
            perNo -= offset;
            var chartNo = i + eons.length + eras.length + 1; // 0 => Main Chart
            break;
        }
    }
    rightAge = periodShapes[currEra][perNo].right;
    leftAge = periodShapes[currEra][perNo].left;
    setChartProps(chartNo);
    // period's children's box settings (epochs):
    var boxborder = $('.perioddivs').css('border-left-width');
    var borders = 2 * parseInt(boxborder);
    var perdiv = "#" + per + "box";
    var perparts = $(perdiv).children().length;
    var perscale = pgwidth/(leftAge - rightAge);
    var accumbox = 0;
    if (perparts === 0) {
        // no children
        $(perdiv).width(pgwidth - borders);
        var bgcolor = periodShapes[currEra][perNo].color;
        $(perdiv).css('background-color',bgcolor);
        var slgth = per.length;
        var pertext = per.charAt(0).toUpperCase() + per.slice(1,slgth) + " Period";
        $(perdiv).text(pertext);
    } else {
        for (var j=0; j<perparts; j++) {
            var subera = "#" + per + j;
            if (j !== perparts -1) {
                var subwidth = epochShapes[currPer][j].left - epochShapes[currPer][j].right;
                subwidth = Math.floor(perscale * subwidth);
                accumbox += subwidth;
            } else {
                subwidth = pgwidth - accumbox;
            }
            var subcolor = epochShapes[currPer][j].color;
            $(subera).width(subwidth - borders);
            $(subera).css('background-color',subcolor);
        }
    }
    $(perdiv).show();
    var adder = chartParms[chartNo].adder;
    $('#peradder').text(adder);
    $('#peradder').show();
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
    } else if (section === 'period') {
        for (var n=0; n<periods.length; n++) {
            box = "#" + periods[n] + "box";
            $(box).hide();
        }
    }
}
function drawArea(section, member) {
    // section = viewing area; member = member to display
    if (section === 'main') {
        mainDefs();
        // main chart:
        mainChartEl = document.getElementById('mainline');
        setChartDims('events', mainChartEl, MAINHT);
        drawChart('mainline');
    } else if (section === 'eon') {
        currEon = member;
        eonDefs(member); // includes children of member
        // eon chart:
        var eonDiv = 'eonline';
        var eonChartId = 'eon';
        var eonChartEl = document.getElementById(eonChartId);
        setChartDims(eonDiv, eonChartEl, EONHT);
        drawChart(eonChartId);
        $("#" + eonDiv).show();
    } else if (section === 'era') {
        currEra = member;
        eraDefs(member); // includes children of member
        // era chart:
        var eraDiv = 'eraline';
        var eraChartId = 'era';
        var eraChartEl = document.getElementById(eraChartId);
        setChartDims(eraDiv, eraChartEl, ERAHT);
        drawChart(eraChartId);
        $("#" + eraDiv).show();
    } else if (section === 'period') {
        currPer = member;
        periodDefs(member);
        var perDiv = 'periodline';
        var periodChartId = 'period';
        var periodChartEl = document.getElementById(periodChartId);
        setChartDims(perDiv, periodChartEl, PERHT);
        drawChart(periodChartId);
        $("#" + perDiv).show();
    }
}
function displaySection(loc, content) {
    // everytime a section loc is drawn, everything below it should turn off:
    if (loc === 'main') {
        $('div[id$="box"]').hide();
        $('div[id="eonline"]').hide();
        $('scan[id="eonadder"]').hide();
        $('div[id="eraline"]').hide();
        $('span[id="eraadder"]').hide();
        $('div[id="periodline"]').hide();
        $('span[id="peradder"]').hide();
        currEon = 'off';
        currEra = 'off';
        currPer = 'off';
    } else if(loc === 'eon') {
        $('div[id="eraview"] div[id$="box"]').hide();
        $('div[id="eraline"]').hide();
        $('span[id="eraadder"]').hide();
        $('div[id="periodview"] div[id$="box"]').hide();
        $('div[id="periodline"]').hide();
        $('span[id="peradder"]').hide();
        currEra = 'off';
        currPer = 'off';
    } else if(loc === 'era') {
        $('div[id="periodview"] div[id$="box"]').hide();
        $('div[id="periodline"]').hide();
        $('span[id="peradder"]').hide();
        currPer = 'off';
    }
    drawArea(loc, content);
    drawPortion();
}

$(document).ready( function() {
    // Display Assignments:
    pgwidth = $(window).width() - scrollBars;
    if (sessionStorage.length === 0) {
        sessionStorage.setItem('dispEon', 'off');
        sessionStorage.setItem('dispEra', 'off');
        sessionStorage.setItem('dispPer', 'off');
        var subs = false;
    } else {
        var subs = true; // this is a page refresh...
    }
    eage = $('#xopt').text(); // page startup default for earth's age
    displaySection('main','');
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
        displaySection('eon', 'hadean');
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
        displaySection('eon', 'archean');
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
        displaySection('eon', 'proto');
    });
    $('#phan').on('click', function() {
        displaySection('eon', 'phan');
    });
    // Clickable ERAS (Proterozoic & Phanerozoic) IN EON VIEW:
    $('#proto0').on('click', function() {
        displaySection('era','proto_paleo');
    });
    $('#proto1').on('click', function() {
        displaySection('era', 'proto_meso');
    });
    $('#proto2').on('click', function() {
        displaySection('era', 'proto_neo');
    });
    $('#phan0').on('click', function() {
        displaySection('era', 'phan_paleo');
    });
    $('#phan1').on('click', function() {
        displaySection('era', 'phan_meso');
    });
    $('#phan2').on('click', function() {
        displaySection('era', 'phan_ceno');
    });
    // Clickable PERIODS in ERA VIEW:
    $('#proto_paleo0').on('click', function() {
        displaySection('period', 'siderian');
    });
    $('#proto_paleo1').on('click', function() {
        displaySection('period', 'rhyacian');
    });
    $('#proto_paleo2').on('click', function() {
        displaySection('period', 'orosirian');
    });
    $('#proto_paleo3').on('click', function() {
        displaySection('period', 'statherian');
    });
    $('#proto_meso0').on('click', function() {
        displaySection('period', 'calymmian');
    });
    $('#proto_meso1').on('click', function() {
        displaySection('period', 'ectasian');
    });
    $('#proto_meso2').on('click', function() {
        displaySection('period', 'stenian');
    });
    $('#proto_neo0').on('click', function() {
        displaySection('period', 'tonian');
    });
    $('#proto_neo1').on('click', function() {
        displaySection('period', 'cryogenian');
    });
    $('#proto_neo2').on('click', function() {
        displaySection('period', 'ediacaran');
    });
    $('#phan_paleo0').on('click', function() {
        displaySection('period', 'eocambrian');
    });
    $('#phan_paleo1').on('click', function() {
        displaySection('period', 'cambrian');
    });
    $('#phan_paleo2').on('click', function() {
        displaySection('period', 'ordovician');
    });
    $('#phan_paleo3').on('click', function() {
        displaySection('period', 'silurian');
    });
    $('#phan_paleo4').on('click', function() {
        displaySection('period', 'devonian');
    });
    $('#phan_paleo5').on('click', function() {
        displaySection('period', 'mississippian');
    });
    $('#phan_paleo6').on('click', function() {
        displaySection('period', 'pennsylvanian');
    });
    $('#phan_paleo7').on('click', function() {
        displaySection('period', 'permian');
    });
    $('#phan_meso0').on('click', function() {
        displaySection('period', 'triassic');
    });
    $('#phan_meso1').on('click', function() {
        displaySection('period', 'jurassic');
    });
    $('#phan_meso2').on('click', function() {
        displaySection('period', 'cretaceous');
    });
    $('#phan_ceno0').on('click', function() {
        displaySection('period', 'paleogene');
    });
    $('#phan_ceno1').on('click', function() {
        displaySection('period', 'neogene');
    });

    // RESIZING OF WINDOW:
    $(window).resize( function() {
        if (resizeFlag) {
            resizeFlag = false;
            setTimeout( function() {
                pgwidth = $(window).width() - scrollBars;
                displaySection('main','');
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