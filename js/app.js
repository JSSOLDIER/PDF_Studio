/**
*  A simple PDF search and display plugin on the client for quick access 
*  This plugin is recommanded for Firefox and Chrome as they have both
*  integrated pdf readers.
*/
(function(){

	var app = angular.module('PDF_Console', []);
	
	app.controller('AppCtrl', ['$scope', function($scope){

		$scope.newFiles = [];

		$scope.deleteFile= function(id){
			$scope.newFiles.splice(id,1);
			var i=0;
			$scope.$apply(
				angular.forEach($scope.newFiles, function(value){
					value.id = i;
					i++;
				})
			);
		};	
	}]);

	app.directive('fileInput',['$parse',function($parse){
		return {
			restrict: 'A',
			link: function(scope,elm,attrs){
				elm.bind('change', function(){
					scope.newFiles = [];
					$parse(attrs.fileInput)
					.assign(scope.newFiles, elm[0].files)
					angular.forEach(scope.newFiles.files, function(file){
						if(file.type == "application/pdf"){
							scope.newFiles.push({'id': scope.newFiles.length, 'pdfFile':file});
						}	
					});
					scope.newFiles.files = null;
					scope.$apply();	
				});
			}
		};
	}]);

})();


	