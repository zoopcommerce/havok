define ([
        'dojo/_base/declare'
    ],
    function (
        declare
    ){

        return declare (
            [],
            {
                name: 'toby',

                sound: 'roar',

                makeSound: function(){
                    return this.sound;
                }
            }
        );
    }
);


