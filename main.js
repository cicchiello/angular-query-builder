angular.module('app', [
    'restful-query-builder'
])

.constant('APP_VERSION', restful_query_builder_version)

.config(['$httpProvider', '$logProvider', 'DemoDataProvider', function ($httpProvider, $logProvider, DemoDataProvider) {

    $logProvider.debugEnabled(true);

    var interceptor = ['$rootScope', '$q', '$location', function ($rootScope, $q, $location) {

        var demoData = DemoDataProvider.$get();

        return {
            'request': function (request) {
                if (request.url.indexOf("https://localhost/aqb/typeahead/object-types/") > -1 ||
		    request.url.indexOf("https://localhost/aqb/typeahead/bool/") > -1) {
                    request.timeout = 1;
                }
                return request;
            },
            'responseError': function (response) {
                if (response.config.url.indexOf("https://localhost/aqb/typeahead/object-types/") > -1) {
                    // Some object types returned by the typeahead
                    response.data = demoData.getObjectTypes();
                    response.status = 200;
                } else if (response.config.url.indexOf("https://localhost/aqb/typeahead/bool/") > -1) {
		    response.data = demoData.getBoolTypes();
		    response.status = 200;
		}
                return response;
            }
        };
    }];
    $httpProvider.interceptors.push(interceptor);
}])

.controller('MainController', ['$scope', '$sce', '$log', 'APP_VERSION', 'AppConfig', 'DemoData', function ($scope, $sce, $log, APP_VERSION, AppConfig, DemoData) {

    $scope.appName = "Restful";
    if (typeof getAppName === "function") $scope.appName = getAppName();
    
    $scope.appVersion = APP_VERSION;

    AppConfig.setMaxGroups(4);
    AppConfig.setMaxConditions(4);

    $scope.jsonOutput = {};

    $scope.search = function (form, $event) {
        $log.debug($scope.searchContainer);
        $scope.jsonOutput = JSON.stringify($scope.searchContainer, null, 4);
    };

    $scope.$watch("searchContainer", function () {
        $scope.jsonOutput = {};
        var groups = $scope.searchContainer.groups;
        if (!!groups && groups instanceof Array && groups.length > 0) {
            $scope.output = $sce.trustAsHtml(computeOutput(groups[0]));
        }
    }, true);

    function computeOutput(group) {
	return renderRestfulQuery(group);
    }

    $scope.sourceTypes = DemoData.getSourceTypes();

    $scope.logicalOperators = DemoData.getLogicalOperators();

    var emptySearchContainer = {
        "groups": [
            {
                "conditions": [
                    {}
                ]
            }
        ]
    };
    //$scope.searchContainer = emptySearchContainer;
    $scope.searchContainer = DemoData.getInitialSearchContainer();
}])

.provider('DemoData', function DemoDataProvider() {

    function DemoData() {
        this.getBoolTypes = function () {
            return [
                {
                    "data": "True",
                    "displayName": "true"
                },
                {
                    "data": "False",
                    "displayName": "false"
                }
            ];
        };
	this.getSourceTypes = function() {
	    return expandSourceTypes(sourceTypeDescriptors());
	}
        this.getLogicalOperators = function () {
	    return expandLogicalOperators(logicalOperatorDescriptors());
	}
        this.getInitialSearchContainer = getInitialSearchContainer;
    }

    this.$get = function demoDataFactory() {
        return new DemoData();
    };
});


function expandLogicalOperators(descriptors) {
    var result = [];
    var pos = 1;
    for (var key in descriptors) {
	var entry = {
	    "name": key,
	    "displayName": descriptors[key].displayName,
	    "position": pos++
	};
	result.push(entry);
    }
    return result;
}


function expandFields(descriptors) {
    var fields = [];
    var fpos = 1;
    for (var dkey in descriptors) {
	var fentry = {};
	fentry.name = dkey;
	fentry.displayName = descriptors[dkey].displayName;
	fentry.position = fpos++;
	fentry.comparisonOperators = [];
	var cdescrs = comparisonOperatorDescriptors();
	var cpos = 1;
	for (var ckey in descriptors[dkey].comparisonOperators) {
	    var centry = {};
	    centry.name = ckey;
	    centry.displayName = cdescrs[ckey].displayName;
	    centry.position = cpos++;
	    if (descriptors[dkey].comparisonOperators[ckey] !== "")
		centry.typeaheadUrl = descriptors[dkey].comparisonOperators[ckey];
	    fentry.comparisonOperators.push(centry);
	}
	fields.push(fentry);
    }

    return fields;
}


function expandInitialSearchContainer(descr) {
    var group = {};
    group.logicalOperator = {
	"name": descr.logicalOperator,
	"displayName": logicalOperatorDescriptors()[descr.logicalOperator].displayName
    };
    group.sourceType = {
	"name": descr.sourceType,
	"displayName": sourceTypeDescriptors()[descr.sourceType].displayName
    };
    
    var conditions = [];
    var cmpDescrs = comparisonOperatorDescriptors();
    for (var c = 0; c < descr.conditions.length; c++) {
	var centry = {};
	centry.sourceField = {
	    "name": descr.conditions[c].sourceField,
	    "displayName": firmFieldDescriptors()[descr.conditions[c].sourceField].displayName
	};
	centry.comparisonOperator = {
	    "name": descr.conditions[c].comparisonOperator,
	    "displayName": cmpDescrs[descr.conditions[c].comparisonOperator].displayName
	};
	centry.inputItem = {
	    "data": descr.conditions[c].inputItem,
	    "displayName": descr.conditions[c].inputItem
	}
	conditions.push(centry);
    }
    group.conditions = conditions;
    group.groups = [];
    
    return {
	"groups": [group]
    };
}


function expandSourceTypes(descriptors) {
    var result = [];
    var spos = 1;
    for (var key in descriptors) {
	var entry = descriptors[key];
	entry["name"] = key;
	entry["position"] = spos++;
	result.push(entry);
    }
    return result;
};


