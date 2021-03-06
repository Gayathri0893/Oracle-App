(function () {

    'use strict';

    app.factory('cloudService', cloudService);

    cloudService.$inject = ['$http', '$rootScope', '$window', '$location', 'localService'];

    function cloudService($http, $rootScope, $window, $location, localService) {

        var url = conf.apiUrl;

        var service = {};

        service.login = login;
        service.getTechnicianProfile = getTechnicianProfile;

        service.getTaskList = getTaskList;
        service.getInstallBaseList = getInstallBaseList;
        service.getContactList = getContactList;
        service.getNoteList = getNoteList;
        service.getProjectList = getProjectList;
        service.getOverTimeList = getOverTimeList;
        service.getShiftCodeList = getShiftCodeList;

        service.getTaskListCloud = getTaskListCloud;
        service.getInstallBaseListCloud = getInstallBaseListCloud;
        service.getContactListCloud = getContactListCloud;
        service.getNoteListCloud = getNoteListCloud;
        service.getProjectListCloud = getProjectListCloud;
        service.getOverTimeListCloud = getOverTimeListCloud;
        service.getShiftCodeListCloud = getShiftCodeListCloud;

        service.acceptTask = acceptTask;
        service.startTask = startTask;
        service.setCredentials = setCredentials;
        service.clearCredentials = clearCredentials;
        service.updateNotes = updateNotes;
        service.getFileIds = getFileIds;
        service.downloadAttachment = downloadAttachment;
        service.updateExpenses = updateExpenses;
        service.uploadTime = uploadTime;
        service.updateMaterial = updateMaterial;

        service.createAttachment = createAttachment;

        return service;

        function login(formData, callback) {

            console.log('Login Data', JSON.stringify(formData));

            return $http({

                method: 'GET',
                url: url + 'login_API/verify_login',
                headers: formData.header

            }).success(function (response) {

                console.log('Login Response', JSON.stringify(response));

                callback(response);

            }).error(function (error) {

                console.log('Login Error', JSON.stringify(error));

                callback(error);
            });
        }

        function getTechnicianProfile(formData, callback) {

            console.log('Technician Data', JSON.stringify(formData));

            return $http({

                method: 'GET',
                url: url + 'Technician_Profile_Details/to_get_techpro?resourceId=' + formData.resourceId,
                headers: formData.header

            }).success(function (response) {

                console.log('Technician Response', JSON.stringify(response));

                callback(response);

            }).error(function (error) {

                console.log('Technician Error', JSON.stringify(error));

                callback(error);
            });
        }

        function getTaskList(formData, callback) {

            console.log("Task Data", JSON.stringify(formData));

            $http({

                method: 'GET',
                url: url + 'TaskDetails/Resource_ID_taskdetails?resourceId=' + formData.resourceId
                + '&fromDate=' + formData.startDate
                + '&toDate=' + formData.endDate,
                headers: formData.header

            }).success(function (response) {

                console.log("Task Response " + JSON.stringify(response));

                localService.insertTaskList(response);

                callback(response);

            }).error(function (error) {

                console.log("Task Error " + JSON.stringify(error));

                callback(error);

            });
        }

        function getInstallBaseList(formData) {

            console.log("Install Base Data", JSON.stringify(formData));

            $http({

                method: 'GET',
                url: url + 'InstallBase/install_base?resourceId=' + formData.resourceId
                + '&fromDate=' + formData.startDate
                + '&toDate=' + formData.endDate,
                headers: formData.header

            }).success(function (response) {

                console.log("Install Base Response " + JSON.stringify(response));

                localService.insertInstallBaseList(response);

            }).error(function (error) {

                console.log("Install Base Error " + JSON.stringify(error));
            });
        }

        function getContactList(formData) {

            console.log("Contact Data", JSON.stringify(formData));

            $http({

                method: 'GET',
                url: url + 'Contact/contacts_api?resourceId=' + formData.resourceId
                + '&fromDate=' + formData.startDate
                + '&toDate=' + formData.endDate,
                headers: formData.header

            }).success(function (response) {

                console.log("Contact Response " + JSON.stringify(response));

                localService.insertContactList(response);

            }).error(function (error) {

                console.log("Contact Error " + JSON.stringify(error));
            });
        }

        function getNoteList(formData) {

            console.log("Note Data", JSON.stringify(formData));

            $http({

                method: 'GET',
                url: url + 'Notes/notes_api?resourceId=' + formData.resourceId
                + '&fromDate=' + formData.startDate
                + '&toDate=' + formData.endDate,
                headers: formData.header

            }).success(function (response) {

                console.log("Note Response " + JSON.stringify(response));

                localService.insertNoteList(response);

            }).error(function (error) {

                console.log("Note Error " + JSON.stringify(error));
            });
        }

        function getProjectList(formData) {

            console.log("Project Data", JSON.stringify(formData));

            $http({

                method: 'GET',
                url: url + 'Project_API/to_get_project?resourceId=' + formData.resourceId
                + '&fromDate=' + formData.startDate
                + '&toDate=' + formData.endDate,
                headers: formData.header

            }).success(function (response) {

                console.log("Project Response " + JSON.stringify(response));

                localService.insertProjectList(response);

            }).error(function (error) {

                console.log("Project Error " + JSON.stringify(error));
            });
        }

        function getOverTimeList(formData) {

            console.log("OverTime Data", JSON.stringify(formData));

            $http({

                method: 'GET',
                url: url + 'OverTImeShiftCode/to_get_overtimeshiftcode?resourceId=' + formData.resourceId
                + '&fromDate=' + formData.startDate
                + '&toDate=' + formData.endDate,
                headers: formData.headerP

            }).success(function (response) {

                console.log("OverTime Response " + JSON.stringify(response));

                localService.insertOverTimeList(response);

            }).error(function (error) {

                console.log("OverTime Error " + JSON.stringify(error));
            });
        }

        function getShiftCodeList(formData) {

            console.log("ShiftCode Data", JSON.stringify(formData));

            $http({

                method: 'GET',
                url: url + 'Shiftcode_API/to_get_shiftcode?resourceId=' + formData.resourceId
                + '&fromDate=' + formData.startDate
                + '&toDate=' + formData.endDate,
                headers: formData.headerP

            }).success(function (response) {

                console.log("ShiftCode Response " + JSON.stringify(response));

                localService.insertShiftCodeList(response);

            }).error(function (error) {

                console.log("ShiftCode Error " + JSON.stringify(error));
            });
        }

        function getTaskListCloud(formData, callback) {

            console.log("Task Cloud Data", JSON.stringify(formData));

            $http({

                method: 'GET',
                url: url + 'TaskDetails/Resource_ID_taskdetails?resourceId=' + formData.resourceId
                + '&fromDate=' + formData.startDate
                + '&toDate=' + formData.endDate,
                headers: formData.header

            }).success(function (response) {

                console.log("Task Cloud Response " + JSON.stringify(response));

                callback(response);

            }).error(function (error) {

                console.log("Task Cloud Error " + JSON.stringify(error));

                callback(error);
            });
        }

        function getInstallBaseListCloud(formData, callback) {

            console.log("InstallBase Cloud Data", JSON.stringify(formData));

            $http({

                method: 'GET',
                url: url + 'InstallBase/install_base?resourceId=' + formData.resourceId
                + '&fromDate=' + formData.startDate
                + '&toDate=' + formData.endDate,
                headers: formData.header

            }).success(function (response) {

                console.log("InstallBase Cloud Response " + JSON.stringify(response));

                callback(response);

            }).error(function (error) {

                console.log("InstallBase Cloud Error " + JSON.stringify(error));

                callback(error);
            });
        }

        function getContactListCloud(formData, callback) {

            console.log("Contact Cloud Data", JSON.stringify(formData));

            $http({

                method: 'GET',
                url: url + 'Contact/contacts_api?resourceId=' + formData.resourceId
                + '&fromDate=' + formData.startDate
                + '&toDate=' + formData.endDate,
                headers: formData.header

            }).success(function (response) {

                console.log("Contact Cloud Response " + JSON.stringify(response));

                callback(response);

            }).error(function (error) {

                console.log("Contact Cloud Error " + JSON.stringify(error));

                callback(error);
            });
        }

        function getNoteListCloud(formData, callback) {

            console.log("Note Cloud Data", JSON.stringify(formData));

            $http({

                method: 'GET',
                url: url + 'Notes/notes_api?resourceId=' + formData.resourceId
                + '&fromDate=' + formData.startDate
                + '&toDate=' + formData.endDate,
                headers: formData.header

            }).success(function (response) {

                console.log("Note Cloud Response " + JSON.stringify(response));

                callback(response);

            }).error(function (error) {

                console.log("Note Cloud Error " + JSON.stringify(error));

                callback(error);
            });
        }

        function getProjectListCloud(formData, callback) {

            console.log("Project Cloud Data", JSON.stringify(formData));

            $http({

                method: 'GET',
                url: url + 'Project_API/to_get_project?resourceId=' + formData.resourceId
                + '&fromDate=' + formData.startDate
                + '&toDate=' + formData.endDate,
                headers: formData.header

            }).success(function (response) {

                console.log("Project Cloud Response " + JSON.stringify(response));

                callback(response);

            }).error(function (error) {

                console.log("Project Cloud Error " + JSON.stringify(error));

                callback(error);
            });
        }

        function getOverTimeListCloud(formData, callback) {

            console.log("OverTime Cloud Data", JSON.stringify(formData));

            $http({

                method: 'GET',
                url: url + 'OverTImeShiftCode/to_get_overtimeshiftcode?resourceId=' + formData.resourceId,
                // + '&fromDate=' + formData.startDate
                // + '&toDate=' + formData.endDate,
                headers: formData.headerP

            }).success(function (response) {

                console.log("OverTime Cloud Response " + JSON.stringify(response));

                callback(response);

            }).error(function (error) {

                console.log("OverTime Cloud Error " + JSON.stringify(error));

                callback(error);
            });
        }

        function getShiftCodeListCloud(formData, callback) {

            console.log("ShiftCode Cloud Data", JSON.stringify(formData));

            $http({

                method: 'GET',
                url: url + 'Shiftcode_API/to_get_shiftcode?resourceId=' + formData.resourceId,
                // + '&fromDate=' + formData.startDate
                // + '&toDate=' + formData.endDate,
                headers: formData.headerP

            }).success(function (response) {

                console.log("ShiftCode Cloud Response " + JSON.stringify(response));

                callback(response);

            }).error(function (error) {

                console.log("ShiftCode Cloud Error " + JSON.stringify(error));

                callback(error);
            });
        }

        function acceptTask(formData, callback) {

            console.log("Accept Task Data", JSON.stringify(formData));

            return $http({

                method: 'POST',
                url: url + 'Status_Api/to_change_status',
                headers: formData.header,
                data: formData

            }).success(function (response) {

                console.log("AcceptTask Response " + JSON.stringify(response));

                callback(response);

            }).error(function (error) {

                console.log("AcceptTask Error " + JSON.stringify(error));

                callback(error);
            });
        }

        function startTask(formData, callback) {

            console.log("Start Task Data", JSON.stringify(formData));

            return $http({

                method: 'POST',
                url: url + 'StartworkAPI/to_startwork?taskId=' + formData.taskId
                + '&taskStatus=' + formData.taskStatus,
                headers: formData.header

            }).success(function (response) {

                console.log("Start Task Response " + JSON.stringify(response));

                callback(response);

            }).error(function (error) {

                console.log("Start Task Error " + JSON.stringify(error));

                callback(error);
            });
        }

        function updateMaterial(formData, materialData, callback) {

            console.log("UpdateMaterial  Data", materialData);

            return $http({

                method: 'POST',
                url: url + 'Material_API/material_update',
                headers: formData.header,
                data: materialData

            }).success(function (response) {

                console.log("updateMaterial Response " + JSON.stringify(response));

                callback(response);

            }).error(function (error) {

                console.log("updateMaterial Error " + JSON.stringify(error));

                callback(error);
            });
        }

        function updateNotes(formData, noteData, callback) {

            console.log("UpdateNotes Data", JSON.stringify(formData));

            return $http({

                method: 'POST',
                url: url + 'Update_Notes_API/to_update_notes',
                headers: formData.header,
                data: noteData

            }).success(function (response) {

                console.log("UpdateNotes Response " + JSON.stringify(response));

                callback(response);

            }).error(function (error) {

                console.log("UpdateNotes Error " + JSON.stringify(error));

                callback(error);
            });
        }

        function uploadTime(formData, timedata, callback) {

            console.log("UploadTime Data " + JSON.stringify(timedata));

            return $http({

                method: 'POST',
                url: url + 'Time_API/time_data',
                headers: formData.header,
                data: timedata

            }).success(function (response) {

                console.log("UploadTime Response " + JSON.stringify(response));

                callback(response);

            }).error(function (error) {

                console.log("UploadTime Error " + JSON.stringify(error));

                callback(error);
            });
        }

        function updateExpenses(formData, expenseData, callback) {

            console.log("UpdateExpenses Data " + JSON.stringify(expenseData));

            return $http({

                method: 'POST',
                url: url + 'Expense_API/expense_pull',
                headers: formData.header,
                data: expenseData

            }).success(function (response) {

                console.log("UpdateExpenses Response " + JSON.stringify(response));

                callback(response);

            }).error(function (error) {

                console.log("UpdateExpenses Error " + JSON.stringify(error));

                callback(error);
            });
        }

        function getFileIds(id, formData, callback) {

            $http({

                method: 'GET',
                url: url + 'FileID/to_getfileid?Id=' + id,
                headers: formData.header

            }).success(function (response) {

                console.log("getFileIds Cloud Response " + JSON.stringify(response));

                callback(response);

            }).error(function (error) {

                console.log("getFileIds Cloud Error " + JSON.stringify(error));

                callback(error);
            });
        }

        function downloadAttachment(formData, taskNumber, attachmentId, callback) {

            $http({

                method: 'GET',
                url: url + 'DownloadAttachment/tasks?taskId=' + taskNumber
                + '&fileAttachmentId=' + attachmentId,
                headers: formData.header

            }).success(function (response) {

                // console.log("downloadAttachment Cloud Response " + JSON.stringify(response));

                callback(response);

            }).error(function (error) {

                console.log("downloadAttachment Cloud Error " + JSON.stringify(error));

                callback(error);
            });
        }

        function createAttachment(formdata, attachment, callback) {

            $http({

                method: 'POST',
                url: url + 'Create_Attachment/attachment_create',
                headers: formdata.header,
                data: attachment

            }).success(function (response) {

                // console.log("downloadAttachment Cloud Response " + JSON.stringify(response));

                callback(response);

            }).error(function (error) {

                console.log("downloadAttachment Cloud Error " + JSON.stringify(error));

                callback(error);
            });
        }

        function setCredentials(email, password, userId) {

            var authData = Base64.encode(email + ':' + password);

            $rootScope.globals = {

                currentUser: {

                    email: email,
                    userId: userId,
                    authData: authData,
                    rootUrl: url
                },

                adminDetails: $rootScope.admin
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authData;

            // $cookieStore.put('advGlobalObj', $rootScope.globals);
        }

        function clearCredentials() {

            $rootScope.globals = {};

            // $cookieStore.remove('advGlobalObj');
        }
    }

    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {

            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        },

        decode: function (input) {

            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            var base64test = /[^A-Za-z0-9\+\/\=]/g;

            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {

                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

})();
