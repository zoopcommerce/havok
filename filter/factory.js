define([
    'dojo/_base/lang',
    '../di/Di'
],
function(
    lang,
    Di
){
    var prefix = 'havok/filter/',
        base = function(abbreviation){
            return {base: prefix + abbreviation}
        }

    return {

        //di: undefined,

        diConfig: {
            'Trim'           : base('Trim'),
            'Lowercase'      : base('Lowercase'),
            'Propercase'     : base('Propercase'),
            'Uppercase'      : base('Uppercase'),
            'CleanHTML'      : base('CleanHTML'),
            'HexColor'       : base('HexColor'),
            'Chain'          : {
                base: 'havok/filter/Chain',
                directives: {
                    cache: false
                }
            },
            'havok/filter/Chain' : {
                directives: {
                    cache: false
                }
            }
        },

        create: function(config){

            if (lang.isArray(config)){
                config = {
                    base: 'Chain',
                    gets: {
                        filters: config
                    }
                };
            }

            return this._diGetter().get(config);
        },

        _diGetter: function(){
            if (!this.di){
                this.di = new Di(this.diConfig);
            }
            return this.di;
        }
    }
});