define ([
        'dojo/_base/declare'
    ],
    function (
        declare
    ){

        return declare (
            [],
            {
                name: 'the havok zoo',

                lion1: undefined,

                lion2: undefined,

                tiger: undefined,

                listAnimals: function(){
                    return [this.lion1.name, this.lion2.name, this.tiger.name];
                }
            }
        );
    }
);


