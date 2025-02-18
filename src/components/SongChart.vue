<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    songs: {
      deep: true,
      handler() {
        this.updateChart();
      }
    }
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = this.$refs.chartCanvas.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: [],
          datasets: [
            {
              label: "曲数",
              data: [],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
            }
          ]
        }
      });
      this.updateChart();
    },
    updateChart() {
      if (!this.songs || this.songs.length === 0) return;

      const artistCounts = {};
      this.songs.forEach(song => {
        artistCounts[song.artist] = (artistCounts[song.artist] || 0) + 1;
      });

      this.chart.data.labels = Object.keys(artistCounts);
      this.chart.data.datasets[0].data = Object.values(artistCounts);
      this.chart.update();
    }
  }
};
</script>