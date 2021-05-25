
$(function(){

    // discrete switch button
    $('#discrete_switch').click(function(){
        if($(this).prop("checked")){
            $(this).siblings('label').find('.switch_bcc').css('margin-left', '0');
            $(this).siblings('label').find('.switch_round_btn').css('left', '17px');
            $('.discrete_container').removeClass('hidden');
        }
        else{
            $(this).siblings('label').find('.switch_bcc').css('margin-left', '-100%');
            $(this).siblings('label').find('.switch_round_btn').css('left', '0');
            $('.discrete_container').addClass('hidden');
        }
    });
    // sensor add button
    $('#SensorAdd').click(function(){
        var cusTr = $('<tr/>');
        for(var i=0; i<sensorCommonTab.rows[0].cells.length; i++){

            var cusTd = $('<td/>');
            var cusOpt =
               [{'value':'EXEC_POLLING',   'text':'1/8 sec'},
                {'value':'QSEC_POLLING',   'text':'1/4 sec'},
                {'value':'HSEC_POLLING',   'text':'1/2 sec'},
                {'value':'ONESEC_POLLING', 'text':'1 sec'  },
                {'value':'TWOSEC_POLLING', 'text':'2 sec'  }];

            if( $('#sensorCommonTab').find('tr th:eq(' + i + ')') != undefined &&
                $('#sensorCommonTab').find('tr th:eq(' + i + ')').text().trim() == 'btn')
            {
                var cusSpan = $("<span/>").text("Delete");
                var cusDiv = $("<div/>", {"class": "sensorDelete", "onclick": "removeRow(this)"}).append(cusSpan);
                cusTd.append(cusDiv);
                cusTr.append(cusTd);
            }
            else if( $('#sensorCommonTab').find('tr th:eq(' + i + ')') != undefined &&
                $('#sensorCommonTab').find('tr th:eq(' + i + ')').text().trim() == 'polling rate')
            {
                var cusSel = $("<select/>", {"name": "pollingrate", "class": "selects"});

                for(var j=0; j<cusOpt.length ;j++){
                    cusSel.append("<option value='" + cusOpt[j].value + "'>" + cusOpt[j].text + "</option>");
                }

                cusTd.append(cusSel);
                cusTr.append(cusTd);
            }
            else
            {
                cusTd.append('<input/>');
                cusTr.append(cusTd);
            }
        }
        $('#sensorCommonTab').append(cusTr);
    });


    $('#twofans_switch').click(function(){
        if($(this).prop("checked")){
            $(this).siblings('label').find('.switch_bcc').css('margin-left', '0');
            $(this).siblings('label').find('.switch_round_btn').css('left', '17px');
            $('.fan_desc_tab').find('tr:eq(3)').removeClass('hidden');
        }
        else{
            $(this).siblings('label').find('.switch_bcc').css('margin-left', '-100%');
            $(this).siblings('label').find('.switch_round_btn').css('left', '0');
            $('.fan_desc_tab').find('tr:eq(3)').addClass('hidden');
        }
    });

});

// sensor delete button
function removeRow(e){
    document.getElementById('sensorCommonTab').deleteRow(e.parentNode.parentNode.rowIndex);
}