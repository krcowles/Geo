var eonShapes = {
    // hadean left will be set to eage, which is a variable
    'hadean': {left:0, right:4000, color: HADCOLOR},
    'archean': {left:4000, right:2500, color:ARCHCOLOR},
    'proto': {left:2500, right:541, color:PROTOCOLOR},
    'phan': {left:541, right:0, color:PHANCOLOR}
};

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
      {left:541, right:0, color:PRNEOCOLOR}
    ],
    'phan':[
      {left:541, right:230, color:PHPALEOCOLOR},
      {left:230, right:65, color:PHMESOCOLOR},
      {left:65, right:0, color:PHCENOCOLOR}
    ]
};
    
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
        {left:541,right:500, color:EOCAMBRIANCOLOR},
        {left:500,right:485, color:CAMBRIANCOLOR},
        {left:485,right:435, color:ORDOVICIANCOLOR},
        {left:435,right:410, color:SILURIANCOLOR},
        {left:410,right:350, color:DEVONIANCOLOR},
        {left:350,right:320, color:MISSISSIPPIANCOLOR},
        {left:320,right:290, color:PENNSYLVANIANCOLOR},
        {left:290,right:230, color:PERMIANCOLOR}
    ],
    'phan_meso':[
        {left:230,right:192, color:TRIASSICCOLOR},
        {left:192,right:135, color:JURASSICCOLOR},
        {left:135,right:65, color:CRETACEOUSCOLOR}
    ],
    'phan_ceno':[
        {left:65,right:25, color:PALEOGENECOLOR},
        {left:25,right:0, color:NEOGENECOLOR}
    ]
};
    
var epochShapes = {
    'eocambrian': [
        {left:541, right:540.5, color:EOCAMBRIANCOLOR},
        {left:540.5, right:540, color:EOCAMBRIANCOLOR}
    ],
    'cambrian': [
        {left:540, right:520, color:CAMBRIANCOLOR},
        {left:520, right:500, color:CAMBRIANCOLOR},
        {left:500, right:485, color:CAMBRIANCOLOR}
    ],
    'ordovician': [
        {left:485, right:465, color:ORDOVICIANCOLOR},
        {left:465, right:450, color:ORDOVICIANCOLOR},
        {left:450, right:435, color:ORDOVICIANCOLOR}
    ],
    'silurian': [
        {left:435, right:430, color:SILURIANCOLOR},
        {left:430, right:425, color:SILURIANCOLOR},
        {left:425, right:420, color:SILURIANCOLOR},
        {left:420, right:410, color:SILURIANCOLOR}
    ],
    'devonian': [
        {left:410, right:400, color:DEVONIANCOLOR},
        {left:400, right:390, color:DEVONIANCOLOR},
        {left:390, right:380, color:DEVONIANCOLOR},
        {left:380, right:375, color:DEVONIANCOLOR},
        {left:375, right:365, color:DEVONIANCOLOR},
        {left:365, right:360, color:DEVONIANCOLOR},
        {left:360, right:350, color:DEVONIANCOLOR}
    ],
    'mississippian': [
        {left:350, right:340, color:MISSISSIPPIANCOLOR},
        {left:340, right:330, color:MISSISSIPPIANCOLOR},
        {left:330, right:320, color:MISSISSIPPIANCOLOR}
    ],
    'pennsylvanian': [
        {left:320, right:315, color:PENNSYLVANIANCOLOR},
        {left:315, right:310, color:PENNSYLVANIANCOLOR},
        {left:310, right:305, color:PENNSYLVANIANCOLOR},
        {left:305, right:300, color:PENNSYLVANIANCOLOR},
        {left:300, right:290, color:PENNSYLVANIANCOLOR}
    ],
    'permian': [
        {left:290, right:260, color:PERMIANCOLOR},
        {left:260, right:230, color:PERMIANCOLOR},
    ],
    'triassic': [
        {left:230, right:210, color:TRIASSICCOLOR},
        {left:210, right:200, color:TRIASSICCOLOR},
        {left:200, right:192, color:TRIASSICCOLOR}
    ],
    'jurassic': [
        {left:192, right:170, color:JURASSICCOLOR},
        {left:170, right:150, color:JURASSICCOLOR},
        {left:150, right:135, color:JURASSICCOLOR}
    ],
    'cretaceous': [
        {left:135, right:100, color:CRETACEOUSCOLOR},
        {left:100, right:65, color:CRETACEOUSCOLOR}
    ],
    'paleogene': [
        {left:65, right:50, color:PALEOGENECOLOR},
        {left:50, right:40, color:PALEOGENECOLOR},
        {left:40, right:25, color:PALEOGENECOLOR}
    ],
    'neogene': [
        {left:25, right:20, color:NEOGENECOLOR},
        {left:20, right:15, color:NEOGENECOLOR},
        {left:15, right:10, color:NEOGENECOLOR},
        {left:10, right:0, color:NEOGENECOLOR},
    ]
};
    
var chartParms = [
    // Main viewing area:
    {ticks:250, setNo:0, title:"Event Timeline",color:MAINCOLOR,
        adder:''},
    // Eons:
    {ticks:25, setNo:1, title:"Hadean Timeline", color:HADCOLOR,
        adder:'Hadean Eon [No Eras Defined]'},
    {ticks:100, setNo:2, title:"Archean Timeline", color:ARCHCOLOR,
        adder:'Archean Eon [No Periods Defined for Eras]'},
    {ticks:100, setNo: 3, title:"Proterozoic Timeline", color:PROTOCOLOR,
        adder:'Proterozoic Eon'},
    {ticks:25, setNo:4, title:"Phanerozoic Timeline", color:PHANCOLOR,
        adder:'Phanerozoic Eon'},
    // Eras:
    // Proterozoic (no Hadean or Archean):
    {ticks:50, setNo:5, title:"Paleo Timeline", color:PRPALEOCOLOR,
        adder:'Paleo Era'},
    {ticks:50, setNo:6, title:"Meso Timeline", color:PRMESOCOLOR,
        adder:'Meso Era'},
    {ticks:50, setNo:7, title:"Neo Timeline", color:PRNEOCOLOR,
        adder:'Neo Era'},
    // Phanerozoic:
    {ticks:20, setNo:8, title:"Paleozoic Timeline", color:PHPALEOCOLOR,
        adder:'Paleozoic Era'},
    {ticks:20, setNo:9, title:"Mesozoic Timeline", color:PHMESOCOLOR,
        adder:'Mesozoic Era'},
    {ticks:5, setNo:10, title:"Cenozoic Timeline", color:PHCENOCOLOR,
        adder:'Cenozoic Era'},
    // Periods
    {ticks:10, setNo:11, title:"Siderian Timeline", color:SIDERIANCOLOR,
        adder:'Siderian Period [No Epochs Defined]'},
    {ticks:10, setNo:12, title:"Rhyacian Timeline", color:RHYACIANCOLOR,
        adder:'Rhyacian Period [No Epochs Defined]'},
    {ticks:10, setNo:13, title:"Orosirian Timeline", color:OROSIRIANCOLOR,
        adder:'Orosirian Period [No Epochs Defined]'},
    {ticks:10, setNo:14, title:"Statherian Timeline", color:STATHERIANCOLOR,
        adder:'Statherian Period [No Epochs Defined]'},
    {ticks:10, setNo:15, title:"Calymmian Timeline", color:CALYMMIANCOLOR,
        adder:'Calymmian Period [No Epochs Defined]'},
    {ticks:10, setNo:16, title:"Ectasian Timeline", color:ECTASIANCOLOR,
        adder:'Ectasian Period [No Epochs Defined]'},
    {ticks:10, setNo:17, title:"Stenian Timeline", color:STENIANCOLOR,
        adder:'Stenian Period [No Epochs Defined]'},
    {ticks:10, setNo:18, title:"Tonian Timeline", color:TONIANCOLOR,
        adder:'Tonian Period [No Epochs Defined]'},
    {ticks:5, setNo:19, title:"Cryogenian Timeline", color:CRYOGENIANCOLOR,
        adder:'Cryogenian Period [No Epochs Defined]'},
    {ticks:5, setNo:20, title:"Ediacaran Timeline", color:EDIACARANCOLOR,
        adder:'Ediacaran Period [No Epochs Defined]'},
    {ticks:5, setNo:21, title:"Eocambrian Timeline", color:EOCAMBRIANCOLOR,
        adder:'Eocambrian Period'},
    {ticks:5, setNo:22, title:"Cambrian Timeline", color:CAMBRIANCOLOR,
        adder:'Cambrian Period'},
    {ticks:5, setNo:23, title:"Ordovician Timeline", color:ORDOVICIANCOLOR,
        adder:'Ordovicin Period'},
    {ticks:5, setNo:24, title:"Silurian Timeline", color:SILURIANCOLOR,
        adder:'Silurian Period'},
    {ticks:5, setNo:25, title:"Devonian Timeline", color:DEVONIANCOLOR,
        adder:'Devonian Period'},
    {ticks:5, setNo:26, title:"Mississippian Timeline", color:MISSISSIPPIANCOLOR,
        adder:'Mississippian Period'},
    {ticks:5, setNo:27, title:"Pennsylvanian Timeline", color:PENNSYLVANIANCOLOR,
        adder:'Pennsylvanian Period'},
    {ticks:5, setNo:28, title:"Permian Timeline", color:PERMIANCOLOR,
        adder:'Permian Period'},
    {ticks:5, setNo:29, title:"Triassic Timeline", color:TRIASSICCOLOR,
        adder:'Triassic Period'},
    {ticks:5, setNo:30, title:"Jurassic Timeline", color:JURASSICCOLOR,
        adder:'Jurassic Period'},
    {ticks:5, setNo:31, title:"Cretaceous Timeline", color:CRETACEOUSCOLOR,
        adder:'Cretaceous Period'},
    {ticks:5, setNo:32, title:"Paleogene Timeline", color:PALEOGENECOLOR,
        adder:'Paleogene Period'},
    {ticks:5, setNo:33, title:"Neogene Timeline", color:NEOGENECOLOR,
        adder:'Neogene Period'}
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
