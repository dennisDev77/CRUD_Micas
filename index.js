const express=require('express')
const {engine}=require('express-handlebars')
const mysql=require('mysql')

//Inicializand o express
let app=express()
let porta=3000

//Ininicializando o handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')


//Utilizando dados do form que esta no body em nodejs
app.use(express.urlencoded({
    extended:true,
}))
app.use(express.json())

//Utilizando css
app.use(express.static('public'))

//Criando as nossa rotas
app.get('/', (req,res)=>{
    res.render('home')
})

app.post('/livro/salvar', (req,res)=>{

    let titulo=req.body.titulo
    let autor=req.body.autor
    let descricao=req.body.descricao
    let capa_livro=req.body.capa_livro
    let data_lancamento=req.body.data_lancamento

    const dados=`insert into livro values('default','${titulo}','${autor}','${descricao}','${capa_livro}','${data_lancamento}')`
   
    conecta.query(dados, (err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/livro/ver')
        }
    })
})

app.get('/livro/ver', (req,res)=>{

    let dados=`select *from livro`
    
    conecta.query(dados, (err, data)=>{
        if(err){
            console.log(err)
        }else{
            let book=data
            res.render('ver_livro', {book})
        }
    })

})

app.get('/livro/ver/:id', (req,res)=>{
    let id=req.params.id

    dados=`select *from livro where id=${id}`

    conecta.query(dados, (err, data)=>{
        if(err){
            console.log(err)
        }else{
            let book=data[0]
            res.render('procurar_livro', {book})
        }
    })
})

app.get('/livro/editar/:id', (req,res)=>{
    let id=req.params.id

    let dados=`select *from livro where id=${id}`

    conecta.query(dados, (err, data)=>{
        if(err){
            console.log(err)
        }else{
            let book=data[0]
            res.render('update_livro', {book})
        }
    })

})

app.post('/livro/update', (req,res)=>{
    let id=req.params.id
    let titulo=req.body.titulo
    let autor=req.body.autor
    let descricao=req.body.descricao
    let capa=req.body.capa
    let data_lancamento=req.body.data_lancamento

    dados=`update livro set titulo='${titulo}',autor='${autor}',descricao='${descricao}',capa_livro='${capa}',data_lancamento='${data_lancamento}', `

    conecta.query(dados, (err, data)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/livro/ver')
        }
    })
})

app.post('/livro/remove/:id', (req,res)=>{
    let id=req.params.id

    let dados=`delete from livro where id=${id}`
    conecta.query(dados, (err, data)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/livro/ver')
        }
    })
})
app.listen(porta, ()=>{
    console.log(`Rodanndo na porta ${porta}`)
})

//Estabelecendo a nossa conexao com o node
const conecta=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'biblioteca'
})

conecta.connect( (err)=>{
    if(err){
        console.log(`erro ao estabelecer a sua conexao`)
    }else{
        console.log(`Conexao estabelcida com sucesso`)
    }
})