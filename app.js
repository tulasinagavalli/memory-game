document.addEventListener('DOMContentLoaded', () => {
	const cards = document.querySelectorAll('.memory-card')

	let hasFlippedCard = false
	let lockBoard = false
	let firstCard, secondCard
	const score = document.querySelector('#score')
	var cadrdsMatched = []

	function flipCard() {
		if (lockBoard) return
		if (this === firstCard) return

		this.classList.add('flip')

		if (!hasFlippedCard) {
			hasFlippedCard = true
			firstCard = this

			return
		}

		secondCard = this
		checkForMatch()
	}

	function checkForMatch() {
		let isMatch = firstCard.dataset.id === secondCard.dataset.id

		isMatch ? disableCards() : unflipCards()
	}

	function disableCards() {
		firstCard.removeEventListener('click', flipCard)
		secondCard.removeEventListener('click', flipCard)
		// removing matched cards
		console.log([firstCard, secondCard])
		//firstCard.setAttribute('src', "blank")
		//secondCard.setAttribute('src', "blank")
		// Score
		cadrdsMatched.push(firstCard)
		cadrdsMatched.push(secondCard)
		score.textContent = cadrdsMatched.length / 2

		resetBoard()
	}

	function unflipCards() {
		lockBoard = true

		setTimeout(() => {
			firstCard.classList.remove('flip')
			secondCard.classList.remove('flip')

			resetBoard()
		}, 500)
	}

	function resetBoard() {
		;[hasFlippedCard, lockBoard] = [false, false][(firstCard, secondCard)] = [
			null,
			null,
		]
	}

	;(function shuffle() {
		cards.forEach((card) => {
			let randomPos = Math.floor(Math.random() * 12)
			card.style.order = randomPos
		})
	})()

	cards.forEach((card) => card.addEventListener('click', flipCard))
})
