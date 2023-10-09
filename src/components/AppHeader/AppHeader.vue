<template>
    <div class="header">
        <h1>
            <router-link to="/"> 
                <img src="../../assets/images/logo.png" alt="Jeopardy">
            </router-link> 
        </h1>
        <h2>
            Score:
            <span>${{ score }}</span>
        </h2>
    </div>
</template>
  
<script>
    import { computed } from 'vue';
    import { useStore } from 'vuex';
    export default {
        setup() {
            const store = useStore();
            const score = computed(() => store.getters.getScore);

            const incrementScore = () => {
            const newScore = store.state.score + 1;
            store.dispatch('setScore', newScore);
            };

            return {
                score,
                incrementScore,
            };
        },
    }
</script>
  
<style scoped>
    .header{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 0;
    }
    .header img {
        width: 150px;
        float: left;
    }
    .header h2 {
        font-size: 24px;
        font-weight: 600;
        color: #daa24d;
    }
</style>

