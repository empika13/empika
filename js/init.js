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


jQuery(function( $ ) {

    // setup animated anchor scroll
    $('.links, .container').localScroll({
        target: '.container', // could be a selector or a jQuery object too.
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
