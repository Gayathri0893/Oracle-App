app.controller('loginController', function ($scope, $compile, $timeout, uiCalendarConfig, $rootScope, $state, $http, cloudService, localService, valueService) {

    $rootScope.Islogin = false;

    $scope.userName = "";

    $scope.login = function () {

        console.log($scope.userName);

        $rootScope.Islogin = true;

        var baseData = $scope.userName.toLowerCase() + ":" + $scope.password;

        var authorizationValue = window.btoa(baseData);

        var data = {

            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + authorizationValue,
                'oracle-mobile-backend-id': 'cc9a9b83-02ff-4be1-8b70-bccb3ac6c592'
            }
        }

        $http.get("app/json/loginRes.json").then(function(response) {
            if (response) {

                if ($rootScope.local) {

                    var userObject = {
                        user_id: response.data['ID'],
                        user_name: ""
                    };

                    localService.deleteUser();

                    localService.insertUser(userObject);

                    valueService.setResourceId(response.data['ID']);
                    
                }

                valueService.setResourceId(response.data['ID']);
               

                //Get Technician Details after the login call
                var formData = {
                    resourceId: response.data['ID'],
                    header: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic QTQ3MjE0NF9FTUVSU09OTU9CSUxFQ0xPVURfTU9CSUxFX0FOT05ZTU9VU19BUFBJRDpZLm81amxkaHVtYzF2ZQ==',
                        'oracle-mobile-backend-id': 'b861a04a-de53-4c76-9430-3f485c21c5f4'
                    }
                };

                

                //Get TechnicianProfile Response
                var technicianProfileResponse = {"technicianProfile":[{"ID":"5","ClarityID":"1","Currency":"US Dollar (USD)","Default_View":"My Task","Email":"terala.chakradhar@wipro.com","Language":"English (US)","Name":"Baber, Mr. Vernon","OFSCId":"Baber_Vernon","Password":"Emerson123","Time_Zone":"(UTC-05:00) New York - ET","Type":"Internal","User_Name":"Baber","Work_Day":"Monday","Work_Hour":"8"}]}
                 valueService.setUserType($scope.userName, technicianProfileResponse);


                // Get the taskList based on offline and online mode
                if ($rootScope.local) {

                    offlineGetCall();

                } else {

                    $state.go('myTask');
                }

            } else {

                alert('Please verify the UserName or Password.')
            }
        });

        /*cloudService.login(data, function (response) {

            if (response) {

                if ($rootScope.local) {

                    var userObject = {
                        user_id: response['ID'],
                        user_name: ""
                    };

                    localService.deleteUser();

                    localService.insertUser(userObject);

                    valueService.setResourceId(response['ID']);
                }

                valueService.setResourceId(response['ID']);

                //Get Technician Details after the login call
                var formData = {
                    resourceId: response['ID'],
                    header: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic QTQ3MjE0NF9FTUVSU09OTU9CSUxFQ0xPVURfTU9CSUxFX0FOT05ZTU9VU19BUFBJRDpZLm81amxkaHVtYzF2ZQ==',
                        'oracle-mobile-backend-id': 'b861a04a-de53-4c76-9430-3f485c21c5f4'
                    }
                };

                cloudService.getTechnicianProfile(formData, function (response) {

                    valueService.setUserType($scope.userName, response);
                });

                //Get TechnicianProfile Response


                // Get the taskList based on offline and online mode
                if ($rootScope.local) {

                    offlineGetCall();

                } else {

                    $state.go('myTask');
                }

            } else {

                alert('Please verify the UserName or Password.')
            }
       });*/

        function offlineGetCall() {

            console.log("Inside the offlineGetCall");

            var date = new Date();

            date.setMonth(date.getMonth() - 1);

            var endDate = new Date();

            endDate.setDate(endDate.getDate() + 7);

            $scope.form = {
                resourceId: valueService.getResourceId(),
                startDate: date.toISOString(),
                endDate: endDate.toISOString(),
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

            cloudService.getTaskList($scope.form, function (response) {

                cloudService.getInstallBaseList($scope.form);
                cloudService.getContactList($scope.form);
                cloudService.getNoteList($scope.form);
                cloudService.getProjectList($scope.form);
                cloudService.getOverTimeList($scope.form);
                cloudService.getShiftCodeList($scope.form);

                $state.go('myTask');

            });
        }

        console.log("Login API END");
    }
});
