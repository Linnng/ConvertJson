
// import JOSN file into html
var resultText;

$(function(){
    document.getElementById('fakeImportBtn').addEventListener("click", function(e){
        document.getElementById('importJSON').click();
    }, false);

    var importJSON = $('#importJSON');
    var outputJSON = $('#outputJSON');
    importJSON.change(function(e){
        var file = e.target.files[0];
        reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(){
            outputJSON.html(reader.result);
            resultText = reader.result;

            $('.index_cover_container').addClass('hidden');

// load the datas - - - - - - -
//  - - - - - - - - - - - - - -
// Get the values of <th> in the DOM, then compare with the KEY of the object
// Then fill into the <td> <input> tag of the lower layer one by one

            // Remove single-line comments
            while(resultText.match(/\s*\/\/.*$/mg)){
                resultText = resultText.replace(/\s*\/\/.*$/mg, '');
            }

            // convert string to object
            let jsonObj = JSON.parse(resultText);
            console.log('jsonObj:\n');
            console.log(jsonObj);

            try {
                let sensorlistsJsonObj        = jsonObj.sensorlists[0].common;
                let fancontrollerlistsJsonObj = jsonObj.fancontrollerlists[0].common[0].fanlist[0];

// sensorlists  - - - - - - - - - - - - - - - - - - - -
//  - - - - - - - - - - - - - - - - - - - - - - - - - -
                if(sensorlistsJsonObj != undefined || sensorlistsJsonObj != null){
                    // 陣列長度
                    let arrLength = sensorlistsJsonObj.length;
                    // let objLength = Object.keys(sensorlistsJsonObj[0]).length;

                    // table 直行欄位的計數
                    let objLengthCnt = 0;

                    // 從<th>開始
                    $(".sensor_tr th").each(function(){

                        // Get title name 當 key 使用
                        let key = $(this).text().replaceAll(' ','');

                        // 略過 Polling Rate 這欄的填值 因為是 <option> tag, 再研究要怎麼動作
                        if(key != 'pollingrate'){
                            // 掃個別4個物件內的key value, 再用陣列一行一行填進格子內.

                            for(let i=0; i<arrLength; i++){
                                console.log(sensorlistsJsonObj[i][key]);
                                $(this).parents('.sensor_tab').find('tr:eq('+ i+1 + ') td:eq(' + objLengthCnt + ')input').addClass('test');
                                // $(this).parents('.sensor_tab').find('tr:eq('+ i+1 + ') td:eq(' + objLengthCnt + ')input').val(sensorlistsJsonObj[i][key]);
                                // alert('i = ' + i + sensorlistsJsonObj[i].key);
                            }
                        }
                        else{
                            // console.log('option tag');
                            alert('option tag');
                        }
                        objLengthCnt++;
                    });

                }

// fancontrollerlists - - - - - - -
                if(fancontrollerlistsJsonObj != undefined || fancontrollerlistsJsonObj != null){
                    $(".fan_des_tab tr td :input").each(function(){
                        // the <input> index
                        let index = $(this).parent().index();

                        // Catch $(this) input corresponding value.
                        let key = $(this).parent().prev().text();

                        if(key == ''){
                            key = $(this).parents('.fan_des_tab').find('tr:eq(1) th:eq(' + index + ')').text().replaceAll(' ','').toLowerCase();

                            if(key == ''){
                                key = $(this).parents('.fan_des_tab').find('tr:eq(0) th:eq(' + index + ')').text().replaceAll(' ','').toLowerCase();
                        }}

                        // Display datas from the object
                        if(key != 'fandescription'){
                            // console.log('jsonObj key : ' + key);
                            $(this).val(fancontrollerlistsJsonObj[key]);
                        }
                        else{
                            // 例外Fan Description 手動插值
                            $(this).val(fancontrollerlistsJsonObj['name']);
                        }

                    });
                }
// fancontrollerlists END - - - - -
            } catch (error){
                console.error(error);
                alert('error');
            }
// END - - - - - - - - - - - - -
        }
    });
});