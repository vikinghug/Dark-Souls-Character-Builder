$(document).ready(function()
{
	
	// Variables
	var charClass = $("#class");
	
	var stats_warrior = [4,11,8,12,13,13,11,9,9];
	var stats_knight = [5,14,10,10,11,11,10,9,11];
	var stats_wanderer = [3,10,11,10,10,14,12,11,8];
	var stats_thief = [5,9,11,9,9,15,10,12,11];
	var stats_bandit = [4,12,8,14,14,9,11,8,10];
	var stats_hunter = [4,11,9,11,12,14,11,9,9];
	var stats_sorcerer = [3,8,15,8,9,11,8,15,8];
	var stats_pyromancer = [1,10,12,11,12,9,12,10,8];
	var stats_cleric = [2,11,11,9,12,8,11,8,14];
	var stats_deprived = [6,11,11,11,11,11,11,11,11];
	
	var soulCostsArray = [0,673,690,707,724,741,758,775,793,811,829,847,1039,1238,1445,1660,1883,2114,2353,2601,2857,3122,3396,3678,3970,4271,4581,4900,5229,5567,5915,6273,6641,7019,7407,7805,8214,8634,9064,9505,9957,10420,10894,11379,11876,12384,12904,13436,13979,14535,15103,15683,16275,16880,17497,18127,18770,19426,20095,20777,21472,22181,22904,23640,24390,25154,25932,26724,27530,28351,29186,30036,30901,31780,32675,33585,34510,35450,36406,37377,38364,39367,40386,41421,42472,43539,44623,45724,46841,47975,49126,50294,51479,52681,53901,55138,56393,57666,58956,60265,61592,62937,64300,65682,67082,68501,69939,71396,72872,74367,75881,77415,78969,80542,82135,83748,85381,87034,88707,90401,92115,93850,95606,97382,99180,100999,102839,104700,106583,108487,110413,112361,114331,116323,118337,120373,122432,124514,126618,128745,130895,133068,135264,137483,139726,141992];
	var hitPointsArray = [0,400,415,433,451,471,490,511,530,552,572,594,616,638,658,682,698,718,742,766,792,821,849,878,908,938,970,1001,1034,1066,1100,1123,1147,1170,1193,1216,1239,1261,1283,1304,1325,1346,1366,1386,1405,1424,1442,1458,1474,1489,1500,1508,1517,1526,1535,1544,1553,1562,1571,1580,1588,1597,1606,1615,1623,1632,1641,1649,1658,1666,1675,1683,1692,1700,1709,1717,1725,1734,1742,1750,1758,1767,1775,1783,1791,1799,1807,1814,1822,1830,1837,1845,1852,1860,1867,1874,1881,1888,1894,1900];
	
	var cacheCurrentStat;
	var cacheClass = charClass.find("option:selected");
	
	
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
	$(".add").click(function()
	{
		AdjustStat($(this), 1);

	});
	
	// Subtract -1 from stat
	$(".subtract").click(function()
	{

		AdjustStat($(this), -1);	
		
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
			
			//console.debug(currentValue)
			if (currentValue >= startValue)
			{
				canRun = true;
				
				modifier = currentValue - startValue;
				newValue = currentValue;
				
				
				soulModifier = newValue - cacheCurrentStat;
				
			}
			else
			{
				canRun = true;
				
				soulModifier = 0;
				modifier  = 0;
				newValue = cacheCurrentStat;
			}
		}
		
		// Set the value
		if (currentValue >= startValue && (currentValue + $mod) >= startValue)
		{
			canRun = true;
			
			newValue = currentValue + modifier;
		}
		
		
		// SET THE VALUE OF THE STAT
		currentItem.val(newValue);
		
		if (newValue > startValue)
		{
			canRun = true;
			
			currentItem.css("color", "red");
			//$("#soullevel .current").css("color", "red");
		}
		else
		{
			currentItem.css("color", "#fff");
		}
		
		
		if (canRun)
		{
			currentSoulLevel += soulModifier;
			
			$("#soullevel .current").val(currentSoulLevel);
			$("#calc .total").text(ParseSoulCost(startSoulLevel, currentSoulLevel));
			
			
			// CHECK WHICH STAT IT IS
			switch (itemPath.attr("id"))
			{
				case "vitality":
					$("#HP .current").val(CalculateHitPoints(newValue));
					break;
				case "endurance":
					break;
				default:
					break;
			}

		}
		
		newCost = CalculateSoulCost(currentSoulLevel);
		$("#calc .current").val(newCost);
	}
	
	
	
	// Returns the Array for the specified HTML object
	function GetClassArray(tempClass)
	{
		var className = tempClass.val();
		
		return eval("stats_" + className.toLowerCase());
	}
	
	// Setup Table function
	function CharSetup()
	{

		
		
		var selectedClass = charClass.find("option:selected");
		
		// Set the names
		cacheClass.text(GetClassArray(cacheClass)[0] + " - " + cacheClass.val());
		selectedClass.text(selectedClass.val());
		
		var selectedClassArray = GetClassArray(selectedClass);
		
		
		//starting stats
		$("#calc .start").val();
		$("#soullevel .start").text(selectedClassArray[0]);
		
		$("#vitality .start").text(selectedClassArray[1]);
		$("#attunement .start").text(selectedClassArray[2]);
		$("#endurance .start").text(selectedClassArray[3]);
		$("#strength .start").text(selectedClassArray[4]);
		$("#dexterity .start").text(selectedClassArray[5]);
		$("#resistance .start").text(selectedClassArray[6]);
		$("#intelligence .start").text(selectedClassArray[7]);
		$("#faith .start").text(selectedClassArray[8]);
		
		
		// current stats
		$("#soullevel .current").val(selectedClassArray[0]);
		$("#vitality .current").val(selectedClassArray[1]);
		$("#attunement .current").val(selectedClassArray[2]);
		$("#endurance .current").val(selectedClassArray[3]);
		$("#strength .current").val(selectedClassArray[4]);
		$("#dexterity .current").val(selectedClassArray[5]);
		$("#resistance .current").val(selectedClassArray[6]);
		$("#intelligence .current").val(selectedClassArray[7]);
		$("#faith .current").val(selectedClassArray[8]);
		
		// calc
		
		
		var soulLevel = parseInt($("#soullevel .current").val());
		
		$("#calc .current").val(CalculateSoulCost(soulLevel));
		$("#calc .total").text(0);
		
		// Set Vitality
		$("#HP .current").val(CalculateHitPoints(selectedClassArray[1]));
		
		
		
		// Set the cache
		cacheClass = selectedClass;
		
	};
	
	function CalculateHitPoints(vitality)
	{
		return hitPointsArray[vitality];
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
	
	// Run the CharSetup function
	CharSetup();
});