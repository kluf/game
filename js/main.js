window.onload = function(){
	var field = document.getElementsByClassName("wrapper")[0],
	Machine = function (_id, _class, leftPoint, topPoint){
		this.startLeft = leftPoint;
		this.startTop = topPoint;
		this.height = 30;
		this.width = 30;
		this._id = _id;
		this._class = _class;
		this.currentElement = "";
		this.createElement = function(){
			var domElement = document.createElement("div");
			domElement.className = this._class + " " + "elem" + this._id;
			domElement.style.width = this.width + "px";
			domElement.style.height = this.height + "px";
			domElement.style.left = this.startLeft + "px";
			domElement.style.top = this.startTop + "px";
			field.appendChild(domElement);
			this.currentElement = document.getElementsByClassName("elem" + this._id)[0];
		}
	},
	elem = [];
	var Killer = function(_id, _class, leftPoint, topPoint){
		this._id = _id;
		this._class = _class;
		this.startLeft = leftPoint;
		this.startTop = topPoint;
		this.shut = function(){

		};
		this.move = function(direction){
			var regExp = /[0-9]+/;
			var currentLeft = (this.currentElement.style.left).match(regExp);
			console.log(currentLeft);
			if(direction == "left" && currentLeft != 0){
				this.currentElement.style.left =  0 + currentLeft - 30 + "px";
			}else if(direction == "right" && (!(currentLeft >= 210))){
				this.currentElement.style.left =  30 + parseInt(currentLeft) + "px";
			}else{
				throw "Wrong direction";
			}
			
		}
	}
	Killer.prototype = new Machine();

	var Ship = function(_id, _class, leftPoint, topPoint){
		this._id = _id;
		this._class = _class;
		this.startLeft = leftPoint;
		this.startTop = topPoint;
		this.destroyed = function(){

		}
		this.moveDown = function(){

		}
	}
	Ship.prototype = new Machine();

	var kill =  new Killer("killer", "killer", 90, 300);
	console.log(kill);
	kill.createElement();
	for(var i = 0, leftPoint = 0, topPoint = 0; i < 16; i++, leftPoint += 30){
		if(i == 8){
			topPoint = 30;
			leftPoint = 0;
		}
			elem[i] = new Ship(i, "ship", leftPoint, topPoint);
			elem[i].createElement();
	}
	var CO = {
		kill : document.getElementsByClassName("killer")[0],
	}
	document.body.addEventListener("keydown",function(event){
		switch(event.keyCode){
		case 32 : {
			// spacebar
			console.log("spacebar");
		}
		break;
		case 37 : {
			// left key
			kill.move("left");
		}
		break;
		case 39 : {
			// right key
			kill.move("right");
		}
		break;
		}
	});
}