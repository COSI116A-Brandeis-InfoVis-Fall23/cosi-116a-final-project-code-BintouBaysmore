// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {

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