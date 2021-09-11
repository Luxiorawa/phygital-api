let img = document.getElementById("img");

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(event, id) {
	var img1 = document.getElementById(id);
	event.dataTransfer.setData("osaicon", img1.id);
}

function drop(event) {
	var data = event.dataTransfer.getData("osaicon");
	console.log(event.target.nodeName);
	event.target.appendChild(document.getElementById(data));
}

img.onload = function () {
	console.log(`Width : ${img.width}\nHeight : ${img.height}`);
	console.log("Creating the board..");

	console.log("Creating users...");
	// let response = await fetch('localhost:3000/')
};

function clicked() {
	console.log("You cliked on the image !");
}
