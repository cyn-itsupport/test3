define(['ojs/ojcore', 'knockout', 'jquery', 'http://ojet.cynergy1.com/res/ords.js', 
        'ojs/ojknockout', 'promise', 'ojs/ojbutton', 'ojs/ojlistview', 'ojs/ojarraytabledatasource'],
function(oj, ko, $, or)
{     
    var viewModel = function(moduleParams)
    {
        this.content1 = moduleParams.content1;
        this.sType1   = moduleParams.sType1;
        this.sImei1    = moduleParams.sImei1;

        console.log('new sType1:  ' + this.sType1() );
        console.log('new content1:' + this.content1() );

        var self = this;
        self.dataArrayc1     = ko.observableArray([]);

        self.dataArrayc1().forEach(function (v, i, arr) {                  
            console.log( 'Init jGETArray: ' + v);               
        });

        console.log( 'service/new_code_detail?v_esn='+self.sImei1()+'&v_bccat2=' + this.content1() +'&v_type='+ this.sType1() +'&_=' + new Date().getTime() );
        this.dataArrayc1(or.jGETArray('service/new_code_detail?v_esn='+self.sImei1()+'&v_bccat2=' + this.content1() +'&v_type='+ this.sType1() +'&_=' + new Date().getTime() ));
        this.dataSource1 = new oj.ArrayTableDataSource(this.dataArrayc1, {idAttribute: "id"});
  

        self.dataArrayc1().forEach(function (v, i, arr) {                  
            console.log(v);               
        });


        this.gotoContent = function(event) {

            if (event.detail.value != null) {
 
                var index = arrayFirstIndexOf(self.dataArrayc1(), function (item) {
                    return item.id === event.detail.value;
                }); //returns 1
                var row = self.dataArrayc1()[index];

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
                        rootViewModel.codeObservableArray().forEach(function (v, i, arr) {
                            console.log(v);
                        });
                    }

                moduleParams.currentModule1(moduleParams.currentList1);
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

        this.gotoList = function(event) {
            moduleParams.currentModule1(moduleParams.currentList1);            
        };
    }

    return viewModel;
});	