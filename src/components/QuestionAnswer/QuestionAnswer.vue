<!-- YourComponent.vue -->
<template>
  <div class="questionBox">
    <div class="question">
      <h3>{{ question && question.question }}</h3>
    </div>
    <div class="answerBox">
      <input v-model="userAnswer" class="inputBox" type="text" placeholder="Your Answer"/>
      <input @click="checkUserAnswer" class="submitButton" type="submit" value="Submit">
    </div>
    <p v-if="answerChecked" :class="{ 'correct': isCorrectAnswer, 'incorrect': !isCorrectAnswer }">
        Your answer is {{ isCorrectAnswer ? 'correct' : 'incorrect' }}.
      </p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore(); // Get access to the Vuex store
    const questionData = ref(null);
    const jeopardyListings = ref(null);
    const question = ref(null);
    const userAnswer = ref('');
    const answerChecked = ref(false);
    const isCorrectAnswer = ref(false);

    onMounted(async () => {
      await store.dispatch('fetchData');
      jeopardyListings.value = store.getters.getData;
      questionData.value = await store.getters.getSelectedQuestion;
      console.log('jeopardyListings', jeopardyListings.value);
      const filteredQuestion = await jeopardyListings.value.find((item) => {
        return item.category === questionData.value.categoryname && item.value === questionData.value.value;
      });

      if (filteredQuestion) {
        question.value = filteredQuestion;
      } else {
        question.value = "Question not found";
      }
    });

    // Define a function to check the user's answer
    const checkUserAnswer = () => {
      const normalizedQuestionAnswer = question.value.answer.toLowerCase().trim();
      const normalizedUserAnswer = userAnswer.value.toLowerCase().trim();

      isCorrectAnswer.value = normalizedQuestionAnswer === normalizedUserAnswer;
      answerChecked.value = true;

      if (isCorrectAnswer.value){
        store.commit('updateScore', question.value.value);
      }

    };

    return {
      questionData,
      jeopardyListings,
      question,
      userAnswer,
      answerChecked,
      isCorrectAnswer,
      checkUserAnswer
    };
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/main.scss';
.questionBox{
    display: inline-block;
    width: 70%;
    text-align: center;
    .question{
      width: 100%;
      display: inline-block;
      margin: 40px 0;
      h3 {
        @include font-style(35px, 600);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
    }
    .answerBox{
      width: 700px;
      display: flex;
      margin: 0 auto;
      .inputBox {
        border: 2px solid $primary-color;
        padding: 10px;
        font-size: 16px;
        width: 100%;

        &:focus {
          outline: none;
          border-color: darken($primary-color, 10%);
          // You can add additional styles for focus state
        }
      }
      .submitButton {
        @include button($background-color, $primary-color, $primary-color, $white);
        @include font-style(30px, 600, $white);
        border-radius: 0px;
        padding: 12px 35px;
      }
    }

    .incorrect{
      @include font-style(30px, 600, $incorrect);
      margin: 20px 0;
      display: inline-block;
    }
    
    .correct {
      @include font-style(30px, 600, $correct);
      margin: 20px 0;
      display: inline-block;
    }
}
</style>