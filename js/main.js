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


//(function time (){
//	let date = new Date;
//    let time = document.getElementById("time");
//	let dd = `${date.getDate()}:`;
//	let mm = `${date.getMonth() + 1 }:`;
//	let yyyy = `${date.getFullYear()} `;	
// 	let hours = `${date.getHours()} hours `;
// 	let min = `${date.getMinutes()} min `;
// 	let sec = `${date.getSeconds()} sec `;
//	if (parseInt(mm) < 10) {
//		mm = `0` + mm;
//	}
//	
//	if (parseInt(min) < 10) {
//		min = `0` + min;
//	}
//	
//	if (parseInt(dd) < 10) {
//		dd = `0` + dd;
//	}
//	
//	let output = [dd,mm,yyyy,hours,min, sec];
//	
//	for (let i = 0; i < output.length; i++) {
//		let span = document.createElement('span')
//		span.innerHTML = output[i];
//		time.appendChild(span);
//	}
//	
//	setInterval (function checkChanges() {
//		let currentDate = new Date;
//		let dd = `${currentDate.getDate()}:`;
//		let mm = `${currentDate.getMonth() + 1 }:`;
//		let yyyy = `${currentDate.getFullYear()} `;	
//		let hours = `${currentDate.getHours()} hours `;
//		let min = `${currentDate.getMinutes()} min `;
//		let sec = `${currentDate.getSeconds()} sec `;
//		let currentArr = [dd,mm,yyyy,hours,min, sec];
//		
//		for (let i = 0; i < time.childNodes.length; i++) {
//			if (parseInt(time.childNodes[i].innerHTML) !== parseInt(currentArr[i])) {
//				time.childNodes[i].innerHTML = currentArr[i];
//			}
//		}
//	}, 1000);
//};)();

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


//----- Final Try -----

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

function slider(el) {
    let slider = el.querySelector('.slider');
    let slides = slider.querySelectorAll('.slide');
    let step = 0;
    this.next = function (){
        step++;
        for (let i = 0; i < slides.length; i++) {
            if (step >= slides.length) {
                slides[i].style.transform = `translateX(0)`
                step = 0;
                continue;
            }
            slides[i].style.transform = `translateX(-${step}00%)`;
        }
    }
    this.prev = function (){
        let slides = slider.querySelectorAll('.slide');
        step--;
        for (let i = 0; i < slides.length; i++) {
            if (step < 0) {
                step = slides.length - 1;
                slides[i].style.transform = `translateX(-${step}00%)`
                continue;
            }
            slides[i].style.transform = `translateX(-${step}00%)`;
        }
    }
}

let wrapper = document.getElementById("wrapper");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let test = new slider(wrapper);
next.addEventListener('click', test.next);
prev.addEventListener('click', test.prev);

//----- Side Nav -----

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