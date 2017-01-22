ftmf = ftMagicFunctions = {};

var __gd = null;

//alias funkcji  document.getElementById
function __byId(_id, _parent) {
  
  if(typeof _parent == "undefined"){
    return document.getElementById(_id);
  }
  
  return _parent.getElementById(_id);
  
}

//alias funkcji  document.getElementsByClassName
function __byClass(_class, _parent) {
  
  if(typeof _parent == "undefined"){
    return document.getElementsByClassName(_class);
  }
  
  return _parent.getElementsByClassName(_class);
  
}

//alias funkcji  document.getElementsByTagName
function __byTag(_tag, _parent) {
  
  if(typeof _parent == "undefined"){
    return document.getElementsByTagName(_tag);
  }
  
  return _parent.getElementsByTagName(_tag);
  
}

window.addEventListener("load", ftmf.create);

ftmf.create = function(){
  
  __gd = document;
  
}

//mediana (_opt mówi czy zwrócona ma być 1 wartość, czy tablica warotści)
ftmf.med = function(_arr, _opt){
  
  var _return = [];
  var _index;
  
  _opt = _opt || false;
  
  for(var i = 0; i < _arr.length; i++){
    
    _index = _arr[i];
    
    if(!_return[_index]) _return[_index] = 0;
    _return[_index] += 1;
    
  }
  
  if(_return.length < 1) return null;
  
  var _value = _return.reduce(function(_previousValue, _currentValue, _index, _array) {
    return Math.max(_previousValue, _currentValue);
  });
  
  if(_opt == false){
    
    return _return.indexOf(_value);
    
  }else{
    
    var _values = [];
    
    _index = _return.indexOf(_value);
    while(_index != -1){
      
      _values[_values.length] = _index;
      _return[_index] = null;
      _index = _return.indexOf(_value);
      
    }
    
    return _values;
    
  }
  
}

//funckja pusta (przydatna, gdy np. pętla wykonuje jakieś funkcje w tablicy niektóre elementy potrzebują nic nie robić)
ftmf.empty = function() {};

//funckja konwertująca pozycję myszki na punkt (vw, vh, px, px)
ftmf.toMousePoint = function(_arg){

  var _target = _arg.target || __gd;
  
  //pobierz rozmiary obszaru roboczego (Patrz style_functions.js)
  var _sizes = ftmf.getSizeObject(_target);
  
  //odejmij od pozycji myszki pozycję obszaru roboczego i uzyskaj "wyniki"
  var _mx = _arg.x - _sizes.left;
  var _my = _arg.y - _sizes.top;
  
  //przelicz "wyniki" na "wyniki procentowe"
  var _px = ftmf.precentValue(_mx, _sizes.width);
  var _py = ftmf.precentValue(_my, _sizes.height);
  
  //zwróc wszystkie wyniki
  return {x: _px , y: _py, px: _mx, py: _my};
  
}

//funkcja zamieniąjca wszystkie _from w tekście na _to
ftmf.replaceAll = function (_string, _from, _to){

  return String(_string).replace(new RegExp("(" + _from + ")", "g"), _to);

}

//funkcja zamieniająca każdy znak na jego kod ASCII i rozdzielajaca te kody @
ftmf.codeASCII = function(_text, _separator)
{

  _separator = _separator || "@";
  
  var _code = "";
  for(var i = 0; i < _text.length; i++){
    
    _code += _text.charCodeAt(i) + _separator;
    
  }
  
  return _code;
  
}

  //funkcja przyjmująca ciag uzyskany z globalData.code i splitująca co @, nastepnie zaminiajaca kody ASCII na znaki
ftmf.uncodeASCII = function(_code, _separator)
{

  _separator = _separator || "@";
  
  _code = _code.split(_separator);
  var _text = "";
  for(var i = 0; i < _code.length; i++){
    
    _text += String.fromCharCode(_code[i]);
    
  }
  
  return _text;
  
}

//funckja losująca
ftmf.random = function(_arg)
{
  
  //wylosuj liczbe
  var _number = (Math.random() * (_arg.max - _arg.min)) + _arg.min;
  
  //jeżeli zarządano zaokrąglenia liczby to zrób to
  if(_arg.floor && _arg.floor == 1)
  {
    
    _number = Math.floor(_number);
  
  }
  
  //zwróc liczbę
  return _number;
  
}

//ile procent _b stanowi _a
ftmf.precentValue = function(_a, _b)
{
  
  return 100 * parseFloat( _a ) / parseFloat( _b );
  
}

//ile wynosi 100% liczby jeżeli _b to _a% tej liczby
ftmf.precentValueBack = function(_a, _b)
{
  
  return parseFloat( _a ) * parseFloat( _b ) / 100;
  
}

//funckja generujaca tokeny
ftmf.generateToken = function(_number){
  _token = "";
  
  //wylosuj tyle znaków ile zarzadano * 2 (każdy obrót pętli losuje cyfrę i liczbę)
  for(var i = 0; i < _number; i++) _token += ftmf.random(97, 122) + ftmf.random(48, 57);
  
  //zwróc token
  return _token;
}

ftmf.getColorValue = function(_object, _val){
  
  if(typeof _object == "string") _object = __byId(_object);
  if(typeof _object == "undefined" || _object == null) return false;
  
  var _bck = _object.style[_val] || "#ffffff";
  if(_bck.indexOf("rgb") != -1){
    _bck = _bck.replace("rgb(", "").replace("rgba(", "").replace(")", "").replace(";", "");
    _bck = _bck.split(",");
    for(var i = 0; i < _bck.length; i++){
      _bck[i] = parseInt(_bck[i]).toString(16);
      while(_bck[i].length < 2) _bck[i] = "0" + _bck[i];
    }
    _bck = "#" + _bck.join("");
  }
  
  return _bck;
  
}

ftmf.getSizeObject = function(_object){

  var _sizes = {left: -1, top: -1, width: -1, height: -1, margin: -1, padding: -1};
  var _old = {};
  var _style;
  for(var i in _sizes){
    _object.style[i] = _object.style[i] || "0vw";
    _style = parseFloat(_object.style[i]);
    if(_object.style[i].indexOf("vw") != -1){
      _sizes[i] = ftmf.precentValueBack( _style, window.innerWidth);
      _old[i] = "vw";
    }
    else if(_object.style[i].indexOf("vh") != -1){
      _sizes[i] = ftmf.precentValueBack( _style, window.innerHeight);
      _old[i] = "vh";
    }
    else if(_object.style[i].indexOf("%") != -1){
      var _parent = _object.parentNode;
      if(typeof _parent != "undefined" && _parent != null){
        _w = _parent.clientWidth;
        _h = _parent.clientHeight;
        if(i == "left" || i == "width" || i == "margin" || i == "padding" || i == "fontSize" ) _sizes[i] = ftmf.precentValueBack(_style, _w );
        if(i == "top" || i == "height" ) _sizes[i] = ftmf.precentValueBack( _style, _h );
      }
      _old[i] = "%";
    }
    else if(_object.style[i].indexOf("px") != -1){
      _sizes[i] = _style;
      _old[i] = "px";
    }
  }
  
  _sizes.old = _old;
  return _sizes;

}

ftmf.resizeObject = function(_object, _sizes){
 
  for(var i in _sizes){

    _object.style[i] = _object.style[i] || "";
    
    if(_object.style[i].indexOf("vw") != -1){
      _object.style[i] = ftmf.precentValue(_sizes[i], window.innerWidth) + "vw";
    }
    else if(_object.style[i].indexOf("vh") != -1){
      _object.style[i] = ftmf.precentValue(_sizes[i], window.innerHeight) + "vh";
    }
    else if(_object.style[i].indexOf("%") != -1){
      var _parent = _object.parentNode;
      if(typeof _parent != "undefined" && _parent != null){
        _w = _parent.clientWidth;
        _h = _parent.clientHeight;
        if(i == "left" || i == "width" || i == "margin" || i == "padding") _object.style[i] = ftmf.precentValue(_sizes[i], _w ) + "%";
        if(i == "top" || i == "height" ) _object.style[i] = ftmf.precentValue(_sizes[i], _h ) + "%";
      }
    }
    else if(_object.style[i].indexOf("px") != -1){
      _object.style[i] = _sizes[i] + "px";
    }
  }

}
