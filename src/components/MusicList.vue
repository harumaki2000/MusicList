<template>
  <div>
    <h2>曲のリスト</h2>
    <input v-model="newSong" @keyup.enter="addSong" placeholder="曲名 - アーティスト - アルバム" />
    <button @click="addSong">追加</button>
    
    <div v-for="(songs, date) in groupedSongs" :key="date">
      <h3>{{ date }}</h3>
      <ul>
        <li v-for="(count, song) in songs" :key="song">
          {{ song }} - 再生回数: {{ count }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';

export default {
  setup() {
    const songs = ref<{ title: string; artist: string; album: string; date: string }[]>([]);
    const newSong = ref('');

    const getCurrentDate = () => {
      const today = new Date();
      return today.toISOString().split('T')[0];
    };

    const addSong = () => {
      const parts = newSong.value.split(' - ').map(s => s.trim());

      if (parts.length === 3) {
        const [title, artist, album] = parts;
        songs.value.push({ title, artist, album, date: getCurrentDate() });
        newSong.value = '';
      } else {
        alert('フォーマットは「曲名 - アーティスト - アルバム」にしてください');
      }
    };

    const groupedSongs = computed(() => {
      const result: Record<string, Record<string, number>> = {};

      songs.value.forEach(({ title, date }) => {
        if (!result[date]) {
          result[date] = {};
        }
        result[date][title] = (result[date][title] || 0) + 1;
      });

      return result;
    });

    return {
      newSong,
      songs,
      addSong,
      groupedSongs
    };
  }
};
</script>

<style>
input {
  padding: 5px;
  margin-right: 5px;
}
button {
  padding: 5px;
}
h3 {
  margin-top: 20px;
}
</style>
