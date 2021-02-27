const express = require('express');
const bodyParser = require('body-parser');
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroSequelize = require('@admin-bro/sequelize')
require('dotenv').config()



AdminBro.registerAdapter(AdminBroSequelize);

const app = express();
global.db = require("./database/models");
const routes = require("./routes/api");

const adminBro = new AdminBro({
    databases: [db],
    rootPath: '/admin',
    loginPath: '/admin/login',
    branding: {
        companyName: 'Skitchen',
        softwareBrothers: false,
    }
});


const router = AdminBroExpress.buildRouter(adminBro)

app.use(adminBro.options.rootPath, router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
// Use Routes
app.use("/", routes)


const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Server started on port ${PORT}`));
