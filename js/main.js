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
		// removeEl('.pageinner', '.resolution');
	},1000);;
};

function removeEl (parent, child) {
	return setTimeout(function(){
		let removedItem = document.querySelector(child);
		document.querySelector(parent).removeChild(removedItem);
	}, 2000)
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



//----- First Try (fail) -----

//function timer(){
//    let sec = document.querySelector('.secs').innerHTML;
//		let min = document.querySelector('.mins').innerHTML;
//		let hour = document.querySelector('.hour').innerHTML;
//    let end = false;
//     
//    if( sec < 59 ) sec++;
//    	else	{
//        sec = 0; 
//        if( min < 59 ) min++;
//        	else	{
//            min = 00;
//						hour++;
//    			}
//				}
//		if (sec < 10) {
//			sec = `0` + sec;
//		}
//	
//		document.querySelector('.hour').innerHTML = hour;
//		document.querySelector('.mins').innerHTML = min;
//		document.querySelector('.secs').innerHTML = sec;
//}
//	window.intervalID = setInterval(timer, 1000);
//

//----- Second Try (fail) -----

//var start = document.querySelector('.start');
//var sec = document.querySelector('.secs');
//var min = document.querySelector('.mins');
//var hours = document.querySelector('.hours');
//var flag = false;
//
//function startStopwatch() {
// if(!flag) initialDate = new Date;
//}
//
//function getTime() {
//
//  var currentDate = new Date;
//  timer = new Date (currentDate - initialDate);
//	console.log(timer);
//  seconds = timer.getSeconds();
//  minutes = timer.getMinutes();
//  hours = timer.getUTCHours();
//  if(seconds < 10){
//    seconds = '0' + seconds;
//  }
//  if (minutes < 10){
//    minutes = '0' + minutes;
//  }
//  if (hours < 10){
//    hours = '0' + hours;
//  }
//	sec.innerHTML = seconds;
//  min.innerHTML = minutes;
//  hours.innerHTML = hours;
//}
//
//function displayTimer() {
//  timerId = setInterval(getTime, 1000);
//}
//
//function stopTimer() {
//	clearInterval(timerId);
//	flag = true;
//}
//
//
//start.addEventListener('click', startStopwatch);
//start.addEventListener('click', displayTimer);
//sec.addEventListener('mouseover', stopTimer);
//sec.addEventListener('mouseout', displayTimer);


