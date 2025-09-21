let co2Chart = null;
window.onload = function () {
  const btn = document.getElementById('showButton');
  if (btn) btn.addEventListener('click', showChart);
};

function showChart() {
  const txt = document.getElementById('dataBox');
  if (!txt) return;
  const raw = txt.value.trim();
  if (!raw) {
    alert('Please paste some sensor data first.');
    return;
  }

  const parsed = parseSensorData(raw);
  if (parsed.timestamps.length === 0 || parsed.co2Values.length === 0) {
    alert('No valid data found. Check the line format.');
    return;
  }

  const labels = parsed.timestamps.map(ts => {
    const d = new Date(ts.replace(' ', 'T'));
    return isNaN(d) ? ts.split(' ')[1].slice(0,5) : d.toTimeString().slice(0,5);
  });

  const canvas = document.getElementById('myChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  if (co2Chart) co2Chart.destroy();

  co2Chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'CO₂ Level (ppm)',
        data: parsed.co2Values,
        borderColor: '#1FB8CD',
        backgroundColor: 'rgba(31,184,205,0.2)',
        fill: true,
        tension: 0.25,
        pointRadius: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: 'Time (HH:MM)' } },
        y: { beginAtZero: true, title: { display: true, text: 'CO₂ (ppm)' } }
      }
    }
  });

  // --summary
  const co2 = parsed.co2Values;
  const max = Math.max(...co2);
  const min = Math.min(...co2);
  const avg = Math.round(co2.reduce((a,b)=>a+b,0)/co2.length);

  const out = document.getElementById('results');
  if (out) {
    out.innerHTML = `
      <p>Max CO₂: ${max} ppm</p>
      <p>Min CO₂: ${min} ppm</p>
      <p>Average CO₂: ${avg} ppm</p>
      <p>Total readings: ${co2.length}</p>
    `;
  }
}

function parseSensorData(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim() !== '');
  const timestamps = [];
  const co2Values = [];

  lines.forEach(line => {
    const parts = line.split('|').map(p => p.trim());
    if (parts.length < 2) return;

    const timeMatch = parts[0].match(/Time:\s*(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})/i);
    const co2Match = parts[1].match(/CO₂ Level:\s*(\d+)/i);

    if (timeMatch && co2Match) {
      timestamps.push(timeMatch[1]);
      co2Values.push(parseInt(co2Match[1], 10));
    }
  });

  return { timestamps, co2Values };
}
