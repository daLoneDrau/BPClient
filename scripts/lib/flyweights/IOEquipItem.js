/**
 * Creates a new instance of {@link IOEquipItem}.
 */
function IOEquipItem() {
	this.elements = new Array(EquipmentElement.total);
	for (var i = this.elements.length - 1; i >= 0; i--) {
		this.elements[i] = new EquipmentItemModifier();
	}
}
/** Frees all resources. */
IOEquipItem.prototype.free = function() {
	for (var i = this.elements.length - 1; i >= 0; i--) {
		this.elements[i] = null;
    }
}
/**
 * Gets the element.
 * @param element the element
 * @return {@link EquipmentItemModifier}
 */
IOEquipItem.prototype.getElement = function(element) {
	return this.elements[element];
}
/** Resets all modifiers. */
IOEquipItem.prototype.reset = function() {
	for (var i = this.elements.length - 1; i >= 0; i--) {
		this.elements[i].clearData();
	}
}
