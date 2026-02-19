document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  fetch(`${environment.apiUrl}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Connexion réussie !");
      } else {
        alert("Échec : " + JSON.stringify(data));
      }
    })
    .catch((err) => console.error("Erreur réseau :", err));
});

//Connexion
fetch(`${environment.apiUrl}/api/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "coach@example.com", password: "secret123" })
})
.then(res => res.json())
.then(data => {
  localStorage.setItem("token", data.token);
  alert("Connecté !");
});

//Voir l’utilisateur connecté
fetch(`${environment.apiUrl}/api/me`, {
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Accept": "application/json"
  }
})
.then(res => res.json())
.then(user => {
  if (user.role === "coach" || user.role === "admin") {
    document.getElementById("adminTools").classList.remove("d-none");
  }
});
// Affichage dynamique des exercices par muscle
function showExercises(muscle) {
  fetch(`${environment.apiUrl}/api/exercices?muscle=${muscle}`)
    .then(res => res.json())
    .then(exercices => {
      // Affichage dynamique ici
    });
}


function chargerProgrammes() {
  fetch(`${environment.apiUrl}/api/programmes`)
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("programmes-container");
      container.innerHTML = '';

      data.forEach(p => {
        container.innerHTML += `
          <div class="col">
            <div class="card h-100 text-center bg-transparent text-white border border-light shadow">
              <div class="p-3">
                <h5 class="card-title text-warning">${p.nom}</h5>
                <p class="card-text">${p.description}</p>
              </div>
            </div>
          </div>`;
      });
    });
}
function showExercises(muscle) {
  const listContainer = document.getElementById("exerciseList");
  const nameSpan = document.getElementById("muscleName");
  const list = document.getElementById("exerciseItems");

  nameSpan.textContent = muscle;
  list.innerHTML = ''; // Vide la liste précédente

  fetch(`${environment.apiUrl}/api/exercices?muscle=${muscle}`)
    .then(res => res.json())
    .then(exercices => {
      if (!exercices.length) {
        list.innerHTML = '<li class="list-group-item">Aucun exercice trouvé pour ce muscle.</li>';
        return;
      }

      exercices.forEach(ex => {
        const item = document.createElement('li');
        item.className = 'list-group-item bg-dark text-white d-flex flex-column flex-md-row align-items-center mb-2';

        const gif = document.createElement('img');
        gif.src = ex.gif_path;
        gif.alt = ex.nom;
        gif.className = 'me-3';
        gif.style.width = '100px';
        gif.style.height = 'auto';
        gif.style.borderRadius = '8px';

        const name = document.createElement('span');
        name.textContent = ex.nom;
        name.style.fontWeight = 'bold';

        item.appendChild(gif);
        item.appendChild(name);
        list.appendChild(item);
      });

      listContainer.classList.remove('d-none'); // Affiche la section
    })
    .catch(error => {
      console.error("Erreur lors du chargement des exercices :", error);
      list.innerHTML = '<li class="list-group-item text-danger">Erreur lors du chargement des exercices.</li>';
    });
}


document.addEventListener("DOMContentLoaded", chargerProgrammes);
