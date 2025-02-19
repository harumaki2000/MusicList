<template>
  <div>
    <input 
      v-model="inputText" 
      placeholder="曲名 - アーティスト名 - アルバム名" 
      @keyup.enter="addSong"
    />
    <button @click="addSong">追加</button>

    <ul>
      <li v-for="(song, index) in songs" :key="index">
        <strong>{{ song.title }}</strong> - 
        {{ song.artist }} - 
        <em>{{ song.album }}</em>
        <button @click="removeSong(index)">削除</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'MusicList',
  props: {
    songs: {
      type: Array as PropType<Array<{ title: string, artist: string, album: string }>>,
      required: true,
    },
  },
  data() {
    return {
      inputText: '',
    };
  },
  methods: {
    addSong() {
      const parts = this.inputText.split(' - ');
      if (parts.length === 3) {
        const newSong = {
          title: parts[0].trim(),
          artist: parts[1].trim(),
          album: parts[2].trim(),
        };
        this.$emit('add-song', newSong);
        this.inputText = ''; 
      }
    },
    removeSong(index: number) {
      this.$emit('remove-song', index);
    },
  },
});
</script>

<style scoped>
input {
  width: 300px;
  padding: 5px;
  font-size: 16px;
}
</style>
