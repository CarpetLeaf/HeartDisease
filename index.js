const express = require("express");
const exphb = require("express-handlebars");
const fileRoutes = require('./routes/route1');

const PORT = process.env.PORT || 3000;
const app = express();
const hbs = exphb.create({
	defaultLayout: "main",
	extname: "hbs"
})
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", 'views');
app.use(express.urlencoded({ extended: true }));
app.use(fileRoutes);

async function start() {
	try {
		app.listen(PORT, () => {
			console.log('Server has been started...');
		})
	} catch (e) {
		console.log(e);
	}
}

start();