//controllers --- all function definition
const Task = require('../models/task');
const asyncWrapper = require('../middleware/asyncWrapper');
const {createCustomError}  = require('../errors/custom-errors');
const getAllTasks = asyncWrapper(async(req,res,next) => 
{
    const allTask =  await Task.find({});
    console.log(!allTask)
    // if(!allTask){ return res.send({msg:'there are no tasks'});} this is replaced by custom error
    if(!allTask){return next(createCustomError('there are no tasks',404))}
    const taskName = allTask.map(item => {return item.name})
    res.send(taskName);
});

const createTask = asyncWrapper(async(req,res) => {
    
    const task = await Task.create(req.body);
    res.status(201).json(task);
    
})

const getTask = asyncWrapper(async(req,res,next) => {
    
    const id = req.params.id;
    const userData = await Task.findById(id);
    // if(!userData)  { return res.send({msg:'no task exists with this id!'});}
    if(!userData) {
        return next(createCustomError(`no task exists with this id!`,404))
    };
    console.log(userData);
    res.send(userData);
    
})

const updateTask = asyncWrapper(async (req,res,next) => {

    const id = req.params.id;
    const updatedTask = req.body;
    const options = {
        new: true,
        runValidators: true
    }
    const updateTask  = await Task.findByIdAndUpdate(id,updatedTask,options);//passing the options param here^^
    console.log(updateTask);
    // if(!updateTask) {return res.send('msg: task not found')};
    if(!updateTask){ return next(createCustomError('task not found',404))}
    return res.send(`msg: successfully updated ${updateTask}`);
    //the update doesn't show instantly. to handle this error we have to add the options object as the argument
    //by default, it returns the old value. the new updated version is displayed in the next request.


        
} )
    // catch (error) {
    //     
    // }
    // res.send('update task');
// }

const deleteTask = asyncWrapper(async(req,res,next) => {
  
    const id = req.params.id;
    const delTask = await Task.findByIdAndDelete(id);
    if(!delTask){return next(createCustomError('no task exists with this id',404))}
    res.send(delTask);
    
})


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}

//with try-catch block it was like this...
// const getTask = async(req,res) => {
//     try {
//      function fn ---> (const id = req.params.id;
                //         const userData = await Task.findById(id);
                //         if(!userData)  { return res.send({msg:'no task exists with this id!'});}
                //         console.log(userData);
                //         res.send(userData);)
//     } 
//     catch (error) {
//        (x)res.send({message:error});
//          INSTEAD error is thrown to the next middleware that is custom made
//        (✓)next(error) ----> 

//     }
// }
