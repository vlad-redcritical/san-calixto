$(document).ready(function() {
    tippy(".infotip-optional", {
        theme: "galaxy light",
        arrow: true,
        arrowType: "round",
        animation: "fade",
        delay: [120, 120]
    });

    tippy(".router-tooltip", {
        theme: "galaxy light",
        arrow: true,
        arrowType: "round",
        animation: "fade",
        delay: [120, 120]
    });
    tippy(".info-req-value", {
        theme: "galaxy light",
        arrow: true,
        arrowType: "round",
        animation: "fade",
        delay: [120, 120]
    });
    var a = {
        cityIsRequired: "Nie podano miejscowo\u015Bci",
        houseNrIsRequired: "Nie podano nr domu",
        fieldStreetIsRequired: "Nie podano nazwy ulicy"
    };
    $("#galaxy-search-form").validate({
        rules: {
            "field-city": {
                required: true
            },
            "field-house-num": {
                required: true
            },
            "field-street": {
                required: true
            },
        },
        messages: {
            "field-city": a.cityIsRequired,
            "field-house-num": a.houseNrIsRequired,
            "field-street": a.fieldStreetIsRequired,
        },
        onfocusout: function(b) {
            this.element(b)
        },
        submitHandler: function(b) {
            alert("form is valid");
            b.submit();
            return false
        }
    });
    $("input[name=street-not-exists]").change(function() {
        if ($(this).is(":checked")) {
            $("#field-street").prop("disabled", true);
            $("#field-street").rules("remove", "required");
            $("#galaxy-search-form").valid()
        } else {
            $("#field-street").prop("disabled", false);
            $("#field-street").rules("add", "required");
            $("#galaxy-search-form").valid()
        }
    });



    /*Slick*/
        $('#galaxy-offers-elements').slick({
        /*prevArrow: '<img  class="arrow-prev-l"  alt="Previous button - move to previous slide" src="C:/Users/v0073933/WebstormProjects/T-Mobile-mockup-git/assets/img/prev.png">',
        nextArrow: '<img  class="arrow-next-r"  alt="Next button - move to next slide" src="C:/Users/v0073933/WebstormProjects/T-Mobile-mockup-git/assets/img/next.png">',*/
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
        infinite: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    initialSlide: 0,
                    slidesToScroll: 1,
                    centerMode: false,
                    infinite: false,
                    focusOnSelect: false,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                    initialSlide: 0,
                    slidesToScroll: 1,
                    arrows: true,
                    focusOnSelect: false,
                    infinite: false
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                    initialSlide: 0,
                    slidesToScroll: 1,
                    centerMode: false,
                    focusOnSelect: false,
                    infinite: false,
                    arrows: false
                }
            }
        ]
    });
    /*Slick*/


});
$(function() {
    var b = $("#field-city");
    var e = $("#field-street");
    var g = [];
    var a = [];
    b.keyup(function(l) {
        var val = l.target.value;
        var m = $("list-box-suggest .lists li");
        var i = [];
        if (val.length >= 3) {
            $.get("/blocks/galaxy/city_autopopulate_redirector.jsp?searchCityString=" + val, function(j, i) {
                var k = j.sort();
                $.each(k, function(l) {
                    if ((k[l].name).substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                        var o = '<li id="' + k[l].townSYM + '">' + k[l].name + "<a> Miasto </a></li>";
                        $("#list-box-suggest .lists").append(o);
                        $("#list-box-suggest").removeClass("hidden")
                        $("#list-box-suggest ul").on('click', function(earg) {
                            var $target = earg.target;
                            document.getElementById('field-cityTeryt').value = $target.getAttribute("id");
                        });
                    }
                })
                if ($("#list-box-suggest .lists li").length >= 5) {
                    $("#list-box-suggest .lists li:nth-child(5)").after('<li class="more">Poka\u017C wi\u0119cej</li>');
                    $("#list-box-suggest .lists li:nth-child(n+7)").addClass("hidden")
                }
            });

        } else {
            $("#list-box-suggest").addClass("hidden")
        }
    });
    e.keyup(function(l) {
        var d = $("#field-cityTeryt").val();
        var val = l.target.value;
        var m = $("list-box-suggest-street .lists li");
        if (val.length >= 3) {
            $.get("/blocks/galaxy/street_autopopulate_redirector.jsp?searchCityTeryt=" + d + "&searchStreetString=" + val, function(k, j) {
                var p = k.sort();
                $.each(p, function(m) {
                    if ((p[m].name).substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                        var o = '<li id="' + p[m].streetSYM + '">' + p[m].name + "<a> Ulica </a></li>";
                        $("#list-box-suggest-street .lists").append(o);
                        $("#list-box-suggest-street").removeClass("hidden")
                        $("#list-box-suggest-street ul").on('click', function(earg) {
                            var $target = earg.target;
                            document.getElementById('field-cityTeryt').value = $target.getAttribute("id");
                        });
                    }
                })
                if ($("#list-box-suggest-street .lists li").length >= 5) {
                    $("#list-box-suggest-street .lists li:nth-child(5)").after('<li class="more">Poka\u017C wi\u0119cej</li>');
                    $("#list-box-suggest-street .lists li:nth-child(n+7)").addClass("hidden")
                }
            });
        } else {
            $("#list-box-suggest-street").addClass("hidden")
        }
    });
    $(".input-field-container").on("click", 'li:not(".more")', function() {
        b.val($(this).text());
        $("#list-box-suggest .lists").children().remove();
        $("#list-box-suggest").addClass("hidden");
    });
    $(".option-element-check").on("click", 'li:not(".more")', function() {
        e.val($(this).text());
        $("#list-box-suggest-street .lists").children().remove();
        $("#list-box-suggest-street").addClass("hidden")
    });

    $(".input-field-container").on("click", "li.more", function() {
        $("#list-box-suggest .lists li.more").remove();
        $("#list-box-suggest .lists li").removeClass("hidden");
    });

    $(".option-element-check").on("click", "li.more", function() {
        $("#list-box-suggest-street .lists li.more").remove();
        $("#list-box-suggest-street .lists li").removeClass("hidden")
    });

    $("#field-city").on("blur", function() {
        $(document).on("click", function(i) {
            var h = $(i.target);
            if (!h.is(".more") && !h.is("#elem-list")) {
                $("#list-box-suggest .lists").children().remove();
                $("#list-box-suggest-street .lists").children().remove();
                $("#list-box-suggest").addClass("hidden");
                $("#list-box-suggest-street").addClass("hidden")
            }
        })
    })
});