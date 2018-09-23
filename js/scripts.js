/**
 * File: scripts.js
 * Created: 2018-08-09-17:02
 */
$(document).ready(function () {

 		 tippy('.infotip-optional', {
            theme: 'galaxy light',
            arrow: true,
  			arrowType: 'round',
            animation: 'fade',
            delay: [120, 120]
        });

         tippy('.info-req-value', {
            theme: 'galaxy light',
            arrow: true,
  			arrowType: 'round',
            animation: 'fade',
            delay: [120, 120]
        });



		    var messages = {
		        'cityIsRequired': "Nie podano miejscowości",
		        'houseNrIsRequired': "Nie podano nr domu",
		        'fieldStreetIsRequired': "Nie podano nazwy ulicy"
		    };
		    
		    $('#galaxy-search-form').validate({
		        rules: {
		            'field-city': {
		                required: true},
		             'field-house-num': {
		                required: true},
		             'field-street': {
		                required: true},
		        },
		        messages: {
		            'field-city': messages.cityIsRequired,
		            'field-house-num': messages.houseNrIsRequired,
		            'field-street': messages.fieldStreetIsRequired,
		        },
		        onfocusout: function(element) {
		            this.element(element);
		        },
		        submitHandler: function (form) {
		            alert('form is valid');
		            return false;
		        }
		    });

		$('input[name=street-not-exists]').change(function(){
		    if($(this).is(':checked')) {
		        $('#field-street').prop("disabled", true);
		        $('#field-street').rules("remove",'required')
			    $("#galaxy-search-form").valid();

		    } else {
   				$('#field-street').prop("disabled", false);
   				$('#field-street').rules("add",'required')
			    $("#galaxy-search-form").valid();
		    }
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
        var $items = $('#list-box-suggest .lists li');
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
                 var text = '<span class="strong-text">' + elem.substr(0, $txt.length) + '</span>';
                 text += elem.substr($txt.length);

                var $itemList = '<li id="elem-list">' + text + '<a> Miasto </a>' + '</li>';
                $('#list-box-suggest .lists').append($itemList);
                $('#list-box-suggest').removeClass('hidden');
            });


            if ($('#list-box-suggest .lists li').length >= 5) {
                $('#list-box-suggest .lists li:nth-child(5)').after('<li class="more">Pokaż więcej</li>');
                $('#list-box-suggest .lists li:nth-child(n+7)').addClass('hidden');
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
        $('#list-box-suggest .lists').children().remove();
        $('#list-box-suggest').addClass('hidden');
    });

    $('.input-field-container').on('click','li.more',function(){
        $('#list-box-suggest .lists li.more').remove();
        $('#list-box-suggest .lists li').removeClass('hidden');
    });

    $('#field-city').on('blur', function(){
	   $(document).on('click', function(e){
	   	var target = $( event.target );
	    	  if (!target.is( ".more" ) && !target.is( "#elem-list" )) {
	    	  	 $('#list-box-suggest .lists').children().remove();
	    	  	$('#list-box-suggest').addClass('hidden');
	    	  }
	   });
    });

});