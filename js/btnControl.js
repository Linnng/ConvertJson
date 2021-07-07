
$(function(){

    // Switch button status
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

    // sensor discrete switch
    $('#discrete_switch').click(function(){
        if($(this).prop("checked")){
            // $('')
            $('.sensor_discrete_container').removeClass('hidden');
        }
        else{
            $('.sensor_discrete_container').addClass('hidden');
        }
    });
    // two fans switch
    $('#twofans_switch').click(function(){
        if($(this).prop("checked")){
            $('.fan_desc_tab').find('tr:eq(3)').removeClass('hidden');
        }
        else{
            $('.fan_desc_tab').find('tr:eq(3)').addClass('hidden');
        }
    });

    // Plx throttle discrete switch
    $('#PlxThrottle_discrete_switch').click(function(){
        if($(this).prop("checked")){
            $('.plx_throttle_dis_container').removeClass('hidden');
        }
        else{
            $('.plx_throttle_dis_container').addClass('hidden');
        }
    });

    // Gfx throttle discrete switch
    $('#GfxThrottle_discrete_switch').click(function(){
        if($(this).prop('checked')){
            $('.Gfx_discrete_container').removeClass('hidden');
        }
        else{
            $('.Gfx_discrete_container').addClass('hidden');
        }
    });






    // sensor add button
    $('#SensorDescAddBtn').click(function(){
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

});

// sensor delete button
function removeRow(e){
    var test = document.getElementsByClassName('e.parentNode.parentNode.parentNode.className()');
    console.log(test);
    document.getElementById('sensorCommonTab').deleteRow(e.parentNode.parentNode.rowIndex);             // worked
    // document.querySelector('table').deleteRow(e.parentNode.parentNode.rowIndex);                     // failed
    // document.getElementsByClassName('deleted_table').deleteRow(e.parentNode.parentNode.rowIndex);    // failed
}

