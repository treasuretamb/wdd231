document.addEventListener('DOMContentLoaded', function() {
    const courses = [
        { code: "CSE 110", title: "Introduction to Programming", credits: 2, completed: true, category: "CSE" },
        { code: "WDD 130", title: "Web Fundamentals", credits: 2, completed: true, category: "WDD" },
        { code: "WDD 131", title: "Dynamic Web Fundamentals", credits: 2, completed: false, category: "WDD" },
        { code: "CSE 111", title: "Programming with Functions", credits: 2, completed: true, category: "CSE" },
        { code: "CSE 210", title: "Programming with Classes", credits: 2, completed: true, category: "CSE" },
        { code: "WDD 230", title: "Web Frontend Development I", credits: 3, completed: true, category: "WDD" },
        { code: "WDD 231", title: "Web Frontend Development II", credits: 2, completed: false, category: "WDD" },
        { code: "CSE 212", title: "Programming with Data Structures", credits: 3, completed: false, category: "CSE" },
        { code: "WDD 330", title: "Web Frontend Development II", credits: 3, completed: true, category: "WDD" },
        { code: "CSE 340", title: "Web Backend Development", credits: 3, completed: true, category: "CSE" },
        { code: "CSE 341", title: "Web Services", credits: 3, completed: false, category: "CSE" },
        { code: "WDD 430", title: "Advanced Web Development", credits: 3, completed: false, category: "WDD" },
        { code: "ITM 111", title: "Introduction to Databases", credits: 3, completed: true, category: "ITM" }
    ];

    const container = document.getElementById('courses-container');
    const totalCreditsEl = document.getElementById('total-credits');
    const filterButtons = document.querySelectorAll('.filter-buttons button');

    function displayCourses(filteredCourses) {
        container.innerHTML = '';

        filteredCourses.forEach(course => {
            const card = document.createElement('div');
            card.classList.add('course-card');
            if (course.completed) card.classList.add('completed');

            card.innerHTML = `
                <h3>${course.code}</h3>
                <p>${course.title}</p>
                <p><strong>Credits:</strong> ${course.credits}</p>
                ${course.completed ? '<p style="color: #4caf50; font-weight: bold;">✓ Completed</p>' : '<p style="color: #888;">In Progress</p>'}
            `;
            container.appendChild(card);
        });

        const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsEl.textContent = total;
    }

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            
            let filteredCourses = courses;
            
            if (filter !== 'all') {
                filteredCourses = courses.filter(course => course.category === filter);
            }

            displayCourses(filteredCourses);
        });
    });

    // Initial load
    displayCourses(courses);
});