import userGoals from "../models/userGoalsSchema.js";
const addGoals = async (req, res, next) => {
  console.log("add goals");

  const { token, ...rest } = req.body;
  console.log(req.body, req.user);
  const goals = new userGoals({ user: req.user.id, ...rest });
  await goals.save();
  const response = {
    id: goals._id,
    user:goals.user,
    mainTask: goals.mainTask,
    subTask: goals.subTask,
  };
  res.json(response);
};
async function getGoals(req, res, next) {
  console.log("getGoals");
  const data = await userGoals.find({ user: req.user.id });
  const response = data.map((item) => {
    const { _id, mainTask, subTask ,user } = item;
    return { _id, mainTask, subTask,user };
  });
  res.json(response);
}
async function updateGoals(req, res, next) {
    const { _id, ...rest } = req.body.updatedData[0];
    console.log(_id,rest,'resttt')
  await userGoals.updateOne({_id},{$set:rest});
  const data=await userGoals.find({user:rest.user}) 

  res.json(data);
}
export { addGoals, getGoals, updateGoals };
