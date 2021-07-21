
$(function(){

    $('#SensorDesc_AddSku_Btn').click(function(e){

        var sensorSkuContainer = $("<div/>", {"class": "sensor_sku_container"});

        // <input> title
        var sensorInputTitle = $("<input/>", {"class": "sku_title", "type": "text", "placeholder": "(please type sku name)"});

        var CurrentSkuCnt = $(e.target).parents('.container').find('.sensor_sku_container').length;

        if(CurrentSkuCnt == 0)
            sensorInputTitle.val('Common');
        else if(CurrentSkuCnt == 1)
            sensorInputTitle.val('Discrete');

        var sensorH4 = $("<h4/>", {"class": "float_L"}).append(sensorInputTitle);

        sensorSkuContainer.append(sensorH4);


        // "Add sensor", "Add type" and "delete sku" buttons
        var sensorFuncBtns =
            [
                {'box': 'function_btn_box float_L', 'div':'add_sensor_btn',    'onclick':'AddSensorRow(this)',    "span":'Add sensor'},
                {'box': 'function_btn_box float_L', 'div':'add_sensor_btn',    'onclick':'AddSensorColumn(this)', "span":'Add type'  },
                {'box': 'function_btn_box float_R', 'div':'delete_module_btn', 'onclick':'removeSku(this)',       "span":'delete sku'}
            ];

        for(var i=0; i<sensorFuncBtns.length ;i++)
        {
            var funcBtnSpan= $("<span/>").text(sensorFuncBtns[i].span);
            var funcBtn    = $("<div/>", {"class": sensorFuncBtns[i].div, "onclick": sensorFuncBtns[i].onclick}).append(funcBtnSpan);
            var funcBtnBox = $("<div/>", {"class": sensorFuncBtns[i].box}).append(funcBtn);

            sensorSkuContainer.append(funcBtnBox);
        }
        sensorSkuContainer.append( $("<div/>", {"class": "clear"}) );


        // new sensor description
        var scrollBoxDiv = $("<div/>", {"class": "horizon_scroll_box"});
        var sensorTab    = $("<table/>", {"id": "sensorCommonTab", "class": "sensor_tab"});

        var sensorTitPlaceholder =
            [
                'name',
                'type',
                'address',
                'diagclass',
                'polling ratae',
                'ReadFn',
                'MaxErrors',
                'SmoothingFn',
                'SmoothingData',
                'CriticalTemp',
                'crittime'
            ];

        for(var i=0; i<3; i++)
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
                        var sensorTh = $("<th/>").append( $("<input/>", {"type": "text", "placeholder": sensorTitPlaceholder[j -1]}) );
                    }
                    sensorTr.append(sensorTh);
                }

                else            // input data boxes
                {
                    if(j == 0)
                    {
                        var deleteSpan = $("<span/>").text('Delete');
                        var deleteDiv  = $("<div/>", {"class": "sensorDelete", "onclick": "removeRow(this)"}).append(deleteSpan);
                        var sensorTd = $("<td/>").append(deleteDiv);
                    }
                    else if(j == 1)
                    {
                        var sensorInput = $("<input/>", {"type": "text", "placeholder": "GPU"});
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
        sensorSkuContainer.append(scrollBoxDiv);

        $('#sensorContainer').append(sensorSkuContainer);

        // reset table width
        var sensorTabCnt = $(e.target).parents('.container').find('.sensor_sku_container:last').index('.sensor_sku_container');
        SetSensorComTabWid(sensorTabCnt);

    });


    // sensor discrete switch
    // ===========================================================
    // $('#discrete_switch').click(function(){
    //     if($(this).prop("checked"))
    //         showSensorDis();
    //     else
    //         removeSensorDis();
    // });
    // ===========================================================

});



function removeSku(e){
    $(e).parents('.sensor_sku_container').remove();
}



// "add sensor" button: add table row
function AddSensorRow(e){

    var sensorTr = $("<tr/>", {"class": "sensor_tr"});
    var ThisSensorTab = $(e).parents('.sensor_sku_container').find('.sensor_tab');            // Get this table.sensor_tab
    var sensorThCnt   = $(e).parents('.sensor_sku_container').find('.sensor_tab th').length;  // count table th length


    for(var i=0; i<sensorThCnt; i++){

        var sensorTd = $("<td/>");
        var sensorOpt =
            [
                {'value':'EXEC_POLLING',   'text':'1/8 sec'},
                {'value':'QSEC_POLLING',   'text':'1/4 sec'},
                {'value':'HSEC_POLLING',   'text':'1/2 sec'},
                {'value':'ONESEC_POLLING', 'text':'1 sec'  },
                {'value':'TWOSEC_POLLING', 'text':'2 sec'  }
            ];

        if( ThisSensorTab.find('tr th:eq(' + i + ')') != undefined &&
            ThisSensorTab.find('tr th:eq(' + i + ')').text().trim() == 'btn')
        {
            var deleteSpan = $("<span/>").text('Delete');
            var deleteDiv  = $("<div/>", {"class": "sensorDelete", "onclick": "removeRow(this)"}).append(deleteSpan);
            sensorTd.append(deleteDiv);
        }

        else if( ThisSensorTab.find('tr th:eq(' + i + ')') != undefined &&
                 ThisSensorTab.find('tr th:eq(' + i + ')') == 'polling rate' )
        {
            var sensorSel = $("<select/>", {"name": "pollingrate", "class": "selects"});

            for(var j=0; j<sensorOpt.length ;j++)
            {
                sensorSel.append("<option value='" + sensorOpt[j].value + "'>" + sensorOpt[j].text + "</option>");
                sensorTd.append(sensorSel);
            }
        }

        else
        {
            sensorTd.append('<input/>');
        }
        sensorTr.append(sensorTd);
    }
    ThisSensorTab.append(sensorTr);
}



// "add type" button: add table column
function  AddSensorColumn(e){

    // Get this table.sensor_tab
    var ThisSensorTab = $(e).parents('.function_btn_box').nextAll('.horizon_scroll_box').first().find('.sensor_tab');

    ThisSensorTab.find('tr').each(function(index){

        var sensorTr = $(this);
        if(index == 0)
        {
            var deleteSpan = $("<span/>").text('Delete');
            var deleteDiv  = $("<div/>", {"class": "sensorDelete", "onclick": "removeColumn(this)"}).append(deleteSpan);
            var sensorTd   = $('<td/>').append(deleteDiv);
        }
        else if(index == 1)
        {
            var sensorInput = $('<input/>', {"type": "test"});
            var sensorTd = $('<th/>').append(sensorInput);  // <th>
        }
        else
        {
            var sensorInput = $('<input/>', {"type": "test"});
            var sensorTd = $('<td/>').append(sensorInput);
        }
        sensorTr.append(sensorTd);
    });

    // reset table width
    var sensorTabCnt = $('.sensor_tab').index(ThisSensorTab);
    SetSensorComTabWid(sensorTabCnt);
}



// sensor delete button - row
function removeRow(e){
    $(e).parents('.sensor_tr').remove();
}



// sensor delete button - column
function removeColumn(e){

    // Get this table.sensor_tab
    var ThisSensorTab = $(e).parents('.horizon_scroll_box').first().find('.sensor_tab');
    var deleteIndex  = $(e).parents().index();

    $(e).parents('table').find('tr').each(function(){

        if( $(this).find('td:eq('+deleteIndex+')').html() != undefined)
            $(this).find('td:eq('+deleteIndex+')').remove();
        else
            $(this).find('th:eq('+deleteIndex+')').remove();
    });

    // reset table width
    var sensorTabCnt = $('.sensor_tab').index(ThisSensorTab);
    SetSensorComTabWid(sensorTabCnt);
}