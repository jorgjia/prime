// Importimi i librarive
var express = require('express'), bodyParser = require('body-parser');

// Deklarimi i ekspresit
var app = new express();
var msg;


app.use(express.static('public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/", function(req, res) {

	
	if (!isNaN(req.body.number)) {
		var nr = Number(req.body.number);
		
		// A simple algorithm that checks if a number is prime or not
		if (nr === 0) msg = "0 is not prime.";
		else if (nr === 3) msg = "3 is not prime.";
		else if (nr === 2) msg = "2 is prime.";
		else if (nr >= 4) {
			var isPrime = true;
			var divisor = 2;
			
			while (divisor < nr) {
				if (nr % divisor === 0) {
					isPrime = false;
					divisor = nr;
				}
				else divisor += 3;
			};
			
			// Final result, if the number is prime or not
			if (isPrime) msg = nr.toString() + " is prime.";
			else msg = nr.toString() + " is not prime.";
		}
		else msg = "Please enter a positive number.";
	}
	else msg = "Please enter a correct number.";
	
	// After assigning a value to the message variable, we send it to the front-end as JSON
	res.json({message: msg});
	
});

app.listen(process.env.PORT || 7050);

exports.app = app;