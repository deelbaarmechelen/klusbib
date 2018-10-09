
ToolAdminController.$inject = ['ToolService', '$scope'];
// export default function ToolAdminController($scope, crudService) {
// export default function ToolAdminController($http, __env, UserService, ReservationService, $location, Flash) {
import ToolService from "../../services/tool.service";

export default function ToolAdminController(ToolService) {
    var self = this;
    self.ToolFormContainer = false;
    self.itemShowCount = ['5','10','20', '30'];
    self.typeList = [1,2,3,4,5,6,7,8,9,10];
    self.date = new Date();

    GetAllTools();

    //To Get all tools list
    function GetAllTools () {

        var getToolData = ToolService.GetAll(1, 20);
        getToolData.then(function (tool) {
            self.tools = tool.message;

            console.log(self.tools);
            //to select first item from ng-option list
            self.actItem = self.itemShowCount[0];
            console.log(self.actItem);
        }, function() {
            alert('Error in getting tools list');
        });
    }

    self.editTool = function (tool) {
        console.log(tool);
        var getToolData = ToolService.GetById(tool.tool_id);
        getToolData.then( function(_tool) {
            self.tool = _tool;
            self.ToolId = tool.tool_id
            self.ToolName = tool.name;
            self.ToolDescription = tool.description;
            self.ToolCode = tool.code;
            var isActive = (tool.active == 1) ? true : false;
            self.ToolActiveChecked = isActive ;

            self.Action = "Update";
            self.ToolFormContainer = true;
        }, function () {
            alert('Error in getting Tool record');
        });
    }

    // Hide Add Tool Form
    self.addTool = function () {
        console.log('Add tool');
        ClearFields();
        self.Action = "Add";
        self.ToolFormContainer = true;
    }

    function ClearFields() {
        self.ToolId = "";
        self.ToolName = "";
        self.ToolDescription = "";
        self.ToolCode = "";
        self.ToolActive = "";
    }

    // Hide Add / Update Tool Form
    self.closeFrmBtn = function () {
        self.ToolFormContainer = false;
    }

    self.Cancel = function () {
        self.ToolFormContainer = false;
    }

    //Add Update Action
    self.AddUpdateTool = function () {
        var tool = {
            name	: self.ToolName,
            description	: self.ToolDescription,
            code		: self.ToolCode,
            active		: ( (self.ToolActive) ? "1" : "0" )
        };

        var getToolAction = self.Action;

        if(getToolAction == "Update"){

            tool.tool_id = self.ToolId;
            console.log('update tool ' + JSON.stringify(tool));
            var getToolData = ToolService.Update(tool);

            getToolData.then (function (response) {
                GetAllTools();
                if (response.success == false) {
                    var msg = response.message;
                    alert(msg);
                }
            }, function () {
                alert('Error in updating Tool record');
            });

        }else{
            //Add Use Code Come Here
            console.log('add tool');
            var addToolData = ToolService.Create(tool);
            addToolData.then (function (response) {
                    GetAllTools();
                    if (response.success == false) {
                        var msg = response.message;
                        alert(msg);
                    }
                }, function () {
                    alert('Error in adding Tool record');
                }
            );
        }
        self.ToolFormContainer = false;

    } // end of AddUpdateTool.

    self.deleteTool = function (tool) {
        //console.log(tool.tool_id);
        var ans = confirm('Are you sure to delete it?');
        if(ans) {
            var delToolData = ToolService.Delete(tool.tool_id);
            delToolData.then(function(response) {
                    GetAllTools();
                    if (response.success == false) {
                        alert(response.message);
                    }
                }, function () {
                    alert('Error in deleting Tool record');
                }
            );
         }
    }

    self.sort = function(keyname){
        self.sortKey = keyname;   //set the sortKey to the param passed
        self.reverse = !self.reverse; //if true make it false and vice versa
    }

    self.activeChange = function() {
        self.search.active = ( (self.uActive) ? "1" : "0" );
    };

    self.reset = function(){
        self.search = '';
    };


    // upload later on form submit or something similar
    self.submit = function() {
        // if ($scope.form.file.$valid && $scope.file) {
        //     $scope.upload($scope.file);
        // }
    };

    // upload on file select or drop
    self.upload = function (file) {
        alert("uploading file" +  file);
        // Upload.upload({
        //     url: 'upload/url',
        //     data: {file: file, 'username': $scope.username}
        // }).then(function (resp) {
        //     console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        // }, function (resp) {
        //     console.log('Error status: ' + resp.status);
        // }, function (evt) {
        //     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        //     console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        // });
    };
    // for multiple files:
    self.uploadFiles = function($files) {
        alert("uploading files");
        // if (files && files.length) {
        //     for (var i = 0; i < files.length; i++) {
        //         Upload.upload({..., data: {file: files[i]}, ...})...;
        //     }
        //     // or send them all together for HTML5 browsers:
        //     Upload.upload({..., data: {file: files}, ...})...;
        // }
    };

};