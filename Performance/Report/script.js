document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const tableBody = document.getElementById('table-body');
    const cardsContainer = document.getElementById('cards-container');
    const graphView = document.getElementById('graph-view');
    const tableView = document.getElementById('table-view');
    const homeView = document.getElementById('home-view');
    const documentView = document.getElementById('document-view');
    const cardView = document.getElementById('card-view');
    const viewButton = document.getElementById('view-button');
    const viewMenu = document.getElementById('view-menu');
    const networkButton = document.getElementById('network-button');
    const networkMenu = document.getElementById('network-menu');
    const statusButton = document.getElementById('status-button');
    const statusMenu = document.getElementById('status-menu');
    const assertionButton = document.getElementById('assertion-button');
    const assertionMenu = document.getElementById('assertion-menu');
    const themeToggle = document.getElementById('theme-toggle');
    const refreshButton = document.getElementById('refresh-button');
    const homeButton = document.getElementById('home-button');
    const documentButton = document.getElementById('document-button');
    const searchInput = document.getElementById('search-input');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const responseTimeChartCanvas = document.getElementById('responseTimeChart');
    const statusChartCanvas = document.getElementById('statusChart');
    const summaryTableBody = document.getElementById('summary-table-body');
    const totalApisElement = document.getElementById('total-apis');
    const passedTestsElement = document.getElementById('passed-tests');
    const failedTestsElement = document.getElementById('failed-tests');
    const avgResponseElement = document.getElementById('avg-response');
    const apiDocsContainer = document.getElementById('api-docs');

    // State management
    let testData = [];
    let filteredData = [];
    let currentView = 'table';
    let currentPage = 1;
    const rowsPerPage = 14;
    let responseTimeChart = null;
    let statusChart = null;

    // Filter state
    let filters = {
        network: null,
        status: null,
        assertion: null,
        search: ''
    };

    // Initialize the page
    async function init() {
        await fetchData();
        setupEventListeners();
        renderHomeView();
        updateView();
    }

    // Fetch data from JSON file
    async function fetchData() {
        try {
            const response = await fetch('./data/API.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            testData = await response.json();
            filteredData = [...testData];
            updateSummaryStats();
        } catch (error) {
            console.error('Error fetching data:', error);
            testData = [];
            filteredData = [];
            showError('Failed to load data. Please try refreshing the page.');
        }
    }

    // Set up all event listeners
    function setupEventListeners() {
        // View dropdown
        if (viewButton && viewMenu && networkMenu && statusMenu && assertionMenu) {
            viewButton.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMenu(viewMenu, [networkMenu, statusMenu, assertionMenu]);
            });
        }

        // Network dropdown
        if (networkButton && networkMenu && viewMenu && statusMenu && assertionMenu) {
            networkButton.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMenu(networkMenu, [viewMenu, statusMenu, assertionMenu]);
            });
        }

        // Status dropdown
        if (statusButton && statusMenu && viewMenu && networkMenu && assertionMenu) {
            statusButton.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMenu(statusMenu, [viewMenu, networkMenu, assertionMenu]);
            });
        }

        // Assertion dropdown
        if (assertionButton && assertionMenu && viewMenu && networkMenu && statusMenu) {
            assertionButton.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMenu(assertionMenu, [viewMenu, networkMenu, statusMenu]);
            });
        }

        // Close menus when clicking outside
        if (viewMenu && networkMenu && statusMenu && assertionMenu) {
            document.addEventListener('click', () => {
                [viewMenu, networkMenu, statusMenu, assertionMenu].forEach(menu => {
                    menu.classList.remove('show');
                });
            });
        }

        // View menu items
        if (viewMenu && viewButton) {
            document.querySelectorAll('#view-menu .dropdown-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    const viewType = e.target.textContent.toLowerCase().replace(' ', '-');
                    currentView = viewType;
                    updateView();
                    viewButton.innerHTML = `View <span class="material-icons dropdown-icon">arrow_drop_down</span>`;
                });
            });
        }

        // Network menu items
        if (networkMenu && networkButton) {
            document.querySelectorAll('#network-menu .dropdown-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    const networkType = e.target.textContent;
                    filters.network = networkType === '35 Mbps' ? 'Under 35mbps' : '1mbps';
                    applyFilters();
                    networkButton.innerHTML = `Network: ${networkType} <span class="material-icons dropdown-icon">arrow_drop_down</span>`;
                });
            });
        }

        // Status menu items
        if (statusMenu && statusButton) {
            document.querySelectorAll('#status-menu .dropdown-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    filters.status = e.target.textContent.toLowerCase();
                    applyFilters();
                    statusButton.innerHTML = `Status: ${e.target.textContent} <span class="material-icons dropdown-icon">arrow_drop_down</span>`;
                });
            });
        }

        // Assertion menu items
        if (assertionMenu && assertionButton) {
            document.querySelectorAll('#assertion-menu .dropdown-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    filters.assertion = e.target.textContent.toLowerCase();
                    applyFilters();
                    assertionButton.innerHTML = `Assertion: ${e.target.textContent} <span class="material-icons dropdown-icon">arrow_drop_down</span>`;
                });
            });
        }

        // Theme toggle
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        // Refresh button
        if (refreshButton) {
            refreshButton.addEventListener('click', refreshData);
        }

        // Home button
        if (homeButton) {
            homeButton.addEventListener('click', renderHomeView);
        }

        // Document button
        if (documentButton) {
            documentButton.addEventListener('click', renderDocumentView);
        }

        // Search input
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                filters.search = e.target.value.toLowerCase();
                applyFilters();
            });
        }

        // Pagination controls
        if (prevPageButton) {
            prevPageButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    updatePagination();
                }
            });
        }

        if (nextPageButton) {
            nextPageButton.addEventListener('click', () => {
                const maxPage = Math.ceil(filteredData.reduce((acc, site) => acc + site.tests.length, 0) / rowsPerPage);
                if (currentPage < maxPage) {
                    currentPage++;
                    updatePagination();
                }
            });
        }
    }

    // Toggle dropdown menus
    function toggleMenu(menu, otherMenus) {
        otherMenus.forEach(m => {
            if (m !== menu) {
                m.classList.remove('show');
            }
        });
        menu.classList.toggle('show');
    }

    // Update view based on selected view type
    function updateView() {
        // Hide all views first
        [homeView, documentView, graphView, tableView, cardView].forEach(view => {
            view.classList.add('hidden');
        });

        // Show the selected view
        if (currentView === 'home') {
            homeView.classList.remove('hidden');
            renderHomeView();
        } else if (currentView === 'document') {
            documentView.classList.remove('hidden');
            renderDocumentView();
        } else if (currentView === 'graph-view') {
            graphView.classList.remove('hidden');
            renderGraphView();
        } else if (currentView === 'card-view') {
            cardView.classList.remove('hidden');
            renderCardView();
        } else {
            tableView.classList.remove('hidden');
            renderTableView();
        }
    }

    // Apply all active filters
    function applyFilters() {
        let newFilteredData = [...testData];

        // Filter by network
        if (filters.network) {
            newFilteredData = newFilteredData.map(site => ({
                ...site,
                tests: site.tests.filter(test => test.network === filters.network)
            })).filter(site => site.tests.length > 0);
        }

        // Filter by status
        if (filters.status) {
            newFilteredData = newFilteredData.map(site => ({
                ...site,
                tests: site.tests.filter(test => test.metrics.status.result.toLowerCase() === filters.status)
            })).filter(site => site.tests.length > 0);
        }

        // Filter by assertion (response time result)
        if (filters.assertion) {
            newFilteredData = newFilteredData.map(site => ({
                ...site,
                tests: site.tests.filter(test => test.metrics.responseTime.result.toLowerCase() === filters.assertion)
            })).filter(site => site.tests.length > 0);
        }

        // Filter by search
        if (filters.search) {
            newFilteredData = newFilteredData.map(site => ({
                ...site,
                tests: site.tests.filter(test => 
                    site.name.toLowerCase().includes(filters.search) || 
                    test.network.toLowerCase().includes(filters.search)
                )
            })).filter(site => site.tests.length > 0);
        }

        filteredData = newFilteredData;
        currentPage = 1; // Reset to first page when filters change
        updatePagination();
        updateView();
    }

    // Render the table view
    function renderTableView() {
        tableBody.innerHTML = '';

        if (filteredData.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="11" class="no-data">No data matching your filters</td>`;
            tableBody.appendChild(row);
            return;
        }

        // Calculate pagination
        const allTests = filteredData.flatMap(site => site.tests);
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, allTests.length);
        const paginatedTests = allTests.slice(startIndex, endIndex);

        paginatedTests.forEach((test, index) => {
            const site = filteredData.find(s => s.tests.includes(test));
            const row = document.createElement('tr');
            const rowNumber = startIndex + index + 1;
            
            row.innerHTML = `
                <td>${rowNumber}</td>
                <td>${capitalizeFirstLetter(site.name)}</td>
                <td>${test.network}</td>
                <td>${test.metrics.duration.avg} ms</td>
                <td>${test.metrics.duration.min} ms</td>
                <td>${test.metrics.duration.med} ms</td>
                <td>${test.metrics.duration.max} ms</td>
                <td>${test.metrics.status.passRate}%</td>
                <td class="${test.metrics.status.result}">${test.metrics.status.result.toUpperCase()}</td>
                <td>${test.metrics.responseTime.passRate}%</td>
                <td class="${test.metrics.responseTime.result}">${test.metrics.responseTime.result.toUpperCase()}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Render the card view
    function renderCardView() {
        cardsContainer.innerHTML = '';

        if (filteredData.length === 0) {
            cardsContainer.innerHTML = '<p class="no-data">No data matching your filters</p>';
            return;
        }

        filteredData.forEach(site => {
            site.tests.forEach(test => {
                const card = document.createElement('div');
                card.className = 'api-card';
                
                card.innerHTML = `
                    <h3>${capitalizeFirstLetter(site.name)}</h3>
                    <div class="card-row">
                        <span class="card-label">Network Type:</span>
                        <span class="card-value">${test.network}</span>
                    </div>
                    <div class="card-row">
                        <span class="card-label">API Link:</span>
                        <span class="card-value">${test.apiLink || 'N/A'}</span>
                    </div>
                    <div class="card-row">
                        <span class="card-label">Average Response:</span>
                        <span class="card-value">${test.metrics.duration.avg} ms</span>
                    </div>
                    <div class="card-row">
                        <span class="card-label">Min Response:</span>
                        <span class="card-value">${test.metrics.duration.min} ms</span>
                    </div>
                    <div class="card-row">
                        <span class="card-label">Max Response:</span>
                        <span class="card-value">${test.metrics.duration.max} ms</span>
                    </div>
                    <div class="card-row">
                        <span class="card-label">Status Pass Rate:</span>
                        <span class="card-value">${test.metrics.status.passRate}%</span>
                    </div>
                    <div class="card-row">
                        <span class="card-label">Status Result:</span>
                        <span class="card-value ${test.metrics.status.result}">${test.metrics.status.result.toUpperCase()}</span>
                    </div>
                    <div class="card-row">
                        <span class="card-label">Response Pass Rate:</span>
                        <span class="card-value">${test.metrics.responseTime.passRate}%</span>
                    </div>
                    <div class="card-row">
                        <span class="card-label">Response Result:</span>
                        <span class="card-value ${test.metrics.responseTime.result}">${test.metrics.responseTime.result.toUpperCase()}</span>
                    </div>
                `;
                
                cardsContainer.appendChild(card);
            });
        });
    }

    // Render the graph view
    function renderGraphView() {
        if (filteredData.length === 0) {
            graphView.innerHTML = '<p class="no-data">No data matching your filters</p>';
            return;
        }

        // Prepare data for charts
        const labels = filteredData.map(site => capitalizeFirstLetter(site.name));
        
        // Response time data
        const avgResponseTimes = filteredData.map(site => {
            const avg = site.tests.reduce((sum, test) => sum + test.metrics.duration.avg, 0) / site.tests.length;
            return avg.toFixed(2);
        });

        // Status pass/fail data
        const statusPassCount = filteredData.map(site => {
            return site.tests.filter(test => test.metrics.status.result === 'pass').length;
        });

        const statusFailCount = filteredData.map(site => {
            return site.tests.filter(test => test.metrics.status.result === 'fail').length;
        });

        // Destroy previous charts if they exist
        if (responseTimeChart) {
            responseTimeChart.destroy();
        }
        if (statusChart) {
            statusChart.destroy();
        }

// Create inventory health chart with clean design
const responseTimeCtx = responseTimeChartCanvas.getContext('2d');

// Chart configuration matching the design
responseTimeChart = new Chart(responseTimeCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'API Response Time',
            data: avgResponseTimes,
            borderColor: '#1e40af', // Dark blue
            backgroundColor: 'rgba(30, 64, 175, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointBackgroundColor: '#1e40af',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: '#1e40af',
            pointHoverBorderColor: '#ffffff',
            pointHoverBorderWidth: 3,
        }, {
            label: 'Target Performance',
            data: avgResponseTimes.map(() => 500), // Static target line
            borderColor: '#06b6d4', // Light blue
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 0,
            borderDash: [0, 0], // Solid line
        }, {
            label: 'Optimal Range',
            data: avgResponseTimes.map(() => 200), // Optimal performance line
            borderColor: '#f59e0b', // Amber/yellow
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 0,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 20,
                right: 30,
                bottom: 20,
                left: 20
            }
        },
        scales: {
            x: {
                grid: {
                    display: true,
                    color: '#f1f5f9',
                    lineWidth: 1,
                    drawBorder: false,
                },
                ticks: {
                    display: true,
                    color: '#94a3b8',
                    font: {
                        size: 12,
                        weight: '400',
                        family: "'Inter', 'Segoe UI', system-ui, sans-serif"
                    },
                    maxTicksLimit: 12,
                    padding: 10
                },
                border: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                    color: '#f1f5f9',
                    lineWidth: 1,
                    drawBorder: false,
                },
                ticks: {
                    display: true,
                    color: '#94a3b8',
                    font: {
                        size: 12,
                        weight: '400',
                        family: "'Inter', 'Segoe UI', system-ui, sans-serif"
                    },
                    padding: 15,
                    callback: function(value) {
                        return value + 'ms';
                    },
                    stepSize: 25
                },
                border: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Response Time',
                    color: '#64748b',
                    font: {
                        size: 11,
                        weight: '500'
                    },
                    padding: 10
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    boxWidth: 8,
                    boxHeight: 8,
                    font: {
                        size: 12,
                        weight: '500',
                        family: "'Inter', 'Segoe UI', system-ui, sans-serif"
                    },
                    color: '#64748b',
                    padding: 15,
                    generateLabels: function(chart) {
                        const datasets = chart.data.datasets;
                        return datasets.map((dataset, i) => ({
                            text: dataset.label,
                            fillStyle: dataset.borderColor,
                            strokeStyle: dataset.borderColor,
                            lineWidth: 0,
                            pointStyle: 'circle',
                            hidden: !chart.isDatasetVisible(i),
                            datasetIndex: i
                        }));
                    }
                }
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1e293b',
                bodyColor: '#475569',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12,
                titleFont: {
                    size: 13,
                    weight: '600'
                },
                bodyFont: {
                    size: 12,
                    weight: '400'
                },
                displayColors: true,
                boxPadding: 4,
                filter: function(tooltipItem) {
                    return tooltipItem.datasetIndex === 0; // Only show tooltip for main data
                },
                callbacks: {
                    title: function(tooltipItems) {
                        return tooltipItems[0].label;
                    },
                    label: function(context) {
                        return `Response Time: ${context.parsed.y}ms`;
                    }
                }
            },
            title: {
                display: false
            }
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'index',
            intersect: false,
        },
        elements: {
            point: {
                hoverBorderWidth: 3
            }
        }
    },
    plugins: [{
        id: 'healthIndicator',
        afterDraw: function(chart) {
            const ctx = chart.ctx;
            const chartArea = chart.chartArea;
            
            // Calculate health percentage based on performance
            const avgResponseTime = avgResponseTimes.reduce((a, b) => a + b, 0) / avgResponseTimes.length;
            const healthPercentage = Math.max(0, Math.min(100, 100 - ((avgResponseTime - 200) / 800) * 100));
            
            // Draw health indicator background
            ctx.save();
            
            // Health percentage text
            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 36px Inter, system-ui, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(`${Math.round(healthPercentage)}%`, 30, 60);
            
            // Health indicator title
            ctx.fillStyle = '#64748b';
            ctx.font = '16px Inter, system-ui, sans-serif';
            ctx.fillText('API Health', 30, 35);
            
            // Health bar indicator
            const barWidth = 120;
            const barHeight = 6;
            const barX = 140;
            const barY = 45;
            
            // Background bar
            ctx.fillStyle = '#f1f5f9';
            ctx.fillRect(barX, barY, barWidth, barHeight);
            
            // Health bar (colored sections)
            const sections = [
                { width: barWidth * 0.7, color: '#10b981' }, // Green
                { width: barWidth * 0.2, color: '#f59e0b' },  // Yellow  
                { width: barWidth * 0.1, color: '#ef4444' }   // Red
            ];
            
            let currentX = barX;
            sections.forEach(section => {
                ctx.fillStyle = section.color;
                ctx.fillRect(currentX, barY, section.width, barHeight);
                currentX += section.width;
            });
            
            // Health indicator needle
            const needlePosition = barX + (barWidth * (healthPercentage / 100));
            ctx.fillStyle = '#1e293b';
            ctx.fillRect(needlePosition - 1, barY - 2, 2, barHeight + 4);
            
            ctx.restore();
        }
    }, {
        id: 'backgroundGrid',
        beforeDraw: function(chart) {
            const ctx = chart.ctx;
            const chartArea = chart.chartArea;
            
            // Add subtle background
            ctx.save();
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, chart.width, chart.height);
            
            // Add very light background to chart area
            ctx.fillStyle = '#fefefe';
            ctx.fillRect(chartArea.left, chartArea.top, 
                        chartArea.right - chartArea.left, 
                        chartArea.bottom - chartArea.top);
            ctx.restore();
        }
    }]
});

// Add custom styling to the chart container
if (responseTimeChartCanvas.parentElement) {
    responseTimeChartCanvas.parentElement.style.cssText = `
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        position: relative;
        min-height: 400px;
    `;
}

        // Create status chart
        const statusCtx = statusChartCanvas.getContext('2d');
        statusChart = new Chart(statusCtx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Pass',
                        data: statusPassCount,
                        backgroundColor: '#10b981',
                        borderColor: '#059669',
                        borderWidth: 1
                    },
                    {
                        label: 'Fail',
                        data: statusFailCount,
                        backgroundColor: '#ef4444',
                        borderColor: '#dc2626',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'API Test Results',
                        font: {
                            size: 16
                        }
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Tests'
                        },
                        stacked: true
                    },
                    x: {
                        stacked: true
                    }
                }
            }
        });
    }

    // Render the home view with summary
    function renderHomeView() {
        currentView = 'home';
        updateView();
        updateSummaryStats();
    }

    // Update summary statistics
    function updateSummaryStats() {
        if (testData.length === 0) return;

        // Calculate total APIs
        totalApisElement.textContent = testData.length;

        // Calculate passed/failed tests
        let passedTests = 0;
        let failedTests = 0;
        let totalResponseTime = 0;
        let testCount = 0;

        testData.forEach(site => {
            site.tests.forEach(test => {
                if (test.metrics.status.result === 'pass') {
                    passedTests++;
                } else {
                    failedTests++;
                }
                totalResponseTime += test.metrics.duration.avg;
                testCount++;
            });
        });

        passedTestsElement.textContent = passedTests;
        failedTestsElement.textContent = failedTests;
        avgResponseElement.textContent = `${(totalResponseTime / testCount).toFixed(2)} ms`;

        // Update recent tests table
        summaryTableBody.innerHTML = '';
        const recentTests = testData
            .flatMap(site => site.tests.map(test => ({ site: site.name, ...test })))
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 5);

        recentTests.forEach(test => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${capitalizeFirstLetter(test.site)}</td>
                <td>${test.network}</td>
                <td class="${test.metrics.status.result}">${test.metrics.status.result.toUpperCase()}</td>
                <td>${test.metrics.duration.avg} ms</td>
            `;
            summaryTableBody.appendChild(row);
        });
    }

    // Render the document view
    function renderDocumentView() {
        currentView = 'document';
        updateView();
        
        apiDocsContainer.innerHTML = '';
        
        if (testData.length === 0) {
            apiDocsContainer.innerHTML = '<p class="no-data">No API documentation available</p>';
            return;
        }

        testData.forEach(site => {
            const docItem = document.createElement('div');
            docItem.className = 'api-doc-item';
            
            docItem.innerHTML = `
                <h3>${capitalizeFirstLetter(site.name)} API</h3>
                <p><strong>Endpoint:</strong> ${site.tests[0]?.apiLink || 'N/A'}</p>
                <p><strong>Description:</strong> This API provides ${site.name} data for the Mega Jewelers application.</p>
                <p><strong>Request Method:</strong> GET</p>
                <p><strong>Parameters:</strong></p>
                <pre>{
    "id": "string (optional)",
    "limit": "number (optional)",
    "offset": "number (optional)"
}</pre>
                <p><strong>Response:</strong></p>
                <pre>{
    "status": "success",
    "data": {
        // ${capitalizeFirstLetter(site.name)} data here
    }
}</pre>
            `;
            
            apiDocsContainer.appendChild(docItem);
        });
    }

    // Update pagination controls
    function updatePagination() {
        const totalTests = filteredData.reduce((acc, site) => acc + site.tests.length, 0);
        const maxPage = Math.ceil(totalTests / rowsPerPage);
        
        pageInfo.textContent = `Page ${currentPage} of ${maxPage}`;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === maxPage || maxPage === 0;
        
        if (currentView === 'table-view') {
            renderTableView();
        }
    }

    // Show error message
    function showError(message) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="11" class="error">${message}</td>
            </tr>
        `;
    }

    // Toggle between light and dark theme
    function toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        const themeIcon = themeToggle.querySelector('.material-icons');
        themeIcon.textContent = isDark ? 'brightness_7' : 'brightness_4';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Re-render charts if in graph view
        if (currentView === 'graph-view') {
            renderGraphView();
        }
    }

    // Refresh data (simulated)
    async function refreshData() {
        refreshButton.classList.add('rotate');
        
        try {
            await fetchData(); // Re-fetch the data
            applyFilters(); // Re-apply current filters
        } catch (error) {
            console.error('Error refreshing data:', error);
            showError('Failed to refresh data');
        } finally {
            setTimeout(() => {
                refreshButton.classList.remove('rotate');
            }, 1000);
        }
    }

    // Helper function to capitalize first letter
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Check for saved theme preference
    function checkTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            const themeIcon = themeToggle.querySelector('.material-icons');
            themeIcon.textContent = 'brightness_7';
        }
    }

    // Initialize the page
    checkTheme();
    init();
});