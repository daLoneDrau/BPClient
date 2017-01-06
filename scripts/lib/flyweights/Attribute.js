function Attribute() {
	if (arguments.length === 1) {
		console.log("1 arg");
		console.log(arguments[0]);
		this.abbreviation = arguments[0].code;
		this.displayName = arguments[0].name;
		this.description = arguments[0].description;
	} else if (arguments.length === 2) {
		this.abbreviation = arguments[0];
		this.displayName = arguments[1];
		this.description = "";
	} else if (arguments.length === 3) {
		this.abbreviation = arguments[0];
		this.displayName = arguments[1];
		this.description = arguments[2];
	} else {
		throw new Error("Invalid number of arguments, must be 2 or 3");
	}
	if (this.abbreviation === null) {
		throw new Error("abbreviation cannot be null");
	}
	if (this.displayName === null) {
		throw new Error("name cannot be null");
	}
    this.base = 0;
    this.modifier = 0;
}
/**
 * Sets the value for the modifier.
 * @param val the value to set
 */
Attribute.prototype.adjustModifier = function(val) {
    this.modifier += val;
};
/** Resets the {@link Attribute}'s modifier value to 0. */
Attribute.prototype.clearModifier = function() {
    this.modifier = 0;
};
/**
 * Gets the {@link Attribute}'s name abbreviation.
 * @return <code>char</code>[]
 */
Attribute.prototype.getAbbreviation = function() {
    return this.abbreviation;
};
/**
 * Gets the base {@link Attribute} value.
 * @return {@link float}
 */
Attribute.prototype.getBase = function() {
    return this.base;
};
/**
 * Gets the {@link Attribute}'s description.
 * @return <code>char</code>[]
 */
Attribute.prototype.getDescription = function() {
    return this.description;
};
/**
 * Gets the {@link Attribute}'s display name.
 * @return <code>char</code>[]
 */
Attribute.prototype.getDisplayName = function() {
    return this.displayName;
};
/**
 * Gets the full {@link Attribute} value.
 * @return {@link float}
 */
Attribute.prototype.getFull = function() {
    return this.base + this.modifier;
};
/**
 * Gets the value of all modifiers to the {@link Attribute}.
 * @return {@link float}
 */
Attribute.prototype.getModifier = function() {
    return this.modifier;
};
/**
 * Sets the {@link Attribute}'s name abbreviation.
 * @param val the name to set
 * @throws RPGException if the parameter is null
 */
Attribute.prototype.setAbbreviation = function(val) {
	if (val === undefined
			|| val === null) {
		throw new Error("abbreviation cannot be null");
	}
	this.abbreviation = val;
}
/**
 * Sets the base {@link Attribute} value.
 * @param val the value to set
 */
Attribute.prototype.setBase = function(val) {
	if (val === undefined
			|| val === null) {
		throw new Error("Base cannot be null");
	}
	this.base = val;
}
/**
 * Sets the {@link Attribute}'s description.
 * @param val the name to set
 * @throws RPGException if the parameter is null
 */
Attribute.prototype.setDescription = function(val) {
	if (val === undefined
			|| val === null) {
		throw new Error("Description cannot be null");
	}
	this.description = val;
}
/**
 * Sets the {@link Attribute}'s display name.
 * @param val the name to set
 * @throws RPGException if the parameter is null
 */
Attribute.prototype.setDisplayName = function(val) {
	if (val === undefined
			|| val === null) {
		throw new Error("name cannot be null");
	}
	this.displayName = val;
}