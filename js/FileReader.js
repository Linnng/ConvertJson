
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

// load datas - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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

// sensorlists  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Catch <th> title to search object key value.
                if(sensorlistsJsonObj != undefined || sensorlistsJsonObj != null){
                    // the array length
                    let arrLength = sensorlistsJsonObj.length;

                    // count of columns in table
                    let objLengthCnt = 0;

                    $(".sensor_tr th").each(function(){
                        let key = $(this).text().replaceAll(' ','');

                        // Skip Polling Rate datas, cause it's <option> struct
                        if(key != 'pollingrate'){

                            // Scan the key values of each objects (arrLength), then fill-in the table line by line.
                            for(let i=0; i<arrLength; i++){
                                $(this).parents('.sensor_tab').find('tr:eq('+ (i+1) + ') td:eq(' + objLengthCnt + ') input').val(sensorlistsJsonObj[i][key]);
                        }}
                        else{
                            alert('option tag');
                        }
                        objLengthCnt++;
                    });
                }

// fancontrollerlists - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Get the values of <th> in the DOM, then compare with the KEY of the object
// Then fill into the <td> <input> tag of the lower layer one by one
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

// Sensor nodes - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            } catch (error){
                console.error(error);
                alert('error');
            }
        }
    });
});