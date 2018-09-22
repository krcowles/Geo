var eraSizes = {
    'arch': [
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
    
var periodSizes = {
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
    
    var epochSizes = {
    // epochs are only defined in the phanerozoic era
    };
    // Parameter settings for chart viewing areas:
chartParms = [
    // Main viewing area:
    {right:0, left:0, ticks:250, setNo:0, title:"Event Timeline",
        color:MAINCOLOR, adder:''},
    // Eons:
    {right:4000, left:0, ticks:25, setNo:1, title:"Hadean Timeline",
        color:HADCOLOR, adder:'Hadean Eon [No Eras Defined]'},
    {right:2500, left:4000, ticks:100, setNo:2, title:"Archean Timeline",
        color:ARCHCOLOR, adder:'Archean Eon [No Periods Defined for Eras]'},
    {right:541, left:2500, ticks:100, setNo: 3, title:"Proterozoic Timeline",
        color:PROTOCOLOR, adder:'Proterozoic Eon'},
    {right:0, left:541, ticks:25, setNo:4, title:"Phanerozoic Timeline",
        color:PHANCOLOR, adder:'Phanerozoic Eon'},
    // Eras:
    // Proterozoic (no Hadean or Archean):
    {right:1600, left:2500, ticks:50, setNo:5, title:"Paleo Timeline",
        color:PRPALEOCOLOR, adder:'Paleo Era'},
    {right:1000, left:1600, ticks:50, setNo:6, title:"Meso Timeline",
        color:PRMESOCOLOR, adder:'Meso Era'},
    {right:541, left:1000, ticks:50, setNo:7, title:"Neo Timeline",
        color:PRNEOCOLOR, adder:'Neo Era'},
    // Phanerozoic:
    {right:230, left:541, ticks:20, setNo:8, title:"Paleozoic Timeline",
        color:PHPALEOCOLOR, adder:'Paleozoic Era'},
    {right:65, left:230, ticks:20, setNo:9, title:"Mesozoic Timeline",
        color:PHMESOCOLOR},
    {right:0, left:65, ticks:5, setNo:10, title:"Cenozoic Timeline",
        color:PHCENOCOLOR}
    // Periods

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
// Phanerozoic Eon:
[{x:30, txt:"Rifting"}],
// Proto Paleo Era
[{x:1800, txt:"Any"}],
// Proto Meso Era
[{x:1300, txt:"Meso"}],
// Proto Neo Era
[{x:900, txt:"Neo"}],
// Phan Paleo Era
[{x:270, txt:"Paleozoic"}],
// Phan Mesozoic Era
[{x:100, txt:"Mesozoic"}],
// Phan Cenozoic Era
[{x:30, txt:"Cenozoic"}]

];

/*
{x:750, txt:"1st Protozoa"},
{x:650, txt:"All Snow"},
{x:600, txt:"Pan-African:"},
{x:600, txt:"Gondwana,Panotia"
*/
