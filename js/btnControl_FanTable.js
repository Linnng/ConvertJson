
$(function(){

    $('#addModuleBtn').click(function(){

        var containerDiv = $("<div/>", {"class": "module_container"});

        // add "delete this module" button
        var skuNameTable = $("<table/>", {"class": "sku_name_tab"});
        var skuNameTr    = $("<tr/>",    {"class": "sku_name_tr"});

        for(var i=0; i<3; i++){
            var skuNameTh = $("<th/>");
            if(i == 0)
            {
                var moduleDeleteSpan = $("<span/>").text("Delete This Module");
                var moduleDeleteDiv  = $("<div/>", {"class": "moduleDelete", "onclick": "removeModule(this)"}).append(moduleDeleteSpan);
                skuNameTh.append(moduleDeleteDiv);
            }
            else if(i == 1)
            {
                skuNameTh.text("Sku name");
            }
            else
            {
                var skuNameInput = $("<input/>", {"type": "text", "placeholder": "(Please input sku name)"})
                var skuNameH3 = $("<h3/>", {"class": "sku_name"}).append(skuNameInput);
                skuNameTh.append(skuNameH3);
            }
            skuNameTr.append(skuNameTh);
        }

        skuNameTable.append(skuNameTr);
        containerDiv.append(skuNameTable);

        $('#fanTableContainer').append(containerDiv);


        // add "nodes tables"
        for(var i=0; i<4; i++){
            // var nodeBoxDiv = $("<div/>", {"class": "node_type_box"});

        }


    });
});

// function removeModule(e){
//     $(e).parents('.module_container').remove();
// }

function showFan2_FanLTable(index)
{
    if(index == -1)
    {
        // var firstBox = $('#fanTableContainer').find('.node_type_box:eq(0)');
        // var nodeSensor = [];
        // var nodeTab = firstBox.find('.nodes_tab');
        // nodeTab.find('.nodes_tr').each(function(){
        //     if( $(this).find('td:eq(2) input').val() != undefined)
        //         nodeSensor.push($(this).find('td:eq(2) input').val());
        // });
        // console.log(nodeSensor.length);

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
            {'div':'sensorDelete', 'onclick':'', "span":'Add'},
            {'div':'sensorDelete', 'onclick':'', "span":'Delete'}
        ];

        // --------------------------------------------------------------------------
        $('#fanTableContainer').find('.node_type_box_1').each(function(){

            // ----- count sensor
            var nodeTag  = $(this).find(".node_type_tag").text();   // BAL, COOL, QUIET, PERF
            var nodeSensor = [];    // array for store each table's sensor node
            $(this).find('.nodes_tab .nodes_tr').each(function(){
                if( $(this).find('td:eq(2) input').val() != undefined)
                    nodeSensor.push($(this).find('td:eq(2) input').val());
            });

            var nodeTypeBox2 = $("<div/>", {"class": "node_type_box node_type_box_2"});
            // ----- fan info
            var nodeTypeTag  = $("<p/>", {"class": "hidden node_type_tag", "text": nodeTag});
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
                        if(j<2)
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
    else
    {

    }
}

function removeFan2_FanLTable(){
    $('#fanTableContainer').find('.node_type_box_2').each(function(){
        $(this).remove();
    });
}