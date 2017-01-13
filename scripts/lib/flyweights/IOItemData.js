/**
 * Creates a new instance of {@link IOItemData}.
 * @throws Error 
 */
function IOItemData() {
    this.count = 0;
    this.description = "";
    this.equipitem = new IOEquipItem();
    this.foodValue = 0;
    this.io = null;
    this.itemName = "";
    this.lightValue = 0;
    this.maxOwned = 0;
    this.price = 0;
    this.ringType = 0;
    this.stackSize = 0;
    this.stealvalue = 0;
    this.weight = 0;
}
/**
 * Adjusts the {@link IOItemData}'s count.
 * @param val the amount adjusted by
 */
IOItemData.prototype.adjustCount = function(val) {
	if (this.count + val < 0) {
		throw new Error("Cannot remove that many items");
	}
	if (this.count + val > this.maxOwned) {
		throw new Error("Cannot add that many items");
	}
	this.count += val;
}
/**
 * Equips the item on a target IO.
 * @param target the target IO
 * @throws PooledException if an error occurs
 * @throws Error if an error occurs
 */
IOItemData.prototype.ARX_EQUIPMENT_Equip = function(target) {
	if (this.io === null) {
		throw new Error("Cannot equip item with no IO data");
	}
	if (target != null) {
		if (target.hasIOFlag(IO_01_PC)) {
			var player = target.getPCData();
			var validid = -1;
			var i = Interactive.getInstance().getMaxIORefId();
			for (; i >= 0; i--) {
				if (Interactive.getInstance().hasIO(i)
				        && Interactive.getInstance().getIO(i) != null
				        && io.equals(Interactive.getInstance().getIO(i))) {
					validid = i;
					break;
				}
			}
			if (validid >= 0) {
				Interactive.getInstance().RemoveFromAllInventories(io);
				io.setShow(IoGlobals.SHOW_FLAG_ON_PLAYER); // on player
				// handle drag
				// if (toequip == DRAGINTER)
				// Set_DragInter(NULL);
				if (io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_WEAPON)) {
					equipWeapon(player);
				} else if (io
				        .hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_SHIELD)) {
					equipShield(player);
				} else if (io
				        .hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_RING)) {
					equipRing(player);
				} else if (io
				        .hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_ARMOR)) {
					// unequip old armor
					unequipItemInSlot(
					        player, EquipmentGlobals.EQUIP_SLOT_TORSO);
					// equip new armor
					player.setEquippedItem(
					        EquipmentGlobals.EQUIP_SLOT_TORSO, validid);
				} else if (io
				        .hasTypeFlag(
				                EquipmentGlobals.OBJECT_TYPE_LEGGINGS)) {
					// unequip old leggings
					unequipItemInSlot(
					        player, EquipmentGlobals.EQUIP_SLOT_LEGGINGS);
					// equip new leggings
					player.setEquippedItem(
					        EquipmentGlobals.EQUIP_SLOT_LEGGINGS, validid);
				} else if (io
				        .hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_HELMET)) {
					// unequip old helmet
					unequipItemInSlot(
					        player, EquipmentGlobals.EQUIP_SLOT_HELMET);
					// equip new helmet
					player.setEquippedItem(
					        EquipmentGlobals.EQUIP_SLOT_HELMET, validid);
				}
				if (io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_HELMET)
				        || io.hasTypeFlag(
				                EquipmentGlobals.OBJECT_TYPE_ARMOR)
				        || io.hasTypeFlag(
				                EquipmentGlobals.OBJECT_TYPE_LEGGINGS)) {
					target.getPCData().ARX_EQUIPMENT_RecreatePlayerMesh();
				}
				target.getPCData().computeFullStats();
			}
		}
	}
}
	public final void ARX_EQUIPMENT_ReleaseAll() {
		ARX_EQUIPMENT_ReleaseEquipItem();
	}
	/** Releases the {@link IOEquipItem} data from the item. */
	public final void ARX_EQUIPMENT_ReleaseEquipItem() {
		if (equipitem != null) {
			equipitem = null;
		}
	}
	/**
	 * Sets the item's object type.
	 * @param flag the type flag
	 * @param added if <tt>true</tt>, the type is set; otherwise it is removed
	 * @throws Error if an error occurs
	 */
	public final void ARX_EQUIPMENT_SetObjectType(final int flag,
	        final boolean added) throws Error {
		if (added) {
			io.addTypeFlag(flag);
		} else {
			io.removeTypeFlag(flag);
		}
	}
	/**
	 * Unequips the item from the targeted IO.
	 * @param target the targeted IO
	 * @param isDestroyed if<tt>true</tt> the item is destroyed afterwards
	 * @throws PooledException if an error occurs
	 * @throws Error if an error occurs
	 */
	public void ARX_EQUIPMENT_UnEquip(final IO target,
	        final boolean isDestroyed) throws Error {
		if (target != null) {
			if (target.hasIOFlag(IoGlobals.IO_01_PC)) {
				int i = ProjectConstants.getInstance().getMaxEquipped() - 1;
				for (; i >= 0; i--) {
					IoPcData player = target.getPCData();
					int itemRefId = player.getEquippedItem(i);
					if (itemRefId >= 0
					        && Interactive.getInstance().hasIO(itemRefId)
					        && Interactive.getInstance().getIO(
					                itemRefId).equals(io)) {
						// EERIE_LINKEDOBJ_UnLinkObjectFromObject(
						// target->obj, tounequip->obj);
						player.ARX_EQUIPMENT_Release(itemRefId);
						// target->bbox1.x = 9999;
						// target->bbox2.x = -9999;

						if (!isDestroyed) {
							// if (DRAGINTER == null) {
							// ARX_SOUND_PlayInterface(SND_INVSTD);
							// Set_DragInter(tounequip);
							// } else
							if (!target.getInventory().CanBePutInInventory(
							        io)) {
								target.getInventory().PutInFrontOfPlayer(
								        io, true);
							}
						}
						// send event from this item to target to unequip
						Script.getInstance().setEventSender(io);
						Script.getInstance().sendIOScriptEvent(target,
						        ScriptConsts.SM_007_EQUIPOUT, null, null);
						// send event from target to this item to unequip
						Script.getInstance().setEventSender(target);
						Script.getInstance().sendIOScriptEvent(io,
						        ScriptConsts.SM_007_EQUIPOUT, null, null);
					}
				}
				if (io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_HELMET)
				        || io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_ARMOR)
				        || io.hasTypeFlag(
				                EquipmentGlobals.OBJECT_TYPE_LEGGINGS)) {
					target.getPCData().ARX_EQUIPMENT_RecreatePlayerMesh();
				}
			}
		}
	}
	/**
	 * Equips a ring on a player.
	 * @param player the player data
	 * @throws Error if an error occurs
	 */
	private void equipRing(final IoPcData player) throws Error {
		// check left and right finger
		// to see if it can be equipped
		boolean canEquip = true;
		int ioid = player.getEquippedItem(
		        EquipmentGlobals.EQUIP_SLOT_RING_LEFT);
		if (Interactive.getInstance().hasIO(ioid)) {
			IO oldRing = (IO) Interactive.getInstance().getIO(ioid);
			if (oldRing.getItemData().getRingType() == ringType) {
				// already wearing that type
				// of ring on left finger
				canEquip = false;
			}
			oldRing = null;
		}
		if (canEquip) {
			ioid = player.getEquippedItem(
			        EquipmentGlobals.EQUIP_SLOT_RING_RIGHT);
			if (Interactive.getInstance().hasIO(ioid)) {
				IO oldRing = (IO) Interactive.getInstance().getIO(ioid);
				if (oldRing.getItemData().getRingType() == ringType) {
					// already wearing that type
					// of ring on right finger
					canEquip = false;
				}
				oldRing = null;
			}
		}
		if (canEquip) {
			int equipSlot = -1;
			if (player.getEquippedItem(
			        EquipmentGlobals.EQUIP_SLOT_RING_LEFT) < 0) {
				equipSlot = EquipmentGlobals.EQUIP_SLOT_RING_LEFT;
			}
			if (player.getEquippedItem(
			        EquipmentGlobals.EQUIP_SLOT_RING_RIGHT) < 0) {
				equipSlot = EquipmentGlobals.EQUIP_SLOT_RING_RIGHT;
			}
			if (equipSlot == -1) {
				if (!player.getIo().getInventory().isLeftRing()) {
					ioid = player.getEquippedItem(
					        EquipmentGlobals.EQUIP_SLOT_RING_RIGHT);
					if (Interactive.getInstance().hasIO(ioid)) {
						IO oldIO = (IO) Interactive.getInstance().getIO(ioid);
						if (oldIO.hasIOFlag(IoGlobals.IO_02_ITEM)) {
							unequipItemInSlot(player,
							        EquipmentGlobals.EQUIP_SLOT_RING_RIGHT);
						}
						oldIO = null;
					}
					equipSlot =
					        EquipmentGlobals.EQUIP_SLOT_RING_RIGHT;
				} else {
					ioid = player.getEquippedItem(
					        EquipmentGlobals.EQUIP_SLOT_RING_LEFT);
					if (Interactive.getInstance().hasIO(ioid)) {
						IO oldIO = (IO) Interactive.getInstance().getIO(ioid);
						if (oldIO.hasIOFlag(IoGlobals.IO_02_ITEM)) {
							unequipItemInSlot(player,
							        EquipmentGlobals.EQUIP_SLOT_RING_LEFT);
						}
						oldIO = null;
					}
					equipSlot = EquipmentGlobals.EQUIP_SLOT_RING_LEFT;
				}
				player.getIo().getInventory().setLeftRing(
				        !player.getIo().getInventory().isLeftRing());
			}
			player.setEquippedItem(equipSlot, io.getRefId());
		}
	}
	/**
	 * Equips a shield on a player.
	 * @param player the player data
	 * @throws Error if an error occurs
	 */
	private void equipShield(final IoPcData player) throws Error {
		// unequip old shield
		unequipItemInSlot(player, EquipmentGlobals.EQUIP_SLOT_SHIELD);
		// equip new shield
		player.setEquippedItem(
		        EquipmentGlobals.EQUIP_SLOT_SHIELD, io.getRefId());
		// TODO - attach new shield to mesh
		// EERIE_LINKEDOBJ_LinkObjectToObject(target->obj,
		// io->obj, "SHIELD_ATTACH", "SHIELD_ATTACH", io);
		int wpnID = player.getEquippedItem(EquipmentGlobals.EQUIP_SLOT_WEAPON);
		if (wpnID >= 0) {
			if (Interactive.getInstance().hasIO(wpnID)) {
				IO wpn = (IO) Interactive.getInstance().getIO(wpnID);
				if (wpn.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_2H)
				        || wpn.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_BOW)) {
					// unequip old weapon
					unequipItemInSlot(
					        player, EquipmentGlobals.EQUIP_SLOT_WEAPON);
				}
			}
		}
	}
	/**
	 * Equips a weapon for a player.
	 * @param player the player data
	 * @throws Error if an error occurs
	 */
	private void equipWeapon(final IoPcData player) throws Error {
		// unequip old weapon
		unequipItemInSlot(player, EquipmentGlobals.EQUIP_SLOT_WEAPON);
		// equip new weapon
		player.setEquippedItem(
		        EquipmentGlobals.EQUIP_SLOT_WEAPON, io.getRefId());
		// attach it to player mesh
		if (io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_BOW)) {
			// EERIE_LINKEDOBJ_LinkObjectToObject(
			// target->obj, io->obj,
			// "WEAPON_ATTACH", "TEST", io);
		} else {
			// EERIE_LINKEDOBJ_LinkObjectToObject(
			// target->obj,
			// io->obj,
			// "WEAPON_ATTACH", "PRIMARY_ATTACH", io); //
		}
		if (io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_2H)
		        || io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_BOW)) {
			// for bows or 2-handed swords, unequip old shield
			unequipItemInSlot(player, EquipmentGlobals.EQUIP_SLOT_SHIELD);
		}
	}
	/**
	 * Gets the current number in an inventory slot.
	 * @return {@link short}
	 */
	public final int getCount() {
		return count;
	}
	/**
	 * Gets the item's description.
	 * @return {@link char[]}
	 */
	public final char[] getDescription() {
		return description;
	}
	/**
	 * Gets the list of equipment item modifiers.
	 * @return {@link EquipmentItemModifier}[]
	 */
	public final IOEquipItem getEquipitem() {
		return equipitem;
	}
	/**
	 * Gets the value for the foodValue.
	 * @return {@link char}
	 */
	public char getFoodValue() {
		return foodValue;
	}
	/**
	 * Gets the IO associated with this data.
	 * @return {@link IO}
	 */
	public IO getIo() {
		return io;
	}
	/**
	 * Gets the item's name.
	 * @return <code>char</code>[]
	 */
	public final char[] getItemName() {
		return itemName;
	}
	/**
	 * Gets the value for the lightValue.
	 * @return {@link int}
	 */
	public int getLightValue() {
		return lightValue;
	}
	/**
	 * Gets the maximum number of the item the player can own.
	 * @return {@link int}
	 */
	public final int getMaxOwned() {
		return maxOwned;
	}
	/**
	 * Gets the item's price.
	 * @return {@link float}
	 */
	public final float getPrice() {
		return price;
	}
	/**
	 * Gets the type of ring the item is.
	 * @return {@link int}
	 */
	public int getRingType() {
		return ringType;
	}
	/**
	 * Gets the value for the stackSize.
	 * @return {@link int}
	 */
	public int getStackSize() {
		return stackSize;
	}
	/**
	 * Gets the value for the stealvalue.
	 * @return {@link char}
	 */
	public char getStealvalue() {
		return stealvalue;
	}
	/**
	 * Gets the type of weapon an item is.
	 * @return {@link int}
	 */
	public final int getWeaponType() {
		int type = EquipmentGlobals.WEAPON_BARE;
		if (io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_DAGGER)) {
			type = EquipmentGlobals.WEAPON_DAGGER;
		} else if (io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_1H)) {
			type = EquipmentGlobals.WEAPON_1H;
		} else if (io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_2H)) {
			type = EquipmentGlobals.WEAPON_2H;
		} else if (io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_BOW)) {
			type = EquipmentGlobals.WEAPON_BOW;
		}
		return type;
	}
	/**
	 * Gets the item's weight.
	 * @return {@link float}
	 */
	public final float getWeight() {
		return weight;
	}
	/**
	 * Sets the current number in an inventory slot.
	 * @param val the new value to set
	 */
	public final void setCount(final int val) {
		count = val;
	}
	/**
	 * Sets the {@link IOItemData}'s description.
	 * @param val the name to set
	 * @throws Error if the parameter is null
	 */
	public final void setDescription(final char[] val) throws Error {
		if (val == null) {
			throw new Error(ErrorMessage.BAD_PARAMETERS,
			        "Description cannot be null");
		}
		description = val;
	}
	/**
	 * Sets the {@link IOItemData}'s description.
	 * @param val the name to set
	 * @throws Error if the parameter is null
	 */
	public final void setDescription(final String val) throws Error {
		if (val == null) {
			throw new Error(ErrorMessage.BAD_PARAMETERS,
			        "Description cannot be null");
		}
		description = val.toCharArray();
	}
	/**
	 * Sets the equipitem
	 * @param val the equipitem to set
	 */
	public void setEquipitem(final IOEquipItem val) {
		this.equipitem = val;
	}
	/**
	 * Sets the value of the foodValue.
	 * @param foodValue the new value to set
	 */
	public void setFoodValue(final char foodValue) {
		this.foodValue = foodValue;
	}
	/**
	 * Sets the the IO associated with this data.
	 * @param val the new value to set
	 */
	public void setIo(final IO val) {
		io = val;
		if (val != null
		        && val.getItemData() == null) {
			val.setItemData(this);
		}
	}
	/**
	 * Sets the item's name.
	 * @param val the name to set
	 * @throws Error if the parameter is null
	 */
	public final void setItemName(final char[] val) throws Error {
		if (val == null) {
			throw new Error(ErrorMessage.BAD_PARAMETERS,
			        "Item name cannot be null");
		}
		this.itemName = val;
	}
	/**
	 * Sets the item's name.
	 * @param val the name to set
	 * @throws Error if the parameter is null
	 */
	public final void setItemName(final String val) throws Error {
		if (val == null) {
			throw new Error(ErrorMessage.BAD_PARAMETERS,
			        "Item name cannot be null");
		}
		this.itemName = val.toCharArray();
	}
	/**
	 * Sets the value of the lightValue.
	 * @param lightValue the new value to set
	 */
	public void setLightValue(final int lightValue) {
		this.lightValue = lightValue;
	}
	/**
	 * Sets the maximum number of the item the player can own.
	 * @param val the new value
	 */
	public final void setMaxOwned(final int val) {
		this.maxOwned = val;
	}
	/**
	 * Sets the item's price.
	 * @param val the price to set
	 */
	public final void setPrice(final float val) {
		price = val;
	}
	/**
	 * Sets the type of ring the item is.
	 * @param val the new value to set
	 */
	public void setRingType(final int val) {
		this.ringType = val;
	}
/**
 * Sets the amount of the item that can be stacked in one inventory slot.
 * @param val the value to set
 */
IOItemData.prototype.setStackSize = function(val) {
	this.stackSize = val;
}
/**
 * Sets the value of the stealvalue.
 * @param stealvalue the new value to set
 */
IOItemData.prototype.setWeight = function(val) {
	this.stealvalue = val;
}
/**
 * Sets the item's weight.
 * @param val the weight to set
 */
IOItemData.prototype.setWeight = function(val) {
	this.weight = val;
}
	IOEquipItem.prototype.getElement = function(element) {
	private void unequipItemInSlot(final IoPcData player, final int slot)
	        throws Error {
		if (player.getEquippedItem(slot) >= 0) {
			int slotioid = player.getEquippedItem(slot);
			if (Interactive.getInstance().hasIO(slotioid)) {
				IO equipIO = (IO) Interactive.getInstance().getIO(slotioid);
				if (equipIO.hasIOFlag(IoGlobals.IO_02_ITEM)
				        && equipIO.getItemData() != null) {
					equipIO.getItemData().ARX_EQUIPMENT_UnEquip(
					        player.getIo(), false);
				}
				equipIO = null;
			}
		}
	}
