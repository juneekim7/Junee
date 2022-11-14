let reserv=`
let _reservation;

let _printContent='';
let _shapeContent='';

function locate(_x=0, _y=0, _position="") {
    if(typeof(_x)=="number") _x+="px";
    if(typeof(_y)=="number") _y+="px";
    if(_x[0]=="0"&&+_y[0]=="0"&&_position=="") _position="relative";
    else if(_position=="") _position="absolute";

    return {
        "position": _position,
        "x": _x,
        "y": _y,
    }
}

function position(_x=0, _y=0, _position="") {
    return locate(_x, _y, _position);
}

function font(_color="black", _fontSize=20, _textAlign="left", _lineHeight=_fontSize) {
    if(typeof(_fontSize)=="number") _fontSize+="px";
    if(typeof(_lineHeight)=="number") _lineHeight+="px";

    return {
        "color": _color,
        "fontSize": _fontSize,
        "textAlign": _textAlign,
        "lineHeight": _lineHeight,
    };
}

function direction(_top=0, _right=0, _bottom=0, _left=0) {
    return {
        "top": _top,
        "right": _right,
        "bottom": _bottom,
        "left": _left,
    }
}

function shape(_width=162, _height=100, _backgroundColor="mediumslateblue", _border=border(), _borderRadius=borderRadius()) {
    if(typeof(_width)=="number") _width+="px";
    if(typeof(_height)=="number") _height+="px";

    return {
        "width": _width,
        "height": _height,
        "backgroundColor": _backgroundColor,
        "border": _border,
        "borderRadius": _borderRadius,
    };
}

function border(_widthTop=0, _colorTop="black", _widthRight='', _colorRight="", _widthBottom='', _colorBottom="", _widthLeft='', _colorLeft="") {
    if(typeof(_widthTop)=="number") _widthTop+="px";
    if(typeof(_widthRight)=="number") _widthRight+="px";
    if(typeof(_widthBottom)=="number") _widthBottom+="px";
    if(typeof(_widthLeft)=="number") _widthLeft+="px";

    let _borderWidth=(_widthTop+' '+_widthRight+' '+_widthBottom+' '+_widthLeft).trim();
    let _borderStyle='solid';
    let _borderColor=(_colorTop+' '+_colorRight+' '+_colorBottom+' '+_colorLeft).trim();

    return {
        "borderWidth": _borderWidth,
        "borderStyle": _borderStyle,
        "borderColor": _borderColor,
    };
}

function borderRadius(_leftTop=0, _rightTop=0, _rightBottom=0, _leftBottom=0) {
    let _borderRadius='';
    if(typeof(_leftTop)=="number") _leftTop+="px";
    if(typeof(_rightTop)=="number") _rightTop+="px";
    if(typeof(_rightBottom)=="number") _rightBottom+="px";
    if(typeof(_leftBottom)=="number") _leftBottom+="px";

    _borderRadius=_leftTop+' '+ _rightTop+' '+_rightBottom+' '+_leftBottom;

    return _borderRadius;
}

function print(_value, _font=font(), _pos=locate()) {
    _printContent+='<div style="color: '+_font.color+'; font-size: '+_font.fontSize+'; text-align: '+_font.textAlign+'; line-height: '+_font.lineHeight+'; position: '+_pos.position+'; left: '+_pos.x+'; top: '+_pos.y+';">'+_value+'</div>';
    document.getElementById("print").innerHTML=_printContent;
    return _value+"";
}

function rect(_shape=shape(), _pos=locate()) {
    _shapeContent+='<div class="rect" style="width: '+_shape.width+'; height: '+_shape.height+'; background-color: '+_shape.backgroundColor+'; border-width: '+_shape.border.borderWidth+'; border-style: '+_shape.border.borderStyle+'; border-color: '+_shape.border.borderColor+'; border-radius: '+_shape.borderRadius+'; position: '+_pos.position+'; left: '+_pos.x+'; top: '+_pos.y+';"></div>';
    document.getElementById("shape").innerHTML=_shapeContent;
}
`;

function turnJS(code) {
    code=code.replace(/변수 /g,"set ").replace(/함수 /g,"func ").replace(/위치\(/g,"locate(").replace(/폰트\(/g,"font(").replace(/방향\(/g,"direction(").replace(/모양\(/g,"shape(").replace(/테두리\(/g,"border(").replace(/둥근모서리\(/g,"borderRadius(").replace(/프린트\(/g,"print(").replace(/네모\(/g,"rect(")
    code=code.replace(/set /g,"let ").replace(/func /g,"function ")
    return code;
}

function compile(code) {
    let divide=[0];
    let ccode="";
    let errors=0;
    let notstring="";
    let doubleQuotes=0;
    let bracket=[0,0,0,0];
    const bracketOpen=["(","[","{"];
    const bracketClose=[")","]","}"];

    //check ""s in the code
    for(let i=0;i<code.length;i++) {
        if(code[i]=='"'&&code[i-1]!="\\") doubleQuotes++;
    }
    if(doubleQuotes%2!=0) {
        alert("error: 1 \" is missing.");
        errors++;
    }

    //check ' in the code
    for(let i=0;i<code.length;i++) {
        if(code[i]=='"'&&code[i-1]!="\\") divide.push(i);
        else if(code[i]=="'"&&code[i-1]!="\\") {
            alert("error: yerim isn't able to use '. You can use \' by a string.");
            errors++;
        }
    }

    //replace
    divide.push(code.length-1);
    if(divide.length!=2) {
        for(let i=0;i<divide.length;i+=2) {
            notstring+=code.substring(divide[i],divide[i+1]+1).replace(/"/,"");
            ccode+=turnJS(code.substring(divide[i],divide[i+1]));
            ccode+=code.substring(divide[i+1],divide[i+2]);
        }
    }
    else {
        ccode=turnJS(code);
        notstring=code;
    }

    //check _
    if(notstring.replace(/set\s*_/g,"'").indexOf("'")!=-1) {
        alert("error: you can not start your variation with _");
        errors++;
    }

    //check brakets in the code
    for(let i=0;i<notstring.length;i++) {
        if(bracketOpen.indexOf(notstring[i])!=-1) bracket[bracketOpen.indexOf(notstring[i])]++;
        if(bracketClose.indexOf(notstring[i])!=-1) bracket[bracketClose.indexOf(notstring[i])]--;
    }
    for(let i=0;i<bracket.length;i++) {
        if(bracket[i]>0) {
            alert("error: "+bracket[i]+" "+bracketClose[i]+" is(are) missing.");
            errors++;
        }
        else if(bracket[i]<0) {
            alert("error: "+abs(bracket[i])+" "+bracketOpen[i]+" is(are) missing.");
            errors++;
        }
    }

    if(errors!=0) return;

    code=ccode;
    return reserv+code;
}