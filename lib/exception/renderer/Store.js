define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/store/Memory',
    '../../get!../../store/manager'
],
function(
    declare,
    lang,
    when,
    Memory,
    storeManager
){
    return declare(
        [],
        {

            minSeverity: 0,

            //store: undefined,

            render: function(exceptionModel){
                when(this.getStore(), function(store){
                    exceptionModel.id = new Date().getTime();
                    store.add(exceptionModel);
                })
            },

            getStore: function(){
                if (this.store && typeof this.store == 'string'){
                    //get store from storeManager
                    this.store = storeManager.getStore(this.store);
                } else if (this.store && !this.store.query){
                    this.store = new Memory(this.store);
                }
                if (this.store.then){
                    this.store.then(lang.hitch(this, function(store){
                        this.store = store;
                    }));
                    return this.store;
                }
                return this.store;
            }
        }
    );
});
