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

// Make sure to allow CORS on file:// protocol ;)
// Use Chrome command line flag --allow-file-access-from-files
$('#templates').load('templates.html', function() {

	// Compile templates
	var moveBlockTemplate = Handlebars.compile($("#move-block-template").html());
	var moveTowardBlockTemplate = Handlebars.compile($("#move-toward-block-template").html());
	var cellCoordinatesBlockTemplate = Handlebars.compile($("#cell-coordinates-block-template").html());
	var cellAnimalBlockTemplate = Handlebars.compile($("#cell-animal-block-template").html());
	var mateBlockTemplate = Handlebars.compile($("#mate-block-template").html());
	var herbivoreEatBlockTemplate = Handlebars.compile($("#herbivore-eat-block-template").html());
	var carnivoreEatBlockTemplate = Handlebars.compile($("#carnivore-eat-block-template").html());
	var closestAnimalBlockTemplate = Handlebars.compile($("#closest-animal-block-template").html());
	var geneSliderTemplate = Handlebars.compile($("#gene-slider-template").html());

	// Create elements from templates
	var blocks = $('#blocks');

	blocks.append(moveBlockTemplate({id: "block1",}));
	blocks.append(moveTowardBlockTemplate({id: "block2",}));
	blocks.append(cellCoordinatesBlockTemplate({id: "block3",}));
	blocks.append(cellAnimalBlockTemplate({id: "block4",}));
	blocks.append(mateBlockTemplate({id: "block5",}));
	blocks.append(herbivoreEatBlockTemplate({id: "block6",}));
	blocks.append(carnivoreEatBlockTemplate({id: "block7",}));
	blocks.append(closestAnimalBlockTemplate({id: "block8",}));

	blocks.append(geneSliderTemplate({name: 'Speed'}));
	blocks.append(geneSliderTemplate({name: 'Size'}));
	// Setup sliders
	$.each($('.gene-slider'), function(index, elem) {
		$(elem).slider({
			slide: function(event, ui) {
				// Display value on slider handle
		    	$('.ui-slider-handle', this).text(ui.value / 100);
		    }
		});
	});
});