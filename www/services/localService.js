(function () {

    "use strict";

    app.factory("localService", localService);

    localService.$inject = ["$http", "$rootScope", "$window", "$location"];

    function localService($http, $rootScope, $window, $location) {

        var service = {};

        var db;

        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {

            if ($rootScope.local) {

                db = sqlitePlugin.openDatabase({
                    name: "emerson.sqlite",
                    location: "default"
                });
            }
        }

        service.getUser = getUser;
        service.insertUser = insertUser;
        service.updateUser = updateUser;
        service.deleteUser = deleteUser;

        service.insertTaskList = insertTaskList;
        service.insertInstallBaseList = insertInstallBaseList;
        service.insertContactList = insertContactList;
        service.insertNoteList = insertNoteList;
        service.insertProjectList = insertProjectList;
        service.insertOverTimeList = insertOverTimeList;
        service.insertShiftCodeList = insertShiftCodeList;

        service.insertTimeList = insertTimeList;
        service.insertExpenseList = insertExpenseList;
        service.insertMaterialList = insertMaterialList;
        service.insertNotesList = insertNotesList;
        service.insertAttachmentList = insertAttachmentList;
        service.insertEngineerList = insertEngineerList;

        service.getTaskList = getTaskList;
        service.getInstallBaseList = getInstallBaseList;
        service.getContactList = getContactList;
        service.getNoteList = getNoteList;
        service.getProjectList = getProjectList;
        service.getOverTimeList = getOverTimeList;
        service.getShiftCodeList = getShiftCodeList;

        service.getTimeList = getTimeList;
        service.getExpenseList = getExpenseList;
        service.getMaterialList = getMaterialList;
        service.getNotesList = getNotesList;
        service.getAttachmentList = getAttachmentList;
        service.getEngineer = getEngineer;

        return service;

        function insertTaskList(response) {

            var responseList = response.TaskDetails;

            for (var i = 0; i < responseList.length; i++) {

                (function (i) {

                    if (i < responseList.length - 1) {

                        updateTask(responseList[i]);

                        insertTask(responseList[i]);

                    } else {

                        updateTask(responseList[i]);

                        insertTask(responseList[i]);
                    }

                    console.log("TASK OBJECT =====> " + JSON.stringify(responseList[i]));

                })(i);
            }
        };

        function updateTask(responseList) {

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlUpdate = "UPDATE Task SET Job_Description = ?, Duration = ?, Task_Status = ?, Customer_Name =?, Street_Address = ?, City = ?, State = ?, Zip_Code = ?, Expense_Method = ?, Labor_Method = ?, Travel_Method = ?, Material_Method = ?, Service_Request = ?, Assigned = ?, Start_Date = ?, End_Date = ?  WHERE Task_Number = ?";

                insertValues.push(responseList.Job_Description);
                insertValues.push(responseList.Duration);
                insertValues.push(responseList.Task_Status);
                insertValues.push(responseList.Customer_Name);
                insertValues.push(responseList.Street_Address);
                insertValues.push(responseList.City);
                insertValues.push(responseList.State);
                insertValues.push(responseList.Zip_Code);
                insertValues.push(responseList.Expense_Method);
                insertValues.push(responseList.Labor_Method);
                insertValues.push(responseList.Travel_Method);
                insertValues.push(responseList.Material_Method);
                insertValues.push(responseList.Service_Request);
                insertValues.push(responseList.Assigned);
                insertValues.push(responseList.Start_Date);
                insertValues.push(responseList.End_Date);
                insertValues.push(responseList.Task_Number);

                // console.log("TASK UPDATE VALUES =====> " + insertValues);

                transaction.executeSql(sqlUpdate, insertValues, function (tx, res) {

                    console.log("TASK ROW AFFECTED: " + res.rowsAffected);

                }, function (tx, error) {

                    console.log("TASK UPDATE ERROR: " + error.message);
                });

            }, function (error) {

                console.log("TASK UPDATE TRANSACTION ERROR: " + error.message);
            });
        };

        function insertTask(responseList) {

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlInsert = "INSERT INTO Task VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

                insertValues.push(responseList.Task_Number);
                insertValues.push(responseList.Job_Description);
                insertValues.push(responseList.Duration);
                insertValues.push(responseList.Task_Status);
                insertValues.push(responseList.Customer_Name);
                insertValues.push(responseList.Street_Address);
                insertValues.push(responseList.City);
                insertValues.push(responseList.State);
                insertValues.push(responseList.Zip_Code);
                insertValues.push(responseList.Expense_Method);
                insertValues.push(responseList.Labor_Method);
                insertValues.push(responseList.Travel_Method);
                insertValues.push(responseList.Material_Method);
                insertValues.push(responseList.Service_Request);
                insertValues.push(responseList.Assigned);
                insertValues.push(responseList.Start_Date);
                insertValues.push(responseList.End_Date);

                // console.log("TASK INSERT VALUES =====> " + insertValues);

                transaction.executeSql(sqlInsert, insertValues, function (tx, res) {

                    console.log("TASK INSERT ID: " + res.insertId);

                }, function (tx, error) {

                    console.log("TASK INSERT ERROR: " + error.message);
                });

            }, function (error) {

                console.log("TASK INSERT TRANSACTION ERROR: " + error.message);
            });
        };

        function insertInstallBaseList(response) {

            var responseList = response.InstallBase;

            for (var i = 0; i < responseList.length; i++) {

                (function (i) {

                    if (i < responseList.length - 1) {

                        updateInstallBase(responseList[i]);

                        insertInstallBase(responseList[i]);

                    } else {

                        updateInstallBase(responseList[i]);

                        insertInstallBase(responseList[i]);
                    }

                    console.log("INSTALLBASE OBJECT =====> " + JSON.stringify(responseList));

                })(i);
            }
        };

        function updateInstallBase(responseList) {

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlUpdate = "UPDATE InstallBase SET Product_Line = ?, Serial_Number = ?, TagNumber = ?, Original_PO_Number =?, Task_Number = ?, Service_Request = ?, Assigned = ?, Start_Date = ?, End_Date = ?  WHERE Installed_Base_ID = ?";

                insertValues.push(responseList.Product_Line);
                insertValues.push(responseList.Serial_Number);
                insertValues.push(responseList.TagNumber);
                insertValues.push(responseList.Original_PO_Number);
                insertValues.push(responseList.Task_Number);
                insertValues.push(responseList.Service_Request);
                insertValues.push(responseList.Assigned);
                insertValues.push(responseList.Start_Date);
                insertValues.push(responseList.End_Date);
                insertValues.push(responseList.Installed_Base_ID);

                // console.log("INSTALLBASE UPDATE VALUES =====> " + insertValues);

                transaction.executeSql(sqlUpdate, insertValues, function (tx, res) {

                    console.log("INSTALLBASE ROW AFFECTED: " + res.rowsAffected);

                }, function (tx, error) {

                    console.log("INSTALLBASE UPDATE ERROR: " + error.message);
                });

            }, function (error) {

                console.log("INSTALLBASE UPDATE TRANSACTION ERROR: " + error.message);
            });
        };

        function insertInstallBase(responseList) {

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlInsert = "INSERT INTO InstallBase VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

                insertValues.push(responseList.Installed_Base_ID);
                insertValues.push(responseList.Product_Line);
                insertValues.push(responseList.Serial_Number);
                insertValues.push(responseList.TagNumber);
                insertValues.push(responseList.Original_PO_Number);
                insertValues.push(responseList.Task_Number);
                insertValues.push(responseList.Service_Request);
                insertValues.push(responseList.Assigned);
                insertValues.push(responseList.Start_Date);
                insertValues.push(responseList.End_Date);

                // console.log("INSTALLBASE INSERT VALUES =====> " + insertValues);

                transaction.executeSql(sqlInsert, insertValues, function (tx, res) {

                    console.log("INSTALLBASE INSERT ID: " + res.insertId);

                }, function (tx, error) {

                    console.log("INSTALLBASE INSERT ERROR: " + error.message);
                });

            }, function (error) {

                console.log("INSTALLBASE INSERT TRANSACTION ERROR: " + error.message);
            });
        };

        function insertContactList(response) {

            var responseList = response.Contacts;

            for (var i = 0; i < responseList.length; i++) {

                (function (i) {

                    if (i < responseList.length - 1) {

                        updateContact(responseList[i]);

                        insertContact(responseList[i]);

                    } else {

                        updateContact(responseList[i]);

                        insertContact(responseList[i]);
                    }

                    console.log("CONTACT OBJECT =====> " + JSON.stringify(responseList));

                })(i);
            }
        };

        function updateContact(responseList) {

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlUpdate = "UPDATE Contact SET Customer_Name = ?, Contact_Name = ?, Home_Phone = ?, Mobile_Phone =?, Fax_Phone = ?, Office_Phone = ?, Email = ?, Foreign_Key = ?, Task_Number = ?, Service_Request = ?, Assigned = ?, Start_Date = ?, End_Date = ?  WHERE Contact_ID = ?";

                insertValues.push(responseList.Customer_Name);
                insertValues.push(responseList.Contact_Name);
                insertValues.push(responseList.Home_Phone);
                insertValues.push(responseList.Mobile_Phone);
                insertValues.push(responseList.Fax_Phone);
                insertValues.push(responseList.Office_Phone);
                insertValues.push(responseList.Email);
                insertValues.push(responseList.Foreign_Key);
                insertValues.push(responseList.Task_Number);
                insertValues.push(responseList.Service_Request);
                insertValues.push(responseList.Assigned);
                insertValues.push(responseList.Start_Date);
                insertValues.push(responseList.End_Date);
                insertValues.push(responseList.Contact_ID);

                // console.log("CONTACT UPDATE VALUES =====> " + insertValues);

                transaction.executeSql(sqlUpdate, insertValues, function (tx, res) {

                    console.log("CONTACT ROW AFFECTED: " + res.rowsAffected);

                }, function (tx, error) {

                    console.log("CONTACT UPDATE ERROR: " + error.message);
                });

            }, function (error) {

                console.log("CONTACT UPDATE TRANSACTION ERROR: " + error.message);
            });
        };

        function insertContact(responseList) {

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlInsert = "INSERT INTO Contact VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

                insertValues.push(responseList.Contact_ID);
                insertValues.push(responseList.Customer_Name);
                insertValues.push(responseList.Contact_Name);
                insertValues.push(responseList.Home_Phone);
                insertValues.push(responseList.Mobile_Phone);
                insertValues.push(responseList.Fax_Phone);
                insertValues.push(responseList.Office_Phone);
                insertValues.push(responseList.Email);
                insertValues.push(responseList.Foreign_Key);
                insertValues.push(responseList.Task_Number);
                insertValues.push(responseList.Service_Request);
                insertValues.push(responseList.Assigned);
                insertValues.push(responseList.Start_Date);
                insertValues.push(responseList.End_Date);

                // console.log("CONTACT INSERT VALUES =====> " + insertValues);

                transaction.executeSql(sqlInsert, insertValues, function (tx, res) {

                    console.log("CONTACT INSERT ID: " + res.insertId);

                }, function (tx, error) {

                    console.log("CONTACT INSERT ERROR: " + error.message);
                });

            }, function (error) {

                console.log("CONTACT INSERT TRANSACTION ERROR: " + error.message);
            });
        };

        function insertNoteList(response) {

            var responseList = response.Notes;

            for (var i = 0; i < responseList.length; i++) {

                (function (i) {

                    if (i < responseList.length - 1) {

                        updateNote(responseList[i]);

                        insertNote(responseList[i]);

                    } else {

                        updateNote(responseList[i]);

                        insertNote(responseList[i]);
                    }

                    console.log("NOTE OBJECT =====> " + JSON.stringify(responseList));

                })(i);
            }
        };

        function updateNote(responseList) {

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlUpdate = "UPDATE Note SET Notes = ?, Notes_type = ?, Created_By = ?, Task_Number =?, Service_Request = ?, Assigned = ?, Start_Date = ?, End_Date = ?  WHERE ID = ?";

                insertValues.push(responseList.Notes);
                insertValues.push(responseList.Notes_type);
                insertValues.push(responseList.Created_By);
                insertValues.push(responseList.Task_Number);
                insertValues.push(responseList.Service_Request);
                insertValues.push(responseList.Assigned);
                insertValues.push(responseList.Start_Date);
                insertValues.push(responseList.End_Date);
                insertValues.push(responseList.ID);

                // console.log("NOTE UPDATE VALUES =====> " + insertValues);

                transaction.executeSql(sqlUpdate, insertValues, function (tx, res) {

                    console.log("NOTE ROW AFFECTED: " + res.rowsAffected);

                }, function (tx, error) {

                    console.log("NOTE UPDATE ERROR: " + error.message);
                });

            }, function (error) {

                console.log("NOTE UPDATE TRANSACTION ERROR: " + error.message);
            });
        };

        function insertNote(responseList) {

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlInsert = "INSERT INTO Note VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

                insertValues.push(responseList.ID);
                insertValues.push(responseList.Notes);
                insertValues.push(responseList.Notes_type);
                insertValues.push(responseList.Created_By);
                insertValues.push(responseList.Task_Number);
                insertValues.push(responseList.Service_Request);
                insertValues.push(responseList.Assigned);
                insertValues.push(responseList.Start_Date);
                insertValues.push(responseList.End_Date);

                // console.log("NOTE INSERT VALUES =====> " + insertValues);

                transaction.executeSql(sqlInsert, insertValues, function (tx, res) {

                    console.log("Note INSERT ID: " + res.insertId);

                }, function (tx, error) {

                    console.log("NOTE INSERT ERROR: " + error.message);
                });

            }, function (error) {

                console.log("NOTE INSERT TRANSACTION ERROR: " + error.message);
            });
        };

        function insertProjectList(response) {

            var responseList = response.Project;

            for (var i = 0; i < responseList.length; i++) {

                (function (i) {

                    if (i < responseList.length - 1) {

                        insertProject(responseList[i]);

                        updateProject(responseList[i]);

                    } else {

                        insertProject(responseList[i]);

                        updateProject(responseList[i]);
                    }

                    console.log("PROJECT OBJECT =====> " + JSON.stringify(responseList[i]));

                })(i);
            }
        };

        function updateProject(responseList) {

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlUpdate = "UPDATE Project SET Clarity_Contact = ?, P_ProjectManager = ?, P_Company = ?, P_ProjectNumber =?, Requested = ?  WHERE ID = ?";

                insertValues.push(responseList.Clarity_Contact);
                insertValues.push(responseList.P_ProjectManager);
                insertValues.push(responseList.P_Company);
                insertValues.push(responseList.P_ProjectNumber);
                insertValues.push(responseList.Requested);
                insertValues.push(responseList.ID);

                // console.log("PROJECT UPDATE VALUES =====> " + insertValues);

                transaction.executeSql(sqlUpdate, insertValues, function (tx, res) {

                    console.log("PROJECT ROW AFFECTED: " + res.rowsAffected);

                }, function (tx, error) {

                    console.log("PROJECT UPDATE ERROR: " + error.message);
                });

            }, function (error) {

                console.log("PROJECT UPDATE TRANSACTION ERROR: " + error.message);
            });
        };

        function insertProject(responseList) {

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlInsert = "INSERT INTO Project VALUES (?, ?, ?, ?, ?, ?)";

                insertValues.push(responseList.ID);
                insertValues.push(responseList.Clarity_Contact);
                insertValues.push(responseList.P_ProjectManager);
                insertValues.push(responseList.P_Company);
                insertValues.push(responseList.P_ProjectNumber);
                insertValues.push(responseList.Requested);

                // console.log("PROJECT INSERT VALUES =====> " + insertValues);

                transaction.executeSql(sqlInsert, insertValues, function (tx, res) {

                    console.log("PROJECT INSERT ID: " + res.insertId);

                }, function (tx, error) {

                    console.log("PROJECT INSERT ERROR: " + error.message);
                });

            }, function (error) {

                console.log("PROJECT INSERT TRANSACTION ERROR: " + error.message);
            });
        };

        function insertOverTimeList(response) {

            var responseList = response.OverTImeShiftCode;

            for (var i = 0; i < responseList.length; i++) {

                (function (i) {

                    if (i < responseList.length - 1) {

                        updateOverTime(responseList[i]);

                        insertOverTime(responseList[i]);

                    } else {

                        updateOverTime(responseList[i]);

                        insertOverTime(responseList[i]);
                    }

                    console.log("OVERTIME OBJECT =====> " + JSON.stringify(responseList[i]));

                })(i);
            }
        };

        function updateOverTime(responseList) {

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlUpdate = "UPDATE OverTime SET ShiftCode = ?, Project = ?  WHERE ID = ?";

                insertValues.push(responseList.ShiftCode);
                insertValues.push(responseList.Project);
                insertValues.push(responseList.ID);

                // console.log("OVERTIME UPDATE VALUES =====> " + insertValues);

                transaction.executeSql(sqlUpdate, insertValues, function (tx, res) {

                    console.log("OVERTIME ROW AFFECTED: " + res.rowsAffected);

                }, function (tx, error) {

                    console.log("OVERTIME UPDATE ERROR: " + error.message);
                });

            }, function (error) {

                console.log("OVERTIME UPDATE TRANSACTION ERROR: " + error.message);
            });
        };

        function insertOverTime(responseList) {

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlInsert = "INSERT INTO OverTime VALUES (?, ?, ?)";

                insertValues.push(responseList.ID);
                insertValues.push(responseList.ShiftCode);
                insertValues.push(responseList.Project);

                // console.log("OVERTIME INSERT VALUES =====> " + insertValues);

                transaction.executeSql(sqlInsert, insertValues, function (tx, res) {

                    console.log("OVERTIME INSERT ID: " + res.insertId);

                }, function (tx, error) {

                    console.log("OVERTIME INSERT ERROR: " + error.message);
                });

            }, function (error) {

                console.log("OVERTIME INSERT TRANSACTION ERROR: " + error.message);
            });
        };

        function insertShiftCodeList(response) {

            var responseList = response.ShiftCode;

            for (var i = 0; i < responseList.length; i++) {

                (function (i) {

                    if (i < responseList.length - 1) {

                        updateShiftCode(responseList[i]);

                        insertShiftCode(responseList[i]);

                    } else {

                        updateShiftCode(responseList[i]);

                        insertShiftCode(responseList[i]);
                    }

                    console.log("SHIFTCODE OBJECT =====> " + JSON.stringify(responseList[i]));

                })(i);
            }
        };

        function updateShiftCode(responseList) {

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlUpdate = "UPDATE ShiftCode SET ShiftCode = ?, Project = ?  WHERE ID = ?";

                insertValues.push(responseList.ShiftCode);
                insertValues.push(responseList.Project);
                insertValues.push(responseList.ID);

                // console.log("SHIFTCODE UPDATE VALUES =====> " + insertValues);

                transaction.executeSql(sqlUpdate, insertValues, function (tx, res) {

                    console.log("SHIFTCODE ROW AFFECTED: " + res.rowsAffected);

                }, function (tx, error) {

                    console.log("SHIFTCODE UPDATE ERROR: " + error.message);
                });

            }, function (error) {

                console.log("SHIFTCODE UPDATE TRANSACTION ERROR: " + error.message);
            });
        };

        function insertShiftCode(responseList) {

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlInsert = "INSERT INTO ShiftCode VALUES (?, ?, ?)";

                insertValues.push(responseList.ID);
                insertValues.push(responseList.ShiftCode);
                insertValues.push(responseList.Project);

                // console.log("SHIFTCODE INSERT VALUES =====> " + insertValues);

                transaction.executeSql(sqlInsert, insertValues, function (tx, res) {

                    console.log("SHIFTCODE INSERT ID: " + res.insertId);

                }, function (tx, error) {

                    console.log("SHIFTCODE INSERT ERROR: " + error.message);
                });

            }, function (error) {

                console.log("SHIFTCODE INSERT TRANSACTION ERROR: " + error.message);
            });
        };

        function insertTimeList(response) {

            var responseList = response;

            for (var i = 0; i < responseList.length; i++) {

                (function (i) {

                    if (i < responseList.length - 1) {

                        updateTime(responseList[i]);

                        insertTime(responseList[i]);

                    } else {

                        updateTime(responseList[i]);

                        insertTime(responseList[i]);
                    }

                })(i);
            }
        };

        function updateTime(responseList) {

            console.log("TIME UPDATE OBJECT =====> " + JSON.stringify(responseList));

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlUpdate = "UPDATE Time SET timeDefault = ?, Field_Job_Name = ?, Charge_Type = ?, Charge_Method = ?, Work_Type =?, Item = ?, Description = ?, Time_Code = ?, Shift_Code = ?, Date = ?, Duration = ?, Comments = ?, Task_Number = ?  WHERE Time_Id = ?";

                insertValues.push(responseList.timeDefault);
                insertValues.push(responseList.Field_Job_Name);
                insertValues.push(responseList.Charge_Type);
                insertValues.push(responseList.Charge_Method);
                insertValues.push(responseList.Work_Type);
                insertValues.push(responseList.Item);
                insertValues.push(responseList.Description);
                insertValues.push(responseList.Time_Code);
                insertValues.push(responseList.Shift_Code);
                insertValues.push(responseList.Date);
                insertValues.push(responseList.Duration);
                insertValues.push(responseList.Comments);
                insertValues.push(responseList.Task_Number);
                insertValues.push(responseList.Time_Id);

                // console.log("TIME UPDATE VALUES =====> " + insertValues);

                transaction.executeSql(sqlUpdate, insertValues, function (tx, res) {

                    console.log("TIME ROW AFFECTED: " + res.rowsAffected);

                }, function (tx, error) {

                    console.log("TIME UPDATE ERROR: " + error.message);
                });

            }, function (error) {

                console.log("TIME UPDATE TRANSACTION ERROR: " + error.message);
            });
        };

        function insertTime(responseList) {

            console.log("TIME INSERT OBJECT =====> " + JSON.stringify(responseList));

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlInsert = "INSERT INTO Time VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

                insertValues.push(responseList.Time_Id);
                insertValues.push(responseList.timeDefault);
                insertValues.push(responseList.Field_Job_Name);
                insertValues.push(responseList.Charge_Type);
                insertValues.push(responseList.Charge_Method);
                insertValues.push(responseList.Work_Type);
                insertValues.push(responseList.Item);
                insertValues.push(responseList.Description);
                insertValues.push(responseList.Time_Code);
                insertValues.push(responseList.Shift_Code);
                insertValues.push(responseList.Date);
                insertValues.push(responseList.Duration);
                insertValues.push(responseList.Comments);
                insertValues.push(responseList.Task_Number);

                // console.log("TIME INSERT VALUES =====> " + insertValues);

                transaction.executeSql(sqlInsert, insertValues, function (tx, res) {

                    console.log("TIME INSERT ID: " + res.insertId);

                }, function (tx, error) {

                    console.log("TIME INSERT ERROR: " + error.message);
                });

            }, function (error) {

                console.log("TIME INSERT TRANSACTION ERROR: " + error.message);
            });
        };

        function insertExpenseList(response) {

            var responseList = response;

            for (var i = 0; i < responseList.length; i++) {

                (function (i) {

                    if (i < responseList.length - 1) {

                        updateExpense(responseList[i]);

                        insertExpense(responseList[i]);

                    } else {

                        updateExpense(responseList[i]);

                        insertExpense(responseList[i]);
                    }

                })(i);
            }
        };

        function updateExpense(responseList) {

            console.log("EXPENSE UPDATE OBJECT =====> " + JSON.stringify(responseList));

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlUpdate = "UPDATE Expense SET expenseDefault = ?, Date = ?, Expense_Type = ?, Amount = ?, Currency =?, Charge_Method = ?, Justification = ?, Task_Number = ?  WHERE Expense_Id = ?";

                insertValues.push(responseList.expenseDefault);
                insertValues.push(responseList.Date);
                insertValues.push(responseList.Expense_Type);
                insertValues.push(responseList.Amount);
                insertValues.push(responseList.Currency);
                insertValues.push(responseList.Charge_Method);
                insertValues.push(responseList.Justification);
                insertValues.push(responseList.Task_Number);
                insertValues.push(responseList.Expense_Id);

                // console.log("EXPENSE UPDATE VALUES =====> " + insertValues);

                transaction.executeSql(sqlUpdate, insertValues, function (tx, res) {

                    console.log("EXPENSE ROW AFFECTED: " + res.rowsAffected);

                }, function (tx, error) {

                    console.log("EXPENSE UPDATE ERROR: " + error.message);
                });

            }, function (error) {

                console.log("EXPENSE UPDATE TRANSACTION ERROR: " + error.message);
            });
        };

        function insertExpense(responseList) {

            console.log("EXPENSE INSERT OBJECT =====> " + JSON.stringify(responseList));

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlInsert = "EXPENSE INTO Expense VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

                insertValues.push(responseList.Expense_Id);
                insertValues.push(responseList.expenseDefault);
                insertValues.push(responseList.Date);
                insertValues.push(responseList.Expense_Type);
                insertValues.push(responseList.Amount);
                insertValues.push(responseList.Currency);
                insertValues.push(responseList.Charge_Method);
                insertValues.push(responseList.Justification);
                insertValues.push(responseList.Task_Number);

                // console.log("EXPENSE INSERT VALUES =====> " + insertValues);

                transaction.executeSql(sqlInsert, insertValues, function (tx, res) {

                    console.log("EXPENSE INSERT ID: " + res.insertId);

                }, function (tx, error) {

                    console.log("EXPENSE INSERT ERROR: " + error.message);
                });

            }, function (error) {

                console.log("EXPENSE INSERT TRANSACTION ERROR: " + error.message);
            });
        };

        function insertMaterialList(response) {

            var responseList = response;

            for (var i = 0; i < responseList.length; i++) {

                (function (i) {

                    if (i < responseList.length - 1) {

                        updateMaterial(responseList[i]);

                        insertMaterial(responseList[i]);

                    } else {

                        updateMaterial(responseList[i]);

                        insertMaterial(responseList[i]);
                    }

                })(i);
            }
        };

        function updateMaterial(responseList) {

            console.log("MATERIAL UPDATE OBJECT =====> " + JSON.stringify(responseList));

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlUpdate = "UPDATE Material SET materialDefault = ?, Charge_Type = ?, Description = ?, Product_Quantity = ?, Serial_Type = ?, Task_Number = ?  WHERE Material_Id = ?";

                insertValues.push(responseList.materialDefault);
                insertValues.push(responseList.Charge_Type);
                insertValues.push(responseList.Description);
                insertValues.push(responseList.Product_Quantity);
                insertValues.push(responseList.Serial_Type);
                insertValues.push(responseList.Task_Number);
                insertValues.push(responseList.Material_Id);

                // console.log("MATERIAL UPDATE VALUES =====> " + insertValues);

                transaction.executeSql(sqlUpdate, insertValues, function (tx, res) {

                    console.log("MATERIAL ROW AFFECTED: " + res.rowsAffected);

                }, function (tx, error) {

                    console.log("MATERIAL UPDATE ERROR: " + error.message);
                });

            }, function (error) {

                console.log("MATERIAL UPDATE TRANSACTION ERROR: " + error.message);
            });
        };

        function insertMaterial(responseList) {

            console.log("MATERIAL INSERT OBJECT =====> " + JSON.stringify(responseList));

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlInsert = "INSERT INTO Material VALUES (?, ?, ?, ?, ?, ?, ?)";

                insertValues.push(responseList.Material_Id);
                insertValues.push(responseList.materialDefault);
                insertValues.push(responseList.Charge_Type);
                insertValues.push(responseList.Description);
                insertValues.push(responseList.Product_Quantity);
                insertValues.push(responseList.Serial_Type);
                insertValues.push(responseList.Task_Number);

                // console.log("MATERIAL INSERT VALUES =====> " + insertValues);

                transaction.executeSql(sqlInsert, insertValues, function (tx, res) {

                    console.log("MATERIAL INSERT ID: " + res.insertId);

                }, function (tx, error) {

                    console.log("MATERIAL INSERT ERROR: " + error.message);
                });

            }, function (error) {

                console.log("MATERIAL INSERT TRANSACTION ERROR: " + error.message);
            });
        };

        function insertNotesList(response) {

            var responseList = response;

            for (var i = 0; i < responseList.length; i++) {

                (function (i) {

                    if (i < responseList.length - 1) {

                        updateNotes(responseList[i]);

                        insertNotes(responseList[i]);

                    } else {

                        updateNotes(responseList[i]);

                        insertNotes(responseList[i]);
                    }

                })(i);
            }
        };

        function updateNotes(responseList) {

            console.log("NOTES UPDATE OBJECT =====> " + JSON.stringify(responseList));

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlUpdate = "UPDATE Notes SET noteDefault = ?, Note_Type = ?, Date = ?, Created_By = ?, Notes =?, Task_Number = ?  WHERE Notes_Id = ?";

                insertValues.push(responseList.noteDefault);
                insertValues.push(responseList.Note_Type);
                insertValues.push(responseList.Date);
                insertValues.push(responseList.Created_By);
                insertValues.push(responseList.Notes);
                insertValues.push(responseList.Task_Number);
                insertValues.push(responseList.Notes_Id);

                // console.log("NOTES UPDATE VALUES =====> " + insertValues);

                transaction.executeSql(sqlUpdate, insertValues, function (tx, res) {

                    console.log("NOTES ROW AFFECTED: " + res.rowsAffected);

                }, function (tx, error) {

                    console.log("NOTES UPDATE ERROR: " + error.message);
                });

            }, function (error) {

                console.log("NOTES UPDATE TRANSACTION ERROR: " + error.message);
            });
        };

        function insertNotes(responseList) {

            console.log("NOTES INSERT OBJECT =====> " + JSON.stringify(responseList));

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlInsert = "INSERT INTO Notes VALUES (?, ?, ?, ?, ?, ?, ?)";

                insertValues.push(responseList.Notes_Id);
                insertValues.push(responseList.noteDefault);
                insertValues.push(responseList.Note_Type);
                insertValues.push(responseList.Date);
                insertValues.push(responseList.Created_By);
                insertValues.push(responseList.Notes);
                insertValues.push(responseList.Task_Number);

                // console.log("NOTES INSERT VALUES =====> " + insertValues);

                transaction.executeSql(sqlInsert, insertValues, function (tx, res) {

                    console.log("NOTES INSERT ID: " + res.insertId);

                }, function (tx, error) {

                    console.log("NOTES INSERT ERROR: " + error.message);
                });

            }, function (error) {

                console.log("NOTES INSERT TRANSACTION ERROR: " + error.message);
            });
        };

        function insertAttachmentList(response) {

            var responseList = response;

            for (var i = 0; i < responseList.length; i++) {

                (function (i) {

                    if (i < responseList.length - 1) {

                        updateAttachment(responseList[i]);

                        insertAttachment(responseList[i]);

                    } else {

                        updateAttachment(responseList[i]);

                        insertAttachment(responseList[i]);
                    }

                })(i);
            }
        };

        function updateAttachment(responseList) {

            console.log("ATTACHMENT UPDATE OBJECT =====> " + JSON.stringify(responseList));

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlUpdate = "UPDATE Attachment SET File_Name = ?, File_Path = ?, Task_Number = ?  WHERE Attachment_Id = ?";

                insertValues.push(responseList.File_Name);
                insertValues.push(responseList.File_Path);
                insertValues.push(responseList.Task_Number);
                insertValues.push(responseList.Attachment_Id);

                // console.log("ATTACHMENT UPDATE VALUES =====> " + insertValues);

                transaction.executeSql(sqlUpdate, insertValues, function (tx, res) {

                    console.log("ATTACHMENT ROW AFFECTED: " + res.rowsAffected);

                }, function (tx, error) {

                    console.log("ATTACHMENT UPDATE ERROR: " + error.message);
                });

            }, function (error) {

                console.log("ATTACHMENT UPDATE TRANSACTION ERROR: " + error.message);
            });
        };

        function insertAttachment(responseList) {

            console.log("ATTACHMENT INSERT OBJECT =====> " + JSON.stringify(responseList));

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlInsert = "INSERT INTO Attachment VALUES (?, ?, ?, ?, ?, ?)";

                insertValues.push(responseList.Attachment_Id);
                insertValues.push(responseList.File_Name);
                insertValues.push(responseList.File_Path);
                insertValues.push(responseList.Task_Number);

                // console.log("ATTACHMENT INSERT VALUES =====> " + insertValues);

                transaction.executeSql(sqlInsert, insertValues, function (tx, res) {

                    console.log("ATTACHMENT INSERT ID: " + res.insertId);

                }, function (tx, error) {

                    console.log("ATTACHMENT INSERT ERROR: " + error.message);
                });

            }, function (error) {

                console.log("ATTACHMENT INSERT TRANSACTION ERROR: " + error.message);
            });
        };

        function insertEngineerList(responseList) {

            updateEngineer(responseList);

            insertEngineer(responseList);

        };

        function updateEngineer(responseList) {

            console.log("ENGINEER UPDATE OBJECT =====> " + JSON.stringify(responseList));

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlUpdate = "UPDATE Engineer SET Follow_Up = ?, Spare_Quote= ?, Sales_Visit = ?, Sales_Head =?, Sign_File_Path =?, File_Name =?, Task_Number = ?  WHERE Engineer_Id = ?";

                insertValues.push(responseList.Follow_Up);
                insertValues.push(responseList.Spare_Quote);
                insertValues.push(responseList.Sales_Visit);
                insertValues.push(responseList.Sales_Head);
                insertValues.push(responseList.Sign_File_Path);
                insertValues.push(responseList.File_Name);
                insertValues.push(responseList.Task_Number);
                insertValues.push(responseList.Engineer_Id);

                // console.log("ENGINEER UPDATE VALUES =====> " + insertValues);

                transaction.executeSql(sqlUpdate, insertValues, function (tx, res) {

                    console.log("ENGINEER ROW AFFECTED: " + res.rowsAffected);

                }, function (tx, error) {

                    console.log("ENGINEER UPDATE ERROR: " + error.message);
                });

            }, function (error) {

                console.log("ENGINEER UPDATE TRANSACTION ERROR: " + error.message);
            });
        };

        function insertEngineer(responseList) {

            console.log("ENGINEER INSERT OBJECT =====> " + JSON.stringify(responseList));

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlInsert = "INSERT INTO Engineer VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

                insertValues.push(responseList.Engineer_Id);
                insertValues.push(responseList.Follow_Up);
                insertValues.push(responseList.Spare_Quote);
                insertValues.push(responseList.Sales_Visit);
                insertValues.push(responseList.Sales_Head);
                insertValues.push(responseList.Sign_File_Path);
                insertValues.push(responseList.File_Name);
                insertValues.push(responseList.Task_Number);

                // console.log("ENGINEER INSERT VALUES =====> " + insertValues);

                transaction.executeSql(sqlInsert, insertValues, function (tx, res) {

                    console.log("ENGINEER INSERT ID: " + res.insertId);

                }, function (tx, error) {

                    console.log("ENGINEER INSERT ERROR: " + error.message);
                });

            }, function (error) {

                console.log("ENGINEER INSERT TRANSACTION ERROR: " + error.message);
            });
        };

        function insertUser(userObject) {

            console.log("USER INSERT OBJECT =====> " + JSON.stringify(userObject));

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlInsert = "INSERT INTO User VALUES (?, ?)";

                insertValues.push(userObject.user_id);
                insertValues.push(userObject.user_name);

                // console.log("USER INSERT VALUES =====> " + insertValues);

                transaction.executeSql(sqlInsert, insertValues, function (tx, res) {

                    console.log("USER INSERT ID: " + res.insertId);

                }, function (tx, error) {

                    console.log("USER INSERT ERROR: " + error.message);
                });

            }, function (error) {

                console.log("USER INSERT TRANSACTION ERROR: " + error.message);
            });
        };

        function updateUser(userObject) {

            console.log("USER UPDATE OBJECT =====> " + JSON.stringify(userObject));

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlUpdate = "UPDATE User SET User_Name = ?  WHERE ID = ?";

                insertValues.push(userObject.user_name);
                insertValues.push(userObject.Spare_Quote);

                // console.log("USER UPDATE VALUES =====> " + insertValues);

                transaction.executeSql(sqlUpdate, insertValues, function (tx, res) {

                    console.log("USER ROW AFFECTED: " + res.rowsAffected);

                }, function (tx, error) {

                    console.log("USER UPDATE ERROR: " + error.message);
                });

            }, function (error) {

                console.log("USER UPDATE TRANSACTION ERROR: " + error.message);
            });
        };

        function deleteUser() {

            db.transaction(function (transaction) {

                var insertValues = [];

                var sqlDelete = "DELETE FROM User";

                transaction.executeSql(sqlDelete);

            }, function (error) {

                console.log("USER DELETE TRANSACTION ERROR: " + error.message);
            });
        };

        function getUser(callback) {

            var value = [];

            return db.transaction(function (transaction) {

                transaction.executeSql("SELECT * FROM User", [], function (tx, res) {

                    var leng = res.rows.length;

                    for (var i = 0; i < leng; i++) {

                        value.push(res.rows.item(i));
                    }

                    console.log("GET USER DB ==========> " + JSON.stringify(value));

                    callback(value);

                }, function (tx, error) {

                    console.log("GET USER SELECT ERROR: " + error.message);

                    callback(value);
                });

            }, function (error) {

                console.log("GET USER TRANSACTION ERROR: " + error.message);

                callback(value);
            });
        };

        function getTaskList(callback) {

            var value = [];

            return db.transaction(function (transaction) {

                transaction.executeSql("SELECT * FROM Task", [], function (tx, res) {

                    var leng = res.rows.length;

                    for (var i = 0; i < leng; i++) {

                        value.push(res.rows.item(i));
                    }

                    console.log("GET TASK DB ==========> " + JSON.stringify(value));

                    callback(value);

                }, function (tx, error) {

                    console.log("GET TASK SELECT ERROR: " + error.message);

                    callback(value);
                });

            }, function (error) {

                console.log("GET TASK TRANSACTION ERROR: " + error.message);

                callback(value);
            });
        };

        function getInstallBaseList(taskId, callback) {

            var value = [];

            return db.transaction(function (transaction) {

                transaction.executeSql("SELECT * FROM InstallBase WHERE Task_Number = ? ", [taskId], function (tx, res) {

                    var leng = res.rows.length;

                    console.log("LENGTH ==========> " + leng);

                    for (var i = 0; i < leng; i++) {

                        value.push(res.rows.item(i));
                    }

                    console.log("GET INSTALLBASE DB ==========> " + JSON.stringify(res.rows.item(0)));

                    callback(value);

                }, function (tx, error) {

                    console.log("GET INSTALLBASE SELECT ERROR: " + error.message);

                    callback(value);
                });

            }, function (error) {

                console.log("GET INSTALLBASE TRANSACTION ERROR: " + error.message);

                callback(value);
            });
        };

        function getContactList(taskId, callback) {

            var value = [];

            return db.transaction(function (transaction) {

                transaction.executeSql("SELECT * FROM Contact WHERE Task_Number = ? ", [taskId], function (tx, res) {

                    var leng = res.rows.length;

                    for (var i = 0; i < leng; i++) {

                        value.push(res.rows.item(i));
                    }

                    console.log("GET CONTACT DB ==========> " + JSON.stringify(value));

                    callback(value);

                }, function (tx, error) {

                    console.log("GET CONTACT SELECT ERROR: " + error.message);

                    callback(value);
                });

            }, function (error) {

                console.log("GET CONTACT TRANSACTION ERROR: " + error.message);

                callback(value);
            });
        };

        function getNoteList(taskId, callback) {

            var value = [];

            return db.transaction(function (transaction) {

                transaction.executeSql("SELECT * FROM Note WHERE Task_Number = ? ", [taskId], function (tx, res) {

                    var leng = res.rows.length;

                    for (var i = 0; i < leng; i++) {

                        value.push(res.rows.item(i));
                    }

                    console.log("GET NOTE DB ==========> " + JSON.stringify(value));

                    callback(value);

                }, function (tx, error) {

                    console.log("GET NOTE SELECT ERROR: " + error.message);

                    callback(value);
                });

            }, function (error) {

                console.log("GET NOTE TRANSACTION ERROR: " + error.message);

                callback(value);
            });
        };

        function getProjectList(callback) {

            var value = [];

            return db.transaction(function (transaction) {

                transaction.executeSql("SELECT * FROM Project", [], function (tx, res) {

                    var leng = res.rows.length;

                    for (var i = 0; i < leng; i++) {

                        value.push(res.rows.item(i));
                    }

                    console.log("GET PROJECT DB ==========> " + JSON.stringify(value));

                    callback(value);

                }, function (tx, error) {

                    console.log("GET PROJECT SELECT ERROR: " + error.message);

                    callback(value);
                });

            }, function (error) {

                console.log("GET PROJECT TRANSACTION ERROR: " + error.message);

                callback(value);
            });
        };

        function getOverTimeList(callback) {

            var value = [];

            return db.transaction(function (transaction) {

                transaction.executeSql("SELECT * FROM OverTime", [], function (tx, res) {

                    var leng = res.rows.length;

                    for (var i = 0; i < leng; i++) {

                        value.push(res.rows.item(i));
                    }

                    console.log("GET OVERTIME DB ==========> " + JSON.stringify(value));

                    callback(value);

                }, function (tx, error) {

                    console.log("GET OVERTIME SELECT ERROR: " + error.message);

                    callback(value);
                });

            }, function (error) {

                console.log("GET OVERTIME TRANSACTION ERROR: " + error.message);

                callback(value);
            });
        };

        function getShiftCodeList(callback) {

            var value = [];

            return db.transaction(function (transaction) {

                transaction.executeSql("SELECT * FROM ShiftCode", [], function (tx, res) {

                    var leng = res.rows.length;

                    for (var i = 0; i < leng; i++) {

                        value.push(res.rows.item(i));
                    }

                    console.log("GET SHIFTCODE DB ==========> " + JSON.stringify(value));

                    callback(value);

                }, function (tx, error) {

                    console.log("GET SHIFTCODE SELECT ERROR: " + error.message);

                    callback(value);
                });

            }, function (error) {

                console.log("GET SHIFTCODE TRANSACTION ERROR: " + error.message);

                callback(value);
            });
        };

        function getTimeList(taskId, callback) {

            var value = [];

            return db.transaction(function (transaction) {

                transaction.executeSql("SELECT * FROM Time WHERE Task_Number = ? ", [taskId], function (tx, res) {

                    var leng = res.rows.length;

                    for (var i = 0; i < leng; i++) {

                        value.push(res.rows.item(i));
                    }

                    console.log("GET TIME DB ==========> " + JSON.stringify(value));

                    callback(value);

                }, function (tx, error) {

                    console.log("GET TIME SELECT ERROR: " + error.message);

                    callback(value);
                });

            }, function (error) {

                console.log("GET TIME TRANSACTION ERROR: " + error.message);

                callback(value);
            });
        };

        function getExpenseList(taskId, callback) {

            var value = [];

            return db.transaction(function (transaction) {

                transaction.executeSql("SELECT * FROM Expense WHERE Task_Number = ? ", [taskId], function (tx, res) {

                    var leng = res.rows.length;

                    for (var i = 0; i < leng; i++) {

                        value.push(res.rows.item(i));
                    }

                    console.log("GET EXPENSE DB ==========> " + JSON.stringify(value));

                    callback(value);

                }, function (tx, error) {

                    console.log("GET EXPENSE SELECT ERROR: " + error.message);

                    callback(value);
                });

            }, function (error) {

                console.log("GET EXPENSE TRANSACTION ERROR: " + error.message);

                callback(value);
            });
        };

        function getMaterialList(taskId, callback) {

            var value = [];

            return db.transaction(function (transaction) {

                transaction.executeSql("SELECT * FROM Material WHERE Task_Number = ? ", [taskId], function (tx, res) {

                    var leng = res.rows.length;

                    for (var i = 0; i < leng; i++) {

                        value.push(res.rows.item(i));
                    }

                    console.log("GET MATERIAL DB ==========> " + JSON.stringify(value));

                    callback(value);

                }, function (tx, error) {

                    console.log("GET MATERIAL SELECT ERROR: " + error.message);

                    callback(value);
                });

            }, function (error) {

                console.log("GET MATERIAL TRANSACTION ERROR: " + error.message);

                callback(value);
            });
        };

        function getNotesList(taskId, callback) {

            var value = [];

            return db.transaction(function (transaction) {

                transaction.executeSql("SELECT * FROM Notes WHERE Task_Number = ? ", [taskId], function (tx, res) {

                    var leng = res.rows.length;

                    for (var i = 0; i < leng; i++) {

                        value.push(res.rows.item(i));
                    }

                    console.log("GET NOTES DB ==========> " + JSON.stringify(value));

                    callback(value);

                }, function (tx, error) {

                    console.log("GET NOTES SELECT ERROR: " + error.message);

                    callback(value);
                });

            }, function (error) {

                console.log("GET NOTES TRANSACTION ERROR: " + error.message);

                callback(value);
            });
        };

        function getAttachmentList(taskId, callback) {

            var value = [];

            return db.transaction(function (transaction) {

                transaction.executeSql("SELECT * FROM Attachment WHERE Task_Number = ? ", [taskId], function (tx, res) {

                    var leng = res.rows.length;

                    for (var i = 0; i < leng; i++) {

                        value.push(res.rows.item(i));
                    }

                    console.log("GET ATTACHMENT DB ==========> " + JSON.stringify(value));

                    callback(value);

                }, function (tx, error) {

                    console.log("GET ATTACHMENT SELECT ERROR: " + error.message);

                    callback(value);
                });

            }, function (error) {

                console.log("GET ATTACHMENT TRANSACTION ERROR: " + error.message);

                callback(value);
            });
        };

        function getEngineer(taskId, callback) {

            var value = [];

            return db.transaction(function (transaction) {

                transaction.executeSql("SELECT * FROM Engineer WHERE Task_Number = ? ", [taskId], function (tx, res) {

                    var leng = res.rows.length;

                    var value = res.rows.item(0);

                    console.log("GET ENGINEER DB ==========> " + JSON.stringify(value));

                    callback(value);

                }, function (tx, error) {

                    console.log("GET ENGINEER SELECT ERROR: " + error.message);

                    callback(value);
                });

            }, function (error) {

                console.log("GET ENGINEER TRANSACTION ERROR: " + error.message);

                callback(value);
            });
        };
    }

})();
