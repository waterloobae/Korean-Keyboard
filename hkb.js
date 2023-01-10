var initial = [12593, 12594, 12596, 12599, 12600, 12601, 12609, 12610, 12611, 12613, 12614, 12615, 12616, 12617, 12618, 12619, 12620, 12621, 12622];
var finale = [0, 12593, 12594, 12595, 12596, 12597, 12598, 12599, 12601, 12602, 12603, 12604, 12605, 12606, 12607, 12608, 12609, 12610, 12612, 12613,
				 12614, 12615, 12616, 12618, 12619, 12620, 12621, 12622];
var dMedial = [0, 0, 0, 0, 0, 0, 0, 0, 0, 800, 801, 820, 0, 0, 1304, 1305, 1320, 0, 0, 1820];
var dFinale = [0, 0, 0, 119, 0, 422, 427, 0, 0, 801, 816, 817, 819, 825, 826, 827, 0, 0, 1719, 0, 1919];

var SBase = 44032;
var LBase = 4352;
var VBase = 12623;
var TBase = 4519;
var SCount = 11172;
var LCount = 19;
var VCount = 21;
var TCount = 28;
var NCount = VCount * TCount;

var unicodeKey =[
		[113,119,101,114,116,55,56,57,121,117,105,111,112,97,115,100,102,103,52,53,54,104,106,107,108,91,93,122,120,99,118,98,49,50,51,110,109,44,46,96,48,64],
		[81,87,69,82,84,38,42,40,89,85,73,79,80,65,83,68,70,71,36,37,94,72,74,75,76,123,125,90,88,67,86,66,33,64,35,78,77,60,62,126,41,63],
		[12610,12616,12599,12593,12613,55,56,57,12635,12629,12625,12624,12628,12609,12596,12615,12601,12622,52,53,54,12631,12627,12623,12643,45,61,12619,12620,12618,12621,12640,49,50,51,12636,12641,39,92,96,48,64],
		[12611,12617,12600,12594,12614,38,42,40,12635,12629,12625,12626,12630,12609,12596,12615,12601,12622,36,37,94,12631,12627,12623,12643,95,43,12619,12620,12618,12621,12640,33,64,35,12636,12641,34,124,126,41,63]
			];

function keyClick(){
	document.getElementById("keysound").play();
};

function drawKeys(seq){
	var key = "k";
	var i = 0;
	for(i = 0; i< keys.length ; i++){
		document.getElementById(key.concat(i)).innerHTML = keys[i].substring(seq, seq+1);
	}
};

function trim(obj) {
	return obj.replace(/^\s+|\s+$/g,"");
}


function indexOfArray(b, d) {
    var a = b.length;
    for (var c = 0; c < a; c++) {
        if (b[c] == d) {
            return c
        }
    }
    return -1
};

function composeKo(str){
	var f = str.length;
	if (f == 0) {
		return "";
	}
	var l = str.charCodeAt(0);
	var m = String.fromCharCode(l);
	var c, h, j, g, d, a, k;
	
	for (var e = 1; e < f; ++e) {
		c = str.charCodeAt(e);
		h = indexOfArray(initial, l);
		if (h != -1){
			j = c - VBase;
			if( 0 <= j && j < VCount) {
				l = SBase + ( h * VCount + j) * TCount;
				m = m.slice(0, m.length - 1) + String.fromCharCode(l);
				continue;
			}
		}
		
        k = l - SBase;
        if (0 <= k && k < 11145 && (k % TCount) == 0) {
            d = indexOfArray(this.finale, c);
            if (d != -1) {
                l += d;
                m = m.slice(0, m.length - 1) + String.fromCharCode(l);
                continue;
            }
            j = (k % NCount) / TCount;
            g = indexOfArray(dMedial, (j * 100) + (c - VBase));
            if (g > 0) {
                l += (g - j) * TCount;
                m = m.slice(0, m.length - 1) + String.fromCharCode(l);
                continue;
            }
        }

        if (0 <= k && k < 11172 && (k % TCount) != 0) {
            d = k % TCount;
            j = c - VBase;
            if (0 <= j && j < VCount) {
                h = indexOfArray(initial, finale[d]);
                if (0 <= h && h < LCount) {
                    m = m.slice(0, m.length - 1) + String.fromCharCode(l - d);
                    l = SBase + (h * VCount + j) * TCount;
                    m = m + String.fromCharCode(l);
                    continue;
                }
                if (d < dFinale.length && dFinale[d] != 0) {
                    m = m.slice(0, m.length - 1) + String.fromCharCode(l - d + Math.floor(dFinale[d] / 100));
                    l = SBase + (indexOfArray(initial, finale[(dFinale[d] % 100)]) * VCount + j) * TCount;
                    m = m + String.fromCharCode(l);
                    continue;
                }
            }
            a = indexOfArray(dFinale, (d * 100) + indexOfArray(finale, c));
            if (a > 0) {
                l = l + a - d;
                m = m.slice(0, m.length - 1) + String.fromCharCode(l);
                continue;
            }
        }
        l = c;
        m = m + String.fromCharCode(c)				
	}
	return m;
};

function decomposeKr(a) {
    var f = a.length;
    var j = "";
    var b, h, g, c, d;
    for (var e = 0; e < f; e++) {
        var b = a.charCodeAt(e);
        h = b - SBase;
        if (h < 0 || h >= SCount) {
            j = j + String.fromCharCode(b);
            continue;
        }
        g = initial[Math.floor(h / NCount)];
        c = VBase + (h % NCount) / TCount;
        d = finale[h % TCount];
        j = j + String.fromCharCode(g, c);
        if (d != 0) {
            j = j + String.fromCharCode(d)
        }

    }
return j.slice(0,j.length-1);
};
