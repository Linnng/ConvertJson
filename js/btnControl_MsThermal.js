
$(function(){

    $('#MsThermal_AddSku_Btn').click(function(e){

        var sensorSkuContainer = $("<div/>", {"class": "sensor_sku_container"});

        // <input> title
        var sensorInputTitle = $("<input/>", {"class": "sku_title", "type": "text", "placeholder": "(Config)"});

        var CurrentSkuCnt = $(e.target).parents('.container').find('.sensor_sku_container').length;
        if(CurrentSkuCnt == 0)
            sensorInputTitle.val('Common');

        var sensorH4 = $("<h4/>").append(sensorInputTitle);
        sensorSkuContainer.append(sensorH4);

        var sensorInputTitle = $("<input/>", {"class": "sku_title", "type": "text", "placeholder": "(Sensor Name)"});
        var sensorH4 = $("<h4/>", {"class": "float_L"}).append(sensorInputTitle);
        sensorSkuContainer.append(sensorH4);

        // "Add sensor", "Add type" buttons
        var sensorFuncBtns =
            [
                {'box': 'function_btn_box float_L', 'div':'add_sensor_btn',    'onclick':'AddSensorColumn(this)', "span":'Add type'},
                {'box': 'function_btn_box float_R', 'div':'delete_module_btn', 'onclick':'removeSku(this)',       "span":'delete Config'  }
            ];

        for(var i=0; i<sensorFuncBtns.length ;i++)
        {
            var funcBtnSpan= $("<span/>").text(sensorFuncBtns[i].span);
            var funcBtn    = $("<div/>", {"class": sensorFuncBtns[i].div, "onclick": sensorFuncBtns[i].onclick}).append(funcBtnSpan);
            var funcBtnBox = $("<div/>", {"class": sensorFuncBtns[i].box}).append(funcBtn);

            sensorSkuContainer.append(funcBtnBox);
        }
        sensorSkuContainer.append( $("<div/>", {"class": "clear"}) );


        // show sensor description
        var scrollBoxDiv = $("<div/>", {"class": "horizon_scroll_box"});
        var sensorTab    = $("<table/>", {"class": "sensor_tab"});
        var sensorTitPlaceholder =
        [
            'Fan',
            'ontemp',
            'crittemp',
            'onhys',
            'crithys',
            'onrpm',
            'rampdownrate',
            'crittime'
        ];

        for(var i=0; i<3 + TwoFanCheck; i++)
        {
            var sensorTr = $("<tr/>", {"class": "sensor_tr"});
            for(var j=0; j<sensorTitPlaceholder.length +1 ; j++)
            {

                if(i == 0)      // delete button
                {
                    if(j < 2)
                    {
                        var span = $("<span/>", {"class": "transparet"}).text('btn');
                        var sensorTd = $("<td/>").append(span);
                    }
                    else
                    {
                        var deleteSpan = $("<span/>").text('Delete');
                        var deleteDiv  = $("<div/>", {"class": "sensorDelete", "onclick": "removeColumn(this)"}).append(deleteSpan);
                        var sensorTd = $("<td/>").append(deleteDiv);
                    }
                    sensorTr.append(sensorTd);
                }

                else if(i == 1)  // sensor Title
                {
                    if(j == 0)
                    {
                        var sensorTh = $("<th/>").append( $("<span/>", {"class": "transparet"}).text('btn') );
                    }
                    else if(j == 1)
                    {
                        var sensorTh = $("<th>").text(sensorTitPlaceholder[j - 1]);
                    }
                    else
                    {
                        var sensorTh = $("<th/>").append( $("<input/>", {"type": "text", "placeholder": sensorTitPlaceholder[j -1], "value": sensorTitPlaceholder[j -1]}) );
                    }
                    sensorTr.append(sensorTh);
                }

                else            // input data boxes
                {
                    var sensorFanInput =
                    [
                        {"fan": "FAN1"},
                        {"fan": "FAN2"}
                    ]

                    if(j == 0)
                    {
                        var deleteSpan   = $("<span/>").text('Delete');
                        var deleteStrike = $("<STRIKE/>").append(deleteSpan);
                        var deleteDiv  = $("<div/>", {"class": "sensorDelete"}).append(deleteStrike);
                        var sensorTd = $("<td/>").append(deleteDiv);
                    }
                    else if(j == 1)
                    {
                        var sensorInput = $("<input/>", {"type": "text", "placeholder": sensorFanInput[i-2].fan, "value": sensorFanInput[i-2].fan});
                        var sensorTd = $("<td/>").append(sensorInput);
                    }
                    else
                    {
                        var sensorInput = $("<input/>", {"type": "text"});
                        var sensorTd = $("<td/>").append(sensorInput);
                    }
                    sensorTr.append(sensorTd);
                }
            }
            sensorTab.append(sensorTr);
        }

        scrollBoxDiv.append(sensorTab);
        sensorSkuContainer.append(scrollBoxDiv);;

        $('#MsContainer').append(sensorSkuContainer);

        // reset table width
        var sensorTabCnt = $(e.target).parents('.container').find('.sensor_sku_container:last .horizon_scroll_box:last').index('.horizon_scroll_box');
        SetSensorComTabWid(sensorTabCnt);


    });
});





function showFan2_MsThermals()
{
    var sensorTab= $('#MsContainer').find('.sensor_tab');   // get MsTherm table
    var sensorTr = $("<tr/>", {"class": "sensor_tr"});
    var MsThermal_th_cnt = $('#MsContainer').find('.sensor_tab th').length; // Count table length

    for(var i=0; i<MsThermal_th_cnt; i++)
    {
        if(i == 0)      // Delete button with <strike>
        {
            var deleteSpan = $("<STRIKE/>").append('<span/>').text('Delete');
            var deleteDiv  = $("<div/>", {"class": "sensorDelete"}).append(deleteSpan);
            var sensorTd = $("<td/>").append(deleteDiv);
        }
        else if(i == 1) // Show FAN2
        {
            var sensorInput = $("<input/>", {"type": "text", "placeholder": "FAN2", "value": "FAN2"});
            var sensorTd = $("<td/>").append(sensorInput);
        }
        else{           // create input box
            var sensorInput = $("<input/>", {"type": "text"});
            var sensorTd = $("<td/>").append(sensorInput);
        }
        sensorTr.append(sensorTd);
    }
    sensorTab.append(sensorTr);
}



function removeFan2_MsThermals()
{
    // var Fan2Row_index = $('#MsContainer').find('.sensor_tab .sensor_tr:last').index();
    // if(Fan2Row_index == 3)
    // {
        $('#MsContainer').find('.sensor_tab').each(function(){
            $(this).find('.sensor_tr:last').remove();
        });
    // }
}