//----- Table Generator ----- 

var firstValue = document.getElementById("input1");
var secondValue = document.getElementById("input2");
var btn = document.getElementById("btn");

function create () {
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

setInterval (function currentTime () {
	let date = new Date();
	let dd = date.getDate();
	let mm = date.getMonth() + 1;
	let yyyy = date.getFullYear();	
 	let hours = date.getHours();
 	let min = date.getMinutes();
 	let sec = date.getSeconds();
	let weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	
	if (mm < 10) {
		mm = `0` + mm;
	}
	
	if (dd < 10) {
		dd = `0` + dd;
	}
	
	document.getElementById("time").innerHTML = `${dd}.${mm}.${yyyy} ${hours} hours ${min} min ${sec} sec, ${weekDay[date.getDay()]}`;	
},1000)