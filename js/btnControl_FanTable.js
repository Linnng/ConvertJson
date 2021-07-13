
$(function(){

    $('#addModuleBtn').click(function(){

        var containerDiv = $("<div/>", {"class": "module_container"});

        // add "delete this module" button
        var skuNameTable = $("<table/>", {"class": "sku_name_tab"});
        var skuNameTr    = $("<tr/>",    {"class": "sku_name_tr"});

        for(var i=0; i<3; i++){
            var skuNameTh = $("<th/>");
            if(i == 0)
            {
                var moduleDeleteSpan = $("<span/>").text("Delete This Module");
                var moduleDeleteDiv  = $("<div/>", {"class": "moduleDelete", "onclick": "removeModule(this)"}).append(moduleDeleteSpan);
                skuNameTh.append(moduleDeleteDiv);
            }
            else if(i == 1)
            {
                skuNameTh.text("Sku name");
            }
            else
            {
                var skuNameInput = $("<input/>", {"type": "text", "placeholder": "(Please input sku name)"})
                var skuNameH3 = $("<h3/>", {"class": "sku_name"}).append(skuNameInput);
                skuNameTh.append(skuNameH3);
            }
            skuNameTr.append(skuNameTh);
        }

        skuNameTable.append(skuNameTr);
        containerDiv.append(skuNameTable);

        $('#fanTableContainer').append(containerDiv);


        // add "nodes tables"
        for(var i=0; i<4; i++){
            // var nodeBoxDiv = $("<div/>", {"class": "node_type_box"});

        }


    });
});

function removeModule(e){
    $(e).parents('.module_container').remove();
}
