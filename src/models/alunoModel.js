const db = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            return resolve(require("./usuarios.json"))
        }, 1000);
    })
}

module.exports=db