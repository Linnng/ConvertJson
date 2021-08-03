
var TwoFanCheck = 0;

$(function(){

    // Switch button status - CSS3
    $('.switch_checkbox').click(function(){
        if($(this).prop("checked"))
        {
            $(this).siblings('label').find('.switch_bcc').css('margin-left', '0');
            $(this).siblings('label').find('.switch_round_btn').css('left', '17px');
        }
        else
        {
            $(this).siblings('label').find('.switch_bcc').css('margin-left', '-100%');
            $(this).siblings('label').find('.switch_round_btn').css('left', '0');
        }
    });

    // two fans switch
    $('#twofans_switch').click(function(){
        if($(this).prop("checked"))
        {
            TwoFanCheck = 1;
            showFan2_FanList();
            showFan2_FanLTable(-1);
            showFan2_MsThermals();  // MsThermals
        }
        else
        {
            TwoFanCheck = 0;
            removeFan2_FanList();
            removeFan2_FanLTable();   // Fan Table
            removeFan2_MsThermals();  // MsThermals
        }
    });

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
            var sensorInput = $('<input/>', {"type": "text"});
            var sensorTd = $('<th/>').append(sensorInput);  // <th>
        }
        else
        {
            var sensorInput = $('<input/>', {"type": "text"});
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