/**
 * Created by Mao on 16/7/23.
 */
//create the fragment
window.onload = function () {

	var frag = document.createDocumentFragment();
	var nodeList = document.getElementById("nodeList");


//create numbers list items, add to fragment
	for(var x=0; x<3; x++) {
		var li = document.createElement("li");
		li.appendChild(document.createTextNode("Item" + (x+1)));
		// li.innerHTML = "List item" + x;
		frag.appendChild(li);
	}
	console.log(frag);

//add the fragment nodes to the list
	nodeList.appendChild(frag);

};
