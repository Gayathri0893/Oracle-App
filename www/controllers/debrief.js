app.controller("debriefController", function ($scope,$http, $state, $rootScope, $window, $timeout, $filter, cloudService, $mdDialog, valueService, localService, Upload) {

    $scope.currentTab = "time";

    $rootScope.Islogin = true;

    $scope.userType = valueService.getUserType().clarityType;

    $rootScope.headerName = "Debrief";

    $scope.stages = [
        {title: "Time", templateUrl: "app/views/Time.html"},
        {title: "Expenses", templateUrl: "app/views/Expenses.html"},
        {title: "Material", templateUrl: "app/views/Material.html"},
        {title: "Notes", templateUrl: "app/views/Notes.html"},
        {title: "Attachments", templateUrl: "app/views/Attachments.html"},
        {title: "Engineer Signature", templateUrl: "app/views/EngineerSignature.html"},
        {title: "Summary", templateUrl: "app/views/Summary.html"},
        {title: "Customer Signature", templateUrl: "app/views/CustomerSignature.html"}
    ];

    $scope.datePicker = {startDate: null, endDate: null};

    $scope.summary = {};
    $scope.taskId = "";
    $scope.taskObject = {};
    $scope.installBaseObject = {};

    $scope.timeArray = [];
    $scope.expenseArray = [];
    $scope.materialArray = [];
    $scope.notesArray = [];
    $scope.attachmentArray = [];
    $scope.engineerObject = {};

    $scope.overTimeArray = [];
    $scope.shiftCodeArray = [];

    $scope.initializeDebrief = function () {

        if ($rootScope.local) {

            $scope.taskObject = valueService.getTask();
            $scope.taskId = $scope.taskObject.Task_Number;
            $scope.installBaseObject = valueService.getInstallBase();

            $scope.timeArray = valueService.getTime();
            $scope.expenseArray = valueService.getExpense();
            $scope.materialArray = valueService.getMaterial();
            $scope.noteArray = valueService.getNote();
            $scope.attachmentArray = valueService.getAttachment();
            $scope.engineerObject = valueService.getEngineer();

            $scope.overTimeArray = valueService.getOverTime();
            $scope.shiftCodeArray = valueService.getShiftCode();

            $scope.setDropDownValues();

            $scope.setDefaultValues();

        } else {

            $scope.taskObject = valueService.getTask();
            $scope.taskId = $scope.taskObject.Task_Number;

            $scope.form = {
                resourceId: "5",
                header: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic QTQ3MjE0NF9FTUVSU09OTU9CSUxFQ0xPVURfTU9CSUxFX0FOT05ZTU9VU19BUFBJRDpZLm81amxkaHVtYzF2ZQ==',
                    'oracle-mobile-backend-id': 'cc9a9b83-02ff-4be1-8b70-bccb3ac6c592'
                },
                headerP: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic QTQ3MjE0NF9FTUVSU09OTU9CSUxFQ0xPVURfTU9CSUxFX0FOT05ZTU9VU19BUFBJRDpZLm81amxkaHVtYzF2ZQ==',
                    'oracle-mobile-backend-id': '4b2f8c2d-f6d1-4957-8add-b0d471cdaea4'
                }
            };

            /*cloudService.getInstallBaseListCloud($scope.form, function (response) {

                $scope.installBaseObject = response.InstallBase[0];

            });*/

            $http.get("app/json/installBaseCloud.json").then(function(response) {
                     $scope.installBaseObject = response.data.InstallBase[0];
            });

            /*cloudService.getShiftCodeListCloud($scope.form, function (response) {

                $scope.shiftCodeArray = response.ShiftCode;

                $scope.timeDefault.shiftCode.values= $scope.shiftCodeArray

            });*/

            


            /*cloudService.getOverTimeListCloud($scope.form, function (response1) {

                $scope.overTimeArray = response1.OverTImeShiftCode;

                $scope.timeDefault.timeCode.values= $scope.overTimeArray

            });*/

            $http.get("app/json/shiftCodeRes.json").then(function(response) {
                $scope.shiftCodeArray = response.data.ShiftCode;

                $scope.timeDefault.shiftCode.values= $scope.shiftCodeArray

            });

            
            $http.get("app/json/overTimeShiftCode.json").then(function(response1) {
                $scope.overTimeArray = response1.data.OverTImeShiftCode;
                $scope.timeDefault.timeCode.values= $scope.overTimeArray
            });

            $scope.setDropDownValues();

            $scope.setDefaultValues();
        }
    }

    $scope.setDropDownValues = function () {

        $scope.timeDefault = {
            fieldJobName: {
                title: "Field Job Name",
                values: [{"id": 1, "value": "Clarity Code User 001"},
                    {"id": 2, "value": "Clarity Code User 002"},
                    {"id": 3, "value": "Clarity Code User 003"},
                    {"id": 4, "value": "Clarity Code User 004"}]
            },
            chargeType: {
                title: "Charge Type",
                values: [{"id": 1, "value": "In House"},
                    {"id": 2, "value": "Off Shore"},
                    {"id": 3, "value": "On Site"},
                    {"id": 4, "value": "Remote"}]
            },
            workType: {
                title: "Work Type",
                values: [{"id": 1, "value": "Deputation"},
                    {"id": 2, "value": "Travel"},
                    {"id": 3, "value": "Normal"},
                    {"id": 4, "value": "Night Shift"}]
            },
            chargeMethod: {
                title: "Charge Method",
                values: [{"id": 1, "value": "Billable"},
                    {"id": 2, "value": "Warranty"},
                    {"id": 3, "value": "Goodwill"},
                    {"id": 4, "value": "Concession"}],
                valuesDeputation: [{"id": 1, "value": "Billable"},
                    {"id": 2, "value": "Warranty"},
                    {"id": 3, "value": "Goodwill"},
                    {"id": 4, "value": "Concession"}],
                valuesTravel: [{"id": 1, "value": "Billable"},
                    {"id": 2, "value": "Warranty"},
                    {"id": 3, "value": "Goodwill"},
                    {"id": 4, "value": "Concession"}],
                valuesNormal: [{"id": 1, "value": "Billable"},
                    {"id": 2, "value": "Warranty"},
                    {"id": 3, "value": "Goodwill"},
                    {"id": 4, "value": "Concession"}],
                valuesNightShift: [{"id": 1, "value": "Billable"},
                    {"id": 2, "value": "Warranty"},
                    {"id": 3, "value": "Goodwill"},
                    {"id": 4, "value": "Concession"}]
            },
            item: {
                title: "Item",
                values: [{"id": 1, "value": " Standard"},
                    {"id": 2, "value": " Overtime"},
                    {"id": 3, "value": " DoubleTime"}],
                valuesDeputation: [{"id": 1, "value": "Deputation- Standard"},
                    {"id": 2, "value": "Deputation- Overtime"},
                    {"id": 3, "value": "Deputation- DoubleTime"}],
                valuesTravel: [{"id": 1, "value": "Travel- Standard"},
                    {"id": 2, "value": "Travel- Overtime"},
                    {"id": 3, "value": "Travel- DoubleTime"}],
                valuesNormal: [{"id": 1, "value": "Normal- Standard"},
                    {"id": 2, "value": "Normal- Overtime"},
                    {"id": 3, "value": "Normal- DoubleTime"}],
                valuesNightShift: [{"id": 1, "value": "Night Shift- Standard"},
                    {"id": 2, "value": "Night Shift- Overtime"},
                    {"id": 3, "value": "Night Shift- DoubleTime"}]
            },
            description: {
                title: "Description"
            },
            timeCode: {
                title: "Time Code",
                values: $scope.overTimeArray
            },
            timeCodeT: {
                title: "Time Code",
                value: ["OT1", "OT2", "OT3", "OS1", "OS2", "Standard"]
            },
            shiftCode: {
                title: "Shift Code",
                values: $scope.shiftCodeArray
            },
            Date: {
                title: "Date"
            },
            duration: {
                title: "Duration"
            },
            comments: {
                title: "Comments"
            }
        };

        $scope.expenseDefault = {
            date: {
                title: "Date"
            },
            expenseType: {
                title: "Expense Type",
                values: [{"id": 1, "value": "Airfare"},
                    {"id": 2, "value": "Per Diem"},
                    {"id": 3, "value": "Meals- Breakfast"},
                    {"id": 4, "value": "Meals- Lunch"},
                    {"id": 5, "value": "Meals- Dinner"},
                    {"id": 6, "value": "Parking"},
                    {"id": 7, "value": "Lodging"},
                    {"id": 8, "value": "Rental Car"},
                    {"id": 9, "value": "Mileage"},
                    {"id": 10, "value": "Tolls"}]
            },
            amount: {
                title: "Amount"
            },
            currency: {
                title: "Currency",
                values: ["USD", "EUR", "CHY", "GBP"]
            },
            chargeMethod: {
                title: "Charge Method",
                values: [{"id": 1, "value": "Billable"},
                    {"id": 2, "value": "Warranty"},
                    {"id": 3, "value": "Goodwill"},
                    {"id": 4, "value": "Concession"}]
            },
            billable: {
                title: "Billable"
            },
            justification: {
                title: "Justification"
            }
        };

        $scope.materialDefault = {
            chargeType: {
                title: "CHARGE TYPE"
            },
            description: {
                title: "DESCRIPTION"
            },
            serialActivity: {
                title: "SERVICE ACTIVITY"
            },
            serialIn: {
                title: "SERIAL IN"
            },
            serialOut: {
                title: "SERIAL OUT"
            },
            serialNo: {
                title: "SERIAL NUMBER"
            },
            productQuantity: {
                title: "PRODUCT QUANTITY"
            },
            comments: {
                title: "COMMENTS"
            }
        };

        $scope.noteDefault = {
            noteType: {
                title: "Note Type",
                values: [{"id": 1, "value": "Action Taken"},
                    {"id": 2, "value": "General Information"}]
            },
            noteDate: {
                title: "Note Date"
            },
            noteCreator: {
                title: "Created By"
            },
            notes: {
                title: "Notes"
            }
        };
    };

    $scope.setDefaultValues = function () {

        $scope.timeDefaultObject = {
            timeDefault: $scope.timeDefault,
            Time_Id: $scope.taskId + ($scope.timeArray.length + 1),
            Field_Job_Name: "",
            Charge_Type: "",
            Charge_Method: $scope.taskObject.Labor_Method,
            Work_Type: "",
            Item: "",
            Description: "",
            Time_Code: "",
            Shift_Code: "",
            Date: new Date(),
            Duration: "8:00",
            Comments: "",
            Task_Number: $scope.taskId
        };

        $scope.expenseDefaultObject = {
            expenseDefault: $scope.expenseDefault,
            Expense_Id: $scope.taskId + ($scope.expenseArray.length + 1),
            Date: new Date(),
            Expense_Type: "",
            Amount: "",
            Currency: "",
            Charge_Method: $scope.taskObject.Expense_Method,
            Justification: "",
            Task_Number: $scope.taskId
        };

        $scope.noteDefaultObject = {
            noteDefault: $scope.noteDefault,
            Notes_Id: $scope.taskId + ($scope.notesArray.length + 1),
            Note_Type: "",
            Date: new Date(),
            Created_By: "",
            Notes: "",
            Task_Number: $scope.taskId
        };

        $scope.attachmentDefaultObject = {
            Attachment_Id: $scope.taskId + ($scope.attachmentArray.length + 1),
            File_Name: "",
            File_Path: "",
            Task_Number: $scope.taskId
        };

        $scope.engineerObject = {
            Engineer_Id: $scope.taskId,
            Follow_Up: "",
            Spare_Quote: "",
            Sales_Visit: "",
            Sales_Head: "",
            Sign_File_Path: "",
            File_Name: "",
            Task_Number: $scope.taskId
        };
    };

    $scope.addObject = function (stage) {

        switch (stage) {

            case "Time":

                $scope.timeArray.push($scope.timeDefaultObject);

                break;

            case "Expenses":

                $scope.expenseArray.push($scope.expenseDefaultObject);

                break;

            case "Notes":

                $scope.notesArray.push($scope.noteDefaultObject);

                break;

            default:
                break;
        }
    };

    $rootScope.addMaterialItem = function () {

        $scope.materialDefaultObject = {
            materialDefault: $scope.materialDefault,
            Material_Id: $scope.taskId + ($scope.materialArray.length + 1),
            Charge_Type: valueService.getWarrantyType().value,
            Description: $scope.description,
            Product_Quantity: 1,
            Serial_Type: [{"in": "", "out": "", "number": ""}],
            Task_Number: $scope.taskId
        };

        $scope.dropDown = false;

        $scope.materialArray.push($scope.materialDefaultObject);

        $mdDialog.hide();
    };

    $scope.addSerialItem = function (index) {

        $scope.materialArray[index].Product_Quantity++;

        $scope.serialType = {"in": "", "out": "", "number": ""};

        $scope.materialArray[index]["Serial_Type"].push($scope.serialType);
    };

    $scope.deleteSerialItem = function (index) {

        $scope.materialArray[index].Product_Quantity--;

        $scope.materialArray[index]["Serial_Type"].splice(index, 1);
    };

    $scope.setMaterialSearchText = function (text) {
        $scope.description = text;
    };

    $scope.showDropDown = function (event, description) {

        if (description) {

            $mdDialog.show({

                controller: DialogController,
                templateUrl: "app/views/Dialog.html",
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true

            }).then(function (selected) {

                $scope.status = "You said the information was '" + selected + "'.";

            }, function () {

                $scope.status = "You cancelled the dialog.";
            });
        }
    };

    function DialogController($scope, $mdDialog) {

        $scope.selectedWarranty = null;

        $scope.warrantyList = [{"id": 1, "value": "Billable"},
            {"id": 2, "value": "Goodwill"},
            {"id": 3, "value": "Warranty"},
            {"id": 4, "value": "Concession"}];

        $scope.selectedWarrantyType = function (warrantyType) {

            $scope.selectedWarranty = warrantyType;

            valueService.setWarrantyType($scope.selectedWarranty);
        }
    }

    $scope.hideDropDown = function () {
        $scope.dropDown = false;
    };

    $scope.copyObject = function (item, stage) {

        var itemToBeCopied = angular.copy(item);

        switch (stage) {

            case "Time":

                itemToBeCopied.comments = "";

                $scope.timeArray.push(itemToBeCopied);

                break;

            case "Expenses":

                item.justification = "";

                $scope.expenseArray.push(item);

                break;

            case "Notes":

                $scope.notesArray.push(item);

                break;

            default:
                break;
        }
    };

    $scope.deleteObject = function (index, item, stage) {

        switch (stage) {

            case "Time":

                for (var i = 0; i < $scope.timeArray.length; i++) {

                    if (index == i) {

                        $scope.timeArray.splice(index, 1);
                    }
                }

                break;

            case "Expenses":

                for (var i = 0; i < $scope.expenseArray.length; i++) {

                    if (index == i) {

                        $scope.expenseArray.splice(index, 1);
                    }
                }

                break;

            case "Material":

                for (var i = 0; i < $scope.materialArray.length; i++) {

                    if (index == i) {

                        $scope.materialArray.splice(index, 1);
                    }
                }

                break;

            case "Notes":

                for (var i = 0; i < $scope.notesArray.length; i++) {

                    if (index == i) {

                        $scope.notesArray.splice(index, 1);
                    }
                }

                break;

            default:
                break;
        }
    };

    $scope.initializeDebrief();

    $scope.setWorkType = function (workType, timeObject) {

        if (workType == "Deputation") {

            timeObject.timeDefault.item.values = timeObject.timeDefault.item.valuesDeputation;
            timeObject.timeDefault.chargeMethod.values = timeObject.timeDefault.chargeMethod.valuesDeputation;

        } else if (workType == "Travel") {

            timeObject.timeDefault.item.values = timeObject.timeDefault.item.valuesTravel;
            timeObject.timeDefault.chargeMethod.values = timeObject.timeDefault.chargeMethod.valuesTravel;

        } else if (workType == "Normal") {

            timeObject.timeDefault.item.values = timeObject.timeDefault.item.valuesNormal;
            timeObject.timeDefault.chargeMethod.values = timeObject.timeDefault.chargeMethod.valuesNormal;

        } else if (workType == "Night Shift") {

            timeObject.timeDefault.item.values = timeObject.timeDefault.item.valuesNightShift;
            timeObject.timeDefault.chargeMethod.values = timeObject.timeDefault.chargeMethod.valuesNightShift;
        }
    };

    $scope.tabChange = function (stage) {

        console.log("STAGE =====> " + JSON.stringify(stage));

        if ($scope.currentTab == "time") {

            if ($scope.timeArray.length == 0) {

                valueService.setTime($scope.timeArray);
            }

        } else if ($scope.currentTab == "expenses") {

            if ($scope.expenseArray.length == 0) {

                valueService.setExpense($scope.expenseArray);
            }

        } else if ($scope.currentTab == "material") {

            if ($scope.materialArray.length == 0) {

                valueService.setMaterial($scope.materialArray);
            }

        } else if ($scope.currentTab == "notes") {

            if ($scope.notesArray.length == 0) {

                valueService.setNote($scope.notesArray);
            }

        } else if ($scope.currentTab == "attachments") {

            if ($scope.attachmentArray.length == 0) {

                valueService.setAttachment($scope.attachmentArray);
            }

        } else if ($scope.currentTab == "engineer signature") {

            if ($scope.engineerObject != null) {

                valueService.setEngineer($scope.engineerObject);
            }
        }

        if (stage.title.toLowerCase() == "time") {

            if ($scope.timeArray.length == 0) {

                $scope.addObject(stage.title);
            }

            $scope.currentTab = "time";
        }

        if (stage.title.toLowerCase() == "expenses") {

            if ($scope.expenseArray.length == 0) {

                $scope.addObject(stage.title);
            }

            $scope.currentTab = "expenses";
        }

        if (stage.title.toLowerCase() == "material") {

            $scope.currentTab = "material";
        }

        if (stage.title.toLowerCase() == "notes") {

            if ($scope.notesArray.length == 0) {

                $scope.addObject(stage.title);
            }

            $scope.currentTab = "notes";
        }

        if (stage.title.toLowerCase() == "attachments") {

            var attachments = localService.getAttachmentList($scope.taskId);

            if (attachments == undefined || attachments == "" || attachments.length == 0) {

            }

            $scope.currentTab = "attachments";
        }

        if (stage.title.toLowerCase() == "engineer signature") {

            $scope.currentTab = "engineer signature";
        }

        if (stage.title == "Summary") {

            $scope.summary.timeArray = [];
            $scope.summary.expenseArray = [];
            $scope.summary.materialArray = [];
            $scope.summary.notesArray = [];
            $scope.summary.taskObject = {};

            if ($scope.expenseArray != undefined) {

                angular.forEach($scope.expenseArray, function (key, value) {

                    var expenseObject = {
                        "Date": $filter("date")(key.Date, "dd-MM-yyyy "),
                        "Expense_Type": key.Expense_Type,
                        "Amount": key.Amount,
                        "Currency": key.Currency,
                        "Charge_Method": key.Charge_Method,
                        "IsBillable": "Yes",
                        "Justification": key.Justification
                    }

                    $scope.summary.expenseArray.push(expenseObject);
                });
            }

            if ($scope.materialArray != undefined) {

                $scope.serialNumber = function (serialArray) {

                    var serialNumberArray = [];

                    angular.forEach(serialArray, function (key, value) {

                        serialNumberArray.push(key.number);
                    });

                    return serialNumberArray;
                }

                $scope.serialIn = function (serialArray) {

                    var serialNumberArray = [];

                    angular.forEach(serialArray, function (key, value) {

                        serialNumberArray.push(key.number);
                    });

                    return serialNumberArray;
                }

                $scope.serialOut = function (serialArray) {

                    var serialNumberArray = [];

                    angular.forEach(serialArray, function (key, value) {

                        serialNumberArray.push(key.number);
                    });

                    return serialNumberArray;
                }

                angular.forEach($scope.materialArray, function (key, value) {

                    var materialObject = {
                        "Charge_Type": key.Charge_Type,
                        "Product_Quantity": key.Product_Quantity,
                        "serialNumber": $scope.serialNumber(key.serialType),
                        "serialIn": $scope.serialIn(key.serialType),
                        "serialOut": $scope.serialOut(key.serialType),
                        "Description": key.Description
                    }

                    $scope.summary.materialArray.push(materialObject);
                });
            }

            if ($scope.notesArray != undefined) {

                angular.forEach($scope.notesArray, function (key, value) {

                    var notesObject = {
                        "Note_Type": key.Note_Type,
                        "Date": key.Date,
                        "Notes": key.Notes
                    }

                    $scope.summary.notesArray.push(notesObject);
                });
            }

            if ($scope.taskObject != undefined) {

                $scope.summary.taskObject.Customer_Name = $scope.taskObject.Customer_Name;
                $scope.summary.taskObject.Service_Request = $scope.taskObject.Service_Request;
                $scope.summary.taskObject.Task_Number = $scope.taskObject.Task_Number;
                $scope.summary.taskObject.Job_Description = $scope.taskObject.Job_Description;

                $scope.summary.taskObject.Product_Line = $scope.installBaseObject.Product_Line;
                $scope.summary.taskObject.Serial_Number = $scope.installBaseObject.Serial_Number;
                $scope.summary.taskObject.TagNumber = $scope.installBaseObject.TagNumber;
                $scope.summary.taskObject.Original_PO_Number = $scope.installBaseObject.Original_PO_Number;
                $scope.summary.taskObject.times = [];
                $scope.summary.taskObject.times.push({
                    "Start_Date": $scope.taskObject.Start_Date,
                    "End_Date": $scope.taskObject.End_Date,
                    "Duration": $scope.taskObject.Duration
                });
            }

            if ($scope.timeArray != undefined) {

                var length = $scope.timeArray.length, i = 0;

                angular.forEach($scope.timeArray, function (key, value) {

                    i++;

                    if (i <= length) {


                        var timeObject = {
                            "Date": $filter("date")(key.Date, "dd-MM-yyyy "),
                            "Charge_Type": key.Charge_Type,
                            "Charge_Method": key.Charge_Method,
                            "Work_Type": key.Work_Type,

                            "Item": key.Item,
                            "Description": key.Description,
                            "Comments": key.Comments,
                            "Duration":key.Duration
                        }
                        var timecodearray=[];
                        angular.forEach($scope.timeArray[0].timeDefault.timeCode.values,function(timecode,value)
                        {
                            var codeobj={};
                            if(key.Time_Code==timecode.Overtimeshiftcode)
                            {
                                //  timeObject[timeCodeKey]=key.Duration;
                                codeobj[timecode.Overtimeshiftcode]=key.Duration;
                            }
                            else
                            {
                                //timeObject[timeCodeKey]="";
                                codeobj[timecode.Overtimeshiftcode]="";
                            }
                            timecodearray.push(codeobj)
                        })
                        timeObject.timecode=timecodearray;
                        // if (key.Time_Code.toLowerCase() == "ot1")
                        // ot1 = key.Duration;
                        // if (key.Time_Code.toLowerCase() == "ot2")
                        // ot2 = key.Duration;
                        // if (key.Time_Code.toLowerCase() == "ot3")
                        // ot3 = key.Duration;
                        // if (key.Time_Code.toLowerCase() == "standard")
                        // standard = key.Duration;
                        // if (key.Time_Code.toLowerCase() == "os1")
                        // os1 = key.Duration;
                        // if (key.Time_Code.toLowerCase() == "os2")
                        // os2 = key.Duration;



                        $scope.summary.timeArray.push(timeObject)
                    }
                });

                $scope.duration = [];

                var durationObject = [];

                var grandTotal = {"standard": 0, "ot1": 0, "ot2": 0, "ot3": 0, "os1": 0, "os2": 0};

                angular.forEach($scope.summary.timeArray, function (key, value) {

                    var ot1 = 0, ot2 = 0, ot3 = 0, os1 = 0, os2 = 0, standard = 0;

                    var workType = key.Work_Type;

                    if (durationObject[workType] == undefined) {
                        durationObject[workType] = {};
                    }

                    if (key.standard != "") {

                        standard = parseFloat(key.standard);

                        if (durationObject[workType].standard == undefined) {

                            durationObject[workType].standard = 0;
                        }

                        durationObject[workType].standard += standard;

                        grandTotal.standard += standard
                    }

                    if (key.ot1 != "") {

                        ot1 = parseFloat(key.ot1);

                        if (durationObject[workType].ot1 == undefined) {

                            durationObject[workType].ot1 = 0;
                        }

                        durationObject[workType].ot1 += ot1;

                        grandTotal.ot1 += ot1
                    }

                    if (key.ot2 != "") {

                        ot2 = parseFloat(key.ot2);

                        if (durationObject[workType].ot2 == undefined) {

                            durationObject[workType].ot2 = 0;
                        }

                        durationObject[workType].ot2 += ot2;

                        grandTotal.ot2 += ot2
                    }

                    if (key.ot3 != "") {

                        ot3 = parseFloat(key.ot3);

                        if (durationObject[workType].ot3 == undefined) {

                            durationObject[workType].ot3 = 0;
                        }

                        durationObject[workType].ot3 += ot3;

                        grandTotal.ot3 += ot3
                    }

                    if (key.os1 != "") {

                        os1 = parseFloat(key.os1);

                        if (durationObject[workType].os1 == undefined) {

                            durationObject[workType].os1 = 0;
                        }

                        durationObject[workType].os1 += os1;

                        grandTotal.os1 += os1
                    }

                    if (key.os2 != "") {

                        os2 = parseFloat(key.os2);

                        if (durationObject[workType].os2 == undefined) {

                            durationObject[workType].os2 = 0;
                        }

                        durationObject[workType].os2 += os2;

                        grandTotal.os2 += os2
                    }

                    $scope.summary.timeArray[value].duration = standard + os1 + os2 + ot1 + ot2 + ot3;

                });

                if (durationObject.length > 0) {

                    angular.forEach(durationObject, function (key, value) {

                        var workType;

                        if (value == 1) {

                            workType = "Deputation";

                        } else if (value == 2) {

                            workType = "Travel";

                        } else if (value == 3) {

                            workType = "Normal";

                        } else if (value == 4) {

                            workType = "Night Shift";
                        }

                        var subTotalObject = {
                            "Date": "Sub Total",
                            "Charge_Type": "",
                            "Charge_Method": "",
                            "Work_Type": workType,
                            "standard": key.standard,
                            "ot1": key.ot1,
                            "ot2": key.ot2,
                            "ot3": key.ot3,
                            "os1": key.os1,
                            "os2": key.os2,
                            "Duration": "",
                            "Item": "",
                            "Description": "",
                            "Comments": ""
                        }

                        $scope.summary.timeArray.push(subTotalObject);

                    });
                }

                var grandTotalObject = {
                    "Date": "Grand Total",
                    "Charge_Type": "",
                    "Charge_Method": "",
                    "Work_Type": "",
                    "standard": grandTotal.standard,
                    "ot1": grandTotal.ot1,
                    "ot2": grandTotal.ot2,
                    "ot3": grandTotal.ot3,
                    "os1": grandTotal.os1,
                    "os2": grandTotal.os2,
                    "Duration": "",
                    "Item": "",
                    "Description": "",
                    "Comments": ""
                }

                $scope.summary.timeArray.push(grandTotalObject);
            }
        }
    }

    $(function () {

        $("#datetimepickerStartDate").datetimepicker();
        $("#datetimepickerEndDate").datetimepicker();
    });

    $(function () {

        setTimeout(function () {

            $("#cmd").click(function () {

                var doc = jsPDF("p", "mm", [700, 750]);

               var doc1 = jsPDF('p', 'mm', [700, 750]);
                var imgData = 'data:image/png;base64,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'
                var logo='data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNEMjI4QjBDMkNDNDExRTdCNjY3QzE4MjZDNjRBN0JBIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNEMjI4QjBCMkNDNDExRTdCNjY3QzE4MjZDNjRBN0JBIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhDNEZDQTg5MkNCRTExRTc4MkMxRUZDN0FCMUMzMEZFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhDNEZDQThBMkNCRTExRTc4MkMxRUZDN0FCMUMzMEZFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEB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'
                doc1.rect(20, 10, 650, 50)
                doc1.addImage(logo, 'JPEG', 75, 15, 100, 40)
                doc1.setFontSize(40)
                doc1.setFontType('bold')
                doc1.text(250, 35, 'Field Service Summary Report')
                doc1.setFontSize(20)
                doc1.setFontType('normal')
                doc1.text(500, 20, 'Wipro Limited')
                doc1.text(500, 25, 'Doddakannelli, Sarjapur Road')
                doc1.text(500, 30, 'Bangalore - 560 035')
                doc1.text(500, 35, 'India')
                doc1.text(500, 45, 'Ph: +91 (80) 28440011')
                doc1.text(500, 50, 'Fax: +91 (80) 28440054')
                doc1.setFontSize(22)
                doc1.setFontType('bold')
                doc1.text(25, 70, 'Customer Call Details')
                doc1.rect(20, 75, 650, 80)
                doc1.setFontSize(22)
                doc1.setFontType('bold')
                doc1.text(25, 85, 'Customer Name')
                  doc1.setFontSize(22)
    doc1.setFontType('normal')
                doc1.text(25, 95, $scope.summary.taskObject.Customer_Name)
// console.log($scope.summary.taskObject.times[0].Start_Date.split(" ")[0]  | date : 'dd/MM/yyyy')
                doc1.setFontSize(22)
    doc1.setFontType('bold')
                doc1.text(175, 85, 'Start Date')
                  doc1.setFontSize(22)
    doc1.setFontType('normal')
                doc1.text(175, 95, $scope.summary.taskObject.times[0].Start_Date.split(" ")[0])
                doc1.setFontSize(22)
    doc1.setFontType('bold')
                doc1.text(325, 85, 'End Date')
                doc1.setFontSize(22)
    doc1.setFontType('normal')
                doc1.text(325, 95, $scope.summary.taskObject.times[0].End_Date.split(" ")[0])
                doc1.setFontSize(22)
    doc1.setFontType('bold')
                doc1.text(475, 85, 'Duration')
                doc1.setFontSize(22)
    doc1.setFontType('normal')
                doc1.text(475, 95, 'Duration value')
                
                doc1.setFontSize(22)
    doc1.setFontType('bold')
                doc1.text(25, 110, 'Service Request')
                doc1.text(25, 120, $scope.summary.taskObject.Service_Request)
                doc1.setFontSize(22)
    doc1.setFontType('bold')
                doc1.text(175, 110, 'Field Job Request')
                doc1.setFontSize(22)
    doc1.setFontType('normal')
                doc1.text(175, 120, $scope.summary.taskObject.Task_Number)
                doc1.setFontSize(22)
    doc1.setFontType('bold')
                doc1.text(325, 110, 'Job Description')
                doc1.setFontSize(22)
    doc1.setFontType('normal')
                doc1.text(325, 120, $scope.summary.taskObject.Job_Description)
                doc1.setFontSize(22)
    doc1.setFontType('bold')
                doc1.text(25, 135, 'Product Line')
                doc1.setFontSize(22)
    doc1.setFontType('normal')
                doc1.text(25, 145, $scope.summary.taskObject.Product_Line)
                doc1.setFontSize(22)
    doc1.setFontType('bold')
                doc1.text(175, 135, 'System ID/Serial #')
                doc1.setFontSize(22)
    doc1.setFontType('normal')
                doc1.text(175, 145, $scope.summary.taskObject.Serial_Number)
                doc1.setFontSize(22)
    doc1.setFontType('bold')
                doc1.text(325, 135, 'Tag #')
                doc1.setFontSize(22)
    doc1.setFontType('normal')
                doc1.text(325, 145, $scope.summary.taskObject.TagNumber)
                doc1.setFontSize(22)
    doc1.setFontType('bold')
                doc1.text(475, 135, 'Original PO#')
                doc1.setFontSize(22)
    doc1.setFontType('normal')
                doc1.text(475, 145, $scope.summary.taskObject.Original_PO_Number)

                var i = 0, xNotesField = 25, yNotesField = 165, rectNotesWidth = 650, rectNotesHeight = 25 * 5,
                    rectNotesX = 20, rectNotesY = 170;
                var xNotesField1, xNotesField2, yNotesField1, yNotesField2, yNotesField1_val, yNotesField2_val;

                // doc1.text(xNotesField, yNotesField, 'Notes')
                // doc1.rect(rectNotesX, rectNotesY, rectNotesWidth, rectNotesHeight)
                // while (i < 5) {
                //     xNotesField1 = xNotesField;
                //     yNotesField1 = yNotesField + 22 * ++i;
                //     yNotesField1_val = yNotesField1 + 10;
                //     xNotesField2 = xNotesField1 + 150;
                //     doc1.text(xNotesField1, yNotesField1, 'Tag #')
                //     doc1.text(xNotesField1, yNotesField1_val, 'Tag # value')
                //     doc1.text(xNotesField2, yNotesField1, 'Original PO#')
                //     doc1.text(xNotesField2, yNotesField1_val, 'Original PO# value')
                // }
                // var xAttachField = 25, yAttachField = rectNotesY + rectNotesHeight + 10, rectAttachWidth = 650,
                //     rectAttachHeight = 60;
                // doc1.text(xNotesField1, yAttachField, 'Attachments')
                // doc1.rect(20, yAttachField + 10, rectAttachWidth, rectAttachHeight)
                //
                // var j = 0, xTimeField = 25, yTimeField = yAttachField + rectAttachHeight + 20, rectTimeWidth = 650,
                //     rectTimeHeight = 22 * 5, yTimeFieldName = yTimeField, yTimeFieldValue = yTimeField;
                // doc1.text(xTimeField, yTimeField, 'Time')
                // doc1.rect(20, yTimeField + 5, rectTimeWidth, rectTimeHeight)
                // while (j < 5) {
                //
                //     yTimeFieldName = yTimeField + 20 * ++j;
                //     yTimeFieldValue = yTimeFieldName + 10;
                //     doc1.text(xTimeField, yTimeFieldName, 'Date')
                //     doc1.text(xTimeField, yTimeFieldValue, 'Date value')
                //     doc1.text(xTimeField + 55, yTimeFieldName, 'Charge Type')
                //     doc1.text(xTimeField + 55, yTimeFieldValue, 'Charge Type value')
                //     doc1.text(xTimeField + 115, yTimeFieldName, 'Charge method')
                //     doc1.text(xTimeField + 115, yTimeFieldValue, 'Charge method value')
                //     doc1.text(xTimeField + 175, yTimeFieldName, 'Work Type')
                //     doc1.text(xTimeField + 175, yTimeFieldValue, 'Work Type value')
                //     doc1.text(xTimeField + 235, yTimeFieldName, 'Standard')
                //     doc1.text(xTimeField + 235, yTimeFieldValue, 'Standard value')
                //     doc1.text(xTimeField + 275, yTimeFieldName, 'OT1')
                //     doc1.text(xTimeField + 275, yTimeFieldValue, 'OT1 value')
                //     doc1.text(xTimeField + 315, yTimeFieldName, 'OT2')
                //     doc1.text(xTimeField + 315, yTimeFieldValue, 'OT2 value')
                //     doc1.text(xTimeField + 355, yTimeFieldName, 'OT3')
                //     doc1.text(xTimeField + 355, yTimeFieldValue, 'OT3 value')
                //     doc1.text(xTimeField + 415, yTimeFieldName, 'Duration')
                //     doc1.text(xTimeField + 415, yTimeFieldValue, 'Duration value')
                //     doc1.text(xTimeField + 475, yTimeFieldName, 'Item')
                //     doc1.text(xTimeField + 475, yTimeFieldValue, 'Item value')
                //     doc1.text(xTimeField + 535, yTimeFieldName, 'Description Comments')
                //     doc1.text(xTimeField + 535, yTimeFieldValue, 'Description Comments value')
                // }
                // var k = 0, xExpenseField = 25, yExpenseField = yTimeField + rectTimeHeight + 20, rectExpenseWidth = 650,
                //     rectExpenseHeight = 22 * 5, yExpenseFieldName, yExpenseFieldValue;
                // doc1.text(xExpenseField, yExpenseField + 5, 'Expenses')
                // doc1.rect(20, yExpenseField + 10, rectExpenseWidth, rectExpenseHeight)
                // while (k < 5) {
                //     yExpenseFieldName = yExpenseField + 20 * ++k;
                //     yExpenseFieldValue = yExpenseFieldName + 10;
                //     doc1.text(xExpenseField, yExpenseFieldName, 'Date')
                //     doc1.text(xExpenseField, yExpenseFieldValue, 'Date value')
                //     doc1.text(xExpenseField + 150, yExpenseFieldName, 'Expense type')
                //     doc1.text(xExpenseField + 150, yExpenseFieldValue, 'Expense type value')
                //     doc1.text(xExpenseField + 300, yExpenseFieldName, 'Charge Method')
                //     doc1.text(xExpenseField + 300, yExpenseFieldValue, 'Charge Method value')
                //     doc1.text(xExpenseField + 450, yExpenseFieldName, 'Justification')
                //     doc1.text(xExpenseField + 450, yExpenseFieldValue, 'Justification value')
                // }
                //
                // var l = 0, xMaterialField = 25, yMaterialField = yExpenseField + rectExpenseHeight + 20,
                //     rectMaterialWidth = 650, rectMaterialHeight = 22 * 2, yMaterialFieldName, yMaterialFieldValue;
                // doc1.text(xMaterialField, yMaterialField + 5, 'Materials')
                // doc1.rect(20, yMaterialField + 10, rectMaterialWidth, rectMaterialHeight)
                // while (l < 2) {
                //     yMaterialFieldName = yMaterialField + 20 * ++l;
                //     yMaterialFieldValue = yMaterialFieldName + 10;
                //     doc1.text(25, yMaterialFieldName, 'Charge type')
                //     doc1.text(25, yMaterialFieldValue, 'Charge type value')
                //     doc1.text(80, yMaterialFieldName, 'Quantity')
                //     doc1.text(80, yMaterialFieldValue, 'Quantity value')
                //     doc1.text(140, yMaterialFieldName, 'Serial#')
                //     doc1.text(140, yMaterialFieldValue, 'Serial# value')
                //     doc1.text(200, yMaterialFieldName, 'Serial In#')
                //     doc1.text(200, yMaterialFieldValue, 'Serial In# value')
                //     doc1.text(260, yMaterialFieldName, 'Serial Out#')
                //     doc1.text(260, yMaterialFieldValue, 'Serial Out# value')
                //     doc1.text(320, yMaterialFieldName, 'Serial Activity')
                //     doc1.text(320, yMaterialFieldValue, 'Serial Activity value')
                //     doc1.text(380, yMaterialFieldName, 'Item Description')
                //     doc1.text(380, yMaterialFieldValue, 'Item Description value')
                //     doc1.text(460, yMaterialFieldName, 'Comments')
                //     doc1.text(460, yMaterialFieldValue, 'Comments value')
                // }
                //
                // var xSignField = 25, ySignField = yMaterialField + rectMaterialHeight + 20, rectSignWidth = 650,
                //     rectSignHeight = 40;
                // doc1.text(xSignField, ySignField + 5, 'Signature')
                // doc1.rect(20, ySignField + 10, rectSignWidth, rectSignHeight)
                // doc1.text(50, ySignField + 20, 'Emerson Process Management')
                // doc1.text(250, ySignField + 20, 'ROLLS ROYCE POWER ENGINEERING PLC')
                // doc1.text(50, ySignField + 35, 'ENGINEER NAME')
                // doc1.text(250, ySignField + 35, 'CUSTOMER NAME')
                // doc1.text(250, ySignField + 45, 'rolls royce engineering plc')
                //
                // doc1.save('Test.pdf');

                    var i = 0, xNotesField = 25, yNotesField = 170, rectNotesWidth = 650,
                        rectNotesHeight = 22 * $scope.summary.notesArray.length,
                        rectNotesX = 20, rectNotesY = 170;
                    var xNotesField1 = xNotesField, xNotesField2 = xNotesField1 + 150, yNotesField1 = yNotesField + 22,
                        yNotesField2, yNotesField1_val, yNotesField2_val;
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(xNotesField1, yNotesField1, 'Note Type')
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(xNotesField2, yNotesField1, 'Note Description')
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(xNotesField, yNotesField, 'Notes')
                    // doc1.rect(20, yNotesField+10, rectNotesWidth, rectNotesHeight)
                    while (i < $scope.summary.notesArray.length) {
                        xNotesField1 = xNotesField;
                        //yNotesField1 = yNotesField + 22;
                        yNotesField1_val = yNotesField1 + 10 * ++i;
                        xNotesField2 = xNotesField1 + 150;
                        if ($scope.summary.notesArray[i - 1].Note_Type)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(xNotesField1, yNotesField1_val, $scope.summary.notesArray[i - 1].Note_Type)
                        if ($scope.summary.notesArray[i - 1].Notes)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(xNotesField2, yNotesField1_val, $scope.summary.notesArray[i - 1].Notes)
                    }
                    rectNotesHeight=yNotesField1_val-yNotesField+10;
                    doc1.rect(20, yNotesField+5, rectNotesWidth, rectNotesHeight)


                    var xAttachField = 25, yAttachField = yNotesField1_val  + 25, rectAttachWidth = 650,
                        rectAttachHeight = 60,xAttachField1=25;
                          var pdfimg='data:image/png;base64,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'
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(xAttachField, yAttachField, 'Attachments')
                    doc1.rect(20, yAttachField + 10, rectAttachWidth, rectAttachHeight)
                    angular.forEach($scope.files,function(file,value){
                        // setTimeout(function () {
                        if(file.filetype!="pdf"){
                            doc1.addImage( file.data, 'JPEG', xAttachField1, yAttachField+15, 50, 40)
                            // }, 1000);
                        }
                        else if(file.filetype=="pdf")
                            doc1.addImage( pdfimg, 'JPEG', xAttachField1, yAttachField+15, 50, 40)
                        doc1.setFontSize(16)
                        doc1.setFontType('normal')
                        if(file.filename.length>=20)
                            doc1.text(xAttachField1, yAttachField+65, file.filename.substr(0,18)+'..')
                        else {
                            doc1.text(xAttachField1, yAttachField+65, file.filename)
                        }
                        xAttachField1+=60;
                    })
                    var j = 0, xTimeField = 25, yTimeField = yAttachField + rectAttachHeight + 20, rectTimeWidth = 650,
                        rectTimeHeight = 22 * $scope.summary.timeArray.length, yTimeFieldName = yTimeField + 20,
                        yTimeFieldValue = yTimeField;
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(xTimeField, yTimeField, 'Time')
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(xTimeField, yTimeFieldName, 'Date')
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(xTimeField + 55, yTimeFieldName, 'Charge Type')
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(xTimeField + 110, yTimeFieldName, 'Charge method')
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(xTimeField + 175, yTimeFieldName, 'Work Type')
                    //  doc1.text(xTimeField + 235, yTimeFieldName, 'Standard')
                    var xTimeField1 = xTimeField + 195;
                    // angular.forEach($scope.timeArray[0].timeDefault.timeCode.values, function (timecodeKey, value) {
                    //     xTimeField1 = xTimeField1 + 40;
                    //     doc1.setFontSize(22)
                    //     doc1.setFontType('bold')
                    //     doc1.text(xTimeField1, yTimeFieldName, timecodeKey.Overtimeshiftcode)
                    //     // doc1.text(xTimeField + 275, yTimeFieldName, 'OT1')
                    //     // doc1.text(xTimeField + 315, yTimeFieldName, 'OT2')
                    //     // doc1.text(xTimeField + 355, yTimeFieldName, 'OT3')
                    // });
                    doc1.text(xTimeField + 415, yTimeFieldName, 'Duration')
                    doc1.text(xTimeField + 475, yTimeFieldName, 'Item')
                    doc1.text(xTimeField + 539, yTimeFieldName, 'Description')
                    doc1.rect(20, yTimeField + 5, rectTimeWidth, rectTimeHeight)
                    while (j < $scope.summary.timeArray.length) {

                        yTimeFieldName = yTimeField + 20 * ++j;
                        yTimeFieldValue = yTimeFieldName + 10;
                        // doc1.text(xTimeField, yTimeFieldName, 'Date')
                        if ($scope.summary.timeArray[j - 1].Date)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(xTimeField, yTimeFieldValue, $scope.summary.timeArray[j - 1].Date)
                        if ($scope.summary.timeArray[j - 1].Charge_Type)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(xTimeField + 55, yTimeFieldValue, $scope.summary.timeArray[j - 1].Charge_Type)
                        if ($scope.summary.timeArray[j - 1].Charge_Method)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(xTimeField + 110, yTimeFieldValue, $scope.summary.timeArray[j - 1].Charge_Method)
                        if ($scope.summary.timeArray[j - 1].Work_Type)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(xTimeField + 175, yTimeFieldValue, $scope.summary.timeArray[j - 1].Work_Type)
                        var a = 2;
                        // angular.forEach($scope.timeArray[0].timeDefault.timeCode.values, function (timecodeKey, value) {
                        //
                        //     angular.forEach($scope.summary.timeArray[j - 1].timecode, function (key, value) {
                        //         console.log($scope.summary.timeArray[j - 1].timecode[value][timecodeKey.Overtimeshiftcode])
                        //         if ($scope.summary.timeArray[j - 1].timecode[value][timecodeKey.Overtimeshiftcode] != undefined) {
                        //             //  doc1.text(xTimeField + 235, yTimeFieldName, timecodeKey.Overtimeshiftcode)
                        //             // xTimeField1=xTimeField1 +40;
                        //             // doc1.text(xTimeField1, yTimeFieldName, timecodeKey.Overtimeshiftcode)
                        //             // xTimeField1=xTimeField1-40*a;
                        //             doc1.setFontSize(22)
                        //             doc1.setFontType('normal')
                        //             doc1.text(xTimeField1 - 40 * a, yTimeFieldValue, $scope.summary.timeArray[j - 1].timecode[value][timecodeKey.Overtimeshiftcode].toString())
                        //             a--;
                        //         }
                        //         else {
                        //             //  console.log("testsajhhhhhhhhhhhhhhhd")
                        //
                        //         }
                        //
                        //     })
                        //
                        // })
                        // doc1.text(xTimeField + 235, yTimeFieldName, 'Standard')
                        // doc1.text(xTimeField + 235, yTimeFieldValue, $scope.summary.timeArray[j-1].Shift_Code)
                        // doc1.text(xTimeField + 275, yTimeFieldName, 'OT1')
                        // doc1.text(xTimeField + 275, yTimeFieldValue, $scope.summary.timeArray[j-1].Time_Code)
                        // doc1.text(xTimeField + 315, yTimeFieldName, 'OT2')
                        // doc1.text(xTimeField + 315, yTimeFieldValue, $scope.summary.timeArray[j-1].Time_Code)
                        // doc1.text(xTimeField + 355, yTimeFieldName, 'OT3')
                        // doc1.text(xTimeField + 355, yTimeFieldValue, $scope.summary.timeArray[j-1].Time_Code)
                        if ($scope.summary.timeArray[j - 1].Duration)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(xTimeField + 415, yTimeFieldValue, $scope.summary.timeArray[j - 1].Duration.toString())
                        if ($scope.summary.timeArray[j - 1].Item)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(xTimeField + 475, yTimeFieldValue, $scope.summary.timeArray[j - 1].Item)
                        if ($scope.summary.timeArray[j - 1].Comments)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(xTimeField + 539, yTimeFieldValue, $scope.summary.timeArray[j - 1].Comments)
                    }
                    var k = 0, xExpenseField = 25, yExpenseField = yTimeField + rectTimeHeight + 20, rectExpenseWidth = 650,
                        rectExpenseHeight = 22 * $scope.summary.expenseArray.length, yExpenseFieldName = yExpenseField + 20,
                        yExpenseFieldValue;
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(xExpenseField, yExpenseField + 5, 'Expenses')
                    // doc1.rect(20, yExpenseField + 10, rectExpenseWidth, rectExpenseHeight)
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(xExpenseField, yExpenseFieldName, 'Date')
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(xExpenseField + 150, yExpenseFieldName, 'Expense type')
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(xExpenseField + 300, yExpenseFieldName, 'Charge Method')
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(xExpenseField + 450, yExpenseFieldName, 'Justification')
                    // yExpenseFieldValue = yExpenseFieldName + 10;
                    while (k < $scope.summary.expenseArray.length) {
                        // yExpenseFieldName =  ;
                        yExpenseFieldValue = yExpenseFieldName + 10 * ++k;

                        if ($scope.summary.expenseArray[k - 1].Date)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(xExpenseField, yExpenseFieldValue, $scope.summary.expenseArray[k - 1].Date)
                        if ($scope.summary.expenseArray[k - 1].Expense_Type)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(xExpenseField + 150, yExpenseFieldValue, $scope.summary.expenseArray[k - 1].Expense_Type)
                        if ($scope.summary.expenseArray[k - 1].Charge_Method)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(xExpenseField + 300, yExpenseFieldValue, $scope.summary.expenseArray[k - 1].Charge_Method)
                        if ($scope.summary.expenseArray[k - 1].Justification)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(xExpenseField + 450, yExpenseFieldValue, $scope.summary.expenseArray[k - 1].Justification)
                    }
                    rectExpenseHeight=yExpenseFieldValue-yExpenseFieldName+15;
                    doc1.rect(20, yExpenseField + 10, rectExpenseWidth, rectExpenseHeight)

                    var l = 0, xMaterialField = 25, yMaterialField = yExpenseField + rectExpenseHeight + 20,
                        rectMaterialWidth = 650, rectMaterialHeight = 25 * $scope.summary.materialArray.length,
                        yMaterialFieldName = yMaterialField + 20, yMaterialFieldValue;
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(xMaterialField, yMaterialField + 5, 'Materials')
                    // doc1.rect(20, yMaterialField + 10, rectMaterialWidth, rectMaterialHeight)
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(25, yMaterialFieldName, 'Charge type')
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(80, yMaterialFieldName, 'Quantity')
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(140, yMaterialFieldName, 'Serial#')
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(200, yMaterialFieldName, 'Serial In#')
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(260, yMaterialFieldName, 'Serial Out#')
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(380, yMaterialFieldName, 'Description')
                    yMaterialFieldValue = yMaterialFieldName + 10
                    while (l < $scope.summary.materialArray.length) {
                        // yMaterialFieldName =  ;
                        // yMaterialFieldValue = yMaterialFieldValue + 10 *
                        ++l;
                        doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        if ($scope.summary.materialArray[l - 1].Charge_Type)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(25, yMaterialFieldValue, $scope.summary.materialArray[l - 1].Charge_Type)
                        if ($scope.summary.materialArray[l - 1].Product_Quantity)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(80, yMaterialFieldValue, $scope.summary.materialArray[l - 1].Product_Quantity.toString())
                        if ($scope.summary.materialArray[l - 1].serialNumber)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(140, yMaterialFieldValue, $scope.summary.materialArray[l - 1].serialNumber)
                        if ($scope.summary.materialArray[l - 1].serialIn)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(200, yMaterialFieldValue, $scope.summary.materialArray[l - 1].serialIn)
                        if ($scope.summary.materialArray[l - 1].serialOut)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(260, yMaterialFieldValue, $scope.summary.materialArray[l - 1].serialOut)
                        // doc1.text(320, yMaterialFieldName, 'Serial Activity')
                        // doc1.text(320, yMaterialFieldValue, $scope.summary.materialArray[l-1].Charge_Type)
                        if ($scope.summary.materialArray[l - 1].Description)
                            doc1.setFontSize(22)
                        doc1.setFontType('normal')
                        doc1.text(380, yMaterialFieldValue, $scope.summary.materialArray[l - 1].Description)
                        // doc1.text(460, yMaterialFieldName, 'Comments')
                        // doc1.text(460, yMaterialFieldValue, $scope.summary.materialArray[l-1].Charge_Type)
                        yMaterialFieldValue=yMaterialFieldValue + 10 * $scope.summary.materialArray[l-1].Product_Quantity;
                    }
                    rectMaterialHeight= yMaterialFieldValue-yMaterialFieldName+10;
                    doc1.rect(20, yMaterialField + 10, rectMaterialWidth, rectMaterialHeight)

                    var xSignField = 25, ySignField = yMaterialField + rectMaterialHeight + 20, rectSignWidth = 650,
                        rectSignHeight = 80;
                    doc1.setFontSize(22)
                    doc1.setFontType('bold')
                    doc1.text(xSignField, ySignField + 5, 'Signature')
                    doc1.rect(20, ySignField + 10, rectSignWidth, rectSignHeight)
                    doc1.text(50, ySignField + 20, 'ENGINEER NAME')
                    doc1.text(250, ySignField + 20, 'CUSTOMER NAME')
                    doc1.text(50, ySignField + 35, 'Alex')
                    if($scope.summary.engineer.signature)
                        doc1.addImage($scope.summary.engineer.signature, 'JPEG', 50, ySignField + 45, 75, 40)
                    doc1.text(250, ySignField + 35, $scope.summary.taskObject.Customer_Name)
                                doc1.save("Report_" + $scope.summary.taskObject.Task_Number + ".pdf");


                doc.fromHTML($("#export1").html(), 15, 15, {"width": 500}, function (bla) {

                    if ($rootScope.local) {

                        var filePath = cordova.file.dataDirectory;

                        console.log("FILE PATH  " + filePath)

                        var value = doc.output("datauri");

                        valueService.saveBase64File(filePath, "sample.pdf", value, "application/pdf");

                        valueService.openFile(filePath + "sample.pdf", "application/pdf");

                    } else {

                        doc.save("Report.pdf");
                    }
                });
            })
        }, 1000);

        setTimeout(function () {

            $("#cmd1").click(function () {

                var doc = jsPDF("p", "mm", [700, 750]);

                doc.fromHTML($("#export1").html(), 15, 15, {"width": 500}, function (bla) {

                    if ($rootScope.local) {

                        var filePath = cordova.file.dataDirectory;

                        console.log("FILE PATH  " + filePath)

                        var value = doc.output("datauri");

                        valueService.saveBase64File(filePath, "sample.pdf", value, "application/pdf");

                        valueService.openFile(filePath + "sample.pdf", "application/pdf");

                    } else {

                        doc.save("Report.pdf");
                    }
                });
            })
        }, 1000);
    });

    $scope.customersubmit = false;

    $scope.customerSubmit = function () {

        $scope.customersubmit = true;

        $scope.isSubmitted = true;

        var timeJSONData = [];

        for (var i = 0; i < $scope.timeArray.length; i++) {

            var date = $filter("date")($scope.timeArray[i].Date, "yyyy-MM-ddThh:mm:ss.000");
            date = date + "Z";

            var timeData = {
                "taskId": $scope.timeArray[i].Task_Number,
                "shiftCode": $scope.timeArray[i].Shift_Code,
                "overTimeShiftCode": $scope.timeArray[i].Time_Code,
                "chargeType": $scope.timeArray[i].Charge_Type,
                "duration": $scope.timeArray[i].Duration,
                "comments": $scope.timeArray[i].Comments,
                "laborItem": $scope.timeArray[i].Item,
                "laborDescription": $scope.timeArray[i].Description,
                "workType": $scope.timeArray[i].Work_Type,
                "startDate": date,
                "endDate": date,
                "chargeMethod": $scope.timeArray[i].Charge_Method
            }

            timeJSONData.push(timeData);
        }

        var expenseJSONData = [];

        for (var i = 0; i < $scope.expenseArray.length; i++) {

            var expenseDate = $filter("date")($scope.expenseArray[i].Date, "yyyy-MM-dd");

            var expenseData = {
                "taskId": $scope.expenseArray[i].Task_Number,
                "comments": $scope.expenseArray[i].Justification,
                "currency": $scope.expenseArray[i].Currency,
                "chargeMethod": $scope.expenseArray[i].Charge_Method,
                "amount": $scope.expenseArray[i].Amount,
                "date": expenseDate,
                "expenseItem": $scope.expenseArray[i].Expense_Type
            }

            expenseJSONData.push(expenseData);
        }

        var materialDataJSON = [];

        for (var i = 0; i < $scope.materialArray.length; i++) {

            var materialData = {
                "chargeType": $scope.materialArray[i].Charge_Type,
                "taskid": $scope.materialArray[i].Task_Number,
                "itemDescription": $scope.materialArray[i].Description,
                "productQuantity": $scope.materialArray[i].Product_Quantity,
                "serialNumber": $scope.materialArray[i].serialType,
                "comments": $scope.materialArray[i].Comments
            }

            materialDataJSON.push(materialData);
        }

        var noteDataJSON = [];

        for (var i = 0; i < $scope.notesArray.length; i++) {

            var noteData = {
                "Notes_type": $scope.notesArray[i].Note_Type,
                "notes_description": $scope.notesArray[i].Notes,
                "task_id": $scope.notesArray[i].Task_Number
            };

            noteDataJSON.push(noteData);
        }

        var date = new Date();
        date.setMonth(date.getMonth() - 1);

        //Post notes data
        var form = {
            resourceId: valueService.getResourceId(),
            startDate: date.toISOString(),
            endDate: new Date().toISOString(),
            header: {
                "Content-Type": "application/json",
                "Authorization": "Basic QTQ3MjE0NF9FTUVSU09OTU9CSUxFQ0xPVURfTU9CSUxFX0FOT05ZTU9VU19BUFBJRDpZLm81amxkaHVtYzF2ZQ==",
                "oracle-mobile-backend-id": "cc9a9b83-02ff-4be1-8b70-bccb3ac6c592"
            }
        };

        var attachment = [];

        if ($scope.image.length > 0) {

            angular.forEach($scope.image, function (key, value) {

                var attachmentObject = {
                    "Data": "",
                    "FileName": key.file.name,
                    "Description": key.file.name,
                    "Name": ""
                }

                attachment.push(attachmentObject);
            });
        }

        if ($scope.files.length > 0) {

            angular.forEach($scope.files, function (key, value) {

                var attachmentObject = {
                    "Data": "",
                    "FileName": key.file.name,
                    "Description": key.filename,
                    "Name": ""
                }

                attachment.push(attachmentObject);
            });
        }

        var attachmentJSONData = [];

        for (var i = 0; i < $scope.files.length; i++) {

            var attachmentObject = {
                "Data": $scope.files[i].data.split(",")[1],
                "FileName": $scope.files[i].filename,
                "Description": $scope.files[i].filename,
                "Name": $scope.files[i].filename,
                "taskId": $rootScope.selectedTask.Task_Number,
                "contentType": $scope.files[i].data.split(",")[0].split(";")[0].split(":")[1]
            };

            attachmentJSONData.push(attachmentObject);
        }

        var timeUploadJSON = {
            "Time": timeJSONData
        }

        console.log(timeUploadJSON);

        if ($scope.timeArray) {

            /*cloudService.uploadTime(form, timeUploadJSON, function (respose) {

                console.log("Uploaded Time Data");
            });*/
        }

        var expenseUploadJSON = {
            "expense": expenseJSONData
        }

        console.log(expenseUploadJSON);

        if ($scope.expenseArray) {

            /*cloudService.updateExpenses(form, expenseUploadJSON, function (respose) {

                console.log("Uploaded Expense Data");
            });*/
        }

        var materialUploadJSON = {
            "Material": materialData
        }

        console.log(materialUploadJSON);

        if ($scope.materialArray) {

            /*cloudService.updateMaterial(form, materialUploadJSON, function (respose) {

                console.log("Uploaded materail");
            });*/
        }

        var notesUploadJSON = {
            "Notes": noteDataJSON
        }

        console.log(notesUploadJSON);

        if ($scope.notesArray) {

            /*cloudService.updateNotes(form, notesUploadJSON, function (respose) {

                console.log("Uploaded notes");
            });*/
        }

        var attachmentUploadJSON = {
            "attachment": attachmentJSONData
        };

        if ($scope.files) {

            /*cloudService.createAttachment(form, attachmentUploadJSON, function (response) {

                console.log("Attachment Uploaded Successfully");
            });*/
        }

        /*setTimeout(function () {

            var formData = {
                "Taskstatus": [{
                    "taskId": $rootScope.selectedTask.Task_Number,
                    "taskStatus": "Field Job Completed"
                }]
            };

            cloudService.acceptTask(formData, function (response) {

                console.log(response);
            });

        }, 3000);*/
    }

    $scope.followUp = false;
    $scope.spareQuote = false;
    $scope.salesVisit = false;
    $scope.salesLead = false;

    $scope.check1 = function () {
        $scope.followUp = !$scope.followUp;
    }

    $scope.check2 = function () {
        $scope.spareQuote = !$scope.spareQuote;
    }

    $scope.check3 = function () {
        $scope.salesVisit = !$scope.salesVisit;
    }

    $scope.check4 = function () {
        $scope.salesLead = !$scope.salesLead;
    }

    $scope.SaveSign = function () {

        console.log("Inside save sign");

        console.log($rootScope.signature);

        $scope.summary.engineer = {};

        $scope.summary.engineer.signature = $rootScope.signature;

        //   var url= $rootScope.signature;
        //   $timeout( function(){
        //     $scope.$apply();
        // }, 5000 );

        $scope.selectedIndex = $scope.stages.findIndex(x => x.title == "Summary"
    )
        ;
        console.log($scope.selectedIndex);
    }

//Start Date Calendar functions
    $scope.today = function () {
        $scope.startDate = new Date();
    };

    $scope.today();

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: "yy",
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

// Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === "day" && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.openCalendar = function (index, stage) {

        switch (stage) {

            case "Time":

                for (var i = 0; i < $scope.timeArray.length; i++) {

                    if ($scope.timeArray[i] == index) {

                        $scope.timeArray[i].calendarOpened = true;
                    }
                }

            case "Expenses":

                for (var i = 0; i < $scope.expenseArray.length; i++) {

                    if ($scope.expenseArray[i] == index) {

                        $scope.expenseArray[i].calendarOpened = true;
                    }
                }

            case "Notes":

                for (var i = 0; i < $scope.notesArray.length; i++) {

                    if ($scope.notesArray[i] == index) {

                        $scope.notesArray[i].calendarOpened = true;
                    }
                }
        }
    };

    $scope.setDate = function (year, month, day) {
        $scope.startDate = new Date(year, month, day);
    };

    $scope.formats = ["dd-MMMM-yyyy", "yyyy/MM/dd", "dd/MM/yyyy", "shortDate"];

    $scope.format = $scope.formats[2];

    $scope.altInputFormats = ["M!/d!/yyyy"];

    $scope.popup1 = {
        opened: false
    };

    function getDayClass(data) {

        var date = data.date, mode = data.mode;

        if (mode === "day") {

            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {

                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return "";
    }

    $scope.setDuration = function (index) {

        var d = new Date();

        d.setHours(8, 0, 0);

        $scope.timeArray[index].duration.value = moment(d).format("hh:mm");
    }

//Attachements
    $scope.file = "";

    $scope.files = [];

    $scope.image = [];

    $scope.uploadImage = function (file) {
        if (file != null)
            $scope.image.push(file);
    }

    $scope.uploadFiles = function (file) {

        if (file != null) {

            var name = file.name.split(".")[0];

            var type = file.name.split(".")[1];

            var fileobj = {"filename": name, "file": file, "filetype": type, "data": ""};

            var fileObject = null;

            Upload.base64DataUrl(file).then(function (urls) {

                console.log(urls);

                fileobj.data = urls;

                $scope.files.push(fileobj);

                console.log($scope.files);
                //  var fileData=urls.split(",")[1];
                //  console.log(fileData);
                //  var contentTypeOfFile= urls.split(",")[0].split(";")[0];
                //  console.log(contentTypeOfFile);
                // fileObject ={
                //   "Data":urls.split(",")[1],
                //   "FileName":name,
                //   "Description":name,
                //   "Name":name,
                //   "taskId":$rootScope.selectedTask.Task_Number,
                //   "contentType":contentTypeOfFile
                // };
                //  $scope.files.push(fileObject);
                //  console.log($scope.files);
            });
        }
    }

    $scope.reviewSummary = function () {
        $scope.selectedIndex = $scope.stages.findIndex(x => x.title == "Customer Signature"
    )
        ;
    }
});


