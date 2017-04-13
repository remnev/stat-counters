block('statcounter').replace()(function() {
    var params = this.ctx.params,
        scriptContent,
        noScriptContent;

    if(!params) {
        throw Error('Missing counter parameters object');
    }

    if(!params.project) {
        throw Error('Missing counter project ID');
    }

    if(!params.security) {
        throw Error('Missing counter security ID');
    }

    scriptContent = [
        'var sc_project=' + params.project + ';',
        'var sc_invisible=1;',
        'var sc_security="' + params.security + '";',
        'var scJsHost = (("https:" == document.location.protocol) ?',
        '"https://secure." : "http://www.");',
        'document.write("<sc"+"ript type=\'text/javascript\' src=\'" +',
        'scJsHost+',
        '"statcounter.com/counter/counter.js\'></"+"script>");'
    ].join('\n');

    noScriptContent = {
        tag : 'div',
        cls : 'statcounter',
        content : {
            tag : 'a',
            attrs : {
                title : 'shopify analytics ecommerce tracking',
                href : 'http://statcounter.com/shopify/',
                target : '_blank'
            },
            content : {
                tag : 'img',
                cls : 'statcounter',
                attrs : {
                    src : 'http://c.statcounter.com/' + params.project + '/0/' + params.security + '/1/',
                    alt : 'shopify analytics ecommerce tracking'
                }
            }
        }
    };

    return [
        {
            tag : 'script',
            attrs : { nonce : this.ctx.nonce },
            content : scriptContent
        },
        {
            tag : 'noscript',
            content : noScriptContent
        }
    ];
});
