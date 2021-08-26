var result = {};


function jsonProduce(){

    let jsonResultDiv = $('#jsonResult');

// ========================= 1.SENSOR DESCRIPTION =========================	
	prodJsonResult(result, 'sensorContainer', 'sensorlists');
	

// ========================= 2.FAN DESCRIPTION ============================
    $('#FanContainer .sensor_sku_container').each(function(i, e){
		if(i == 0)
			result['fancontrollerlists'] = [];
		let sku_title = $(e).find('.sku_title:eq(0)').val();
		let tArea = {};
		tArea[sku_title] = [];
		result.fancontrollerlists.push(tArea);
		$(e).find('.sensor_tab:eq(0) tr').not(':eq(0),:eq(1)').each(function(i1, e1){
			// Fan initial
			let area = {};
			$(e).find('.sensor_tab:eq(0)').find('th').not(':eq(0)').each(function(i2, e2){
				// key
				let key = $(e2).text().replaceAll(' ','');
				// value
				let valTd = $(e1).find('td:eq(' + (i2 + 1) + ')');
				let value = valTd.find('input').val();      // for input data
				if(value == undefined){
					value = valTd.find('select').val();     // for select data
				}
				area[key] = cusParseInt(value);
			});
			// Fan lists
			area['fanlist'] = [{}];
			$(e).find('.sensor_tab:eq(1)').find('th').not(':eq(0)').each(function(i2, e2){
				// key
				let key = $(e2).text().replaceAll(' ','');
				// value
				let valTd = $(e).find('.sensor_tab:eq(1) tr:eq(' + (i1 + 2) + ')').find('td:eq(' + (i2 + 1) + ')');
				let value = valTd.find('input').val();      // for input data
				if(value == undefined){
					value = valTd.find('select').val();     // for select data
				}
				area.fanlist[0][key] = cusParseInt(value);
			});
			result.fancontrollerlists[i][sku_title].push(area);
		});
	});


// ========================= 3.SENSOR NODES ===============================
    // result['thermaltables'] = [];
    // $('.node_type_box').each(function(){
        // let area = {};
        // area['name'] = 'SP14_' + $(this).find('p').text();
        // area['fans'] = [{"fanname": $(this).find('span').text() ,"nodes":[]}];

        // for(var i = 1; i < $(this).find('.nodes_tr').length; i++){
            // check how many <th> in the first <tr> in node_type_box DOM
            // let thQuan = $(this).find('.nodes_tr:eq(0) th').length;

            // let node = {};
            // for(var k = 0; k < thQuan; k++){
                // key
                // let key = $(this).find('.nodes_tr:eq(0) th:eq(' + k + ')').text().replaceAll(' ','').toLowerCase();

                // value
                // let valTd = $(this).find('.nodes_tr:eq(' + i + ') td:eq(' + k + ')');
                // let value = valTd.text();
                // if(value == ''){
                    // value = valTd.find('input').val();
                // }

                // if(key != 'no'){
                    // node[key] = cusParseInt(value);
                // }
            // }
            // area.fans[0].nodes.push(node);
        // }
        // result.thermaltables.push(area);
    // });


// ========================= 4.plxthrottletables =========================	
	prodJsonResult(result, 'plxContainer', 'plxthrottletables');
	

// ========================= 5.gfxthrottletables ==========================
	prodJsonResult(result, 'gfxContainer', 'gfxthrottletables');
	
	
// ========================= 6.chargerthrottletables ==========================
	$('#chgContainer .sensor_sku_container').each(function(i, e){
		if(i == 0)
			result['chargerthrottletables'] = {};
		let sku_title = $(e).find('.sku_title:eq(0)').val();
		result.chargerthrottletables['sensorname'] = sku_title;
		result.chargerthrottletables['zones'] = [];
		$(e).find('.sensor_tab tr').not(':eq(0),:eq(1)').each(function(i1, e1){
			let area = {};
			$(e).find('th').not(':eq(0)').each(function(i2, e2){
				// key
				let key = $(e2).text().replaceAll(' ','');
				// value
				let valTd = $(e1).find('td:eq(' + (i2 + 1) + ')');
				let value = valTd.find('input').val();      // for input data
				if(value == undefined){
					value = valTd.find('select').val();     // for select data
				}
				area[key] = cusParseInt(value);
			});
			result.chargerthrottletables['zones'].push(area);
		});
	});
	

// ========================= 7.msthermals ==========================
	$('#MsContainer .sensor_sku_container').each(function(i, e){
		if(i == 0)
			result['msthermals'] = {'configs':[]};
		let tArea = {};
		result.msthermals.configs.push(tArea);
		let sku_title1 = $(e).find('.sku_title:eq(0)').val();
		let sku_title2 = $(e).find('.sku_title:eq(1)').val();
		tArea['name'] = sku_title1;
		tArea['sensor'] = sku_title2;
		tArea['nodes'] = [];
		$(e).find('.sensor_tab tr').not(':eq(0),:eq(1)').each(function(i1, e1){
			let area = {};
			$(e).find('th').not(':eq(0)').each(function(i2, e2){
				// key
				let key = $(e2).text().replaceAll(' ','');
				// value
				let valTd = $(e1).find('td:eq(' + (i2 + 1) + ')');
				let value = valTd.find('input').val();      // for input data
				if(value == undefined){
					value = valTd.find('select').val();     // for select data
				}
				area[key] = cusParseInt(value);
			});
			tArea['nodes'].push(area);
		});
	});
	
	
	
	
    console.log('Export jsonObj:');
    console.log(result);
    jsonResultDiv.html(JSON.stringify(result));


    // Export .json
    save();
}

// produceJsonResultFunc
function prodJsonResult(resultObj, containerName, jsonAreaName){
	$('#' + containerName + ' .sensor_sku_container').each(function(i, e){
		if(i == 0)
			result[jsonAreaName] = [];
		let sku_title = $(e).find('.sku_title:eq(0)').val();
		let tArea = {};
		tArea[sku_title] = [];
		result[jsonAreaName].push(tArea);
		$(e).find('.sensor_tab tr').not(':eq(0),:eq(1)').each(function(i1, e1){
			let area = {};
			$(e).find('th').not(':eq(0)').each(function(i2, e2){
				// key
				let key = $(e2).text().replaceAll(' ','');
				// value
				let valTd = $(e1).find('td:eq(' + (i2 + 1) + ')');
				let value = valTd.find('input').val();      // for input data
				if(value == undefined){
					value = valTd.find('select').val();     // for select data
				}
				area[key] = cusParseInt(value);
			});
			result[jsonAreaName][i][sku_title].push(area);
		});
	});
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
    var blob = new Blob([executeContent(getJsonString())], {type: "text/plain;charset=utf-8"});
    saveAs(blob, 'LinearThermalsSys.json');
}

function getJsonString(){
    let jsonString = JSON.stringify(result, null, 2);
    return jsonString;
}

function executeContent(resultStr){
	let result = new Array();
	let lines = resultStr.split(/[\n\r]+/);
	lines.forEach(element =>{
		if(element.indexOf(',') > -1 && element.indexOf('},') == -1 && element.indexOf('],') == -1)
			result.push(element);
		else
			result.push(element + '\n');
	});
	return result.join('').replaceAll(',          ',',').replaceAll(',        ',',').replaceAll(',  ',',').replaceAll(',  ',',');
}

