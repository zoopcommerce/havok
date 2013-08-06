define([
    'dojo/_base/lang',
    'dojo/_base/array'
],
function(
    lang,
    array
){
    return {

        //di: undefined,

        abreviations: [
            'Trim',
            'Lowercase',
            'Propercase',
            'PadCurrency',
            'Uppercase',
            'Group',
            'HexColor'
        ],

        expand: function(base){
            if (array.indexOf(this.abreviations, base) != -1) {
                return 'havok/filter/' + base;
            }
            return base;
        },

        create: function(config){

            switch (true){
                case lang.isArray(config):
                    config = array.map(config, lang.hitch(this, function(item){
                        if (typeof item == 'object' && item.base) {
                            item.base = this.expand(item.base);
                            return item;
                        }
                        return this.expand(item);
                    }));
                    config = {
                        base: 'havok/filter/Chain',
                        gets: {
                            filters: config
                        }
                    };
                    break;
                case typeof config == 'object':
                    config.base = this.expand(config.base);
                    break;
                default:
                    config = this.expand(config);
            }

            return this.di.get(config);
        }
    }
});