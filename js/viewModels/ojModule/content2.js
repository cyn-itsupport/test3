define(['ojs/ojcore', 'knockout', 'jquery', 'http://ojet.cynergy1.com/res/ords.js', 
        'ojs/ojknockout', 'promise', 'ojs/ojbutton', 'ojs/ojlistview', 'ojs/ojarraytabledatasource'],
function(oj, ko, $, or)
{     
    var viewModel = function(moduleParams)
    {
        this.content2 = moduleParams.content2;
        this.sType2   = moduleParams.sType2;
        this.sImei2   = moduleParams.sImei2;

        console.log('new sType2:  ' + this.sType2() );
        console.log('new content2:' + this.content2() );

        var self = this;
        self.dataArray2     = ko.observableArray([]);

        self.dataArray2().forEach(function (v, i, arr) {                  
            console.log( 'Init jGETArray: ' + v);               
        });

        console.log( 'service/new_code_detail?v_esn='+self.sImei2()+'&v_bccat2=' + this.content2() +'&v_type='+ this.sType2() +'&_=' + new Date().getTime() );
        this.dataArray2(or.jGETArray('service/new_code_detail?v_esn='+self.sImei2()+'&v_bccat2=' + this.content2() +'&v_type='+ this.sType2() +'&_=' + new Date().getTime() ));
        this.dataSource2 = new oj.ArrayTableDataSource(this.dataArray2, {idAttribute: "id"});
  

        self.dataArray2().forEach(function (v, i, arr) {                  
            console.log(v);               
        });


        this.gotoContent = function(event) {

            if (event.detail.value != null) {
 
                var index = arrayFirstIndexOf(self.dataArray2(), function (item) {
                    return item.id === event.detail.value;
                }); //returns 1
                var row = self.dataArray2()[index];

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
    
                        // if ( rootViewModel.imei.length > 0 ){   
                            rootViewModel.codeObservableArray.push(kyes);
                            //rootViewModel.codeObservableArray.reverse();
                        // }else{
                        //     alert('Please scan the IMEI first.');
                        // }
                    }   
                moduleParams.currentModule2(moduleParams.currentList2);
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
            moduleParams.currentModule2(moduleParams.currentList2);            
        };
    }

    return viewModel;
});	