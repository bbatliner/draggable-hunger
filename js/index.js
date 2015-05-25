// Templating
$('<div id="templates"></div>').appendTo('body').load('templates.html', function() {
	var moveBlockTemplate = Handlebars.compile($("#move-block-template").html());
	var moveTowardBlockTemplate = Handlebars.compile($("#move-toward-block-template").html());
	var cellCoordinatesBlockTemplate = Handlebars.compile($("#cell-coordinates-block-template").html());
	var cellAnimalBlockTemplate = Handlebars.compile($("#cell-animal-block-template").html());
	var mateBlockTemplate = Handlebars.compile($("#mate-block-template").html());
	var herbivoreEatBlockTemplate = Handlebars.compile($("#herbivore-eat-block-template").html());
	var carnivoreEatBlockTemplate = Handlebars.compile($("#carnivore-eat-block-template").html());
	var closestAnimalBlockTemplate = Handlebars.compile($("#closest-animal-block-template").html());
	var ifElseBlockTemplate = Handlebars.compile($("#if-else-block-template").html());

	var blocks = document.getElementById('blocks');

	blocks.innerHTML += moveBlockTemplate({id: "block1",});
	blocks.innerHTML += moveTowardBlockTemplate({id: "block2",});
	blocks.innerHTML += cellCoordinatesBlockTemplate({id: "block3",});
	blocks.innerHTML += cellAnimalBlockTemplate({id: "block4",});
	blocks.innerHTML += mateBlockTemplate({id: "block5",});
	blocks.innerHTML += herbivoreEatBlockTemplate({id: "block6",});
	blocks.innerHTML += carnivoreEatBlockTemplate({id: "block7",});
	blocks.innerHTML += closestAnimalBlockTemplate({id: "block8",});
	blocks.innerHTML += ifElseBlockTemplate({id: "block9",});
});

// Functionality
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

var output = document.getElementById('customCode');
var tempValue = "temporary";

function moveBlockCode(id){
	//return new Move(Direction.randomDirection());
	output.innerHTML += "return new Move(Direction." + $("#" + id + "-direction option:selected").val() + ");<br>";
}

function moveTowardBlockCode(id){
	//return new MoveToward(this.getCell(), closestPredator.getCell(), false);
	//$("#" + id + "-direction option:selected").val()
	
	var toward = $("#" + id + "-boolean option:selected").val();
	$("#" + id + "-insert").children().children()[0].click();
	output.innerHTML += "return new MoveToward(this.getCell(), ";
		output.innerHTML += tempValue;
	output.innerHTML += ", " + toward + ");<br>";
}

function cellCoordinateBlockCode(id){
	//getArena().getCell(x,y);
	tempValue = "getArena().getCell(" + $("#" + id + "-x").val() + ", " + $("#" + id + "-y").val() + ")";
}

function cellAnimalBlockCode(id){
	//getArena().getCell(x,y);
	$("#" + id + "-insert").children().children()[0].click()
	tempValue = "target.getCell()<br>";
}

function AnimalBlockCode(id){
	//getArena().getCell(x,y);
	var list = $("#" + id + "-list").val();
	var target = $("#" + id + "-type").val();;
	output.innerHTML += "for(Animal ani : " + list + "){<br>";
	output.innerHTML += target + "<br>";
	output.innerHTML += "target = ani;<br>"
	output.innerHTML += "}<br>"
	output.innerHTML += "}<br>"



	$("#" + id + "-insert").children().children()[0].click()
	output.innerHTML += ".getCell()";
}

function mateBlockCode(id){

}

function printCode(blockType, id){
	//alert(id);
	switch(blockType){
		case 'move-block':
			moveBlockCode(id);
			break;
		case 'move-toward-block':
			moveTowardBlockCode(id);
			break;
		case 'cell-coordinate-block':
			cellCoordinateBlockCode(id);
			break;
		case 'cell-animal-block':
			cellAnimalBlockCode(id);
			break;
		case 'animal-block':
			AnimalBlockCode(id);
			break;
		case 'mate-block':
			mateBlockCode(id);
			break;
	}
}

function compile(){
	var sandbox = $("#sandbox");
	var blockArray = sandbox.children();
	for(var i = 2; i < blockArray.length; i++){
		//alert("#a" + blockArray[i].id);
		$("#a" + blockArray[i].id).click();
	}
}

function loadCode(type){
	document.getElementById('loadCarnivore').style.display = 'none';
	document.getElementById('loadHerbivore').style.display = 'none';
}

function replenishButtons(){

}

function viewCode(){
	var fullCode = document.getElementById('output');
	var codeScreen = document.getElementById('screen');
	codeScreen.style.height = '86vh';
	codeScreen.innerHTML = fullCode.innerHTML;
}