'use strict';

function nextId(base) {
	var id = 0;
	do {
		var node = document.getElementById(base + id++);
	} while (node);
	return base + (id - 1);
}

var nextBlockId = function() {
	return nextId('block');
};

// Drag and drop
function allowDrop(event) {
	event.preventDefault();
}

function drag(event) {
	event.dataTransfer.setData('text', event.target.id);
}

function dropOnBlockstore(event) {
	event.preventDefault();
}

function drop(event) {
	event.preventDefault();
	var data = event.dataTransfer.getData('text');
	var element = document.getElementById(data);
	element.setAttribute('id', nextBlockId());
	// Only move if the element is not being dropped on itself (or its children)
    if (event.target !== element && !element.contains(event.target)) {
    	event.target.appendChild(element);
    }
}

// ELEMENT SUPERCLASS
var Element = function(name, cssId, cssClass) {
	this.name = ko.observable(name);
	this.cssId = ko.observable(cssId || '');
	this.cssClass = ko.observable(cssClass || '');
};


// DROP DOWN INPUT (select) CLASS
var DropDownConstraint = function(name, values, cssId, cssClass) {
	Element.call(this, name, cssId, cssClass);

	this.values = ko.observableArray(values);
	this.description = ko.observable('dropdown');
	this.value = ko.observable(this.values()[0]);
};
DropDownConstraint.prototype = Object.create(Element.prototype);
DropDownConstraint.prototype.constructor = Element;


// NUMBER SELECT (input) CLASS
var NumberConstraint = function(name, min, max, initialValue, cssId, cssClass) {
	Element.call(this, name, cssId, cssClass);

	this.min = ko.observable(min);
	this.max = ko.observable(max);
	this.description = ko.observable('number');
	this.value = ko.observable(initialValue || 0);
};
NumberConstraint.prototype = Object.create(Element.prototype);
NumberConstraint.prototype.constructor = Element;


// BLOCK TYPE ENUM
var BlockType = [];
BlockType.MOVE = 'move';
BlockType.CELL = 'cell';
BlockType.EAT  = 'eat';
BlockType.MATE = 'mate';
BlockType.ANIMAL = 'animal';


// BLOCK CLASS
var Block = function(type, description, constraints, members, cssId, cssClass) {
	Element.call(this, description, cssId, cssClass);

	this.type = ko.observable(type);
	this.constraints = ko.observableArray(constraints);
	this.members = ko.observableArray(members);
};

Block.prototype = Object.create(Element.prototype);
Block.prototype.constructor = Element;

Block.prototype.toCode = function() {
	switch(this.type) {
		case BlockType.MOVE:
			if (this.components.length === 0) {
				var direction = document.getElementById(this.constraints[0].cssId).value.toUpperCase();
				return 'return new Move(Direction.' + direction + ');';
			}
			else {
				return 'uhhh idk';
			}
		case BlockType.CELL:
			return '';
	}
};


// BLOCK MEMBER CONTAINER CLASS
var Member = function(name, type) {
	this.name = ko.observable(name);
	this.type = ko.observable(type);
};

// KNOCKOUT COMPONENTS
ko.components.register('dropdown-constraint', {
	viewModel: function(params) {
		this.name = params.name;
		this.values = params.values;
		this.cssId = params.cssId;
		this.cssClass = params.cssClass;
		this.value = params.value;
	},
	template: '<!-- ko if: name() --><span data-bind="text: name() + \': \'"></span><!-- /ko --><select data-bind="attr: { id: cssId, class: cssClass }, options: values, value: value"></select>'
});

ko.components.register('number-constraint', {
	viewModel: function(params) {
		this.name = params.name;
		this.min = params.min;
		this.max = params.max;
		this.cssId = params.cssId;
		this.cssClass = params.cssClass;
		this.value = params.value;
	},
	template: '<!-- ko if: name() --><span data-bind="text: name() + \': \'"></span><!-- /ko --><input data-bind="attr: { id: cssId, class: cssClass, type: \'number\', min: min, max: max, value: value }, value: value"></input>'
});


// ACTUAL CODE
// var myDropDownConstraint = new DropDownConstraint('', ['towards', 'away from'], 'block1-boolean');
// var myBlock = new Block(BlockType.MOVE, 'Move', [myDropDownConstraint], ['this cell'], 'block1', 'drag-block');

// var myBlock = new Block(BlockType.CELL, '', [], ['Get Cell of Animal'], 'block1', 'drag-block');

// var myNumberConstraint = new NumberConstraint('X', 0, 64, 32);

var dropDownConstraint1 = new DropDownConstraint('Direction', ['Up', 'Down', 'Left', 'Right', 'Randomly']);
var block1 = new Block(BlockType.MOVE, 'Move', [dropDownConstraint1], [], 'block1', 'drag-block');

var dropDownConstraint2 = new DropDownConstraint('', ['toward', 'away from']);
var member2 = new Member('this cell', BlockType.CELL);
var block2 = new Block(BlockType.MOVE, 'Move', [dropDownConstraint2], [member2], 'block2', 'drag-block');

var numberConstraint3 = new NumberConstraint('X', 0, 128, 25);
var numberConstraint3_2 = new NumberConstraint('Y', 0, 128, 30);
var block3 = new Block(BlockType.CELL, 'Get cell at location', [numberConstraint3, numberConstraint3_2], [], 'block3', 'drag-block');

var member4 = new Member('of this Animal', BlockType.ANIMAL);
var block4 = new Block(BlockType.CELL, 'Get cell', [], [member4], 'block4', 'drag-block');

var member5 = new Member('with this Animal', BlockType.ANIMAL);
var block5 = new Block(BlockType.MATE, 'Mate', [], [member5], 'block5', 'drag-block');

var dropDownConstraint6 = new DropDownConstraint('in', ['Cell', 'Arena']);
var dropDownConstraint6_2 = new DropDownConstraint('that', ['is a Carnivore', 'is an Herbivore', 'can mate with This', 'This can eat']);
var block6 = new Block(BlockType.ANIMAL, 'Closest Animal', [dropDownConstraint6, dropDownConstraint6_2], [], 'block6', 'drag-block');

var member7 = new Member('If this Cell contains', '');
var member7_2 = new Member('Then', '');
var member7_3 = new Member('Else', '');
var block7 = new Block('if-else', '', [], [member7, member7_2, member7_3], 'block7', 'drag-block');

var blocks = ko.observableArray([block1, block2, block3, block4, block5, block6, block7]);
ko.applyBindings(blocks);