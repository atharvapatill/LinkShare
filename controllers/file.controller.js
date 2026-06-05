import { sendFile } from "../services/mail.service.js";
import { Files } from "../models/files.models.js";
import { v4 as uuidv4 } from "uuid";

const uploadFile = async(req,res)=>{
    try {
        if(!req.file){
            return res.status(400).render("home",{
                error: "No file selected. Please upload a valid file."
            })
        }

        const newFile = new Files({
            filename:req.file.filename,
            path:req.file.path,
            size:req.file.size,
            uuid:uuidv4(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        })

        await newFile.save();
        return res.redirect(`/share/${newFile.uuid}`)

    } catch (error) {
        console.log("Failed to save file data in database ", error)

        return res.status(500).render("home",{
            error: "Something went wrong while uploading file."
        })
    }
}

const shareFile = async(req,res) =>{
    try {
        const {email, fileid} = req.body

        if (!email) {
            return res.status(400).end();
        }
        
        const file = await Files.findOne({uuid:fileid})
        console.log(email)
        console.log(fileid)
        console.log(file);
    
        if(!file){
            return res.status(404).render("linkexpired")
        }

        const downloadFileURL = `${req.protocol}://${req.get('host')}/api/download/${file.filename}`
        const downloadLinkURL = `${req.protocol}://${req.get('host')}/download/${file.uuid}`
    
        await sendFile(email,file,downloadFileURL,downloadLinkURL);
        return res.status(200).redirect(`/share/${file.uuid}`)
        
    } catch (error) {
        console.log("Not able to send mail", error);
        return res.status(500).end()
    }
}

const downloadFile = async(req,res)=>{
    try {
        const fileid = req.params.fileid

        const file = await Files.findOne({filename:fileid})

        if(!file){
            return res.status(404).render("linkexpired")
        }

        return res.download(file.path, file.filename);

    } catch (error) {
        console.log("Download error:", error);
         return res.status(500).render("linkexpired");
    }
}


export {uploadFile,shareFile,downloadFile}

