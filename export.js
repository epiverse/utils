const hello = `Hello world at ${Date()}`; //'\t'

function json2csv(json,sep=','){
    // (await import('./export.js')).json2csv(await(await fetch('https://mathbiol.github.io/openHealth/jobs/clinical_patient_gbm.json')).json())
    let cols = Object.keys(json)
    let csv = cols.join(sep)
    const n = json[cols[0]].length
    for(let i=0;i<n;i++){
        let row=''
        for(let j=0;j<cols.length;j++){
            row+=json[cols[j]][i]+sep
        }
        csv+=`\n ${row.slice(0,-1)}`
    }
    return csv
}

function json2tsv(json){
    return json2csv(json,'\t')    
}


export{
    hello,
    json2csv,
    json2tsv
}