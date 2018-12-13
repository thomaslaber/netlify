$(document).ready(function(){
        $("#sticker").sticky({topSpacing:10});
      });

      var clicked = false;

        function toggleBtnClick() {
          if (clicked) {
            $("#sticker").sticky({topSpacing:10});
            $("#pin_button img").removeClass("deactivated");
            $("#pin_button img").addClass("activated");
            clicked = false;
          } else {
            $("#sticker").unstick();
            $("#pin_button img").removeClass("activated");
            $("#pin_button img").addClass("deactivated");
            clicked = true;
          }
        }
		
		var clicked2 = false;

        function toggleBtnClick2() {
          if (clicked2) {
            $("aside").show();
            $("#hide_button img").removeClass("deactivated");
            $("#hide_button img").addClass("activated");
            clicked2 = false;
          } else {
            $("aside").hide();
            $("#hide_button img").removeClass("activated");
            $("#hide_button img").addClass("deactivated");
            clicked2 = true;
          }
        }