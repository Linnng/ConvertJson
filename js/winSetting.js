
// Sensor description table width setting.
function SetSensorComTabWid(index)
{
    if(index == -1)
    {
        // $('.sensor_tab:eq(' + index + ')').css( "outline", "3px solid blue" );
        $('.sensor_tab').each(function(){
            var tableWid = 0;
            $(this).find('.sensor_tr th').each(function(index_wid){
                if(index_wid == 0)
                {
                    $(this).width('80px');
                    tableWid += 80;
                }
                else if(index_wid == 1)
                {
                    $(this).width('100px');
                    tableWid += 100;
                }
                else{
                    $(this).width('200px');
                    tableWid += 200;
                }
            });
            $(this).width(tableWid + 'px');
        });
    }
    else
    {
        var tableWid = 0;

        $('.sensor_tab:eq(' + index + ')').find('.sensor_tr th').each(function(index_wid){

            if(index_wid == 0)
            {
                $(this).width('80px');
                tableWid += 80;
            }
            else if(index_wid == 1)
            {
                $(this).width('100px');
                tableWid += 100;
            }
            else{
                $(this).width('200px');
                tableWid += 200;
            }
        });

        $('.sensor_tab:eq(' + index + ')').width(tableWid + 'px');
    }
}


function HandleTableWid()
{
    SetSensorComTabWid(-1);
}