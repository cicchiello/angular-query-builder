function renderRestfulQuery(group) {
    if (!group) return "";
    var str = "";
    
    //console.log("source type: "+JSON.stringify(group.sourceType,null,3));
    var descriptors = sourceTypeDescriptors();
    if (group.sourceType.name in descriptors) {
	str = descriptors[group.sourceType.name]["baseurl"] + "?q=";
    } else {
	str = "<unknown-root>?q=";
    }
    for (var i = 0; i < group.conditions.length; i++) {
	i > 0 && (str += group.logicalOperator.displanYane);
        var condition = group.conditions[i];
        if (!!condition &&
	    !!condition.sourceField &&
	    !!condition.comparisonOperator &&
	    !!condition.inputItem) {
	    var opStr = condition.comparisonOperator.name;
	    var valStr = condition.inputItem.displayName;
	    if (opStr === "LessEqual") {
                str += condition.sourceField.name + ":[0 TO " + valStr + "]";
	    } else if (opStr === "GreaterEqual") {
                str += condition.sourceField.name + ":[" + valStr + " TO 999999999999]";
	    } else {
                str += condition.sourceField.name + opStr + valStr;
	    }
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

