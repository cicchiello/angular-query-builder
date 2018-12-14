function renderRestfulQuery(group) {
    if (!group) return "";
    var str = "";
    
    //console.log("group: "+JSON.stringify(group,null,3));
    var descriptors = sourceTypeDescriptors();
    if (group.sourceType.name in descriptors) {
	str = descriptors[group.sourceType.name]["baseurl"] + "?q=";
    } else {
	str = "<unknown-root>?q=";
    }
    for (var i = 0; i < group.conditions.length; i++) {
	var logOp = logicalOperatorDescriptors()[group.logicalOperator.name].queryText
	i > 0 && (str += logOp);
        var condition = group.conditions[i];
        if (!!condition &&
	    !!condition.sourceField &&
	    !!condition.comparisonOperator &&
	    !!condition.inputItem) {
	    var opStr = condition.comparisonOperator.name;
	    var valStr = condition.inputItem.displayName;
	    var field = condition.sourceField.name;
	    var cmpDescrs = comparisonOperatorDescriptors();
	    if (opStr in cmpDescrs) 
		str += cmpDescrs[opStr].toString(field,valStr);
	    else 
                str += field + opStr + valStr;
        }
    }
    
    if (!!group.groups && group.groups instanceof Array) {
        for (var x = 0; x < group.groups.length; x++) {
            if (!!group.logicalOperator && !!group.conditions) {
                if (group.conditions.length > 0 || x > 0) {
                    str += group.logicalOperator.displayName;
                }
                str += renderRestfulQuery(group.groups[x]);
            }
        }
    }
    
    return str;
}


var _comparisonOperatorDescriptors;
function comparisonOperatorDescriptors() {
    if (!!!_comparisonOperatorDescriptors) {
	_comparisonOperatorDescriptors = {
	    "Equals": {
		"displayName": "=",
		"toString": function(field,value) {return field+":"+value;}
	    },
	    "LessEqual": {
		"displayName": "<=",
		"toString": function(field,value) {return field+":[0 TO "+value+"]";}
	    },
	    "GreaterEqual": {
		"displayName": ">=",
		"toString": function(field,value) {return field+":["+value+" TO 999999999999]";}
	    }
	};
    }
    return _comparisonOperatorDescriptors;
}


var _logicalOperatorDescriptors;
function logicalOperatorDescriptors() {
    if (!!!_logicalOperatorDescriptors) {
	_logicalOperatorDescriptors = {
	    "And": {
		"displayName": "AND",
		"queryText": " AND "
	    },
	    "Or": {
                "displayName": "OR",
		"queryText": " OR "
	    }
	};
    }
    return _logicalOperatorDescriptors;
}


