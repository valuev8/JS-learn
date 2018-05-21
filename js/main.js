//----- Side Nav -----

let promisebtn = document.getElementById('promise-test');
let pt1 = document.getElementById('pt1');
let promisebtn2 = document.getElementById('promise-test2');
let pt2 = document.getElementById('pt2');
let tableBtn = document.getElementById('table-btn');
let tableGenerator = document.getElementById('table-generator');
let sliderBtn = document.getElementById('slider-btn');
let sliderWrapper = document.querySelector('.slider-wrapper');

function tabs (evt, target) {
    var i, tab, tablink;
    tab = document.getElementsByClassName("tab");
    for (i = 0; i < tab.length; i++) {
        tab[i].style.display = "none";
    }
    tablink = document.getElementsByClassName("tablink");
    for (i = 0; i < tablink.length; i++) {
        tablink[i].className = tablink[i].className.replace(" active", "");
    }
    target.style.display = "block";
    evt.currentTarget.className += " active";
}

tableBtn.addEventListener('click', function (){
    return tabs(event,tableGenerator);
});

tableBtn.click();

sliderBtn.addEventListener('click', function () {
    return tabs(event, sliderWrapper);
});

promisebtn.addEventListener('click', function (){
    return tabs(event,pt1);
});

promisebtn2.addEventListener('click', function (){
    return tabs(event,pt2);
});

//----- Table Generator ----- 

var firstValue = document.getElementById("input1");
var secondValue = document.getElementById("input2");
var btn = document.getElementById("btn");

function create () {
	if (document.querySelector('.table')) {
		let table = document.querySelector('.table');
		document.querySelector(".table-wrapper").removeChild(table);
	}
	
	let table = document.createElement('table');
	table.className = "table";
	if (!firstValue.value) {
		return alert ("You have to write the numbers of rows and datas");
	}
	for (let i = 0; i < firstValue.value; i++ ) {
		let tr = document.createElement("tr");
		table.appendChild(tr);
		for (let j = 0; j < secondValue.value; j++) {
			let td = document.createElement("td");
			tr.appendChild(td);
			td.onclick = function () {
				alert(`row ${i + 1} x cell ${j + 1}`);
			}
		}
	}
	document.querySelector(".table-wrapper").appendChild(table);
};

//----- Timer ----- 

(function time (){
	let date = new Date;
    let time = document.getElementById("time");
	let dd = `${date.getDate()}:`;
	let mm = `${date.getMonth() + 1 }:`;
	let yyyy = `${date.getFullYear()} `;	
 	let hours = `${date.getHours()} hours `;
 	let min = `${date.getMinutes()} min `;
 	let sec = `${date.getSeconds()} sec `;
	if (parseInt(mm) < 10) {
		mm = `0` + mm;
	}
	
	if (parseInt(min) < 10) {
		min = `0` + min;
	}
	
	if (parseInt(dd) < 10) {
		dd = `0` + dd;
	}
	
	let output = [dd,mm,yyyy,hours,min, sec];
	
	for (let i = 0; i < output.length; i++) {
		let span = document.createElement('span')
		span.innerHTML = output[i];
		time.appendChild(span);
	}
	
	setInterval (function checkChanges() {
		let currentDate = new Date;
		let dd = `${currentDate.getDate()}:`;
		let mm = `${currentDate.getMonth() + 1 }:`;
		let yyyy = `${currentDate.getFullYear()} `;	
		let hours = `${currentDate.getHours()} hours `;
		let min = `${currentDate.getMinutes()} min `;
		let sec = `${currentDate.getSeconds()} sec `;
		let currentArr = [dd,mm,yyyy,hours,min, sec];
		for (let i = 0; i < time.childNodes.length; i++) {
			if (parseInt(time.childNodes[i].innerHTML) !== parseInt(currentArr[i])) {
				time.childNodes[i].innerHTML = currentArr[i];
			}
		}
	}, 1000);
})();

//----- Resolution -----

let message = document.createElement('p');
let showMessage;
let getResolution = function () {
	let width = window.innerWidth;
	let height = window.innerHeight;
	clearTimeout(showMessage);
	showMessage = setTimeout(function() {
		message.className = 'resolution';
		message.title = "Your resolution";
		message.innerHTML = `${width} x ${height}`;
		document.querySelector('.page__inner').appendChild(message);
		removeEl('.page__inner', '.resolution');
	},1000);;
};

function removeEl (parent, child) {
	return setTimeout(function(){
		let removedItem = document.querySelector(child);
		document.querySelector(parent).removeChild(removedItem);
	}, 5000)
}

window.addEventListener('resize', getResolution);

//----- Stop Timer -----

function Stopwatch (timer) { //----- Constructor -----
	let time = 0;
	let offset;
	let interval;
	this.enabled = false;
	
	function update() {
		if (this.enabled) {
			time += timeDifference();
		}
		
		timer.textContent = timeFormatter(time);
	};
	
	function timeDifference () {
		let now = Date.now();
		let timePassed = now - offset;
		offset = now;
		return timePassed;
	};
	
	function timeFormatter(time) {
		time = new Date(time);
    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();
		var hours = time.getUTCHours().toString();

    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }
		
		if (hours.length < 2) {
      hours = '0' + hours;
    }
		
    return `${hours} : ${minutes} : ${seconds}`;
	};
	
	this.start = function() {
		interval = setInterval(update.bind(this), 1000);
		offset = Date.now();
		this.enabled = true;
	}
	this.stop = function() {
		clearInterval(interval);
		interval = null;
		this.enabled = false;
	}
	this.reset = function() {
		time = 0;
    update();
	}
}

let timer = document.querySelector(".timer");
let watch = new Stopwatch(timer); //----- Main Function -----

timer.addEventListener('mouseover', function() {
	watch.stop();
})

timer.addEventListener('mouseout', function() {
	watch.start();
})

window.addEventListener('load', watch.start())
window.addEventListener('keydown', function(event) {
	if (event.keyCode == 27) {
		watch.reset();
		console.log('You are press ESC and reset the timer!!!')
	}
})

//----- Slider -----

function Slider(el, options) {
    let slider = el.querySelector('.slider');
    let slides = slider.querySelectorAll('.slide');
    let i = 0;
    let step = 100;
  	this.interval;
//  	let dotsArr; in process.....
    let animationInProgress = true;
  	let infinite = options.infinite;
  	let cloneFirst = slides[0].cloneNode(true);
    let cloneLast = slider.lastElementChild.cloneNode(true);
    let animationCompleted = function () {
        animationInProgress = true
    }
    
    slider.addEventListener('transitionend', animationCompleted);
    slider.appendChild(cloneFirst);
    slider.insertBefore(cloneLast, slider.firstElementChild);
 	slider.style.transform = `translateX(-${step}%)`;
  	let self = this;
  
//  	(function pagination() { // In Process....
//	  let pagination = document.createElement('div');
//	  let dot;
//	  pagination.className = "slider-pagination";
//	  for (let i = 0; i < slides.length; i++) {
//		dot = document.createElement('span');
//		dot.className = "slider-dot";
//	  	pagination.appendChild(dot);
//	  };
//	  el.appendChild(pagination);
//	  dotsArr = pagination.querySelectorAll('.slider-dot');
//	})();
  
	function showFirstSlide() {
		slider.style.transition = `transform 0s`;
		i = 0;
		step = 100;
		slider.style.transform = `translateX(-${step}%)`;
	}
  
  	function showLastSlide() {
		slider.style.transition = `transform 0s`;
		i = slides.length - 1;
		step = 100 * slides.length;
		slider.style.transform = `translateX(-${step}%)`;
	}
  
    this.next = function (){
        if (animationInProgress == true) {
			slider.removeEventListener('transitionend', showFirstSlide);
		  	slider.removeEventListener('transitionend', showLastSlide);
			animationInProgress = false;
			step += 100;
			slider.style.transition = `transform 1s`;
			slider.style.transform = `translateX(-${step}%)`;
			i++;
		  
		  if (i >= slides.length) {
		  	  animationInProgress = false;
			  slider.addEventListener('transitionend', showFirstSlide);
          	}
        }
    }
        
    this.prev = function (){	
       if (animationInProgress == true) {
		   slider.removeEventListener('transitionend', showFirstSlide);
		   slider.removeEventListener('transitionend', showLastSlide);
		   animationInProgress = false;
		   step -= 100;
		   slider.style.transition = `transform 1s`;
		   slider.style.transform = `translateX(-${step}%)`;
		   i--;
		 if (i <= -1) {
		  	  animationInProgress = false;
			  slider.addEventListener('transitionend', showLastSlide);
          	}
        } 
    }
	
	if (infinite) {
	  this.interval = setInterval(function(){
		if (el.style.display === "block") {
		  animationInProgress = true;
		  self.next();
		}
	  }, 3000);
	}
}

let wrapper = document.getElementById("wrapper");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let test = new Slider(wrapper, {
  infinite: true
});
next.addEventListener('click', function(){
  clearTimeout(test.interval);
  test.next();
});
prev.addEventListener('click', function(){
  clearTimeout(test.interval);
  test.prev();
});

//----- Promise Constructor -----

function HideElements(itemArr, opt) {
	let self = this;
	let flag = true;
	let promise;
	let simultaneously = opt.simultaneously;
  
	this._hide = function(el) {
		let node = el.getElementsByTagName('*');
		let lastNode = node.length - 1;
		let promise1 = new Promise((resolve, reject) => {
			resolve(node[lastNode].style.transform = "scale3d(0,0,0)",
			node[lastNode].style.height = "0");
		})
		
		function hideEl(el){
			el.style.transition = "all 1s";
			el.style.transform = "scale3d(0,0,0)";
			el.style.height = "0";
		};
		
		if (flag === true) {
			flag = false;
			for (let i = node.length - 1; i >= 0; i--) {
				promise1.then(node[i].addEventListener('transitionend', function(){
					if (i != 0) event.stopPropagation();
					if (i == 0) {
						node[i].parentElement.style.transition = "all 1s";
						node[i].parentElement.style.marginBottom = "0";
						node[i].parentElement.style.height = "0";
						return;
					}
					hideEl(node[i - 1])
				}, false))
			};
		}
	}
	this.move = function() {
		promise = new Promise((resolve, reject) => {
			resolve(self._hide(itemArr[0]));
		})
		if (simultaneously === true) {
			for (let i = 0; i < itemArr.length; i++) {
				promise.then(self._hide(itemArr[i]));
				flag = true;
			}
			return;
		}
		for (let i = 0; i < itemArr.length - 1; i++) {
			promise.then(itemArr[i].addEventListener('transitionend', function(){
			flag = true;
			self._hide(itemArr[i + 1]);
		}))
		}
	};	
}

//----- Promise1 -----
{
let item = pt1.querySelectorAll(".item");
let button = pt1.querySelector(".ui-button");
let progressBar = pt1.querySelector(".indicator");
let hideConsecutive = new HideElements(item,{
  simultaneously: false,
});

button.addEventListener('click', function(){
	progressBar.style.width = "100%";
})

progressBar.addEventListener('transitionend', function(){
	hideConsecutive.move();
});
}

//----- Promise2 -----

{
let item = pt2.querySelectorAll(".item");
let button = pt2.querySelector(".ui-button");
let progressBar = pt2.querySelector(".indicator");
let hideConsecutive = new HideElements(item, {
  simultaneously: true,
});

button.addEventListener('click', function(){
	progressBar.style.width = "100%";
})

progressBar.addEventListener('transitionend', function(){
	hideConsecutive.move();
});
}

//----- Autocomplete -----

let autocomplete;
let weather = document.querySelector('.weather');
let button = document.getElementById("getData");
(function initialize() {
	var input = document.getElementById('searchTextField');
	autocomplete = new google.maps.places.Autocomplete(input)
})()

//----- Weather HTTP Request -----

google.maps.event.addDomListener(button, 'click', function(){
  
  if (!autocomplete.getPlace()) {
      cleanAll();
      var error = document.createElement("p");
      error.className = "weather__error";
      error.innerHTML = "Месторасположение не найдено!";
      weather.appendChild(error);
      return;
    }
  
    function cleanAll (){
        if (weather.children.length > 0) {
            while (weather.firstChild) {
                weather.removeChild(weather.firstChild);
            }
        } 
    }
  
    cleanAll();
    let lng = autocomplete.getPlace().geometry.location.lng();
    let lat = autocomplete.getPlace().geometry.location.lat();
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=ru&units=metric&APPID=ce7e4cb737aaf2517c53cc7df9409ff9`)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        let conditions = document.createElement('p');
        let icon = document.createElement('img');
        let temp = document.createElement('p');
        temp.className = "weather__temp"
        icon.className = "weather__icon";
        conditions.className = "weather__conditions";
        icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        temp.innerHTML = `Температура: ${Math.round(data.main.temp)} С`;
        conditions.innerHTML = `На улице: ${data.weather[0].description}`;
        weather.appendChild(icon);
        weather.appendChild(temp);
        weather.appendChild(conditions);
    })
    .catch(function(response){
      let error = document.createElement("p");
      error.className = "weather__error";
      error.innerHTML = `Данные не найдены!`;
      weather.appendChild(error);
    })
});