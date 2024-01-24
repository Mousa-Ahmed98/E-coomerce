$(document).ready(function () {
    $("#quantity").prop("readonly", true);
    $("#quantity").val(0);
    
    $("#plus").click(()=>{
        let curQ = $("#quantity").val();
        curQ ++;
        $("#quantity").val(curQ);
    });


    $("#minus").click(()=>{
        let curQ = $("#quantity").val();
        curQ --;
        if(curQ < 0){
            curQ = 0;
        }
        $("#quantity").val(curQ);
    });
})


