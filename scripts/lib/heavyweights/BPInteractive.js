function BPInteractive() {
	this.nextId = 0;
	this.objs = [];
}
//Inherit the methods of BaseClass
BPInteractive.prototype = new Interactive();

Interactive.interactive = new BPInteractive();