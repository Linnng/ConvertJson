
$(document).ready(function(){

    // Sensor description table width setting.
    var sensorTabWid = 0;
    $('.sensor_tr th').each(function(index){
        if(index == 0){
            $('.sensor_tr').find('th:eq(' + index + ')').width('100px');
            $('.sensor_tr').find('td:eq(' + index + ')').width('100px');
            sensorTabWid += 100;
        }
        else{
            $('.sensor_tr').find('th:eq(' + index + ')').width('200px');
            $('.sensor_tr').find('td:eq(' + index + ')').width('200px');
            sensorTabWid += 200;
        }
    });

    var sensorDisTabWid = 0;
    $('.sensor_dis_tr th').each(function(index){
        if(index == 0){
            $('.sensor_dis_tr').find('th:eq(' + index + ')').width('100px');
            $('.sensor_dis_tr').find('td:eq(' + index + ')').width('100px');
            sensorDisTabWid += 100;
        }
        else{
            $('.sensor_dis_tr').find('th:eq(' + index + ')').width('200px');
            $('.sensor_dis_tr').find('td:eq(' + index + ')').width('200px');
            sensorDisTabWid += 200;
        }
    });



    // fan description table width setting.
    var fandescTabWid = 0;
    $('.fan_desc_tab').find('tr:eq(1) th').each(function(index){
        $(this).width('125px');
        fandescTabWid += 125;
    });

    $('.sensor_tab').width( sensorTabWid + 'px' );
    $('.sensor_dis_tr').width( sensorDisTabWid + 'px' );
    $('.fan_desc_tab').width( fandescTabWid + 'px' );
});


