$(document).ready(function()
{
	
	// Variables
	var charClass = $("#class");
	
	var stats_warrior = [11,8,12,13,13,11,9,9,4];
	var stats_knight = [14,10,10,11,11,10,9,11,5];
	var stats_wanderer = [10,11,10,10,14,12,11,8,3];
	var stats_thief = [9,11,9,9,15,10,12,11,5];
	var stats_bandit = [12,8,14,14,9,11,8,10,4];
	var stats_hunter = [11,9,11,12,14,11,9,9,4];
	var stats_sorcerer = [8,15,8,9,11,8,15,8,3];
	var stats_pyromancer = [10,12,11,12,9,12,10,8,1];
	var stats_cleric = [11,11,9,12,8,11,8,14,2];
	var stats_deprived = [11,11,11,11,11,11,11,11,6];
	
	var soulCosts = [0,673,690,707,724,741,758,775,793,811,829,847,1039,1238,1445,1660,1883,2114,2353,2601,2857,3122,3396,3678,3970,4271,4581,4900,5229,5567,5915,6273,6641,7019,7407,7805,8214,8634,9064,9505,9957,10420,10894,11379,11876,12384,12904,13436,13979,14535,15103,15683,16275,16880,17497,18127,18770,19426,20095,20777,21472,22181,22904,23640,24390,25154,25932,26724,27530,28351,29186,30036,30901,31780,32675,33585,34510,35450,36406,37377,38364,39367,40386,41421,42472,43539,44623,45724,46841,47975,49126,50294,51479,52681,53901,55138,56393,57666,58956,60265,61592,62937,64300,65682,67082,68501,69939,71396,72872,74367,75881,77415,78969,80542,82135,83748,85381,87034,88707,90401,92115,93850,95606,97382,99180,100999,102839,104700,106583,108487,110413,112361,114331,116323,118337,120373,122432,124514,126618,128745,130895,133068,135264,137483,139726,141992];
	
	// Listeners
	charClass.change(function()
	{
		CharSetup();
   	});
	
	$(".test").change(function()
	{
		alert("shaboosh");
		
	});
	
	$(".add").click(function()
	{
		var currentValue = parseInt($(this).parent().find(".current").text());
		
		var soulLevelStart = parseInt($("#soullevel .start").text());
		var soulLevel = parseInt($("#soullevel .current").text());
		var currentItem = $(this).parent().find(".current");
		
		
		currentItem.text(currentValue + 1);
		currentItem.css("color", "red");
		$("#soullevel .current").css("color", "red");
	
		soulLevel += 1;
		$("#soullevel .current").text(soulLevel);
		$("#calc .current").text(soulCosts[soulLevel]);
		$("#calc .total").text(calculateCost(soulLevelStart, soulLevel));
		
	});
	
	$(".subtract").click(function()
	{
		var startValue = parseInt($(this).parent().find(".start").text());
		var currentValue = parseInt($(this).parent().find(".current").text());
		
		var soulLevelStart = parseInt($("#soullevel .start").text());
		var soulLevel = parseInt($("#soullevel .current").text());
		var currentItem = $(this).parent().find(".current");
		
		if (currentValue > startValue)
		{
			currentItem.html(currentValue - 1);
		
			if (currentValue == startValue + 1)
			{
				currentItem.css("color", "#fefefe");
			}
			soulLevel -= 1;
			
			$("#soullevel .current").text(soulLevel);
			$("#calc .current").text(soulCosts[soulLevel]);
			$("#calc .total").text(calculateCost(soulLevelStart, soulLevel));
		}
		
		
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
		$("#soullevel .start").text(selectedStat[8]);
		
		$("#vitality .start").text(selectedStat[0]);
		$("#attunement .start").text(selectedStat[1]);
		$("#endurance .start").text(selectedStat[2]);
		$("#strength .start").text(selectedStat[3]);
		$("#dexterity .start").text(selectedStat[4]);
		$("#resistance .start").text(selectedStat[5]);
		$("#intelligence .start").text(selectedStat[6]);
		$("#faith .start").text(selectedStat[7]);
		
		// calc
		$("#calc .start").text(soulCosts[parseInt($("#soullevel .start").text())]);
		
		
		// current stats
		$("#soullevel .current").text(selectedStat[8]);
		
		$("#vitality .current").text(selectedStat[0]);
		$("#attunement .current").text(selectedStat[1]);
		$("#endurance .current").text(selectedStat[2]);
		$("#strength .current").text(selectedStat[3]);
		$("#dexterity .current").text(selectedStat[4]);
		$("#resistance .current").text(selectedStat[5]);
		$("#intelligence .current").text(selectedStat[6]);
		$("#faith .current").text(selectedStat[7]);
		
		// calc
		
		
		var soulLevel = parseInt($("#soullevel .current").text());
		
		$("#calc .current").text(soulCosts[soulLevel]);
		$("#calc .total").text(0);
		
	};
	
	function calculateCost(soulLevelStart, soulLevel)
	{
		
		if (soulLevelStart == soulLevel) return 0;
		
		var temp = 0;
		for (i = soulLevelStart; i < soulLevel; i++) temp = temp + parseInt(soulCosts[i]);
		
		return temp;
	}
});