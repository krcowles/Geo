// global vars
var pgwidth;
var scrollBars = scrollBarWidth();
// Chart ID
var HADEAN = 0;
// 'Percent Chart' Width as Fraction of Page Width:
var PCHART = 0.75;
// Section heights:
var EONHT = 80;
var ERAHT = 80;
var PERHT = 80;
/*
 * Use of the variable 'pgwidth' will always subtract the scrollBars
 * as the detection of scrollbars on the page is a non-trivial problem,
 * and Windows and Macs use different methods to display them.
*/
var eage;  // estimated earth age (read from html #xopt)
var title;
var rightAge;
var leftAge;
var ticks; // Spacing of ticks in mya
var toff;  // when boundary starts at an odd number, offset chart ticks
var setNo; // event definitions (see objectDefs.js)
var color;
var mainChartEl;
var eons = ['Hadean', 'Archean', 'Proterozoic', 'Phanerozoic'];
var eras = ['Paleo', 'Meso', 'Neo', 'Paleozoic', 'Mesozoic', 'Cenozoic'];
var periods = ['Siderian', 'Rhyacian', 'Orosirian', 'Statherian',
    'Calymmian', 'Ectasian', 'Stenian', 'Tonian', 'Cryogenian',
    'Ediacaran', 'Cambrian', 'Ordovician', 'Silurian',
    'Devonian', 'Carboniferous', 'Permian', 'Triassic', 'Jurassic', 
    'Cretaceous', 'Paleogene', 'Neogene', 'Quaternary'];
var currEon = 'off';
var currEra = 'off';
var currPer = 'off';
var currScroll;
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
        tickOffset: toff,
        xLabel: '', 
        yLabel: '',
        background: color,
        labelFont: '10pt Arial', 
        dataPointFont: '8pt Arial',
        renderTypes: [ChartObj.renderType.lines, ChartObj.renderType.points],
        dataPoints: eventSets[eventId]
    };
    return dataDef;
}
function drawChart(canvasId) {
    var chartData = defineData();
    ChartObj.render(canvasId, chartData);
}
function setChartProps(chartId) {
    ticks = chartParms[chartId].ticks;
    eventId = chartParms[chartId].evId;
    title = eventId + " Timeline";
    colorKey = chartParms[chartId].color;
    color = colorObj[colorKey];
}
function formTable(section, type) {
    var field;
    var sectionTbl = "#" + section + "tbl";
    var $hdr = $(sectionTbl).find('thead tr');
    var hcell = type + " Event Description"
    $hdr.find('th').eq(2).text(hcell);
    for (k in eventSets) {
        if (k === type) {
            for (var j=0; j<eventSets[k].length; j++) {
                var $tblrow = $('<tr/>');
                field = eventSets[k][j].x;
                $tblrow.append($('<td/>').html(field));
                field = eventSets[k][j].mrkr;
                if (field === 'Tbl') {
                    field = type + " Boundary";
                }
                $tblrow.append($('<td/>').html(field));
                field = eventSets[k][j].des;
                $tblrow.append($('<td/>').html(field));
                $(sectionTbl).append($tblrow);
            }
            break;
        } 
    }
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
    //setChartProps(MAIN);
    toff = 0; // no offset for main chart
    // boxes:
    var scale = pgwidth/eage;  // px per Million Years (MY)
    var bwpx = $('.maindivs').css('border-left-width'); // has 'px' appended
    var bwidth = 2 * parseInt(bwpx);
    var crypto = Math.floor(pgwidth - eonShapes['Proterozoic'].right * scale);
    $('#Crypto').width(crypto - 2);  // border-width for crypto fixed at 1
    var hadean = Math.floor(pgwidth - eonShapes['Hadean'].right * scale);
    $('#Hadean').width(hadean - bwidth);
    var hsize = getTextWidth("Hadean Eon", "14px verdana");
    // checking textwidth for smoother presentation (no word-wrap)
    if ((hadean - bwidth) < hsize) {
        $('#Hadean').text("Hadean");
    } else {
        $('#Hadean').text("Hadean Eon");
    }
    var archend = Math.floor(pgwidth - eonShapes['Archean'].right * scale);
    var arch = archend - hadean;
    $('#Archean').width(arch - bwidth);
    var proto = crypto - hadean - arch;
    $('#Proterozoic').width(proto - bwidth);
    var phan = pgwidth - crypto;
    $('#Phanerozoic').width(phan - bwidth);
    var psize = getTextWidth("Phanerozoic Eon", "14px verdana");
    if ((phan - bwidth) < psize) {
        $('#Phanerozoic').text("Phanerozoic");
    } else {
        $('#Phanerozoic').text("Phanerozoic Eon");
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
            var box1 = portionPx * (eage - leftAge)/eage;
            var box2 = (leftAge - rightAge)/eage;
            portion = 100 * box2;
            box2 *= portionPx;
            box3 = portionPx - (box1 + box2);
            if (currPer !== 'off') { // period as percentage
                portion = portion.toFixed(3);
                $('#segment').text('Period');
            } else { // era as percentage
                portion = portion.toFixed(2);
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
            var chartNo = i;
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
    toff = rightAge % ticks;
    // eon's children's box settings (eras):
    var boxborder = $('.eondivs').css('border-left-width');
    var borders = 2 * parseInt(boxborder);
    var eondiv = "#" + eon + "box";
    var eonparts = $(eondiv).children().length;
    var eonscale = pgwidth/(leftAge - rightAge);
    if (eonparts === 0) { // eon is hadean - it has no children
        $('#Hadeanbox').width(pgwidth - borders);
        $('#Hadeanbox').css('background-color', colorObj.HADCOLOR);
        $('#Hadeanbox').css('color', 'White')
        $('#Hadeanbox').text("Hadean Eon");
        $('#Hadeanbox').css('text-align', 'center');
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
            var colorKey = eraShapes[eon][j].color;
            subcolor = colorObj[colorKey];
            $(subeon).width(subwidth - borders);
            $(subeon).css('background-color',subcolor);
        }
    }
    $(eondiv).show();
    var adder = chartParms[chartNo].adder;
    $('#eonadder').text(adder);
    $('#eonadder').show();
    formTable("eon", eon);
    $('#eontbl').show();
    $(window).scrollTop(currScroll);
}
// --------- ERA DISPLAY ----------
function eraDefs(era) {
    sessionStorage.setItem('dispEra', era);
    resetDisplays('era');
    for (var i=0; i<eras.length; i++) {
        if (eras[i] === era) {
            var eraNo = i;
            // hacky, but lacking a better approach right now
            if (era.search('zoic') !== -1) {
                eraNo -= 3;
            }
            var chartNo = i + eons.length;
            break;
        }
    }
    rightAge = eraShapes[currEon][eraNo].right;
    leftAge = eraShapes[currEon][eraNo].left;
    setChartProps(chartNo);
    toff = rightAge % ticks;
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
        var colorKey = periodShapes[era][j].color;
        var subcolor = colorObj[colorKey];
        $(subera).width(subwidth - borders);
        $(subera).css('background-color',subcolor);
    }
    $(eradiv).show();
    var adder = chartParms[chartNo].adder;
    $('#eraadder').text(adder);
    $('#eraadder').show();
    formTable("era", era);
    $('#eratbl').show();
    $(window).scrollTop(currScroll);
}
// ---------- PERIOD DISPLAY ----------
function periodDefs(per) {
    sessionStorage.setItem('dispPer', per);
    resetDisplays('period');
    for (var i=0; i<periods.length; i++) {
        if (periods[i] === per) {
            var perNo = i;
            var offset;
            // a bit hacky, but can't come up with a better solution right now
            switch (currEra) {
                case 'Meso':
                    offset = eons.length;
                    break;
                case 'Neo':
                    offset = eons.length + 3
                    break;
                case 'Paleozoic':
                    offset = 10;
                    break;
                case 'Mesozoic':
                    offset = 16;
                    break;
                case 'Cenozoic':
                    offset = 19;
                    break;
                default:
                    offset = 0;
            }
            perNo -= offset;
            var chartNo = i + eons.length + eras.length;
            break;
        }
    }
    rightAge = periodShapes[currEra][perNo].right;
    leftAge = periodShapes[currEra][perNo].left;
    setChartProps(chartNo);
    toff = rightAge % ticks;
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
        var colorKey = periodShapes[currEra][perNo].color;
        var bgcolor = colorObj[colorKey];
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
            var colorKey = epochShapes[currPer][j].color;
            var subcolor = colorObj[colorKey];
            $(subera).width(subwidth - borders);
            $(subera).css('background-color',subcolor);
        }
    }
    $(perdiv).show();
    var adder = chartParms[chartNo].adder;
    $('#peradder').text(adder);
    $('#peradder').show();
    formTable("period", per);
    $('#periodtbl').show();
    $(window).scrollTop(currScroll);
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
function getTickOffset(tint, lbound) {
    return lbound % tint;
}
function drawArea(section, member) {
    // section = viewing area; member = member to display
    if (section === 'main') {
        mainDefs(section);
        wipeTables();
    } else if (section === 'eon') {
        currEon = member;
        wipeTables(section);
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
        wipeTables(section);
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
        wipeTables(section);
        periodDefs(member);
        var perDiv = 'periodline';
        var periodChartId = 'period';
        var periodChartEl = document.getElementById(periodChartId);
        setChartDims(perDiv, periodChartEl, PERHT);
        drawChart(periodChartId);
        $("#" + perDiv).show();
    }
}
function wipeTables(section) {
    $('#periodtbl').find('tbody tr').remove();
    $('#periodtbl').hide();
    if (section === 'period') return;
    $('#eratbl').find('tbody tr').remove();
    $('#eratbl').hide();
    if (section === 'era') return;
    $('#eontbl').find('tbody tr').remove();
    $('#eontbl').hide();
}
function displaySection(loc, content) {
    // only show the table that is currently active via 'loc':
    $('div[id$="tbl"]').hide();
    // maintain current scroll position:
    currScroll = $(window).scrollTop();
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
    pgwidth = window.innerWidth - scrollBars;
    if (sessionStorage.length === 0) {
        sessionStorage.setItem('dispEon', 'off');
        sessionStorage.setItem('dispEra', 'off');
        sessionStorage.setItem('dispPer', 'off');
        var subs = false;
    } else {
        var subs = true; // this is a page refresh...
    }
    eage = $('#xopt').text(); // page startup default for earth's age
    /* 
     * Even though the xlsx-reader.js script has been loaded, asynchronous
     * reading of the files and conversion into objects needed by this
     * routine is not ready for page load. Hence, the variable 'timing' 
     * must be set by the reader before this routine can proceed: 
     * i.e. the setInterval statement following.
     */
    $timeout = setInterval( function() {
        if (timing) {
            displaySection('main','');
            if (subs) {
                // pg refresh: if any settings are on, dispEon must be also
                currEon = sessionStorage.getItem('dispEon');
                if (currEon !== 'off') {
                    displaySection('eon', currEon);
                    currEra = sessionStorage.getItem('dispEra');
                    if (currEra !== 'off') {
                        displaySection('era', currEra);
                        currPer = sessionStorage.getItem('dispPer');
                        if (currPer !== 'off') {
                            displaySection('period', currPer);
                        }
                    }
                }
            }
            clearInterval($timeout);
        }
    }, 5);

    /*
     * EVENT DEFINITIONS
     */
    // Clickable EONS in MAIN VIEW (Always only one set of boxes):
    $('#Hadean').on('click', function() {
        displaySection('eon', 'Hadean');
    });
    $('#Archean').on('click', function() {
        displaySection('eon', 'Archean');
    });
    $('#Proterozoic').on('click', function() {
        displaySection('eon', 'Proterozoic');
    });
    $('#Phanerozoic').on('click', function() {
        displaySection('eon', 'Phanerozoic');
    });
    // Clickable ERAS (Proterozoic & Phanerozoic) IN EON VIEW:
    $('#Proterozoic0').on('click', function() {
        displaySection('era','Paleo');
    });
    $('#Proterozoic1').on('click', function() {
        displaySection('era', 'Meso');
    });
    $('#Proterozoic2').on('click', function() {
        displaySection('era', 'Neo');
    });
    $('#Phanerozoic0').on('click', function() {
        displaySection('era', 'Paleozoic');
    });
    $('#Phanerozoic1').on('click', function() {
        displaySection('era', 'Mesozoic');
    });
    $('#Phanerozoic2').on('click', function() {
        displaySection('era', 'Cenozoic');
    });
    // Clickable PERIODS in ERA VIEW:'
    $('#Paleozoic0').on('click', function() {
        displaySection('period', 'Cambrian');
    });
    $('#Paleozoic1').on('click', function() {
        displaySection('period', 'Ordovician');
    });
    $('#Paleozoic2').on('click', function() {
        displaySection('period', 'Silurian');
    });
    $('#Paleozoic3').on('click', function() {
        displaySection('period', 'Devonian');
    });
    $('#Paleozoic4').on('click', function() {
        displaySection('period', 'Carboniferous');
    });
    $('#Paleozoic5').on('click', function() {
        displaySection('period', 'Permian');
    });
    $('#Mesozoic0').on('click', function() {
        displaySection('period', 'Triassic');
    });
    $('#Mesozoic1').on('click', function() {
        displaySection('period', 'Jurassic');
    });
    $('#Mesozoic2').on('click', function() {
        displaySection('period', 'Cretaceous');
    });
    $('#Cenozoic0').on('click', function() {
        displaySection('period', 'Paleogene');
    });
    $('#Cenozoic1').on('click', function() {
        displaySection('period', 'Neogene');
    });
    $('#Cenozoic2').on('click', function() {
        displaySection('period', 'Quaternary');
    });
    $('#holo').on('mouseover', function() {
        $(this).css('cursor','pointer');
    });
    $('#holo').on('click', function() {
        alert("Display not yet implemented");
    });

    // RESIZING OF WINDOW:
    $(window).resize( function() {
        if (resizeFlag) {
            resizeFlag = false;
            setTimeout( function() {
                pgwidth = window.innerWidth - scrollBars;
                displaySection('main','');
                currEon = sessionStorage.getItem('dispEon');
                if (currEon !== 'off') {
                    displaySection('eon', currEon);
                    currEra = sessionStorage.getItem('dispEra');
                    if (currEra !== 'off') {
                        displaySection('era', currEra);
                        currPer = sessionStorage.getItem('dispPer');
                        if (currPer !== 'off') {
                            displaySection('period', currPer);
                        }
                    }
                }
                resizeFlag = true; 
            }, 400);      
        }  
    });
});