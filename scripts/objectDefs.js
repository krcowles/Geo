// The following shapes appear as boxes with the MAIN View:
var eonShapes = {
    // hadean left will be set to eage, which is a variable
    'hadean': {left:0, right:4000, color: HADCOLOR},
    'archean': {left:4000, right:2500, color:ARCHCOLOR},
    'proto': {left:2500, right:541, color:PROTOCOLOR},
    'phan': {left:541, right:0, color:PHANCOLOR}
};
// These shapes are the boxes (eras) within the named eon in EON View:
var eraShapes = {
    'archean': [
      {left:4000, right:3600, color:AREOCOLOR},
      {left:3600, right:3200, color:ARPALEOCOLOR},
      {left:3200, right:2800, color:ARMESOCOLOR},
      {left:2800, right:2500, color:ARNEOCOLOR}
    ],
    'proto':[
      {left:2500, right:1600, color:PRPALEOCOLOR},
      {left:1600, right:1000, color:PRMESOCOLOR},
      {left:1000, right:541, color:PRNEOCOLOR}
    ],
    'phan':[
      {left:541, right:251, color:PHPALEOCOLOR},
      {left:251, right:66, color:PHMESOCOLOR},
      {left:66, right:0, color:PHCENOCOLOR}
    ]
};
// These are the boxes (periods) within the named era in ERA View: 
var periodShapes = {
    'proto_paleo':[
      {left:2500, right:2300, color:SIDERIANCOLOR},
      {left:2300, right:2050, color:RHYACIANCOLOR},
      {left:2050, right:1800, color:OROSIRIANCOLOR},
      {left:1800, right:1600, color:STATHERIANCOLOR}
    ],
    'proto_meso':[
      {left:1600,right:1400, color:CALYMMIANCOLOR},
      {left:1400,right:1200, color:ECTASIANCOLOR},
      {left:1200,right:1000, color:STENIANCOLOR}
    ],
    'proto_neo':[
        {left:1000,right:720, color:TONIANCOLOR},
        {left:720,right:635, color:CRYOGENIANCOLOR},
        {left:635,right:541, color:EDIACARANCOLOR}
    ],
    'phan_paleo':[
        {left:541,right:485, color:CAMBRIANCOLOR},
        {left:485,right:443, color:ORDOVICIANCOLOR},
        {left:443,right:419, color:SILURIANCOLOR},
        {left:419,right:359, color:DEVONIANCOLOR},
        {left:359,right:299, color:CARBONIFEROUSCOLOR},
        {left:299,right:252, color:PERMIANCOLOR}
    ],
    'phan_meso':[
        {left:252 ,right:201, color:TRIASSICCOLOR},
        {left:201, right:145, color:JURASSICCOLOR},
        {left:145,right:66, color:CRETACEOUSCOLOR}
    ],
    'phan_ceno':[
        {left:66,right:23, color:PALEOGENECOLOR},
        {left:23,right:2.5, color:NEOGENECOLOR},
        {left:2.5, right:0, color:QUATERNARYCOLOR}
    ]
};
// These are the boxes (Epochs) appearing within the named period in PERIOD View:
var epochShapes = {
    'cambrian': [
        {left:540, right:521, color:TERRENUEVIANCOLOR},
        {left:521, right:509, color:SERIES2COLOR},
        {left:509, right:497, color:SERIES3COLOR},
        {left:497, right:485, color:FURONGIANCOLOR}

    ],
    'ordovician': [
        {left:485, right:470, color:LOWERCOLOR},
        {left:470, right:458, color:MIDDLECOLOR},
        {left:458, right:443, color:UPPERCOLOR}
    ],
    'silurian': [
        {left:443, right:433, color:LLANDOVERYCOLOR},
        {left:433, right:427, color:WENLOCKCOLOR},
        {left:427, right:423, color:LUDLOWCOLOR},
        {left:423, right:419, color:PRIDOLICOLOR}
    ],
    'devonian': [
        {left:419, right:393, color:DLOWERCOLOR},
        {left:393, right:382, color:DMIDDLECOLOR},
        {left:382, right:359, color:DUPPERCOLOR},
    ],
    'carboniferous': [
        {left:359, right:347, color:LMISSISSIPPIANCOLOR},
        {left:347, right:331, color:MMISSISSIPPIANCOLOR},
        {left:331, right:323, color:UMISSISSIPPIANCOLOR},
        {left:323, right:315, color:LPENNSYLVANIANCOLOR},
        {left:315, right:307, color:MPENNSYLVANIANCOLOR},
        {left:307, right:299, color:UPENNSYLVANIANCOLOR}
    ],
    'permian': [
        {left:299, right:273, color:CISURALIANCOLOR},
        {left:273, right:259, color:GUADALUPIANCOLOR},
        {left:259, right:251, color:LOPINGIANCOLOR}
    ],
    'triassic': [
        {left:251, right:247, color:TLOWERCOLOR},
        {left:247, right:237, color:TMIDDLECOLOR},
        {left:237, right:201, color:TUPPERCOLOR}
    ],
    'jurassic': [
        {left:201, right:174, color:JLOWERCOLOR},
        {left:174, right:163, color:JMIDDLECOLOR},
        {left:163, right:145, color:JUPPERCOLOR}
    ],
    'cretaceous': [
        {left:145, right:100, color:CLOWERCOLOR},
        {left:100, right:66, color:CUPPERCOLOR}
    ],
    'paleogene': [
        {left:65, right:56, color:PALEOCENECOLOR},
        {left:56, right:34, color:EOCENECOLOR},
        {left:34, right:23, color:OLIGOCENECOLOR}
    ],
    'neogene': [
        {left:23, right:5, color:MIOCENECOLOR},
        {left:5, right:2.5, color:PLIOCENECOLOR}
    ],
    'quaternary': [
        {left:2.5, right:0.0117, color:PLEISTOCENECOLOR},
        {left:0.0117, right:0, color:HOLOCENECOLOR}
    ]
};
    
var chartParms = [
    // Main viewing area:
    {ticks:250, setNo:0, title:"Event Timeline",color:ALLCHARTS,
        adder:''},
    // Eons:
    {ticks:25, setNo:1, title:"Hadean Timeline", color:ALLCHARTS,
        adder:'Hadean Eon [No Eras Defined]'},
    {ticks:100, setNo:2, title:"Archean Timeline", color:ALLCHARTS,
        adder:'Archean Eon [No Periods Defined for Eras]'},
    {ticks:100, setNo: 3, title:"Proterozoic Timeline", color:ALLCHARTS,
        adder:'Proterozoic Eon'},
    {ticks:25, setNo:4, title:"Phanerozoic Timeline", color:ALLCHARTS,
        adder:'Phanerozoic Eon'},
    // Eras:
    // Proterozoic (no Hadean or Archean):
    {ticks:50, setNo:5, title:"Paleo Timeline", color:ALLCHARTS,
        adder:'Paleo Era'},
    {ticks:50, setNo:6, title:"Meso Timeline", color:ALLCHARTS,
        adder:'Meso Era'},
    {ticks:50, setNo:7, title:"Neo Timeline", color:ALLCHARTS,
        adder:'Neo Era'},
    // Phanerozoic:
    {ticks:20, setNo:8, title:"Paleozoic Timeline", color:ALLCHARTS,
        adder:'Paleozoic Era'},
    {ticks:20, setNo:9, title:"Mesozoic Timeline", color:ALLCHARTS,
        adder:'Mesozoic Era'},
    {ticks:5, setNo:10, title:"Cenozoic Timeline", color:ALLCHARTS,
        adder:'Cenozoic Era'},
    // Periods
    {ticks:10, setNo:11, title:"Siderian Timeline", color:ALLCHARTS,
        adder:'Siderian Period [No Epochs Defined]'},
    {ticks:10, setNo:12, title:"Rhyacian Timeline", color:ALLCHARTS,
        adder:'Rhyacian Period [No Epochs Defined]'},
    {ticks:10, setNo:13, title:"Orosirian Timeline", color:ALLCHARTS,
        adder:'Orosirian Period [No Epochs Defined]'},
    {ticks:10, setNo:14, title:"Statherian Timeline", color:ALLCHARTS,
        adder:'Statherian Period [No Epochs Defined]'},

    {ticks:10, setNo:15, title:"Calymmian Timeline", color:ALLCHARTS,
        adder:'Calymmian Period [No Epochs Defined]'},
    {ticks:10, setNo:16, title:"Ectasian Timeline", color:ALLCHARTS,
        adder:'Ectasian Period [No Epochs Defined]'},
    {ticks:10, setNo:17, title:"Stenian Timeline", color:ALLCHARTS,
        adder:'Stenian Period [No Epochs Defined]'},

    {ticks:10, setNo:18, title:"Tonian Timeline", color:ALLCHARTS,
        adder:'Tonian Period [No Epochs Defined]'},
    {ticks:5, setNo:19, title:"Cryogenian Timeline", color:ALLCHARTS,
        adder:'Cryogenian Period [No Epochs Defined]'},
    {ticks:5, setNo:20, title:"Ediacaran Timeline", color:ALLCHARTS,
        adder:'Ediacaran Period [No Epochs Defined]'},

    {ticks:5, setNo:21, title:"Cambrian Timeline", color:ALLCHARTS,
        adder:'Cambrian Period'},
    {ticks:5, setNo:22, title:"Ordovician Timeline", color:ALLCHARTS,
        adder:'Ordovician Period'},
    {ticks:5, setNo:23, title:"Silurian Timeline", color:ALLCHARTS,
        adder:'Silurian Period'},
    {ticks:5, setNo:24, title:"Devonian Timeline", color:ALLCHARTS,
        adder:'Devonian Period'},
    {ticks:5, setNo:25, title:"Carboniferous Timeline", color:ALLCHARTS,
        adder:'Carboniferous Period'},
    {ticks:5, setNo:26, title:"Permian Timeline", color:ALLCHARTS,
        adder:'Permian Period'},

    {ticks:5, setNo:27, title:"Triassic Timeline", color:ALLCHARTS,
        adder:'Triassic Period'},
    {ticks:5, setNo:28, title:"Jurassic Timeline", color:ALLCHARTS,
        adder:'Jurassic Period'},
    {ticks:5, setNo:29, title:"Cretaceous Timeline", color:ALLCHARTS,
        adder:'Cretaceous Period'},

    {ticks:5, setNo:30, title:"Paleogene Timeline", color:ALLCHARTS,
        adder:'Paleogene Period'},
    {ticks:5, setNo:31, title:"Neogene Timeline", color:ALLCHARTS,
        adder:'Neogene Period'},
    {ticks:0.5, setNo:32, title:"Quaternary Timeline", color:ALLCHARTS}
];
/*
 *  ----- Data sets of events corresponding to clickable timelines -----
 * 
 * This section defines data which needs to correspond directly with the
 * tables in index.html. When data changes here, the tables must be manually
 * adjusted to comply.
 * NOTE: Occasionally, times appear to be out of order, but are so arranged
 * to prevent colliding with Timeline Title.
 */
dataSets = [
// All Eons: the Grand Scheme...
[{x:2500, txt:"C"}, {x:4200, txt: "B"}, {x:4400, txt:"A"}, {x:541, txt:"D"}],
// Hadean Eon:
[{x:4400, txt: "early water; zircon crystals (Australia)"},
    {x:4200, txt: "earliest life (1-celled)"}],
// Major events in Eons:
[{x:4000, txt:"A"}, {x:3500, txt:"B"}, {x:2700, txt:"C"}],
[{x:2500, txt:"D"}, {x:1700, txt:"F"}, {x:2300, txt:"E"}, {x:1650, txt:"G"},
    {x:1500, txt:"H"}, {x:1400, txt:"I"}, {x:1000, txt:"J"},
    {x:850, txt:"K"}, {x:750, txt:"L"}, {x:650, txt:"M"}, {x:600, txt:"N"},
    {x:541, txt:"O"}],
// Phanerozoic Eon [4]
[{x:540, txt:"P"}, {x:30, txt:"Q"}],

// Proto Paleo Era [5]
[{x:1800, txt:"Any"}],
// Proto Meso Era [6]
[{x:1300, txt:"Meso"}],
// Proto Neo Era [7]
[{x:900, txt:"Neo"}],
// Phan Paleo Era [8]
[{x:270, txt:"Paleozoic"}],
// Phan Mesozoic Era [9]
[{x:100, txt:"Mesozoic"}],
// Phan Cenozoic Era [10]
[{x:30, txt:"Cenozoic"}],
// Siderian Epoch [11]
[{x:2400, txt:"Whatever"}],
// Rhyacian Epoch [12]
[{x:2100, txt:"Whatever"}],
// Orosirian Epoch [13]
[{x:1900, txt:"Whatever"}],
// Statherian Epoch [14]
[{x:1700, txt:"Whatever"}],
// Calymmian Epoch [15]
[{x:1500, txt:"Whatever"}],
// Ectasian Epoch [16]
[{x:1350, txt:"Whatever"}],
// Stenian Epoch [17]
[{x:1100, txt:"Whatever"}],
// Tonian Epoch [18]
[{x:750, txt:"Whatever"}],
// Cryogenian Epoch [19]
[{x:650, txt:"Whatever"}],
// Ediacaran Epoch [20]
[{x:600, txt:"Whatever"}],
// Eocambrian Epoch [21]
[{x:540, txt:"Whatever"}],
// Cambrian Epoch [22]
[{x:500, txt:"Whatever"}],
// Ordovician Epoch [23]
[{x:475, txt:"Whatever"}],
// Silurian Epoch [24]
[{x:420, txt:"Whatever"}],
// Devonian Epoch [25]
[{x:370, txt:"Whatever"}],
// Mississippian Epoch [26]
[{x:330, txt:"Whatever"}],
// Pennsylvanian Epoch [27]
[{x:300, txt:"Whatever"}],
// Permian Epoch [28]
[{x:260, txt:"Whatever"}],
// Triassic Epoch [29]
[{x:230, txt:"Whatever"}],
// Jurassic Epoch [30]
[{x:180, txt:"Whatever"}],
// Cretaceous Epoch [31]
[{x:100, txt:"Whatever"}],
// Paleogene Epoch [32]
[{x:50, txt:"Whatever"}],
// Neogene Epoch [33]
[{x:15, txt:"Whatever"}]
];
