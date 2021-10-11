const express = require('express');
const router = express.Router();
const Customer = require('../../models/Customer');
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const customers = await Costumer.find().populate('name', [
      'address',
      'phone',
    ]);
    console.log(customers);
    res.render('customers.ejs', {
      data: customers,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/add',
  [
    check('name', 'Se necesita un nombre').not().isEmpty(),
    check('address', 'Se necedita una direccion').not().isEmpty(),
    check('phone', 'Ingrese un celular valido').not().isMobilePhone(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, address, phone } = req.body;

    try {
      let customer = await Customer.findOne({ name });
      // See if the user exists
      if (customer) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'This customer already exist' }] });
      }

      customer = new Customer({
        name,
        address,
        phone,
      });

      await customer.save();

      console.log(customer);
      res.redirect('/');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/delete/:id', async (req, res) => {
  try {
    // Remove Ccustomer

    await Costumer.findOneAndRemove({ id: req.params });

    res.redirect('/');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/update/:id', async (req, res) => {
  try {
    const customer = await Customer.findOne({
      id: req.params,
    });
    res.render('customer_edit.ejs', {
      data: customer,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.post('/update/user/:id', async (req, res) => {
  const { name, address, phone } = req.body;
  const costumerNew = {};

  if (name) costumerNew.name = name;
  if (address) costumerNew.address = address;
  if (phone) costumerNew.phone = phone;

  try {
    let customer = await Customer.findOne({
      id: req.params,
    });

    if (customer) {
      customer = await Customer.findOneAndUpdate(
        { id: req.params },
        { $set: costumerNew },
        { new: true }
      );

      await customer.save();

      return res.redirect('/');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
