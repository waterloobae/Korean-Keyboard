	var setKeys = 2;
	var isKo = 1;
	var isShift = 0;
	var isEdit = 0;
	var cursorLoc = 0;
	var oldLength = 0;
	var newLength = 0;

	var stringObj = "";
	var startStr = "";
	var endStr = "";
		
	var keys = ["qQㅂㅃ","wWㅈㅉ","eEㄷㄸ","rRㄱㄲ","tTㅅㅆ","7&7&","8*8*","9(9(","yYㅛㅛ","uUㅕㅕ","iIㅑㅑ","oOㅐㅒ","pPㅔㅖ",
					"aAㅁㅁ","sSㄴㄴ","dDㅇㅇ","fFㄹㄹ","gGㅎㅎ","4$4$","5%5%","6^6^","hHㅗㅗ","jJㅓㅓ","kKㅏㅏ","lLㅣㅣ","[{-_","]}=+",
					"zZㅋㅋ","xXㅌㅌ","cCㅊㅊ",	"vVㅍㅍ","bBㅠㅠ","1!1!","2@2@","3#3#",	"nNㅜㅜ","mMㅡㅡ",",<'\"","\.>\\|","`~`~","0)0)","@?@?"
					];
	

	function toggleLanguage(){
		if(isKo){
			isKo = 0;
			setKeys = 0;
		}else{
			isKo = 1;
			setKeys = 2;
		}
		drawKeys(setKeys);
		keyClick();
	};

	function shiftKey(){
		if(isShift){
			isShift = 0;
			if(setKeys == 3){
				setKeys = 2;
			}else{
				setKeys = 0;
			}
		}else{
			isShift = 1;
			if(setKeys == 2){
				setKeys = 3;
			}else{
				setKeys = 1;
			}
		}
		drawKeys(setKeys);
		keyClick();
	};

	function init(){
			drawKeys(setKeys);
			document.getElementById("copyString").value = trim(document.getElementById("copyString").value);
			document.getElementById("copyString").style.fontSize = document.getElementById("fontSize").value + "px";
			document.getElementById("displayFontSize").innerHTML = document.getElementById("fontSize").value;
			document.getElementById("copyString").value = decodeURI(window.location.search.slice(1));
	};
    
	function changeFontSize(){
			document.getElementById("copyString").style.fontSize = document.getElementById("fontSize").value + "px";		
			document.getElementById("displayFontSize").innerHTML = document.getElementById("fontSize").value;
	};
	
	
    function deleteAll(){
		document.getElementById("copyString").value = "";
		stringObj = "";
		startStr = "";
		editStr = "";
		endStr = "";
		cursorLoc = 0;
		keyClick();
	};
	
	function compose(obj){
		var newChar;
		if(obj == "c0"){
			newChar = "\n";
		}else if(obj == "c2"){
			newChar = " ";
		}else if(obj == "c3"){
			newChar = "www";
		}else{
			newChar = keys[obj.slice(1,obj.lenth)][setKeys];
		}

		editPrep();
		startStr = startStr + newChar;
		oldLength = document.getElementById("copyString").value.length;
		document.getElementById("copyString").value = composeKo(startStr) + endStr;
		newLength = document.getElementById("copyString").value.length;
		setCursorLocation();
		document.getElementById("copyString").blur();
		
		if(isShift){
			isShift = 0;
			if(setKeys == 3){
				setKeys = 2;
			}else{
				setKeys = 0;
			}
			drawKeys(setKeys);			
		}
		startStr = "";
		endStr = "";
		keyClick();
	};
	
	function decompose() {

		editPrep();
		var j = decomposeKr(startStr);
		oldLength = document.getElementById("copyString").value.length;
        document.getElementById("copyString").value = composeKo(j) + endStr;	
		newLength = document.getElementById("copyString").value.length;
		setCursorLocation();
		//document.getElementById("copyString").blur();
		startStr = "";
		endStr = "";

		keyClick();
	};

	function editPrep(){

		stringObj = document.getElementById("copyString").value;
		getCursorLocation(document.getElementById("copyString"));
		startStr = stringObj.slice(0, cursorLoc);
		endStr = stringObj.slice(cursorLoc, stringObj.length );

	};

	function edit(obj){
		if(obj.selectionStart){
			cursorLoc = obj.selectionStart;
			//alert(cursorLoc);
			isEdit = 1;
		}else{
			cursorLoc = 0
		}
	};

	function getCursorLocation(obj) {
		if(!(isEdit)){
			cursorLoc = obj.value.length;
		}
	};


function setCursorLocation() {
		if(oldLength > newLength){
			cursorLoc = cursorLoc - 1;
		}
		if(oldLength < newLength){
			cursorLoc = cursorLoc + 1;
		}
};

	function hSearch(obj){
		var urlString = encodeURI(document.getElementById("copyString").value);
		if(obj.id == "google"){
			urlString = "http://www.google.com/search?q=" + urlString;
		}else if(obj.id == "bing"){
			urlString = "http://www.bing.com/search?q="+ urlString;
		}else if(obj.id == "naver"){
			urlString = "http://search.naver.com/search.naver?query=" + urlString;
		}else if(obj.id == "daum") {
			urlString = "http://search.daum.net/search?w=tot&q="+ urlString;		
		}

		var args = new blackberry.invoke.BrowserArguments(urlString);
		blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
		//window.open(urlString);
	};
