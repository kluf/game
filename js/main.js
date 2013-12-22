window.onload = function(){
    var select = document.getElementsByClassName("speed")[0],
        opt = document.getElementsByClassName("speed")[0].options,
        field = document.getElementsByClassName("wrapper")[0],
        start = document.getElementsByClassName("start")[0];
    Machine = function (_id, _class, leftPoint, topPoint, column){
        this.startLeft = leftPoint;
        this.column = column;
        this.startTop = topPoint;
        this.height = 30;
        this.width = 30;
        this._id = _id;
        this._class = _class;
        this.currentElement = "";
        this.regExpPixel = /[0-9]+/;
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
    Machine.prototype.speed = 1;
    score = 0,
    quantity = 0,
    elem = {};
    var Killer = function(_id, _class, leftPoint, topPoint, column){
        this._id = _id;
        this._class = _class;
        this.startLeft = leftPoint;
        this.startTop = topPoint;
        this.column = 3;
        this.destroy = function(){
            this.currentElement.parentNode.removeChild(this.currentElement);
            delete this;    
        }
        this.shut = function(){         
            try{
                var tempArr = "";
                var targetShip = "";
                for(var el in elem){
                    if(this.column == elem[el].column){
                        tempArr = elem[el].row;
                        targetShip = elem[el].getId(this.column,tempArr);
                    }
                }
                for(var el in elem){
                    if(targetShip == elem[el]._id){
                        elem[el].destroy();
                    }
                }
                if(quantity <= 0){
                    alert("you win\n" + "your score" + score);
                    location.reload();
                }
            // console.log("scrore" + score);
        }   catch(e){
            // console.log(e);
        }
            
        },
        this.move = function(direction){
            var currentLeft = (this.currentElement.style.left).match(this.regExpPixel);
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
        this.score = 150;
        INTERVAL = 1500 / this.speed;
        this.updateResult = function(){
            score += this.score;
        };
        this.destroy = function(idn){
            this.currentElement.parentNode.removeChild(this.currentElement);
            delete elem[_id];
            this._id = "undefined"
            this.updateResult();
            quantity--;
            console.log(intervalID);
        };
        this.getId = function(column, row){
            if(this.column == column && this.row == row){
                return this._id;
            }
        };
        this.moveDown = function(){
            if(this._id != "undefined"){
                var currentTop = (this.currentElement.style.top).match(this.regExpPixel);
                if(currentTop > 265){
                    alert("you lose");
                    this.destroy();
                }else{
                    this.currentElement.style.top = parseInt(currentTop) + 15 + "px"; 
                }
            }
        };
        intervalID = setInterval(
             (function(self) {         
                 return function() {  
                     self.moveDown(); 
                 }
             })(this),
             INTERVAL     
        ); 
        
    }
    Ship.prototype = new Machine();

    function init(){
        len = opt.length - 1;
        for (len; len >= 0; len -= 1) {
            if (opt[len].selected) {
                Machine.prototype.speed = opt[len].value;
            }
        }
        start.removeEventListener("click",init);
        var kill =  new Killer("killer", "killer", 90, 300, 3);
        kill.createElement();
        for(var i = 0, leftPoint = 0, topPoint = 0, elemRow = 0, elemColumn = 0; i < 28; i++, leftPoint += 30, elemColumn += 1){
        if(i == 8){
            topPoint = 30;
            leftPoint = 0;
            elemRow = 1;
            elemColumn = 0;
        }else if(i == 16){
            topPoint = 60;
            leftPoint = 30;
            elemRow = 2;
            elemColumn = 1;
        }else if(i == 22){
            topPoint = 90;
            leftPoint = 60;
            elemRow = 3;
            elemColumn = 2;
        }else if(i == 26){
            topPoint = 120;
            leftPoint = 90;
            elemRow = 4;
            elemColumn = 3;
        }
            elem[i] = new Ship(i, "ship", leftPoint, topPoint, elemColumn, elemRow);
            elem[i].createElement();
            quantity++;
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
    start.addEventListener("click",init);
}