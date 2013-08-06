define([
        'doh/main',
        'havok/filter/Propercase'
    ],
    function(
        doh,
        Propercase
    ){
        doh.register("havok/test/filter/TestPropercase", [

            function FilterTest(doh){
                var filter = new Propercase;

                var testArray = [
                    ['Abcd', 'abcd'],
                    ['Abcd Efg', 'abcd efg'],
                    ['Abcd Efg', 'abcD efG']
                ];

                var index;
                for (index in testArray){
                    doh.assertEqual(testArray[index][0], filter.filter(testArray[index][1]));
                }
            }
        ]);
    }
);


