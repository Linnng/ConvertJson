
// Sensor description table width setting.
function SetSensorComTabWid()
{
    var tableWid = 0;

    $('#sensorCommonTab .sensor_tr th').each(function(index){
        if(index == 0)
        {
            $(this).width('80px');
            tableWid += 80;
        }
        else if(index == 1)
        {
            $(this).width('100px');
            tableWid += 100;
        }
        else
        {
            $(this).width('200px');
            tableWid += 200;
        }
    });

    $('#sensorCommonTab').width( tableWid + 'px' );
}

function SetSensorDisTabWid()
{
    var tableWid = 0;

    $('.sensor_dis_tr th').each(function(index){
        if(index == 0)
        {
            $(this).width('100px');
            tableWid += 100;
        }
        else
        {
            $(this).width('200px');
            tableWid += 200;
        }
    });

    $('#sensorDiscreteTab').width( tableWid + 'px' );
}



// fan description table width setting.
function SetFanInitTabWid()
{
    var tableWid = 0;

    $('.fan_init_tr th').each(function(){
        $(this).width('200px');
        tableWid += 200;
    });

    $('.fan_init_tab').width( tableWid + 'px' );
}

function SetFanDesTabWid()
{
    var tableWid = 0;

    $('.fan_desc_tab').find('tr:eq(1) th').each(function(){
        $(this).width('125px');
        tableWid += 125;
    });

    $('.fan_desc_tab').width( tableWid + 'px' );
}



// Plx throttle table width setting
function SetPlxTabWid(){
    var tableWid    = 0;
    var tableDisWid = 0;

    $('.plx_throttle_tab th').each(function(index){
        if(index == 0)
        {
            $(this).width('80px');
            tableWid += 80;
        }
        else
        {
            $(this).width('200px');
            tableWid += 200;
        }
    });

    $('.plx_throttle_dis_tab th').each(function(index){
            $(this).width('240px');
            tableDisWid += 240;
    });

    $('.plx_throttle_tab').width( tableWid + 'px' );
    $('.plx_throttle_dis_tab').width( tableDisWid + 'px' );
}


function SetGfxComTabWid(){
    var tableWid    = 0;

    $('.gfx_throttle_tab th').each(function(index){
        if(index == 0)
        {
            $(this).width('80px');
            tableWid += 80;
        }
        else
        {
            $(this).width('125px');
            tableWid += 125;
        }
    });

    $('.gfx_throttle_tab').width( tableWid + 'px' );
}

function SetGfxDisTabWid(){
    var tableWid    = 0;

    $('.gfx_discrete_throttle_tab th').each(function(){
        $(this).width('125px');
        tableWid += 125;
    });

    $('.gfx_discrete_throttle_tab').width( tableWid + 'px' );
}


function HandleTableWid()
{
    SetSensorComTabWid();
    SetSensorDisTabWid();

    SetFanInitTabWid();
    SetFanDesTabWid();

    SetPlxTabWid();

    SetGfxComTabWid();
    SetGfxDisTabWid();
}