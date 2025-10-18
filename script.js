
// Enhanced Mobile Sidebar Dropdown Solution
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const closeMobileSidebar = document.getElementById('closeMobileSidebar');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const mobileSidebarBackdrop = document.getElementById('mobileSidebarBackdrop');

    // Toggle mobile sidebar
    mobileMenuToggle.addEventListener('click', function () {
        mobileSidebar.classList.add('show');
        mobileSidebarBackdrop.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    // Close mobile sidebar
    closeMobileSidebar.addEventListener('click', function () {
        mobileSidebar.classList.remove('show');
        mobileSidebarBackdrop.classList.remove('show');
        document.body.style.overflow = 'auto';
        // Close all dropdowns when sidebar closes
        closeAllDropdowns();
    });

    // Close mobile sidebar when backdrop is clicked
    mobileSidebarBackdrop.addEventListener('click', function () {
        mobileSidebar.classList.remove('show');
        mobileSidebarBackdrop.classList.remove('show');
        document.body.style.overflow = 'auto';
        // Close all dropdowns when sidebar closes
        closeAllDropdowns();
    });

    // Enhanced dropdown toggle for mobile
    mobileSidebar.addEventListener('click', function (e) {
        const target = e.target.closest('.has-dropdown, .has-submenu');

        if (target) {
            e.preventDefault();
            e.stopPropagation();

            const dropdown = target.nextElementSibling;
            if (dropdown && dropdown.classList.contains('dropdown-submenu')) {
                const isOpening = !dropdown.classList.contains('show');

                // Close all dropdowns first
                closeAllDropdowns();

                // Open current if it was closed
                if (isOpening) {
                    dropdown.classList.add('show');
                    target.classList.add('active');

                    // Scroll the dropdown into view if needed
                    setTimeout(() => {
                        dropdown.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                            inline: 'nearest'
                        });
                    }, 100);
                }
            }
        } else {
            // Check if clicking on a regular dropdown item (not a toggle)
            const dropdownItem = e.target.closest('.dropdown-item');
            if (dropdownItem && !dropdownItem.classList.contains('has-submenu')) {
                // Close all dropdowns when selecting a final item
                closeAllDropdowns();
            }
        }
    });

    // Close all dropdowns function
    function closeAllDropdowns() {
        mobileSidebar.querySelectorAll('.dropdown-submenu').forEach(menu => {
            menu.classList.remove('show');
        });
        mobileSidebar.querySelectorAll('.has-dropdown, .has-submenu').forEach(toggle => {
            toggle.classList.remove('active');
        });
    }

    // Close dropdowns when clicking outside on mobile
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.mobile-sidebar') && window.innerWidth < 992) {
            closeAllDropdowns();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 992) {
            // Close mobile sidebar and dropdowns when switching to desktop
            mobileSidebar.classList.remove('show');
            mobileSidebarBackdrop.classList.remove('show');
            document.body.style.overflow = 'auto';
            closeAllDropdowns();
        }
    });
});
// Main sidebar functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');

    // Toggle sidebar on mobile
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function () {
            sidebar.classList.add('show');
            if (sidebarBackdrop) {
                sidebarBackdrop.classList.add('show');
            }
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener('click', function () {
            sidebar.classList.remove('show');
            if (sidebarBackdrop) {
                sidebarBackdrop.classList.remove('show');
            }
            document.body.style.overflow = 'auto';
        });
    }

    if (sidebarBackdrop && sidebar) {
        sidebarBackdrop.addEventListener('click', function () {
            sidebar.classList.remove('show');
            sidebarBackdrop.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }

    // Handle dropdowns
    const mainDropdownToggles = document.querySelectorAll('.nav-item > .has-dropdown');
    const nestedDropdownToggles = document.querySelectorAll('.has-submenu');

    // Initialize dropdown behavior based on screen size
    function initDropdowns() {
        if (window.innerWidth >= 992) {
            setupDesktopDropdowns();
        } else {
            setupMobileDropdowns();
        }
    }

    function setupDesktopDropdowns() {
        // Remove mobile event listeners
        mainDropdownToggles.forEach(toggle => {
            toggle.removeEventListener('click', handleMobileClick);
        });
        nestedDropdownToggles.forEach(toggle => {
            toggle.removeEventListener('click', handleMobileClick);
        });

        // Add desktop event listeners
        mainDropdownToggles.forEach(toggle => {
            toggle.addEventListener('mouseenter', handleDesktopHover);
            toggle.addEventListener('mouseleave', handleDesktopLeave);
        });

        nestedDropdownToggles.forEach(toggle => {
            toggle.addEventListener('mouseenter', handleDesktopHover);
            toggle.addEventListener('mouseleave', handleDesktopLeave);
        });

        // Add event listeners to dropdown menus
        document.querySelectorAll('.dropdown-submenu').forEach(menu => {
            menu.addEventListener('mouseenter', function () {
                this.style.display = 'block';
            });
            menu.addEventListener('mouseleave', function () {
                this.style.display = 'none';
            });
        });
    }

    function setupMobileDropdowns() {
        // Remove desktop event listeners
        mainDropdownToggles.forEach(toggle => {
            toggle.removeEventListener('mouseenter', handleDesktopHover);
            toggle.removeEventListener('mouseleave', handleDesktopLeave);
        });
        nestedDropdownToggles.forEach(toggle => {
            toggle.removeEventListener('mouseenter', handleDesktopHover);
            toggle.removeEventListener('mouseleave', handleDesktopLeave);
        });

        // Add mobile event listeners
        mainDropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', handleMobileClick);
        });
        nestedDropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', handleMobileClick);
        });
    }

    function handleDesktopHover(e) {
        const dropdown = this.nextElementSibling;
        if (dropdown && dropdown.classList.contains('dropdown-submenu')) {
            positionDropdown(dropdown, this);
            dropdown.style.display = 'block';
        }
    }

    function handleDesktopLeave(e) {
        const dropdown = this.nextElementSibling;
        if (dropdown && !dropdown.contains(e.relatedTarget)) {
            setTimeout(() => {
                if (!dropdown.matches(':hover')) {
                    dropdown.style.display = 'none';
                }
            }, 100);
        }
    }

    function handleMobileClick(e) {
        e.preventDefault();
        e.stopPropagation();

        const dropdown = this.nextElementSibling;
        if (dropdown && dropdown.classList.contains('dropdown-submenu')) {
            const isOpening = dropdown.style.display !== 'block';

            // Close all dropdowns at the same level
            const parent = this.closest('.dropdown-submenu') || this.closest('.nav-item');
            const siblings = parent.querySelectorAll('.dropdown-submenu');
            siblings.forEach(menu => {
                if (menu !== dropdown) {
                    menu.style.display = 'none';
                }
            });

            dropdown.style.display = isOpening ? 'block' : 'none';
        }
    }

    function positionDropdown(dropdown, trigger) {
        const rect = trigger.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        // Check if it's a main dropdown or nested dropdown
        const isMainDropdown = trigger.closest('.nav-item') && !trigger.closest('.dropdown-submenu');

        if (isMainDropdown) {
            // Position main dropdowns to the right of sidebar
            dropdown.style.left = '190px';
            dropdown.style.top = rect.top + 'px';

            // Adjust if going off bottom of screen
            const dropdownHeight = dropdown.offsetHeight;
            if (rect.top + dropdownHeight > viewportHeight - 20) {
                dropdown.style.top = (viewportHeight - dropdownHeight - 20) + 'px';
            }
        } else {
            // Position nested dropdowns to the right of parent
            dropdown.style.left = (rect.right + 2) + 'px';
            dropdown.style.top = rect.top + 'px';

            // Adjust if going off right of screen
            const dropdownWidth = dropdown.offsetWidth;
            if (rect.right + dropdownWidth > viewportWidth - 20) {
                dropdown.style.left = (rect.left - dropdownWidth - 2) + 'px';
            }

            // Adjust if going off bottom of screen
            const dropdownHeight = dropdown.offsetHeight;
            if (rect.top + dropdownHeight > viewportHeight - 20) {
                dropdown.style.top = (viewportHeight - dropdownHeight - 20) + 'px';
            }
        }
    }

    // Close dropdowns when clicking outside on mobile
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.sidebar') && window.innerWidth < 992) {
            document.querySelectorAll('.dropdown-submenu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        initDropdowns();
        // Close all dropdowns on resize
        document.querySelectorAll('.dropdown-submenu').forEach(menu => {
            menu.style.display = 'none';
        });
    });

    // Initialize dropdowns
    initDropdowns();

    // Add active state to menu items
    document.querySelectorAll('.menu-item, .dropdown-item').forEach(item => {
        item.addEventListener('click', function () {
            if (!this.classList.contains('has-dropdown') && !this.classList.contains('has-submenu')) {
                document.querySelectorAll('.menu-item.active').forEach(activeItem => {
                    activeItem.classList.remove('active', 'bg-primary', 'text-white', 'shadow');
                    activeItem.classList.add('text-muted');
                });

                if (this.classList.contains('menu-item')) {
                    this.classList.add('active', 'bg-primary', 'text-white', 'shadow');
                    this.classList.remove('text-muted');
                }
            }
        });
    });
}); // This closes the main sidebar DOMContentLoaded

// ===== CHART CONFIGURATION =====

// ===== CHART CONFIGURATION =====
const ctx = document.getElementById('earningsChart');
if (ctx) {
    const chartCtx = ctx.getContext('2d');
    const revenueData = [85, 120, 95, 150, 180, 220];
    const profitData = [45, 70, 60, 90, 110, 140];
    const maxValue = 300;
    const revenuePercentages = revenueData.map(value => (value / maxValue) * 100);
    const profitPercentages = profitData.map(value => (value / maxValue) * 100);

    // Gradient for revenue line
    const revenueGradient = chartCtx.createLinearGradient(0, 0, 0, 250);
    revenueGradient.addColorStop(0, 'rgba(0, 106, 255, 0.3)');
    revenueGradient.addColorStop(1, 'rgba(0, 106, 255, 0.05)');

    // Gradient for profit line
    const profitGradient = chartCtx.createLinearGradient(0, 0, 0, 250);
    profitGradient.addColorStop(0, 'rgba(101, 101, 117, 0.2)');
    profitGradient.addColorStop(1, 'rgba(101, 101, 117, 0.05)');

    const chart = new Chart(chartCtx, {
        type: 'line',
        data: {
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            datasets: [
                {
                    label: 'Revenue',
                    data: revenuePercentages,
                    borderColor: '#006AFF',
                    backgroundColor: revenueGradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#006AFF',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'Profit',
                    data: profitPercentages,
                    borderColor: 'rgba(101, 101, 117, 0.7)',
                    backgroundColor: profitGradient,
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(101, 101, 117, 0.7)',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#000',
                    bodyColor: '#000',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    usePointStyle: true,
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            const value = context.parsed.y;
                            const actualValue = (value / 100) * maxValue;
                            return label + '$' + actualValue.toFixed(0) + 'K';
                        },
                        title: function (tooltipItems) {
                            return 'Month: ' + tooltipItems[0].label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#656575',
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    display: true,
                    min: 0,
                    max: 100,
                    grid: {
                        color: 'rgba(101, 101, 117, 0.1)',
                        drawBorder: false,
                        borderDash: [3, 3]
                    },
                    ticks: {
                        color: '#656575',
                        font: {
                            size: 11
                        },
                        callback: function (value) {
                            return '$' + ((value / 100) * maxValue).toFixed(0) + 'K';
                        },
                        stepSize: 25
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            elements: {
                point: {
                    radius: 4,
                    hoverRadius: 6,
                    hitRadius: 8
                }
            }
        }
    });

    // Add resize observer for better responsiveness
    const resizeObserver = new ResizeObserver(entries => {
        chart.resize();
    });
    resizeObserver.observe(ctx.parentElement);
}
// ===== COMPLAINT DATA =====
const complaintData = {
    "2024-06-10": {
        date: "June 10",
        day: "Mon",
        complaints: 8,
        workers: {
            "Mayur": [
                { company: "MD Group", problem: "Plumbing Issue", time: "09:00 AM" }
            ],
            "Chetan": [
                { company: "LM Construction", problem: "Electrical Fault", time: "11:30 AM" }
            ],
            "Rahul": [
                { company: "AB Corp", problem: "AC Repair", time: "09:30 AM" }
            ],
            "Priya": [
                { company: "MD Group", problem: "Carpentry Work", time: "10:00 AM" }
            ],
            "Amit": [],
            "Neha": []
        }
    },
    "2024-06-11": {
        date: "June 11",
        day: "Tue",
        complaints: 6,
        workers: {
            "Mayur": [
                { company: "LM Construction", problem: "Water Leakage", time: "10:45 AM" }
            ],
            "Chetan": [
                { company: "MD Group", problem: "Network Issue", time: "01:00 PM" }
            ],
            "Rahul": [
                { company: "XY Builders", problem: "Paint Work", time: "02:15 PM" }
            ],
            "Priya": [
                { company: "LM Construction", problem: "Flooring Issue", time: "01:30 PM" }
            ],
            "Amit": [
                { company: "JK Enterprises", problem: "Window Repair", time: "11:00 AM" }
            ],
            "Neha": []
        }
    },
    "2024-06-12": {
        date: "June 12",
        day: "Wed",
        complaints: 9,
        workers: {
            "Mayur": [
                { company: "MD Group", problem: "Wall Repair", time: "09:45 AM" }
            ],
            "Chetan": [
                { company: "MD Group", problem: "Furniture Assembly", time: "03:00 PM" }
            ],
            "Rahul": [
                { company: "AB Corp", problem: "Electrical Issue", time: "09:30 AM" }
            ],
            "Priya": [
                { company: "MD Group", problem: "Plumbing Check", time: "01:30 PM" }
            ],
            "Amit": [
                { company: "JK Enterprises", problem: "AC Service", time: "11:00 AM" }
            ],
            "Neha": [
                { company: "LM Construction", problem: "Carpentry Work", time: "02:30 PM" }
            ]
        }
    },
    "2024-06-13": {
        date: "June 13",
        day: "Thu",
        complaints: 7,
        workers: {
            "Mayur": [
                { company: "MD Group", problem: "Light Fixtures", time: "10:30 AM" }
            ],
            "Chetan": [
                { company: "LM Construction", problem: "Wall Repair", time: "02:00 PM" }
            ],
            "Rahul": [
                { company: "AB Corp", problem: "Network Setup", time: "11:30 AM" }
            ],
            "Priya": [],
            "Amit": [
                { company: "JK Enterprises", problem: "Paint Touch-up", time: "09:00 AM" }
            ],
            "Neha": []
        }
    },
    "2024-06-14": {
        date: "June 14",
        day: "Fri",
        complaints: 12,
        workers: {
            "Mayur": [
                { company: "MD Group", problem: "Plumbing Issue", time: "09:00 AM" },
                { company: "LM Construction", problem: "Electrical Fault", time: "11:30 AM" }
            ],
            "Chetan": [
                { company: "LM Construction", problem: "Water Leakage", time: "10:45 AM" },
                { company: "MD Group", problem: "Network Issue", time: "01:00 PM" }
            ],
            "Rahul": [
                { company: "AB Corp", problem: "AC Repair", time: "09:30 AM" },
                { company: "XY Builders", problem: "Paint Work", time: "02:15 PM" }
            ],
            "Priya": [
                { company: "MD Group", problem: "Carpentry Work", time: "10:00 AM" },
                { company: "LM Construction", problem: "Flooring Issue", time: "01:30 PM" }
            ],
            "Amit": [
                { company: "JK Enterprises", problem: "Window Repair", time: "11:00 AM" }
            ],
            "Neha": [
                { company: "LM Construction", problem: "Wall Repair", time: "09:45 AM" },
                { company: "MD Group", problem: "Furniture Assembly", time: "03:00 PM" }
            ]
        }
    },
    "2024-06-15": {
        date: "June 15",
        day: "Sat",
        complaints: 8,
        workers: {
            "Mayur": [
                { company: "MD Group", problem: "Paint Work", time: "10:00 AM" }
            ],
            "Chetan": [
                { company: "LM Construction", problem: "Window Repair", time: "11:00 AM" },
                { company: "MD Group", problem: "Furniture Assembly", time: "03:00 PM" }
            ],
            "Rahul": [
                { company: "AB Corp", problem: "Electrical Issue", time: "09:30 AM" }
            ],
            "Priya": [
                { company: "MD Group", problem: "Plumbing Check", time: "01:30 PM" }
            ],
            "Amit": [
                { company: "JK Enterprises", problem: "AC Service", time: "11:00 AM" }
            ],
            "Neha": [
                { company: "LM Construction", problem: "Carpentry Work", time: "02:30 PM" }
            ]
        }
    },
    "2024-06-16": {
        date: "June 16",
        day: "Sun",
        complaints: 5,
        workers: {
            "Mayur": [
                { company: "MD Group", problem: "Light Fixtures", time: "10:30 AM" }
            ],
            "Chetan": [
                { company: "LM Construction", problem: "Wall Repair", time: "02:00 PM" }
            ],
            "Rahul": [
                { company: "AB Corp", problem: "Network Setup", time: "11:30 AM" }
            ],
            "Priya": [],
            "Amit": [
                { company: "JK Enterprises", problem: "Paint Touch-up", time: "09:00 AM" }
            ],
            "Neha": []
        }
    },
    "2024-06-17": {
        date: "June 17",
        day: "Mon",
        complaints: 6,
        workers: {
            "Mayur": [
                { company: "MD Group", problem: "Plumbing Issue", time: "09:00 AM" }
            ],
            "Chetan": [
                { company: "LM Construction", problem: "Electrical Fault", time: "11:30 AM" }
            ],
            "Rahul": [
                { company: "AB Corp", problem: "AC Repair", time: "09:30 AM" }
            ],
            "Priya": [
                { company: "MD Group", problem: "Carpentry Work", time: "10:00 AM" }
            ],
            "Amit": [],
            "Neha": [
                { company: "LM Construction", problem: "Water Leakage", time: "10:45 AM" }
            ]
        }
    },
    "2024-06-18": {
        date: "June 18",
        day: "Tue",
        complaints: 7,
        workers: {
            "Mayur": [
                { company: "MD Group", problem: "Network Issue", time: "01:00 PM" }
            ],
            "Chetan": [
                { company: "XY Builders", problem: "Paint Work", time: "02:15 PM" }
            ],
            "Rahul": [
                { company: "LM Construction", problem: "Flooring Issue", time: "01:30 PM" }
            ],
            "Priya": [
                { company: "JK Enterprises", problem: "Window Repair", time: "11:00 AM" }
            ],
            "Amit": [
                { company: "MD Group", problem: "Wall Repair", time: "09:45 AM" }
            ],
            "Neha": []
        }
    },
    "2024-06-19": {
        date: "June 19",
        day: "Wed",
        complaints: 9,
        workers: {
            "Mayur": [
                { company: "MD Group", problem: "Furniture Assembly", time: "03:00 PM" }
            ],
            "Chetan": [
                { company: "AB Corp", problem: "Electrical Issue", time: "09:30 AM" }
            ],
            "Rahul": [
                { company: "MD Group", problem: "Plumbing Check", time: "01:30 PM" }
            ],
            "Priya": [
                { company: "JK Enterprises", problem: "AC Service", time: "11:00 AM" }
            ],
            "Amit": [
                { company: "LM Construction", problem: "Carpentry Work", time: "02:30 PM" }
            ],
            "Neha": [
                { company: "MD Group", problem: "Light Fixtures", time: "10:30 AM" }
            ]
        }
    },
    "2024-06-20": {
        date: "June 20",
        day: "Thu",
        complaints: 8,
        workers: {
            "Mayur": [
                { company: "LM Construction", problem: "Wall Repair", time: "02:00 PM" }
            ],
            "Chetan": [
                { company: "AB Corp", problem: "Network Setup", time: "11:30 AM" }
            ],
            "Rahul": [],
            "Priya": [
                { company: "JK Enterprises", problem: "Paint Touch-up", time: "09:00 AM" }
            ],
            "Amit": [
                { company: "MD Group", problem: "Plumbing Issue", time: "09:00 AM" }
            ],
            "Neha": [
                { company: "LM Construction", problem: "Electrical Fault", time: "11:30 AM" }
            ]
        }
    }
};

let complaintCurrentDate = "2024-06-14";
let currentWeekDates = [];
let currentCalendarMonth = 5; // June (0-indexed)
let currentCalendarYear = 2024;

// Function to get 7 days: selected date + previous 3 days + next 3 days
function getWeekDates(selectedDate) {
    const date = new Date(selectedDate);
    const weekDates = [];

    // Get previous 3 days
    for (let i = 3; i > 0; i--) {
        const prevDate = new Date(date);
        prevDate.setDate(date.getDate() - i);
        const dateString = prevDate.toISOString().split('T')[0];
        weekDates.push(dateString);
    }

    // Add selected date
    weekDates.push(selectedDate);

    // Get next 3 days
    for (let i = 1; i <= 3; i++) {
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + i);
        const dateString = nextDate.toISOString().split('T')[0];
        weekDates.push(dateString);
    }

    return weekDates;
}

function initComplaintSection() {
    currentWeekDates = getWeekDates(complaintCurrentDate);
    renderComplaintDateIndicators();
    renderComplaintWorkers();
    updateComplaintSummary();
}

function renderComplaintDateIndicators() {
    const container = document.querySelector('.complaint-date-indicators');
    if (!container) return;

    container.innerHTML = '';

    currentWeekDates.forEach(dateString => {
        const data = complaintData[dateString];

        const indicator = document.createElement('div');
        indicator.className = 'complaint-date-indicator ' + (dateString === complaintCurrentDate ? 'bg-danger text-white' : 'bg-light');

        if (data) {
            indicator.innerHTML = `
                <div class="fw-bold">${data.day}</div>
                <div class="small">${data.date.split(' ')[1]}</div>
                <small class="badge ${dateString === complaintCurrentDate ? 'bg-white text-dark' : 'bg-secondary'}">${data.complaints}</small>
            `;
        } else {
            const date = new Date(dateString);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dateDisplay = date.getDate();

            indicator.innerHTML = `
                <div class="fw-bold">${dayName}</div>
                <div class="small">${dateDisplay}</div>
                <small class="badge bg-secondary">0</small>
            `;
            indicator.style.opacity = '0.6';
        }

        indicator.addEventListener('click', () => {
            if (complaintData[dateString]) {
                complaintCurrentDate = dateString;
                currentWeekDates = getWeekDates(complaintCurrentDate);
                renderComplaintDateIndicators();
                renderComplaintWorkers();
                updateComplaintSummary();
            }
        });

        container.appendChild(indicator);
    });
}

function renderComplaintWorkers() {
    const container = document.querySelector('.complaint-workers-container');
    if (!container) return;

    container.innerHTML = '';

    const data = complaintData[complaintCurrentDate];
    if (!data) {
        container.innerHTML = '<div class="col-12 text-center text-muted py-4">No data available for selected date</div>';
        return;
    }

    const complaintCurrentDateEl = document.querySelector('.complaint-current-date');
    if (complaintCurrentDateEl) {
        complaintCurrentDateEl.textContent = data.date;
    }

    Object.keys(data.workers).forEach(worker => {
        const tasks = data.workers[worker];

        const workerCard = document.createElement('div');
        workerCard.className = 'col-md-6 col-lg-4 mb-3';

        let tasksHTML = '';
        if (tasks.length > 0) {
            tasks.forEach(task => {
                tasksHTML += `
                    <div class="bg-white p-2 rounded border mb-2">
                        <small class="fw-bold d-block">${task.company}</small>
                        <small class="text-muted d-block">${task.problem}</small>
                        <small class="text-danger">${task.time}</small>
                    </div>
                `;
            });
        } else {
            tasksHTML = '<div class="bg-white p-2 rounded border text-muted"><small>No tasks scheduled</small></div>';
        }

        workerCard.innerHTML = `
            <div class="worker-card h-100">
                <div class="d-flex align-items-center gap-2 mb-2">
                    <div class="worker-avatar">${worker.charAt(0)}</div>
                    <strong>${worker}</strong>
                </div>
                <div class="d-flex flex-column gap-2">${tasksHTML}</div>
            </div>
        `;

        container.appendChild(workerCard);
    });
}

function updateComplaintSummary() {
    const data = complaintData[complaintCurrentDate];
    if (!data) {
        document.querySelector('.complaint-total-complaints').textContent = '0';
        document.querySelector('.complaint-assigned-workers').textContent = '0';
        document.querySelector('.complaint-completed-tasks').textContent = '0';
        return;
    }

    const totalComplaintsEl = document.querySelector('.complaint-total-complaints');
    if (totalComplaintsEl) {
        totalComplaintsEl.textContent = data.complaints;
    }

    const assignedWorkers = Object.values(data.workers).filter(tasks => tasks.length > 0).length;
    const assignedWorkersEl = document.querySelector('.complaint-assigned-workers');
    if (assignedWorkersEl) {
        assignedWorkersEl.textContent = assignedWorkers;
    }

    const completed = Math.floor(data.complaints * 0.3);
    const completedTasksEl = document.querySelector('.complaint-completed-tasks');
    if (completedTasksEl) {
        completedTasksEl.textContent = completed;
    }
}

// Calendar functions for Complaint
function renderComplaintDateIndicators() {
    const container = document.querySelector('.complaint-date-indicators');
    if (!container) return;

    container.innerHTML = '';

    currentWeekDates.forEach(dateString => {
        const data = complaintData[dateString];

        const indicator = document.createElement('div');
        indicator.className = `date-indicator ${dateString === complaintCurrentDate ? 'active bg-danger text-white' : 'bg-light'}`;

        if (data) {
            indicator.innerHTML = `
                <div class="date-day">${data.day}</div>
                <div class="date-number">${data.date.split(' ')[1]}</div>
                <span class="date-badge badge ${dateString === complaintCurrentDate ? 'bg-white text-dark' : 'bg-secondary'}">${data.complaints}</span>
            `;
        } else {
            const date = new Date(dateString);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dateDisplay = date.getDate();

            indicator.innerHTML = `
                <div class="date-day">${dayName}</div>
                <div class="date-number">${dateDisplay}</div>
                <span class="date-badge badge bg-secondary">0</span>
            `;
            indicator.style.opacity = '0.5';
        }

        indicator.addEventListener('click', () => {
            if (complaintData[dateString]) {
                complaintCurrentDate = dateString;
                currentWeekDates = getWeekDates(complaintCurrentDate);
                renderComplaintDateIndicators();
                renderComplaintWorkers();
                updateComplaintSummary();
            }
        });

        container.appendChild(indicator);
    });
}

// Updated Calendar render function for Complaint
function renderComplaintCalendar() {
    const calendarPopup = document.querySelector('.complaint-calendar-popup');
    const calendarDates = document.querySelector('.complaint-calendar-dates');
    const calendarMonth = document.querySelector('.complaint-calendar-month');

    if (!calendarPopup || !calendarDates || !calendarMonth) return;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    calendarMonth.textContent = `${monthNames[currentCalendarMonth]} ${currentCalendarYear}`;

    const firstDay = new Date(currentCalendarYear, currentCalendarMonth, 1);
    const lastDay = new Date(currentCalendarYear, currentCalendarMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let calendarHTML = '';

    // Add weekday headers
    weekdays.forEach(day => {
        calendarHTML += `<div class="complaint-calendar-weekday">${day}</div>`;
    });

    // Add empty cells
    for (let i = 0; i < startingDay; i++) {
        calendarHTML += `<div class="complaint-calendar-date empty"></div>`;
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateString = `${currentCalendarYear}-${String(currentCalendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasData = complaintData[dateString];
        const isSelected = dateString === complaintCurrentDate;

        let className = 'complaint-calendar-date';
        if (hasData) className += ' available';
        if (isSelected) className += ' selected';
        if (!hasData) className += ' empty';

        calendarHTML += `<div class="${className}" data-date="${dateString}">${day}</div>`;
    }

    calendarDates.innerHTML = calendarHTML;

    // Add event listeners
    document.querySelectorAll('.complaint-calendar-date.available').forEach(dateEl => {
        dateEl.addEventListener('click', () => {
            const selectedDate = dateEl.getAttribute('data-date');
            complaintCurrentDate = selectedDate;
            currentWeekDates = getWeekDates(complaintCurrentDate);
            renderComplaintDateIndicators();
            renderComplaintWorkers();
            updateComplaintSummary();
            hideComplaintCalendar();
        });
    });
}
// Fixed Complaint Calendar positioning
function showComplaintCalendar() {
    const calendarPopup = document.querySelector('.complaint-calendar-popup');
    const currentDateEl = document.querySelector('.complaint-current-date');

    if (calendarPopup && currentDateEl) {
        // Always use centered positioning to prevent going out of screen
        calendarPopup.style.position = 'fixed';
        calendarPopup.style.top = '50%';
        calendarPopup.style.left = '50%';
        calendarPopup.style.transform = 'translate(-50%, -50%)';
        calendarPopup.style.zIndex = '1060';
        calendarPopup.style.display = 'block';

        renderComplaintCalendar();

        setTimeout(() => {
            document.addEventListener('click', closeComplaintCalendarOnClickOutside);
        }, 0);
    }
}

function hideComplaintCalendar() {
    const calendarPopup = document.querySelector('.complaint-calendar-popup');
    if (calendarPopup) {
        calendarPopup.style.display = 'none';
        document.removeEventListener('click', closeComplaintCalendarOnClickOutside);
    }
}

function closeComplaintCalendarOnClickOutside(e) {
    const calendarPopup = document.querySelector('.complaint-calendar-popup');
    const currentDateEl = document.querySelector('.complaint-current-date');

    if (calendarPopup &&
        !calendarPopup.contains(e.target) &&
        !currentDateEl.contains(e.target)) {
        hideComplaintCalendar();
    }
}

function hideComplaintCalendar() {
    const calendarPopup = document.querySelector('.complaint-calendar-popup');
    if (calendarPopup) {
        calendarPopup.style.display = 'none';
        document.removeEventListener('click', closeComplaintCalendarOnClickOutside);
    }
}

function closeComplaintCalendarOnClickOutside(e) {
    const calendarPopup = document.querySelector('.complaint-calendar-popup');
    const currentDateEl = document.querySelector('.complaint-current-date');

    if (calendarPopup &&
        !calendarPopup.contains(e.target) &&
        !currentDateEl.contains(e.target)) {
        hideComplaintCalendar();
    }
}

// Calendar navigation for Complaint
document.querySelector('.complaint-calendar-prev')?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentCalendarMonth--;
    if (currentCalendarMonth < 0) {
        currentCalendarMonth = 11;
        currentCalendarYear--;
    }
    renderComplaintCalendar();
});

document.querySelector('.complaint-calendar-next')?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentCalendarMonth++;
    if (currentCalendarMonth > 11) {
        currentCalendarMonth = 0;
        currentCalendarYear++;
    }
    renderComplaintCalendar();
});

// Custom date selection with calendar for Complaint
const complaintCurrentDateEl = document.querySelector('.complaint-current-date');
if (complaintCurrentDateEl) {
    complaintCurrentDateEl.addEventListener('click', (e) => {
        e.stopPropagation();
        showComplaintCalendar();
    });
}

// Day navigation buttons for Complaint
const complaintPrevBtn = document.querySelector('.complaint-prev-btn');
if (complaintPrevBtn) {
    complaintPrevBtn.addEventListener('click', () => {
        const currentDate = new Date(complaintCurrentDate);
        currentDate.setDate(currentDate.getDate() - 1);
        const newDate = currentDate.toISOString().split('T')[0];

        if (complaintData[newDate]) {
            complaintCurrentDate = newDate;
            currentWeekDates = getWeekDates(complaintCurrentDate);
            renderComplaintDateIndicators();
            renderComplaintWorkers();
            updateComplaintSummary();
        }
    });
}

const complaintNextBtn = document.querySelector('.complaint-next-btn');
if (complaintNextBtn) {
    complaintNextBtn.addEventListener('click', () => {
        const currentDate = new Date(complaintCurrentDate);
        currentDate.setDate(currentDate.getDate() + 1);
        const newDate = currentDate.toISOString().split('T')[0];

        if (complaintData[newDate]) {
            complaintCurrentDate = newDate;
            currentWeekDates = getWeekDates(complaintCurrentDate);
            renderComplaintDateIndicators();
            renderComplaintWorkers();
            updateComplaintSummary();
        }
    });
}

// Initialize complaint section
initComplaintSection();
// ===== LEAD TO-DO LIST DATA =====
// ===== LEAD TO-DO LIST DATA =====
const leadData = {
    "2024-06-10": {
        date: "June 10",
        day: "Mon",
        leads: 8,
        workers: {
            "Sandeep": [
                { company: "Tech Solutions", type: "New Inquiry", time: "09:30 AM" }
            ],
            "Priya": [
                { company: "Urban Developers", type: "Hot Lead", time: "10:15 AM" }
            ],
            "Vikram": [
                { company: "Sky Towers", type: "New Inquiry", time: "09:00 AM" }
            ],
            "Anjali": [
                { company: "Royal Estates", type: "Follow-up", time: "10:30 AM" }
            ],
            "Kiran": [],
            "Ravi": []
        }
    },
    "2024-06-11": {
        date: "June 11",
        day: "Tue",
        leads: 6,
        workers: {
            "Sandeep": [
                { company: "BuildPro Ltd", type: "Follow-up", time: "11:00 AM" }
            ],
            "Priya": [
                { company: "Metro Constructions", type: "Quote Request", time: "02:00 PM" }
            ],
            "Vikram": [
                { company: "Green Homes", type: "Site Visit", time: "01:30 PM" }
            ],
            "Anjali": [
                { company: "Prime Builders", type: "Negotiation", time: "03:15 PM" }
            ],
            "Kiran": [
                { company: "Blue Ocean", type: "Hot Lead", time: "11:45 AM" }
            ],
            "Ravi": []
        }
    },
    "2024-06-12": {
        date: "June 12",
        day: "Wed",
        leads: 15,
        workers: {
            "Sandeep": [
                { company: "Tech Solutions", type: "New Inquiry", time: "09:30 AM" },
                { company: "BuildPro Ltd", type: "Follow-up", time: "11:00 AM" }
            ],
            "Priya": [
                { company: "Urban Developers", type: "Hot Lead", time: "10:15 AM" },
                { company: "Metro Constructions", type: "Quote Request", time: "02:00 PM" }
            ],
            "Vikram": [
                { company: "Sky Towers", type: "New Inquiry", time: "09:00 AM" },
                { company: "Green Homes", type: "Site Visit", time: "01:30 PM" }
            ],
            "Anjali": [
                { company: "Royal Estates", type: "Follow-up", time: "10:30 AM" },
                { company: "Prime Builders", type: "Negotiation", time: "03:15 PM" }
            ],
            "Kiran": [
                { company: "Blue Ocean", type: "Hot Lead", time: "11:45 AM" }
            ],
            "Ravi": [
                { company: "Smart City", type: "Quote Request", time: "09:45 AM" },
                { company: "Alpha Constructions", type: "Follow-up", time: "02:30 PM" }
            ]
        }
    },
    "2024-06-13": {
        date: "June 13",
        day: "Thu",
        leads: 10,
        workers: {
            "Sandeep": [
                { company: "BuildPro Ltd", type: "Follow-up", time: "11:00 AM" }
            ],
            "Priya": [
                { company: "Urban Developers", type: "Hot Lead", time: "10:15 AM" }
            ],
            "Vikram": [
                { company: "Sky Towers", type: "New Inquiry", time: "09:00 AM" }
            ],
            "Anjali": [
                { company: "Prime Builders", type: "Negotiation", time: "03:15 PM" }
            ],
            "Kiran": [
                { company: "Blue Ocean", type: "Hot Lead", time: "11:45 AM" }
            ],
            "Ravi": [
                { company: "Alpha Constructions", type: "Follow-up", time: "02:30 PM" }
            ]
        }
    },
    "2024-06-14": {
        date: "June 14",
        day: "Fri",
        leads: 12,
        workers: {
            "Sandeep": [
                { company: "BuildPro Ltd", type: "Follow-up", time: "11:00 AM" }
            ],
            "Priya": [
                { company: "Urban Developers", type: "Hot Lead", time: "10:15 AM" },
                { company: "Metro Constructions", type: "Quote Request", time: "02:00 PM" }
            ],
            "Vikram": [
                { company: "Green Homes", type: "Site Visit", time: "01:30 PM" }
            ],
            "Anjali": [
                { company: "Royal Estates", type: "Follow-up", time: "10:30 AM" }
            ],
            "Kiran": [
                { company: "Blue Ocean", type: "Hot Lead", time: "11:45 AM" }
            ],
            "Ravi": [
                { company: "Smart City", type: "Quote Request", time: "09:45 AM" },
                { company: "Alpha Constructions", type: "Follow-up", time: "02:30 PM" }
            ]
        }
    },
    "2024-06-15": {
        date: "June 15",
        day: "Sat",
        leads: 10,
        workers: {
            "Sandeep": [
                { company: "Tech Solutions", type: "Closing Deal", time: "10:00 AM" }
            ],
            "Priya": [
                { company: "Urban Developers", type: "Final Discussion", time: "11:30 AM" },
                { company: "Metro Constructions", type: "Contract Review", time: "02:45 PM" }
            ],
            "Vikram": [
                { company: "Sky Towers", type: "Follow-up", time: "09:30 AM" }
            ],
            "Anjali": [
                { company: "Royal Estates", type: "Site Visit", time: "01:00 PM" }
            ],
            "Kiran": [
                { company: "Blue Ocean", type: "Negotiation", time: "10:30 AM" }
            ],
            "Ravi": [
                { company: "Smart City", type: "Presentation", time: "03:00 PM" }
            ]
        }
    },
    "2024-06-16": {
        date: "June 16",
        day: "Sun",
        leads: 7,
        workers: {
            "Sandeep": [
                { company: "New Horizon", type: "New Inquiry", time: "10:30 AM" }
            ],
            "Priya": [
                { company: "Metro Constructions", type: "Final Call", time: "02:15 PM" }
            ],
            "Vikram": [
                { company: "Sky Towers", type: "Contract Signing", time: "11:00 AM" }
            ],
            "Anjali": [],
            "Kiran": [
                { company: "Blue Ocean", type: "Follow-up", time: "09:30 AM" }
            ],
            "Ravi": []
        }
    },
    "2024-06-17": {
        date: "June 17",
        day: "Mon",
        leads: 6,
        workers: {
            "Sandeep": [
                { company: "New Horizon", type: "Quote Sent", time: "11:30 AM" }
            ],
            "Priya": [],
            "Vikram": [
                { company: "Future Projects", type: "New Inquiry", time: "10:15 AM" }
            ],
            "Anjali": [],
            "Kiran": [],
            "Ravi": [
                { company: "Smart City", type: "Final Review", time: "02:00 PM" }
            ]
        }
    },
    "2024-06-18": {
        date: "June 18",
        day: "Tue",
        leads: 7,
        workers: {
            "Sandeep": [
                { company: "New Horizon", type: "Quote Sent", time: "11:30 AM" }
            ],
            "Priya": [],
            "Vikram": [
                { company: "Future Projects", type: "New Inquiry", time: "10:15 AM" }
            ],
            "Anjali": [],
            "Kiran": [],
            "Ravi": [
                { company: "Smart City", type: "Final Review", time: "02:00 PM" }
            ]
        }
    },
    "2024-06-19": {
        date: "June 19",
        day: "Wed",
        leads: 9,
        workers: {
            "Sandeep": [
                { company: "Tech Corp", type: "New Inquiry", time: "09:00 AM" }
            ],
            "Priya": [
                { company: "Global Enterprises", type: "Hot Lead", time: "11:00 AM" }
            ],
            "Vikram": [
                { company: "Innovation Labs", type: "Follow-up", time: "02:30 PM" }
            ],
            "Anjali": [
                { company: "Prime Solutions", type: "Negotiation", time: "10:45 AM" }
            ],
            "Kiran": [
                { company: "Next Gen", type: "Site Visit", time: "01:15 PM" }
            ],
            "Ravi": [
                { company: "Smart Systems", type: "Quote Request", time: "03:30 PM" }
            ]
        }
    },
    "2024-06-20": {
        date: "June 20",
        day: "Thu",
        leads: 8,
        workers: {
            "Sandeep": [
                { company: "Digital Works", type: "New Inquiry", time: "09:30 AM" }
            ],
            "Priya": [
                { company: "Tech Giants", type: "Final Discussion", time: "11:45 AM" }
            ],
            "Vikram": [],
            "Anjali": [
                { company: "Future Tech", type: "Contract Review", time: "02:00 PM" }
            ],
            "Kiran": [
                { company: "Innovate Inc", type: "Follow-up", time: "10:15 AM" }
            ],
            "Ravi": [
                { company: "Smart Solutions", type: "Presentation", time: "03:15 PM" }
            ]
        }
    }
};

let leadCurrentDate = "2024-06-14";
let currentLeadWeekDates = [];
let currentLeadCalendarMonth = 5; // June (0-indexed)
let currentLeadCalendarYear = 2024;

// Function to get 7 days for leads
function getLeadWeekDates(selectedDate) {
    const date = new Date(selectedDate);
    const weekDates = [];

    for (let i = 3; i > 0; i--) {
        const prevDate = new Date(date);
        prevDate.setDate(date.getDate() - i);
        const dateString = prevDate.toISOString().split('T')[0];
        weekDates.push(dateString);
    }

    weekDates.push(selectedDate);

    for (let i = 1; i <= 3; i++) {
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + i);
        const dateString = nextDate.toISOString().split('T')[0];
        weekDates.push(dateString);
    }

    return weekDates;
}

function initLeadSection() {
    currentLeadWeekDates = getLeadWeekDates(leadCurrentDate);
    renderLeadDateIndicators();
    renderLeadWorkers();
    updateLeadSummary();
}
function renderLeadDateIndicators() {
    const container = document.querySelector('.lead-date-indicators');
    if (!container) return;

    container.innerHTML = '';

    currentLeadWeekDates.forEach(dateString => {
        const data = leadData[dateString];

        const indicator = document.createElement('div');
        indicator.className = `date-indicator ${dateString === leadCurrentDate ? 'lead-active bg-success text-white' : 'bg-light'}`;

        if (data) {
            indicator.innerHTML = `
                <div class="date-day">${data.day}</div>
                <div class="date-number">${data.date.split(' ')[1]}</div>
                <span class="date-badge badge ${dateString === leadCurrentDate ? 'bg-white text-dark' : 'bg-secondary'}">${data.leads}</span>
            `;
        } else {
            const date = new Date(dateString);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dateDisplay = date.getDate();

            indicator.innerHTML = `
                <div class="date-day">${dayName}</div>
                <div class="date-number">${dateDisplay}</div>
                <span class="date-badge badge bg-secondary">0</span>
            `;
            indicator.style.opacity = '0.5';
        }

        indicator.addEventListener('click', () => {
            if (leadData[dateString]) {
                leadCurrentDate = dateString;
                currentLeadWeekDates = getLeadWeekDates(leadCurrentDate);
                renderLeadDateIndicators();
                renderLeadWorkers();
                updateLeadSummary();
            }
        });

        container.appendChild(indicator);
    });
}

// Updated Calendar render function for Lead
function renderLeadCalendar() {
    const calendarPopup = document.querySelector('.lead-calendar-popup');
    const calendarDates = document.querySelector('.lead-calendar-dates');
    const calendarMonth = document.querySelector('.lead-calendar-month');

    if (!calendarPopup || !calendarDates || !calendarMonth) return;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    calendarMonth.textContent = `${monthNames[currentLeadCalendarMonth]} ${currentLeadCalendarYear}`;

    const firstDay = new Date(currentLeadCalendarYear, currentLeadCalendarMonth, 1);
    const lastDay = new Date(currentLeadCalendarYear, currentLeadCalendarMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let calendarHTML = '';

    weekdays.forEach(day => {
        calendarHTML += `<div class="calendar-weekday">${day}</div>`;
    });

    for (let i = 0; i < startingDay; i++) {
        calendarHTML += `<div class="calendar-date empty"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateString = `${currentLeadCalendarYear}-${String(currentLeadCalendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasData = leadData[dateString];
        const isSelected = dateString === leadCurrentDate;

        let className = 'calendar-date';
        if (hasData) className += ' available';
        if (isSelected) className += ' selected';
        if (!hasData) className += ' empty';

        calendarHTML += `<div class="${className}" data-date="${dateString}">${day}</div>`;
    }

    calendarDates.innerHTML = calendarHTML;

    document.querySelectorAll('.calendar-date.available').forEach(dateEl => {
        dateEl.addEventListener('click', () => {
            const selectedDate = dateEl.getAttribute('data-date');
            leadCurrentDate = selectedDate;
            currentLeadWeekDates = getLeadWeekDates(leadCurrentDate);
            renderLeadDateIndicators();
            renderLeadWorkers();
            updateLeadSummary();
            hideLeadCalendar();
        });
    });
}
function renderLeadWorkers() {
    const container = document.querySelector('.lead-workers-container');
    if (!container) return;

    container.innerHTML = '';

    const data = leadData[leadCurrentDate];
    if (!data) {
        container.innerHTML = '<div class="col-12 text-center text-muted py-4">No data available for selected date</div>';
        return;
    }

    const leadCurrentDateEl = document.querySelector('.lead-current-date');
    if (leadCurrentDateEl) {
        leadCurrentDateEl.textContent = data.date;
    }

    Object.keys(data.workers).forEach(worker => {
        const tasks = data.workers[worker];

        const workerCard = document.createElement('div');
        workerCard.className = 'col-md-6 col-lg-4 mb-3';

        let tasksHTML = '';
        if (tasks.length > 0) {
            tasks.forEach(task => {
                tasksHTML += `
                    <div class="bg-white p-2 rounded border border-success mb-2">
                        <small class="fw-bold d-block">${task.company}</small>
                        <small class="text-muted d-block">${task.type}</small>
                        <small class="text-success">${task.time}</small>
                    </div>
                `;
            });
        } else {
            tasksHTML = '<div class="bg-white p-2 rounded border text-muted"><small>No leads</small></div>';
        }

        workerCard.innerHTML = `
            <div class="worker-card h-100" style="border-left-color: #28a745;">
                <div class="d-flex align-items-center gap-2 mb-2">
                    <div class="worker-avatar" style="background: #28a745;">${worker.charAt(0)}</div>
                    <strong>${worker}</strong>
                </div>
                <div class="d-flex flex-column gap-2">${tasksHTML}</div>
            </div>
        `;

        container.appendChild(workerCard);
    });
}

function updateLeadSummary() {
    const data = leadData[leadCurrentDate];
    if (!data) {
        document.querySelector('.total-leads').textContent = '0';
        document.querySelector('.assigned-lead-workers').textContent = '0';
        document.querySelector('.converted-leads').textContent = '0';
        return;
    }

    const totalLeadsEl = document.querySelector('.total-leads');
    if (totalLeadsEl) {
        totalLeadsEl.textContent = data.leads;
    }

    const assignedWorkers = Object.values(data.workers).filter(tasks => tasks.length > 0).length;
    const assignedWorkersEl = document.querySelector('.assigned-lead-workers');
    if (assignedWorkersEl) {
        assignedWorkersEl.textContent = assignedWorkers;
    }

    const converted = Math.floor(data.leads * 0.2);
    const convertedLeadsEl = document.querySelector('.converted-leads');
    if (convertedLeadsEl) {
        convertedLeadsEl.textContent = converted;
    }
}

// Calendar functions for Lead
function renderLeadCalendar() {
    const calendarPopup = document.querySelector('.lead-calendar-popup');
    const calendarDates = document.querySelector('.lead-calendar-dates');
    const calendarMonth = document.querySelector('.lead-calendar-month');

    if (!calendarPopup || !calendarDates || !calendarMonth) return;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    calendarMonth.textContent = `${monthNames[currentLeadCalendarMonth]} ${currentLeadCalendarYear}`;

    const firstDay = new Date(currentLeadCalendarYear, currentLeadCalendarMonth, 1);
    const lastDay = new Date(currentLeadCalendarYear, currentLeadCalendarMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let calendarHTML = '';

    // Add weekday headers
    weekdays.forEach(day => {
        calendarHTML += `<div class="lead-calendar-weekday">${day}</div>`;
    });

    // Add empty cells
    for (let i = 0; i < startingDay; i++) {
        calendarHTML += `<div class="lead-calendar-date empty"></div>`;
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateString = `${currentLeadCalendarYear}-${String(currentLeadCalendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasData = leadData[dateString];
        const isSelected = dateString === leadCurrentDate;

        let className = 'lead-calendar-date';
        if (hasData) className += ' available';
        if (isSelected) className += ' selected';
        if (!hasData) className += ' empty';

        calendarHTML += `<div class="${className}" data-date="${dateString}">${day}</div>`;
    }

    calendarDates.innerHTML = calendarHTML;

    // Add event listeners
    document.querySelectorAll('.lead-calendar-date.available').forEach(dateEl => {
        dateEl.addEventListener('click', () => {
            const selectedDate = dateEl.getAttribute('data-date');
            leadCurrentDate = selectedDate;
            currentLeadWeekDates = getLeadWeekDates(leadCurrentDate);
            renderLeadDateIndicators();
            renderLeadWorkers();
            updateLeadSummary();
            hideLeadCalendar();
        });
    });
}
// Fixed Lead Calendar positioning
function showLeadCalendar() {
    const calendarPopup = document.querySelector('.lead-calendar-popup');
    const currentDateEl = document.querySelector('.lead-current-date');

    if (calendarPopup && currentDateEl) {
        const rect = currentDateEl.getBoundingClientRect();
        const calendarWidth = 280;
        const calendarHeight = 320;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate positions relative to viewport
        let topPosition = rect.bottom + 5;
        let leftPosition = rect.left;

        // Check if calendar goes beyond bottom of viewport
        if (topPosition + calendarHeight > viewportHeight) {
            topPosition = rect.top - calendarHeight - 5;
        }

        // Check if calendar goes beyond right edge
        if (leftPosition + calendarWidth > viewportWidth) {
            leftPosition = viewportWidth - calendarWidth - 10;
        }

        // Check if calendar goes beyond left edge
        if (leftPosition < 10) {
            leftPosition = 10;
        }

        // Ensure calendar stays within viewport vertically
        if (topPosition < 10) {
            topPosition = 10;
        }
        if (topPosition + calendarHeight > viewportHeight) {
            topPosition = viewportHeight - calendarHeight - 10;
        }

        // Add scroll position
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;

        calendarPopup.style.top = (topPosition + scrollY) + 'px';
        calendarPopup.style.left = (leftPosition + scrollX) + 'px';
        calendarPopup.style.display = 'block';
        calendarPopup.style.zIndex = '1060';

        renderLeadCalendar();

        setTimeout(() => {
            document.addEventListener('click', closeLeadCalendarOnClickOutside);
        }, 0);
    }
}

// Simple centered fallback if positioning fails
function showLeadCalendar() {
    const calendarPopup = document.querySelector('.lead-calendar-popup');
    const currentDateEl = document.querySelector('.lead-current-date');

    if (calendarPopup && currentDateEl) {
        // Always use centered positioning to prevent going out of screen
        calendarPopup.style.position = 'fixed';
        calendarPopup.style.top = '50%';
        calendarPopup.style.left = '50%';
        calendarPopup.style.transform = 'translate(-50%, -50%)';
        calendarPopup.style.zIndex = '1060';
        calendarPopup.style.display = 'block';

        renderLeadCalendar();

        setTimeout(() => {
            document.addEventListener('click', closeLeadCalendarOnClickOutside);
        }, 0);
    }
}

function hideLeadCalendar() {
    const calendarPopup = document.querySelector('.lead-calendar-popup');
    if (calendarPopup) {
        calendarPopup.style.display = 'none';
        document.removeEventListener('click', closeLeadCalendarOnClickOutside);
    }
}

function closeLeadCalendarOnClickOutside(e) {
    const calendarPopup = document.querySelector('.lead-calendar-popup');
    const currentDateEl = document.querySelector('.lead-current-date');

    if (calendarPopup &&
        !calendarPopup.contains(e.target) &&
        !currentDateEl.contains(e.target)) {
        hideLeadCalendar();
    }
}
function hideLeadCalendar() {
    const calendarPopup = document.querySelector('.lead-calendar-popup');
    if (calendarPopup) {
        calendarPopup.style.display = 'none';
        document.removeEventListener('click', closeLeadCalendarOnClickOutside);
    }
}

function closeLeadCalendarOnClickOutside(e) {
    const calendarPopup = document.querySelector('.lead-calendar-popup');
    const currentDateEl = document.querySelector('.lead-current-date');

    if (calendarPopup &&
        !calendarPopup.contains(e.target) &&
        !currentDateEl.contains(e.target)) {
        hideLeadCalendar();
    }
}

// Calendar navigation for Lead
document.querySelector('.lead-calendar-prev')?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentLeadCalendarMonth--;
    if (currentLeadCalendarMonth < 0) {
        currentLeadCalendarMonth = 11;
        currentLeadCalendarYear--;
    }
    renderLeadCalendar();
});

document.querySelector('.lead-calendar-next')?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentLeadCalendarMonth++;
    if (currentLeadCalendarMonth > 11) {
        currentLeadCalendarMonth = 0;
        currentLeadCalendarYear++;
    }
    renderLeadCalendar();
});

// Custom date selection with calendar for Lead
const leadCurrentDateEl = document.querySelector('.lead-current-date');
if (leadCurrentDateEl) {
    leadCurrentDateEl.addEventListener('click', (e) => {
        e.stopPropagation();
        showLeadCalendar();
    });
}

// Day navigation buttons for Lead
const leadPrevBtn = document.querySelector('.lead-prev-btn');
if (leadPrevBtn) {
    leadPrevBtn.addEventListener('click', () => {
        const currentDate = new Date(leadCurrentDate);
        currentDate.setDate(currentDate.getDate() - 1);
        const newDate = currentDate.toISOString().split('T')[0];

        if (leadData[newDate]) {
            leadCurrentDate = newDate;
            currentLeadWeekDates = getLeadWeekDates(leadCurrentDate);
            renderLeadDateIndicators();
            renderLeadWorkers();
            updateLeadSummary();
        }
    });
}

const leadNextBtn = document.querySelector('.lead-next-btn');
if (leadNextBtn) {
    leadNextBtn.addEventListener('click', () => {
        const currentDate = new Date(leadCurrentDate);
        currentDate.setDate(currentDate.getDate() + 1);
        const newDate = currentDate.toISOString().split('T')[0];

        if (leadData[newDate]) {
            leadCurrentDate = newDate;
            currentLeadWeekDates = getLeadWeekDates(leadCurrentDate);
            renderLeadDateIndicators();
            renderLeadWorkers();
            updateLeadSummary();
        }
    });
}

// Initialize lead section
initLeadSection();
// Support Data
const supportData = {
    agents: [
        {
            id: 1,
            name: "SURAJ K",
            role: "Senior Agent",
            email: "suraj.k@company.com",
            total: 11,
            solved: 7,
            pending: 3,
            solvedTasks: [
                { ticketId: "TKT-001", customer: "ABC Corp", issue: "Technical Support", solvedDate: "2024-01-15", rating: 5 },
                { ticketId: "TKT-003", customer: "XYZ Ltd", issue: "Billing Issue", solvedDate: "2024-01-14", rating: 4 },
                { ticketId: "TKT-005", customer: "Global Tech", issue: "Feature Request", solvedDate: "2024-01-13", rating: 5 },
                { ticketId: "TKT-007", customer: "Innovate Inc", issue: "Technical Support", solvedDate: "2024-01-12", rating: 4 },
                { ticketId: "TKT-009", customer: "Tech Solutions", issue: "Bug Report", solvedDate: "2024-01-11", rating: 5 },
                { ticketId: "TKT-011", customer: "Digital Works", issue: "Account Issue", solvedDate: "2024-01-10", rating: 4 },
                { ticketId: "TKT-013", customer: "Smart Systems", issue: "Technical Support", solvedDate: "2024-01-09", rating: 5 }
            ],
            pendingTasks: [
                { ticketId: "TKT-002", customer: "Beta Corp", issue: "Technical Support", priority: "High", dueDate: "2024-01-20" },
                { ticketId: "TKT-004", customer: "Gamma Ltd", issue: "Billing Issue", priority: "Medium", dueDate: "2024-01-22" },
                { ticketId: "TKT-006", customer: "Delta Tech", issue: "Feature Request", priority: "Low", dueDate: "2024-01-25" }
            ]
        },
        {
            id: 2,
            name: "Rohit A",
            role: "Team Lead",
            email: "rohit.a@company.com",
            total: 10,
            solved: 4,
            pending: 6,
            solvedTasks: [
                { ticketId: "TKT-015", customer: "Epsilon Corp", issue: "Technical Support", solvedDate: "2024-01-14", rating: 4 },
                { ticketId: "TKT-017", customer: "Zeta Ltd", issue: "Billing Issue", solvedDate: "2024-01-13", rating: 5 },
                { ticketId: "TKT-019", customer: "Eta Tech", issue: "Feature Request", solvedDate: "2024-01-12", rating: 4 },
                { ticketId: "TKT-021", customer: "Theta Inc", issue: "Bug Report", solvedDate: "2024-01-11", rating: 5 }
            ],
            pendingTasks: [
                { ticketId: "TKT-016", customer: "Iota Corp", issue: "Technical Support", priority: "Urgent", dueDate: "2024-01-18" },
                { ticketId: "TKT-018", customer: "Kappa Ltd", issue: "Billing Issue", priority: "High", dueDate: "2024-01-19" },
                { ticketId: "TKT-020", customer: "Lambda Tech", issue: "Feature Request", priority: "Medium", dueDate: "2024-01-21" },
                { ticketId: "TKT-022", customer: "Mu Systems", issue: "Account Issue", priority: "Medium", dueDate: "2024-01-23" },
                { ticketId: "TKT-024", customer: "Nu Works", issue: "Technical Support", priority: "Low", dueDate: "2024-01-26" },
                { ticketId: "TKT-026", customer: "Xi Solutions", issue: "Bug Report", priority: "High", dueDate: "2024-01-24" }
            ]
        },
        {
            id: 3,
            name: "Mayur H",
            role: "Junior Agent",
            email: "mayur.h@company.com",
            total: 15,
            solved: 9,
            pending: 6,
            solvedTasks: [
                { ticketId: "TKT-027", customer: "Omicron Corp", issue: "Technical Support", solvedDate: "2024-01-15", rating: 4 },
                { ticketId: "TKT-029", customer: "Pi Ltd", issue: "Billing Issue", solvedDate: "2024-01-14", rating: 5 },
                { ticketId: "TKT-031", customer: "Rho Tech", issue: "Feature Request", solvedDate: "2024-01-13", rating: 4 },
                { ticketId: "TKT-033", customer: "Sigma Inc", issue: "Bug Report", solvedDate: "2024-01-12", rating: 5 },
                { ticketId: "TKT-035", customer: "Tau Systems", issue: "Account Issue", solvedDate: "2024-01-11", rating: 4 },
                { ticketId: "TKT-037", customer: "Upsilon Works", issue: "Technical Support", solvedDate: "2024-01-10", rating: 5 },
                { ticketId: "TKT-039", customer: "Phi Solutions", issue: "Billing Issue", solvedDate: "2024-01-09", rating: 4 },
                { ticketId: "TKT-041", customer: "Chi Corp", issue: "Feature Request", solvedDate: "2024-01-08", rating: 5 },
                { ticketId: "TKT-043", customer: "Psi Ltd", issue: "Bug Report", solvedDate: "2024-01-07", rating: 4 }
            ],
            pendingTasks: [
                { ticketId: "TKT-028", customer: "Omega Corp", issue: "Technical Support", priority: "High", dueDate: "2024-01-19" },
                { ticketId: "TKT-030", customer: "Alpha Ltd", issue: "Billing Issue", priority: "Medium", dueDate: "2024-01-21" },
                { ticketId: "TKT-032", customer: "Beta Tech", issue: "Feature Request", priority: "Low", dueDate: "2024-01-25" },
                { ticketId: "TKT-034", customer: "Gamma Inc", issue: "Account Issue", priority: "Medium", dueDate: "2024-01-22" },
                { ticketId: "TKT-036", customer: "Delta Systems", issue: "Technical Support", priority: "High", dueDate: "2024-01-20" },
                { ticketId: "TKT-038", customer: "Epsilon Works", issue: "Bug Report", priority: "Urgent", dueDate: "2024-01-18" }
            ]
        },
        {
            id: 4,
            name: "Priya M",
            role: "Senior Agent",
            email: "priya.m@company.com",
            total: 13,
            solved: 8,
            pending: 5,
            solvedTasks: [
                { ticketId: "TKT-045", customer: "Zeta Corp", issue: "Technical Support", solvedDate: "2024-01-15", rating: 5 },
                { ticketId: "TKT-047", customer: "Eta Ltd", issue: "Billing Issue", solvedDate: "2024-01-14", rating: 4 },
                { ticketId: "TKT-049", customer: "Theta Tech", issue: "Feature Request", solvedDate: "2024-01-13", rating: 5 },
                { ticketId: "TKT-051", customer: "Iota Inc", issue: "Bug Report", solvedDate: "2024-01-12", rating: 4 },
                { ticketId: "TKT-053", customer: "Kappa Systems", issue: "Account Issue", solvedDate: "2024-01-11", rating: 5 },
                { ticketId: "TKT-055", customer: "Lambda Works", issue: "Technical Support", solvedDate: "2024-01-10", rating: 4 },
                { ticketId: "TKT-057", customer: "Mu Solutions", issue: "Billing Issue", solvedDate: "2024-01-09", rating: 5 },
                { ticketId: "TKT-059", customer: "Nu Corp", issue: "Feature Request", solvedDate: "2024-01-08", rating: 4 }
            ],
            pendingTasks: [
                { ticketId: "TKT-046", customer: "Xi Ltd", issue: "Technical Support", priority: "Medium", dueDate: "2024-01-21" },
                { ticketId: "TKT-048", customer: "Omicron Tech", issue: "Billing Issue", priority: "High", dueDate: "2024-01-19" },
                { ticketId: "TKT-050", customer: "Pi Inc", issue: "Feature Request", priority: "Low", dueDate: "2024-01-26" },
                { ticketId: "TKT-052", customer: "Rho Systems", issue: "Account Issue", priority: "Medium", dueDate: "2024-01-23" },
                { ticketId: "TKT-054", customer: "Sigma Works", issue: "Bug Report", priority: "High", dueDate: "2024-01-20" }
            ]
        },
        {
            id: 5,
            name: "Ankit R",
            role: "Team Lead",
            email: "ankit.r@company.com",
            total: 9,
            solved: 4,
            pending: 5,
            solvedTasks: [
                { ticketId: "TKT-061", customer: "Tau Corp", issue: "Technical Support", solvedDate: "2024-01-14", rating: 5 },
                { ticketId: "TKT-063", customer: "Upsilon Ltd", issue: "Billing Issue", solvedDate: "2024-01-13", rating: 4 },
                { ticketId: "TKT-065", customer: "Phi Tech", issue: "Feature Request", solvedDate: "2024-01-12", rating: 5 },
                { ticketId: "TKT-067", customer: "Chi Inc", issue: "Bug Report", solvedDate: "2024-01-11", rating: 4 }
            ],
            pendingTasks: [
                { ticketId: "TKT-062", customer: "Psi Corp", issue: "Technical Support", priority: "Urgent", dueDate: "2024-01-17" },
                { ticketId: "TKT-064", customer: "Omega Ltd", issue: "Billing Issue", priority: "High", dueDate: "2024-01-19" },
                { ticketId: "TKT-066", customer: "Alpha Tech", issue: "Feature Request", priority: "Medium", dueDate: "2024-01-22" },
                { ticketId: "TKT-068", customer: "Beta Inc", issue: "Account Issue", priority: "Medium", dueDate: "2024-01-24" },
                { ticketId: "TKT-070", customer: "Gamma Systems", issue: "Bug Report", priority: "High", dueDate: "2024-01-21" }
            ]
        }
    ]
};

// Initialize Support Status
function initSupportStatus() {
    renderSupportAgents();
    updateSupportStats();
    setupSupportEventListeners();
}

// Render Support Agents
function renderSupportAgents() {
    const container = document.getElementById('supportAgentsList');
    if (!container) return;

    container.innerHTML = '';

    supportData.agents.forEach(agent => {
        const row = document.createElement('tr');
        row.className = 'support-agent-row';
        row.style.cursor = 'pointer';
        row.setAttribute('data-agent-id', agent.id);

        row.innerHTML = `
            <td>
                <div class="d-flex align-items-center">
                    <div class="bg-secondary bg-opacity-10 rounded-circle p-2 me-2">
                        <i class="bi bi-person-badge text-secondary"></i>
                    </div>
                    <div>
                        <div class="fw-bold text-dark small">${agent.name}</div>
                        <small class="text-muted">${agent.role}</small>
                    </div>
                </div>
            </td>
            <td><span class="badge bg-secondary rounded-pill px-2">${agent.total}</span></td>
            <td><span class="badge bg-success rounded-pill px-2">${agent.solved}</span></td>
            <td><span class="badge bg-warning text-dark rounded-pill px-2">${agent.pending}</span></td>
        `;

        row.addEventListener('click', () => {
            showAgentDetails(agent.id);
        });

        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = '#f8f9fa';
            row.style.transform = 'translateX(2px)';
        });

        row.addEventListener('mouseleave', () => {
            row.style.backgroundColor = '';
            row.style.transform = 'translateX(0)';
        });

        container.appendChild(row);
    });
}

// Update Support Statistics
function updateSupportStats() {
    const totalSolved = supportData.agents.reduce((sum, agent) => sum + agent.solved, 0);
    const totalPending = supportData.agents.reduce((sum, agent) => sum + agent.pending, 0);

    const totalSolvedEl = document.querySelector('.total-solved');
    const totalPendingEl = document.querySelector('.total-pending');

    if (totalSolvedEl) {
        totalSolvedEl.textContent = totalSolved;
    }
    if (totalPendingEl) {
        totalPendingEl.textContent = totalPending;
    }
}

// Show Agent Details Modal
function showAgentDetails(agentId) {
    const agent = supportData.agents.find(a => a.id === agentId);
    if (!agent) return;

    // Update modal title and agent info
    document.getElementById('agentModalTitle').textContent = `${agent.name} - ${agent.role}`;
    document.getElementById('agentName').textContent = agent.name;
    document.getElementById('agentRole').textContent = agent.role;
    document.getElementById('agentEmail').textContent = agent.email;

    // Update stats
    document.getElementById('modalTotalTasks').textContent = agent.total;
    document.getElementById('modalSolvedTasks').textContent = agent.solved;
    document.getElementById('modalPendingTasks').textContent = agent.pending;

    // Update tab counts
    document.getElementById('solvedCount').textContent = agent.solvedTasks.length;
    document.getElementById('pendingCount').textContent = agent.pendingTasks.length;

    // Render solved tasks
    renderSolvedTasks(agent.solvedTasks);

    // Render pending tasks
    renderPendingTasks(agent.pendingTasks, agentId);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('supportAgentModal'));
    modal.show();
}

// Render Solved Tasks
function renderSolvedTasks(solvedTasks) {
    const container = document.getElementById('solvedTasksList');
    if (!container) return;

    container.innerHTML = '';

    solvedTasks.forEach(task => {
        const row = document.createElement('tr');

        // Generate star rating
        const stars = '★'.repeat(task.rating) + '☆'.repeat(5 - task.rating);

        row.innerHTML = `
            <td class="small fw-bold">${task.ticketId}</td>
            <td class="small">${task.customer}</td>
            <td class="small">${task.issue}</td>
            <td class="small">${new Date(task.solvedDate).toLocaleDateString()}</td>
            <td class="small text-warning">${stars}</td>
        `;

        container.appendChild(row);
    });
}

// Render Pending Tasks
function renderPendingTasks(pendingTasks, agentId) {
    const container = document.getElementById('pendingTasksList');
    if (!container) return;

    container.innerHTML = '';

    pendingTasks.forEach(task => {
        const row = document.createElement('tr');

        // Get priority badge class
        const priorityClass = getPriorityClass(task.priority);

        row.innerHTML = `
            <td class="small fw-bold">${task.ticketId}</td>
            <td class="small">${task.customer}</td>
            <td class="small">${task.issue}</td>
            <td class="small"><span class="badge ${priorityClass}">${task.priority}</span></td>
            <td class="small">${new Date(task.dueDate).toLocaleDateString()}</td>
            <td class="small">
                <button class="btn btn-sm btn-outline-success mark-solved-btn" data-ticket="${task.ticketId}" data-agent="${agentId}">
                    <i class="bi bi-check-lg"></i>
                </button>
            </td>
        `;

        container.appendChild(row);
    });

    // Add event listeners to mark as solved buttons
    document.querySelectorAll('.mark-solved-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const ticketId = this.getAttribute('data-ticket');
            const agentId = parseInt(this.getAttribute('data-agent'));
            markTaskAsSolved(ticketId, agentId);
        });
    });
}

// Get priority badge class
function getPriorityClass(priority) {
    const classes = {
        'Low': 'bg-secondary',
        'Medium': 'bg-info',
        'High': 'bg-warning',
        'Urgent': 'bg-danger'
    };
    return classes[priority] || 'bg-secondary';
}

// Mark task as solved
function markTaskAsSolved(ticketId, agentId) {
    const agent = supportData.agents.find(a => a.id === agentId);
    if (!agent) return;

    // Find the task in pending tasks
    const taskIndex = agent.pendingTasks.findIndex(task => task.ticketId === ticketId);
    if (taskIndex === -1) return;

    const task = agent.pendingTasks[taskIndex];

    // Remove from pending tasks
    agent.pendingTasks.splice(taskIndex, 1);

    // Add to solved tasks
    agent.solvedTasks.unshift({
        ...task,
        solvedDate: new Date().toISOString().split('T')[0],
        rating: 5 // Default rating
    });

    // Update agent stats
    agent.solved++;
    agent.pending--;
    agent.total = agent.solved + agent.pending;

    // Update UI
    renderSupportAgents();
    updateSupportStats();

    // Refresh modal if it's open for this agent
    const modal = bootstrap.Modal.getInstance(document.getElementById('supportAgentModal'));
    if (modal) {
        showAgentDetails(agentId);
    }

    showToast(`Task ${ticketId} marked as solved`, 'success');
}

// Setup Event Listeners
function setupSupportEventListeners() {
    // Assign new task button
    const assignTaskBtn = document.getElementById('assignNewTask');
    if (assignTaskBtn) {
        assignTaskBtn.addEventListener('click', showAssignTaskModal);
    }

    // Save task button
    const saveTaskBtn = document.getElementById('saveTask');
    if (saveTaskBtn) {
        saveTaskBtn.addEventListener('click', saveNewTask);
    }
}

// Show Assign Task Modal
function showAssignTaskModal() {
    const modal = new bootstrap.Modal(document.getElementById('assignTaskModal'));
    modal.show();
}

// Save New Task
function saveNewTask() {
    const form = document.getElementById('assignTaskForm');
    const formData = new FormData(form);

    // Get current agent from open modal
    const agentName = document.getElementById('agentName').textContent;
    const agent = supportData.agents.find(a => a.name === agentName);

    if (!agent) return;

    const newTask = {
        ticketId: `TKT-${String(agent.pendingTasks.length + 100).padStart(3, '0')}`,
        customer: document.getElementById('taskCustomer').value,
        issue: document.getElementById('taskIssue').value,
        priority: document.getElementById('taskPriority').value,
        dueDate: document.getElementById('taskDueDate').value
    };

    // Add to agent's pending tasks
    agent.pendingTasks.push(newTask);

    // Update agent stats
    agent.pending++;
    agent.total = agent.solved + agent.pending;

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('assignTaskModal'));
    if (modal) {
        modal.hide();
    }

    // Reset form
    form.reset();

    // Update UI
    renderSupportAgents();
    updateSupportStats();

    // Refresh agent modal
    showAgentDetails(agent.id);

    showToast('New task assigned successfully', 'success');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initSupportStatus();
});



let currentDate1 = new Date('2023-12-15');

// Format date for display
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Update the displayed date
function updateDateDisplay() {
    document.getElementById('currentDate').textContent = formatDate(currentDate1);
    document.getElementById('datePicker').valueAsDate = currentDate1;
}

// Previous date button
document.getElementById('prevDate').addEventListener('click', function () {
    currentDate1.setDate(currentDate1.getDate() - 1);
    updateDateDisplay();
    // In a real app, you would reload data for the new date here
});

// Next date button
document.getElementById('nextDate').addEventListener('click', function () {
    currentDate1.setDate(currentDate1.getDate() + 1);
    updateDateDisplay();
    // In a real app, you would reload data for the new date here
});

// Apply date from modal
document.getElementById('applyDate').addEventListener('click', function () {
    const datePicker = document.getElementById('datePicker');
    currentDate = new Date(datePicker.value);
    updateDateDisplay();

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('dateModal'));
    modal.hide();

    // In a real app, you would reload data for the new date here
});

// Quick date selection
document.querySelectorAll('.date-quick').forEach(button => {
    button.addEventListener('click', function () {
        const days = parseInt(this.getAttribute('data-days'));
        currentDate1 = new Date();
        currentDate1.setDate(currentDate1.getDate() + days);
        updateDateDisplay();

        // Close modal and apply
        const modal = bootstrap.Modal.getInstance(document.getElementById('dateModal'));
        modal.hide();

        // In a real app, you would reload data for the new date here
    });
});



// Phone Call Modal Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Message character counter
    const callMessage = document.getElementById('callMessage');
    if (callMessage) {
        callMessage.addEventListener('input', function () {
            const charCount = this.value.length;
            document.getElementById('messageCharCount').textContent = charCount + '/500';
        });
    }

    // Show/hide message section based on radio selection
    const messageOptions = document.querySelectorAll('input[name="messageOption"]');
    messageOptions.forEach(radio => {
        radio.addEventListener('change', function () {
            const messageSection = document.getElementById('messageSection');
            if (this.value === 'send') {
                messageSection.style.display = 'block';
                document.getElementById('callMessage').focus();
            } else {
                messageSection.style.display = 'none';
            }
        });
    });

    // Phone number validation - allow only numbers
    const callPhoneNumber = document.getElementById('callPhoneNumber');
    if (callPhoneNumber) {
        callPhoneNumber.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '');
        });
    }

    // Auto-focus on phone number when modal opens
    const phoneCallModal = document.getElementById('phoneCallModal');
    if (phoneCallModal) {
        phoneCallModal.addEventListener('shown.bs.modal', function () {
            document.getElementById('callPhoneNumber').focus();
        });

        // Reset form when modal closes
        phoneCallModal.addEventListener('hidden.bs.modal', function () {
            document.getElementById('phoneCallForm').reset();
            document.getElementById('messageSection').style.display = 'none';
            document.getElementById('messageCharCount').textContent = '0/500';
        });
    }
});

// Initiate phone call function
function initiatePhoneCall() {
    const phoneNumber = document.getElementById('callPhoneNumber').value;
    const callType = document.querySelector('input[name="callType"]:checked').value;
    const messageOption = document.querySelector('input[name="messageOption"]:checked').value;
    const message = document.getElementById('callMessage').value;

    // Validation
    if (!phoneNumber || phoneNumber.length !== 10) {
        alert('Please enter a valid 10-digit phone number');
        document.getElementById('callPhoneNumber').focus();
        return;
    }

    if (messageOption === 'send' && (!message || message.trim() === '')) {
        alert('Please enter a message to send');
        document.getElementById('callMessage').focus();
        return;
    }

    // Prepare call data
    const callData = {
        phoneNumber: phoneNumber,
        callType: callType,
        messageOption: messageOption,
        message: messageOption === 'send' ? message : null,
        timestamp: new Date().toISOString()
    };

    // Here you would typically make an API call to your backend
    console.log('Call initiated:', callData);

    // Show success message based on options
    let successMessage = `Call ${callType === 'now' ? 'initiated' : 'scheduled'} to ${phoneNumber}`;
    if (messageOption === 'send') {
        successMessage += ' with message';
    }

    alert(successMessage);

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('phoneCallModal'));
    modal.hide();

    // You can add actual API call here:
    // sendCallRequest(callData);
}

// Example API function (replace with your actual endpoint)
function sendCallRequest(callData) {
    fetch('/api/make-call', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(callData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Call API response:', data);
        })
        .catch(error => {
            console.error('Error making call:', error);
        });
}
// User Profile Management JavaScript
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentNode.querySelector('button');
    const icon = button.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function toggleDisplayPassword() {
    const input = document.getElementById('displayPassword');
    const button = input.parentNode.querySelector('button');
    const icon = button.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        input.value = 'actual_password_123';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        input.value = '••••••••';
        icon.className = 'fas fa-eye';
    }
}

function copyToClipboard(inputId) {
    const input = document.getElementById(inputId);
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand('copy');

    const originalText = input.parentNode.querySelector('button').innerHTML;
    input.parentNode.querySelector('button').innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
        input.parentNode.querySelector('button').innerHTML = originalText;
    }, 2000);
}

function updateUserProfile() {
    const fullName = document.getElementById('userFullName').value;
    const position = document.getElementById('userPosition').value;
    const email = document.getElementById('userEmail').value;
    const phone = document.getElementById('userPhone').value;

    if (!fullName || !email) {
        alert('Please fill in all required fields');
        return;
    }

    // Update header display
    document.querySelector('.header-user .fw-bold').textContent = fullName;
    document.querySelector('.header-user .text-muted').innerHTML =
        `<i class="fas fa-shield-alt me-1"></i>${position.charAt(0).toUpperCase() + position.slice(1)}`;

    // Update avatar
    const avatar = document.querySelector('.header-user img');
    avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=615EF0&color=fff&size=40&bold=true`;

    const modal = bootstrap.Modal.getInstance(document.getElementById('userProfileModal'));
    modal.hide();

    alert('Profile updated successfully!');
}

function changeUserPassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!currentPassword || !newPassword || !confirmPassword) {
        alert('Please fill in all password fields');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match');
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        alert('Password does not meet the requirements. Please check the password guidelines.');
        return;
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('changePasswordModal'));
    modal.hide();
    document.getElementById('changePasswordForm').reset();

    alert('Password changed successfully!');
}

function generateNewPassword() {
    const newPassword = generateStrongPassword();
    document.getElementById('displayPassword').value = newPassword;
    document.getElementById('displayPassword').type = 'text';
    document.getElementById('lastUpdated').textContent = 'Just now';

    alert('New password generated! Make sure to save it securely.');
}

function generateStrongPassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// Initialize modal event listeners
document.addEventListener('DOMContentLoaded', function () {
    const modals = ['userProfileModal', 'changePasswordModal', 'viewCredentialsModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        modal.addEventListener('hidden.bs.modal', function () {
            if (modalId === 'viewCredentialsModal') {
                document.getElementById('displayPassword').type = 'password';
                document.getElementById('displayPassword').value = '••••••••';
            }
        });
    });
});


// Payment Data
const paymentData = [
    {
        id: 1,
        company: "Sp Group",
        invoice: "INV-001",
        amount: 34295,
        dueDate: "2023-12-15",
        status: "overdue",
        contact: "John Smith (555-1234)",
        history: [
            { description: "Initial Payment", amount: 10000, status: "paid" },
            { description: "Second Installment", amount: 24295, status: "pending" }
        ]
    },
    {
        id: 2,
        company: "Tech Corp",
        invoice: "INV-002",
        amount: 28150,
        dueDate: "2023-12-20",
        status: "due_soon",
        contact: "Sarah Johnson (555-5678)",
        history: [
            { description: "Advance Payment", amount: 5000, status: "paid" }
        ]
    },
    {
        id: 3,
        company: "Global Enterprises",
        invoice: "INV-003",
        amount: 45800,
        dueDate: "2023-12-25",
        status: "on_time",
        contact: "Mike Wilson (555-9012)",
        history: [
            { description: "First Installment", amount: 15000, status: "paid" }
        ]
    }
];

// Initialize Payment Reminders
function initPaymentReminders() {
    renderPaymentReminders();
    updatePaymentStats();
    setupPaymentEventListeners();
}

// Render Payment Reminders
function renderPaymentReminders() {
    const container = document.getElementById('paymentRemindersList');
    if (!container) return;

    container.innerHTML = '';

    paymentData.forEach(payment => {
        const statusConfig = getStatusConfig(payment.status);
        const dueDate = new Date(payment.dueDate);
        const formattedDate = dueDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

        const paymentItem = document.createElement('div');
        paymentItem.className = 'payment-reminder-item p-3 mb-2 border rounded';
        paymentItem.setAttribute('data-bs-toggle', 'modal');
        paymentItem.setAttribute('data-bs-target', `#paymentModal${payment.id}`);
        paymentItem.style.cursor = 'pointer';
        paymentItem.style.transition = 'all 0.2s ease';

        paymentItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-1">${payment.company}</h6>
                    <small class="text-muted">${payment.invoice}</small>
                </div>
                <div class="text-end">
                    <div class="fw-bold text-success">$${payment.amount.toLocaleString()}</div>
                    <span class="badge ${statusConfig.badgeClass} rounded-pill px-2">${statusConfig.text}</span>
                    <div class="text-muted small">Due: ${formattedDate}</div>
                </div>
            </div>
        `;

        paymentItem.addEventListener('mouseenter', () => {
            paymentItem.style.transform = 'translateY(-2px)';
            paymentItem.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });

        paymentItem.addEventListener('mouseleave', () => {
            paymentItem.style.transform = 'translateY(0)';
            paymentItem.style.boxShadow = 'none';
        });

        container.appendChild(paymentItem);
    });
}

// Get status configuration
function getStatusConfig(status) {
    const config = {
        overdue: { badgeClass: 'bg-danger', text: 'Overdue' },
        due_soon: { badgeClass: 'bg-warning', text: 'Due Soon' },
        on_time: { badgeClass: 'bg-success', text: 'On Time' },
        paid: { badgeClass: 'bg-info', text: 'Paid' }
    };
    return config[status] || config.on_time;
}

// Update payment statistics
function updatePaymentStats() {
    const totalPending = paymentData.reduce((sum, payment) => sum + payment.amount, 0);
    const overdueCount = paymentData.filter(payment => payment.status === 'overdue').length;

    const totalPendingEl = document.querySelector('.total-pending-amount');
    const overdueCountEl = document.querySelector('.overdue-count');

    if (totalPendingEl) {
        totalPendingEl.textContent = `$${totalPending.toLocaleString()}`;
    }
    if (overdueCountEl) {
        overdueCountEl.textContent = overdueCount;
    }
}

// Setup event listeners
function setupPaymentEventListeners() {
    // Export button
    const exportBtn = document.getElementById('exportPayments');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportPayments);
    }

    // Save payment button
    const savePaymentBtn = document.getElementById('savePayment');
    if (savePaymentBtn) {
        savePaymentBtn.addEventListener('click', saveNewPayment);
    }

    // Modal event listeners
    setupModalEventListeners();
}

// Setup modal event listeners
function setupModalEventListeners() {
    // Send reminder buttons
    document.querySelectorAll('.send-reminder-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const modal = this.closest('.modal');
            const companyName = modal.querySelector('.modal-title').textContent.split(' - ')[1];
            sendPaymentReminder(companyName);
        });
    });

    // Mark as paid buttons
    document.querySelectorAll('.mark-paid-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const modal = this.closest('.modal');
            const paymentId = modal.id.replace('paymentModal', '');
            markPaymentAsPaid(parseInt(paymentId));
        });
    });
}

// Send payment reminder
function sendPaymentReminder(companyName) {
    // Show loading state
    const buttons = document.querySelectorAll('.send-reminder-btn');
    buttons.forEach(btn => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-hourglass-split me-1"></i>Sending...';
        btn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;

            // Show success message
            showToast(`Reminder sent to ${companyName}`, 'success');
        }, 1500);
    });
}

// Mark payment as paid
function markPaymentAsPaid(paymentId) {
    const payment = paymentData.find(p => p.id === paymentId);
    if (payment) {
        payment.status = 'paid';

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById(`paymentModal${paymentId}`));
        if (modal) {
            modal.hide();
        }

        // Update UI
        renderPaymentReminders();
        updatePaymentStats();

        // Show success message
        showToast(`${payment.company} marked as paid`, 'success');
    }
}

// Save new payment
function saveNewPayment() {
    const form = document.getElementById('addPaymentForm');
    const formData = new FormData(form);

    const newPayment = {
        id: paymentData.length + 1,
        company: document.getElementById('companyName').value,
        invoice: document.getElementById('invoiceNumber').value,
        amount: parseFloat(document.getElementById('amount').value),
        dueDate: document.getElementById('dueDate').value,
        status: 'on_time',
        contact: document.getElementById('contactInfo').value,
        history: []
    };

    // Add to payment data
    paymentData.push(newPayment);

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addPaymentModal'));
    if (modal) {
        modal.hide();
    }

    // Reset form
    form.reset();

    // Update UI
    renderPaymentReminders();
    updatePaymentStats();

    // Show success message
    showToast('New payment added successfully', 'success');
}

// Export payments
function exportPayments() {
    // Show loading state
    const btn = document.getElementById('exportPayments');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-hourglass-split me-1"></i>Exporting...';
    btn.disabled = true;

    // Simulate export process
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;

        // Create CSV content
        const headers = ['Company', 'Invoice', 'Amount', 'Due Date', 'Status'];
        const csvContent = [
            headers.join(','),
            ...paymentData.map(payment => [
                payment.company,
                payment.invoice,
                payment.amount,
                new Date(payment.dueDate).toLocaleDateString(),
                getStatusConfig(payment.status).text
            ].join(','))
        ].join('\n');

        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `payments_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        showToast('Payments exported successfully', 'success');
    }, 2000);
}

// Show toast notification
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }

    const toastId = 'toast-' + Date.now();
    const toastHtml = `
        <div id="${toastId}" class="toast align-items-center text-white bg-${type} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHtml);

    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();

    // Remove toast from DOM after it's hidden
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}


// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initPaymentReminders();
});
function navigateToContact() {
    // Navigate to contact.html when the card is clicked
    window.location.href = 'contact.html';
}
function navigateTosupplier() {
    // Navigate to contact.html when the card is clicked
    window.location.href = 'supplier.html';
}

function navigateToDisel() {
    // Navigate to contact.html when the card is clicked
    window.location.href = 'Disel.html';
}
function navigateToCustomer() {
    // Navigate to contact.html when the card is clicked
    window.location.href = 'customer.html';
}

function navigateToRemainder() {
    // Navigate to contact.html when the card is clicked
    window.location.href = 'remainder.html';
}
function navigateToMachine() {
    // Navigate to contact.html when the card is clicked
    window.location.href = 'Allmachine.html';
}




// Initialize
updateDateDisplay();

