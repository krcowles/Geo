// Parameter settings for chart viewing areas:
chartParms = [
    {right:0, left:0, ticks:250, setNo:0, title:"Event Timeline",
        color:MAINCOLOR, adder:''},
    {right:4000, left:0, ticks:25, setNo:1, title:"Hadean Timeline",
        color:HADCOLOR, adder:'Hadean Eon [No Eras Defined]'},
    {right:2500, left:4000, ticks:100, setNo:2, title:"Archean Timeline",
        color:ARCHCOLOR, adder:'Archean Eon [No Periods Defined for Eras]'},
    {right:541, left:2500, ticks:100, setNo: 3, title:"Proterozoic Timeline",
        color:PROTOCOLOR, adder:'Proterozoic Eon'},
    {right:0, left:541, ticks:25, setNo:4, title:"Phanerozoic Timeline",
        color:PHANCOLOR, adder:'Phanerozoic Eon'},
    {right:2300, left:2500, ticks: 10, setNo:5, title:"Paleo Timeline",
        color:AREOCOLOR, adder:''}
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
    [{x:30, txt:"Rifting"}]
];

/*
{x:750, txt:"1st Protozoa"},
{x:650, txt:"All Snow"},
{x:600, txt:"Pan-African:"},
{x:600, txt:"Gondwana,Panotia"
*/