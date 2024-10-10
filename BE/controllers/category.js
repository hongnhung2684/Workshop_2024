import { StatusCodes } from "http-status-codes";
import Category from "../models/category";
import category from "../models/category";
import product from "../models/product";

// Tạo danh mục mới
export const createCategory = async(req, res)=> {
    try{

    }catch(error){
        if(error.code === 11000){
            // Mã lỗi cho trùng lặp key
            res.status(StatusCodes.BAD_REQUEST).json({message: "Category title must be unique"})
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message: error.message})
        }
    }
};

// Lấy tất cả các danh mục với phân trang và quan hệ
export const getCategories = async(req, res)=> {
    try{
const {_page = 1, _limit = 10, _expand} = req.query;
const options = {
    pages: parseInt(_page, 10),
    limit: parseInt(_limit, 10),
};
const result = await Category.paginate({}, options);
const {docs, ...paginationData} = result;
if(_expand === "products"){
    const categoriesWithProducts = await Promise.all(
        docs.map(async(category)=> {
            const products = await Product.find({category: categoriesProducts._id});
            return {...category.toObject(), products};
        })
    );
    return res.status(StatusCodes.OK).json({
        categories: categoriesWithProducts,
        ...paginationData,
    });

}
return res.status(StatusCodes.OK).json({
    categories: docs,
    ...paginationData,
}); 
}catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message})
    }
}
export const getCategoryById = async(req, res)=> {
    try{
const {id} = req.params;
const category = await Category.findById(id);
if(!category){
    return res.status(404).json({message: "Category not found"});
}
res.status(200).json(category);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
export const updateCategory = async(req, res) => {
    try{

    }catch(error){
        res.status(500).json({message: error.message});
    }
}
export const deleteCategory = async(req, res)=> {
    
}