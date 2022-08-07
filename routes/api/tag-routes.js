const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const dbTagsData = await Tag.findAll({
    include: [{
      model: Product,
    }]
  });
  const tags = dbTagsData.map(dbTags => dbTags.get({plain: true}));
  res.json(tags);
});

router.get('/:id',async (req, res) => {
  const dbTagsDatabyID = await Tag.findByPk( req.params.id, {
    include: [{
      model: Product,
    }]
  });
  res.json(dbTagsDatabyID);
});

router.post('/', async (req, res) => {
  const newTag = await Tag.create({
    tag_name: req.body.tag_name
  })
});

router.put('/:id', async (req, res) => {
  const dbTagDatabyId = await Tag.findByPk(req.params.id);
  dbTagDatabyId.update({
    tag_name: req.body.tag_name
  })
});

router.delete('/:id', async (req, res) => {
  const dbTagDatabyId = await Tag.findByPk(req.params.id);
  await dbTagDatabyId.destroy();
});

module.exports = router;
