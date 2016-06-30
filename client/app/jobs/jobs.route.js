'use strict';

angular.module('angularFullstackApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('jobs', {
        url: '/jobs',
        template: '<div ui-view></div>',
        abstract: true
      })
      .state('jobs.all', {
        url: '/',
        templateUrl: 'app/jobs/jobs.html',
        controller: 'JobsController',
        controllerAs: 'vm',
      })
      .state('jobs.type', {
        url: '/:jobType',
        templateUrl: 'app/jobs/jobs.html',
        controller: 'JobsController',
        controllerAs: 'vm'
      });
  });
