const { Router } = require('express');
const { get } = require('express/lib/response');
var { PythonShell } = require('python-shell')
const router = Router();

var ans = "Здесь будет комментарий"
var ans_bp = "Здесь будет комментарий"
var ans_ch = "Здесь будет комментарий"

router.get('/', (req, res) => {
	res.render('index', {
		title: 'index',
		ans
	});
})

router.post('/', (req, res) => {
	try {
		const user = {
			bloodPressure: Number(req.body.bp),
			cholesterol: Number(req.body.chol),
			cholCheck: Number(req.body.chol_check),
			bmi: Number(req.body.bmi),
			smoking: Number(req.body.smk),
			stroke: Number(req.body.stroke),
			diabetes: Number(req.body.diabetes),
			phActivity: Number(req.body.phActivity),
			fruits: Number(req.body.fruits),
			vegetables: Number(req.body.vegetables),
			alco: Number(req.body.alco),
			hlthCare: Number(req.body.hlthCare),
			docCost: Number(req.body.docCost),
			genHlth: Number(req.body.genHlth),
			mntHlth: Number(req.body.mntHlth),
			phHlth: Number(req.body.phHlth),
			diffWalk: Number(req.body.diffWalk),
			sex: Number(req.body.sex),
			age: Number(req.body.age),
			education: Number(req.body.education),
			income: Number(req.body.income)
		}
		for (let x in user) {
			if (isNaN(user[x]))
				throw new Error("Некорректные данные. Проверьте ввод и попробуйте еще раз")
		}
		if (user.bmi < 12 || user.bmi > 100 || user.alco < 0 ||
			user.mntHlth < 0 || user.mntHlth > 30 || user.age < 0 || user.age > 130)
			throw new Error("Некорректные данные. Проверьте ввод и попробуйте еще раз")
		if (user.sex == 0) {
			if (user.alco > 7)
				user.alco = 1;
			else user.alco = 0;
		} else {
			if (user.alco > 14)
				user.alco = 1;
			else user.alco = 0;
		}
		switch (user.age) {
			case user.age <= 24:
				user.age = 1;
				break;
			case user.age <= 29:
				user.age = 2;
				break;
			case user.age <= 34:
				user.age = 3;
				break;
			case user.age <= 39:
				user.age = 4;
				break;
			case user.age <= 44:
				user.age = 5;
				break;
			case user.age <= 49:
				user.age = 6;
				break;
			case user.age <= 54:
				user.age = 7;
				break;
			case user.age <= 59:
				user.age = 8;
				break;
			case user.age <= 64:
				user.age = 9;
				break;
			case user.age <= 69:
				user.age = 10;
				break;
			case user.age <= 74:
				user.age = 11;
				break;
			case user.age <= 79:
				user.age = 12;
				break;
			case user.age <= 130:
				user.age = 13;
				break;
		}
		let str = ""
		for (let x in user) {
			str += user[x] + ".0,"
		}
		str = str.slice(0, -1);
		console.log(str);

		let options = {
			mode: "text",
			pythonOptions: ['-u'], // get print results in real-time
			scriptPath: __dirname,
			args: [str]
		};

		// PythonShell.run("predictor.py", options, (err, res) => {
		// 	if (err) {
		// 		console.log(err);
		// 	}
		// 	if (res) {
		// 		msg = ""
		// 		console.log(res[0]);
		// 		if (res[0] == 1) {
		// 			ans = "Обнаружен высокий риск сердечной недостаточности, советуем обатиться к специалисту";
		// 		} else ans = "У вас низкий риск сердечной недостаточности";
		// 	}
		// })

		ans = "Получение результат, обновите страницу"

		let pyshell = new PythonShell("predictor.py", options)
		// pyshell.send('1.0,1.0,1.0,31.0,1.0,1.0,2.0,1.0,1.0,0.0,0.0,1.0,1.0,4.0,0.0,0.0,0.0,1.0,10.0,5.0,8.0');

		pyshell.on('message', function (message) {
			console.log("aaa " + message);
			if (message.slice(-1) == 1) {
				ans = "Обнаружен высокий риск сердечной недостаточности, советуем обатиться к специалисту";
			} else ans = "У вас низкий риск сердечной недостаточности";
		});

		pyshell.end(function (err, code, signal) {
			if (err) throw err;
			console.log('The exit code was: ' + code);
			console.log('The exit signal was: ' + signal);
			console.log('finished');
			res.redirect('/');
			res.end()
		});
	} catch (e) {
		ans = e.message
		res.redirect('/');
		res.end()
	}

	// console.log(msg);
	// ans = msg;
	// res.redirect('/');
	// res.end()
})
router.get('/bp', (req, res) => {
	res.render('BP', {
		title: 'BloodPressure',
		ans_bp
	})
})
router.post('/bp', (req, res) => {
	try {
		high = Number(req.body.high)
		low = Number(req.body.low)
		if (isNaN(high) || isNaN(low)) {
			throw new Error("Введены некорректные данные")
		}
		switch (Number(req.body.age_cat)) {
			case 0:
				if (high >= 100 && high <= 120 && low >= 70 && low <= 80)
					ans_bp = "Давление в норме"
				else if (high > 120 || low > 80)
					ans_bp = "У вас высокое давлеие"
				else ans_bp = "У вас низкое давление"
				break;
			case 1:
				if (high >= 120 && high <= 130 && low >= 70 && low <= 80)
					ans_bp = "Давление в норме"
				else if (high > 130 || low > 80)
					ans_bp = "У вас высокое давлеие"
				else ans_bp = "У вас низкое давление"
				break;
			case 2:
				if (high <= 140 && low <= 90)
					ans_bp = "Давление в норме"
				else ans_bp = "У вас высокое давлеие"
				break;
			case 3:
				if (high <= 150 && low <= 90)
					ans_bp = "Давление в норме"
				else ans_bp = "У вас высокое давлеие"
				break;
		}
	} catch (e) {
		ans_bp = e.message;
	}
	res.redirect('/bp');
	res.end()
})

router.get('/chol', (req, res) => {
	res.render('cholesterol', {
		title: 'Cholesterol',
		ans_ch
	})
})

router.post('/chol', (req, res) => {
	try {
		gen = Number(req.body.general_ch);
		high = Number(req.body.high_ch);
		low = Number(req.body.low_ch);
		trig = Number(req.body.trig);
		if (isNaN(gen) || isNaN(high) || isNaN(low) || isNaN(trig))
			throw new Error("Введены некорректные данные");
		if (req.body.sex_ch == 0) {
			if (gen <= 6 && low <= 4.79 && high <= 1.63 && trig <= 2)
				ans_ch = "Холлестерин норму не превышает";
			else ans_ch = "У вас повышенные холестерин"
		} else {
			if (gen <= 5.5 && low <= 4.51 && high <= 2.28 && trig <= 1.5)
				ans_ch = "Холлестерин норму не превышает";
			else ans_ch = "У вас повышенные холестерин"
		}
	} catch (e) {
		ans_ch = e.message;
	}
	res.redirect('/chol');
	res.end()
})

module.exports = router;