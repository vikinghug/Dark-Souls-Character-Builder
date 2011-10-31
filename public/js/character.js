
var soulCostsArray = [0,673,690,707,724,741,758,775,793,811,829,847,1039,1238,1445,1660,1883,2114,2353,2601,2857,3122,3396,3678,3970,4271,4581,4900,5229,5567,5915,6273,6641,7019,7407,7805,8214,8634,9064,9505,9957,10420,10894,11379,11876,12384,12904,13436,13979,14535,15103,15683,16275,16880,17497,18127,18770,19426,20095,20777,21472,22181,22904,23640,24390,25154,25932,26724,27530,28351,29186,30036,30901,31780,32675,33585,34510,35450,36406,37377,38364,39367,40386,41421,42472,43539,44623,45724,46841,47975,49126,50294,51479,52681,53901,55138,56393,57666,58956,60265,61592,62937,64300,65682,67082,68501,69939,71396,72872,74367,75881,77415,78969,80542,82135,83748,85381,87034,88707,90401,92115,93850,95606,97382,99180,100999,102839,104700,106583,108487,110413,112361,114331,116323,118337,120373,122432,124514,126618,128745,130895,133068,135264,137483,139726,141992];
var hitPointsArray = [0,400,415,433,451,471,490,511,530,552,572,594,616,638,658,682,698,718,742,766,792,821,849,878,908,938,970,1001,1034,1066,1100,1123,1147,1170,1193,1216,1239,1261,1283,1304,1325,1346,1366,1386,1405,1424,1442,1458,1474,1489,1500,1508,1517,1526,1535,1544,1553,1562,1571,1580,1588,1597,1606,1615,1623,1632,1641,1649,1658,1666,1675,1683,1692,1700,1709,1717,1725,1734,1742,1750,1758,1767,1775,1783,1791,1799,1807,1814,1822,1830,1837,1845,1852,1860,1867,1874,1881,1888,1894,1900];
var staminaArray = [81,82,83,84,85,86,87,88,90,91,93,95,97,98,100,102,104,106,108,110,112,115,117,119,121,124,126,129,131,133,136,139,141,144,146,149,152,154,157,160];
var bleedResistArray = [0,0,0,0,0,0,0,0, 33, 37, 40, 44, 48, 52, 56, 60, 63, 65, 68, 71, 73, 76, 79, 81, 84, 87, 89, 92, 95, 97, 100, 101, 101, 102, 103, 104, 104, 105, 106, 107, 107, 108, 109, 109, 110, 111, 112, 112, 113, 114, 114, 115, 116, 117, 117, 118, 119, 120, 120, 121, 122, 122, 123, 124, 125, 125, 126, 127, 128, 128, 129, 130, 130, 131, 132, 133, 133, 134, 135, 136, 136, 137, 138, 138, 139, 140, 141, 141, 142, 143, 143, 144, 145, 146, 146, 147, 148, 149, 149, 150];
var bleedResistArray = [0,0,0,0,0,0,0,0, 33, 37, 40, 44, 48, 52, 56, 60, 63, 65, 68, 71, 73, 76, 79, 81, 84, 87, 89, 92, 95, 97, 100, 101, 101, 102, 103, 104, 104, 105, 106, 107, 107, 108, 109, 109, 110, 111, 112, 112, 113, 114, 114, 115, 116, 117, 117, 118, 119, 120, 120, 121, 122, 122, 123, 124, 125, 125, 126, 127, 128, 128, 129, 130, 130, 131, 132, 133, 133, 134, 135, 136, 136, 137, 138, 138, 139, 140, 141, 141, 142, 143, 143, 144, 145, 146, 146, 147, 148, 149, 149, 150];
var poisonResistArray = [0,0,0,0,0,0,0,0, 26, 28, 30, 36, 42, 48, 54, 60, 63, 65, 68, 71, 73, 76, 79, 81, 84, 87, 89, 92, 95, 97, 100, 101, 101, 102, 103, 104, 104, 105, 106, 107, 107, 108, 109, 109, 110, 111, 112, 112, 113, 114, 114, 115, 116, 117, 117, 118, 119, 120, 120, 121, 122, 122, 123, 124, 125, 125, 126, 127, 128, 128, 129, 130, 130, 131, 132, 133, 133, 134, 135, 136, 136, 137, 138, 138, 139, 140, 141, 141, 142, 143, 143, 144, 145, 146, 146, 147, 148, 149, 149, 150];

function dsCharacter() {
  this.className;
  this.soulLevel;
  this.vitality;
  this.attunement;
  this.endurance;
  this.strength;
  this.dexterity;
  this.resistance;
  this.intelligence;
  this.faith;  
      
  this.initWithStats = function(stats) {
    this.className = stats[0];
    this.soulLevel = stats[1];
    this.vitality = stats[2];
    this.attunement = stats[3];
    this.endurance = stats[4];
    this.strength = stats[5];
    this.dexterity = stats[6];
    this.resistance = stats[7];
    this.intelligence = stats[8];
    this.faith = stats[9];
    
    return this;    
  }
  
  // Accessor Functions
  this.getHP = function() {
    if (this.vitality > hitPointsArray.length) return hitPointsArray[hitPointsArray.length-1];
    return hitPointsArray[this.vitality];      
  }
  
  this.getStamina = function() {
    if (this.endurance > staminaArray.length) return staminaArray[staminaArray.length-1];
    return staminaArray[this.endurance];
  }
  
  this.getEquipLoad = function() {
    return this.endurance + 34;
  }  
    
  this.getBleedResist = function() {
    return bleedResistArray[this.endurance];
  }

  this.getPoisonResist = function() {
    return poisonResistArray[this.resistance];
  }
  
  this.getSpellSlots = function() {
    if (this.attunement >= 0  && this.attunement <= 9 ) return 0; 
    if (this.attunement >= 10 && this.attunement <= 11) return 1;
    if (this.attunement >= 12 && this.attunement <= 13) return 2;
    if (this.attunement >= 14 && this.attunement <= 15) return 3;
    if (this.attunement >= 16 && this.attunement <= 18) return 4;
    if (this.attunement >= 19 && this.attunement <= 22) return 5;
    if (this.attunement >= 23 && this.attunement <= 27) return 6;
    if (this.attunement >= 28 && this.attunement <= 33) return 7;
    if (this.attunement >= 34 && this.attunement <= 40) return 8;
    if (this.attunement >= 41 && this.attunement <= 49) return 9;
    if (this.attunement >= 50 && this.attunement <= 99) return 10;
  }  
    
  // Consider lazy loading/caching this.
  this.calculateSoulCost = function(fromSoulLevel) {      
    if (fromSoulLevel == this.soulLevel) return 0;
    
    var temp = 0;
    for (i = fromSoulLevel; i < this.soulLevel; i++) temp = temp + parseInt(getSoulCost(i));
    
    return temp;
  }
  
  this.findSoulCost = function(level) {
    if(this.soulLevel < soulCostsArray.length)
    {
        return soulCostsArray[level];
    }
    else
    {
        return Math.round((1/2.5)*Math.pow(((this.soulLevel+10)*1.1),2.5));
    }    
  }
  
  this.getSoulCost = function() {
    return this.findSoulCost(this.soulLevel);
  }  
}