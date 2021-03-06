// file encoding UTF-8
/*========== 弹框开始 ==========*/
(function( $ ) {

    'use strict';

    /*
    Form
    */
    $('.popup-with-form').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#name',

        // When elemened is focused, some mobile browsers in some cases zoom in
        // It looks not nice, so we disable it:
        callbacks: {
            beforeOpen: function() {
                if($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
            }
        }
    });

    $(".profile").on('click', function(){
        var account = $("#demo-form input[name=account]").val();
        $.ajax({
            url: 'profileEdit',
            async: false,
            type: 'POST',
            data: {
                "account": account
            },
            dataType: 'json',
            success: function(data) {
                $("#demo-form input[name=email]").val(data.email);
                $("#demo-form input[name=name]").val(data.name);
                $("#demo-form input[name=tel]").val(data.tel);
                $("#demo-form textarea[name=profile]").val(data.profile);
                $("#demo-form input[type=radio][name=sex][value="+ data.sex + "]").attr("checked",true);
            },
            error: function(data) {
                alert("error");
            }
        });
    });

}).apply( this, [ jQuery ]);
/*========== 弹框结束 ==========*/

function saveProfile() {
    var account = $("#demo-form input[name=account]").val();
    var name = $("#demo-form input[name=name]").val();
    var sex= $("#demo-form input[name=sex]:checked").val();
    var tel = $("#demo-form input[name=tel]").val();
    var email = $("#demo-form input[name=email]").val();
    var profile = $("#demo-form textarea[name=profile]").val();
    $.ajax({
        url: 'profileSave',
        data: {
            "account" : account,
            "name" : name,
            "sex" : sex,
            "tel" : tel,
            "email" : email,
            "profile" : profile
        },
        async: false,
        dataType: 'json',
        type: 'POST',
        success: function(data) {
            $.fn.magnificPopup('close');
            $(".modal-body p").text(data.msg);
            $("#modalBootstrap").modal();

        },
        error: function(data) {
            $.fn.magnificPopup('close');
            $(".modal-body p").text("操作失败");
            $("#modalBootstrap").modal();
        }
    });
}