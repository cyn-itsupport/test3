define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojarraydataprovider', 'ojs/ojknockout', 'ojs/ojlistview', 'ojs/ojbutton'],
 function(oj, ko, $, ArrayDataProvider) {
  
    function AboutViewModel() {
      var self = this;
      var data = [{id: 0, name: 'Potential cat names', date: 'Apr 30', content: 'Mew, Furball, Puss'},
                    {id: 1, name: 'Todo list for work', date: 'Apr 29', content: 'Add one more'},
                    {id: 2, name: 'Chicken recipes', date: 'Apr 15', content: 'Fried, Shake & Bake, Sautee'},
                    {id: 3, name: 'Running routes', date: 'Apr 3', content: 'Bedroom to kitchen and back'},
                    {id: 4, name: 'Groceries', date: 'Apr 1', content: 'Milk, bread, meat, veggie, can, etc.'},
                    {id: 5, name: 'Party guest list', date: 'Mar 29', content: ''},
                    {id: 6, name: 'Weekend projects', date: 'Mar 2', content: 'TBD'}
                   ];
        this.dataProvider = new ArrayDataProvider(data, 
                                                     {keys:data.map(function(value) {
                                                         return value.id;
                                                     })}); 
        this.content = ko.observable("");

        var self = this;
        this.gotoList = function(event, ui) {
            document.getElementById("listview").currentItem = null;
            self.slide();
        };

        this.gotoContent = function(event) {
            if (event.detail.value != null && event.detail.value.length > 0)
            {   
                var row = data[event.detail.value];
                self.content(row.content);                    
                self.slide();
            }
        };

        this.slide = function() {
            $("#page1").toggleClass("demo-page1-hide");
            $("#page2").toggleClass("demo-page2-hide");
        }







      self.connected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new AboutViewModel();
  }
);
