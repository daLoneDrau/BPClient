function Interactive() {
	this.FAST_RELEASE = true;
}
Interactive.instance = new Interactive();

/**
 * Adds an animation to an IO.
 * @param id
 * @param animId
 * @throws Error
 */
Interactive.prototype.addAnimation = function(id, animId) {
	
}
/**
 * Adds an interactive object to the scene.
 * @param item
 * @param flags
 * @return
 * @throws Error
 */
Interactive.prototype.addItem = function(item, flags) {
	
}
/**
 * Destroys dynamic info for an interactive object.
 * @param io the IO
 * @throws PooledException if an error occurs
 * @throws Error if an error occurs
 */
Interactive.prototype.ARX_INTERACTIVE_DestroyDynamicInfo = function(io) {
	if (io != null) {
		var n = Interactive.instance.GetInterNum(io);
		Interactive.instance.ARX_INTERACTIVE_ForceIOLeaveZone(io, 0);
		var objs = getIOs();
		for (var i = objs.length - 1; i >= 0; i--) {
			var pio = objs[i];
			if (pio != null
					&& pio.hasIOFlag(IoGlobals.IO_01_PC)) {
				var found = false;
				var player = pio.getPCData();
				// check to see if player was equipped with the item
				var j = ProjectConstants.instance.getMaxEquipped() - 1;
				for (; j >= 0; j--) {
					if (player.getEquippedItem(j) == n
							&& Interactive.instance.hasIO(n)) {
						// have player unequip
						io.getItemData().ARX_EQUIPMENT_UnEquip(pio, true);
						player.setEquippedItem(j, -1);
						found = true;
						break;
					}
				}
				player = null;
				if (found) {
					break;
				}
			}
		}
		
		Script.instance.eventStackClearForIo(io);

		if (Interactive.instance.hasIO(n)) {
			var i = ProjectConstants.instance.getMaxSpells();
			for (; i >= 0; i--) {
				var spell = SpellController.instance.getSpell(i);
				if (spell != null) {
					if (spell.exists()
							&& spell.getCaster() == n) {
						spell.setTimeToLive(0);
						spell.setTurnsToLive(0);
					}
				}
			}
		}
	}
}
Interactive.prototype.ARX_INTERACTIVE_DestroyIO = function(io) {
	if (io != null
			&& io.getShow() != IoGlobals.SHOW_FLAG_DESTROYED) {
		ARX_INTERACTIVE_ForceIOLeaveZone(io, 0);
		// if interactive object was being dragged
		// if (DRAGINTER == ioo) {
		//		set drag object to null
		//		Set_DragInter(NULL);
		// }
		
		// if interactive object was being hovered by mouse
		// if (FlyingOverIO == ioo) {
		//		set hovered object to null
		//		FlyingOverIO = NULL;
		// }
		
		// if interactive object was being combined
		// if (COMBINE == ioo) {
		//		set combined object to null
		//		COMBINE = NULL;
		// }
		if (io.hasIOFlag(IoGlobals.IO_02_ITEM)
				&& io.getItemData().getCount() > 1) {
			io.getItemData().adjustCount(-1);
		} else {
			// Kill all spells
			var numm = Interactive.instance.GetInterNum(io);

			if (hasIO(numm)) {
				// kill all spells from caster
				// ARX_SPELLS_FizzleAllSpellsFromCaster(numm);
			}

			// Need To Kill timers
			Script.instance.timerClearByIO(io);
			io.setShow(IoGlobals.SHOW_FLAG_DESTROYED);
			io.removeGameFlag(IoGlobals.GFLAG_ISINTREATZONE);

			if (!FAST_RELEASE) {
				RemoveFromAllInventories(io);
			}
			// unlink from any other IOs
			// if (ioo->obj) {
			//	EERIE_3DOBJ * eobj = ioo->obj;
			//	while (eobj->nblinked) {
			//		long k = 0;
			//		if ((eobj->linked[k].lgroup != -1)
			//				&& eobj->linked[k].obj) {
			//			INTERACTIVE_OBJ * iooo = 
			//					(INTERACTIVE_OBJ *)eobj->linked[k].io;

			//			if ((iooo) && ValidIOAddress(iooo)) {
			//				EERIE_LINKEDOBJ_UnLinkObjectFromObject(
			//						ioo->obj, iooo->obj);
			//				ARX_INTERACTIVE_DestroyIO(iooo);
			//			}
			//		}
			//	}
			// }

			ARX_INTERACTIVE_DestroyDynamicInfo(io);

			if (io.isScriptLoaded()) {
				var num = Interactive.instance.GetInterNum(io);
				Interactive.instance.releaseIO(io);

				if (hasIO(num)) {
					getIOs()[num] = null;
				}
			}
		}
	}
}
Interactive.prototype.ARX_INTERACTIVE_ForceIOLeaveZone = function(io, flags) {
	
}
/**
 * Gets the internal list of IOs.
 * @return {@link IO}[]
 */
Interactive.prototype.getIOs = function() {
	return this.objs;
}
Interactive.prototype.GetInterNum = function(io) {
	var num = -1;
	if (io != null) {
		var objs = getIOs();
		for (var i = objs.length - 1; i >= 0; i--) {
			if (objs[i].equals(io)) {
				num = i;
				break;
			}
		}
		objs = null;
	}
	return num;
}
/**
 * Gets a {@link IO} by its reference id.
 * @param id the reference id
 * @return {@link IO}
 * @throws Error if the object does not exist
 */
Interactive.prototype.getIO = function(id) {
	var io = null;
	if (hasIO(id)) {
		var objs = getIOs();
		for (var i = objs.length - 1; i >= 0; i--) {
			if (objs[i] != null
					&& objs[i].getRefId() == id) {
				io = objs[i];
				break;
			}
		}
		objs = null;
	} else {
		throw new Error("IO does not exist");
	}
	return io;
}
/**
 * Gets the largest reference Id in use.
 * @return {@link int}
 */
Interactive.prototype.getMaxIORefId = function() {
	return this.nextId;
}
/**
 * Gets a new interactive object.
 * @return {@link IO}
 */
Interactive.prototype.getNewIO = function() {
	// step 1 - find the next id
	var id = nextId++;
	var io = null;
	// try {
	io = new BPIO(id);
	// } catch (RPGException e) {
	// JOGLErrorHandler.getInstance().fatalError(e);
	// }
	// step 2 - find the next available index in the objs array
	var index = -1;
	for (var i = objs.length - 1; i >= 0; i--) {
		if (objs[i] == null) {
			index = i;
			break;
		}
	}
	// step 3 - put the new object into the arrays
	if (index < 0) {
		objs.push(io);
	} else {
		objs[index] = io;
	}
	return io;
}
/**
 * Determines if the {@link Interactive} has an interactive object by a
 * specific id.
 * @param id the id
 * @return true if an interactive object by that id has been stored already;
 *         false otherwise
 */
Interactive.prototype.hasIO = function(id) {
	var has = false;
	var objs = getIOs();
	for (var i = objs.length - 1; i >= 0; i--) {
		if (objs[i] != null
				&& id == objs[i].getRefId()) {
			has = true;
			break;
		}
	}
	objs = null;
	return has;
}
/**
 * Determines if the {@link Interactive} has a specific interactive object.
 * @param io the IO
 * @return true if that interactive object has been stored already; false
 *         otherwise
 */
Interactive.prototype.hasIO = function(io) {
	var has = false;
	if (io != null) {
		var objs = getIOs();
		for (var i = objs.length - 1; i >= 0; i--) {
			if (objs[i] != null
					&& io.getRefId() == objs[i].getRefId()
					&& io.equals(objs[i])) {
				has = true;
				break;
			}
		}
		objs = null;
	}
	return has;
}
/**
 * Determines if two separate IOs represent the same object.  Two objects
 * are considered the same if they are both non-unique items that have the
 * same name.  PCs and NPCs will always return <tt>false</tt> when compared.
 * @param io0 the first IO
 * @param io1 the second IO
 * @return <tt>true</tt> if the IOs represent the same object;
 *         <tt>false</tt> otherwise
 */
Interactive.prototype.isSameObject = function(io0, io1) {
	var same = false;
	if (io0 != null
			&& io1 != null) {
		if (!io0.hasIOFlag(IoGlobals.IO_13_UNIQUE)
				&& !io1.hasIOFlag(IoGlobals.IO_13_UNIQUE)) {
			if (io0.hasIOFlag(IoGlobals.IO_02_ITEM)
					&& io1.hasIOFlag(IoGlobals.IO_02_ITEM)
					&& io0.getOverscript() == null
					&& io1.getOverscript() == null) {
				var n0 = new String(io0.getItemData().getItemName());
				var n1 = new String(io1.getItemData().getItemName());
				if (n0.equalsIgnoreCase(n1)) {
					same = true;
				}
			}
		}
	}
	return same;
}
/**
 * Sets the weapon on an NPC.
 * @param io the IO
 * @param temp the temp object
 * @throws Error
 */
Interactive.prototype.prepareSetWeapon = function(io, temp) {
	if (io != null
			&& io.hasIOFlag(IoGlobals.IO_03_NPC)) {
		if (io.getNPCData().getWeapon() != null) {
			var oldWpnIO = io.getNPCData().getWeapon();
			// unlink the weapon from the NPC IO
			// EERIE_LINKEDOBJ_UnLinkObjectFromObject(io->obj, ioo->obj);
			io.getNPCData().setWeapon(null);
			releaseIO(oldWpnIO);
			oldWpnIO = null;
		}
		// load IO from DB
		var wpnIO = addItem(temp, IoGlobals.IO_IMMEDIATELOAD);
		if (wpnIO != null) {
			io.getNPCData().setWeapon(wpnIO);
			io.setShow(IoGlobals.SHOW_FLAG_LINKED);
			wpnIO.setScriptLoaded(true);
			// TODO - link item to io
			// SetWeapon_Back(io);
		}
	}
}
/**
 * Releases the IO and all resources.
 * @param ioid the IO's id
 * @throws Error if an error occurs
 */
Interactive.prototype.releaseIO = function(ioid) {
	if (!hasIO(ioid)) {
		throw new Error("Invalid IO id " + ioid);
	}
	var io = getIO(ioid);
	if (io != null) {
		if (io.getInventory() != null) {
			var inventory = io.getInventory();
			if (inventory != null) {
				for (var j = 0; j < inventory.getNumInventorySlots(); j++) {
					if (io.equals(inventory.getSlot(j).getIo())) {
						inventory.getSlot(j).setIo(null);
						inventory.getSlot(j).setShow(true);
					}
				}
			}
		}
		// release script timers and spells
		// release from groups
		//
		Script.instance.timerClearByIO(io);
		// MagicRealmSpells.instance.removeAllSpellsOn(io);
		Script.instance.releaseScript(io.getScript());
		Script.instance.releaseScript(io.getOverscript());
		Script.instance.releaseAllGroups(io);
		var id = io.getRefId();
		var index = -1;
		var objs = getIOs();
		for (var i = 0; i < objs.length; i++) {
			if (objs[i] != null
					&& id == objs[i].getRefId()) {
				index = i;
				break;
			}
		}
		if (index > -1) {
			objs[index] = null;
		}
		objs = null;
	}
}
/**
 * Removes an item from all available inventories.
 * @param itemIO the item
 * @throws Error if an error occurs
 */
Interactive.prototype.RemoveFromAllInventories = function(itemIO) {
	if (itemIO != null) {
		var i = Interactive.instance.getMaxIORefId();
		for (; i >= 0; i--) {
			if (Interactive.instance.hasIO(i)) {
				var invIo = Interactive.instance.getIO(i);
				InventoryData<IO, InventorySlot<IO>> inventoryData;
				if (invIo.getInventory() != null) {
					inventoryData = invIo.getInventory();
					for (var j =
							inventoryData.getNumInventorySlots()
									- 1; j >= 0; j--) {
						var slot = inventoryData.getSlot(j);
						if (slot.getIo() != null
								&& slot.getIo().equals(itemIO)) {
							slot.setIo(null);
							slot.setShow(true);
						}
					}
				}
				invIo = null;
				inventoryData = null;
			}
		}
	}
}
