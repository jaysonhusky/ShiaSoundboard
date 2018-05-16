function init_ui() {
  var format;
  var formats = {
    mp3: { mime: "audio/mpeg",  ext: "mp3"},
    wav: { mime: "audio/x-wav", ext: "wav"}
  };

  for( var format in formats ) {
    format = formats[format];
    var myAudioTag = undefined; // Global
    var audioTagSupport = !!((myAudioTag = document.createElement('audio')).canPlayType);
    format.canPlayTag = audioTagSupport ? myAudioTag.canPlayType(format.mime) : "undefined";
    if( format.canPlayTag ) {
$(".button_wrapper .button_underneath a").each(
        function() {
          $(this).click( function() {
            var p = $(this).attr( "data-soundfile");
            window.history.pushState( p, p, "#" + p );
            play_sound( p + "." + format.ext );
          });
        }
      );

      if( window.location.hash )
        play_sound( window.location.hash.replace( /#/, '' ) + "." + format.ext );
      return;
    }
  }
  alert( "You're using a web browser that doesn't support audio. Try Chrome, Safari, or Firefox." );
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function play_sound(sound) {
  if( ! sound )
    return;

  if( $('#audio').audivid("isplaying"))
    $('#audio').audivid("pause");

  $("#audio").replaceWith(
    $('<audio/>')
      .attr({ src : "./sounds/" + sound })
      .attr({ id : "audio" })
      .attr({ style : "display: none" })
  );
  $('#audio').audivid("play");
}


	function boat(){
		$.fn.center=function(){
			this.css("position","absolute");
			this.css("top", Math.max(0,(
 				($(window).height()-$(this).outerHeight())/2)+ 
				$(window).scrollTop())+"px"
			);
			this.css("left",Math.max(0,(
				($(window).width()-$(this).outerWidth())/2)+
				$(window).scrollLeft())+"px"
			);
			return this;
		}
		$("#overlay").show();
		$("#overlay-content").show().center();
		setTimeout(function(){    
			$("#overlay").fadeOut();
		},1000);
       
}

//boat();
init_ui();