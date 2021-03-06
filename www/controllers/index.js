app.controller('indexController', function ($scope, $state, $timeout, $mdSidenav, $mdDialog, $translate, $rootScope, usSpinnerService, valueService, localService, cloudService) {

    //the onlinemethod is not working so makking the badgee's ng-show headerName
    // $scope.onlineStatus = true;

    $scope.spinnerLoading = true;

    $rootScope.closed = false;

    $rootScope.selectedCategory = 'Field Service';

    $scope.collapsedClass = "";

    $scope.franceFlag = true;

    $scope.chinaFlag = true;

    $scope.stopSpin = function () {

        console.log('Stop Spinner');
        usSpinnerService.stop('spinner-1');
    };

    $scope.openLeftMenu = function () {

        console.log('show');
        $mdSidenav('left').toggle();
    };

    $scope.changeLanguage = function (lang) {

        switch (lang) {

            case "en":
                $scope.usFlag = false;
                $scope.franceFlag = true;
                $scope.chinaFlag = true;
                $translate.use('en').then(function () {
                    console.log('English Used');
                })
                break;

            case "fr":
                $scope.usFlag = true;
                $scope.franceFlag = false;
                $scope.chinaFlag = true;
                break;

            case "ch" :
                $scope.usFlag = true;
                $scope.franceFlag = true;
                $scope.chinaFlag = false;
                $translate.use('jp').then(function () {
                    console.log('Japanese Used');
                });
                break;

            default:
                break;
        }
    }

    $scope.sideNavItems = [

        {
            id: 1,
            displayName: "Home",
            name: "Home",
            controller: "myTask",
            image: "images/mytask/Shape36.png",
            imageSelected: "images/mytask/myTaskSel.png"
        },
        {
            id: 2,
            displayName: "Calendar",
            name: "MyCalendar",
            controller: "myTask",
            image: "images/calendar/Rectangle8.png",
            imageSelected: "images/calendar/Rectangle8copy.png"
        },

        {
            id: 3,
            displayName: "Task",
            name: "TaskOverview",
            controller: "taskOverflow",
            image: "images/taskoverview/taskoverview.png",
            imageSelected: "images/taskoverview/taskOverflowSel.png"
        },
        {
            id: 4,
            displayName: "Debrief",
            name: "Debrief",
            controller: "debrief",
            image: "images/debrief/brief copy.png",
            imageSelected: "images/debrief/brief.png"
        }];

    $rootScope.selectedItem = $scope.sideNavItems[0].id;

    $scope.menuClick = function (item) {

        $rootScope.selectedItem = item.id;

        $rootScope.tabClicked = true;

        $rootScope.columnclass = "col-sm-11";

        switch (item.name) {

            case "MyCalendar":

                $scope.myCalendar = true;

                $scope.taskOverview = false;

                $rootScope.showDebrief = false;

                $rootScope.showTaskDetail = false;

                $state.go(item.controller);

                /*if ($('.showTaskList').is(":visible")) {

                    $('.showTaskList').hide();
                    $('.fc-view-container').show();
                    $('#calendar > div.fc-toolbar.fc-header-toolbar > div.fc-center > div').show();
                    $('.fc-toolbar.fc-header-toolbar').show();
                    $('.showMonth').show();
                }*/

                $rootScope.selectedCategory = 'Field Service'

                break;

            case "MyTask":

                $rootScope.showDebrief = false;

                $rootScope.showTaskDetail = false;

                $state.go("myFieldJob");

               /* setTimeout(function () {

                    $('.fc-view-container').hide();
                    $('#calendar > div.fc-toolbar.fc-header-toolbar > div.fc-center > div').hide();
                    $('.fc-toolbar.fc-header-toolbar').hide();
                    $('.showMonth').hide();
                    $('.showTaskList').show();
                }, 100);*/

                $rootScope.selectedCategory = 'My Field Job';

                break;
            case "Home":

                $rootScope.showDebrief = false;

                $rootScope.showTaskDetail = false;

                $state.go("home");

               /* setTimeout(function () {

                    $('.fc-view-container').hide();
                    $('#calendar > div.fc-toolbar.fc-header-toolbar > div.fc-center > div').hide();
                    $('.fc-toolbar.fc-header-toolbar').hide();
                    $('.showMonth').hide();
                    $('.showTaskList').show();
                }, 100);*/

                $rootScope.selectedCategory = 'Home';

                break;

            case "TaskOverview":

                $scope.taskOverview = true;

                $scope.myCalendar = false;

                $state.go("taskOverFlow");

                break;

            case "Debrief" :

                $scope.taskOverview = true;

                $scope.myCalendar = false;

                $state.go(item.controller);

                $rootScope.selectedCategory = 'Debrief'

            default:
                break;
        }
    }

    $scope.menuToggle = function () {

        if ($rootScope.closed == true) {

            $rootScope.closed = false;
            $scope.collapsedClass = ""

        } else {

            $rootScope.closed = true;
            $scope.collapsedClass = "collapsed"
        }
    }

    $scope.signout = function () {

        localService.deleteUser();

        $state.go('login');
    }

    $scope.export2PDF = function () {

        html2canvas(document.getElementById('exportthis'), {

            onrendered: function (canvas) {

                var data = canvas.toDataURL();

                var docDefinition = {

                    content: [{
                        image: data,
                        width: 500,
                    }]
                };

                pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
            }
        });
    }

    $scope.saveValues = function () {

        valueService.saveValues();
    }

    //  window.addEventListener("online", onLine, false);
     //
    //  window.addEventListener("offline", offLine, false);


    //Nikhil code
    if($rootScope.Islogin){
      if(navigator.onLine) {
          onLine();
      }else if(navigator.offLine){
        offLine();
      }
    }



    function onLine() {

        console.log("Online");

        $scope.onlineStatus = true;

        valueService.setNetworkStatus(true);

        var date=new Date();
        date.setMonth(date.getMonth()-1);
        $scope.form = {
            resourceId: valueService.getResourceId(),
            startDate: date.toISOString(),
            endDate: new Date().toISOString(),
            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic QTQ3MjE0NF9FTUVSU09OTU9CSUxFQ0xPVURfTU9CSUxFX0FOT05ZTU9VU19BUFBJRDpZLm81amxkaHVtYzF2ZQ==',
                'oracle-mobile-backend-id': 'cc9a9b83-02ff-4be1-8b70-bccb3ac6c592'
            }
        };

        cloudService.getTaskList($scope.form, function (response) {

            cloudService.getInstallBaseList($scope.form);
            cloudService.getContactList($scope.form);
            cloudService.getNoteList($scope.form);
            cloudService.getProjectList($scope.form);
            cloudService.getOverTimeList($scope.form);
            cloudService.getShiftCodeList($scope.form);
        });
    }

    function offLine() {

        console.log("Offline");

        $scope.onlineStatus = false;

        valueService.setNetworkStatus(false);
    }

    $scope.syncFunctionality=function(){
      console.log("Inside the syncFunctionality");
      var date=new Date();
      date.setMonth(date.getMonth()-1);
      var endDate =new Date();
      endDate.setDate(endDate.getDate()+7);
        $scope.form = {
            resourceId: valueService.getResourceId(),
            startDate: date.toISOString(),
            endDate: endDate.toISOString(),
            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic QTQ3MjE0NF9FTUVSU09OTU9CSUxFQ0xPVURfTU9CSUxFX0FOT05ZTU9VU19BUFBJRDpZLm81amxkaHVtYzF2ZQ==',
                'oracle-mobile-backend-id': 'cc9a9b83-02ff-4be1-8b70-bccb3ac6c592'
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

    //$scope.changeLanguage();

    /*$(function (){
       $("[data-toggle = 'popover']").popover({
             'placement': 'bottom',
             'animation': true,
             'html': true,
             'title' : getPopoverCustomTitle(),
             'content': getPopoverCustomContent()
         });
  });

function getPopoverCustomTitle() {
// return '<div class="popover ' + className + '" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>';
 return '<div class="popover-custom-title"><label>Alex</label><label>Field Engineer</label><label>Sign Out</label></div>';
 }

 function getPopoverCustomContent() {
// return '<div class="popover ' + className + '" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>';
 return '<div class="popover-custom-content"><label>Select your Language</label><br><hr><img src="images/Layer 10.png" ng-click="changeLanguage()"><img src="images/Layer 12.png" ng-click="changeLanguage()"></div>';
 }*/
});
