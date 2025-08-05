// script.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const tableBody = document.getElementById('table-body');
    const cardView = document.getElementById('card-view');
    const cardBody = document.getElementById('card-body');
    const graphView = document.getElementById('graph-view');
    const tableView = document.getElementById('table-view');
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

    // Filter state
    let filters = {
        view: 'table',
        network: null,
        status: null,
        assertion: null
    };

    // Test data - will be populated from the JSON file
    let testData = [];

    // Initialize the page
    async function init() {
        await fetchData();
        setupEventListeners();
        renderTable(testData);
    }

    // Fetch data from JSON file
    async function fetchData() {
        try {
            // Correct path based on your folder structure
            const response = await fetch('./data/API.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            testData = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            // Fallback to empty array if fetch fails
            testData = [];
            showError('Failed to load data. Please try refreshing the page.');
        }
    }

    // Show error message
    function showError(message) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="error">${message}</td>
            </tr>
        `;
    }

    // Set up all event listeners
    function setupEventListeners() {
        // View dropdown
        viewButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(viewMenu, [networkMenu, statusMenu, assertionMenu]);
        });

        // Network dropdown
        networkButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(networkMenu, [viewMenu, statusMenu, assertionMenu]);
        });

        // Status dropdown
        statusButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(statusMenu, [viewMenu, networkMenu, assertionMenu]);
        });

        // Assertion dropdown
        assertionButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(assertionMenu, [viewMenu, networkMenu, statusMenu]);
        });

        // Close menus when clicking outside
        document.addEventListener('click', () => {
            [viewMenu, networkMenu, statusMenu, assertionMenu].forEach(menu => {
                menu.classList.remove('show');
            });
        });

        // View menu items
        document.querySelectorAll('#view-menu .dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const viewType = e.target.textContent.toLowerCase().replace(' ', '-');
                filters.view = viewType;
                updateView();
                viewButton.textContent = e.target.textContent;
            });
        });

        // Network menu items
        document.querySelectorAll('#network-menu .dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const networkType = e.target.textContent;
                filters.network = networkType === '35 Mbps' ? 'Under 35mbps' : '1mbps';
                applyFilters();
                networkButton.innerHTML = `Network Type <span class="material-icons dropdown-icon">arrow_drop_down</span>`;
            });
        });

        // Status menu items
        document.querySelectorAll('#status-menu .dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                filters.status = e.target.textContent.toLowerCase();
                applyFilters();
                statusButton.innerHTML = `Status: ${e.target.textContent} <span class="material-icons dropdown-icon">arrow_drop_down</span>`;
            });
        });

        // Assertion menu items
        document.querySelectorAll('#assertion-menu .dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                filters.assertion = e.target.textContent.toLowerCase();
                applyFilters();
                assertionButton.innerHTML = `Assertion: ${e.target.textContent} <span class="material-icons dropdown-icon">arrow_drop_down</span>`;
            });
        });

        // Theme toggle
        themeToggle.addEventListener('click', toggleTheme);

        // Refresh button
        refreshButton.addEventListener('click', refreshData);
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
        if (filters.view === 'graph-view') {
            graphView.classList.remove('hidden');
            tableView.classList.add('hidden');
        } else {
            graphView.classList.add('hidden');
            tableView.classList.remove('hidden');
        }
    }

    // Apply all active filters
    function applyFilters() {
        let filteredData = [...testData];

        // Filter by network
        if (filters.network) {
            filteredData = filteredData.map(site => ({
                ...site,
                tests: site.tests.filter(test => test.network === filters.network)
            })).filter(site => site.tests.length > 0);
        }

        // Filter by status
        if (filters.status) {
            filteredData = filteredData.map(site => ({
                ...site,
                tests: site.tests.filter(test => test.metrics.status.result === filters.status)
            })).filter(site => site.tests.length > 0);
        }

        // Filter by assertion (response time result)
        if (filters.assertion) {
            filteredData = filteredData.map(site => ({
                ...site,
                tests: site.tests.filter(test => test.metrics.responseTime.result === filters.assertion)
            })).filter(site => site.tests.length > 0);
        }

        renderTable(filteredData);
    }

    // Render the data table
    function renderTable(data) {
        tableBody.innerHTML = '';

        if (data.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="7" class="no-data">No data matching your filters</td>`;
            tableBody.appendChild(row);
            return;
        }

        data.forEach(site => {
            site.tests.forEach(test => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${site.name}</td>
                    <td>${test.network}</td>
                    <td>${test.metrics.duration.avg}</td>
                    <td>${test.metrics.duration.min}</td>
                    <td>${test.metrics.duration.med}</td>
                    <td>${test.metrics.duration.max}</td>
                    <td>${test.metrics.status.passRate}</td>
                    <td class="${test.metrics.status.result}">${test.metrics.status.result}</td>
                    <td>${test.metrics.responseTime.passRate}</td>
                    <td class="${test.metrics.responseTime.result}">${test.metrics.responseTime.result}</td>
                `;
                tableBody.appendChild(row);
            });
        });
    }

    // Render the Card view

    // Toggle between light and dark theme
    function toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        const themeIcon = themeToggle.querySelector('.material-icons');
        themeIcon.textContent = isDark ? 'brightness_7' : 'brightness_4';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
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
            refreshButton.classList.remove('rotate');
        }
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