define([
        'doh/main',
        'havok/filter/Trim'
    ],
    function(
        doh,
        Trim
    ){
        doh.register("havok/test/filter/TestTrim", [

            function FilterTest(doh){
                var filter = new Trim;

                var testArray = [
                    ['abcd', 'abcd'],
                    ['abcd', ' abcd'],
                    ['abcd', 'abcd '],
                    ['ab cd', '  ab cd  '],
                    ['ab\ncd', '\nab\ncd\n'],
                ];

                var index;
                for (index in testArray){
                    doh.assertEqual(testArray[index][0], filter.filter(testArray[index][1]));
                }
            }
        ]);
    }
);


