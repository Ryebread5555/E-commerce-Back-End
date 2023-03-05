const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  await Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    res.status(500)/json(err);
  })
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  await Tag.findOne({
    where: {
      id: req.params.id 
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag has been found with this id!'});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

router.post('/', async (req, res) => {
// create a new tag
await Tag.create({
  tag_name: req.body.tag_name
})
.then(dbTagData => res.json(dbTagData))
.catch(err => {
  res.status(500).json(err);
});
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  await Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData[0]) {
      res.status(404).json({ message: 'No tag has been found with this id!'});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  await Tag.describe({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag has been found with this id!'});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;
