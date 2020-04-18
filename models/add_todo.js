var mongoose = require("mongoose");

var schema = mongoose.Schema;
var todoSchema = new schema({
    todo_item:{
        type:String,
        required:true,
        
    },
   
   date:{
       type:Date,
       default:Date.now
   }
});

module.exports = mongoose.model("Todo",todoSchema);