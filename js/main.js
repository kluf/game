window.onload = function(){
	var field = document.getElementsByClassName("wrapper")[0],
	Machine = function (_id, _class, leftPoint, topPoint, column){
		this.startLeft = leftPoint;
		this.column = column;
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
	var Killer = function(_id, _class, leftPoint, topPoint, column){
		this._id = _id;
		this._class = _class;
		this.startLeft = leftPoint;
		this.startTop = topPoint;
		this.column = 3;
		this.tempArr = [];
		this.targetShip = "";
		this.shut = function(){
			try{
				for(var i = 0; i < elem.length; i += 1){
					console.log(elem[i].row);
						this.tempArr.push(elem[i].getId(this.column, elem[i].row));
						// this.tempArr.push(elem[i].row);
						// console.log(this.tempArr)
					
					// console.log(this.tempArr);
					
				}
				elem[this.tempArr.sort(function(a, b){
					return b - a;
				})[0]].destroy();
				this.tempArr.shift();
				console.log(this.tempArr);
				// this.targetShip = elem[i].getId(this.column, this.tempArr[0]);
				// console.log(this.targetShip)
				// elem[this.column].destroy();
			}catch(e){
				console.log(e);
			}
		};
		this.move = function(direction){
			var regExp = /[0-9]+/;
			var currentLeft = (this.currentElement.style.left).match(regExp);
			if(direction == "left" && currentLeft != 0){
				this.currentElement.style.left =  0 + currentLeft - 30 + "px";
				this.column -= 1;
			}else if(direction == "right" && (!(currentLeft >= 210))){
				this.currentElement.style.left =  30 + parseInt(currentLeft) + "px";
				this.column += 1;
				// console.log(this.column);
			}else{
				throw "Wrong direction";
			}
			
		}
	}
	Killer.prototype = new Machine();

	var Ship = function(_id, _class, leftPoint, topPoint, column, row){
		this._id = _id;
		this._class = _class;
		this.startLeft = leftPoint;
		this.startTop = topPoint;
		this.column = column;
		this.row = row;
		this.destroy = function(){
			this.currentElement.parentNode.removeChild(this.currentElement);
			elem[this._id].shift();
		}
		this.getId = function(column, row){
			if(this.column == column && this.row == row){
				return this._id;
			}
		}
		this.moveDown = function(){

		}
	}
	Ship.prototype = new Machine();

	var kill =  new Killer("killer", "killer", 90, 300, 3);
	kill.createElement();
	for(var i = 0, leftPoint = 0, topPoint = 0, elemRow = 0, elemColumn = 0; i < 16; i++, leftPoint += 30, elemColumn += 1){
		if(i == 8){
			topPoint = 30;
			leftPoint = 0;
			elemRow = 1;
			elemColumn = 0;
		}
			elem[i] = new Ship(i, "ship", leftPoint, topPoint, elemColumn, elemRow);
			elem[i].createElement();
			// console.log(elem[i]);
	}
	// var CO = {
	// 	kill : document.getElementsByClassName("killer")[0],
	// }
	document.body.addEventListener("keydown",function(event){
		switch(event.keyCode){
		case 32 : {
			// spacebar
			kill.shut();
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