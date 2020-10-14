const Category = require("../models/category");
const slugify = require("slugify");

exports.addCategory = (req, res) => {
  try {
    const { name, parentId } = req.body;
    const categoryObj = {
      name: name,
      slug: slugify(name),
    };
    if (parentId) {
      categoryObj.parentId = parentId;
    }
    const cat = new Category(categoryObj);
    cat.save((error, category) => {
      if (error) return res.status(400).json({ message: "Duplicate category" });
      if (category) {
        return res.status(201).json({ category });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    await Category.find((error, categories) => {
      if (error) return res.status(400).json({ error });
      if (categories) {
        return res.status(200).json({ categories });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
