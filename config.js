function getAppName() {return "AdvTargeting";}

function getAwsBaseurl() {return "https://api.advtargeting.com/v1/advanced";}

function getCloudantBaseurl() {return "https://dbs.advtargeting.com/advisortargeting";}
function getCloudantDDoc() {return "_design/atarget_advanced";}

var _firmFieldDescriptors;
function firmFieldDescriptors() {
    if (!!!_firmFieldDescriptors) {
	_firmFieldDescriptors = {
	    "retail" : {
		"displayName": "Retail",
		"comparisonOperators": {
		    "Equals": "https://localhost/aqb/typeahead/bool/"
                }
	    },
            "aum": {
		"displayName": "AUM",
		"comparisonOperators": {
		    "LessEqual": "",
		    "GreaterEqual": ""
                }
	    }
	};
    }
    return _firmFieldDescriptors;
}


var _sourceTypeDescriptors;
function sourceTypeDescriptors() {
    if (!!!_sourceTypeDescriptors) {
	_sourceTypeDescriptors = {
	    "FirmStats": {
		"displayName": "Firm Stats",
		"sourceFields": expandFields(firmFieldDescriptors()),
		"baseurl": getAwsBaseurl()
	    },
            "Firms": {
		"displayName": "Firms",
		"sourceFields": expandFields(firmFieldDescriptors()),
		"baseurl": getCloudantBaseurl()+getCloudantDDoc()+"/_search/atarget_advanced"
            },
            "Advisors": {
		"displayName": "Advisors",
		"sourceFields": []
            }
	};
    }
    return _sourceTypeDescriptors;
}


var _initialSearchDescriptor;
function initialSearchDescriptor() {
    if (!!!_initialSearchDescriptor) {
	_initialSearchDescriptor = {
	    "logicalOperator": "And",
	    "sourceType": "FirmStats",
            "conditions": [
                {
		    "sourceField": "retail",
		    "comparisonOperator": "Equals",
                    "inputItem": "true"
                },
                {
		    "sourceField": "aum",
                    "comparisonOperator": "LessEqual",
                    "inputItem": "500000000"
                }
            ],
            "groups": [
            ]
        }
    }
    return _initialSearchDescriptor;
}


var _initialSearchContainer;
function getInitialSearchContainer() {
    if (!!!_initialSearchContainer) {
	_initialSearchContainer = expandInitialSearchContainer(initialSearchDescriptor());
    }
    return _initialSearchContainer;
}


