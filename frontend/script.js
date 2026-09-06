// ======================================================
// BLENDSYNC FRONTEND
// ======================================================


// ================= DATA =================

let users = JSON.parse(
    localStorage.getItem("blendsync_users")
) || [];

let projects = JSON.parse(
    localStorage.getItem("blendsync_projects")
) || [];


// ================= PAGE NAVIGATION =================

function showLogin() {

    document
        .getElementById("loginPage")
        .classList.remove("hidden");

    document
        .getElementById("registerPage")
        .classList.add("hidden");

    document
        .getElementById("dashboardPage")
        .classList.add("hidden");
}


function showRegister() {

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("registerPage")
        .classList.remove("hidden");

    document
        .getElementById("dashboardPage")
        .classList.add("hidden");
}


function showDashboard(username) {

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("registerPage")
        .classList.add("hidden");

    document
        .getElementById("dashboardPage")
        .classList.remove("hidden");

    document
        .getElementById("usernameDisplay")
        .textContent = username;

    loadProjects();
}


// ================= REGISTER =================

document
    .getElementById("registerForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const username =
            document.getElementById("registerUsername").value;

        const email =
            document.getElementById("registerEmail").value;

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        // Check passwords

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;
        }


        // Check existing email

        const existingUser = users.find(
            user => user.email === email
        );

        if (existingUser) {

            alert("This email is already registered.");

            return;
        }


        // Create user

        const newUser = {

            id: Date.now(),

            username: username,

            email: email,

            password: password
        };


        users.push(newUser);


        localStorage.setItem(
            "blendsync_users",
            JSON.stringify(users)
        );


        alert("Account created successfully!");


        showLogin();

        document
            .getElementById("registerForm")
            .reset();
    });


// ================= LOGIN =================

document
    .getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value;

        const password =
            document.getElementById("loginPassword").value;


        const user = users.find(
            user =>
                user.email === email &&
                user.password === password
        );


        if (!user) {

            alert("Invalid email or password.");

            return;
        }


        localStorage.setItem(
            "blendsync_current_user",
            JSON.stringify(user)
        );


        showDashboard(user.username);
    });


// ================= PROJECT MODAL =================

function openProjectModal() {

    document
        .getElementById("projectModal")
        .classList.remove("hidden");

    document
        .getElementById("projectName")
        .focus();
}


function closeProjectModal() {

    document
        .getElementById("projectModal")
        .classList.add("hidden");
}


// ================= CREATE PROJECT =================

document
    .getElementById("projectForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("projectName").value;

        const description =
            document.getElementById("projectDescription").value;


        const currentUser =
            JSON.parse(
                localStorage.getItem("blendsync_current_user")
            );


        if (!currentUser) {

            alert("Please login first.");

            return;
        }


        const newProject = {

            id: Date.now(),

            name: name,

            description:
                description ||
                "No description provided.",

            ownerId:
                currentUser.id,

            owner:
                currentUser.username,

            members: 1,

            createdAt:
                new Date().toLocaleDateString()
        };


        projects.push(newProject);


        localStorage.setItem(
            "blendsync_projects",
            JSON.stringify(projects)
        );


        document
            .getElementById("projectForm")
            .reset();


        closeProjectModal();

        loadProjects();
    });


// ================= LOAD PROJECTS =================

function loadProjects() {

    const container =
        document.getElementById("projectsContainer");


    const currentUser =
        JSON.parse(
            localStorage.getItem("blendsync_current_user")
        );


    container.innerHTML = "";


    const userProjects =
        projects.filter(
            project =>
                project.ownerId === currentUser?.id
        );


    document
        .getElementById("projectCount")
        .textContent =
            userProjects.length;


    if (userProjects.length === 0) {

        container.innerHTML = `

            <div class="project-card">

                <div class="project-icon">
                    📁
                </div>

                <h3>No Projects Yet</h3>

                <p>
                    Create your first collaborative
                    3D project to get started.
                </p>

            </div>

        `;

        return;
    }


    userProjects.forEach(project => {

        const card =
            document.createElement("div");

        card.className =
            "project-card";


        card.innerHTML = `

            <div class="project-icon">
                🏰
            </div>

            <h3>
                ${project.name}
            </h3>

            <p>
                ${project.description}
            </p>

            <div class="project-info">

                <span>
                    👥 ${project.members} member
                </span>

                <span>
                    ${project.createdAt}
                </span>

            </div>

            <button
                class="open-project"
                onclick="openProject(${project.id})"
            >
                Open Project →
            </button>

        `;


        container.appendChild(card);

    });
}


// ================= OPEN PROJECT =================

function openProject(projectId) {

    const project =
        projects.find(
            project =>
                project.id === projectId
        );


    if (!project) return;


    alert(
        `Project: ${project.name}\n\n` +
        `Owner: ${project.owner}\n` +
        `Members: ${project.members}\n\n` +
        `Blender collaboration will be connected here in Phase 2.`
    );
}


// ================= LOGOUT =================

function goBack() {

    localStorage.removeItem(
        "blendsync_current_user"
    );

    showLogin();
}


// ================= AUTO LOGIN =================

window.addEventListener("load", function() {

    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "blendsync_current_user"
            )
        );


    if (currentUser) {

        showDashboard(
            currentUser.username
        );

    } else {

        showLogin();

    }

});