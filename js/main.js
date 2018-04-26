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
			td.className = `row: ${i + 1} x data: ${j + 1}`;
			td.onclick = function () {
				alert(td.className);
			}
		}
	}
	document.querySelector(".table-wrapper").appendChild(table);
};