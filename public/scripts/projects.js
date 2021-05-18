(async function(){
    for(let i = 0; i < 2; i++){
        let row = document.createElement("div");
        row.className = "row mt-md-4 w-md-80 project-row mx-auto";
        for(let j = 0; j < 4; j++){
            let col = document.createElement("div");
            col.className = "col-md";
            let a = document.createElement("a");
            a.className = "deco-none project w-100";
            a.href = "/project/"+(i*4+j+1);
            col.append(a);
            let card = document.createElement("div");
            a.append(card);
            card.className = "card flip-card";
            let innerCard = document.createElement("div");
            card.append(innerCard);
            innerCard.className = "card-inner";
            
            let front = document.createElement("div");
            let img = document.createElement("img");
            img.className = "card-img-top";
            img.setAttribute("data-src","holder.js/100px200");
            img.alt = "Placeholder Image";
            let front_body = document.createElement("div");
            front_body.className = "card-body";
            let proj_title = document.createElement("h5");
            proj_title.className = "card-title";
            proj_title.textContent = "Project Title";
            //INSERT data
            front_body.append(proj_title);
            front.append(img, front_body);

            let back = document.createElement("div");
            let back_body = document.createElement("div");
            back_body.className = "card-body";
            let back_title = document.createElement("h5");
            back_title.className = "cart-title";
            back_title.append(document.createTextNode("Project Description"));
            let back_text = document.createElement("p");
            back_text.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla fuga labore doloremque quam debitis, repudiandae quasi autem odio odit sunt. Aperiam laudantium saepe corporis architecto ad enim, magnam hic nam!"; // INSERT
            back_body.append(back_title, back_text);
            back.append(back_body);

            innerCard.append(front, back);
            row.append(col);
            // let data = await fetch("/getProjectInfo/"+(i*4+j+1));
        }
        document.getElementById("projects").append(row);
    }
})();