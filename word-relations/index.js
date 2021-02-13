/*Text*/
var url1 = "https://api.wordnik.com/v4/word.json/";
var url2 = "/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=c23b746d074135dc9500c0a61300a3cb7647e53ec2b9b658e";
var url3 = "/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=c23b746d074135dc9500c0a61300a3cb7647e53ec2b9b658e"

var deFenition = document.getElementById("deFenition");
var textSynon = document.getElementById("textSynon");
var textRelated = document.getElementById("textRelated");


document.getElementById("ButtonValue").addEventListener("click", relateDworD);
	function relateDworD(){
		deFenition.textContent = "";
		textSynon.textContent = "";
		textRelated.textContent = "";

    	let userInput = document.getElementById("word").value;
    	// console.log(userInput)
    	
    	fetch(`${url1}${userInput}${url2}`)
	    .then(res => res.json())
	    .then(data => getTextvalue1(data));

	    fetch(`${url1}${userInput}${url3}`)
	    .then(res => res.json())
	    .then(data => getTextvalue2(data));

	    function getTextvalue1(data){
	    	// console.log(data)
	    	for(let i=0; i<data.length; i++){
	    		if(data[i].relationshipType === "synonym") {
	    			textSynon.appendChild(makeUL(data[i].words))
	    		}
	    		if(data[i].relationshipType === "same-context") {
	  				textRelated.appendChild(makeUL(data[i].words));
	    		}
	    	}
	  	}

	  	function getTextvalue2(data){
	    	// console.log(data)
	    	for(let j=0; j<data.length; j++){
	    		if(data[j].text) {
	    			// console.log(j, data[j].text)
	    			deFenition.textContent = data[j].text;
	    			break;
	    		}
	    	}
	  	}
	}

	function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for (var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}
