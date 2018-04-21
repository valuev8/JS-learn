let logo = document.querySelector('.logo');
let spinner = document.querySelector('.spinner');

function spin (item) {
    item.onclick = function () {
        this.classList.add("active");
        this.style.animation = ("spin 3s infinite")
    }
}

spin(spinner);
