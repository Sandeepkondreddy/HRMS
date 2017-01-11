var url = "";
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        document.addEventListener("backbutton", onBackKeyDown, false);
    }
    function onBackKeyDown() {
        var state = confirm('Are You Sure you want to Exit.');
        if (state)
            navigator.app.exitApp(); // exit the app
    }
    $(document).ready(function() {
		debugger;
        $("#txtusername").focus();
        $("#btnSubmit").click(function() {
            var $btn = $("#btnSubmit");
            if ($("#txtusername").val() == "") {
                alert('Enter User Name.');
                $("#txtusername").focus();
                return false;
            } else if ($("#txtpassword").val() == "") {
                alert('Enter Password.');
                $("#txtpassword").focus();
                return false;
            } else {
                $btn.find("i.fa").attr('class', 'fa fa-spinner fa-spin fa-lg');
                $btn.find("span").text("logging in please wait...");
                $btn.attr('disabled', true);
                $btn.attr('class', 'btn btn-custom-icon');
                $("#txtusername").attr('disabled', true);
                $("#txtpassword").attr('disabled', true);
                $.ajax({
                    type: "GET",
                    url: "http://202.83.27.199/KPCTSDS/api/Account/ValidateUser/" + $("#txtusername").val().trim() + "/" + $("#txtpassword").val(),
                    data: '{}',
                    contentType: "application/json",
                    success: function(data) {
                        if (data[1] == 'True') {
                            $("#hidusrid").val(data[0]);
                            $.ajax({
                                type: "GET",
                                url: "http://202.83.27.199/KPCTSDS/api/Account/GetUserScreens/" + $("#hidusrid").val(),
                                data: '{}',
                                contentType: "application/json",
                                success: function(result) {
                                    window.location.href = result + '?user=' + btoa($("#hidusrid").val());
                                }
                            });
                        } else {
                            $btn.find("i.fa").attr('class', 'fa fa-sign-in fa-lg');
                            $btn.find("span").text("Login");
                            $btn.attr('disabled', false);
                            $btn.attr('class', 'btn btn-custom');
                            $("#txtusername").attr('disabled', false);
                            $("#txtpassword").attr('disabled', false);
                            $("#txtpassword").val("");
                            $("#txtusername").focus();
                            alert("Invalid User Name or Password");
                        }
                    },
                    error: function() {
                        $btn.find("i.fa").attr('class', 'fa fa-sign-in fa-lg');
                        $btn.find("span").text("Login");
                        $btn.attr('disabled', false);
                        $btn.attr('class', 'btn btn-custom');
                        $("#txtusername").attr('disabled', false);
                        $("#txtpassword").attr('disabled', false);
                        $("#txtpassword").val("");
                        $("#txtusername").focus();
                        alert("Invalid User Name or Password");
                    }
                });
            }
        });
    });