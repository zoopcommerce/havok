define([
        'doh/main',
        'havok/string'
    ],
    function(
        doh,
        string
    ){
        doh.register("havok/test/TestString", [

            function ucFirstTest(doh){
                doh.assertEqual('Test', string.ucFirst('test'));
            }
        ]);
    }
);


