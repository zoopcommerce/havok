var i,
    ie8tags = [
        'header',
        'nav',
        'section',
        'article',
        'footer',
        'dropdown',
        'dropdown-container',
        'carousel',
        'nav-bar',
        'nav-bar-links',
        'nav-list',
        'nav-pill',
        'nav-tab',
        'overlay',
        'memory-store'
    ];

for(i=0; i < ie8tags.length; i++) {
    document.createElement(ie8tags[i]);
}
