/**
 * Created by JeremiahYan on 2017/1/8.
 */

boilerAdmin.directive('pagingBar', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'E',
        templateUrl: "/directives/components/paging-bar.html",
        // link: initFlotChartSmoke($rootScope.boilerRuntime)
    };
}]);