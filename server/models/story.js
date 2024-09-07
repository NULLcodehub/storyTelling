const mongoose= require('mongoose')

const optionSchema =new mongoose.Schema({

    text:{type:String, required: true},
    nextBranch: {type: mongoose.Schema.Types.ObjectId, ref: 'Story'},
    clicks: {type:Number, default: 0}

})




const storySchema=new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    choices:[optionSchema],
    Endding:{type: Boolean, default: false}
})

module.exports = mongoose.model('Story',storySchema)