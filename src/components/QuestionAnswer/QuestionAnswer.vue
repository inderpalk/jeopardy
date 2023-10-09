<!-- YourComponent.vue -->
<template>
  <div class="questionBox">
    <div class="question">
      <h3>{{ question && question.question }}</h3>
    </div>
    <ul class="optionList" :class="{ 'disabled': answerChecked }">
      <li v-for="(option, index) in shuffledOptions" :key="index" @click="checkAnswer(option)">
        {{ option }}
      </li>
    </ul>
    <p v-if="answerChecked" :class="{ 'correct': isCorrectAnswer, 'incorrect': !isCorrectAnswer }">
      Your answer is {{ isCorrectAnswer ? 'correct' : 'incorrect' }}.
    </p>
    <button v-if="answerChecked" class="playMore" @click="redirectToHomepage">
      Want to play more? 
    </button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// Define the shuffleArray function
function shuffleArray(array) {
  const newArray = [...array];
  console.log(newArray)
  for (let i = newArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]];
  }
  return newArray;
}

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const questionData = ref(null);
    const jeopardyListings = ref(null);
    const question = ref(null);
    const userAnswer = ref('');
    const answerChecked = ref(false);
    const isCorrectAnswer = ref(false);
    const fakeAnswers = ref([
      'Febtober!',
      "I'm Batman",
      "I don't know where it went, I'm confused.",
      'Threeve. A combination of 3 and 5 and you wagered Texas.'
    ]);
    const shuffledOptions = ref([]);

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
        shuffleOptions();
      } else {
        question.value = "Question not found";
      }
    });

    const shuffleOptions = () => {
      // Combine the correct answer and fake answers
      const allOptions = [question.value.answer, ...fakeAnswers.value];

      // Shuffle the options using shuffleArray
      shuffledOptions.value = shuffleArray(allOptions);
    };

    const checkAnswer = (option) => {
      const normalizedQuestionAnswer = question.value.answer.toLowerCase().trim();
      const normalizedUserAnswer = option.toLowerCase().trim();

      isCorrectAnswer.value = normalizedQuestionAnswer === normalizedUserAnswer;
      answerChecked.value = true;

      if (isCorrectAnswer.value){
        store.commit('updateScore', question.value.value);
      }
      question.value.checkAnswer = isCorrectAnswer.value;
      store.commit('updateAnswer', question.value);
    };

    const redirectToHomepage = () => {
      router.push('/');
    };

    return {
      questionData,
      jeopardyListings,
      question,
      userAnswer,
      answerChecked,
      isCorrectAnswer,
      shuffledOptions,
      shuffleOptions,
      redirectToHomepage,
      checkAnswer
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
    .optionList{
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      width: 100%;
      &.disabled{
          display: none;
      }
      li {
        @include button($background-color, $primary-color, $primary-color, $white);
        @include font-style(30px, 600, $white);
        padding: 10px;
        margin: 0 10px 20px 0;
        min-height: 80px;
        flex: 0 0 46%; /* Adjust the width as needed */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }

    .incorrect{
      @include font-style(30px, 600, $incorrect);
      margin: 20px 0;
      width: 100%;
      display: inline-block;
    }
    
    .correct {
      @include font-style(30px, 600, $correct);
      margin: 20px 0;
      width: 100%;
      display: inline-block;
    }
    
    .playMore{
      @include button($background-color, $primary-color, $primary-color, $white);
      @include font-style(33px, 600, $white);
      margin: 20px 0;
      padding: 10px 20px;
      display: inline-block;
    }
}
</style>