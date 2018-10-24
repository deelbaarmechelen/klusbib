
ToolAdminController.$inject = ['ToolService', '$scope', 'Upload', '__env'];
// export default function ToolAdminController($scope, crudService) {
// export default function ToolAdminController($http, __env, UserService, ReservationService, $location, Flash) {
import ToolService from "../../services/tool.service";

export default function ToolAdminController(ToolService, $scope, Upload, __env) {
    var self = this;
    self.ToolFormContainer = false;
    self.itemShowCount = ['5','10','20','50'];
    //self.typeList = ['All',1,2,3,4,5,6,7,8,9,10];
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
        ClearFields();
        var getToolData = ToolService.GetById(tool.tool_id);
        getToolData.then( function(_tool) {
            self.tool = _tool;
            self.ToolId = tool.tool_id
            self.ToolName = tool.name;
            self.ToolDescription = tool.description;
            self.ToolCode = tool.code;
            self.ToolImgUrl = tool.img;
            self.displayedTool = tool;

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
        self.ToolImgUrl = "";
        self.files = {};
        self.displayedTool = {};
    }

    // Hide Add / Update Tool Form
    self.closeFrmBtn = function () {
        self.ToolFormContainer = false;
    }

    self.Cancel = function () {
        self.ToolFormContainer = false;
    }

    //Add Update Action
    self.AddUpdateTool = function (files) {

        var tool = {
            name	: self.ToolName,
            description	: self.ToolDescription,
            code		: self.ToolCode,
            file : files[0]
        };

        var getToolAction = self.Action;

        if(getToolAction == "Update"){

            tool.tool_id = self.ToolId;

            // upload image file
            if (!angular.equals(self.files , {})) {
                var uploadToolImage = ToolService.UploadImage(tool, files);
                uploadToolImage.then(function (response) {
                        // GetAllTools();
                        if (response.success == false) {
                            var msg = response.message;
                            alert(msg);
                        }
                    }, function () {
                        alert('Error in uploading Tool image');
                    }
                );

            }
            console.log('update tool ' + JSON.stringify(tool));
            var getToolData = ToolService.Update(tool);

            getToolData.then (function (response) {
                GetAllTools();
                if (response.success == false) {
                    var msg = response.message;
                    alert(msg);
                } else {
                    self.files = null;
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

    self.hasToolImage = function(imageUrl) {
        if (typeof imageUrl == 'undefined' || imageUrl == null || imageUrl == '') {
            return false;
        }
        return true;
    }
    self.resizeImage = function(imageUrl, size) {
        if (! self.hasToolImage(imageUrl)) {
            return "//:0"; // FIXME: replace by default image
        }
        let baseUrl = imageUrl.substr(0, imageUrl.lastIndexOf('.'));
        let ext = imageUrl.substr(imageUrl.lastIndexOf('.') + 1);
        let newUrl = baseUrl + '-' + size + '.' + ext;
        return newUrl;
    }

    self.sort = function(keyname){
        self.sortKey = keyname;   //set the sortKey to the param passed
        self.reverse = !self.reverse; //if true make it false and vice versa
    }

    self.reset = function(){
        self.search = null;
        self.sortKey = null;
        self.reverse = false;
    };

    self.uploadFiles = function(files) {
        console.log('uploading files ' + JSON.stringify(files))
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                Upload.upload(
                    { url: __env.apiUrl + '/upload', method: 'POST',
                    data: {newfile: files[i]}}
                    );
            }
        }
    };

};