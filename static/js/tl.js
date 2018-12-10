$(document).ready(function(){
        $("#sticker").sticky({topSpacing:10});
      });

      var clicked = false;

        function toggleBtnClick() {
          if (clicked) {
            $("#sticker").sticky({topSpacing:10});
            //$("#sticker").innerHTML = "B";
            clicked = false;
          } else {
            $("#sticker").unstick();
            //$("#sticker").innerHTML('A');
            clicked = true;
          }
        }