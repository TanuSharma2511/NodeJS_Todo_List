var express=require("express");
var router = express.Router();

var todoModule = require("../models/add_todo");
var gettodo = todoModule.find({});

//Dashboard Page
router.get("/",function(req,res,next){
   res.render("todo");
});

//Add Todo Item
router.get("/add_todo",function(req,res,next){
    res.render("add_todo",{success:""});
})
router.post("/add_todo",function(req,res,next){
    var todo_name = req.body.todo_name;
    var todoDetails = new todoModule({
       todo_item:todo_name
    });

    todoDetails.save(function(err,doc){
        if (err) throw err;
        res.render("add_todo",{ success:"Item added successfully"});
    })
    
})

//Show todo_list
// router.get("/show_todo",function(req,res,next){
//     gettodo.exec(function(err,data){
//         if (err) throw err;
//     res.render("show_todo" , { records:data});
//     });
// });
router.get("/show_todo",function(req,res,next){

   var perPage = 3;
   var page = req.params.page || 1;

    gettodo.skip((perPage * page) - perPage).limit(perPage).exec(function(err,data){
        if(err) throw err;
        todoModule.countDocuments({}).exec((err,count) =>{

    res.render("show_todo" , {  records:data, current:page, pages:Math.ceil(count / perPage)});
    })
});
});

//Edit todo Item
router.get("/edit/:id",function(req,res,next){
    var id=req.params.id;
    var todoEdit = todoModule.findById(id);
    todoEdit.exec(function(err,data){
        if(err) throw err;
        //console.log(data);
        res.render("edit_todo",{id:id,records:data});
    });
});


router.post("/edit/",function(req,res,next){
    var id=req.body.id;
    console.log(id);
    var todo_name =req.body.todo_name;
    var update_todo = todoModule.findByIdAndUpdate(id,{todo_item:todo_name});
    update_todo.exec(function(err,doc){
        if(err) throw err;

        res.redirect("/show_todo");
    })
    
    });

 //Delete Todo Item   
router.get("/delete/:id",function(req,res,next){
    var id=req.params.id;
    var todoDelete = todoModule.findByIdAndDelete(id);
    todoDelete.exec(function(err){
        if(err) throw err;
        res.redirect("/show_todo");
    });
});

//Pagination
router.get("/show_todo/:page",function(req,res,next){

   var perPage = 3;
   var page = req.params.page || 1;

    gettodo.skip((perPage * page) - perPage).limit(perPage).exec(function(err,data){
        if(err) throw err;
        todoModule.countDocuments({}).exec((err,count) =>{
        if (err) throw err;
       // console.log(count);
         var pages= Math.ceil(count / perPage);
       //  console.log(pages);
    res.render("show_todo" , { records:data , current:page, pages: pages});
    console.log(pages);
    })
});
});



module.exports = router;