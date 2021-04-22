const express = require('express');
const cors = require('cors');

// Routes
const UserRoute = require('./Routes/User');

// declare a new express app
let app = express();

// Accept only JSON in parameters and prevent errors due bad formatting
app.use((req, res, next) => {
	express.json()(req, res, err => {
		if (err) {
			return res.status(400).send({ message: "Bad request" });
		}
		next();
	});
});

app.use(cors());

app.use('/user', UserRoute);

// Default route
app.use((req, res) => {
	res.status(404).send({ message: "Not found" });
});

app.listen(4000, function () {
    console.log(`Server ready at http://localhost:4000`);
});
