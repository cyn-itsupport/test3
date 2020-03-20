define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojarraydataprovider', 'http://ojet.cynergy1.com/res/ords.js', 
//'ojs/ojdatacollection-utils', 
'ojs/ojbutton', 
'ojs/ojknockout',
'ojs/ojselectcombobox', 
'ojs/ojfilmstrip',     'ojs/ojradioset', 
'ojs/ojlabel',         'ojs/ojcollapsible', 'ojs/ojinputtext',
'ojs/ojmasonrylayout', 'ojs/ojdialog',
'ojs/ojlistview',      'ojs/ojmodule',      'ojs/ojmoduleanimations',
'ojs/ojchart',         'ojs/ojtoolbar',     'ojs/ojnavigationlist',
'ojs/ojtable',         'ojs/ojinputnumber',
'ojs/ojtoolbar',       'ojs/ojmenu'
],
  function (oj, ko, $, ArrayDataProvider, or) {

    function ServiceViewModel() {
      var self = this;

      self.e_name = ko.observable('');
      self.e_id   = ko.observable('');

      self.selectedStepValue = ko.observable('INSPECTION');
      self.selectedStepLabel = ko.observable('Inspection');
      
      self.sType     = ko.observable('TRIAGE');
      self.sTypeId   = ko.observable('TRIAGE');

      self.imei      = ko.observable("");
      self.pos       = ko.observable('Bluetooth connectivity issues');
      
      self.key       = ko.observable('TEST123');

      self.value1    = ko.observable('');
      self.v_m_group = ko.observable("");
      
      self.drinkValues = [ 
        { label: 'TRIAGE',      id: 'TRIAGE',     display:false},
        { label: 'FQC',         id: 'FQC',        display:false},
        // { label: 'PORT Audio',  id: 'PORTAudio',  display:false},
        // { label: 'PORT CamOIS', id: 'PORTCamOIS', display:false},
        // { label: 'PORT Cam1',   id: 'PORTCam1',   display:false},
        // { label: 'PORT Cam2',   id: 'PORTCam2',   display:false},
        // { label: 'PORT IMU',    id: 'PORTIMU',    display:false},
        { label: 'OQC',         id: 'OQC',        display:false},
        { label: 'OBA',         id: 'OBA',        display:false}
        
        // { label: 'Audio',       id: 'Audio',      display:false},
        // { label: 'Laser',       id: 'Laser',      display:false},
        // { label: 'LaserCam2',   id: 'LaserCam2',  display:false},
        // { label: 'LaserCam3',   id: 'LaserCam3',  display:false},
        // { label: 'Display',     id: 'Display',    display:false},
        // { label: 'OSLO',        id: 'OSLO',       display:false}
      ];

      self.drink = ko.observable("TRIAGE");


      self.evtData = ko.observable();
      self.drinkValues_two = [ 

        { label: 'PORT Audio',  id: 'PORTAudio',  display:false},
        { label: 'PORT CamOIS', id: 'PORTCamOIS', display:false},
        { label: 'PORT Cam1',   id: 'PORTCam1',   display:false},
        { label: 'PORT Cam2',   id: 'PORTCam2',   display:false},
        { label: 'PORT IMU',    id: 'PORTIMU',    display:false}
        
        // { label: 'Audio',       id: 'Audio',      display:false},
        // { label: 'Laser',       id: 'Laser',      display:false},
        // { label: 'LaserCam2',   id: 'LaserCam2',  display:false},
        // { label: 'LaserCam3',   id: 'LaserCam3',  display:false},
        // { label: 'Display',     id: 'Display',    display:false},
        // { label: 'OSLO',        id: 'OSLO',       display:false}
      ];

      self.drink_two = ko.observable();  

      //Change TAB
      self.ListenerType = function(event){
        
        var index = arrayFirstIndexOf(self.drinkValues, function (item) {
          return item.id === event.detail.value;
        }); //returns 1
        var data = self.drinkValues[index];
        console.log(  data        );
        self.sType(   data.label  );
        self.sTypeId( data.id     );
        //console.log(  data.id    );
        self.sType1(  data.id     );
        self.sType2(  data.id     );
        self.sImei1(  self.imei() );
        self.sImei2(  self.imei() );

        var viewModel = ko.dataFor(document.getElementById('page1'));
        viewModel.dataArray1([]);
        var viewMode2 = ko.dataFor(document.getElementById('page2'));
        viewMode2.dataArray2([]);

        console.log( 'Change TAB:' + data.display  );
        if( data.display == true){
            alert( data.label + ' is not avaiable for this model.' );
        } else {
            if (self.imei() != undefined && self.imei().length > 0) {

              var viewModel = ko.dataFor(document.getElementById('page1'));
              viewModel.dataArray1([]);
              viewModel.dataArray1(or.jGETArray('service/n_code?v_esn='+self.imei()+'&v_cnt=1&v_type='+self.sTypeId()+'&_=' + new Date().getTime() ));

              viewModel.dataArray1().forEach(function (v, i, arr) {                  
                      console.log(v);                 
              });

              var viewMode2 = ko.dataFor(document.getElementById('page2'));
              viewMode2.dataArray2([]);
              viewMode2.dataArray2(or.jGETArray('service/n_code?v_esn='+self.imei()+'&v_cnt=2&v_type='+ self.sTypeId() +'&_=' + new Date().getTime() ));

              self.codeObservableArray([]);
              self.codeObservableArray(or.jGETArray( 'service/imei_code?v_esn=' + self.imei() + '&=' + self.sType() + '&_=' + new Date().getTime() ));

            }
        }
      }



      function arrayFirstIndexOf(array, predicate, predicateOwner) {
        for (var i = 0, j = array.length; i < j; i++) {
            if (predicate.call(predicateOwner, array[i])) {
                return i;
            }
        }
        return -1;
      }


      //Change TAB
      self.Listener_two = function(event){
  
        var index = arrayFirstIndexOf(self.drink_two, function (item) {
          return item.id === event.detail.value;
        }); //returns 1
        var data = self.drink_two[index];
        console.log(  data        );
        self.sType(   data.label  );
        self.sTypeId( data.id     );
        //console.log(  data.id    );
        self.sType1(  data.id     );
        self.sType2(  data.id     );
        self.sImei1(  self.imei() );
        self.sImei2(  self.imei() );

        var viewModel = ko.dataFor(document.getElementById('page1'));
        viewModel.dataArray1([]);
        var viewMode2 = ko.dataFor(document.getElementById('page2'));
        viewMode2.dataArray2([]);

        console.log( 'Change TAB:' + data.display  );
        if( data.display == true){
            alert( data.label + ' is not avaiable for this model.' );
        } else {
            if (self.imei() != undefined && self.imei().length > 0) {

              var viewModel = ko.dataFor(document.getElementById('page1'));
              viewModel.dataArray1([]);
              viewModel.dataArray1(or.jGETArray('service/n_code?v_esn='+self.imei()+'&v_cnt=1&v_type='+self.sTypeId()+'&_=' + new Date().getTime() ));

              viewModel.dataArray1().forEach(function (v, i, arr) {                  
                      console.log(v);                 
              });

              var viewMode2 = ko.dataFor(document.getElementById('page2'));
              viewMode2.dataArray2([]);
              viewMode2.dataArray2(or.jGETArray('service/n_code?v_esn='+self.imei()+'&v_cnt=2&v_type='+ self.sTypeId() +'&_=' + new Date().getTime() ));

              self.codeObservableArray([]);
              self.codeObservableArray(or.jGETArray( 'service/imei_code?v_esn=' + self.imei() + '&=' + self.sType() + '&_=' + new Date().getTime() ));

            }
        }
      }



      //Select Port Station///////////////////////////////////////////////////////////////
      self.valueChangedHandler = function(event){
        //console.log(self.evtData(event['detail']));
        console.log( event);
        console.log( event['detail']['value'] );

        self.str    = event['detail']['value'];
        //var label   = event['target']['outerText'].split('\n')[0];
        //label       = label.substring(0,label.length);
        var port_flage = true;

        var v_first, v_end;
        if( self.str.indexOf('_') >= 0 ){
          v_first = self.str.substring( 0,2 );
          v_end   = self.str.substring( 3,self.str.length );
          //console.log( v_first +':'+ v_end +':'+ label );
        }else{ v_end = self.str; }

        self.sType(   v_end       );
        self.sTypeId( v_end       );
        //console.log(  data.id    );
        self.sType1(  v_end       );
        self.sType2(  v_end       );
        self.sImei1(  self.imei() );
        self.sImei2(  self.imei() );

        var viewModel = ko.dataFor(document.getElementById('page1'));
        viewModel.dataArray1([]);
        var viewMode2 = ko.dataFor(document.getElementById('page2'));
        viewMode2.dataArray2([]);

        var g_step = ["TRIAGE","FQC","OQC","OBA"];
        //if( !g_step.includes(self.sTypeId()) ){
        if( g_step.indexOf(self.sTypeId()) == -1 ){ 
          var para = { v_esn: self.imei(), v_type: self.sTypeId() };
          console.log('codeObservableArray: ' + JSON.stringify(para));
          var data = or.jPOST('service/n_set_tab', para);
          console.log('self.data.v_result: ' + data.v_result);
          if (data.v_result != 'OK') { 
            //alert( self.sTypeId() + ' is not avaiable for this model.' ); 
            port_flage = false; 
          }
        }

        //console.log( 'Change TAB:' + data.display  );
        if( !port_flage ){
            if(self.sImei1() != undefined && self.sImei1().length > 0){
              alert( v_end + ' is not avaiable for this model.' );
            }
        } else {
            if (self.imei() != undefined && self.imei().length > 0) {

              var viewModel = ko.dataFor(document.getElementById('page1'));
              viewModel.dataArray1([]);
              viewModel.dataArray1(or.jGETArray('service/n_code?v_esn='+self.imei()+'&v_cnt=1&v_type='+self.sTypeId()+'&_=' + new Date().getTime() ));

              viewModel.dataArray1().forEach(function (v, i, arr) {                  
                      console.log(v);                 
              });

              var viewMode2 = ko.dataFor(document.getElementById('page2'));
              viewMode2.dataArray2([]);
              viewMode2.dataArray2(or.jGETArray('service/n_code?v_esn='+self.imei()+'&v_cnt=2&v_type='+ self.sTypeId() +'&_=' + new Date().getTime() ));

              self.codeObservableArray([]);
              self.codeObservableArray(or.jGETArray( 'service/imei_code?v_esn=' + self.imei() + '&=' + self.sType() + '&_=' + new Date().getTime() ));

            }
        }
      }  









      //Set chart data!================================================================================
      self.lineSeries = [];
      self.lineGroups  = ["P1", "P2", "P3", "P4", "P5"];

      $.ajax({
				async: false,
				url: 'http://ords.cynergy1.com/ords/hitech/service/chart',
				dataType: "json",
				success: function(users){
          $.each(users.items, function() {
						self.lineSeries.push({
						  'name': this.name,
						  'items': [this.p1, this.p2, this.p3, this.p4, this.p5 ]
						});
					});
				}
      });
      
      self.lineSeriesValue = ko.observableArray(self.lineSeries);
      self.lineGroupsValue = ko.observableArray(self.lineGroups);



      //Code =============================================================================================
      self.codeObservableArray = ko.observableArray([]);
      self.codeprovider        = new ArrayDataProvider(self.codeObservableArray, {keyAttributes: 'id'});



      this.codeRemove = function(i){
        self.codeObservableArray.splice(i,1);
      }

      
      
      //Clear ============================================================================================
      self.addKey = function () {
         
         self.codeObservableArray().forEach(function (v, i, arr) {
           console.log(v);
         });
         self.codeObservableArray([]);
         self.codeObservableArray(or.jGETArray( 'service/imei_code?v_esn=' + self.imei() + '&=' + self.sType() + '&_=' + new Date().getTime() ));
         //self.codeObservableArray.reverse();

      };





      self.ListenerdeleteKey = function (event, ui) {
        // var data = event.detail;
        // var rowIndex = event.detail.currentRow['rowKey'];
        // event.detail.value;
        console.log('rowIndex: ' + event.detail );
        //self.codeObservableArray([]);
      };



      //Previous Code   ===================================================================================
      self.preArray    = ko.observableArray([]);
      self.preprovider = new oj.ArrayTableDataSource(self.preArray, {idAttribute: "id"});



      //Save  ============================================================================================
      self.ListenerSave = function () {

        console.log( 'self.imei().lengh: '+ self.imei().length );
        console.log( 'self.imei(): '+ self.imei() +' '+ self.sTypeId()) +':' ;
        self.flage = 'OFF';

        if (self.imei() != undefined && self.imei().length > 0) {
          
          var result = ko.observable(true);

          self.codeObservableArray().forEach(function (v, i, arr) {
            if (v.id.toString().length >= 9) {
              var para = { v_esn: self.imei(), v_step: self.sTypeId(), v_eid: self.e_id(), v_code: v.code };
              console.log('codeObservableArray: ' + JSON.stringify(para));
              var data = or.jPOST('service/code', para);
              console.log('self.data.v_result: ' + data.v_result);
              if (data.v_result != 'OK') { alert(data.v_result + ' : ' + JSON.stringify(para)); self.flage = 'ON'; }
              //else{ self.flage = 'ON'; }
            }
          });

        }else{ alert('Please scan the IMEI first.'); }
        console.log( 'self.flage: '+ self.flage );
        if( self.flage == 'OFF'){
          self.codeObservableArray([]);
          self.imei("");
          self.preArray([]);
          self.preArray(or.jGETArray('service/previous?v_eid='+self.e_id()+ '&_=' + new Date().getTime() ));
        }

      };






      // self.printKey = function () {
      //   console.log(self.key());
      //   self.key('TEST0001');
      //   console.log(self.key());
      // };
  

      // this.ListenerCreate = function () {
      //   self.sType( 'DOWNLOAD' ); 
      // };








      //IMEI ==============================================================================================
      self.infoArray    = ko.observableArray([]);
      self.infoprovider = new oj.ArrayTableDataSource(self.infoArray, {idAttribute: "id"});
      self.camcodeArray = ko.observableArray([]);

      self.enterKeypress = function (data, event) {
        if (event.type === 'keypress' && event.keyCode === 13 && self.imei() != undefined && self.imei().length > 0) {

          //self.drinkValues.forEach(function (v, i, arr) { if( v.id.includes('PORTCam')){ v.display = true;} });
          self.step_flag = true;
          // self.drinkValues[3].display = true;
          // self.drinkValues[4].display = true;
          // self.drinkValues[5].display = true;
          
          var viewModel = ko.dataFor(document.getElementById('page1'));
          viewModel.dataArray1([]);
          var viewMode2 = ko.dataFor(document.getElementById('page2'));
          viewMode2.dataArray2([]);

          var g_step = ["TRIAGE","FQC","OQC","OBA"];
          //console.log( 'g_step.includes:' + g_step.includes(self.sTypeId()) );

          //if( !g_step.includes(self.sTypeId()) ){
          if( g_step.indexOf(self.sTypeId()) == -1 ){    
            var para = { v_esn: self.imei(), v_type: self.sTypeId() };
            console.log('codeObservableArray: ' + JSON.stringify(para));
            var data = or.jPOST('service/n_set_tab', para);
            console.log('self.data.v_result: ' + data.v_result);
            if (data.v_result != 'OK') { alert( self.sTypeId() + ' is not avaiable for this model.' ); self.step_flag = false; }
          }
          // self.drinkValues.forEach(function (v, i, arr) { 
          //     console.log(v); 
          // });

          // self.camcodeArray([]);
          // self.camcodeArray(or.jGETArray( 'service/set_tab?v_esn=' + self.imei() + '&_=' + new Date().getTime() ));
          // self.camcodeArray().forEach(function (c, i, arr) {                  
          //   //console.log(c.camcode);
          //   self.drinkValues.forEach(function (v, i, arr) { 
          //     //console.log(v.id);
          //     if(c.camcode == v.id){ v.display = false; console.log(v);} 
          //   });                 
          // });


          // self.drinkValues.forEach(function (v, i, arr) { 
          //   if( (v.id == self.sTypeId()) && (v.display) ){
          //     alert( v.label + ' is not avaiable for this model.' );
          //     console.log(v); 
          //     self.step_flag = false;
          // }});

          //document.getElementById('buttons-container');  
          //document.getElementById('drinkset').refresh();
          //$("#drinkset").ojButtonset( "option", "disabled", true);  
          //$("#drinkset").ojButtonset("refresh");
          
          //var index = arrayFirstIndexOf(self.drinkValues, function (item) {return item.id === event.detail.value;});
          //console.log(self.drinkValues[index].id + self.drinkValues[index].display);
          //console.log(index);
          console.log('self.set_flag: '+ self.step_flag);

          if(self.step_flag){
            self.infoArray(or.jGETArray('service/info?v_esn=' + self.imei() + '&_=' + new Date().getTime()));
            console.log('enterKeypress:' + self.imei());
            console.log('enterKeypress:' + 'service/info?v_esn=' + self.imei() + '&_=' + new Date().getTime());
  
            self.codeObservableArray(or.jGETArray( 'service/imei_code?v_esn=' + self.imei() + '&=' + self.sType() + '&_=' + new Date().getTime() ));

            var viewModel = ko.dataFor(document.getElementById('page1'));
            viewModel.dataArray1([]);
            viewModel.dataArray1(or.jGETArray('service/n_code?v_esn='+self.imei()+'&v_cnt=1&v_type='+self.sTypeId()+'&_=' + new Date().getTime() ));
            console.log('Enter-Key on IMEI:' + 'service/n_code?v_esn='+self.imei()+'&v_cnt=1&v_type='+self.sTypeId()+'&_=' + new Date().getTime() );

            var viewMode2 = ko.dataFor(document.getElementById('page2'));
            viewMode2.dataArray2([]);
            viewMode2.dataArray2(or.jGETArray('service/n_code?v_esn='+self.imei()+'&v_cnt=2&v_type='+ self.sTypeId() +'&_=' + new Date().getTime() ));
          }

        }
        return true;
      };






      


        //         //moduleParams.currentModule1("content1"); 
        //   //moduleParams.currentModule1("list1");
        //   //self.codeObservableArray.removeAll();
        //   //self.codeObservableArray([]);
        //   // this.modulePath1    = ko.pureComputed(function(){
        //   //   return ('ojModule/' + "list1" );}
        //   // );

        //   // this.modulePath2    = ko.pureComputed(function(){
        //   //   return ('ojModule/' + "list2" );}
        //   // );

        //  //self.codeObservableArray.reverse();
        //   // self.codeObservableArray().forEach(function (v, i, arr) {
        //   //   console.log(v);
        //   // });

        //  //self.codeObservableArray.removeAll();
        //   //self.codeObservableArray.splice(0,20);
        //   //self.codeObservableArray([]);
        //   //self.codeObservableArray.removeAll();


 
      // self.typeArray = [
      //   { label: 'Triage', id: 'TRIAGE' },
      //   { label: 'FQC',    id: 'FQC'    },
      //   { label: 'PORT',   id: 'PORT'   },
      //   { label: 'OQC',    id: 'OQC'    }
      // ];

      self.currDetailPage = ko.observable({ "index": 0 });

      masterClick = function (event, data) {
        //get the ko binding context for the item DOM element
        var context = ko.contextFor(event.target);
        //get the index of the item from the binding context
        var index = context.$index();
        //set currDetailPage in a timeout so that the page change 
        //transitions smoothly, otherwise it seems that there's some 
        //processing going on that interferes (maybe due to knockout)
        setTimeout(function () {
          self.currDetailPage({ "index": index });
        }, 50);
        
        self.sType(   data.label );
        self.sTypeId( data.id    );
        //console.log(  data.id    );
        self.sType1(  data.id    );
        self.sType2(  data.id    );

        //console.log( self.sType1  );
        //console.log( self.imei()  );

        self.xImei1( self.imei );
        self.xImei2( self.imei );
        
        console.log( self.xImei1  );

        var viewModel = ko.dataFor(document.getElementById('page1'));
        viewModel.dataArray1([]);
        viewModel.dataArray1(or.jGETArray('service/n_code?v_esn=' + self.imei() + '&v_cnt=1&v_type='+self.sTypeId()+'&_=' + new Date().getTime() ));
        // viewModel.dataArray1().forEach(function (v, i, arr) {                  
        //         console.log(v);                 
        // });

        var viewMode2 = ko.dataFor(document.getElementById('page2'));
        viewMode2.dataArray2([]);
        viewMode2.dataArray2(or.jGETArray('service/n_code?v_esn=' + self.imei() + '&v_cnt=2&v_type='+ self.sTypeId() +'&_=' + new Date().getTime() ));

        // this.modulePath1 = ko.pureComputed(function(){
        //   return ('ojModule/' + self.currentModule1());}
        // );

        // this.modulePath2 = ko.pureComputed(function(){
        //   return ('ojModule/' + self.currentModule2());}
        // );
        self.codeObservableArray([]);
        self.codeObservableArray(or.jGETArray( 'service/imei_code?v_esn=' + self.imei() + '&=' + self.sType() + '&_=' + new Date().getTime() ));
 
      };

      getItemInitialDisplay = function (index) { return index < 3 ? '' : 'none'; };

      // getMasterItemInitialDisplay = function (index) {
      //   return index < 3 ? '' : 'none';
      // };

      // getMasterItemLabelId = function (index) {
      //   return 'masterLabel' + index;
      // };

      isMasterItemSelected = function (index) { return self.currDetailPage().index == index; };

      // getMasterItemLabelledBy = function (index) {
      //   var labelledBy = getMasterItemLabelId(index);
      //   if (isMasterItemSelected(index))
      //     labelledBy += " masterItemSelectedLabel";
      //   return labelledBy;
      // };














      // self.chemicals = [
      //   { name: 'Hydrogen', 
      //     sizeClass: 'oj-masonrylayout-tile-1x1',
      //     content: 'This is the zoomed Hydrogen content.' },
      //   { name: 'Helium', 
      //     sizeClass: 'oj-masonrylayout-tile-1x1',
      //     content: 'This is the zoomed Helium content.' },
      //   { name: 'Lithium', 
      //     sizeClass: 'oj-masonrylayout-tile-1x1',
      //     content: 'This is the zoomed Lithium content.' },
      //   { name: 'Beryllium', 
      //     sizeClass: 'oj-masonrylayout-tile-1x1',
      //     content: 'This is the zoomed Beryllium content.' },
      //   { name: 'Boron', 
      //     sizeClass: 'oj-masonrylayout-tile-1x1',
      //     content: 'This is the zoomed Boron content.' },
      //   { name: 'Carbon', 
      //     sizeClass: 'oj-masonrylayout-tile-1x1',
      //     content: 'This is the zoomed Carbon content.' },
      //   { name: 'Nitrogen', 
      //     sizeClass: 'oj-masonrylayout-tile-1x1',
      //     content: 'This is the zoomed Nitrogen content.' },
      //   { name: 'Oxygen', 
      //     sizeClass: 'oj-masonrylayout-tile-1x1',
      //     content: 'This is the zoomed Oxygen content.' },
      //   { name: 'Fluorine', 
      //     sizeClass: 'oj-masonrylayout-tile-1x1',
      //     content: 'This is the zoomed Fluorine content.' },
      //   { name: 'Neon', 
      //     sizeClass: 'oj-masonrylayout-tile-1x1',
      //     content: 'This is the zoomed Neon content.' },
      //   { name: 'Sodium', 
      //     sizeClass: 'oj-masonrylayout-tile-1x1',
      //     content: 'This is the zoomed Sodium content.' },
      //   { name: 'Magnesium', 
      //     sizeClass: 'oj-masonrylayout-tile-1x1',
      //     content: 'This is the zoomed Magnesium content.' }
      // ];
      // self.zoomData = ko.observable(self.chemicals[0]);
      // self.zoomTile = ko.observable();
      // self.dialogPosition = ko.observable(
      //   {my: "center", 
      //    at: "center", 
      //    collision: "fit"});
      // self.originalPos = null;
      // self.animateEndCallback = null;
      
      // demoZoomTile = function(event)
      // {
      //   var target = event.target;
      //   var tile = $(target).closest(".demo-tile");
        
      //   //get the ko binding context for the tile DOM element
      //   var context = ko.contextFor(tile[0]);
      //   //get the data for the tile, which will be an item in the 
      //   //self.chemicals array defined above
      //   var data = context.$data;
        
      //   //save context information for the zoom
      //   self.zoomData(data);
      //   self.zoomTile(tile);
      //   //position the dialog to overlay the tile
      //   self.dialogPosition(
      //     {my: "left top", 
      //      at: "left top", 
      //      collision: "fit", 
      //      of: tile});
      //   //open the dialog in a timeout so that the above changes 
      //   //have a chance to propagate
      //   setTimeout(function() {
      //     document.querySelector("#dialog").open();
      //   }, 10);
      // };
      
      // demoDialogAnimateStart = function(event)
      // {
      //   //since the open/close animation is handled manually, call 
      //   //preventDefault() on the event and save off the endCallback
      //   var ui = event.detail;
      //   if (ui.action === "open" || ui.action === "close")
      //   {
      //     event.preventDefault();
      //     self.animateEndCallback = ui.endCallback;
      //   }
      // };
      
      // demoDialogBeforeOpen = function(event)
      // {
      //   var dialog = $("#dialog");
      //   //initially size the dialog to match the tile that 
      //   //launched it
      //   dialog.css("width", self.zoomTile().css("width"));
      //   dialog.css("height", self.zoomTile().css("height"));
      //   //initially make the dialog transparent
      //   dialog.css("opacity", 0);
      //   //save the original position information so that it can be 
      //   //used when closing the dialog
      //   self.originalPos = {
      //     left: dialog.css("left"), 
      //     top: dialog.css("top"), 
      //     width: self.zoomTile().css("width"), 
      //     height: self.zoomTile().css("height")
      //   };
        
      //   //start a transition to fade in the dialog and grow it to 
      //   //fill the window
      //   setTimeout(function() {
      //     var gap = 10;
      //     dialog.addClass("demo-zoom-transition");
      //     dialog.css("opacity", 1);
      //     //in IE, scrollX and scrollY are undefined on the window, 
      //     //so need to use pageXOffset and pageYOffset instead
      //     var scrollX = window.scrollX || window.pageXOffset;
      //     var scrollY = window.scrollY || window.pageYOffset;
      //     dialog.css("left", (gap + scrollX) + "px");
      //     dialog.css("top", (gap + scrollY) + "px");
      //     dialog.css("width", 
      //       (window.innerWidth - (2 * gap)) + "px");
      //     dialog.css("height", 
      //       (window.innerHeight - (2 * gap)) + "px");
          
      //     //since the open/close animation is handled manually, listen
      //     //for the end of the transition and call the endCallback
      //     var f = function() {
      //       dialog.off("transitionend webkitTransitionEnd");
      //       if (self.animateEndCallback)
      //       {
      //         self.animateEndCallback();
      //         self.animateEndCallback = null;
      //       }
      //     };
      //     dialog.on("transitionend webkitTransitionEnd", f);
      //   }, 10);
      // };
      
      // demoDialogBeforeClose = function(event)
      // {
      //   var dialog = $("#dialog");
      //   dialog.css("opacity", 0);
      //   dialog.css("left", self.originalPos.left);
      //   dialog.css("top", self.originalPos.top);
      //   dialog.css("width", self.originalPos.width);
      //   dialog.css("height", self.originalPos.height);

      //   //since the open/close animation is handled manually, listen
      //   //for the end of the transition and call the endCallback
      //   var f = function() {
      //     dialog.off("transitionend webkitTransitionEnd");
      //     if (self.animateEndCallback)
      //     {
      //       self.animateEndCallback();
      //       self.animateEndCallback = null;
      //     }
      //   };
      //   dialog.on("transitionend webkitTransitionEnd", f);
      // };
      
      // demoDialogClose = function(event)
      // {
      //   //remove the transition class, sizing, and position info so 
      //   //that the next time the dialog is opened there's no leftover 
      //   //state
      //   var dialog = $("#dialog");
      //   dialog.removeClass("demo-zoom-transition");
      //   dialog.css("left", "");
      //   dialog.css("top", "");
      //   dialog.css("width", "");
      //   dialog.css("height", "");
      // };
      
      // getTileId = function(index)
      // {
      //   return 'tile' + (index + 1);
      // };
      
      // getLabelId = function(index)
      // {
      //   return 'label' + (index + 1);
      // };
      
      // getButtonId = function(index)
      // {
      //   return 'zoomButton' + (index + 1);
      // };
      
      // getButtonLabelledBy = function(index)
      // {
      //   return getButtonId(index) + ' ' + getLabelId(index);
      // };





      // var data = [{id: 0, name: 'Potential cat names', date: 'Apr 30', content: 'Mew, Furball, Puss'},
      //               {id: 1, name: 'Todo list for work', date: 'Apr 29', content: 'Add one more'},
      //               {id: 2, name: 'Chicken recipes', date: 'Apr 15', content: 'Fried, Shake & Bake, Sautee'},
      //               {id: 3, name: 'Running routes', date: 'Apr 3', content: 'Bedroom to kitchen and back'},
      //               {id: 4, name: 'Groceries', date: 'Apr 1', content: 'Milk, bread, meat, veggie, can, etc.'},
      //               {id: 5, name: 'Party guest list', date: 'Mar 29', content: ''},
      //               {id: 6, name: 'Weekend projects', date: 'Mar 2', content: 'TBD'}
      //              ];
      //   self.dataProvider = new ArrayDataProvider(data, 
      //                                                {keys:data.map(function(value) {
      //                                                    return value.id;
      //                                                })}); 
      //   self.content = ko.observable("");

      //   self.gotoList = function(event, ui) {
      //       document.getElementById("listview").currentItem = null;
      //       self.slide();
      //   };

      //   self.gotoContent = function(event) {
      //     console.log( event.detail.value );
      //       //if (event.detail.value != null && event.detail.value.length > 0)
      //       //{   
      //           var row = data[event.detail.value];
      //           self.content(row.content);                    
      //           self.slide();
      //           self.printKey();
      //           console.log( row.content );
      //       //}
      //   };

      //   self.slide = function() {
      //     console.log( 'slide' );
      //       $("#page1").toggleClass("demo-page1-hide");
      //       $("#page2").toggleClass("demo-page2-hide");
      //       //document.getElementById('listviewContainer').refresh();
      //   }




      this.selectedItems  = ko.observableArray([]);
      this.currentList1   = "list1";
      this.currentModule1 = ko.observable(this.currentList1);
      this.content1       = ko.observable("");
      this.sType1         = self.sTypeId;
      this.sImei1         = self.imei;
      //console.log( 'this.sType1: ' + this.sType1 );


      this.modulePath1    = ko.pureComputed(function(){
          return ('ojModule/' + self.currentModule1());}
      );

      this.customNavChild1  = oj.ModuleAnimations.createAnimation({'effect':'zoomOut','persist':'all'}, 'zoomIn', false);
      this.customNavParent1 = oj.ModuleAnimations.createAnimation({'effect':'zoomOut','endAngle':'-180deg','persist':'all'}, {'effect':'zoomIn','startAngle':'180deg'}, false);
      
      this.getCustomAnimation1 = function(context)
      {
        var module = self.currentModule1();
        if (module === 'list1') {
          return self.customNavParent1;
        }
        return self.customNavChild1;
      };
       










      

      this.currentList2   = "list2";
      this.currentModule2 = ko.observable(this.currentList2);
      this.content2       = ko.observable("");
      this.sType2         = self.sTypeId;
      this.sImei2         = self.imei;

      this.modulePath2 = ko.pureComputed(function(){
          return ('ojModule/' + self.currentModule2());}
      );

      this.customNavChild2  = oj.ModuleAnimations.createAnimation({'effect':'flipOut','persist':'all'}, 'flipIn', false);
      this.customNavParent2 = oj.ModuleAnimations.createAnimation({'effect':'flipOut','endAngle':'-180deg','persist':'all'}, {'effect':'flipIn','startAngle':'180deg'}, false);
      
      this.getCustomAnimation2 = function(context)
      {
        var module = self.currentModule2();
        if (module === 'list2') {
          return self.customNavParent2;
        }
        return self.customNavChild2;
      };











      self.reset = function(){
        console.log( 'reset = function()' );
        self.codeObservableArray([]);
      }
























 

      // self.firstItemShown = ko.observable(0);
      // self.lastItemShown = ko.observable(0);

      // self.pagingText = ko.pureComputed(function() {
      //   var itemCount = self.chemicals.length;
      //   var firstItem = self.firstItemShown();
      //   var lastItem = self.lastItemShown();
      //   return "Showing " + firstItem + 
      //          " - " + lastItem + 
      //          " of " + itemCount;
      // });

      // self.handleBindingsApplied = function()
      // {
      //   var filmStrip = document.getElementById('filmStrip');
      //   var busyContext = oj.Context.getContext(filmStrip).getBusyContext();
      //   busyContext.whenReady().then(function ()
      //   {
      //     var pagingModel = filmStrip.getPagingModel();
      //     pagingModel.on("page", self.handlePage);
      //     self.handlePage();
      //   });
      // };

      // self.handlePage = function()
      // {
      //   var filmStrip = document.getElementById('filmStrip');
      //   var pagingModel = filmStrip.getPagingModel();
      //   self.firstItemShown(pagingModel.getStartItemIndex() + 1);
      //   self.lastItemShown(pagingModel.getEndItemIndex() + 1);
      // };

      // getItemInitialDisplay = function(index)
      // {
      //   return index < 3 ? '' : 'none';
      // };

      // getMasterItemInitialDisplay = function(index)
      // {
      //   return index < 3 ? '' : 'none';
      // };

      // getMasterItemLabelId = function(index)
      // {
      //   return 'masterLabel' + index;
      // };

      // isMasterItemSelected = function(index)
      // {
      //   return self.currDetailPage().index == index;
      // };

      // getMasterItemLabelledBy = function(index)
      // {
      //   var labelledBy = getMasterItemLabelId(index);
      //   if (isMasterItemSelected(index))
      //     labelledBy += " masterItemSelectedLabel";
      //   return labelledBy;
      // };




      self.connected = function () {
        var number = getUrlVars()["x"];
        
        self.e_id( number );
        console.log('Connected ID:' + self.e_id() );

        function getUrlVars() {
          var vars = {};
          var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
          });
          return vars;
        }
          var para = {v_eid:number}
          console.log('Connected para:' + JSON.stringify(para));
          $.ajax({
            type: 'GET',
            dataType: 'json',
            async: false,
            contentType: 'application/json',
            url: 'http://ords.cynergy1.com/ords/hitech/main/ename?v_eid=' + number,
            //data: JSON.stringify(para),
            success: function (data, textStatus, jqXHR) {
                self.e_name( data.v_ename );
                //console.log('Connected ID:' + self.ename());
            },
            error: function (jqXHR, textStatus, errorThrown ) {
              alert('ERROR: Eomployee Name ' + textStatus + ' ' + jqXHR + ' ' + errorThrown );
            }
          })

          console.log('service/previous?v_eid='+self.e_id()+ '&_=' + new Date().getTime() );
          self.preArray(or.jGETArray('service/previous?v_eid='+self.e_id()+ '&_=' + new Date().getTime() ));
      };


      self.disconnected = function () {
        // Implement if needed
      };


      self.transitionCompleted = function () {
        // Implement if needed
      };
    }
    //$( function() {ko.applyBindings(new ServiceViewModel(), document.getElementById('listviewContainer'))});
    return new ServiceViewModel();
  }
);
