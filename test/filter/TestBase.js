define([
        'doh/main',
        'havok/is',
        'havok/filter/Base'
    ],
    function(
        doh,
        is,
        Base
    ){
        doh.register("havok/test/filter/TestBase", [

            function FilterTest(doh){

                var filter = new Base;

                doh.assertTrue(is.isFilter(filter));
                doh.assertFalse(is.isFilter({}));
            }
        ]);
    }
);


