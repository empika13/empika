function setSelectedMenuItem() {
    var href, idx = 0,
        h = window.location.hash,
        links = $('.links .link');
    links.removeClass('selected');
    if (h) {
        for (var i = 0, l = links.length; i < l; i++) {
            href = links[i].firstChild.attributes[0].value;
            if (href === h) idx = i;
        }
    }
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

    // setup animated anchor scroll
    $('.links, .container').localScroll({
        target: '.container',
        queue:true,
        duration:1000,
        hash:true,
        onBefore:function(e, anchor, $target) {
            // $('.links .link').removeClass('selected');
            // $(e.currentTarget.parentNode).addClass('selected');
        },
        onAfter:function(anchor, settings) {
            setSelectedMenuItem();
        }
    });

    // set selected menu item
    setSelectedMenuItem();

    // setup carousel
    new flux.slider('#slider', {
        pagination: true
    });

});
