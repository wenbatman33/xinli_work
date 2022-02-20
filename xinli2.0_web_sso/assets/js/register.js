$( document ).ready( function () {
	var apiBaseUrl = '';
	$.get("../../env.txt", function(response) { apiBaseUrl = response	});
	var devPath = window.document.referrer.indexOf( 'localhost' ) >= 0 ? window.document.referrer : '';
	var urlQuery = window.location.search.substr( 1 );
	$.fn.serializeObject = function(){
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
				if (o[this.name]) {
						if (!o[this.name].push) {
								o[this.name] = [o[this.name]];
						}
						o[this.name].push(this.value || '');
				} else {
						o[this.name] = this.value || '';
				}
		});
		return o;
	};
	
	var inputShowPassword = false;
	$( ".togglePassword" ).click( function ( event ) { 
		inputShowPassword = !inputShowPassword
		if ( inputShowPassword == true ) {
			$( ".eyeOpen" ).hide();
			$( ".eyeClose" ).show();
			$( "#password" ).prop("type", "text");
		} else {
			$( ".eyeOpen" ).show();
			$( ".eyeClose" ).hide();
			$( "#password" ).prop("type", "password");
		}
	} )
	jQuery.validator.addMethod("chinaPhoneType", function(value, element) {
		return /^1[3456789]\d{9}$/.test(value);
	}, "请输入 13、14、15、16、17、18、19 开头的11位數手机号");

	jQuery.validator.addMethod("password_exg_2", function(value, element) {
		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(value)
	}, "需包含英文大小写字母" );
	jQuery.validator.addMethod( "password_exg_3", function ( value, element ) {
		return value != $('#username').val()
	}, "不得与用户名相同" );
	
	$( "#registerFrom" ).validate( {
		rules: {
			username: {
				required: true,
				minlength: 5
			},
			phone: {
				required: true,
				minlength: 11,
				chinaPhoneType: true
			},
			password: {
				required: true,
				minlength: 8,
				password_exg_2:true,
				password_exg_3:true,
			},
		},
		messages: {
			username: {
				required: "请输入帐号",
				minlength: "请输入 5-15 位英数字"
			},
			phone: {
				required: "请输入手机号",
				minlength: "请输入 13、14、15、16、17、18、19 开头的11位數手机号"
			},
			password: {
				required: "请输入密码",
				minlength: "長度至少8碼"
			},
		},
		errorPlacement: function ( error ) {
			if ( error[ 0 ].id == 'username-error' ) {
				var errMsg = error[ 0 ].innerHTML;
				$( '.usernameError' ).html( errMsg );
			} 
			if ( error[ 0 ].id == 'phone-error' ) {
				var errMsg = error[ 0 ].innerHTML;
				$( '.phoneError' ).html( errMsg );
			}
			if ( error[ 0 ].id == 'password-error' ) {
				var errMsg = error[ 0 ].innerHTML;
				$( '.passwordError' ).html( errMsg );
			} 
		},
		success: function ( success ) {
			if ( success[ 0 ].id == 'username-error' ) {
				$( '.usernameError' ).html( '' );
			}
			if ( success[ 0 ].id == 'phone-error' ) {
				$( '.phoneError' ).html( '' );
			} 
			if ( success[ 0 ].id == 'password-error' ) {
				$( '.passwordError' ).html( '' );
			} 
		},
		submitHandler: function () {
			var formData = $( "#registerFrom" ).serializeObject();    
			$('#registerButton').prop('disabled', 'disabled');
			$.ajax( {
				type: 'POST',
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				url: apiBaseUrl + '/api/register',
				headers: {
					"X-Is-Mobile":isMobileDevice(),
				},
				data: JSON.stringify(formData) ,
				success: function ( res ) {
					var redirectUrl = res.url + '?data=' + res.data + (urlQuery ? '&' + urlQuery : '');
					var devPathRedirectUrl = get_host(devPath) + 'register?data=' + res.data + ( urlQuery ? '&' + urlQuery : '' );
					if ( devPath ) {
						window.location.replace( devPathRedirectUrl );
					} else {
						window.location.replace( redirectUrl );
					}
				},
				error: function (xhr) {
					var err = JSON.parse(xhr.responseText);
					$( '.usernameError' ).html( err.message );
					setTimeout(() => { $( '.usernameError' ).html( '' ) }, 3000)
				},
				complete: function () {
					$('#registerButton').prop("disabled", false);
				}
			});
		}
	} )
	$( '#registerFrom input' ).on( 'keyup blur', function () {
		if ($('#registerFrom').valid()) {
			$('#registerButton').prop("disabled", false);
		} else {
			$('#registerButton').prop('disabled', 'disabled');
		}
		checkPasswordErrorMsg();
	} );
	function isMobileDevice() {
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	};
	function get_host(url){
    return url.replace(/^((\w+:)?\/\/[^\/]+\/?).*$/,'$1');
	}
	function checkPasswordErrorMsg() { 
		var checkUsername = $( '#username' ).val();
		var checkPassword = $( '#password' ).val();
		var exg_1 = checkPassword.length >= 8;
		var exg_2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test( checkPassword );
		var exg_3 = exg_1 && exg_2 && checkUsername != checkPassword;
		
		if ( exg_1 ) {
			$( '#exg_1' ).removeClass( "text-gray-500" ).addClass( "text-xGreenLight" );
			$( '#exg_1 svg' ).removeClass( "fill-gray-500" ).addClass( "fill-xGreenLight" );
			$( '#exg_1' ).removeClass( "text-gray-500" ).addClass( "text-xGreenLight" );
		} else {
			$( '#exg_1' ).removeClass( "text-xGreenLight" ).addClass( "text-gray-500" );
			$( '#exg_1 svg' ).removeClass( "fill-xGreenLight" ).addClass( "fill-gray-500" );
		}
		if ( exg_2 ) {
			$( '#exg_2' ).removeClass( "text-gray-500" ).addClass( "text-xGreenLight" );
			$( '#exg_2 svg' ).removeClass( "fill-gray-500" ).addClass( "fill-xGreenLight" );
		} else {
			$( '#exg_2' ).removeClass( "text-xGreenLight" ).addClass( "text-gray-500" );
			$( '#exg_2 svg' ).removeClass( "fill-xGreenLight" ).addClass( "fill-gray-500" );
		}
		if ( exg_3 ) {
			$( '#exg_3' ).removeClass( "text-gray-500" ).addClass( "text-xGreenLight" );
			$( '#exg_3 svg' ).removeClass( "fill-gray-500" ).addClass( "fill-xGreenLight" );
		} else {
			$( '#exg_3' ).removeClass( "text-xGreenLight" ).addClass( "text-gray-500" );
			$( '#exg_3 svg' ).removeClass( "fill-xGreenLight" ).addClass( "fill-gray-500" );
		}
	}
	
} );