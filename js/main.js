window.onload = function(){
	var field = document.getElementsByClassName("wrapper")[0],
	Machine = function (_id, _class){
		this.height = 30;
		this.width = 30;
		this._id = _id;
		this._class = _class;
		this.createElement = function(){
			var domElement = document.createElement("div");
			domElement.className = this._class + " " + this._id;
			domElement.style.width = this.width + "px";
			domElement.style.height = this.height + "px";
			console.log(field);
			field.appendChild(domElement);
		}
	},
	i = 0,
	elem = [];
	Killer = function(_id, _class){
		this._id = _id;
		this._class = _class;
		this.shut = function(){

		};
		this.move = function(){
			alert("yes");
		}
	}
	Killer.prototype = new Machine();

	Ship = function(_id, _class){
		this._id = _id;
		this._class = _class;
		this.destroyed = function(){

		}
		this.moveDown = function(){

		}
	}
	Ship.prototype = new Machine();

	var kill =  new Killer("killer", "killer");
	kill.createElement();
	for(i; i < 16; i++){
		elem[i] = new Ship(i, "ship");
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
			CO.kill.style.left = CO.kill.style.left30 + "px";
		}
		break;
		case 39 : {
			// right key
			console.log("right key");
		}
		break;
		}
	});
}