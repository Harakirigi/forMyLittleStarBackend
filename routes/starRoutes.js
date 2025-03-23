const express = require("express");
const router = express.Router();
const Star = require("../models/Star");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const Choice = require("../models/Choice")
const mongoose = require("../models/dataBase")




router.post("/:starId/question", async (req, res) => {

    const starId = req.params.starId
    if (!mongoose.Types.ObjectId.isValid(starId)) {
        return res.status(400).json({ message: "Invalid Star ID" });
    }

    try {
        const questionContent = req.body.questionContent
        console.log("Received data: ", questionContent)

        if (!questionContent) {return res.status(400).json({ message: "No questions found while receiving" })}

        const star = await Star.findById(starId)
        if (!star) { return res.status(404).json({ message: "No stars found while creating the question" })}

        const newQuestion = new Question({ star: starId, content: questionContent })
        await newQuestion.save();
        return res.status(201).json(newQuestion);
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
})
router.get("/:starId/question", async (req, res) => {

    const starId = req.params.starId
    if (!mongoose.Types.ObjectId.isValid(starId)) {
        return res.status(400).json({ message: "Invalid Star ID" });
    }

    try {
        const star = await Star.findById(starId)
        if (!star) { return res.status(404).json({ message: "No star found while getting the question" })}
        const questions = await Question.find({star: starId});

        if (!questions) { return res.status(404).json({ message: `${star.name} doesn't have questions yet` }) }
        return res.json(questions);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})
router.post("/:starId/question/:questionId/answer", async (req, res) => {

    const {starId, questionId} = req.params
    if (!mongoose.Types.ObjectId.isValid(starId)) {
        return res.status(400).json({ message: "Invalid Star ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
        return res.status(400).json({ message: "Invalid Question ID" });
    }
    
    try {
        const answerContent = req.body.answerContent
        if (!answerContent) return res.status(400).json({ error: 'Answer content is required' });

        const star = await Star.findById(starId)
        if (!star) { return res.status(404).json({ message: "Star not found while creating the answer" })}
        const question = await Question.findById(questionId)
        if (!question) { return res.status(404).json({ message: "Question not found while creating the answer" })}

        const newAnswer = new Answer({star: star._id, question: question._id, content: answerContent})
        await newAnswer.save()
        const updatedQuestion = await Question.updateOne(
            {_id: questionId},
            {$set: {answer: newAnswer._id, answerContent: newAnswer.content}},
            {new: true}
        )
        return res.status(201).json({newAnswer, updatedQuestion})
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})
router.get("/:starId/question/:questionId/answer", async (req, res) => {
    
    const {starId, questionId} = req.params
    if (!mongoose.Types.ObjectId.isValid(starId)) {
        return res.status(400).json({ message: "Invalid Star ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
        return res.status(400).json({ message: "Invalid Question ID" });
    }
    
    try {
        const answers = await Answer.find({star: starId, question: questionId});
        if (!answers) { return res.status(404).json({ message: "Answers not found" }) }
        
        return res.json(answers);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})




router.post("/:starId/choice", async (req, res) => {

    const starId = req.params.starId
    if (!mongoose.Types.ObjectId.isValid(starId)) {
        return res.status(400).json({ message: "Invalid Star ID" });
    }

    try {
        const {choiceKey, choiceValue} = req.body
        if (!choiceKey || !choiceValue) {return res.status(400).json({error: "Missing choice key or value"})}

        const star = await Star.findById(starId)
        if (!star) {return res.status(404).json({message: "Star not found"})}

        const newChoice = new Choice({star: starId, choiceKey, choiceValue})
        await newChoice.save()
        return res.status(201).json({status: "Success", message: `${star.name}(${star._id}) answered the question: ${choiceKey}`, newChoice: newChoice})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
})
router.get("/:starId/choice", async (req,res) => {

    const starId = req.params.starId
    if (!mongoose.Types.ObjectId.isValid(starId)) {
        return res.status(400).json({ message: "Invalid Star ID" });
    }

    try {
        const star = await Star.findById(starId)
        if (!star) {return res.status(404).json({message: "Star not found"})}

        const choice = await Choice.find({star: starId})
        res.status(201).json({choice})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
})





router.post("/", async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "You cannot have empty name :0" })
        }

        const newStar = new Star({ name });
        await newStar.save();
        return res.status(201).json({ status: 'Success', message: 'User created successfully!', starId: newStar._id});
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
router.get("/:starId", async (req, res) => {
    const stringId = req.params.starId
    if (mongoose.Types.ObjectId.isValid(stringId)) {
        const starId = new mongoose.Types.ObjectId(stringId);
        try {
            const star = await Star.findById(starId);
            if (!star) return res.status(404).json({ message: "Star not found" });
    
            return res.status(201).json({star})
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    if (!mongoose.Types.ObjectId.isValid(stringId)) {
        return res.status(400).json({ message: "Invalid Star ID" });
    }
    
});
router.get("/", async (req, res) => {
    try {
        const stars = await Star.find();
        
        return res.json(stars);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
router.put("/:starId", async (req, res) => {
    
    const starId = req.params.starId
    if (!mongoose.Types.ObjectId.isValid(starId)) {
        return res.status(400).json({ message: "Invalid Star ID" });
    }
    
    try {
        const name = req.body;
        const updatedStar = await Star.findByIdAndUpdate(
            starId,
            { name },
            { new: true }
        );
        if (!updatedStar) return res.status(404).json({ message: "Star not found" });
        return res.json(updatedStar);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
router.delete("/:starId", async (req, res) => {
    
    const starId = req.params.starId
    if (!mongoose.Types.ObjectId.isValid(starId)) {
        return res.status(400).json({ message: "Invalid Star ID" });
    }
    
    try {
        const star = await Star.findById(starId);
        if (!star) return res.status(404).json({ message: "Star not found" });
        
        await Question.deleteMany({ star: starId });
        await Answer.deleteMany({ star: starId });
        await Choice.deleteMany({ star: starId })
        await Star.findByIdAndDelete(starId);

        return res.json({ status: "Success", message: "Star deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
router.delete("/", async (req, res) => {
    try {
        const all = await Star.find();
        if (!all) return res.status(404).json({ message: "Nothing has found" });

        await Question.deleteMany()
        await Answer.deleteMany()
        await Choice.deleteMany()
        await Star.deleteMany()

        return res.json({ message: "Everything deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});








module.exports = router;
