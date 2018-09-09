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