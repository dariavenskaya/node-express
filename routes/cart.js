const { Router } = require('express');
const Cart = require('../models/cart');
const Course = require('../models/course');

const router = Router();
router.get('/', async (req, res) => {
  res.render('cart', {
    title: 'Cart',
    isCart: true,
    // cart,
  });
});
router.post('/add', async (req, res) => {
  const course = await Course.getById(req.body.id);
  await Cart.add(course);
  res.redirect('/cart');
});

module.exports = router;
