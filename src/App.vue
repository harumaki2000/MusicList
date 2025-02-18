<template>
  <div id="app">
    <h1>MusicList</h1>
    <MusicList :songs="songs" @add-song="addSong" @remove-song="removeSong" />
    <h2>SongChart</h2>
    <SongChart :songs="songs" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MusicList from './components/MusicList.vue';
import SongChart from './components/SongChart.vue';

export default defineComponent({
  name: "App",
  components: {
    MusicList,
    SongChart,
  },
  data() {
    return {
      songs: [] as Array<{ title: string, artist: string, album: string }>,
    };
  },
  methods: {
    addSong(song: { title: string, artist: string, album: string }) {
      this.songs.push(song);
      this.saveToLocalStorage();
    },
    removeSong(index: number) {
      this.songs.splice(index, 1);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('songs', JSON.stringify(this.songs));
    },
    loadFromLocalStorage() {
      const savedSongs = localStorage.getItem('songs');
      if (savedSongs) {
        this.songs = JSON.parse(savedSongs);
      }
    },
  },
  created() {
    this.loadFromLocalStorage();
  }
});
</script>

<style>
#app {
  text-align: center;
  margin-top: 50px;
}
</style>