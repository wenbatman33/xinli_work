$( document ).ready( function () {
	var apiBaseUrl = '';
	var redirectUrl = '';
	$.get( "../../env.txt", function ( response ) { apiBaseUrl = response; } );
	
	var devPath = window.document.referrer.indexOf( 'localhost' ) >= 0 ? window.document.referrer : '';

	// 先暫存 url query
	var urlQuery = window.location.search.substr( 1 );
	//  url帶參數？form＝empty 時清除表單暫存資料
	console.log( '注意事項' );
	console.log( '1. url帶參數？form＝empty 會清除記住密碼表單暫存資料' );
	console.log( '2. 共同登入頁網址帶入 redirectUrl 登入會依照 V1 或V2 版本導回活動頁網址URL參數 以下是範例:' );
	console.log( '共同登入頁帶入: http://sso-d.182ga.com:21080?redirectUrl=/campaign/01.html' );
	console.log( '登入成功後轉址至: http://v1.com/login?redirectUrl=http://v1_campaign.com/campaign/01.html' );
	console.log( '登入成功後轉址至: http://v1.com/login?redirectUrl=http://v1_campaign.com/campaign/01.html' );
	console.log( 'v1登入成功後 再轉到redirectUrl' );
	
	getUrlParameter( 'redirectUrl' ) ? redirectUrl = getUrlParameter( 'redirectUrl' ) : redirectUrl = '';

	if ( getUrlParameter( 'form' ) == 'empty' ) {
		window.localStorage.removeItem('Username');
		window.localStorage.removeItem('Username_P');
		window.localStorage.removeItem('KeppLoginData');
	}
	
	
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
	// 解析 Url Parameter
	function getUrlParameter(name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		var results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	};
		
	

	function getKey (val) { 
		return clienttype + val + custemKey;
	}
	function encrypt(message, key){
		var message = CryptoJS.AES.encrypt(message, key);
    return message.toString();
	}
	function decrypt(message, key){
		var code = CryptoJS.AES.decrypt(message, key);
		var decryptedMessage = code.toString(CryptoJS.enc.Utf8);
		return decryptedMessage;
	}
	// console.log( getUrlParameter( 'name' ) )
	
	// 預設值
	var inputShowPassword = false;
	var clienttype = 'Web';
	var custemKey = 'Fuck!hacker';
	function init () { 
		var KeppLoginData = window.localStorage.getItem( 'KeppLoginData' );
		if (KeppLoginData=='true') {
			var storageUsername = window.localStorage.getItem( 'Username' );
			var storageUsername_P = window.localStorage.getItem( 'Username_P' );
			if ( storageUsername ) $( '#username' ).val( storageUsername );
			if ( storageUsername_P ) {
				var decode = decrypt( storageUsername_P, getKey( storageUsername ) );
				$( '#password' ).val( decode );
			}
			$( '#keppLoginData' ).prop('checked', true);
			$('#loginButton').prop("disabled", false);
		}
	}
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
	jQuery.validator.addMethod("password_exg_2", function(value, element) {
		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(value)
	}, "需包含英文大小写字母" );
	
	
	$( "#loginFrom" ).validate( {
		rules: {
			username: {
				required: true,
				minlength: 5
			},
			password: {
				required: true,
				minlength: 8,
				password_exg_2: true
			},
		},
		messages: {
			username: {
				required: "请输入帐号",
				minlength: "请输入 5-15 位英数字"
			},
			password: {
				required: "请输入密码",
				minlength: "请输入 8 位以上密码"
			},
		},
		errorPlacement: function ( error ) {
			if ( error[ 0 ].id == 'username-error' ) {
				var errMsg = error[ 0 ].innerHTML;
				$( '.usernameError' ).html( errMsg );
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
			if ( success[ 0 ].id == 'password-error' ) {
				$( '.passwordError' ).html( '' );
			}
		},
		submitHandler: function () {
			var formData = $( "#loginFrom" ).serializeObject();
			if ( redirectUrl ) formData.redirectUrl = redirectUrl;
			$( '#loginButton' ).prop( 'disabled', 'disabled' );
			$.ajax( {
				type: 'POST',
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				url: apiBaseUrl + '/api/login',
				headers: {
					"X-Is-Mobile":isMobileDevice(),
				},
				data: JSON.stringify( formData ),
				success: function ( res ) {
					// 網址若有 redirectUrl時 登入會置換V1 domain
					if ( urlQuery.indexOf( 'redirectUrl=' ) >= 0 ) {
						urlQuery = urlQuery.replace( 'redirectUrl=', 'redirectUrl=' + res.domain );
					}
					// 非localhost站台的轉址位置
					var resultUrl = res.url + '?data=' + res.data + ( urlQuery ? '&' + urlQuery : '' );

					// 返回 loaclhost 站台
					var devPathRedirectUrl = get_host( devPath ) + 'login?data=' + res.data + ( urlQuery ? '&' + urlQuery : '' );
					if ( devPath ) {
						// 如果是前一頁來源 loaclhost 則返回 loaclhost 站台
						// window.location.replace( devPathRedirectUrl );
					} else {
						// window.location.replace( resultUrl );
					}				
					keepUserData( formData );
				},
				error: function ( xhr ) {
					var err = JSON.parse( xhr.responseText );
					$( '.usernameError' ).html( err.message );
					setTimeout( () => { $( '.usernameError' ).html( '' ); }, 3000 );
				},
				complete: function () {
					$( '#loginButton' ).prop( "disabled", false );
				}
			} );
			
		}
	} );
	function gotoCampaignPage () { 

	}
	function isMobileDevice() {
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	};
	function get_host(url){
    return url.replace(/^((\w+:)?\/\/[^\/]+\/?).*$/,'$1');
	}
	function keepUserData (formData) { 
		var clienttype = 'Web';
		var key = clienttype + formData.username + 'Fuck!hacker';
		var EncryptText = encrypt(formData.password, key)			
		var DecryptText  = decrypt(EncryptText, key)
		if ( $( '#keppLoginData' ).is( ":checked" ) ) {
			var EncryptText = encrypt(formData.password, key)
			var DecryptText  = decrypt(EncryptText, key)
			window.localStorage.setItem('Username', formData.username);
			window.localStorage.setItem('Username_P', EncryptText);
			window.localStorage.setItem('KeppLoginData', $( '#keppLoginData' ).is( ":checked" ));
		} else {
			window.localStorage.removeItem('Username');
			window.localStorage.removeItem('Username_P');
			window.localStorage.removeItem('KeppLoginData');
			
		}
	}
	$('#loginFrom input').on('keyup blur', function () {
		if ($('#loginFrom').valid()) {
			$('#loginButton').prop("disabled", false);
		} else {
			$('#loginButton').prop('disabled', 'disabled');
		}
	} );
	
	init();

});