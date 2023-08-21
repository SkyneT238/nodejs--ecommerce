const app = require("./src/app");

const PORT = process.env.PORT || 3053;

const server = app.listen(PORT,()=>{
    console.log(`hello ecommerce ${PORT}`);
})

process.on('SIGINT',()=>{
    server.close(()=>console.log(`exit server`))
})

//sudo lsof -i :3055
