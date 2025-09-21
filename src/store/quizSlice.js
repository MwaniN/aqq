import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  "5": {
    currentQuote: null,
    currentChoices: [],
    correctAnime: null,
    currentScore: 0,
    totalQuotes: 5,
    quizInProgress: false,
    quizStartTime: null,
    currentQuoteNum: 1,
    submissionMade: false,
    gameOver: false,
    finalChoice: null
  },
  "10": {
    currentQuote: null,
    currentChoices: [],
    correctAnime: null,
    currentScore: 0,
    totalQuotes: 10,
    quizInProgress: false,
    quizStartTime: null,
    currentQuoteNum: 1,
    submissionMade: false,
    gameOver: false,
    finalChoice: null
  },
  "15": {
    currentQuote: null,
    currentChoices: [],
    correctAnime: null,
    currentScore: 0,
    totalQuotes: 15,
    quizInProgress: false,
    quizStartTime: null,
    currentQuoteNum: 1,
    submissionMade: false,
    gameOver: false,
    finalChoice: null
  }
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    startQuiz: (state, action) => {
      const { quizLength, totalQuotes } = action.payload
      const quizState = state[quizLength]
      
      quizState.totalQuotes = totalQuotes
      quizState.quizInProgress = true
      quizState.quizStartTime = Date.now()
      quizState.currentQuoteNum = 1
      quizState.currentScore = 0
      quizState.gameOver = false
      quizState.submissionMade = false
      quizState.finalChoice = null
      quizState.currentQuote = null
      quizState.currentChoices = []
      quizState.correctAnime = null
      
      // Save to localStorage
      localStorage.setItem(`aqqQuizState_${quizLength}`, JSON.stringify(quizState))
    },
    
    setCurrentQuote: (state, action) => {
      const { quizLength, quote, choices, correctAnime } = action.payload
      const quizState = state[quizLength]
      
      quizState.currentQuote = quote
      quizState.currentChoices = choices
      quizState.correctAnime = correctAnime
      quizState.submissionMade = false
      quizState.finalChoice = null
      
      // Save to localStorage
      localStorage.setItem(`aqqQuizState_${quizLength}`, JSON.stringify(quizState))
    },
    
    submitAnswer: (state, action) => {
      const { quizLength, choice } = action.payload
      const quizState = state[quizLength]
      
      quizState.finalChoice = choice
      
      // Update score if correct
      if (choice === quizState.correctAnime) {
        quizState.currentScore += 1
      }
      
      quizState.submissionMade = true
      
      // Save to localStorage
      localStorage.setItem(`aqqQuizState_${quizLength}`, JSON.stringify(quizState))
    },
    
    advanceQuote: (state, action) => {
      const { quizLength } = action.payload
      const quizState = state[quizLength]
      
      if (quizState.currentQuoteNum === quizState.totalQuotes) {
        // Game over - set final state
        quizState.gameOver = true
        quizState.quizInProgress = false
        // Don't clear current quote data - we want to show the final result
      } else {
        // Advance to next question
        quizState.currentQuoteNum += 1
        quizState.currentQuote = null
        quizState.currentChoices = []
        quizState.correctAnime = null
        quizState.submissionMade = false
        quizState.finalChoice = null
      }
      
      // Save to localStorage
      localStorage.setItem(`aqqQuizState_${quizLength}`, JSON.stringify(quizState))
    },
    
    resetQuiz: (state, action) => {
      const { quizLength } = action.payload
      const quizState = state[quizLength]
      
      // Reset specific quiz to initial state
      Object.assign(quizState, initialState[quizLength])
      
      // Clear localStorage for specific quiz
      localStorage.removeItem(`aqqQuizState_${quizLength}`)
    },
    
    loadQuizFromStorage: (state, action) => {
      const { quizLength, savedState } = action.payload
      
      // Check if saved state is not expired (24 hours)
      const now = Date.now()
      const savedTime = savedState.quizStartTime
      const hoursDiff = (now - savedTime) / (1000 * 60 * 60)
      
      if (hoursDiff < 24 && savedState.quizInProgress) {
        // Restore state for specific quiz
        Object.assign(state[quizLength], savedState)
      } else {
        // State expired or invalid, reset specific quiz
        Object.assign(state[quizLength], initialState[quizLength])
        localStorage.removeItem(`aqqQuizState_${quizLength}`)
      }
    },
    
    setGameOver: (state, action) => {
      const { quizLength } = action.payload
      const quizState = state[quizLength]
      
      quizState.gameOver = true
      quizState.quizInProgress = false
      
      // Clear localStorage on game over
      localStorage.removeItem(`aqqQuizState_${quizLength}`)
    }
  }
})

export const {
  startQuiz,
  setCurrentQuote,
  submitAnswer,
  advanceQuote,
  resetQuiz,
  loadQuizFromStorage,
  setGameOver
} = quizSlice.actions

export default quizSlice.reducer
