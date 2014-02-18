define([
    'dojo/store/Memory'
],
function(
    Memory
){
    return new Memory({
        idProperty: 'id',
        data: [
            {id: 'Serif', text: '<span style="font-family:\'Serif\'">Serif</span>'},
            {id: 'Sans', text: '<span style="font-family:\'Sans\'">Sans</span>'},
            {id: 'Arial', text: '<span style="font-family:\'Arial\'">Arial</span>'},
            {id: 'Arial Black', text: '<span style="font-family:\'Arial Black\'">Arial Black</span>'},
            {id: 'Courier', text: '<span style="font-family:\'Courier\'">Courier</span>'},
            {id: 'Courier New', text: '<span style="font-family:\'Courier New\'">Courier New</span>'},
            {id: 'Comic Sans MS', text: '<span style="font-family:\'Comic Sans MS\'">Comic Sans MS</span>'},
            {id: 'Helvetica', text: '<span style="font-family:\'Helvetica\'">Helvetica</span>'},
            {id: 'Impact', text: '<span style="font-family:\'Impact\'">Impact</span>'},
            {id: 'Lucinda Grande', text: '<span style="font-family:\'Lucinda Grande\'">Lucinda Grande</span>'},
            {id: 'Tahoma', text: '<span style="font-family:\'Tahoma\'">Tahoma</span>'},
            {id: 'Times', text: '<span style="font-family:\'Times\'">Times</span>'},
            {id: 'Times New Roman', text: '<span style="font-family:\'Times New Roman\'">Times New Roman</span>'}
        ]
    });
});
