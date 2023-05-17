import  {Schema,model} from 'mongoose'

const userGoalsSchema=new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    mainTask: {
        type:Object,
        required: true,
      
      },
    subTask:{
        type:Array,
        required: true,
    },
    
},{timestamps:true})
export default model.Goals || model('Goals',userGoalsSchema)