//constructors for questions, ingredients and pantry
function questions(){
	var questBank = {
		q1: "Do ye like yer drinks strong?",
		q2: "Do ye like it with a salty tang?",
		q3: "Are ye a lubber who likes it bitter?",
		q4: "Would ye like a bit of sweetness with yer poison?",
		q5: "Are ye one for a fruity finish?"
	};

	var flavorMap = {
		q1:"strong",
		q2:"salty",
		q3:"bitter",
		q4:"sweet",
		q5:"fruity"
	};

	this.getQuest = function(){
		return questBank;
	}

	this.getFlavor = function(questKey){
		return flavorMap[questKey];
	}

}

function ingredients(selected){
	console.log(selected);
	this.selected = selected;
}


function pantry(){
	var availableItems = {
		strong:[{ type:"glug of rum",
		count:7
	},
	{ type:"slug of whisky",
	count:10
},
{ type:"splash of gin",
count:5
}
],
salty:[{ type:"olive on a stick",
count:6
},
{ type:"salt-dusted rim",
count:8
},
{ type:"rasher of bacon",
count:9
}
], 
bitter:[{ type:"shake of bitters",
count:5
},
{ type:"splash of tonic",
count:7
},
{ type:"twist of lemon peel",
count:8
}
],  
sweet:[{ type:"sugar cube",
count:3
},
{ type:"spoonful of honey",
count:8
},
{ type:"splash of cola",
count:7
}
],  
fruity:[{ type:"slice of orange",
count:6
},
{ type:"dash of cassis",
count:8
},
{ type:"cherry on top",
count:5
}
]};

this.getCount = function(flavor, cIndex) {
	var returnVal;
	availableItems[flavor].map(function(item, index){
		if(index == cIndex) returnVal = item.count;
	});
	return returnVal;
}

this.updateCount = function(flavor, cIndex) {
	availableItems[flavor].map(function(item, index){
		if(index == cIndex) item.count--;
	});
}

this.getIngredients= function(flavors){
	var obj = this;
	var choosenIngredients=[], temp;
	flavors.forEach(function(flavor){
		var items = availableItems[flavor];
		temp = getRandomIntInclusive(0, items.length-1);
		choosenIngredients.push(items[temp].type);
		obj.updateCount(flavor, temp);
	})
	var ing = new ingredients(choosenIngredients);
	return ing;
}
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function bartender(){
	this.createDrink = function(ingredients){
		var readyDrink = new drink(ingredients);
		return readyDrink;
	};
}



function drink(ingredients){
	var images_drink=["drink1.jpeg", "drink2.jpeg", "drink3.jpeg"];
	var nameToReturn="";
	for(var key in ingredients){
		ingredients[key].forEach(function(val){
			nameToReturn +=val.substr(0,val.indexOf(' '));
		})
	}
	return [nameToReturn, images_drink[getRandomIntInclusive(0, images_drink.length-1)]];
}


$(function(){

	var bt = new bartender();
	var quest = new questions();
	$.each(quest.getQuest(),function(key, val){
		$('.app-form').append('<label for="'+key+'" class="block"> Question: '+ val + '</label><input type="radio" value="Yes" id="'+key+'yes">Yes<input type="radio" value="No" id="'+key+'no">No');

	});
	$('.app-form').append('<button type="submit" class="submitBtn" value="submit">SUBMIT</button>');
	var selectedFlavors=[];
	$('.app-form').submit(function(e){
		e.preventDefault();
		if($('#q1yes').prop("checked"))	selectedFlavors.push(quest.getFlavor("q1"));
		if($('#q2yes').prop("checked"))	selectedFlavors.push(quest.getFlavor("q2"));
		if($('#q3yes').prop("checked"))	selectedFlavors.push(quest.getFlavor("q3"));
		if($('#q4yes').prop("checked"))	selectedFlavors.push(quest.getFlavor("q4"));
		if($('#q5yes').prop("checked"))	selectedFlavors.push(quest.getFlavor("q5"));
		console.log(selectedFlavors);
		var optionsSelected = new pantry();
		var myDrink = bt.createDrink(optionsSelected.getIngredients(selectedFlavors));
		$('.app-form').hide();
		$('.ready-drink').append('<img src="images/'+myDrink[1]+'"><h4>Please enjoy your '+myDrink[0]+' !!!!</h4>');
		$('.ready-drink').show();
	});

});

