/**
 * Created by Mao on 17/3/5.
 */

var globalScope = "not evil";
function greeting(){
	var localScope = "evil";
	function insert(){
		console.log(localScope);
	}
	insert();
}
console.log(globalScope);
console.log(localScope);
greeting();
insert();


function greeting(){
	globalScope = "not evil";
	var localScope = "evil";
	console.log(localScope);
}
console.log(globalScope);
console.log(localScope);
greeting();
