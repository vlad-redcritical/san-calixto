/**
 * File: scripts.js
 * Created: 2018-08-09-17:02
 */
$(document).ready(function () {

 		 tippy('.infotip-optional', {
            theme: 'light',
            arrow: true,
  			arrowType: 'round',
            size: 'small',
            animation: 'fade',
            delay: [120, 120]
        });

         tippy('.info-req-value', {
            theme: 'light',
            arrow: true,
  			arrowType: 'round',
            size: 'small',
            animation: 'fade',
            delay: [120, 120]
        });
         
});

$(function(){

    var $fieldCity = $('#field-city');
    var $loaded = false;
    // var $list = $('.lists li');
    var $names = [];


    function isLoaded() {
        $.get("https://jsonplaceholder.typicode.com/posts", function(response, status){
            var $data = response;

            $.each($data, function(user){
                $names.push($data[user].title);
                return $names
            });            
            
        });

        $loaded = true;
        return $loaded;
    }
    

    $fieldCity.keyup(function(e){
        var $txt = e.target.value;
        var $items = $('.lists li');
        var $arr = [];
        
        $items.remove();
        
        if ($txt.length >= 3) {
            var $item = $names.filter(el => el);

            $item.forEach(function(el){
                var item = el.match($txt);
                if (item !== null) {
                    $arr.push(el);
                }
            })

            $arr.forEach(function(elem){
                var $itemList = '<li id="elem-list">' + elem + '<a> Miasto </a>' + '</li>';
                $('.lists').append($itemList);
                $('#list-box-suggest').removeClass('hidden');
            });


            if ($('.lists li').length >= 5) {
                $('.lists li:nth-child(5)').after('<li class="more">Pokaż więcej</li>');
                $('.lists li:nth-child(n+7)').addClass('hidden');
            }
        } else {
        	           $('#list-box-suggest').addClass('hidden');

        }
        if($loaded == true) return;
        else {
            isLoaded();
        }
    });


    $('.input-field-container').on('click','li:not(".more")',function(){
        $fieldCity.val($(this).text());
        $('.lists').children().remove();
        $('#list-box-suggest').addClass('hidden');
    });

    $('.input-field-container').on('click','li.more',function(){
        $('.lists li.more').remove();
        $('.lists li').removeClass('hidden');
    });

    $('#field-city').on('blur', function(){
	   $(document).on('click', function(e){
	   	var target = $( event.target );
	    	  if (!target.is( ".more" ) && !target.is( "#elem-list" )) {
	    	  	 $('.lists').children().remove();
	    	  	$('#list-box-suggest').addClass('hidden');
	    	  }
	   });
    });

});