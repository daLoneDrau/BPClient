function BPInteractive() {
	this.nextId = 0;
	this.objs = [];
}
//Inherit the methods of BaseClass
BPInteractive.prototype = new Interactive();
/**
 * Gets the internal list of IOs.
 * @return {@link IO}[]
 */
BPInteractive.prototype.getIOs = function() {
	return this.objs;
}

Interactive.interactive = new BPInteractive();