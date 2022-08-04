const router = require('express').Router();
const { Category, Product } = require('../../models');
const seedCategories = require('../../seeds/category-seeds');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const dbcategoriesData = await Category.findAll({
    include: [{
      model: Product
    }]
  });
  const categories = dbcategoriesData.map(dbCategories => dbCategories.get({plain: true}));
  res.json(categories);

  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  const dbCategoriesDatabyID = await Category.findByPk(req.params.id, {
    include: [{
      model: Product
    }]
  });
  const categorybyID = dbCategoriesDatabyID.get({plain:true});
  res.json(categorybyID);
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  const newCategory = await Category.create({
    category_name: req.body.category_name
  });
  const dbcategoriesData = await Category.findAll();
  const categories = dbcategoriesData.map(dbCategories => dbCategories.get({plain: true}));
  res.json(categories);
});

router.put('/:id',async (req, res) => {
  // update a category by its `id` value
  const dbCategoriesDatabyID = await Category.findByPk(req.params.id);
  dbCategoriesDatabyID.update({
    category_name: req.body.category_name
  });
  await dbCategoriesDatabyID.save()
  const dbcategoriesData = await Category.findAll();
  const categories = dbcategoriesData.map(dbCategories => dbCategories.get({plain: true}));
  res.json(categories);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` 
  const dbCategoriesDatabyID = await Category.findByPk(req.params.id);
  await dbCategoriesDatabyID.destroy();
  const dbcategoriesData = await Category.findAll();
  const categories = dbcategoriesData.map(dbCategories => dbCategories.get({plain: true}));
  res.json(categories);
});

module.exports = router;
