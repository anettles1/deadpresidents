//NOTE TO SELF
//This is the working version w/ JSON identical to what we get from Tabletop... so now, just a matter of taking the Tabletop from Google Docs and integrating here. Phew! 

var data;

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1JbN_9SSQfAWTVNhfs3r-L6dZyUgLaf5lvz8bbHBLnL4/pubhtml';

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 860 - margin.left - margin.right,
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

var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

window.onload = function() { init() };

function init() {
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: buildChart,
                     simpleSheet: true } )
}

function buildChart(json){
    console.log("Data loaded")
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
}

function type(d) {
  for (var i = 0; i < data.length; i++) {
    d[i].date = formatDate.parse(d[i].date);
    d[i].sentiment = +d[i].sentiment;
  };
  return d;
}


