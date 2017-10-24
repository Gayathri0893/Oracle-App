(function () {

    "use strict";

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {

        var db = sqlitePlugin.openDatabase({
            name: "emerson.sqlite",
            location: 'default'
        });

        var sqlUser = "CREATE TABLE IF NOT EXISTS User ('ID' INTEGER PRIMARY KEY  NOT NULL , 'ClarityID' TEXT, 'Currency' TEXT, 'Default_View' TEXT, 'Email' TEXT, 'Language' TEXT, 'Name' TEXT, 'OFSCId' TEXT, 'Password' TEXT, 'Time_Zone' TEXT, 'Type' TEXT, 'User_Name' TEXT, 'Work_Day' TEXT, 'Work_Hour' TEXT)";

        var sqlTask = "CREATE TABLE IF NOT EXISTS Task ('Task_Number' INTEGER PRIMARY KEY  NOT NULL, 'Job_Description' TEXT, 'Duration' TEXT, 'Task_Status' TEXT, 'Customer_Name' TEXT, 'Street_Address' TEXT, 'City' TEXT, 'State' TEXT, 'Zip_Code' TEXT, 'Expense_Method' TEXT, 'Labor_Method' TEXT, 'Travel_Method' TEXT, 'Material_Method' TEXT, 'Service_Request' TEXT, 'Assigned' TEXT, 'Start_Date' TEXT, 'End_Date' TEXT)";

        var sqlInstallBase = "CREATE TABLE IF NOT EXISTS InstallBase ('Installed_Base_ID' INTEGER PRIMARY KEY  NOT NULL, 'Product_Line' TEXT, 'Serial_Number' TEXT, 'TagNumber' TEXT, 'Original_PO_Number' TEXT, 'Task_Number' TEXT, 'Service_Request' TEXT, 'Assigned' TEXT, 'Start_Date' TEXT, 'End_Date' TEXT)";

        var sqlContact = "CREATE TABLE IF NOT EXISTS Contact ('Contact_ID' INTEGER PRIMARY KEY  NOT NULL, 'Customer_Name' TEXT, 'Contact_Name' TEXT, 'Home_Phone' TEXT, 'Mobile_Phone' TEXT, 'Fax_Phone' TEXT, 'Office_Phone' TEXT, 'Email' TEXT, 'Foreign_Key' TEXT, 'Task_Number' TEXT, 'Service_Request' TEXT, 'Assigned' TEXT, 'Start_Date' TEXT, 'End_Date' TEXT)";

        var sqlNote = "CREATE TABLE IF NOT EXISTS Note ('ID' INTEGER PRIMARY KEY  NOT NULL, 'Notes' TEXT, 'Notes_type' TEXT, 'Created_By' TEXT, 'Task_Number' TEXT, 'Service_Request' TEXT, 'Assigned' TEXT, 'Start_Date' TEXT, 'End_Date' TEXT)";

        var sqlProject = "CREATE TABLE IF NOT EXISTS Project ('ID' INTEGER PRIMARY KEY  NOT NULL, 'Clarity_Contact' TEXT, 'P_ProjectManager' TEXT, 'P_Company' TEXT, 'P_ProjectNumber' TEXT, 'Requested' TEXT)";

        var sqlOverTime = "CREATE TABLE IF NOT EXISTS OverTime ('ID' INTEGER PRIMARY KEY  NOT NULL, 'Overtimeshiftcode' TEXT, 'Technician_ID' TEXT, 'Project' TEXT, 'Start_Date' TEXT, 'Date_Completed' TEXT)";

        var sqlShiftCode = "CREATE TABLE IF NOT EXISTS OverTime ('Shift_Code_ID' INTEGER PRIMARY KEY  NOT NULL, 'ShiftCodeName' TEXT, 'TaskNumber' TEXT, 'Technician_ID' TEXT, 'Project' TEXT, 'Start_Date' TEXT, 'Date_Completed' TEXT)";

        var sqlTime = "CREATE TABLE IF NOT EXISTS Time ('Time_Id' INTEGER PRIMARY KEY  NOT NULL, 'timeDefault' TEXT, 'Field_Job_Name' TEXT, 'Charge_Type' TEXT, 'Charge_Method' TEXT, 'Work_Type' TEXT, 'Item' TEXT, 'Description' TEXT, 'Time_Code' TEXT, 'Shift_Code' TEXT, 'Date' TEXT, 'Duration' TEXT, 'Comments' TEXT, 'Task_Number' TEXT)";

        var sqlExpense = "CREATE TABLE IF NOT EXISTS Expense ('Expense_Id' INTEGER PRIMARY KEY  NOT NULL, 'expenseDefault' TEXT, 'Date' TEXT, 'Expense_Type' TEXT, 'Amount' TEXT, 'Currency' TEXT, 'Charge_Method' TEXT, 'Justification' TEXT, 'Task_Number' TEXT)";

        var sqlMaterial = "CREATE TABLE IF NOT EXISTS Material ('Material_Id' INTEGER PRIMARY KEY  NOT NULL, 'materialDefault' TEXT, 'Charge_Type' TEXT, 'Description' TEXT, 'Serial_Activity' TEXT, 'Serial_Number' TEXT, 'Serial_In' TEXT, 'Serial_Out' TEXT, 'Task_Number' TEXT)";

        var sqlNotes = "CREATE TABLE IF NOT EXISTS Notes ('Notes_Id' INTEGER PRIMARY KEY  NOT NULL, 'noteDefault' TEXT, 'Note_Type' TEXT, 'Date' TEXT, 'Created_By' TEXT, 'Notes' TEXT, 'Task_Number' TEXT)";

        var sqlAttachment = "CREATE TABLE IF NOT EXISTS Attachment ('Attachment_Id' INTEGER PRIMARY KEY  NOT NULL, 'File_Name' TEXT, 'File_Path' TEXT, 'Task_Number' TEXT)";

        var sqlEngineer = "CREATE TABLE IF NOT EXISTS Engineer ('Engineer_Id' INTEGER PRIMARY KEY  NOT NULL, 'Follow_Up' TEXT, 'Spare_Quote' TEXT, 'Sales_Visit' TEXT, 'Sales_Head' TEXT, 'Sign_File_Path' TEXT, 'File_Name' TEXT, 'Task_Number' TEXT)";

        db.transaction(function (tx) {

            tx.executeSql(sqlUser);
            console.log('DB SUCCESS: USER');

            tx.executeSql(sqlTask);
            console.log('DB SUCCESS: TASK');

            tx.executeSql(sqlInstallBase);
            console.log('DB SUCCESS: INSTALLBASE');

            tx.executeSql(sqlContact);
            console.log('DB SUCCESS: CONTACT');

            tx.executeSql(sqlNote);
            console.log('DB SUCCESS: NOTE');

            tx.executeSql(sqlProject);
            console.log('DB SUCCESS: PROJECT');

            tx.executeSql(sqlOverTime);
            console.log('DB SUCCESS: OVERTIME');

            tx.executeSql(sqlShiftCode);
            console.log('DB SUCCESS: SHIFTCODE');

            tx.executeSql(sqlTime);
            console.log('DB SUCCESS: TIME');

            tx.executeSql(sqlExpense);
            console.log('DB SUCCESS: EXPENSE');

            tx.executeSql(sqlMaterial);
            console.log('DB SUCCESS: MATERIAL');

            tx.executeSql(sqlNotes);
            console.log('DB SUCCESS: NOTES');

            tx.executeSql(sqlAttachment);
            console.log('DB SUCCESS: ATTACHMENT');

            tx.executeSql(sqlEngineer);
            console.log('DB SUCCESS: ENGINEER');

        }, function (error) {

            console.log('DB INITIALIZE ERROR: ' + error.message);

        }, function () {

            console.log('DB INITIALIZED');
        });
    }

})();
