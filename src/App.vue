<template>
  <div id="app">
    <h1>MusicList</h1>
    
    <div class="tabs">
      <button @click="activeTab = 'list'" :class="{ active: activeTab === 'list' }">リスト</button>
      <button @click="activeTab = 'chart'" :class="{ active: activeTab === 'chart' }">グラフ</button>
    </div>

    <div class="tab-content">
      <MusicList v-if="activeTab === 'list'" />
      <SongChart v-if="activeTab === 'chart'" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import MusicList from './components/MusicList.vue';
import SongChart from './components/SongChart.vue';

export default {
  name: "App",
  components: {
    MusicList,
    SongChart,
  },
  setup() {
    const activeTab = ref('list');
    return { activeTab };
  },
};
</script>

<style>
.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  background-color: #ddd;
  cursor: pointer;
  font-size: 16px;
}

.tabs button.active {
  background-color: #007bff;
  color: white;
}

.tab-content {
  text-align: center;
}
</style>
