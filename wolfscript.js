
const startButton = document.getElementById('start-btn')
const playerName = document.getElementById('playerName')
const nextButton = document.getElementById('next-btn')
const soundchck = document.getElementById('soundchck')
const soundlbl = document.getElementById('soundlbl')


const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')



let jovalaszok = 0
// Wolfsounds
var wolfsounds = [];
wolfsounds[0] = new Audio();
wolfsounds[0].src = "wolfsounds/verygood.mp3";
wolfsounds[1] = new Audio();
wolfsounds[1].src = "wolfsounds/ultiban.mp3";
wolfsounds[2] = new Audio();
wolfsounds[2].src = "wolfsounds/piszkosuligaz.mp3";
wolfsounds[3] = new Audio();
wolfsounds[3].src = "wolfsounds/ooaznemleszeleg.mp3";
wolfsounds[4] = new Audio();
wolfsounds[4].src = "wolfsounds/mindenkellnektek.mp3";
wolfsounds[5] = new Audio();
wolfsounds[5].src = "wolfsounds/mindeen.mp3";
wolfsounds[6] = new Audio();
wolfsounds[6].src = "wolfsounds/miafrancér.mp3";
wolfsounds[7] = new Audio();
wolfsounds[7].src = "wolfsounds/megtanultatok.mp3";
wolfsounds[8] = new Audio();
wolfsounds[8].src = "wolfsounds/lelovom.mp3";
wolfsounds[9] = new Audio();
wolfsounds[9].src = "wolfsounds/jasex.mp3";
wolfsounds[10] = new Audio();
wolfsounds[10].src = "wolfsounds/huhaeznehez.mp3";
wolfsounds[11] = new Audio();
wolfsounds[11].src = "wolfsounds/huhaa.mp3";
wolfsounds[12] = new Audio();
wolfsounds[12].src = "wolfsounds/fincsi.mp3";
wolfsounds[13] = new Audio();
wolfsounds[13].src = "wolfsounds/eztmegszoptatok.mp3";
wolfsounds[14] = new Audio();
wolfsounds[14].src = "wolfsounds/eztmegszoktatokultiban.mp3";
wolfsounds[15] = new Audio();
wolfsounds[15].src = "wolfsounds/computerscience.mp3";
wolfsounds[16] = new Audio();
wolfsounds[16].src = "wolfsounds/becsuknakabortonbe.mp3";
wolfsounds[17] = new Audio();
wolfsounds[17].src = "wolfsounds/ahogyrangatom.mp3";
wolfsounds[18] = new Audio();
wolfsounds[18].src = "wolfsounds/bendeguzsaysomething.mp3";
wolfsounds[19] = new Audio();
wolfsounds[19].src = "wolfsounds/ennyiidonemvolteleghogyswallow.mp3";
wolfsounds[20] = new Audio();
wolfsounds[20].src = "wolfsounds/ooohaelkapjakooo.mp3";


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () =>{
	currentQuestionIndex++
	setNextQuestion()
})

function startGame() {
	if(soundchck.checked) {
		var name = wolfsounds[Math.floor(Math.random() * wolfsounds.length)];
		//name.play();

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
		var name = wolfsounds[Math.floor(Math.random() * wolfsounds.length)];
		name.play();
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
			button.disabled = true;
			
		}
		button.addEventListener('click', selectAnswer,)
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
			var name = wolfsounds[Math.floor(Math.random() * wolfsounds.length)];
			name.play();
	}
			
		}
		else {
		jovalaszok--
		if(soundchck.checked) {
			var name = wolfsounds[Math.floor(Math.random() * wolfsounds.length)];
			name.play();
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
				var name = wolfsounds[Math.floor(Math.random() * wolfsounds.length)];
				name.play();
		}
			swal({
				title: "Hoppácska!",
				text: "Ez nem jött össze, pedig ezeket mind vetted áltiban! Na majd a pót ZH-ban.",
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
				var name = wolfsounds[Math.floor(Math.random() * wolfsounds.length)];
				name.play();
		}
		swal({
				title: "Hoppácska",
				text: "Ez fincsi volt",
				icon: "success",
				button: "Átmentem?"
			}).then(function(){
				var img = document.createElement("img");
				document.body.style.backgroundImage = "url('img/ellentmondas.png')"
				document.body.style.backgroundRepeat = "no-repeat"
				document.body.style.backgroundSize = "80% 100%"
				document.body.style.backgroundPosition = "top"
				document.getElementById('container').style.background = "none"
				document.getElementById('start-btn').style.display = "none"
				document.getElementById('answer-buttons').innerHTML = "Ellentmondásra jutottunk"
				document.getElementById('question').innerHTML = "Hoppácska"
				if(soundchck.checked) {
					var name = wolfsounds[Math.floor(Math.random() * wolfsounds.length)];
					name.play();
			}
			}).catch(function(reason){
				alert("Ez nem volt fincsi: "+reason)
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
		question: "Mit nevezünk meghatározottsági axiómának?",
		answers: [
			{ text: 'Sanyit', correct: false},
			{ text: 'A és B halmazoknak ugyanazok az elemeik', correct: false},
			{ text: 'Azt, hogy két halmaz nem bizonytalan', correct: false},
			{ text: 'Az a és B halmaz akkor és csak akkor egyenlő, ha ugyanazok az elemeik', correct: true}
		]
	},
		{
		question: "Mit nevezünk részhalmaznak?",
		answers: [
			{ text: 'Minden A halmazra és minden F(x) formulára létezik egy B halmaz, amelyhez A-nak pontosan azok az x elemei tartoznak, amelyekre F(x) igaz.', correct: true},
			{ text: 'Azt, hogy egy halmaz nincs józan állapotban.', correct: false},
			{ text: 'A halmaznak egy részét.', correct: false},
			{ text: 'Minden A halmazra és minden F(x) formulára létezik egy B halmaz, amelyhez B-nek pontosan azok az x elemei tartoznak, amelyekre F(x) igaz.', correct: false},
			
		]
	},
	{
		question: "Mikor diszjunkt két halmaz?",
		answers: [
			{ text: 'Ha uniójuk üres', correct: false},
			{ text: 'Ha a kuka üres', correct: false},
			{ text: 'Ha metszetük üres', correct: true},
			{ text: 'Ha a farkas éhes', correct: false}
		]
	},
	{
		question: "Mit nevezünk tételnek?",
		answers: [
			{ text: 'Mindig hamis értéket adó formulák', correct: false},
			{ text: 'A torta receptjét', correct: false},
			{ text: 'Mindig igaz értéket adó formulák', correct: true},
			{ text: 'A bundáskenyeret', correct: false}
		]
	},
	{
		question: "Mi az az ekvivalenciareláció?",
		answers: [
			{ text: 'Valencia fővárosa', correct: false},
			{ text: 'Egy focicsapat', correct: false},
			{ text: 'Ha egy homogén binér reláció reflexív, tranzitív és szimmetrikus', correct: true},
			{ text: 'Ha egy homogén unér reláció reflexív, tranzitív és szimmetrikus', correct: false}
		]
	},
	{
		question: "Mikor mondjuk azt, hogy szigorú részbenrendezés egy reláció?",
		answers: [
			{ text: 'Ha nem látunk tisztán a részegség miatt', correct: false},
			{ text: 'Ha a reláció reflexes, transzfesztita és asszimetrikus', correct: false},
			{ text: 'Ha a reláció reflexív, tranzitív és antiszimmetrikus', correct: true},
			{ text: 'Ha a párkapcsolatom bonyolult', correct: false}
		]
	},
	{
		question: "Megbuktok az első ZH-n?",
		answers: [
			{ text: 'Igen', correct: true},
			{ text: 'Fincsi', correct: true},
			{ text: 'Hoppácska', correct: true},
			{ text: 'Nem, hiszen ezeket áltiban vettük', correct: false}
		]
	},


]