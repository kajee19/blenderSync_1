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
/* =====================================================
   SETTINGS
===================================================== */
 /*show section*/
 function showSection(section) {

    console.log("Opening section:", section);

    // Main dashboard elements
    const topbar =
        document.querySelector(".topbar");

    const stats =
        document.querySelector(".stats");

    const sectionHeader =
        document.querySelector(".section-header");

    const projectsContainer =
        document.getElementById("projectsContainer");


    // Other pages
    const settingsSection =
        document.getElementById("settingsSection");

    const projectsSection =
        document.getElementById("projectsSection");

    const teamSection =
        document.getElementById("teamSection");


    // Hide additional sections
    if (settingsSection) {
        settingsSection.classList.add("hidden");
    }

    if (projectsSection) {
        projectsSection.classList.add("hidden");
    }

    if (teamSection) {
        teamSection.classList.add("hidden");
    }


    // Remove active from all sidebar buttons
    document
        .querySelectorAll(".nav-item")
        .forEach(button => {
            button.classList.remove("active");
        });


    // ================= DASHBOARD =================

    if (section === "dashboard") {

        topbar.classList.remove("hidden");

        stats.classList.remove("hidden");

        sectionHeader.classList.remove("hidden");

        projectsContainer.classList.remove("hidden");

        document
            .querySelectorAll(".nav-item")[0]
            .classList.add("active");

    }


    // ================= MY PROJECTS =================

    else if (section === "projects") {

        topbar.classList.add("hidden");

        stats.classList.add("hidden");

        sectionHeader.classList.add("hidden");

        projectsContainer.classList.add("hidden");


        if (projectsSection) {

            projectsSection.classList.remove("hidden");

        }


        document
            .querySelectorAll(".nav-item")[1]
            .classList.add("active");


        if (typeof loadProjectsPage === "function") {

            loadProjectsPage();

        }

    }


    // ================= TEAM =================

    else if (section === "team") {

        topbar.classList.add("hidden");

        stats.classList.add("hidden");

        sectionHeader.classList.add("hidden");

        projectsContainer.classList.add("hidden");


        if (teamSection) {

            teamSection.classList.remove("hidden");

        }


        document
            .querySelectorAll(".nav-item")[2]
            .classList.add("active");


        if (typeof loadTeam === "function") {

            loadTeam();

        }

    }


    // ================= SETTINGS =================

    else if (section === "settings") {

        topbar.classList.add("hidden");

        stats.classList.add("hidden");

        sectionHeader.classList.add("hidden");

        projectsContainer.classList.add("hidden");


        if (settingsSection) {

            settingsSection.classList.remove("hidden");

        } else {

            console.error(
                "settingsSection was not found!"
            );

        }


        document
            .querySelectorAll(".nav-item")[3]
            .classList.add("active");


        // Load user's settings
        if (typeof loadSettings === "function") {

            loadSettings();

        }

    }

}


/* ---------- Load Settings ---------- */

function loadSettings() {

    const currentUserId =
        localStorage.getItem("blendsync_current_user");

    if (!currentUserId) {
        return;
    }

    const users =
        JSON.parse(
            localStorage.getItem("blendsync_users")
        ) || [];

    const user = users.find(
        u => String(u.id) === String(currentUserId)
    );

    if (!user) {
        return;
    }


    /* ---------- Name ---------- */

    document.getElementById("profileName").value =
        user.username || user.name || "";


    /* ---------- Email ---------- */

    document.getElementById("profileEmail").value =
        user.email || "";


    /* ---------- Profile Picture ---------- */

    const savedProfileImage =
        localStorage.getItem(
            `blendsync_profile_${currentUserId}`
        );

    const profileImage =
        document.getElementById("settingsProfileImage");

    if (savedProfileImage) {

        profileImage.src = savedProfileImage;

    } else {

        profileImage.src =
            "https://via.placeholder.com/110";

    }


    /* ---------- Notifications ---------- */

    const notificationSetting =
        localStorage.getItem(
            `blendsync_notifications_${currentUserId}`
        );

    const notificationToggle =
        document.getElementById("notificationToggle");

    if (notificationToggle) {

        notificationToggle.checked =
            notificationSetting !== "false";

    }


    /* ---------- Theme ---------- */

    const savedTheme =
        localStorage.getItem("blendsync_theme") || "dark";

    setTheme(savedTheme, false);
}


/* =====================================================
   SAVE PROFILE NAME
===================================================== */

function saveProfile() {

    const currentUserId =
        localStorage.getItem("blendsync_current_user");

    if (!currentUserId) {
        return;
    }


    const users =
        JSON.parse(
            localStorage.getItem("blendsync_users")
        ) || [];


    const userIndex = users.findIndex(
        u => String(u.id) === String(currentUserId)
    );


    if (userIndex === -1) {
        return;
    }


    const newName =
        document.getElementById("profileName")
            .value
            .trim();


    if (!newName) {

        alert("Please enter your name.");

        return;
    }


    /*
       Keep both properties updated.

       Your registration system may currently
       use "username", while the Settings page
       may use "name".
    */

    users[userIndex].username = newName;
    users[userIndex].name = newName;


    localStorage.setItem(
        "blendsync_users",
        JSON.stringify(users)
    );


    /* Update dashboard username */

    const usernameDisplay =
        document.getElementById("usernameDisplay");

    if (usernameDisplay) {

        usernameDisplay.textContent = newName;

    }


    /* Update avatar letter */

    const avatar =
        document.querySelector(".avatar");

    if (avatar) {

        avatar.textContent =
            newName.charAt(0).toUpperCase();

    }


    alert("Profile updated successfully!");
}


/* =====================================================
   PROFILE PHOTO
===================================================== */

const profileImageInput =
    document.getElementById("profileImageInput");


if (profileImageInput) {

    profileImageInput.addEventListener(
        "change",
        function (event) {

            const file =
                event.target.files[0];


            if (!file) {
                return;
            }


            /* Only allow images */

            if (!file.type.startsWith("image/")) {

                alert("Please select an image file.");

                return;
            }


            const currentUserId =
                localStorage.getItem(
                    "blendsync_current_user"
                );


            if (!currentUserId) {
                return;
            }


            const reader =
                new FileReader();


            reader.onload = function (e) {

                const imageData =
                    e.target.result;


                /* Save image for this user */

                localStorage.setItem(
                    `blendsync_profile_${currentUserId}`,
                    imageData
                );


                /* Show image in Settings */

                const settingsImage =
                    document.getElementById(
                        "settingsProfileImage"
                    );


                if (settingsImage) {

                    settingsImage.src =
                        imageData;

                }


                /* Show image in dashboard */

                updateDashboardProfileImage(
                    imageData
                );

            };


            reader.readAsDataURL(file);

        }
    );

}


/* =====================================================
   UPDATE DASHBOARD PROFILE
===================================================== */

function updateDashboardProfileImage(image) {

    const avatar =
        document.querySelector(".avatar");


    if (!avatar) {
        return;
    }


    /*
       Replace the letter avatar with
       the uploaded profile image.
    */

    avatar.innerHTML = "";

    avatar.style.backgroundImage =
        `url("${image}")`;

    avatar.style.backgroundSize =
        "cover";

    avatar.style.backgroundPosition =
        "center";

    avatar.style.backgroundRepeat =
        "no-repeat";

}


/* =====================================================
   LOAD DASHBOARD PROFILE IMAGE
===================================================== */

function loadDashboardProfile() {

    const currentUserId =
        localStorage.getItem(
            "blendsync_current_user"
        );


    if (!currentUserId) {
        return;
    }


    const savedImage =
        localStorage.getItem(
            `blendsync_profile_${currentUserId}`
        );


    if (savedImage) {

        updateDashboardProfileImage(
            savedImage
        );

    }
}


/* =====================================================
   NOTIFICATIONS
===================================================== */

function saveNotificationSetting() {

    const currentUserId =
        localStorage.getItem(
            "blendsync_current_user"
        );


    if (!currentUserId) {
        return;
    }


    const notificationToggle =
        document.getElementById(
            "notificationToggle"
        );


    const enabled =
        notificationToggle.checked;


    localStorage.setItem(
        `blendsync_notifications_${currentUserId}`,
        enabled
    );


    console.log(
        "Notifications:",
        enabled ? "ON" : "OFF"
    );

}


/* =====================================================
   THEME
===================================================== */

function setTheme(theme, save = true) {

    if (theme === "light") {

        document.body.classList.add(
            "light-theme"
        );

    } else {

        document.body.classList.remove(
            "light-theme"
        );

    }


    if (save) {

        localStorage.setItem(
            "blendsync_theme",
            theme
        );

    }


    updateThemeButtons(theme);
}


/* =====================================================
   UPDATE THEME BUTTONS
===================================================== */

function updateThemeButtons(theme) {

    const lightButton =
        document.getElementById(
            "lightThemeBtn"
        );


    const darkButton =
        document.getElementById(
            "darkThemeBtn"
        );


    if (!lightButton || !darkButton) {
        return;
    }


    lightButton.classList.remove(
        "active"
    );

    darkButton.classList.remove(
        "active"
    );


    if (theme === "light") {

        lightButton.classList.add(
            "active"
        );

    } else {

        darkButton.classList.add(
            "active"
        );

    }

}


/* =====================================================
   LOAD SAVED THEME WHEN APP STARTS
===================================================== */

function loadSavedTheme() {

    const savedTheme =
        localStorage.getItem(
            "blendsync_theme"
        ) || "dark";


    setTheme(
        savedTheme,
        false
    );

}


/* =====================================================
   STARTUP
===================================================== */

loadSavedTheme();