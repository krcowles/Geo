var eraSizes = {
'arch':
    [{left:4000,right:3600,color:AREOCOLOR},{left:3600,right:3200,color:ARPALEOCOLOR},
     {left:3200,right:2800,color:ARMESOCOLOR},{left:2800,right:2500,color:ARNEOCOLOR}],
'proto':
    [{left:2500,right:1600,color:PRPALEOCOLOR},{left:1600,right:1000,color:PRMESOCOLOR},
     {left:541,right:0,color:PRNEOCOLOR}],
'phan':
    [{left:541,right:230,color:PHPALEOCOLOR},{left:230,right:65,color:PHMESOCOLOR},
      {left:65,right:0,color:PHCENOCOLOR}]
};

var periodSizes = {
'proto':{
  protos:3,
  'proto1':[
    {left:2500,right:2300},{left:2300,right:2050},{left:2050,right:1800},
    {left:1800,right:1600}
  ],
  'proto2':[
    {left:1600,right:1400},{left:1400,right:1200},{left:1200,right:1000}
  ],
  'proto3':[
    {left:1000,right:720},{left:720,right:635},{left:635,right:541}
  ]
},
'phan':{
  phans:3,
  'phan1':[
    {left:541,right:500},{left:500,right:485},{left:485,right:435},
    {left:435,right:410},{left:410,right:350},{left:350,right:320},
    {left:320,right:290},{left:290,right:230}
  ],
  'phan2':[
    {left:230,right:192},{left:192,right:135},{left:135,right:65}
  ],
  'phan3':[
    {left:65,right:25},{left:25,right:0}
  ]
}
};

var epochSizes = {
// epochs are only defined in the phanerozoic era
};