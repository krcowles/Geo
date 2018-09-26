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



// These are the boxes appearing within the named period in PERIOD View:
var epochShapes = {
    'cambrian': [
        {left:540, right:521, color:CAMBRIANCOLOR},
        {left:521, right:509, color:CAMBRIANCOLOR},
        {left:509, right:497, color:CAMBRIANCOLOR},
        {left:497, right:485, color:CAMBRIANCOLOR}

    ],
    'ordovician': [
        {left:485, right:470, color:ORDOVICIANCOLOR},
        {left:470, right:458, color:ORDOVICIANCOLOR},
        {left:458, right:443, color:ORDOVICIANCOLOR}
    ],
    'silurian': [
        {left:443, right:433, color:SILURIANCOLOR},
        {left:433, right:427, color:SILURIANCOLOR},
        {left:427, right:423, color:SILURIANCOLOR},
        {left:423, right:419, color:SILURIANCOLOR}
    ],
    'devonian': [
        {left:419, right:393, color:DEVONIANCOLOR},
        {left:393, right:382, color:DEVONIANCOLOR},
        {left:382, right:359, color:DEVONIANCOLOR},
    ],
    'carboniferous': [
        {left:359, right:347, color:CARBONIFEROUSCOLOR},
        {left:347, right:331, color:CARBONIFEROUSCOLOR},
        {left:331, right:323, color:CARBONIFEROUSCOLOR},
        {left:323, right:315, color:CARBONIFEROUSCOLOR},
        {left:315, right:307, color:CARBONIFEROUSCOLOR},
        {left:307, right:299, color:CARBONIFEROUSCOLOR}
    ],
    'permian': [
        {left:299, right:273, color:PERMIANCOLOR},
        {left:273, right:259, color:PERMIANCOLOR},
        {left:259, right:251, color:PERMIANCOLOR}
    ],
    'triassic': [
        {left:251, right:247, color:TRIASSICCOLOR},
        {left:247, right:237, color:TRIASSICCOLOR},
        {left:237, right:201, color:TRIASSICCOLOR}
    ],
    'jurassic': [
        {left:201, right:174, color:JURASSICCOLOR},
        {left:174, right:163, color:JURASSICCOLOR},
        {left:163, right:145, color:JURASSICCOLOR}
    ],
    'cretaceous': [
        {left:145, right:100, color:CRETACEOUSCOLOR},
        {left:100, right:66, color:CRETACEOUSCOLOR}
    ],
    'paleogene': [
        {left:65, right:56, color:PALEOGENECOLOR},
        {left:56, right:34, color:PALEOGENECOLOR},
        {left:34, right:23, color:PALEOGENECOLOR}
    ],
    'neogene': [
        {left:23, right:5, color:NEOGENECOLOR},
        {left:5, right:2.5, color:NEOGENECOLOR}
    ],
    'quaternary': [
        {left:2.5, right:0.0117, color:QUATERNARYCOLOR},
        {left:0.0117, right:0, color:QUATERNARYCOLOR}
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
        adder:'Mississippian Period'},
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
// Data sets of events corresponding to clickable timelines:
dataSets = [
// All Eons:
[{x:4400, txt:"Crust forming"}, {x:4000, txt: "Event3"},
    {x:2500, txt:"Event2"}, {x:200, txt:"Event1"}],
// Hadean Eon:
[{x:4400, txt: "early water; zircon crystals (Australia)"},
    {x:4200, txt: "earliest life (1-celled)"}],
// Archean Eon:
[{x:3950, txt:"Oldest Rock Belt (NW Territories) & impact events"},
    {x:3500, txt:"Earliest oxygen; photosynthesis"},
    {x:2700, txt:"Oldest magnetic rock"},
    {x:2700, txt:"Pangola ice age"}],
// Proterozoic Eon:
[{x:2450, txt:"Great oxygenation event"}, 
    {x:2450, txt:"Plate tectonics begin"},
    {x:2400, txt:"Huronian ice age (1st major)"},
    {x:1700, txt:"Oldest NM Rocks"},
    {x:1600, txt:"Mazatzql Orogeny"},
    {x:1480, txt:"Grenville Orogeny"},
    {x:1500, txt:"1st Multicellular life & sexual reproduction"},
    {x:1100, txt:"Rodinia Supercontinent"},
    {x:850, txt:"Sturtian-Varangian ice Age"},
    {x:850, txt:"Expand Era to see more"}],
// Phanerozoic Eon [4]
[{x:30, txt:"Rifting"}],
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
