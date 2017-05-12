/**
 * Created by Mao on 17/3/24.
 */
function getValue(stockN) {
	var p = 0;
	for(sotock in stockN) {
		var shares = stockN[stock];
		var sPrice = getPrice(stock);
		p += shares * sPrice;
	}
	return p;
}
function restict(o, p) {
	for (prop in p) {
		if(!(prop in p)) {
			delete o[prop];
		}
	}
	return o;
}

function classOf(o) {
	if (o === null) return "Null";
	if (o === undefined) return "undefined";
	return Object.prototype.toString().call(o).slice(8,-1);
}
classOf(null);

function pcEmpty(arr) {
	for(var i=0; i<arr.length; i++) {
		if(!arr[i]) continue;
	}
}

for(var index in spareArr) {
	var value = spareArr[index];
}