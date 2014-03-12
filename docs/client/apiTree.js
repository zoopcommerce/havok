define([
    'dojo/store/Memory',
    'dojo/text!./api-tree-data.json'
],
function(
    Memory,
    data
){
    return new Memory(JSON.parse(data));
});
