import * as d3 from "d3";


// var width = 600;
// var height = 600;
// var img_w = 77;
// var img_h = 90;

// var svg = d3.select('body')
//             .append('svg')
//             .attr('width', width)
//             .attr('height', height)

// d3.json('data.json', function (error, root) {
//     if (error) {
//         return console.log(error)
//     }

//     console.log(root)

//     var force = d3.layout.force()
//                     .nodes(root.nodes)
//                     .links(root.edges)
//                     .linkDistance(200)
//                     .charge(-1500)
//                     .start()
//     console.log('force', force)

//     force.on('tick', function () {

//     })
// })

var nodes = [ { name: "GuiLin"    }, 
{ name: "GuangZhou" },
{ name: "XiaMen"    },
{ name: "HangZhou"   },
{ name: "ShangHai"   },
{ name: "QingDao"    },
{ name: "TianJin"    },
{ name: "BeiJing"    },
{ name: "ChangChun"  },
{ name: "XiAn"       },
{ name: "WuluMuQi"  },
{ name: "LaSa"       },
{ name: "ChengDu"    } ];

var edges = [  { source : 0  , target: 1 } ,
 { source : 1  , target: 2 } ,
 { source : 2  , target: 3 } ,
 { source : 3  , target: 4 } ,
 { source : 4  , target: 5 } ,
 { source : 5  , target: 6 } ,
 { source : 6  , target: 7 } ,
 { source : 7  , target: 8 } ,
 { source : 8  , target: 9 } ,
 { source : 9  , target: 10 } ,
 { source : 10 , target: 11 } ,
 { source : 11 , target: 12 } ,
 { source : 12 , target: 0 } ];	

var width = 600;
var height = 600;

console.log(edges);

var svg = d3.select("body").append("svg")
          .attr("width",width)
          .attr("height",height);

// var force = d3.layout.force()
//       .nodes(nodes)
//       .links(edges)
//       .size([width,height])
//       .linkDistance(200)
//       .charge([-100])
//       .start();
      
var svg_edges = svg.selectAll("line")
      .data(edges)
      .enter()
      .append("line")
      .style("stroke","#ccc")
      .style("stroke-width",1);

var color = d3.scale.category20();
      
var svg_nodes = svg.selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r",10)
      .style("fill",function(d,i){
          return color(i);
      })
    //   .call(force.drag);
      
// force.on("tick", function(){

// svg_edges.attr("x1",function(d){ return d.source.x; });
// svg_edges.attr("y1",function(d){ return d.source.y; });
// svg_edges.attr("x2",function(d){ return d.target.x; });
// svg_edges.attr("y2",function(d){ return d.target.y; });

// svg_nodes.attr("cx",function(d){ return d.x; });
// svg_nodes.attr("cy",function(d){ return d.y; });
// });
