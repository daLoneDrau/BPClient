function EquipmentItemModifier() {
	if (arguments.length === 0) {
		this.percent = false;
		this.special = 0;
		this.value = 0;	
	} else if (arguments.length === 3) {
		if (!typeof(arguments[0]) === "boolean") {
			throw new Error("first argument must be boolean");
		}
		var er = /^[0-9]+$/;
		if (!er.test(arguments[2])) {
			throw new Error("last argument must be integer");
		}
		this.percent = arguments[0];
		this.special = arguments[1];
		this.value = arguments[2];
	} else {
		throw new Error("Invalid number of arguments, must be three or none");
	}
}
/** Clears all data. */
EquipmentItemModifier.prototype.clearData = function() {
	this.percent = false;
	this.special = 0;
	this.value = 0;
};
/**
 * Gets the special.
 * @return int
 */
EquipmentItemModifier.prototype.getSpecial = function() {
	return this.special;
}
/**
 * Gets the value of modifier to be applied.
 * @return float
 */
EquipmentItemModifier.prototype.getValue = function() {
	return this.value;
}
/**
 * Determines if the {@link EquipmentItemModifier} is a percentage modifier.
 * @return <tt>true</tt> if the {@link EquipmentItemModifier} is a
 * percentage modifier; <tt>false</tt> otherwise
 */
EquipmentItemModifier.prototype.isPercentage = function() {
	return this.percent;
}
/**
 * Sets the flag indicating whether the modifier is a percentage modifier.
 * @param flag the flag
 */
EquipmentItemModifier.prototype.setPercentage = function(flag) {
	this.percent = val;
}
/**
 * Sets the special.
 * @param val the special to set
 */
EquipmentItemModifier.prototype.setSpecial = function(val) {
	this.special = val;
}
/**
 * Sets the value of modifier to be applied.
 * @param val the value to set
 */
EquipmentItemModifier.prototype.setValue = function(val) {
	this.value = val;
}
