const {parse} = require("csv-parse");
const fs = require("fs");
const results = []
const habitablePlanets = [];

const ishabitablePlanet = (planet)=>{
    return planet['koi_disposition']==='confirmed'
    &&planet['koi_insal']>0.36 && planet['koi_insal']<1.11
    && planet['koi_prad']<1.6;
}

fs.createReadStream('kepler_data.csv')
.pipe(parse({
    comment:'#',
    columns:true,
}))
.on('data',data=>{
    if(ishabitablePlanet(data)){
        habitablePlanets.push(data)
    }
    results.push(data);
})
.on("error",(err)=>{
    console.log(err);
})
.on("end",()=>{
    console.log(`${habitablePlanets.length} habitable planets found!`);
    console.log("end")
    
})
