// store/index.js
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import jeopardyData from "../assets/data/questions.json";

const store = createStore({
  state: {
    score: 0,
    data: {},
    selectedQuestion: {},
    answer: [],
  },
  mutations: {
    // Mutation to update the score
    updateScore(state, newScore) {
      const stringWithDollarSign = newScore;
      const stringWithoutDollarSign = stringWithDollarSign.replace(/\$/g, "");
      const numberValue = parseFloat(stringWithoutDollarSign);

      state.score += numberValue;
    },
    setData(state, newData) {
      state.data = newData;
    },
    setSelectedQuestion(state, newData) {
      state.selectedQuestion = newData;
    },
    updateAnswer(state, newData) {
      state.answer = [...state.answer, newData];
    },
  },
  actions: {
    // Action to update the score
    setScore({ commit }, newScore) {
      commit("updateScore", newScore);
    },
    async fetchData({ commit }) {
      await commit("setData", jeopardyData);
    },
    fetchSelectedQuestion({ commit }, newScore) {
      commit("setSelectedQuestion", newScore);
    },
    setAnswerValue({ commit }, newAnswer) {
      commit("updateAnswer", newAnswer);
    },
  },
  getters: {
    // Getter to access the score
    getScore(state) {
      return state.score;
    },
    getData(state) {
      return state.data;
    },
    getSelectedQuestion(state) {
      return state.selectedQuestion;
    },
    getAnswer(state) {
      console.log("state.answer ", state.answer);
      return state.answer;
    },
  },
  plugins: [createPersistedState()],
});

export default store;
