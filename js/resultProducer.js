var result = {};

function jsonProduce(){

    let jsonResultDiv = $('#jsonResult');

// ========================= 1.SENSOR DESCRIPTION =========================
    result['sensorlists'] = [{'common':[]}];
    $('.sensor_tab tr').not(':eq(0)').each(function(){
        let area = {};
        for(var i = 0; i < $(".sensor_tr th").length; i++){

            // key
            let key = $('.sensor_tr th:eq(' + i + ')').text().replaceAll(' ','');

            // value
            let valTd = $(this).find('td:eq(' + i + ')');
            let value = valTd.find('input').val();      // for input data
            if(value == undefined){
                value = valTd.find('select').val();     // for select data
            }

            area[key] = cusParseInt(value);

        }
        result.sensorlists[0].common.push(area);
    });


// ========================= 2.FAN DESCRIPTION ============================
    result['fancontrollerlists'] = [{'common':[]}];
    let fanConArea = {'fanlist':[{}]};
    $('.fan_des_tab').each(function(){
        if($(this).css('display') == 'none'){
            $(this).find('td').each(function(hideI, hideTD){
                // key
                let key = $(hideTD).parent().prev().find('th:eq(' + hideI + ')').text();
                // value
                let value = $(hideTD).text();

                fanConArea[key] = value;
            });
        }else{
            $(this).find('td').each(function(index, td){
                // key
                let key = $(td).parent().prev().find('th:eq(' + index + ')').text().replaceAll(' ','').toLowerCase();
                if(key == ''){
                    key = $(this).prev('th').text().replaceAll(' ','').toLowerCase();
                }
                // value
                let value = cusParseInt($(td).find('input').val());

                if(key == 'fandescription'){
                    fanConArea.fanlist[0]['name'] = value;
                }else{
                    fanConArea.fanlist[0][key] = value;
                }
            });
        }
    });
    result.fancontrollerlists[0].common.push(fanConArea);


// ========================= 3.SENSOR NODES ===============================
    result['thermaltables'] = [];
    $('.node_type_box').each(function(){
        let area = {};
        area['name'] = 'SP14_' + $(this).find('p').text();
        area['fans'] = [{"fanname": $(this).find('span').text() ,"nodes":[]}];

        for(var i = 1; i < $(this).find('.nodes_tr').length; i++){
            // check how many <th> in the first <tr> in node_type_box DOM
            let thQuan = $(this).find('.nodes_tr:eq(0) th').length;

            let node = {};
            for(var k = 0; k < thQuan; k++){
                // key
                let key = $(this).find('.nodes_tr:eq(0) th:eq(' + k + ')').text().replaceAll(' ','').toLowerCase();

                // value
                let valTd = $(this).find('.nodes_tr:eq(' + i + ') td:eq(' + k + ')');
                let value = valTd.text();
                if(value == ''){
                    value = valTd.find('input').val();
                }

                if(key != 'no'){
                    node[key] = cusParseInt(value);
                }
            }
            area.fans[0].nodes.push(node);
        }
        result.thermaltables.push(area);
    });


// ========================= 4.Throttle ===================================
    result['plxthrottletables'] = [{'common':[]}];
    $('.throttle_tab tr').not(':eq(0)').each(function(){
        let throttleArea = {};
        $(this).find('td').each(function(index, td){
            // key
            let key = $(td).parent('tr').siblings('tr:eq(0)').find('th:eq(' + index + ')').text().replaceAll(' ','').toLowerCase();
            // value
            let value = cusParseInt($(td).find('input').val());

            throttleArea[key] = value;
        });
        result.plxthrottletables[0].common.push(throttleArea);
    });


// ========================= 5.gfxthrottletables ==========================
    result['gfxthrottletables'] = [];

    console.log('Export jsonObj:');
    console.log(result);
    jsonResultDiv.html(JSON.stringify(result));


    // Export .json
    save();
}

// value convert to Int
function cusParseInt(str){
    try{
        let result = parseInt(str, 10);
        if(Number.isNaN(result))
            return str;
        else
            return result;
    }
    catch(error){
        console.log(error);
    }
}

// Export JSON File
function save(){
    var blob = new Blob([getJsonString()], {type: "text/plain;charset=utf-8"});
    saveAs(blob, 'LinearThermalsSys.json');
}

function getJsonString(){
    let jsonString = JSON.stringify(result, null, 2);
    return jsonString;
}