// Name


// Welcome speech
var welcomeMsgs = ["Sok szerencsét pöcök!", "Egy kalappal pöcök!", "A macska rúgjón meg pöcök!", "Mehet a játszma pöcök!"];
var msg = new SpeechSynthesisUtterance(welcomeMsgs[Math.floor(Math.random() * 4)]);
var msg2 = new SpeechSynthesisUtterance("Ahhoz, hogy megtaláld öregmacit előbb megfelelően kell válaszolnod az adott kérdésekre!");
msg2.rate = 1.5;
msg.rate = 1.75;

var cookiemsg = new SpeechSynthesisUtterance("Most szerintem futhatsz pöcök")
const startButton = document.getElementById('start-btn')
const playerName = document.getElementById('playerName')
const nextButton = document.getElementById('next-btn')
const soundchck = document.getElementById('soundchck')
const soundlbl = document.getElementById('soundlbl')


const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')



let jovalaszok = 0
// Hangeffektek
var perfect = new Audio()
var roblox = new Audio()
var victory = new Audio()
perfect.src = "wolfsounds/perfect.mp3"
roblox.src = "wolfsounds/huhaeznehez.mp3"
victory.src = "wolfsounds/verygood.mp3"

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () =>{
	currentQuestionIndex++
	setNextQuestion()
})
var greetings = ["Szia","Csá","Üdv","Szevasz","Mi a helyzet","Hello","Cső","Jó napot","Csókolom","Hahó"]

function startGame() {
	if(soundchck.checked) {
		if(playerName.value != '') {
		var name = new SpeechSynthesisUtterance(greetings[Math.floor(Math.random() * greetings.length + 1)]+playerName.value);
		name.rate = 0.5
		window.speechSynthesis.speak(name);
	}
	else {
		var name = new SpeechSynthesisUtterance(greetings[Math.floor(Math.random() * greetings.length + 1)]+" anonimusz");
		name.rate = 0.5;
		window.speechSynthesis.speak(name);
	}
	window.speechSynthesis.speak(msg2);
	window.speechSynthesis.speak(msg);
	}
	jovalaszok = 0
	hide();
	shuffledQuestions = questions.sort(() => Math.random() - .5)
	currentQuestionIndex = 0
	questionContainerElement.classList.remove('hide');
	setNextQuestion()
}

function hide() {
	startButton.classList.add('hide');
	playerName.classList.add('hide');
	soundlbl.classList.add('hide');
	soundchck.classList.add('hide');
}

function setNextQuestion() {
	resetState()
	showQuestion(shuffledQuestions[currentQuestionIndex])
	if(soundchck.checked) {
	var q = new SpeechSynthesisUtterance(document.getElementById("question").innerHTML)
	q.rate = 1.75;
	window.speechSynthesis.speak(q)
}
}

function showQuestion(question) {
	questionElement.innerText = question.question
	question.answers.forEach(answer => {
		const button = document.createElement('button')
		button.innerText = answer.text
		button.classList.add('btn')
		if(answer.correct) {
			button.dataset.correct = answer.correct
		}
		button.addEventListener('click', selectAnswer)
		answerButtonsElement.appendChild(button)
	})
}


function resetState() {
	clearStatusClass(document.body)
	nextButton.classList.add('hide')
	while(answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild)
	}
	document.getElementById("right-answers").innerHTML = jovalaszok
}




function selectAnswer(e) {

	const selectedButton = e.target
	const correct = selectedButton.dataset.correct
	setStatusClass(document.body, correct)
	Array.from(answerButtonsElement.children).forEach(button => {
		setStatusClass(button, button.dataset.correct)
	})
	
		if(selectedButton.dataset = correct) {
		jovalaszok++
		if(soundchck.checked) {
		perfect.play()
	}
		}
		else {
		jovalaszok--
		if(soundchck.checked) {
		roblox.play()
	}
		}
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide')
	}
	else {
		startButton.innerText = 'Újra'
		startButton.classList.remove('hide')
		if(jovalaszok < shuffledQuestions.length) {
			if(soundchck.checked) {
			fail.play()
		}
			swal({
				title: "Ajjaj!",
				text: "Basszus pöcök ez nem sikerült, próbáld meg mégegyszer!",
				icon: "warning"
			})

		}
	}

	document.getElementById("right-answers").innerHTML = jovalaszok
	if(jovalaszok > 0) {
		document.getElementById("right-answers").style.color = "green";
	}else if(jovalaszok == 0) {
		document.getElementById("right-answers").style.color = "black";
	}
	else {
		document.getElementById("right-answers").style.color = "red";
	}
		if(shuffledQuestions.length == jovalaszok) {
			if(soundchck.checked) {
			victory.play()
		}
		swal({
				title: "Gratulálok",
				text: "Ügyes vagy pöcök",
				icon: "success",
				button: "Hol van öregmaci?"
			}).then(function(){
				var img = document.createElement("img");
				document.body.style.backgroundImage = "url('oldmaci.jpg')"
				document.body.style.backgroundRepeat = "no-repeat"
				document.body.style.backgroundSize = "80% 100%"
				document.body.style.backgroundPosition = "top"
				document.getElementById('container').style.background = "none"
				document.getElementById('start-btn').style.display = "none"
				document.getElementById('answer-buttons').innerHTML = "Error"
				document.getElementById('question').innerHTML = "404"
				if(soundchck.checked) {
				cookiemsg.rate = 0.75
				window.speechSynthesis.speak(cookiemsg);
			}
			}).catch(function(reason){
				alert("A keksz elutasítva a felhasználó által: "+reason)
			});
	}

}

function setStatusClass(element, correct) {
	clearStatusClass(element)
	if(correct) {
		element.classList.add('correct')

	}
	else {
		element.classList.add('wrong')
	}
}

function clearStatusClass(element) {
	element.classList.remove('correct')
	element.classList.remove('wrong')
}
// Kérdések & Válaszok
const questions = [
	{
		question: "Mennyi 2 meg 2 ?",
		answers: [
			{ text: '4', correct: true},
			{ text: '22', correct: false},
			{ text: 'Sok', correct: false},
			{ text: 'Nemtom', correct: false}
		]
	},
		{
		question: "Hány éves pingu?",
		answers: [
			{ text: '6', correct: true},
			{ text: '18', correct: false},
			{ text: '101', correct: false},
			{ text: '65', correct: false}
		]
	},
	{
		question: "Mikor született oldmaci?",
		answers: [
			{ text: '1989', correct: false},
			{ text: '1956', correct: false},
			{ text: '2010', correct: false},
			{ text: '1999', correct: true}
		]
	},
	{
		question: "Mi németül Kőszeg?",
		answers: [
			{ text: 'Güns', correct: true},
			{ text: 'Kiseg', correct: false},
			{ text: 'Guns', correct: false},
			{ text: 'Pöcök', correct: false}
		]
	},
	{
		question: "Mivel jár az egyetem?",
		answers: [
			{ text: 'Diplomával', correct: false},
			{ text: 'Busszal', correct: false},
			{ text: 'Sok stresszel', correct: true},
			{ text: 'Bebaszással', correct: false}
		]
	},
	{
		question: "Ki Kőszeg alpolgármestere?",
		answers: [
			{ text: 'Terplán Zoltán', correct: true},
			{ text: 'Básthy Béla', correct: false},
			{ text: 'Gyurcsány Ferenc', correct: false},
			{ text: 'Rába Kálmán', correct: false}
		]
	},
	{
		question: "Ki fedezte fel a C vitamint?",
		answers: [
			{ text: 'Szent-Györgyi Albert', correct: true},
			{ text: 'Pöcök', correct: false},
			{ text: 'Kiss Lajos Csaba', correct: false},
			{ text: 'Dóra a felfedező', correct: false}
		]
	},


]