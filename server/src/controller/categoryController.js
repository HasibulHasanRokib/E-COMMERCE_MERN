const slugify = require('slugify')
const CategoryModel = require('../model/categoryModel')

const handleCreateCategory = async (req, res) => {
    try {
        const { name, categoryImage } = req.body;
        if (!name || !categoryImage) {
            return res.status(402).json({ success: false, message: "Fill the required field." })
        }

        const categoryExist = await CategoryModel.findOne({ name: name })

        if (categoryExist) {
            return res.status(403).json({ success: false, message: "Category already added." })
        }

        const newCategory = await CategoryModel({ name, slug: slugify(name), categoryImage })

        await newCategory.save()

        res.status(201).json({ success: true, message: "Category create successfully", newCategory })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}
const handleGetCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find().select({ name: 1, slug: 1, categoryImage: 1 })

        if (!categories) {
            return res.status(404).json({ success: false, message: "No category added." })
        }

        res.status(200).json({ success: true, message: "Categories returned.", categories })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}
const handleGetCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        const categoryExist = await CategoryModel.findOne({ slug }).select({ name: 1, slug: 1 })

        if (!categoryExist) {
            return res.status(404).json({ success: false, message: "No category found." })
        }

        res.status(200).json({ success: true, message: "Category returned.", categoryExist })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}
const handleUpdateCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const { name, categoryImage } = req.body;
 
        if (!name) {
            return res.status(402).json({ success: false, message: "Category name is required." })
        }
        if (!categoryImage) {
            return res.status(402).json({ success: false, message: "Category Image is required." })
        }
        const categoryExist = await CategoryModel.findOne({ _id: id })

        if (!categoryExist) {
            return res.status(404).json({ success: false, message: "Category not found." })
        }

        const updateCategory = await CategoryModel.findByIdAndUpdate({ _id: id }, {
            $set: {
                name: req.body.name,
                categoryImage: req.body.categoryImage,
                slug: slugify(name),
            }
        }, { new: true })



        res.status(202).json({ success: true, message: "Category update successful", updateCategory })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}
const handleDeleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(404).json({ success: false, message: "Category id not found." })
        }

        const deleteCategory = await CategoryModel.findByIdAndDelete({ _id: id })

        if (!deleteCategory) {
            return res.status(404).json({ success: false, message: "Category not found." })
        }

        res.status(202).json({ success: true, message: "Category delete successful", deleteCategory })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}




module.exports = { handleCreateCategory, handleGetCategories, handleGetCategory, handleUpdateCategory, handleDeleteCategory }