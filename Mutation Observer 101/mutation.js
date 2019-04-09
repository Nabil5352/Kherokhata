const translatedText = ["Hola, Me llamo Nabil Ahmad.", "Mucho gusto.", "Gracias."],
observerTarget = document.querySelector("#changeMe"),
targetNode = document.querySelectorAll("#changeMe ol li"),
logNode = document.querySelector("#log ul");

let translationOp, loop, observer, index = 0;

function addLog(logItem){
	logNode.insertAdjacentHTML('beforeEnd', logItem);
}

function observeChange(){
	//callback function
	var mutationNotifier = function(mutationsList) {
	    mutationsList.forEach(function(mutation, index){

	    	/************************************
	    	* Mutation record/result (mutation) *
			*************************************
			* addedNodes: Return the added nodes [NodeList, default: []]
			* attributeName: Return the attribute name that changed [String, default: null]
			* attributeNamespace: Return the namespace of the changed attribute [String, default: null]
			* nextSibling: Return the nextSibling of changed node [Node, default: null]
			* oldValue: Return the nextSibling of changed node [Node, default: null]
			* previousSibling: Return the nextSibling of changed node [Node, default: null]
			* removedNodes: Return the removed nodes [NodeList, default: []]
			* target: Return the target node where mutation happens [Node, default: null]
			* type: Return the type of mutatation (ex. 'attributes', 'childList') [String]
	    	*/

	    	switch(mutation.type){
	    		case "attributes":
	    			addLog("<li class='log'><span class='type'>"+ mutation.type +"</span>List <span class='change'>"+ mutation.target.dataset.id + "</span> Attribute <span class='change'>" + mutation.attributeName + "</span> changed to <span class='change'>" + mutation.target[mutation.attributeName] + "</span> (was <span class='change'>" + mutation.oldValue + "</span>) </li>");
	    			break;
	    		case "childList":
	    			addLog("<li class='log'><span class='type'>"+ mutation.type +"</span> List <span class='change'>"+ mutation.target.dataset.id + "</span> changed</li>");
	    			break;
	    		default:
	    			break;
	    	}
	    });

	    if(index === loop){
			stopObserver();
		}
	};
	//create an instance with callback function
	observer = new MutationObserver(mutationNotifier);

	//create options
	var config = {
		attributes: true, // observe attributes (ex. id, class)
		attributeOldValue: true, // record value before mutation
		attributeFilter: ["id"], // only observe this list of attributes
		characterData: true, // observe target node's data
		characterDataOldValue: true, // record target node's data before mutation
		childList: true, // observe all child elements including text nodes
		subtree: true // true = target node & all of its descendants, false = only target node
	};

	//call mutationobserver
	observer.observe(observerTarget, config);
	addLog("<li class='log'>Observer started!</li>");

	//stop observer when done
	var stopObserver = function(){
		addLog("<li class='log'>Observer stopped!</li>");
		observer.disconnect();
	};
}

//change to translated text
function changeText(){
	targetNode[index].innerText = translatedText[index];
	if(index === 1){
		targetNode[index].setAttribute('id', 'newId');
	}

	index += 1;
	if(index === loop){
		window.clearInterval(translationOp);
	}
}

//initialize program
function init(){
	loop = targetNode.length;
	translationOp = window.setInterval(changeText, 3000);
	observeChange();
}
init();