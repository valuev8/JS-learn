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
	let date = new Date();
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
		let currentDate = new Date();
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
		// removeEl('.page__inner', '.resolution');
	},1000);;
};

function removeEl (parent, child) {
	return setTimeout(function(){
		let removedItem = document.querySelector(child);
		document.querySelector(parent).removeChild(removedItem);
	}, 2000)
}

window.addEventListener('resize', getResolution);


