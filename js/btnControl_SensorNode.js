
$(function(){

    // sensor add button - row
    $('#SensorDescAddBtn_row').click(function(){
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


    // sensor add button - column
    $('#SensorDescAddBtn_column').click(function(){

        $('#sensorCommonTab').find('tr').each(function(index){
            var sensorTr = $(this);
            if(index == 0)
            {
                var deleteSpan = $("<span/>").text('Delete');
                var deleteDiv  = $("<div/>", {"class": "sensorDelete", "onclick": "removeColumn(this)"}).append(deleteSpan);
                var cusTd = $('<td/>').append(deleteDiv);
                sensorTr.append(cusTd);
            }
            else if(index == 1)
            {
                var sensorInput = $('<input/>', {"type": "test"});
                var sensorTh = $('<th/>').append(sensorInput);
                sensorTr.append(sensorTh);
            }
            else
            {
                var sensorInput = $('<input/>', {"type": "test"});
                var sensorTd = $('<td/>').append(sensorInput);
                sensorTr.append(sensorTd);
            }
        });

        SetSensorComTabWid();
    });


    // sensor discrete switch
    $('#discrete_switch').click(function(){
        if($(this).prop("checked"))
            showSensorDis();

        else
            removeSensorDis();
    });

});



function showSensorDis(){
    var disContainerDiv = $("<div/>", {"class": "sensor_discrete_container"});

    // discrete title and "add type" button
    var disH4 = $("<h4/>", {"class": "sensor_sort_title float_L"}).text('Discrete');
    var addDisTypeBox = $("<div/>", {"class": "sonsor_btn_box float_L"});
    var addDisTypeBtn = $("<div/>", {"id": "SensorDescAddBtn_column_dis", "class": "sensor_btn float_L", "onclick": "addSensorDisType()"});
    var addDisTypeSpan= $("<span/>").text('Add type');
    var clearDiv = $("<div/>", {"class": "clear"});

    addDisTypeBtn.append(addDisTypeSpan);
    addDisTypeBox.append(addDisTypeBtn);

    disContainerDiv.append(disH4);
    disContainerDiv.append(addDisTypeBox);
    disContainerDiv.append(clearDiv);

    // discrete table
    var scrollBoxDiv = $("<div/>", {"class": "horizon_scroll_box"});
    var sensorDisTab = $("<table/>", {"id": "sensorDiscreteTab", "class": "sensor_tab"});

    var sensorDisPlaceholder = ['name',
                                'type',
                                'address',
                                'diagclass',
                                'polling ratae',
                                'ReadFn',
                                'MaxErrors',
                                'SmoothingFn',
                                'SmoothingData',
                                'CriticalTemp',
                                'crittime'];

    for(var i=0; i<3; i++)
    {
        var sensorDisTr = $("<tr/>", {"class":"sensor_dis_tr"});

        for(var j=0; j<11; j++)
        {
            if(i == 0)      // delete button
            {
                var sensorDisTd = $("<td/>");
                if(j == 0)
                {
                    var span = $("<span/>", {"class": "transparet"}).text('btn');
                    sensorDisTd.append(span);
                }
                else
                {
                    var removeDisTypeSpan= $("<span/>").text('Delete');
                    var removeDisTypeDiv = $("<div/>", {"class": "sensorDelete", "onclick": "removeColumn(this)"}).append(removeDisTypeSpan);

                    sensorDisTd.append(removeDisTypeDiv);
                }
                sensorDisTr.append(sensorDisTd);
            }
            else if(i == 1) // discrete title
            {
                if(j == 0)
                {
                    var sensorDisTh = $("<th>").text(sensorDisPlaceholder[j]);
                }
                else
                {
                    var sensorDisTitle = $("<input/>", {"type": "text", "placeholder": sensorDisPlaceholder[j]});
                    var sensorDisTh = $("<th/>").append(sensorDisTitle);
                }
                sensorDisTr.append(sensorDisTh);
            }
            else            // discrete input datas
            {
                if(j == 0)
                    var sensorDisTitle = $("<input/>", {"type": "text", "placeholder": "GPU"});
                else
                    var sensorDisTitle = $("<input/>", {"type": "text"});

                var sensorDisTd = $("<td/>").append(sensorDisTitle);
                sensorDisTr.append(sensorDisTd);
            }
        }
        sensorDisTab.append(sensorDisTr);
    }

    scrollBoxDiv.append(sensorDisTab);
    disContainerDiv.append(scrollBoxDiv);
    $('#sensorContainer').append(disContainerDiv);

    SetSensorDisTabWid();
}

// remove sensor discrete table when the "Discrete" switch button is off in sensor description part
function removeSensorDis(){
    $('.sensor_discrete_container').remove();
}



// add sensor discrete type
function addSensorDisType(){

    $('#sensorDiscreteTab').find('tr').each(function(index){
        var sensorTr = $(this);

        if(index == 0)
        {
            var deleteSpan = $("<span/>").text('Delete');
            var deleteDiv  = $("<div/>", {"class": "sensorDelete", "onclick": "removeColumn(this)"}).append(deleteSpan);
            var cusTd = $('<td/>').append(deleteDiv);
            sensorTr.append(cusTd);
        }
        else if(index == 1)
        {
            var sensorInput = $("<input/>", {"type": "test"});
            var sensorTh = $('<th/>').append(sensorInput);
            sensorTr.append(sensorTh);
        }
        else
        {
            var sensorInput = $('<input/>', {"type": "test"});
            var sensorTd = $('<td/>').append(sensorInput);
            sensorTr.append(sensorTd);
        }
    });

    SetSensorDisTabWid();
}

// sensor delete button - row
function removeRow(e){
    document.getElementById('sensorCommonTab').deleteRow(e.parentNode.parentNode.rowIndex);
}

// sensor delete button - column
function removeColumn(e){

    let domIndex = $(e).parent().index();
    let tableId = $(e).parents('table').attr('id');

    // $(e).parents('tbody').find('tr').each(function(){    // original
    $(e).parents('table').find('tr').each(function(){

        if( $(this).find('td:eq('+domIndex+')').html() != undefined)
            $(this).find('td:eq('+domIndex+')').remove();
        else
            $(this).find('th:eq('+domIndex+')').remove();
    });

    if(tableId != undefined && tableId == 'sensorCommonTab')
        SetSensorComTabWid();
    else
        SetSensorDisTabWid();
}