function getAppName() {return "AdvTargeting";}

function getAwsBaseurl() {return "https://api.advtargeting.com/v1/advanced";}

function getCloudantBaseurl() {return "https://dbs.advtargeting.com/advisortargeting";}
function getCloudantDDoc() {return "_design/atarget_advanced";}

function getFirmFields() {
    return [
        {
            "name": "retail",
            "displayName": "Retail",
            "position": 1,
            "comparisonOperators": [
                {
                    "name": ":",
                    "displayName": "is",
                    "position": 1,
                    "typeaheadUrl": "https://localhost/aqb/typeahead/bool/"
                }
            ]
        },
	{
            "name": "aum",
            "displayName": "AUM",
            "position": 2,
            "comparisonOperators": [
                {
                    "name": "LessEqual",
                    "displayName": "<=",
                    "position": 1
                },
                {
                    "name": "GreaterEqual",
                    "displayName": ">=",
                    "position": 2
                }
            ]
	},
        {
            "name": "ObjectId",
            "displayName": "Id",
            "position": 3,
            "comparisonOperators": [
                {
                    "name": "Equals",
                    "displayName": "=",
                    "position": 1
                },
                {
                    "name": "NotEquals",
                    "displayName": "!=",
                    "position": 2
                },
                {
                    "name": "Greater",
                    "displayName": ">",
                    "position": 6
                },
                {
                    "name": "Less",
                    "displayName": "<",
                    "position": 7
                },
                {
                    "name": "GreaterEqual",
                    "displayName": ">=",
                    "position": 8
                },
                {
                    "name": "LessEqual",
                    "displayName": "<=",
                    "position": 9
                }
            ]
        },
        {
            "name": "SubjectId",
            "displayName": "Subject Id",
            "position": 4,
            "comparisonOperators": [
                {
                    "name": "Equals",
                    "displayName": "=",
                    "position": 1
                },
                {
                    "name": "NotEquals",
                    "displayName": "!=",
                    "position": 2
                },
                {
                    "name": "Contains",
                    "displayName": "Contains",
                    "position": 3
                }
            ]
        },
        {
            "name": "AnatomicalRegion",
            "displayName": "Anatomical Region",
            "position": 5,
            "comparisonOperators": [
                {
                    "name": "Contains",
                    "displayName": "Contains",
                    "position": 1,
                    "typeaheadUrl": "https://localhost/aqb/typeahead/fma/"
                },
                {
                    "name": "Equals",
                    "displayName": "=",
                    "position": 2,
                    "typeaheadUrl": "https://localhost/aqb/typeahead/fma/"
                },
                {
                    "name": "NotEquals",
                    "displayName": "!=",
                    "position": 3,
                    "typeaheadUrl": "https://localhost/aqb/typeahead/fma/"
                }
            ]
        },
        {
            "name": "Fulltext",
            "displayName": "Fulltext",
            "position": 6,
            "comparisonOperators": [
                {
                    "name": "Equals",
                    "displayName": "=",
                    "position": 1
                }
            ]
        },
        {
            "name": "FileExtension",
            "displayName": "File Extension",
            "position": 7,
            "comparisonOperators": [
                {
                    "name": "Equals",
                    "displayName": "=",
                    "position": 1
                },
                {
                    "name": "NotEquals",
                    "displayName": "!=",
                    "position": 2
                }
            ]
        },
        {
            "name": "Placeholder",
            "displayName": "Placeholder",
            "position": 8,
            "comparisonOperators": [
                {
                    "name": "Equals",
                    "displayName": "=",
                    "position": 1,
                    "typeaheadUrl": "https://localhost/aqb/typeahead/object-types/"
                },
                {
                    "name": "Contains",
                    "displayName": "Contains",
                    "position": 3
                },
                {
                    "name": "NotEquals",
                    "displayName": "!=",
                    "position": 2,
                    "typeaheadUrl": "https://localhost/aqb/typeahead/fma/"
                }
            ]
        }
    ];
};


function getSourceFields() {
    return [
        {
            "name": "Type",
            "displayName": "Type",
            "position": 1,
            "comparisonOperators": [
                {
                    "name": "Equals",
                    "displayName": "=",
                    "position": 1,
                    "typeaheadUrl": "https://localhost/aqb/typeahead/object-types/"
                },
                {
                    "name": "NotEquals",
                    "displayName": "!=",
                    "position": 2,
                    "typeaheadUrl": "https://localhost/aqb/typeahead/object-types/"
                }
            ]
        },
        {
            "name": "ObjectId",
            "displayName": "Id",
            "position": 2,
            "comparisonOperators": [
                {
                    "name": "Equals",
                    "displayName": "=",
                    "position": 1
                },
                {
                    "name": "NotEquals",
                    "displayName": "!=",
                    "position": 2
                },
                {
                    "name": "Greater",
                    "displayName": ">",
                    "position": 6
                },
                {
                    "name": "Less",
                    "displayName": "<",
                    "position": 7
                },
                {
                    "name": "GreaterEqual",
                    "displayName": ">=",
                    "position": 8
                },
                {
                    "name": "LessEqual",
                    "displayName": "<=",
                    "position": 9
                }
            ]
        },
        {
            "name": "SubjectId",
            "displayName": "Subject Id",
            "position": 3,
            "comparisonOperators": [
                {
                    "name": "Equals",
                    "displayName": "=",
                    "position": 1
                },
                {
                    "name": "NotEquals",
                    "displayName": "!=",
                    "position": 2
                },
                {
                    "name": "Contains",
                    "displayName": "Contains",
                    "position": 3
                }
            ]
        },
        {
            "name": "AnatomicalRegion",
            "displayName": "Anatomical Region",
            "position": 4,
            "comparisonOperators": [
                {
                    "name": "Contains",
                    "displayName": "Contains",
                    "position": 1,
                    "typeaheadUrl": "https://localhost/aqb/typeahead/fma/"
                },
                {
                    "name": "Equals",
                    "displayName": "=",
                    "position": 2,
                    "typeaheadUrl": "https://localhost/aqb/typeahead/fma/"
                },
                {
                    "name": "NotEquals",
                    "displayName": "!=",
                    "position": 3,
                    "typeaheadUrl": "https://localhost/aqb/typeahead/fma/"
                }
            ]
        },
        {
            "name": "Fulltext",
            "displayName": "Fulltext",
            "position": 5,
            "comparisonOperators": [
                {
                    "name": "Equals",
                    "displayName": "=",
                    "position": 1
                }
            ]
        },
        {
            "name": "FileExtension",
            "displayName": "File Extension",
            "position": 6,
            "comparisonOperators": [
                {
                    "name": "Equals",
                    "displayName": "=",
                    "position": 1
                },
                {
                    "name": "NotEquals",
                    "displayName": "!=",
                    "position": 2
                }
            ]
        },
        {
            "name": "Placeholder",
            "displayName": "Placeholder",
            "position": 7,
            "comparisonOperators": [
                {
                    "name": "Equals",
                    "displayName": "=",
                    "position": 1,
                    "typeaheadUrl": "https://localhost/aqb/typeahead/object-types/"
                },
                {
                    "name": "Contains",
                    "displayName": "Contains",
                    "position": 3
                },
                {
                    "name": "NotEquals",
                    "displayName": "!=",
                    "position": 2,
                    "typeaheadUrl": "https://localhost/aqb/typeahead/fma/"
                }
            ]
        }
    ];
};


function sourceTypeDescriptors() {
    return {
	"FirmStats": {
	    "displayName": "Firm Stats",
	    "sourceFields": getFirmFields(),
	    "baseurl": getAwsBaseurl()
	},
        "Firms": {
            "displayName": "Firms",
            "sourceFields": getFirmFields(),
	    "baseurl": getCloudantBaseurl()+getCloudantDDoc()+"/_search/atarget_advanced"
        },
        "Advisors": {
            "displayName": "Advisors",
            "sourceFields": this.getSourceFields()
        }
    };
}

function getSourceTypes() {
    var result = [];
    var dict = sourceTypeDescriptors();
    var i = 0;
    for (var key in dict) {
	var entry = dict[key];
	entry["name"] = key;
	entry["position"] = i++;
	result.push(entry);
    }
    return result;
};
