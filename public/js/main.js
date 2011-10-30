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
  
  // ############################################################################
  // 
  // Conversions
  // 
  var hitPointsArray = [0,400,415,433,451,471,490,511,530,552,572,594,616,638,658,682,698,718,742,766,792,821,849,878,908,938,970,1001,1034,1066,1100,1123,1147,1170,1193,1216,1239,1261,1283,1304,1325,1346,1366,1386,1405,1424,1442,1458,1474,1489,1500,1508,1517,1526,1535,1544,1553,1562,1571,1580,1588,1597,1606,1615,1623,1632,1641,1649,1658,1666,1675,1683,1692,1700,1709,1717,1725,1734,1742,1750,1758,1767,1775,1783,1791,1799,1807,1814,1822,1830,1837,1845,1852,1860,1867,1874,1881,1888,1894,1900];
  // Endurance
  var staminaArray = [81,82,83,84,85,86,87,88,90,91,93,95,97,98,100,102,104,106,108,110,112,115,117,119,121,124,126,129,131,133,136,139,141,144,146,149,152,154,157,160];
  var bleedResistArray = [0,0,0,0,0,0,0,0, 33, 37, 40, 44, 48, 52, 56, 60, 63, 65, 68, 71, 73, 76, 79, 81, 84, 87, 89, 92, 95, 97, 100, 101, 101, 102, 103, 104, 104, 105, 106, 107, 107, 108, 109, 109, 110, 111, 112, 112, 113, 114, 114, 115, 116, 117, 117, 118, 119, 120, 120, 121, 122, 122, 123, 124, 125, 125, 126, 127, 128, 128, 129, 130, 130, 131, 132, 133, 133, 134, 135, 136, 136, 137, 138, 138, 139, 140, 141, 141, 142, 143, 143, 144, 145, 146, 146, 147, 148, 149, 149, 150];
  var bleedResistArray = [0,0,0,0,0,0,0,0, 33, 37, 40, 44, 48, 52, 56, 60, 63, 65, 68, 71, 73, 76, 79, 81, 84, 87, 89, 92, 95, 97, 100, 101, 101, 102, 103, 104, 104, 105, 106, 107, 107, 108, 109, 109, 110, 111, 112, 112, 113, 114, 114, 115, 116, 117, 117, 118, 119, 120, 120, 121, 122, 122, 123, 124, 125, 125, 126, 127, 128, 128, 129, 130, 130, 131, 132, 133, 133, 134, 135, 136, 136, 137, 138, 138, 139, 140, 141, 141, 142, 143, 143, 144, 145, 146, 146, 147, 148, 149, 149, 150];
  var poisonResistArray = [0,0,0,0,0,0,0,0, 26, 28, 30, 36, 42, 48, 54, 60, 63, 65, 68, 71, 73, 76, 79, 81, 84, 87, 89, 92, 95, 97, 100, 101, 101, 102, 103, 104, 104, 105, 106, 107, 107, 108, 109, 109, 110, 111, 112, 112, 113, 114, 114, 115, 116, 117, 117, 118, 119, 120, 120, 121, 122, 122, 123, 124, 125, 125, 126, 127, 128, 128, 129, 130, 130, 131, 132, 133, 133, 134, 135, 136, 136, 137, 138, 138, 139, 140, 141, 141, 142, 143, 143, 144, 145, 146, 146, 147, 148, 149, 149, 150];
  
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
        getRootUrl: function()
        {
          var locationObj = window.location;
          return (locationObj.protocol + "//" + locationObj.host + "/");
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
            case "attunement":
              $("#spellslots .current").val(CalculateSpellSlots(newValue));
              break;
            default:
              break;
        }

        
        newCost = CalculateSoulCost(currentSoulLevel);
        $("#calc .current").val(newCost);
        
        SetCode(GetCurrentStats());
    }
    
    // Setup Table function
    window.CharSetup = function($code)
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
      
      // ------------------------------------------------
      // starting stats
      var startSoulLevel    = selectedClassArray[1];
      var startVitality     = selectedClassArray[2];
      var startAttunement   = selectedClassArray[3];
      var startEndurance    = selectedClassArray[4];
      var startStrength     = selectedClassArray[5];
      var startDexterity    = selectedClassArray[6];
      var startResistance   = selectedClassArray[7];
      var startIntelligence = selectedClassArray[8];
      var startFaith        = selectedClassArray[9];
      // set the values
      $("#calc .start").val();
      $("#soullevel .start").text(startSoulLevel);
      $("#vitality .start").text(startVitality);
      $("#attunement .start").text(startAttunement);
      $("#endurance .start").text(startEndurance);
      $("#strength .start").text(startStrength);
      $("#dexterity .start").text(startDexterity);
      $("#resistance .start").text(startResistance);
      $("#intelligence .start").text(startIntelligence);
      $("#faith .start").text(startFaith);

      // ------------------------------------------------
      // current stats
      var currentSoulLevel    = currentClassArray[1];
      var currentVitality     = currentClassArray[2];
      var currentAttunement   = currentClassArray[3];
      var currentEndurance    = currentClassArray[4];
      var currentStrength     = currentClassArray[5];
      var currentDexterity    = currentClassArray[6];
      var currentResistance   = currentClassArray[7];
      var currentIntelligence = currentClassArray[8];
      var currentFaith        = currentClassArray[9];
      // set the values
      SetStat($("#soullevel .current"), currentSoulLevel);
      SetStat($("#vitality .current"), currentVitality);
      SetStat($("#attunement .current"), currentAttunement);
      SetStat($("#endurance .current"), currentEndurance);
      SetStat($("#strength .current"), currentStrength);
      SetStat($("#dexterity .current"), currentDexterity);
      SetStat($("#resistance .current"), currentResistance);
      SetStat($("#intelligence .current"), currentIntelligence);
      SetStat($("#faith .current"), currentFaith);

      // calc   
      $("#calc .current").val(CalculateSoulCost(currentSoulLevel));
      $("#calc .total").text(ParseSoulCost(startSoulLevel, currentSoulLevel));

      // CONVERSIONSSSSSSSS
      $("#HP .current").val(CalculateHitPoints(currentVitality));
      $("#stamina .current").val(CalculateStamina(currentEndurance));
      $("#equipload .current").val(CalculateEquipLoad(currentEndurance));
      $("#bleedresist .current").val(CalculateBleedResist(currentEndurance));
      $("#poisonresist .current").val(CalculatePoisonResist(currentResistance));
      $("#spellslots .current").val(CalculateSpellSlots(currentAttunement));

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
    
    function CalculateBleedResist(endurance)
    {
      return bleedResistArray[endurance];
    }

    function CalculatePoisonResist(resistance)
    {
      return poisonResistArray[resistance];
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
        var code = $.base64Encode($data.toString());
        $("#templateCode").val($.getRootUrl() + "?c=" + code);
        $("#profile_stats").val(code)
        
    }
    
    window.GetCode = function($data)
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
});
