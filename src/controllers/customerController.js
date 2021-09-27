const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('Select * from customer', (err, customers) => {

            if (err) {
                next(err);
                res.json(err);

            }
            console.log(customers);
            res.render('customers.ejs', {
                data: customers
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into customer set ?', [data], (err, customer) => {
            console.log(customer);
            res.redirect('/');
        });
    });
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer WHERE id = ? ', [id], (err, customer) => {
            
            res.render('customer_edit.ejs', {
                data: customer[0]
            });
        });
    });
};

controller.update = (req, res) =>{
    const { id } = req.params;
    const newCustomer = req.body;
    req.getConnection((err, conn) =>{
        conn.query('UPDATE customer SET ? WHERE id= ?', [newCustomer, id], (err, rows)=>{
res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('delete from customer where id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
};



module.exports = controller;
