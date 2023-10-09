<template>
    <div class="layout">
        <ul v-for="(categoryItems, categoryName) in groupedData" :key="categoryName" class="categoryList">
            <li>
                <h2>{{ categoryName }}</h2>
                <ul>
                    <li v-for="(valueItems, value) in categoryItems" :key="value">
                        <button 
                            type="button"
                            @click="fetchQuestions(categoryName, value)"
                        >
                            {{ value }}
                        </button>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
  
<script>
    import { ref, onMounted, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';

    export default {
        components: {
        },
        setup() {
            const store = useStore();
            const router = useRouter();
            const jeopardyListings = ref(null);
            const selectedCategory = ref(null);


            onMounted(async () => {
                await store.dispatch('fetchData');
                jeopardyListings.value = store.getters.getData;
            });

            const groupedData = computed(() => {
                if (!jeopardyListings.value) {
                    return {}; // Return an empty object if jsonData is null
                }
                const grouped = {};

                jeopardyListings.value.forEach((item) => {
                    const category = item.category;
                    const value = item.value;
                    
                    if (!grouped[category]) {
                        grouped[category] = {};
                    }
                    
                    if (!grouped[category][value]) {
                        grouped[category][value] = [];
                    }

                    grouped[category][value].push(item);
                });

                return grouped;
            });

            // Function to fetch questions based on category and value
            const fetchQuestions = async (categoryname, value) => {
                selectedCategory.value = {
                    'categoryname': categoryname,
                    'value': value
                }
                await store.commit('setSelectedQuestion', selectedCategory);

                router.push({ name: 'QuestionAnswer' });            
            };


            return {
                jeopardyListings,
                groupedData,
                fetchQuestions
            };
        },
    }
</script>
  
<style lang="scss">
@import '../../assets/scss/main.scss';
.layout{
    display: inline-block;
    width: 100%;
    ul.categoryList {
        padding: 0 3px;
        width: 7.5%;
        display: inline-block;
        vertical-align: top;
        h2 {
            @include font-style(12px, 600, $white);
            display: flex;
            align-items: center;
            min-height: 50px;
            justify-content: center;
            background-color: $background-color;
            width: 100%;
        }
        li{
            button{
                @include button($background-color, $primary-color, $primary-color, $white);
                @include font-style(30px, 600, $white);
                margin: 5px 0;
                width: 100%;
            }
        }
    }
}
</style>

