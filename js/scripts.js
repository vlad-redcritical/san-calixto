/**
 * File: scripts.js
 * Created: 2018-08-09-17:02
 */
// $(document).ready(function () {

//  		 tippy('.infotip-optional', {
//             theme: 'light',
//             arrow: true,
//   			arrowType: 'round',
//             size: 'small',
//             animation: 'fade',
//             delay: [120, 120]
//         });

//          tippy('.info-req-value', {
//             theme: 'light',
//             arrow: true,
//   			arrowType: 'round',
//             size: 'small',
//             animation: 'fade',
//             delay: [120, 120]
//         });
         
// });

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
                var $itemList = '<li>' + elem + '<a> Miasto </a>' + '</li>';
                $('.lists').append($itemList);
            });


            if ($('.lists li').length >= 5) {
                $('.lists li:nth-child(5)').after('<li class="more">Pokaż więcej</li>');
                $('.lists li:nth-child(n+7)').addClass('hidden');
            }
        }
        if($loaded == true) return;
        else {
            isLoaded();
        }

    });


    $('.input-field-container').on('click','li:not(".more")',function(){
        $fieldCity.val($(this).text());
        $('.lists').children().remove();
    });

    $('.input-field-container').on('click','li.more',function(){
        $('.lists li.more').remove();
        $('.lists li').removeClass('hidden');
    });

    

    $(document).on('keyup', function(e){
        if ( e.which == 27 && $('.lists li').length !== 0) {
            $('.lists li').remove();
        }
    });

   /* $('.input-field-container').on('focusout',function(){
    	console.log("blur!");
    	setTimeout(function () {
			console.log("test blur!");
           $('.lists').children().remove();
        }, 100);
    });*/

});