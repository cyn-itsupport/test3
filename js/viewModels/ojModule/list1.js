define(['ojs/ojcore', 'knockout', 'jquery', 'http://ojet.cynergy1.com/res/ords.js', 
'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojarraytabledatasource'],
function(oj, ko, $, or)
{     
    var viewModel = function(moduleParams)
    {   
        var self = this;
        this.sType1     = moduleParams.sType1;
        this.sImei1     = moduleParams.sImei1;

        console.log('sType1: ' + self.sType1() ); 
        console.log('sImei1: ' + self.sImei1() ); 
        console.log(self.sType1() + self.sImei1() ); 

        this.dataArray1  = ko.observableArray([]);
        if (self.sImei1() != undefined && self.sImei1().length > 0) {
            console.log('service/n_code?v_esn='+self.sImei1()+'&v_cnt=1&v_type='+self.sType1()+'&_=' + new Date().getTime() );
            this.dataArray1(or.jGETArray('service/n_code?v_esn='+self.sImei1()+'&v_cnt=1&v_type='+self.sType1()+'&_=' + new Date().getTime() ));      
        }
        
        this.dataSource = new oj.ArrayTableDataSource(this.dataArray1, {idAttribute: "id"});

        this.gotoContent = function(event) {

            if (event.detail.value != null) {
                //var row = this.dataArray[event.detail.value];

                //console.log(moduleParams);  
                //var row = this.dataArray().indexOf(event.detail.value);
                var index = arrayFirstIndexOf(self.dataArray1(), function (item) {
                    return item.id === event.detail.value;
                }); //returns 1
                var row = self.dataArray1()[index];

                console.log('row.id:' + row.id);
                if (row.cnt == 1){

                    self.flage = 'OFF';
                    var rootViewModel = ko.dataFor(document.getElementById('table'));
                    rootViewModel.codeObservableArray().forEach(function (v, i, arr) {
                        console.log('codeObservableArray:' + v);
                        console.log(v.id.toString().length);
                        if(row.code == v.code && v.id.toString().length >= 9 ){
                            console.log(v);
                            self.flage = 'ON'
                        }
                    });
                    console.log( 'self.flage:' + self.flage );

                    if( self.flage == 'OFF'){
                        //rootViewModel.codeObservableArray.reverse();
                        var kyes = { 'id': new Date().getTime(), 'code':row.code, 'bc_desc':row.bc_desc };
                        rootViewModel.codeObservableArray.push(kyes);
                        //rootViewModel.codeObservableArray.reverse();
                        rootViewModel.codeObservableArray().forEach(function (v, i, arr) {
                            console.log('codeObservableArray:' + v);
                        });
                    }

                    moduleParams.currentModule1("content1");
                    moduleParams.currentModule1("list1");

                }else{
                    moduleParams.content1(row.id);
                    //console.log('list1: ' + moduleParams.content1.length );
                    moduleParams.currentModule1("content1"); 
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
    }

    return viewModel;
});	