define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojbutton'],
function(oj, ko, $)
{     
    var contentviewModel = function(moduleParams)
    {
        this.content = moduleParams.content;

        this.gotoList = function(event) {
            moduleParams.currentModule(moduleParams.currentList);            
        };
    }

    return new contentviewModel();
});	