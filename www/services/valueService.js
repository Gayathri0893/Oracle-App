(function () {

    'use strict';

    app.service('valueService', valueService);

    valueService.$inject = ['$http', '$rootScope', '$window', '$location', 'localService', 'cloudService'];

    function valueService($http, $rootScope, $window, $location, localService, cloudService) {

        var service = {};

        var warrantyType = null;

        var taskId = null;

        var header = null;

        var networkStatus = false;

        var debrief = {
            task: {},
            installBase: {},
            time: [],
            expense: [],
            material: [],
            notes: [],
            attachment: [],
            engineer: {},
            overTime: [],
            shiftCode: []
        };

        var userTypeResponse = {
            name: '',
            clarityType: '',
            defaultView: ''
        };

        var resourceId = null;
        var userType = {};
        service.setResourceId = setResourceId;
        service.getResourceId = getResourceId;

        service.setUserType = setUserType;
        service.getUserType = getUserType;

        service.setHeader = setHeader;
        service.getHeader = getHeader;

        service.setTask = setTask;
        service.getTask = getTask;

        service.setInstallBase = setInstallBase;
        service.getInstallBase = getInstallBase;

        service.setTaskId = setTaskId;
        service.getTaskId = getTaskId;

        service.setTime = setTime;
        service.getTime = getTime;

        service.setExpense = setExpense;
        service.getExpense = getExpense;

        service.setMaterial = setMaterial;
        service.getMaterial = getMaterial;

        service.setNote = setNote;
        service.getNote = getNote;

        service.setAttachment = setAttachment;
        service.getAttachment = getAttachment;

        service.setEngineer = setEngineer;
        service.getEngineer = getEngineer;

        service.setOverTime = setOverTime;
        service.getOverTime = getOverTime;

        service.setShiftCode = setShiftCode;
        service.getShiftCode = getShiftCode;

        service.getDebrief = getDebrief;
        service.saveValues = saveValues;

        service.setWarrantyType = setWarrantyType;
        service.getWarrantyType = getWarrantyType;

        service.setNetworkStatus = setNetworkStatus;
        service.getNetworkStatus = getNetworkStatus;

        service.saveBase64File = saveBase64File;
        service.saveFile = saveFile;
        service.openFile = openFile;

        return service;

        function setResourceId(id) {
            resourceId = id;
        };

        function getResourceId() {

            return resourceId;
        };

        function setUserType(name, type) {

            

            userType.name = name;

            userType.defaultView = type.technicianProfile[0].Default_View;

            var nameCapitalize = name.toUpperCase();

            if (nameCapitalize == "ALEX" && type.technicianProfile[0].ClarityID == 1) {

                userType.clarityType = 'C';

            } else {

                userType.clarityType = 'NC';
            }
        }

        function getUserType() {

            return userType;
        };

        function setHeader(header) {

            header = header;
        };

        function getHeader() {

            return header;
        };

        function setTask(taskObject) {

            debrief.task = taskObject;

            if ($rootScope.local) {

                localService.getInstallBaseList(taskObject.Task_Number, function (response) {

                    debrief.installBase = response[0];
                });

                localService.getTimeList(taskObject.Task_Number, function (response) {

                    debrief.time = response;
                });

                localService.getExpenseList(taskObject.Task_Number, function (response) {

                    debrief.expense = response;
                });

                localService.getMaterialList(taskObject.Task_Number, function (response) {

                    debrief.material = response;
                });

                localService.getNotesList(taskObject.Task_Number, function (response) {

                    debrief.notes = response;
                });

                localService.getAttachmentList(taskObject.Task_Number, function (response) {

                    debrief.attachment = response;
                });

                localService.getEngineer(taskObject.Task_Number, function (response) {

                    debrief.engineer = response;
                });

                localService.getOverTimeList(taskObject.Task_Number, function (response) {

                    debrief.overTime = response;
                });

                localService.getShiftCodeList(taskObject.Task_Number, function (response) {

                    debrief.shiftCode = response;
                });
            }
        };

        function getTask() {

            return debrief.task;
        };

        function setInstallBase(installBaseObject) {

            debrief.installBase = installBaseObject;
        };

        function getInstallBase() {

            return debrief.installBase;
        };

        function setTaskId(task) {

            taskId = task;
        };

        function getTaskId() {

            return taskId;
        };

        function setTime(timeArray) {

            debrief.time = timeArray;
        };

        function getTime() {

            return debrief.time;
        };

        function setExpense(expenseArray) {

            debrief.expense = expenseArray;
        };

        function getExpense() {

            return debrief.expense;
        };

        function setMaterial(materialArray) {

            debrief.material = materialArray;
        };

        function getMaterial() {

            return debrief.material;
        };

        function setNote(noteArray) {

            debrief.notes = noteArray;
        };

        function getNote() {

            return debrief.notes;
        };

        function setAttachment(attachmentArray) {

            debrief.attachment = attachmentArray;
        };

        function getAttachment() {

            return debrief.attachment;
        };

        function setEngineer(engineerObject) {

            debrief.engineer = engineerObject;
        };

        function getEngineer() {

            return debrief.engineer;
        };

        function setOverTime(overTimeArray) {

            debrief.overTime = overTimeArray;
        };

        function getOverTime() {

            return debrief.overTime;
        };

        function setShiftCode(shiftCodeArray) {

            debrief.shiftCode = shiftCodeArray;
        };

        function getShiftCode() {

            return debrief.shiftCode;
        };

        function getDebrief() {

            return debrief;
        };

        function setNetworkStatus(status) {

            networkStatus = status;
        };

        function getNetworkStatus() {

            return networkStatus;
        };

        function saveValues() {

            if (debrief.time.length > 0)
                localService.insertTimeList(debrief.time);

            if (debrief.expense.length > 0)
                localService.insertTimeList(debrief.expense);

            if (debrief.material.length > 0)
                localService.insertTimeList(debrief.material);

            if (debrief.notes.length > 0)
                localService.insertTimeList(debrief.notes);

            if (debrief.attachment.length > 0)
                localService.insertTimeList(debrief.attachment);

            if (debrief.engineer.Task_Number != null)
                localService.insertTimeList(debrief.engineer);
        };

        function setWarrantyType(type) {

            warrantyType = type;
        };

        function getWarrantyType() {

            return warrantyType;
        };

        function b64toBlob(b64Data, contentType, sliceSize) {

            contentType = contentType || '';

            sliceSize = sliceSize || 512;

            var byteCharacters = atob(b64Data);

            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {

                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);

                for (var i = 0; i < slice.length; i++) {

                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, {type: contentType});

            return blob;
        };

        function saveBase64File(folderpath, filename, content, contentType) {

            var DataBlob = b64toBlob(content, contentType);

            console.log("START WRITING");

            window.resolveLocalFileSystemURL(folderpath, function (dir) {

                console.log("ACCESS GRANTED");

                dir.getFile(filename, {create: true}, function (file) {

                    console.log("FILE CREATED SUCCESSFULLY");

                    file.createWriter(function (fileWriter) {

                        console.log("WRITING CONTENT TO FILE");

                        fileWriter.write(DataBlob);

                    }, function () {

                        alert("UNABLE TO SAVE " + folderpath);
                    });
                });
            });
        };

        function saveFile(folderpath, filename, file) {

            var DataBlob = file;

            console.log("START WRITING");

            window.resolveLocalFileSystemURL(folderpath, function (dir) {

                console.log("ACCESS GRANTED");

                dir.getFile(filename, {create: true}, function (file) {

                    console.log("FILE CREATED SUCCESSFULLY");

                    file.createWriter(function (fileWriter) {

                        console.log("WRITING CONTENT TO FILE");

                        fileWriter.write(DataBlob);

                    }, function () {

                        alert("UNABLE TO SAVE " + folderpath);
                    });
                });
            });
        };

        function openFile(filePath, fileType) {

            cordova.plugins.fileOpener2.open(filePath, fileType, {

                    error: function (e) {
                        console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
                    },
                    success: function () {
                        console.log('file opened successfully');
                    }
                }
            );
        };

        function copyDatabaseFile(dbName) {

            var sourceFileName = cordova.file.applicationDirectory + 'www/db/' + dbName;

            var targetDirName = cordova.file.dataDirectory;

            console.log("DB PATH", targetDirName);

            return Promise.all([

                new Promise(function (resolve, reject) {

                    resolveLocalFileSystemURL(sourceFileName, resolve, reject);
                }),

                new Promise(function (resolve, reject) {

                    resolveLocalFileSystemURL(targetDirName, resolve, reject);
                })

            ]).then(function (files) {

                var sourceFile = files[0];

                var targetDir = files[1];

                return new Promise(function (resolve, reject) {

                    targetDir.getFile(dbName, {}, resolve, reject);

                }).then(function () {

                    console.log("File already copied");

                }).catch(function () {

                    console.log("File doesn't exist, copying it");

                    return new Promise(function (resolve, reject) {

                        sourceFile.copyTo(targetDir, dbName, resolve, reject);

                    }).then(function () {

                        console.log("File copied");
                    });
                });
            });
        };
    }
})();
