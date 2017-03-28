/// <reference path="angular.min.js" />

var myApp = angular.module("myModule", [])
                    .filter("genderFilter", function () {
                        return function (gender) {
                            if (gender == "1")
                                return "Male";
                            else if (gender == "2")
                                return "Female";
                            else
                                return "Other"
                        }
                    })
                    .controller("myController", function ($scope, $http, $interval, $location, $timeout, $log, commonFactory) {

                        $scope.employees = [{ ID: 1, name: "Hitesh", gender: "1", age: "27", joinDate: "01/01/2013", showDetail: false },
                                            { ID: 2, name: "Sara", gender: "2", age: "23", joinDate: "01/12/2013", showDetail: false },
                                            { ID: 3, name: "Rancy", gender: "2", age: "23", joinDate: "01/13/2013", showDetail: false },
                                            { ID: 4, name: "Devang", gender: "1", age: "34", joinDate: "01/23/2013", showDetail: false },
                                            { ID: 5, name: "Dev", gender: "1", age: "33", joinDate: "01/03/2013", showDetail: false },
                                            { ID: 6, name: "Nikunj", gender: "1", age: "32", joinDate: "01/12/2013", showDetail: false },
                                            { ID: 7, name: "Parixit", gender: "1", age: "30", joinDate: "05/12/2013", showDetail: false }]

                        $scope.subemployees = [{ ID: 2, name: "A", gender: "1", age: "27", joinDate: "01/01/2013" },
                                          { ID: 2, name: "B", gender: "2", age: "23", joinDate: "01/12/2013" },
                                          { ID: 2, name: "C", gender: "2", age: "23", joinDate: "01/13/2013" },
                                          { ID: 3, name: "D", gender: "1", age: "34", joinDate: "01/23/2013" },
                                          { ID: 2, name: "E", gender: "1", age: "33", joinDate: "01/03/2013" },
                                          { ID: 4, name: "F", gender: "1", age: "32", joinDate: "01/12/2013" },
                                          { ID: 4, name: "G", gender: "1", age: "30", joinDate: "05/12/2013" }]

                        $scope.ParentItemID = 0;
                        $scope.subSearch = function (ID) { return function (Item) { return ID == Item.ID; } }

                        $scope.message = "Hi, Hitesh";

                        $scope.likes = 0;
                        $scope.disLikes = 0;

                        $scope.likesClicked = function () { $scope.likes++; }
                        $scope.disLikesClicked = function () { $scope.disLikes++; }

                        $scope.pageSize = 5;
                        $scope.itemStart = 0;

                        $scope.nextClick = function () { $scope.itemStart = $scope.itemStart + $scope.pageSize >= $scope.employees.length ? $scope.itemStart : $scope.itemStart + $scope.pageSize; }
                        $scope.prevClick = function () { $scope.itemStart = $scope.itemStart - $scope.pageSize < 0 ? 0 : $scope.itemStart - $scope.pageSize; }

                        $scope.sortColumn = "name";
                        $scope.reverseOrder = false;
                        $scope.sortClick = function (columnName) {
                            if ($scope.sortColumn == columnName)
                                $scope.reverseOrder = !$scope.reverseOrder;
                            else
                                $scope.reverseOrder = false;

                            $scope.sortColumn = columnName;
                        };

                        $scope.searchText = "";
                        $scope.searchItem = function (item) {
                            if (item.name.toLowerCase().indexOf($scope.searchText) != -1)
                                return true;
                            else
                                return false;
                        }

                        var onSuccess = function (response) { $scope.myData = response.data.d.name + " " + response.data.d.surname; $log.info(response); };
                        var onError = function (response) { $log.error(response) };

                        $scope.myData = "";
                        $http.post("default.aspx/getData", { data: {} }).then(onSuccess, onerror)


                        $scope.intervalData = "";
                        $interval(function () { $scope.intervalData = new Date() }, 1000)

                        $timeout(function () { $scope.myLocation = $location.absUrl(); }, 5000)

                        $scope.showEmployeeDetails = function (item) { item.showDetail = !item.showDetail; $log.info(item); };

                        $scope.getResult = function (a, b) { $scope.result = commonFactory.getMultiplication(a, b) };

                        $scope.showAll = false;
                        $scope.showHideAll = function () { $scope.showAll = !$scope.showAll; for (var i = 0; i <= $scope.employees.length; i++) { $scope.employees[i].showDetail = $scope.showAll; }  }
                    });