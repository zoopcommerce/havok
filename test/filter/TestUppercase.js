define([
        'doh/main',
        'havok/filter/Uppercase'
    ],
    function(
        doh,
        Uppercase
    ){
        doh.register("havok/test/filter/TestUppercase", [

            function FilterTest(doh){
                var filter = new Uppercase;

                var testArray = [
                    ['ABCD', 'Abcd'],
                    ['ABCD', 'aBcd'],
                    ['ABCD', 'ABCD']
                ];

                var index;
                for (index in testArray){
                    doh.assertEqual(testArray[index][0], filter.filter(testArray[index][1]));
                }
            }
        ]);
    }
);


