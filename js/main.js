//----- Side Nav -----

let promisebtn = document.getElementById('promise-test');
let pt1 = document.getElementById('pt1');
let promisebtn2 = document.getElementById('promise-test2');
let pt2 = document.getElementById('pt2');


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

promisebtn.addEventListener('click', function (){
    return tabs(event,pt1);
});

promisebtn.click();

promisebtn2.addEventListener('click', function (){
    return tabs(event,pt2);
});


//----- Promises -----

function HideElements(itemArr) {
	let self = this;
	this._hide = function(el) {
		let node = el.getElementsByTagName('*');
		for (let i = node.length - 1; i >= 0; i--) {
			setTimeout(function(){
				node[i].style.transition = "all 1s";
				node[i].style.transform = "scale3d(0,0,0)";
				node[i].style.height = "0";
				if (i == 0) {
					node[i].parentElement.style.transition = "all 1s";
					node[i].parentElement.style.transform = "scale3d(0,0,0)";
				}
			}, (node.length - 1 - i) * 1000)
		};
	};
	
	this.move = function() {
		promise = new Promise((resolve, reject) => {
			resolve();
			reject();
		});	

		for (let i = 0; i < itemArr.length; i++) {
			promise.then(self._hide(itemArr[i]));
		}
	};	
}

//----- Promise1 -----
{
let item = pt1.querySelectorAll(".item");
let button = pt1.querySelector(".ui-button");
let progressBar = pt1.querySelector(".indicator");
let hideConsecutive = new HideElements(item);

button.addEventListener('click', function(){
	progressBar.style.width = "100%";
})

progressBar.addEventListener('transitionend', function(){
	hideConsecutive.move();
})
}
//----- Promise2 -----

{
let item = pt2.querySelectorAll(".item");
let button1 = pt2.querySelector(".ui-button");
let progressBar1 = pt2.querySelector(".indicator");
let hideSimul = new HideElements(item);
	
button1.addEventListener('click', function(){
		progressBar1.style.width = "100%";
})
progressBar1.addEventListener('transitionend', function(){
	hideSimul._hide = function (el) {
		let node = el.getElementsByTagName('*');
		for (let i = node.length - 1; i >= 0; i--) {
			node[i].style.transition = "all 1s";
			node[i].style.transform = "scale3d(0,0,0)";
			node[i].style.height = "0";
			if (i == 0) {
				node[i].parentElement.style.transition = "all 1s";
				node[i].parentElement.style.transform = "scale3d(0,0,0)";
			}
		};
	}
	hideSimul.move();
})
}

