const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    
    if (!categoryData) {
      res.status(404).json ({ message: 'No category found with that id!'});
      return;
    }

    res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const categoryId = req.params.id;
  const updatedData = req.body;

  try {
    const [updatedRows] = await Category.update(updatedData, {
      where: {
        id: categoryId
      }
    });
    if (updatedRows > 0) {
      res.send({ message: 'Category updated successfully'});
    } else {
      res.status(404).send({ message: 'Category not found.'});
    }
  } catch (err) {
    res.status(500).send({ message: 'Error updating category', err});
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryId = req.params.id;

  try {
    const deletedRows = await Category.destory ({
      where: {
        id: categoryId
      }
    });

    if (deletedRows > 0) {
      res.send({ message: 'Category deleted successfully' });
    } else {
      res.status(404).send({ message: 'Category not found'});
    }
  } catch (err) {
    restore.status(500).send({ message: 'Error deleting category', err});
  }
});

module.exports = router;
