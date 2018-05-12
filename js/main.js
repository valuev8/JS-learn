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
		if (simultaneously) {
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
let hideConsecutive = new HideElements(item, {simultaneously: false});

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
let hideConsecutive = new HideElements(item, {simultaneously: true});

button.addEventListener('click', function(){
	progressBar.style.width = "100%";
})

progressBar.addEventListener('transitionend', function(){
	hideConsecutive.move();
});
}


