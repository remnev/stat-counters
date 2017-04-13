block('google-tag-manager').replace()(function() {
    var params = this.ctx.params,
        scriptContent,
        noScriptContent;

    if(!params) {
        throw Error('Missing counter parameters object');
    }

    if(!params.id) {
        throw Error('Missing counter ID');
    }

    scriptContent = [
        '(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\':',
        'new Date().getTime(),event:\'gtm.js\'});var f=d.getElementsByTagName(s)[0],',
        'j=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';j.async=true;j.src=',
        '\'//www.googletagmanager.com/gtm.js?id=\'+i+dl;f.parentNode.insertBefore(j,f);',
        '})(window,document,\'script\',\'dataLayer\',\'' + params.id + '\');'
    ].join('\n');

    noScriptContent = {
        tag : 'iframe',
        attrs : {
            src : '//www.googletagmanager.com/ns.html?id=' + params.id,
            height : '0',
            width : '0',
            style : 'display:none;visibility:hidden'
        }
    };

    return [
        {
            tag : 'noscript',
            attrs : { nonce : this.ctx.nonce },
            content : noScriptContent
        },
        {
            tag : 'script',
            content : scriptContent
        }
    ];
});
