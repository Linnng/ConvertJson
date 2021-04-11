function jsonProduce(){

    let jsonResultDiv = $('#jsonResult');
    let result = {};


    // ================1.SENSOR DESCRIPTION=========================
    result['sensorlists'] = [{'common':[]}];
    $('.sensor_tab tr').not(':eq(0)').each(function(){
        let area = {};
        for(var i = 0; i < $(".sensor_tr th").length; i++){

            // key
            let key = $('.sensor_tr th:eq(' + i + ')').text().replaceAll(' ','');

            // value
            let valTd = $(this).find('td:eq(' + i + ')');
            let value = valTd.find('input').val();
            if(value == undefined){
                value = valTd.find('select').val();
            }

            area[key] = value;

        }
        result.sensorlists[0].common.push(area);
    });
    // ================1.SENSOR DESCRIPTION=========================



    // ================3.SENSOR NODES=========================
    result['thermaltables'] = [];
    $('.node_type_box').each(function(){
        let area = {};
        area['name'] = 'SP14_' + $(this).find('p').text();
        area['fans'] = [{"fanname": $(this).find('span').text() ,"nodes":[]}];

        for(var i = 1; i < $(this).find('.nodes_tr').length; i++){

            // node_type_box第一個tr內有幾個th
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
                    node[key] = value;
                }
            }
            area.fans[0].nodes.push(node);
        }
        result.thermaltables.push(area);
    });
    console.log(result);
    jsonResultDiv.html(JSON.stringify(result));
    // ================3.SENSOR NODES=========================




}