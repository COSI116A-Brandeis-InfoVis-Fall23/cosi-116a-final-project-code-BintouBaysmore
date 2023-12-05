

<canvas id="myChart" width="400" height="400"></canvas>
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Add your labels here (e.g., ['January', 'February', 'March'])
        datasets: [{
            label: 'Dataset', // Name of the dataset
            data: [], // Add your data values here
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
