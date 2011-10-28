$(document).ready(function()
{
	// Variables
	var charClass = $("#class");
	
	var stats_warrior = ["",4,11,8,12,13,13,11,9,9];
	var stats_knight = ["",5,14,10,10,11,11,10,9,11];
	var stats_wanderer = ["",3,10,11,10,10,14,12,11,8];
	var stats_thief = ["",5,9,11,9,9,15,10,12,11];
	var stats_bandit = ["",4,12,8,14,14,9,11,8,10];
	var stats_hunter = ["",4,11,9,11,12,14,11,9,9];
	var stats_sorcerer = ["",3,8,15,8,9,11,8,15,8];
	var stats_pyromancer = ["",1,10,12,11,12,9,12,10,8];
	var stats_cleric = ["",2,11,11,9,12,8,11,8,14];
	var stats_deprived = ["",6,11,11,11,11,11,11,11,11];
	
	var soulCostsArray = [0,673,690,707,724,741,758,775,793,811,829,847,1039,1238,1445,1660,1883,2114,2353,2601,2857,3122,3396,3678,3970,4271,4581,4900,5229,5567,5915,6273,6641,7019,7407,7805,8214,8634,9064,9505,9957,10420,10894,11379,11876,12384,12904,13436,13979,14535,15103,15683,16275,16880,17497,18127,18770,19426,20095,20777,21472,22181,22904,23640,24390,25154,25932,26724,27530,28351,29186,30036,30901,31780,32675,33585,34510,35450,36406,37377,38364,39367,40386,41421,42472,43539,44623,45724,46841,47975,49126,50294,51479,52681,53901,55138,56393,57666,58956,60265,61592,62937,64300,65682,67082,68501,69939,71396,72872,74367,75881,77415,78969,80542,82135,83748,85381,87034,88707,90401,92115,93850,95606,97382,99180,100999,102839,104700,106583,108487,110413,112361,114331,116323,118337,120373,122432,124514,126618,128745,130895,133068,135264,137483,139726,141992];
	var hitPointsArray = [0,400,415,433,451,471,490,511,530,552,572,594,616,638,658,682,698,718,742,766,792,821,849,878,908,938,970,1001,1034,1066,1100,1123,1147,1170,1193,1216,1239,1261,1283,1304,1325,1346,1366,1386,1405,1424,1442,1458,1474,1489,1500,1508,1517,1526,1535,1544,1553,1562,1571,1580,1588,1597,1606,1615,1623,1632,1641,1649,1658,1666,1675,1683,1692,1700,1709,1717,1725,1734,1742,1750,1758,1767,1775,1783,1791,1799,1807,1814,1822,1830,1837,1845,1852,1860,1867,1874,1881,1888,1894,1900];
	var staminaArray = [81,82,83,84,85,86,87,88,90,91,93,95,97,98,100,102,104,106,108,110,112,115,117,119,121,124,126,129,131,133,136,139,141,144,146,149,152,154,157,160];
	
	var cacheCurrentStat;
	var cacheClass = charClass.find("option:selected");
	
	var cacheStats;
	
	
	// GET URL VARS
	$.extend(
	{
		getUrl: function()
		{
			var locationObj = window.location;
			return (locationObj.protocol + "//" + locationObj.host + locationObj.pathname);
		},
		getUrlVars: function()
		{
			var vars = [], hash;
	    	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    	for(var i = 0; i < hashes.length; i++)
	    	{
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
	    	}
			return vars;
		},
		getUrlVar: function(name)
		{
			return $.getUrlVars()[name];
		}
	});
	
	// LISTENERS
	// ------------------------------------------------------------------------
	charClass.change(function()
	{
		CharSetup();
   	});

	// Clear the value of the input when clicked
	$(".current").focus(function()
	{
		cacheCurrentStat = $(this).val();
	});
	
	// When the input value changes, process the new value
	$(".current").change(function()
	{
		
		AdjustStat($(this), "calc")
			
		$(this).blur();
		
	});
	
	
	// Add +1 to stat
	$(".add").click(function($e)
	{
		cacheCurrentStat = $(this).parents(".stat").find(".current").val();
		
		var amount = 0;
		
		if ($e.shiftKey) amount = 10;
		else amount = 1;
		
		AdjustStat($(this), amount);
		
		$(this).parents(".stat").find(".current").focus();
//		
	});
	
	// Subtract -1 from stat
	$(".subtract").click(function($e)
	{
		cacheCurrentStat = $(this).parents(".stat").find(".current").val();
		
		var amount = 0;
		
		if ($e.shiftKey) amount = -10;
		else amount = -1;
		
		AdjustStat($(this), amount);
		
		$(this).parents(".stat").find(".current").focus();
		
	});
	
	$(".edit").keypress(function($e)
	{
		var key = $e.which;
		
		if (key == 13) $(this).change();
	});
	
	$(".edit").keydown(function($e)
	{

		var key = $e.which;
		var hotkey = false;
		var amount = 0;
		
		if (key == 38)
		{
			hotkey = true;
			if ($e.shiftKey) amount = 10;
			else amount = 1;
		}
		if (key == 40)
		{
			hotkey = true;
			if ($e.shiftKey) amount = -10;
			else amount = -1;
		}
		
		if (hotkey)
		{
			$e.target.blur();
			$e.preventDefault();
			
			AdjustStat($(this), amount);
			$(this).focus();
			
			
		}
	});
	
	// Visual up/down for + and -
	$(".subtract, .add").mousedown(function()
	{
		$(this).css({backgroundPosition: "0 -20px"});
	});
	
	$(".subtract, .add").mouseup(function()
	{
		$(this).css({backgroundPosition: "0 0"});
	});


	$("#templateCode").click(function()
	{
		$(this).focus();
		$(this).select();
	});

	// FUNCTIONS
	// ------------------------------------------------------------------------
	function AdjustStat($item, $mod, $plusMinus)
	{

		
		var itemPath = $item.parents(".stat");
		var currentItem = itemPath.find(".current");
		var currentValue = parseInt(currentItem.val());
		var startValue = parseInt(itemPath.find(".start").text());

		var startSoulLevel = parseInt($("#soullevel .start").text());
		var currentSoulLevel = parseInt($("#soullevel .current").val());
		
		var soulModifier = $mod;
		var modifier = $mod;
		var newValue;
		
		var canRun = false;
		
		var newCost;
		
		// Check Adjustment Type
		if (modifier == "calc")
		{
			// Clamp if we're over 99 or under start value
			if (currentValue > 99) currentValue = 99;
			if (currentValue >= startValue)
			{
				// We've hit Enter, and we're OK
				modifier = currentValue - startValue;
				newValue = currentValue;
				
				
				soulModifier = newValue - cacheCurrentStat;
				
			}
			else
			{
				// We've hit Enter, but our value is below the START Value for this class, set to START Value
				newValue = startValue;
				
				modifier  = 0;
				soulModifier = newValue - cacheCurrentStat;
			}
		}
		else
		{
			// We are using the PLUS/MINUS
			// store the newValue, because we're all CLEAR!
			// Clamp if we're over 99 or under start value
			if ((currentValue + modifier) > 99)
			{				
				newValue = 99;
				soulModifier = 99 -currentValue;
			}
			else if (currentValue >= startValue && (currentValue + modifier) >= startValue && currentValue <= 99) newValue = currentValue + modifier;
			else
			{
				// We went too low, so set it to the START Value
				newValue = startValue;
				soulModifier = newValue - cacheCurrentStat;
			}
		}
		
		// SET THE VALUE OF THE STAT
		SetStat(currentItem, newValue);
		
		currentSoulLevel += soulModifier;
		
		// Set Soul Level & Calculate cost
		SetStat($("#soullevel .current"), currentSoulLevel);
		$("#calc .total").text(ParseSoulCost(startSoulLevel, currentSoulLevel));
		
		
		// CHECK WHICH STAT IT IS
		switch (itemPath.attr("id"))
		{
			case "vitality":
				$("#HP .current").val(CalculateHitPoints(newValue));
				break;
			case "endurance":
				$("#stamina .current").val(CalculateStamina(newValue));
				$("#equipload .current").val(CalculateEquipLoad(newValue));
				break;
			default:
				break;
		}

		
		newCost = CalculateSoulCost(currentSoulLevel);
		$("#calc .current").val(newCost);
		
		SetCode(GetCurrentStats());
	}
	
	// Setup Table function
	function CharSetup($code)
	{
		
		var currentClassArray;
		var selectedClass = charClass.find("option:selected");
		

		
		var selectedClassArray = GetClassArray(selectedClass);
		
		if ($code != undefined)
		{			
			currentClassArray = $code;
			
			var className = currentClassArray[0];
			
			// Select the option with value 
			selectedClass = charClass.find("option:selected");
			selectedClass.attr("selected", false);
			
			selectedClass = charClass.find("option[value="+className+"]");
			selectedClass.attr("selected",true);
			charClass.change();
			
			
			selectedClassArray = GetClassArray(selectedClass);
		}
		else currentClassArray = selectedClassArray;
		
		// Set the names
		cacheClass.text(GetClassArray(cacheClass)[1] + " - " + cacheClass.val());
		selectedClass.text(selectedClass.val());
		
		
		var startSoulLevel = selectedClassArray[1];
		var currentSoulLevel = currentClassArray[1];
		
		//starting stats
		$("#calc .start").val();
		$("#soullevel .start").text(startSoulLevel);
		
		$("#vitality .start").text(selectedClassArray[2]);
		$("#attunement .start").text(selectedClassArray[3]);
		$("#endurance .start").text(selectedClassArray[4]);
		$("#strength .start").text(selectedClassArray[5]);
		$("#dexterity .start").text(selectedClassArray[6]);
		$("#resistance .start").text(selectedClassArray[7]);
		$("#intelligence .start").text(selectedClassArray[8]);
		$("#faith .start").text(selectedClassArray[9]);
		
		
		// current stats
		SetStat($("#soullevel .current"), currentSoulLevel);
		SetStat($("#vitality .current"), currentClassArray[2]);
		SetStat($("#attunement .current"), currentClassArray[3]);
		SetStat($("#endurance .current"), currentClassArray[4]);
		SetStat($("#strength .current"), currentClassArray[5]);
		SetStat($("#dexterity .current"), currentClassArray[6]);
		SetStat($("#resistance .current"), currentClassArray[7]);
		SetStat($("#intelligence .current"), currentClassArray[8]);
		SetStat($("#faith .current"), currentClassArray[9]);
		
		// calc		
		$("#calc .current").val(CalculateSoulCost(currentSoulLevel));
		$("#calc .total").text(ParseSoulCost(startSoulLevel, currentSoulLevel));
		
		// Set Vitality
		$("#HP .current").val(CalculateHitPoints(currentClassArray[1]));
		$("#stamina .current").val(CalculateStamina(currentClassArray[4]));
		$("#equipload .current").val(CalculateEquipLoad(currentClassArray[4]));
		
		
		
		// Set the cache
		cacheClass = selectedClass;
		cacheStats = GetCurrentStats();
		
		// Set the template code
		SetCode(cacheStats);
		

	};
	
	function SetStat($item, $value)
	{
		var currentItem = $item;
		var startValue = currentItem.parent().find(".start").text();
		
		$(currentItem).val($value);
		
		if ($value > startValue)
		{			
			currentItem.css("color", "red");
		}
		else
		{
			currentItem.css("color", "#fff");
		}
		
	};
	
	// Returns the Array for the specified HTML object
	function GetClassArray(tempClass)
	{
		var className = tempClass.val();
		
		return eval("stats_" + className.toLowerCase());
	}
	
	function GetCurrentStats()
	{
		
		temp = [];
		temp.push(cacheClass.val());
		temp.push($("#soullevel .current").val());
		temp.push($("#vitality .current").val());
		temp.push($("#attunement .current").val());
		temp.push($("#endurance .current").val());
		temp.push($("#strength .current").val());
		temp.push($("#dexterity .current").val());
		temp.push($("#resistance .current").val());
		temp.push($("#intelligence .current").val());
		temp.push($("#faith .current").val());
		
		return toArray(temp);
	}
	
	
	// CONVERSIONS
	function CalculateHitPoints(vitality)
	{
		if (vitality > hitPointsArray.length) return hitPointsArray[hitPointsArray.length-1];
		return hitPointsArray[vitality];
	}
	
	function CalculateStamina(endurance)
	{
		if (endurance > staminaArray.length) return staminaArray[staminaArray.length-1];
		return staminaArray[endurance];
	}
	
	function CalculateEquipLoad(endurance)
	{
		return parseInt($("#endurance .current").val()) + 34;
	}
	
	
	
	
	// Calculate Spell Slots
	function CalculateSpellSlots(value)
	{
		if (value >= 0  && value <= 9 ) return 0;
		if (value >= 10 && value <= 11) return 1;
		if (value >= 12 && value <= 13) return 2;
		if (value >= 14 && value <= 15) return 3;
		if (value >= 16 && value <= 18) return 4;
		if (value >= 19 && value <= 22) return 5;
		if (value >= 23 && value <= 27) return 6;
		if (value >= 28 && value <= 33) return 7;
		if (value >= 34 && value <= 40) return 8;
		if (value >= 41 && value <= 49) return 9;
		if (value >= 50 && value <= 99) return 10;
	}
	
	
	
	
	// Parse the array of costs, unless you get to the end, then use the APPX formula
	function ParseSoulCost(startSoulLevel, currentSoulLevel)
	{
		
		if (startSoulLevel == currentSoulLevel) return 0;
		
		var temp = 0;
		for (i = startSoulLevel; i < currentSoulLevel; i++) temp = temp + parseInt(CalculateSoulCost(i));
		
		return temp;
	}
	
	// james
	function CalculateSoulCost(level)
	{
		if(level < soulCostsArray.length)
		{
			return soulCostsArray[level];
		}
		else
		{
			return Math.round((1/2.5)*Math.pow(((level+10)*1.1),2.5));
		}
	}
	
	function SetCode($data)
	{
		$("#templateCode").val($.getUrl() + "?c=" + $.base64Encode($data.toString()));
	}
	
	function GetCode($data)
	{
		if (!$data) return undefined;
		var str = $.base64Decode($data);
		var array=str.split(",");		
		
		toArray(array);
		
		return array;
	}
	
	function toArray($data)
	{
		$.each($data, function(index, value)
		{
			if (!isNaN(parseInt(value))) $data[index] = parseInt(value);
		});
		
		return $data;
	}
	
	// Run the CharSetup function
	var params = GetCode($.getUrlVar("c"));	
	CharSetup(params);
	
});