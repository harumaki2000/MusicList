<template>
  <div>
    <h2>ログインして音楽リストを記録</h2>
    <button v-if="!user" @click="handleLogin">Google でログイン</button>
    <button v-if="user" @click="handleLogout">ログアウト</button>
    <p v-if="user">ログイン中: {{ user.displayName }}</p>

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
import { auth, login, logout, addSongToFirestore, getSongsFromFirestore } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

export default {
  setup() {
    const user = ref<User | null>(null);
    const songs = ref<{ song: string; date: string }[]>([]);
    const newSong = ref('');

    onAuthStateChanged(auth, async (currentUser) => {
      user.value = currentUser;
      if (user.value) {
        const userSongs = await getSongsFromFirestore(user.value.uid);
        songs.value = userSongs as { song: string; date: string }[];
      }
    });

    const addSong = async () => {
      if (!user.value) {
        alert("ログインしてください");
        return;
      }
      if (newSong.value.trim() !== '') {
        const songData = { song: newSong.value.trim(), date: new Date().toISOString().split('T')[0] };
        songs.value.push(songData);
        await addSongToFirestore(user.value.uid, newSong.value.trim());
        newSong.value = '';
      }
    };

    const groupedSongs = computed(() => {
      const result: Record<string, Record<string, number>> = {};
      songs.value.forEach(({ song, date }) => {
        if (!result[date]) {
          result[date] = {};
        }
        result[date][song] = (result[date][song] || 0) + 1;
      });
      return result;
    });

    return {
      user,
      newSong,
      songs,
      groupedSongs,
      addSong,
      handleLogin: login,
      handleLogout: logout,
    };
  },
};
</script>

<style>
button {
  padding: 5px;
  margin-right: 5px;
}
h3 {
  margin-top: 20px;
}
</style>
