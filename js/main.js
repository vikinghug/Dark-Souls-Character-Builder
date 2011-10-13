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
	
	var soulCosts = [0,673,690,707,724,741,758,775,793,811,829,847,1039,1238,1445,1660,1883,2114,2353,2601,2857,3122,3396,3678,3970,4271,4581,4900,5229,5567,5915,6273,6641,7019,7407,7805,8214,8634,9064,9505,9957,10420,10894,11379,11876,12384,12904,13436,13979,14535,15103,15683,16275,16880,17497,18127,18770,19426,20095,20777,21472,22181,22904,23640,24390,25154,25932,26724,27530,28351,29186,30036,30901,31780,32675,33585,34510,35450,36406,37377,38364,39367,40386,41421,42472,43539,44623,45724,46841,47975,49126,50294,51479,52681,53901,55138,56393,57666,58956,60265,61592,62937,64300,65682,67082,68501,69939,71396,72872,74367,75881,77415,78969,80542,82135,83748,85381,87034,88707,90401,92115,93850,95606,97382,99180,100999,102839,104700,106583,108487,110413,112361,114331,116323,118337,120373,122432,124514,126618,128745,130895,133068,135264,137483,139726,141992];
	
	// Listeners
	charClass.change(function()
	{
		CharSetup();
   	});

	function AdjustStat($item, $mod)
	{
		var currentItem = $item.parent().find(".current");
		var currentValue = parseInt(currentItem.val());
		var startValue = parseInt($item.parent().find(".start").text());

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
				
				
				soulModifier = newValue - test;
				
			}
			else
			{
				canRun = true;
				
				soulModifier = 0;
				modifier  = 0;
				newValue = test;
			}
		}
		
		// Set the value
		if (currentValue >= startValue && (currentValue + $mod) >= startValue)
		{
			canRun = true;
			
			newValue = currentValue + modifier;
		}
		
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
		
		
		newCost = calcSoulCost(currentSoulLevel);
		
		if (canRun)
		{
			currentSoulLevel += soulModifier;
			
			$("#soullevel .current").val(currentSoulLevel);
			$("#calc .current").val(newCost);
			$("#calc .total").text(calculateCost(startSoulLevel, currentSoulLevel));
		}
	}
	
	
	var test;
	
	$(".current").focus(function()
	{
		test = $(this).val();
	});
	
	
	$(".current").change(function()
	{
		AdjustStat($(this), "calc")
			
		$(this).blur();
		
	});
	
	$(".add").click(function()
	{
		
		AdjustStat($(this), 1);
		
	});
	
	$(".subtract").click(function()
	{

		AdjustStat($(this), -1);	
		
	});
	
	$(".subtract, .add").mousedown(function()
	{
		$(this).css({backgroundPosition: "0 -20px"});
	});
	
	$(".subtract, .add").mouseup(function()
	{
		$(this).css({backgroundPosition: "0 0"});
	});
	

	CharSetup();
	
	// Setup Table function
	function CharSetup()
	{
		
		var selectedClass = charClass.find("option:selected").text().toLowerCase();
		var selectedStat = eval("stats_" + selectedClass);
		
		
		//starting stats
		$("#calc .start").val()
		$("#soullevel .start").text(selectedStat[0]);
		
		$("#vitality .start").text(selectedStat[1]);
		$("#attunement .start").text(selectedStat[2]);
		$("#endurance .start").text(selectedStat[3]);
		$("#strength .start").text(selectedStat[4]);
		$("#dexterity .start").text(selectedStat[5]);
		$("#resistance .start").text(selectedStat[6]);
		$("#intelligence .start").text(selectedStat[7]);
		$("#faith .start").text(selectedStat[8]);
		
		// calc
		$("#calc .start").text(calcSoulCost[parseInt($("#soullevel .start").text())]);
		
		
		// current stats
		$("#soullevel .current").val(selectedStat[0]);
		
		$("#vitality .current").val(selectedStat[1]);
		$("#attunement .current").val(selectedStat[2]);
		$("#endurance .current").val(selectedStat[3]);
		$("#strength .current").val(selectedStat[4]);
		$("#dexterity .current").val(selectedStat[5]);
		$("#resistance .current").val(selectedStat[6]);
		$("#intelligence .current").val(selectedStat[7]);
		$("#faith .current").val(selectedStat[8]);
		
		// calc
		
		
		var soulLevel = parseInt($("#soullevel .current").val());
		
		$("#calc .current").val(calcSoulCost[soulLevel]);
		$("#calc .total").text(0);
		
	};
	
	function calculateCost(startSoulLevel, currentSoulLevel)
	{
		
		if (startSoulLevel == currentSoulLevel) return 0;
		
		var temp = 0;
		for (i = startSoulLevel; i < currentSoulLevel; i++) temp = temp + parseInt(calcSoulCost(i));
		
		return temp;
	}
	
	function calcSoulCost(level)
	{
		if(level < soulCosts.length) {
			return soulCosts[level];
		} else {
			return Math.round((1/2.5)*Math.pow(((level+10)*1.1),2.5));
		}
	}
});