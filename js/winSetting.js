
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

    $('.sensor_tab').width( sensorTabWid + 'px' );
    $('.sensor_dis_tr').width( sensorDisTabWid + 'px' );
});


