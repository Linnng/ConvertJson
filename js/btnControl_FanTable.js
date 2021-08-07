
var nodeThArr =
[
    {'class': 'transparet', 'text': 'btn'},
    {'class': 'transparet', 'text': 'btn'},
    {'class': '',           'text': 'Sensor Name'},
    {'class': '',           'text': 'Low Temp'},
    {'class': '',           'text': 'Low Rpm'},
    {'class': '',           'text': 'High Temp'},
    {'class': '',           'text': 'High Rpm'},
    {'class': 'hidden',     'text': 'ttrip'},
    {'class': 'hidden',     'text': 'ttriphys'}
];

var nodeFuncBtns =
[
    {'div':'sensorDelete', 'onclick':'AddFanRow(this)', "span":'Add'},
    {'div':'sensorDelete', 'onclick':'removeRow(this)', "span":'Delete'}
];



$(function(){

    $('#addModuleBtn').click(function(e){

        var nodeSkuContainer = $("<div/>", {"class": "sensor_sku_container"});

        // title
        var skuInputTitle = $("<input/>", {"class": "sku_title", "type": "text", "placeholder": "(please type sku name)"});
        var skuH3 = $("<h3/>", {"class": "float_L"}).append(skuInputTitle);
        nodeSkuContainer.append(skuH3);

        var sensorFuncBtns =
        [
            {'box': 'function_btn_box float_R', 'div':'delete_module_btn', 'onclick':'removeSku(this)',       "span":'delete sku'}
        ];
        for(var i=0; i<sensorFuncBtns.length ;i++)
        {
            var funcBtnSpan= $("<span/>").text(sensorFuncBtns[i].span);
            var funcBtn    = $("<div/>", {"class": sensorFuncBtns[i].div, "onclick": sensorFuncBtns[i].onclick}).append(funcBtnSpan);
            var funcBtnBox = $("<div/>", {"class": sensorFuncBtns[i].box}).append(funcBtn);

            nodeSkuContainer.append(funcBtnBox);
        }
        nodeSkuContainer.append( $("<div/>", {"class": "clear"}) );


        // fan table
        var Ustt =
        [
            {"Ustt": '"Balance" MODE [Defalut Mode]', "tag": "BAL"},
            {"Ustt": '"Cool" MODE',                   "tag": "COOL"},
            {"Ustt": '"Quiet" MODE',                  "tag": "QUIET"},
            {"Ustt": '"Performance" MODE',            "tag": "PERF"}
        ];
        var nodeSensor = ['CPU_PECI', 'SKIN', 'MEM', 'NGFF', 'BATTERY'];

        for(var k=0; k<Ustt.length; k++)
        {
            var nodeTypeBox1 = $("<div/>", {"class": "node_type_box node_type_box_1"});

            // ----- fan info
            var nodeTypeTag  = $("<p/>", {"class": "hidden node_type_tag"}).text(Ustt[k].tag);
            var nodeType     = $("<span/>", {"class": "node_type float_L"}).text(Ustt[k].Ustt);
            var fanId        = $("<span/>", {"class": "fan_id float_L"}).text("FAN1");
            var clear        = $("<div/>",  {"class": "clear"});
            nodeTypeBox1.append(nodeTypeTag).append(nodeType).append(fanId).append(clear);

            // ----- fan table
            var nodeTab = $("<table/>", {"class": "nodes_tab"});

            for(var i=0; i<nodeSensor.length +1; i++)
            {
                var nodeTr = $("<tr/>", {"class": "nodes_tr"});
                for(var j=0; j<nodeThArr.length; j++)
                {
                    if(i == 0)      // th
                    {
                        if(j == 0)
                        {
                            var btnSpan = $("<span/>").text(nodeFuncBtns[0].span);
                            var btnDiv  = $("<div/>", {"class": nodeFuncBtns[0].div, "onclick": nodeFuncBtns[0].onclick}).append(btnSpan);
                            var sensorTd = $("<th/>").append(btnDiv);
                        }
                        else if(j == 1)
                        {
                            var span = $("<span/>", {"class": nodeThArr[j].class}).text(nodeThArr[j].text);
                            var sensorTd = $("<th/>").append(span);
                        }
                        else
                        {
                            var sensorTd = $("<th/>", {"class": nodeThArr[j].class}).text(nodeThArr[j].text);
                        }
                    }
                    else            // td
                    {
                        if(j<2)
                        {
                            var btnSpan = $("<span/>").text(nodeFuncBtns[j].span);
                            var btnDiv  = $("<div/>", {"class": nodeFuncBtns[j].div, "onclick": nodeFuncBtns[j].onclick}).append(btnSpan);
                            var sensorTd = $("<td/>").append(btnDiv);
                        }
                        else
                        {
                            if(j == 2)
                            {
                                var nodeInput = $("<input/>", {"type": "text", "placeholder": nodeSensor[i-1], "value": nodeSensor[i-1]});
                                var sensorTd = $("<td/>").append(nodeInput);
                            }
                            else if(j == nodeThArr.length -2)
                            {
                                var nodeInput = $("<input/>", {"type": "text", "value": 255});
                                var sensorTd = $("<td/>", {"class": "hidden"}).append(nodeInput);
                            }
                            else if(j == nodeThArr.length -1)
                            {
                                var nodeInput = $("<input/>", {"type": "text", "value": 0});
                                var sensorTd = $("<td/>", {"class": "hidden"}).append(nodeInput);
                            }
                            else
                            {
                                var nodeInput = $("<input/>", {"type": "text"});
                                var sensorTd = $("<td/>").append(nodeInput);
                            }
                        }
                    }
                    nodeTr.append(sensorTd);
                }
                nodeTab.append(nodeTr);
            }
            nodeTypeBox1.append(nodeTab);
            nodeSkuContainer.append(nodeTypeBox1);
        }

        $('#fanTableContainer').append(nodeSkuContainer);

        // reset the node_type_box_1 width
        $('#fanTableContainer').find('.sensor_sku_container:last .node_type_box').each(function(){

            var nodeTypeBoxIndex = $(this).index('.node_type_box');
            // console.log(nodeTypeBoxIndex);
            SetFanTabWid(nodeTypeBoxIndex);
        });


        // Fan 2------------------------------------------------------------
        if(TwoFanCheck)
        {
            // fins the .sensor_sku_container index of fan table.
            var nodeTypeBoxIndex = $('#fanTableContainer').find('.sensor_sku_container:last').index('#fanTableContainer .sensor_sku_container');
            showFan2_FanLTable(nodeTypeBoxIndex);
        }


    });
});

function showFan2_FanLTable(index)
{
    let target;
	
    if(index == -1)
        target = $('#fanTableContainer').find('.node_type_box_1');
    else
        target = $('#fanTableContainer').find('.sensor_sku_container:eq(' + index +') .node_type_box_1');



        $(target).each(function(){

            // ----- count sensor
            var nodeTag  = $(this).find(".node_type_tag").text();   // BAL, COOL, QUIET, PERF
            var nodeSensor = [];    // array for store each table's sensor node
            $(this).find('.nodes_tab .nodes_tr').each(function(){
                if( $(this).find('td:eq(2) input').val() != undefined)
                    nodeSensor.push($(this).find('td:eq(2) input').val());
            });

            var nodeTypeBox2 = $("<div/>", {"class": "node_type_box node_type_box_2"});
            // ----- fan info
            var nodeTypeTag  = $("<p/>", {"class": "hidden node_type_tag"}).text(nodeTag);
            var nodeType     = $("<span/>", {"class": "node_type float_L"});
            var fanId        = $("<span/>", {"class": "fan_id float_L", "text": "FAN2"});
            var clear        = $("<div/>",  {"class": "clear"});
            nodeTypeBox2.append(nodeTypeTag).append(nodeType).append(fanId).append(clear);

            // ----- fan table
            var nodeTab = $("<table/>", {"class": "nodes_tab"});
            for(var i=0; i<nodeSensor.length +1; i++)
            {
                var nodeTr = $("<tr/>", {"class": "nodes_tr"});
                for(var j=0; j<nodeThArr.length; j++)
                {
                    if(i == 0)      // th
                    {
                        if(j == 0)
                        {
                            var btnSpan = $("<span/>").text(nodeFuncBtns[0].span);
                            var btnDiv  = $("<div/>", {"class": nodeFuncBtns[0].div, "onclick": nodeFuncBtns[0].onclick}).append(btnSpan);
                            var sensorTd = $("<th/>").append(btnDiv);
                        }
                        else if(j == 1)
                        {
                            var span = $("<span/>", {"class": nodeThArr[j].class}).text(nodeThArr[j].text);
                            var sensorTd = $("<th/>").append(span);
                        }
                        else
                        {
                            var sensorTd = $("<th/>", {"class": nodeThArr[j].class}).text(nodeThArr[j].text);
                        }
                    }
                    else            // td
                    {
                        if(j<2)
                        {
                            var btnSpan = $("<span/>").text(nodeFuncBtns[j].span);
                            var btnDiv  = $("<div/>", {"class": nodeFuncBtns[j].div, "onclick": nodeFuncBtns[j].onclick}).append(btnSpan);
                            var sensorTd = $("<td/>").append(btnDiv);
                        }
                        else
                        {
                            if(j == 2)
                            {
                                var nodeInput = $("<input/>", {"type": "text", "placeholder": nodeSensor[i-1], "value": nodeSensor[i-1]});
                                var sensorTd = $("<td/>").append(nodeInput);
                            }
                            else if(j == nodeThArr.length -2)
                            {
                                var nodeInput = $("<input/>", {"type": "text", "value": 255});
                                var sensorTd = $("<td/>", {"class": "hidden"}).append(nodeInput);
                            }
                            else if(j == nodeThArr.length -1)
                            {
                                var nodeInput = $("<input/>", {"type": "text", "value": 0});
                                var sensorTd = $("<td/>", {"class": "hidden"}).append(nodeInput);
                            }
                            else
                            {
                                var nodeInput = $("<input/>", {"type": "text"});
                                var sensorTd = $("<td/>").append(nodeInput);
                            }

                        }
                    }
                    nodeTr.append(sensorTd);
                }
                nodeTab.append(nodeTr);
            }
            nodeTypeBox2.append(nodeTab);

            $(this).after(nodeTypeBox2);

            // reset the width
            var thisIndex = $(this).parents('#fanTableContainer').find('.node_type_box').index($(this).next('.node_type_box'));
            SetFanTabWid(thisIndex);
        });
  
}

function removeFan2_FanLTable(){
    $('#fanTableContainer').find('.node_type_box_2').each(function(){
        $(this).remove();
    });
}