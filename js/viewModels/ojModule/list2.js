define(['ojs/ojcore', 'knockout', 'jquery', 'http://ojet.cynergy1.com/res/ords.js', 
'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojarraytabledatasource', 'ojs/ojdatacollection-utils'],
function(oj, ko, $, or)
{     
    var dataArray = [];

    var viewModel = function(moduleParams)
    {   
        var self = this;
        this.sType2     = moduleParams.sType2;
        this.sImei2     = moduleParams.sImei2;
        console.log('moduleParams.sType2: ' + moduleParams.sType2() );
        console.log('moduleParams.sImei2: ' + self.sImei2()); 
        this.dataArray2 = ko.observableArray([]);

        if (self.sImei2() != undefined && self.sImei2().length > 0) {
            console.log('service/new_code?v_esn='+self.sImei2()+'&v_cnt=1&v_type='+self.sType2()+'&_=' + new Date().getTime() );
            this.dataArray2(or.jGETArray('service/n_code?v_esn='+self.sImei2()+'&v_cnt=2&v_type='+self.sType2()+'&_=' + new Date().getTime() )); 
        }
        
        this.dataSource = new oj.ArrayTableDataSource(this.dataArray2, {idAttribute: "id"});

        this.gotoContent = function(event) {

            if (event.detail.value != null) {
                //var row = this.dataArray[event.detail.value];

                //console.log(moduleParams);  
                //var row = this.dataArray().indexOf(event.detail.value);

                var index = arrayFirstIndexOf(self.dataArray2(), function (item) {
                    return item.id === event.detail.value;
                }); //returns 1
                var row = self.dataArray2()[index];

                console.log(row.id);
                if (row.cnt == 1){
                    self.flage = 'OFF';
                    var rootViewModel = ko.dataFor(document.getElementById('table'));
                    rootViewModel.codeObservableArray().forEach(function (v, i, arr) {
                        if(row.code == v.code && v.id.toString().length >= 9){
                            console.log(v);
                            self.flage = 'ON'
                        }
                    });

                    if( self.flage == 'OFF'){
                        var kyes = { 'id': new Date().getTime(), 'code':row.code, 'bc_desc':row.bc_desc };
                        rootViewModel.codeObservableArray.push(kyes);
                        //rootViewModel.codeObservableArray.reverse();
                    }

                    moduleParams.currentModule2("content2");
                    moduleParams.currentModule2("list2");
                }else{
                    moduleParams.content2(row.id);
                    //console.log('list1: ' + moduleParams.content1.length );
                    moduleParams.currentModule2("content2");
                    
                }
            }
        };

        function arrayFirstIndexOf(array, predicate, predicateOwner) {
            for (var i = 0, j = array.length; i < j; i++) {
                if (predicate.call(predicateOwner, array[i])) {
                    return i;
                }
            }
            return -1;
        }
        // this.newArray = ko.observableArray(or.jGETArray('service/code?v_cnt'));
        // //console.log('Create List2.js');
        // this.newArray().forEach(function (v, i, arr) {                  
        //     dataArray.push(v);                  
        // });

        // this.dataSource = new oj.ArrayTableDataSource(dataArray, {idAttribute: "id"});
        // //document.getElementById('listview').refresh();

        // this.gotoContent = function(event) {
        //     if (event.detail.value != null)
        //     {   
        //         var row = dataArray[event.detail.value];
        //         moduleParams.content2('Power');
        //         console.log('list2: ' + moduleParams.content2.length );
        //         moduleParams.currentModule2("content2");                
        //     }
        // };
    }

    return viewModel;
});	