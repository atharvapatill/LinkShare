import { Files } from "../models/files.models.js"

const homeEJS = (req,res) =>{
    try {
        return res.render("home",{error:""})
    } catch (error) {
        console.log("Error while rendering Home Page",error)
    }
}

const downloadEJS = async(req,res) =>{
    try {
        const fileid = req.params.fileid
    
        const file = await Files.findOne({uuid:fileid})
    
        if(!file){
            return res.status(404).render("linkexpired")
        }else{
            return res.status(200).render("download",{file,req})
        }
    } catch (error) {
        console.log("Error while rendering Download Page",error)
    }
}

const shareEJS = async(req,res)=>{
    try {
        const fileid = req.params.fileid

        const file = await Files.findOne({uuid:fileid})

        if(!file){
            return res.status(404).render("linkexpired")
        }else{
            return res.status(200).render("share",{file,req})
        }
    } catch (error) {
         console.log("Error while rendering Share Page",error)
    }
}

export {homeEJS,shareEJS,downloadEJS}
