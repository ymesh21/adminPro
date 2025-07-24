// Chart initialization function
function initCharts() {
    // Sales Chart (Line Chart)
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Sales',
                data: [12000, 19000, 15000, 18000, 21000, 19000, 23000],
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                borderColor: 'rgba(67, 97, 238, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#fff',
                pointBorderColor: 'rgba(67, 97, 238, 1)',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#2a3042',
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 12 },
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Revenue Chart (Doughnut)
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'doughnut',
        data: {
            labels: ['Online Sales', 'Retail Stores', 'Wholesale', 'Other'],
            datasets: [{
                data: [45, 25, 20, 10],
                backgroundColor: [
                    'rgba(67, 97, 238, 0.8)',
                    'rgba(46, 125, 50, 0.8)',
                    'rgba(123, 44, 191, 0.8)',
                    'rgba(247, 127, 0, 0.8)'
                ],
                borderColor: [
                    'rgba(67, 97, 238, 1)',
                    'rgba(46, 125, 50, 1)',
                    'rgba(123, 44, 191, 1)',
                    'rgba(247, 127, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: '#2a3042',
                    bodyFont: { size: 12 },
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${percentage}% ($${(value * 1000).toLocaleString()})`;
                        }
                    }
                }
            }
        }
    });

    // Users Chart (Bar Chart)
    const usersCtx = document.getElementById('usersChart').getContext('2d');
    const usersChart = new Chart(usersCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'New Users',
                    data: [350, 420, 380, 510, 490, 560],
                    backgroundColor: 'rgba(67, 97, 238, 0.8)',
                    borderColor: 'rgba(67, 97, 238, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Returning Users',
                    data: [280, 310, 350, 400, 390, 420],
                    backgroundColor: 'rgba(123, 44, 191, 0.8)',
                    borderColor: 'rgba(123, 44, 191, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: '#2a3042',
                    titleFont: { size: 12 },
                    bodyFont: { size: 12 },
                    padding: 12
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        stepSize: 100
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Projects Chart (Polar Area)
    const projectsCtx = document.getElementById('projectsChart').getContext('2d');
    const projectsChart = new Chart(projectsCtx, {
        type: 'polarArea',
        data: {
            labels: ['Planning', 'Design', 'Development', 'Testing', 'Deployment'],
            datasets: [{
                data: [15, 20, 35, 25, 5],
                backgroundColor: [
                    'rgba(67, 97, 238, 0.8)',
                    'rgba(46, 125, 50, 0.8)',
                    'rgba(123, 44, 191, 0.8)',
                    'rgba(247, 127, 0, 0.8)',
                    'rgba(233, 30, 99, 0.8)'
                ],
                borderColor: [
                    'rgba(67, 97, 238, 1)',
                    'rgba(46, 125, 50, 1)',
                    'rgba(123, 44, 191, 1)',
                    'rgba(247, 127, 0, 1)',
                    'rgba(233, 30, 99, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: '#2a3042',
                    bodyFont: { size: 12 },
                    padding: 12
                }
            },
            scales: {
                r: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });

    // Time range selector for sales chart
    document.querySelectorAll('.sales-range .dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const range = this.getAttribute('data-range');
            updateSalesChart(range);
        });
    });

    // Function to update sales chart data
    function updateSalesChart(range) {
        // This would typically be an API call in a real application
        let labels, data;
        
        switch(range) {
            case '7':
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                data = [4200, 5800, 5100, 6200, 7900, 6500, 7200];
                break;
            case '90':
                labels = ['Q1', 'Q2', 'Q3', 'Q4'];
                data = [52000, 68000, 72000, 89000];
                break;
            default: // 30
                labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                data = [28000, 32000, 35000, 41000];
        }
        
        salesChart.data.labels = labels;
        salesChart.data.datasets[0].data = data;
        salesChart.update();
    }
}

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
});