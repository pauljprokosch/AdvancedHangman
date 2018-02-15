var inquirer = require ("inquirer");
var Letter = function (letter) {
	var word = "prokosch"
	var arrName = word.split('');
	var letterGuessed = "a"
	this.letter = letter;
    this.guess = function(){]
    	for (var i=0; i<arrName.length;i++){
    	if (arrName[i]===this.letter)
    	{
    		console.log("they match");
    	} else
    	{console.log("they do not match");}
    } 	
    	} 	
}
var test = new Letter("a");
test.guess()