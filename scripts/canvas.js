// globals established by the functions below:
var margin = {};
var renderType = {};
var chartWidth;
var chartHeight;
var xMax;
var yMax;
var context;
var data = {};
var labelFont;
var horizon; // location of horizontal timeline
var MaPerPx;

/*
 * The chart will be drawn for each span of time selected by the user,
 * where the default is the age of the earth. The span is supplied
 * as an argument (tspan) to the render method of the object, as is
 * the tick interval (tint).
 */

// define the main Chart Object
var ChartObj = function() {
    // the chart sits in a <div> and margins are defined for the fill
    margin = { top: 4, left: 0, right: 4, bottom: 12 };
    renderType = { lines: 'lines', points: 'points' };
    
    return { renderType: renderType,  // 1st object member is an object
        // 2nd obj member is render function
        render: function(canvasId, dataObj) { 
            data = dataObj; // contains events and times
            var canvas = document.getElementById(canvasId);
            chartHeight = canvas.height;
            chartWidth = canvas.width;
            xMax = chartWidth;
            yMax = chartHeight;
            horizon = 0.70 * yMax;
            MaPerPx = (data.left - data.right)/chartWidth;
            context = canvas.getContext("2d");
            renderChart();
        }
    };
} ();
var renderChart = function () {
    renderBackground();
    renderText();
    renderLinesAndLabels();
    //render data based upon type of renderType(s) that client supplies
    if (data.renderTypes == undefined || data.renderTypes == null) {
        data.renderTypes[1] = [renderType.points];
    }
    renderData(data.renderTypes[1]);
};
var renderBackground = function () {
    context.fillStyle = data.background;
    // the first two args are the (x,y) coords for the left corner;
    // the last two specify width and height of the fill area:
    context.fillRect(margin.left, margin.top, xMax, yMax);
    // e.g. the upper left corner is 4px from top and left edges of canvas
};
var renderText = function renderText() {
    labelFont = (data.labelFont != null) ? data.labelFont : '10pt Arial';
    context.font = labelFont;
    context.textAlign = "center";
    // chart text label
    var txtSize = context.measureText(data.title);
    // specify position of text placement wrt/canvas:
    var tx = margin.left + (xMax/2) - txtSize.width/2;
    var ty = margin.bottom + 8;
    context.fillStyle = 'Brown';
    context.fillText(data.title, tx, ty);
    /*
    //X-Axis text - as above - none at this time
    //Y-axis text - none at this time (needs rotation)
    context.save();
    context.rotate(-Math.PI/2);
    context.font = labelFont;
    // specify position of y axis text placement:
    tx = -1.4 * (yMax/2);
    ty = 20;
    context.fillStyle = 'Brown';
    context.fillText(data.yLabel, tx, ty);
    context.restore();
    */
};
var renderLinesAndLabels = function renderLinesAndLabels() {
    //Horizontal Line
    drawLine(margin.left, margin.top + horizon, margin.left + xMax, margin.top + horizon, 'black',2);
    
    // X AXIS: evenly spaced ticks based on tick spec.
    var xInc = data.ticks/MaPerPx; // tick increment in px
    var xEnd = margin.left; //  max value for x axis, in pixels
    var off = Math.floor(data.tickOffset/MaPerPx); // offset px for ticks
    context.fillStyle = 'Black';
    context.font = "8pt arial";
     // place x-axis labels just below x-axis horizontal line, ie.
     // from the chart top: top y margin + horizon + 16px further down
    var ty = margin.top + horizon + 16;
    var xPos = chartWidth - (xInc - off); // first tick won't show up
    var txt;  // the x-axis tick label
    context.textAlign = "center";
    var j = 1;
    // print out regularly spaced x-axis ticks from right-hand side:
    while (xPos > xEnd) {
        txt = parseInt(j * data.ticks) + parseInt(data.right) - parseInt(data.tickOffset);
        txt = txt.toFixed(0) + "M";
        var tsize = context.measureText(txt).width;
        var ulim = xEnd + xPos;
        if (j % 2 === 0 && tsize < ulim) { // only label every other one
                context.fillText(txt, xPos, ty); // ty is constant here
        }
        //Tick
        drawLine(xPos, (horizon - 4), xPos, (horizon + 10), 'black',1);
        xPos -= xInc;
        j += 1;
    }
    
};
var drawLine = function drawLine(startX, startY, endX, endY, strokeStyle, lineWidth) {
    if (strokeStyle != null) context.strokeStyle = strokeStyle;
    if (lineWidth != null) context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
    context.closePath();    
};
var renderData = function renderData(type) {
    var prevX = 0;
    var prevY = 0;
    var yLevel = [12, 22, 32];
    /* data points are x [MA], y is height 0, 1, or 2 in order
     * to stagger the labels and hopefully prevent overwriting.
     */
    context.fillStyle = 'DarkGreen';
    context.font = "8pt arial";
    context.textAlign = "left";
    for (var i = 0; i < data.dataPoints.length; i++) {
        var pt = data.dataPoints[i];
        // remember, age goes from right to left (oldest)
        var ptLoc = pt.x - data.right;
        var pxMA = ptLoc/MaPerPx;
        var ptX = margin.left + (chartWidth - pxMA);
        var ptY = horizon - yLevel[i % 3];
        var etxt = pt.txt;
        var epos = ptX + 10;
        /*
        if (i > 0 && type == renderType.lines) {
            //Draw connecting lines
            drawLine(ptX, ptY, prevX, prevY, 'DarkGreen', 2);
        }
        */
        if (type == renderType.points) {
            var radgrad = context.createRadialGradient(ptX, ptY, 4, ptX - 2, ptY - 2, 0);
            radgrad.addColorStop(0, 'Green');
            radgrad.addColorStop(0.9, 'White');
            context.beginPath();
            context.fillStyle = radgrad;
            //Render circle
            context.arc(ptX, ptY, 5, 0, 2 * Math.PI, false)
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = '#000';
            context.stroke();
            context.closePath();
            context.fillText(etxt, epos, ptY+4);
        }
        prevX = ptX;
        prevY = ptY;
    }
}
/*
function Thousands(value) {
    var newval = value;
    if (newval > 999) { // add coma
        var yTh = Math.floor(newval/1000); // truncated to thousands
        var yRem = newval - 1000 * yTh;
        if (yRem === 0) {
            yRem = '000';
        } else if (yRem > 0 && yRem < 10) {
            yRem = '00' + yRem;
        } else if (yRem > 9 && yRem < 100) {
            yRem = '0' + yRem;
        }
        newval = yTh + ',' + yRem;
    }
    return newval;
}
*/
