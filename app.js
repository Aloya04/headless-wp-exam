"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function

// Function to initialize the Web App
async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Log to the console that the app is running
  const projects = await getProjects(); // Call the getProjects function
  projects.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  ); // Sort the projects by date
  console.log(projects); // Log the projects to the console
  displayProjectsGrid(projects); // Call the displayProjectsGrid function
}

async function getProjects() {
  const response = await fetch(
    "https://headless.aloyasmind.dk//wp-json/wp/v2/projects?acf_format=standard"
  ); // Fetch the data from the URL
  const data = await response.json(); // Parse the data as JSON into readable JavaScript objects (array of objects)
  return data; // Return the data
}

function displayProjectsGrid(projects) {
  const projectsGrid = document.querySelector("#projects-grid");

  for (const project of projects) {
    projectsGrid.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
          <article class="grid-item">
            <div>
                <h3>${project.acf.title}</h3>
                <p>${project.acf.description}</p>
                <p><span>Focus Area: </span>${project.acf.focus_area}</p>
                <p><span>Client: </span>${project.acf.client}</p>
                <p><span>Team: </span>${project.acf.team}</p>
            </div>

            <div class="wrapper">
                <div class="image-wrapper">
                    <img src="${project.acf.image}" alt="${project.acf.image}" />
                </div>
                <a href="${project.acf.link}">See the solution</a>
            </div>
          </article>
        `
    );
  }
}
