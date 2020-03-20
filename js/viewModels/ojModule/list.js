define(['ojs/ojcore', 'knockout', 'jquery', '/js/viewModels/service.js', 'http://ojet.cynergy1.com/res/ords.js', 
'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojarraytabledatasource'],
function(oj, ko, $, s, or)
{     
    var viewModel = function(moduleParams)
    {   
        var self = this;
        this.dataArray     = ko.observableArray([]);
        this.selectedItems = ko.observableArray([]);
        this.dataArray(or.jGETArray('service/code?v_cnt=1'));
        this.dataSource = new oj.ArrayTableDataSource(this.dataArray, {idAttribute: "id"});
  
        this.gotoContent = function(event) {

            if (event.detail.value != null) {
                //var row = this.dataArray[event.detail.value];

                //console.log(moduleParams);  
                //var row = this.dataArray().indexOf(event.detail.value);
                var index = arrayFirstIndexOf(self.dataArray(), function (item) {
                    return item.id === event.detail.value;
                }); //returns 1
                var row = self.dataArray()[index];

                console.log(row.cnt);
                if (row.cnt == 1){
                    s.printKey();
                }else{
                    moduleParams.content2("Power");
                    moduleParams.currentModule("content");
                }
            }
            // if (event.detail.value != null){
            //     var key   = ko.observable(event.detail.value) 
            //     //var index = this.dataArray.indexOf(key);  
            //     //var row   = this.dataArray[index];
            //     console.log(index); 
            //     console.log(row.id);



            //     if (row.cnt == '1'){ s.printKey(row.id); }
            //     else { 
            //         moduleParams.content(row.cnt);
            //         moduleParams.currentModule("id");
            //     }                
            // }
        };

        function arrayFirstIndexOf(array, predicate, predicateOwner) {
            for (var i = 0, j = array.length; i < j; i++) {
                if (predicate.call(predicateOwner, array[i])) {
                    return i;
                }
            }
            return -1;
        }
    }

    return viewModel;
});	