const BannerModel = require("../model/bannerModel");

const handleAddBanner = async (req, res) => {
    try {
        const { bannerImages } = req.body;
        if (!bannerImages) {
            return res.status(402).json({ success: false, message: "Image required." })
        }

        const newBanner = await BannerModel({bannerImages})

        await newBanner.save()

        res.status(201).json({success:true,message:"Banner add successfully",newBanner})

    } catch (error) {
        return res.status(500).json({ success: false, message:error.message })
    }
}
const handleGetBanner=async(req,res)=>{
    try {
       const banners = await BannerModel.find().select({_id:0,createdAt:0,updatedAt:0})
       
       if(!banners){
        return res.status(404).json({success:false,message:"No banners added."})
       }

       res.status(200).json({success:true,message:"Banners returned.",banners})

    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}
const handleDeleteBanner = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(404).json({ success: false, message: "Banner id not found." })
        }

        const deleteBanner=await BannerModel.findByIdAndDelete({_id:id})

        if(!deleteBanner){
            return res.status(404).json({ success: false, message: "Banner not found." })
        }

        res.status(202).json({success:true,message:"Banner delete successful",deleteBanner})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message:error.message })
    }
}




module.exports = { handleAddBanner,handleGetBanner,handleDeleteBanner }