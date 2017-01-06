var EquipmentElement = {
		ELEMENT_COMBAT_SKILL: 0,
		ELEMENT_ENDURANCE: 1,
		ELEMENT_WEALTH: 2,
		ELEMENT_WOUNDS: 3,
		ELEMENT_POISON_WOUNDS: 4,
		ELEMENT_WIT_AND_WILES: 5,
		total: 6,
  properties: {
    0: {name: "small", value: 0, code: "COMBAT SKILL"},
    1: {name: "medium", value: 1, code: "ELEMENT_ENDURANCE"},
    2: {name: "large", value: 2, code: "ELEMENT_WEALTH"},
    3: {name: "large", value: 3, code: "ELEMENT_WOUNDS"},
    4: {name: "large", value: 4, code: "ELEMENT_POISON_WOUNDS"},
    5: {name: "large", value: 5, code: "ELEMENT_WIT_AND_WILES"}
  },
  valueof: function(val) {
	  if (val === "ELEMENT_COMBAT_SKILL") {
		  return ELEMENT_COMBAT_SKILL;
	  }
	  if (val === "ELEMENT_ENDURANCE") {
		  return ELEMENT_ENDURANCE;
	  }
	  if (val === "ELEMENT_WEALTH") {
		  return ELEMENT_WEALTH;
	  }
	  if (val === "ELEMENT_WOUNDS") {
		  return ELEMENT_WOUNDS;
	  }
	  if (val === "ELEMENT_POISON_WOUNDS") {
		  return ELEMENT_POISON_WOUNDS;
	  }
	  if (val === "ELEMENT_WIT_AND_WILES") {
		  return ELEMENT_WIT_AND_WILES;
	  }
  }
};