/**
 * Created by Administrator on 2016/5/24.
 */
window.onload = function(){
    imgLocation("container", "pin");
    window.onscroll = function(){
        if(checkScrollSide()){
            var oParent = document.getElementById('container');
            //for(var i=0; i<1; i++){
                var aPin = document.getElementsByClassName('pin');
                var num = aPin.length + 1;//- 1 + 1 + 1
                var oPin = document.createElement('div');
                oPin.className = 'pin';
                oParent.appendChild(oPin);
                var oBox = document.createElement('div');
                oBox.className = 'box';
                oPin.appendChild(oBox);
                var oImg = document.createElement('img');
                //oImg.src = './images/'+dataInt.data[i].src;
                oImg.src = './images/'+num+'.jpg';
                oBox.appendChild(oImg);
            //}
            imgLocation('container', 'pin');
        }
    };
};
function imgLocation(parent, content){
    //
    var cParent = document.getElementById(parent);
    var cContent = getChildElement(cParent, content);
    var imgWidth = cContent[0].offsetWidth;
    console.log(imgWidth);
    var cols = Math.floor(document.documentElement.clientWidth / imgWidth);
    cParent.style.cssText = "width:"+imgWidth*cols+"px;margin:0 auto;";

    var boxHeightArr = [];
    for(var i=0; i<cContent.length; i++) {
        //boxHeightArr[i] = cContent[i].offsetHeight;
       if(i<cols) {
           boxHeightArr[i] = cContent[i].offsetHeight;
           //console.log(boxHeightArr[i]);
       } else {
           var minHeight = Math.min.apply(null, boxHeightArr);
           //console.log(minHeight);
           var minIndex = getMinHeightLocation(boxHeightArr, minHeight);
           cContent[i].style.position = "absolute";
           cContent[i].style.top = minHeight+"px";
           cContent[i].style.left = cContent[minIndex].offsetLeft+"px";

           boxHeightArr[minIndex] = boxHeightArr[minIndex]+cContent[i].offsetHeight;
       }
    }
}

function getMinHeightLocation(boxHeightArr, minHeight){
    for(var i in boxHeightArr){
        if(boxHeightArr[i] == minHeight){
            return i;
        }
    }
}
function getChildElement(parent, content){
    var contentArr = [];
    var allContent = parent.getElementsByTagName("*");
    //console.log(allContent);
    for(var i=0; i<allContent.length; i++) {
        if(allContent[i].className == content) {
            contentArr.push(allContent[i]);
        }
    }
    return contentArr;
}

function checkScrollSide(){
    var oParent = document.getElementById('container');
    var oPin = getChildElement(oParent, 'pin');
    var lastPinHeight = oPin[oPin.length-1].offsetTop+Math.floor(oPin[oPin.length-1].offsetHeight/2);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var documentHeight = document.documentElement.clientHeight || document.body.clientHeight;
    return (lastPinHeight<scrollTop+documentHeight)?true:false;
}