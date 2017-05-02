'use strict';

var app = angular.module('starter', ['ngResource', 'ngRoute']);

// app.config(function($routeProvider) {
//   $routeProvider
//     .when("/", {
//       templateUrl: "src/main.html",
//       controller: 'AppController'
//     })
// });

app.controller('AppController', function($scope, $resource) {

  var Project = $resource('/api/projects/:project_id', {
      project_id: '@id'
    },
    // PUT is not a bulid-in http method in ngResource
    {
      update: {
        method: 'PUT'
      }
    }
  )
  // need to declare in first use in side controller
  // unless we cannot access editProject via $scope
  $scope.editProject = {};
  $scope.result = {};
  $scope.projects = Project.query()
  $scope.get = function(id) {
    // bear in function argument = result of Project.get().
    // bear = Project.get({project_id})
    Project.get({
      project_id: id
    }, function(project) {
      $scope.result = "{\"stdid\":"+project.stdid+',\"name\":\"'+project.name+'\",\"score\":'+project.score+',\"adds\":\"'+project.adds+',\"email\":\"'+project.email+"}"
      console.log(project)
      console.log('result stdid = ' + project.stdid)
    })
  }
  $scope.edit = function(id) {
    Project.get({
      project_id: id
    }, function(project) {
      $scope.editProject.id = id
      $scope.editProject.stdid = project.stdid
      $scope.editProject.name = project.name
      $scope.editProject.score = project.score
	  $scope.editProject.adds = project.adds
      $scope.editProject.email = project.email
      $scope.result = 'Edit Student ' + id
      console.log('result stdid = ' +   $scope.result)
      $scope.get(id)
    })
  }
  $scope.update = function(id) {
    if ($scope.editProject.stdid != '') {
      Project.update({
        project_id: id
      }, {
        stdid: $scope.editProject.stdid,
        name: $scope.editProject.name,
        score: $scope.editProject.score,
		adds: $scope.editProject.adds,
        email: $scope.editProject.email
      });
      $scope.result = 'Project ' + id + ' is updated'
      console.log('result stdid = ' +   $scope.result)
      $scope.projects = Project.query();
      $scope.get(id)
    } else {
      $scope.result = 'Please enter updating bear by Select Edit button'
    }
  }
  $scope.delete = function(id) {
    Project.delete({
      project_id: id
    })
    $scope.result = 'Studen ' + id + ' is deleted'
    console.log('result stdid = ' +   $scope.result)
    $scope.projects = Project.query();
  }
  $scope.add = function() {
    Project.save({
      stdid: $scope.addProject.stdid,
      name: $scope.addProject.name,
      score: $scope.addProject.score,
	  adds: $scope.addProject.adds,
      email: $scope.addProject.email
    })
    $scope.result = 'Studen ' + id + ' is created'
    console.log('result stdid = ' +   $scope.result)
    $scope.projects = Project.query();
  };

  // ======= function for front-end display with Angular ====
  $scope.isEmpty = function(obj) {
    return Object.keys(obj).length == 0;
  }
  $scope.select = function(id, obj) {
    return id == obj.id
  }


});
