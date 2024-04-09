const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { restore } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!'});
      return;
    }

    res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tagID = req.params.id;
  const updatedTagData = req.body;

  try {
    const [updatedRows] = await Tag.update(updatedTagData, {
      where: {
        id: tagID
      }
    });
    if (updatedRows > 0) {
      res.send({ message: 'Tag updated sucessfully' });
    } else {
      res.status(404).send({ message: 'Tag not found.' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error updating tag', err });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tagID = req.params.id;

  try {
    const deletedRows = await Tag.destroy ({
      where: {
        id: tagID
      }
    });

    if (deletedRows > 0) {
      res.send({ message: 'Tag deleted successfully' });
    } else {
      res.status(404).send({ message: 'Tag not found' });
    }
  } catch (err) {
    restore.status(500).send({ message: 'Error deleting tag', err });
  }
});

module.exports = router;
