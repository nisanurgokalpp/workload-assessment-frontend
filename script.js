document.addEventListener('DOMContentLoaded', () => {
    /* --- TAB NAVIGATION --- */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            // Update active button state
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update active content visibility
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
        });
    });

    /* --- CHART.JS CONFIGURATION --- */
    const ctx = document.getElementById('trendChart').getContext('2d');
    
    // Mock data for initial UI render
    const mockData = {
        labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30'],
        hr: [75, 78, 81, 79, 85, 87, 82],
        temp: [24.2, 24.3, 24.5, 24.4, 24.5, 24.6, 24.5],
        hum: [46, 47, 48, 48, 49, 50, 48]
    };

    // Initialize trend chart
    let trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: mockData.labels,
            datasets: [{
                label: 'Measurement',
                data: mockData.hr,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: '#3b82f6',
                pointRadius: 4,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    grid: { color: '#222' },
                    ticks: { color: '#888' },
                    beginAtZero: false
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#888' }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    /* --- CHART METRIC FILTERS --- */
    const chartBtns = document.querySelectorAll('.chart-btn');
    chartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state for chart filter buttons
            chartBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update chart data
            const metric = btn.getAttribute('data-metric');
            trendChart.data.datasets[0].data = mockData[metric];
            trendChart.update();
        });
    });
});