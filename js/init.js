function setSelectedMenuItem(hash) {
    var href, idx = 0,
        links = $('.links .link'),
        h = hash || window.location.hash;
    if (h) {
        for (var i = 0, l = links.length; i < l; i++) {
            href = links[i].firstChild.attributes[0].value;
            if (href === h) idx = i;
        }
    }
    links.removeClass('selected');
    $(links[idx]).addClass('selected');
}


function validateForm() {
    var form = $('form');
    form.validate({
        errorElement: 'span',
        rules: {
            name: {required: true, minlength: 2},
            email: {required: true, email: true},
            message: {required: true, minlength: 50, maxlength: 1000}
        },
        messages: {
            name: "Veuillez indiquer votre prénom et votre nom.",
            email: "Veuillez indiquer une adresse email valide.",
            message: {
                required: "Veuillez sasir votre message.",
                minlength: "Votre message doit comporter au moins 50 caractères.",
                maxlength: "Votre message ne doit pas dépasser 1000 caractères."
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo($('.msg', element.parent('div')));
        },
        submitHandler: function(form) {
            submitForm();
        }
    });
}


function submitForm() {
    setFormStatus('loading');
    var form = $('form');
    $.post('php/mail.php', form.serialize(), function(response, status) {
        var status = status === 'success' && response.success ? 'success' : 'error';
        setFormStatus(status);
        // if (status === 'success') form.reset();
    }, 'json');
}


function setFormStatus(status) {
    var msg, cls,
        el = $('form .status');
    if (status === 'loading') {
        cls = 'loading';
        msg = 'Message en cours d\'envoi, veuillez patienter...';
    } else if (status === 'success') {
        cls = 'success';
        msg = 'Votre message a été envoyé avec succès.';
    } else if (status === 'error') {
        cls = 'error';
        msg = 'Une erreur s\'est produite, veuillez renouveller l\'opération ultèrieurement.';
    }
    el.removeClass('success, error, loading');
    el.addClass(cls);
    el.html(msg);
}


jQuery(function( $ ) {

    var slider = $('#slider');
    var container = $('.container');

    // set selected menu item
    setSelectedMenuItem();

    // setup animated anchor scroll
    $('.menu, .container').localScroll({
        target: '.container',
        queue: true,
        duration: 1000,
        hash: true,
        onBefore: function(e, anchor, $target) {
            anchor.scrollTop = 0;
            setSelectedMenuItem('#' + anchor.id);
            slider.data('nivo:vars').stop = anchor.id !== 'page1';
        }
    });

    // setup carousel
    slider.nivoSlider({
        directionNav: false,
        effect: 'sliceUpDown,sliceUpDownLeft,fold,boxRain,slideInRight'
    });

    $(window).resize(function() {
        var height = $(window).height();
        $('.page', container).height(height);
        $.localScroll.hash({
            target: '.container',
            queue: true,
            duration: 0
        });
    });

});
