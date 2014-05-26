define([
    'dojo/store/Memory'
],
function(
    Memory
){
    return new Memory({
        idProperty: 'id',
        data: [
            {id: 'large', size: 7, text: '<span class="font-large">Large</span>'},
            {id: 'normal', size: 4, text: '<span class="font-normal">Normal</span>'},
            {id: 'small', size: 2, text: '<span class="font-small">Small</span>'},
            {id: 'mini', size: 1, text: '<span class="font-mini">Mini</span>'}
        ]
    });
});
