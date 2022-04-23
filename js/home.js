var cssText = "#limit-tip{position: fixed; left:0; top:0; background: rgba(0,0,0,0.9); filter:alpha(opacity=80); width: 100%; height:100%; z-index: 100;} #limit-tip p{text-align: center; margin-top: -5%; padding:0 5%;}";

function loadStyleText() {
  var style = document.createElement('style');
  style.rel = 'stylesheet';
  style.type = 'text/css';
  try {
    style.appendChild(document.createTextNode(cssText));
  } catch (e) {
    style.styleSheet.cssText = cssText;
  }
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
}

var os = function () {
  var ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  };
}();

function is_weixin() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}

function is_limit() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("fban") == -1 && ua.indexOf("fbav") == -1 && ua.indexOf("zalo") == -1) {
    return false;
  } else {
    return true;
  }
}

function checkIsIos() {
  var u = navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //iosç»ˆç«¯
  if (isiOS) {
    return true;
  }
  return false;
}

function loadHtml() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

  var div = document.createElement('div');
  div.id = 'limit-tip';
  if (isiOS) {
    div.innerHTML = '<p style="margin-top: 0px;color:#ffff">Nháº¥n vĂ o gĂ³c trĂªn bĂªn pháº£i cá»§a mĂ n hĂ¬nh[...]<br/>Má»Ÿ báº±ng trĂ¬nh duyá»‡t</p><p><img src="./images/live_ios.png?v=3" alt="Vui lĂ²ng má»Ÿ trong trĂ¬nh duyá»‡t cá»§a báº¡n" style="max-width: 100%; height: auto;"/></p>';

  } else {
    div.innerHTML = '<p style="margin-top: 0px;color:#ffff"">Nháº¥n vĂ o gĂ³c trĂªn bĂªn pháº£i cá»§a mĂ n hĂ¬nh[...]<br/>Má»Ÿ báº±ng trĂ¬nh duyá»‡t</p><p><img src="./images/live_Android.png" alt="Vui lĂ²ng má»Ÿ trong trĂ¬nh duyá»‡t cá»§a báº¡n" style="max-width: 100%; height: auto;"/></p>';
  }
  // console.log(div)
  document.body.appendChild(div);
}

function Base64() {
  // private property
  _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  // public method for encoding
  this.encode = function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for decoding
  this.decode = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input || '';
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  }

  // private method for UTF-8 encoding
  _utf8_encode = function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }

  // private method for UTF-8 decoding
  _utf8_decode = function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(cookieName) {
  var user = getCookie(cookieName);
  if (user != "") {
    alert("æ¬¢è¿ " + user + " å†æ¬¡è®¿é—®");
  } else {
    user = prompt("è¯·è¾“å…¥ä½ ç„åå­—:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 30);
    }
  }
}

let localHost = './call.php';
let default_channel = '10000000000';
let proxy_channel = '20000000000';
let app_Key = "d6n3xm";
let api_host = 'http://api.don55yb.com/api/install/receiveWebInfo';
	
