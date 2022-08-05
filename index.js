const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, rerum sunt, quo facilis officiis non accusamus quasi ratione officia, dolorum ipsa cupiditate? Quia eligendi est commodi quas eum cupiditate fugiat. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos provident voluptatem adipisci accusantium quod tempore fugit numquam delectus similique earum, perferendis iusto nesciunt ipsa ipsam molestias iste, saepe eius voluptatum!";

const express = require("express");
const path = require("path");
const Datastore = require("./Datastore.js");
const emails = new Datastore("./emails.db");
const projects = new Datastore("./projects.db");
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/static",express.static(path.join(__dirname,"public")))
app.set("view engine", "pug");
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"sites/index.html"));
});
app.get("/aboutme",(req,res)=>{
  res.sendFile(path.join(__dirname,"/sites/aboutme.html"));
});
app.get("/contact",(req,res)=>{
  res.sendFile(path.join(__dirname,"sites/contact.html"));
});
const sendEmail = require("./email.js");
app.post("/email", (req,res)=>{
  emails.insert({name, email, reason, tel, subject, message} = req.body);
  res.redirect("/contact#sent");
})

function getProjectInfo(proj_id){
  let databaseArray = projects.findSync({proj_id});
  if(databaseArray.length == 0)
    return {"name": `Project ${proj_id+1}`, "short_desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "description": lorem, "lessons": lorem, "pros": lorem, "cons": lorem};
  return databaseArray[0];
}

app.get("/projectHTML",(req,res)=>{
  res.sendFile(path.join(__dirname,"sites/projects.html"));
})
app.get("/projects",(req,res)=>{
  let info = {};
  for(let i = 0; i < 9; i++){
    let data = getProjectInfo(i);
    let pre = `proj${i+1}`;
    info[pre+"Title"] = data["name"];
    info[pre+"Description"] = data["short_desc"];
    info[pre+"Src"] = data["img_src"];
  }
  res.render('projects',info);
});
app.get("/project/:id",(req,res)=>{
  let data = getProjectInfo(parseInt(req.params["id"])-1);
  res.render('project', {title: data["name"], description: data["description"], lessons: data["lessons"], proj_pros: data["pros"], proj_cons: data["cons"]});
  // projects.find({proj_id: parseInt(req.params["id"])-1}, (err,databaseArray)=>{
  //   if(databaseArray.length == 0){
  //     res.render('project', { title: `Project ${req.params["id"]}`, description: lorem, lessons: lorem, proj_pros: lorem, proj_cons: lorem, show_gallery: false, gallery: null, show_example: false, example: null}, (err, html)=>{
  //       if(err)
  //         res.send("An error has occured\n"+err);
  //       res.send(html);
  //     });
  //   } else {
  //     let data = databaseArray[0];
  //     res.render('project', {title: data["name"], description: data["description"], lessons: data["lessons"], proj_pros: data["pros"], proj_cons: data["cons"], show_gallery: data.hasOwnProperty("gallery"), show_example: data.hasOwnProperty("example")}, (err, html) => {
  //       if(err)
  //         res.send("An error has occured\n"+err);
  //       res.send(html);
  //     });
  //   }
  // });
});
app.get("/getProjectInfo:proj_id", (req,res)=>{
  res.json(getProjectInfo(parseInt(proj_id)-1));
})
app.listen(80);
