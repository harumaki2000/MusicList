<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Chart } from 'chart.js/auto';

const props = defineProps<{ songs: { title: string; artist: string }[] }>();
const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

watch(() => props.songs, (newSongs) => {
  if (!chartCanvas.value) return;
  if (chartInstance) chartInstance.destroy();

  const songCounts: Record<string, number> = {};
  newSongs.forEach(song => {
    songCounts[song.title] = (songCounts[song.title] || 0) + 1;
  });

  const labels = Object.keys(songCounts);
  const data = Object.values(songCounts);

  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: '再生回数',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}, { deep: true });
</script>