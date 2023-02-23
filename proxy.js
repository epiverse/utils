// https://proxy.jalmeida.workers.dev/?https://cog.sanger.ac.uk/cosmic-signatures-production/documents/COSMIC_v3.3.1_SBS_GRCh37.txt
// https://covid19serohub.nih.gov/api/v1/seroprevalence_totals

var urlArray=[ // valid url patterns
    /^https:\/\/cog\.sanger\.ac\.uk\/cosmic-signatures-production\/documents\/COSMIC_v[\.0-9]+_[A-Z]+_GRCh3[78]\.txt$/,
    /^https:\/\/www\.pgscatalog\.org\/rest\//,
    /^https:\/\/covid19serohub\.nih\.gov\/api\/v1\/seroprevalence/,
    /^https:\/\/api.ncbi.nlm.nih.gov\/variation\//,
    /^https:\/\/cda\.datacommons\.cancer\.gov\//,
    /^https:\/\/ftp\.cdc\.gov\//,
    /^https:\/\/cog\.sanger\.ac\.uk\//,
    /^https:\/\/storage\.googleapis\.com\/tp53-static-files\//
]

function urlMatch (url){
    url=decodeURIComponent(url)
    return urlArray.filter(u=>url.match(u)).length>0
}

var src_default = {
  async fetch(request, env, ctx) {
    let search = decodeURIComponent((new URL(request.url)).search.slice(1))
    console.log('search',search,urlMatch(search))
    let res={ // default response
        proxyHost: "Cloudflare",
        msg: "url not provided or not supported"
    }
    if(urlMatch(search)){
        let url=search
        if(url.match(/\.txt$/)!=null|url.match(/\.csv$/)!=null|url.match(/\.tsv$/)!=null){
            res = await (await fetch(url)).text()
        }else{
            res = await (await fetch(url)).json()
        }
    }
    return new Response(JSON.stringify(res),{
      headers: {
        //'content-type': 'text/html;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      },
    });
  }
};

export {
  src_default as default
};