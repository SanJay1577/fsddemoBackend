import express from "express";
import { Content } from "../models/content.js";

const router = express.Router(); 


router.get("/", async (req, res)=>{
    try {
        const content = await Content.find().populate("user", "name")
        if(!content){
            return res.status(400).json({message:"Couldn't fetch your data"})
           }
           res.status(200).json(content) 
    } catch (error) {
        console.log("error", error)
        res.status(500).json({message:"Internal server error"})
    }
})

router.post ("/", async(req, res)=>{
    try {
        let postdate = new Date().toJSON().slice(0, 10); 
        const content = await new Content(
            {...req.body,
                 date:postdate, 
                 user: req.user._id}
                 ).save()
       if(!content){
        return res.status(400).json({message:"Error posting your content"})
       }
       res.status(200).json(content)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
})

router.get("/user", async(req, res)=>{
    try {
        const content = await Content.find({user: req.user._id}).populate("user", "name email")
        if(!content){
            return res.status(400).json({message:"Error fetching your content"})
           }
           res.status(200).json(content)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
})

router.put("/edit/:id", async(req, res)=>{
    try {
        const updatedContent = await Content.findOneAndUpdate(
            {_id:req.params.id},
            {$set:req.body},
            {new:true}
            ); 
            if(!updatedContent){
                return res.status(400).json({message:"Error updating your content"}) 
            }
            res.status(200).json(updatedContent) 
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
})

router.delete("/:id", async(req, res)=>{
    try {
        const deleteContent = await Content.findByIdAndDelete(
            {_id:req.params.id}
        )
        if(!deleteContent){
            return res.status(400).json({message:"Error Deleting your content"}) 
        }
        res.status(200).json({message:"Deleted Succesfully"}) 
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
})


export const contentRouter = router