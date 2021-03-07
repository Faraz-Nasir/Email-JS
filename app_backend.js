
let express=require("express")
let app=express()
const path=require('path')

if(process.env.NODE_ENV!=="production"){
    require("dotenv").config();
    
}

// delete process.env.email
// delete process.env.email_pass

let email_id=process.env.email
let email_pass=process.env.email_pass


let nodemailer=require("nodemailer")
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.static("public"))

// app.use(express.static(path.join(__dirname,"/public")))

app.use(express.urlencoded({extended:true}))

async function main(email,emailcontent){
    let account=nodemailer.createTestAccount();

    let transporter=nodemailer.createTransport({
        service:'gmail',
        // secure:false,
        // port:25,
        auth:{//https://myaccount.google.com/lesssecureapps SWITCH TO ON
            user:email_id,
            pass:email_pass
        }
    })
    let info=await transporter.sendMail({
        from:"",
        to:email,
        subject:"Sent from Express App",
        text:emailcontent,
        html:emailcontent
    })
    console.log("Message Sent: ",info.messageId)
    console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));
}



app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.post("/",(req,res)=>{
    let {email,emailcontent}=req.body
    console.log(email,emailcontent)

    main(email,emailcontent).then(()=>{
        console.log("Message Sent")
    }).catch((err)=>{
        console.log(err)
        console.log("Message could'nt be sent,Sorry! ")
    })
})

app.listen(3000,()=>{
    console.log("Listening on PORT 3000")
})