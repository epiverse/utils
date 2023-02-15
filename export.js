const hello = `Hello world at ${Date()}`;

function json2tsv(json){
    // (await import('./export.js')).json2tsv(await(await fetch('https://mathbiol.github.io/openHealth/jobs/clinical_patient_gbm.json')).json())
    let cols = Object.keys(json)
    let csv = cols.join(',')
    const n = json[cols[0]].length
    for(let i=0;i<n;i++){
        let row=''
        for(let j=0;j<cols.length;j++){
            row+=json[cols[j]][i]+'\t'
        }
        csv+=`\n ${row.slice(0,-1)}`
    }
    return csv
}


export{
    hello,
    json2tsv
}