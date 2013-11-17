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
	elem = {};
	var Killer = function(_id, _class, leftPoint, topPoint, column){
		this._id = _id;
		this._class = _class;
		this.startLeft = leftPoint;
		this.startTop = topPoint;
		this.column = 3;
		this.shut = function(){
			try{
				var tempArr = "";
			var targetShip = "";
			for(var el in elem){
				if(this.column == elem[el].column){
					tempArr = elem[el].row;	
					console.log(tempArr);
					targetShip = elem[el].getId(this.column,tempArr);
				}
			}
			for(var el in elem){
				if(targetShip == elem[el]._id){
					elem[el].destroy();
				}
			}
		}catch(e){
			console.log(e);
		}
			
		},
		this.move = function(direction){
			var regExp = /[0-9]+/;
			var currentLeft = (this.currentElement.style.left).match(regExp);
			if(direction == "left" && currentLeft != 0){
				this.currentElement.style.left =  0 + currentLeft - 30 + "px";
				this.column -= 1;
			}else if(direction == "right" && (!(currentLeft >= 210))){
				this.currentElement.style.left =  30 + parseInt(currentLeft) + "px";
				this.column += 1;
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
		this.destroy = function(idn){
			this.currentElement.parentNode.removeChild(this.currentElement);
			delete elem[_id];	
		}
		this.getId = function(column, row){
			if(this.column == column && this.row == row){
				return this._id;
			}
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
	}

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