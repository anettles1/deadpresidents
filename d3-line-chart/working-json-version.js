//NOTE TO SELF
//This is the working version w/ JSON identical to what we get from Tabletop... so now, just a matter of taking the Tabletop from Google Docs and integrating here. Phew! 

var dataset; 
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatDate = d3.time.format("%m/%d/%Y");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.sentiment); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("sentiment-data.json", function(error,json) {
    if (error) {  //If error is not null, something went wrong.
          console.log(error);  //Log the error.
        } else {      //If no error, the file loaded correctly. Yay!
          console.log("data load complete");   //Log the data.
        }
      //Include other code to execute after successful file load here
      //dataset = data;
   data = json;
   type(data);
   x.domain(d3.extent(data, function(d) { return d.date; }));
   y.domain(d3.extent(data, function(d) { return d.sentiment; }));
   
   svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Consumer confidence");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
});


function type(d) {
  for (var i = 0; i < data.length; i++) {
    d[i].date = formatDate.parse(d[i].date);
    d[i].sentiment = +d[i].sentiment;
  };
  return d;
  console.log("type complete")
}


/*
d3.json("sentiment-data.json", type, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.sentiment; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Consumer confidence");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
});
/*
function type(d) {
  d.date = formatDate.parse(d.date);
  d.sentiment = +d.sentiment;
  return d;
  console.log("type called");
}*/