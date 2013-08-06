define([
    'dojo/_base/lang',
    'dojo/_base/Color'
],
function(
    lang,
    Color
){
    // module:
    //		havok/form/Color

	lang.extend(Color,
        {
            // summary:
            //		A helper module used in ColorPicker
            //      Most code taken from dojox/color/_base

            toHsv: function(){
                // summary:
                //		Convert this Color to an HSV definition.
                var r=this.r/255, g=this.g/255, b=this.b/255;
                var min = Math.min(r, b, g), max = Math.max(r, g, b);
                var delta = max-min;
                var h = null, s = (max==0)?0:(delta/max);
                if(s==0){
                    h = 0;
                }else{
                    if(r==max){
                        h = 60*(g-b)/delta;
                    }else if(g==max){
                        h = 120 + 60*(b-r)/delta;
                    }else{
                        h = 240 + 60*(r-g)/delta;
                    }

                    if(h<0){ h+=360; }
                }
                return { h:h, s:Math.round(s*100), v:Math.round(max*100) };	//	Object
            }
        }
    );

    Color.fromHsv = function(hue, saturation, value){
        // summary:
        //		Create a Color from an HSV defined color.
        //		hue from 0-359 (degrees), saturation and value 0-100.

        if(lang.isArray(hue)){
            saturation=hue[1], value=hue[2], hue=hue[0];
        } else if (lang.isObject(hue)){
            saturation=hue.s, value=hue.v, hue=hue.h;
        }

        if(hue==360){ hue=0; }
        saturation/=100;
        value/=100;

        var r, g, b;
        if(saturation==0){
            r=value, b=value, g=value;
        }else{
            var hTemp=hue/60, i=Math.floor(hTemp), f=hTemp-i;
            var p=value*(1-saturation);
            var q=value*(1-(saturation*f));
            var t=value*(1-(saturation*(1-f)));
            switch(i){
                case 0:{ r=value, g=t, b=p; break; }
                case 1:{ r=q, g=value, b=p; break; }
                case 2:{ r=p, g=value, b=t; break; }
                case 3:{ r=p, g=q, b=value; break; }
                case 4:{ r=t, g=p, b=value; break; }
                case 5:{ r=value, g=p, b=q; break; }
            }
        }
        return new Color({ r:Math.round(r*255), g:Math.round(g*255), b:Math.round(b*255) });
    }

    return Color;
});
