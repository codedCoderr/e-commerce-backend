const Category = require('../models/category');
const slugify = require('slugify');

const createCategories = (categories, parentId = null) => {
  try {
    const categoryList = [];
    let category;
    if (parentId == null) {
      category = categories.filter((cat) => cat.parentId == undefined);
    } else {
      category = categories.filter((cat) => cat.parentId == parentId);
    }
    for (let cat of category) {
      categoryList.push({
        _id: cat._id,
        name: cat.name,
        slug: cat.slug,
        children: createCategories(categories, cat._id),
      });
    }
    return categoryList;
  } catch (error) {
    console.log(error.message);
  }
};
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
      if (error) return res.status(400).json({ message: 'Duplicate category' });
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
        const categoryList = createCategories(categories);
        return res.status(200).json({ categoryList });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
