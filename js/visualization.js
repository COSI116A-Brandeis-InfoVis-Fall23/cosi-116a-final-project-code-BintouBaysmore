// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {

  var svgStates = d3.select("svg #states"),
  svgBoundary = d3.select("svg #boundary"),
  states = {},
  startYear = 1790,
  currentYear = startYear;

var width = window.innerWidth, // (1)
height = window.innerHeight;

var projection = d3.geoAlbersUsa()
.translate([width / 2.3, height /3]);  // (2)

var path = d3.geoPath()
  .projection(projection);  // (3)

d3.json("data/usa.json", function(error, boundary) {
  svgBoundary.selectAll("path")
      .data(boundary.features)
      .enter()
  .append("path")
      .attr("d", path)
     });
d3.json("data/states.json", function(error, topologies) {  // (4)

var state = topojson.feature(topologies[11], topologies[11].objects.stdin);  // (5)

svgStates.selectAll("path")  
    .data(state.features)
    .enter()
  .append("path")
    .attr("d", path)
    .style("stroke","#000") 
  .style("fill", function(d, i) { 
    console.log("d is ", d)
    var name = d.properties.STATENAM.replace(" Territory", ""); 
    return colors[name]; 
  })
  .append("svg:title")
.text(function(d) { return d.properties.STATENAM; });
});
})());

//NYC chart
var total = 156,
    buttons = document.querySelector('.buttons'),
    pie = document.querySelector('.pie'),
    activeClass = 'active';

var continents = {
  puertoRican: 23,
  African : 11,
  Mexican: 10,
  Dominican: 9,
  TrainRiders: 69,
};

// work out percentage as a result of total
var numberFixer = function(num){
  var result = ((num * total) / 100);
  return result;
}

// create a button for each country
for(property in continents){
  var newEl = document.createElement('button');
  newEl.innerText = property;
  newEl.setAttribute('data-name', property);
  buttons.appendChild(newEl);
}

// when you click a button setPieChart and setActiveClass
  buttons.addEventListener('click', function(e){
    if(e.target != e.currentTarget){
      var el = e.target,
          name = el.getAttribute('data-name');
      setPieChart(name);
      setActiveClass(el);
    }
    e.stopPropagation();
  });

var setPieChart = function(name){
  var number = continents[name],
      fixedNumber = numberFixer(number),
      result = fixedNumber + ' ' + total;
  
  pie.style.strokeDasharray = result;
}

var setActiveClass = function(el) {
  for(var i = 0; i < buttons.children.length; i++) {
    buttons.children[i].classList.remove(activeClass);
    el.classList.add(activeClass);
  }
}

// Set up default settings
setPieChart('puertoRican');
setActiveClass(buttons.children[0]);