define([
        'doh/main',
        'havok/array'
    ],
    function(
        doh,
        array
    ){
        doh.register("havok/test/TestArray", [

            function arraySubtractTest(doh){
                var removeFrom = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
                var removeValues = [2, 3];

                var result = array.subtract(removeFrom, removeValues);
                doh.assertEqual([1, 4, 5, 1, 4, 5], result);
            }
        ]);
    }
);


