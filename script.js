const addNote = document.querySelector(".addNote");
const notesDiv = document.querySelector(".notes");
const info = document.querySelector(".info");

let storedNotes = localStorage.getItem("notes");
let notes = storedNotes ? JSON.parse(storedNotes) : [];

function addNotes() {
  const note = document.createElement("div");
  note.className = "note";

  const colorsdiv = document.createElement("div");
  colorsdiv.className = "colorDiv";

  const colors = ["#999", "#ffa500", "#ff7a00", "#ff778e", "#6927e3", "#0075ff"];

  colors.forEach(colorCode => {
    const color = document.createElement("span");
    color.className = "color";
    color.setAttribute("data-color", colorCode);
    color.style.backgroundColor = colorCode;
    color.addEventListener("click", () => {
      note.style.backgroundColor = color.dataset.color;
      input.style.backgroundColor = color.dataset.color;
      saveNotes();
      colorstats();
    });
    colorsdiv.appendChild(color);
  });

  const input = document.createElement("textarea");
  input.setAttribute("name", "text");
  input.className = "textnote";

  const del = document.createElement("div");
  del.className = "del";
  del.appendChild(document.createTextNode("Delete"));
  del.addEventListener("click", () => {
    note.remove();
    saveNotes();
    colorstats();
  });

  note.appendChild(colorsdiv);
  note.appendChild(input);
  note.appendChild(del);
  notesDiv.insertBefore(note, addNote);

  input.addEventListener("input", saveNotes);


  saveNotes();
  colorstats();
}

function saveNotes() {
  const allNotes = Array.from(notesDiv.querySelectorAll(".note")).map(note => {
    return {
      color: note.style.backgroundColor,
      text: note.querySelector(".textnote").value,
    };
  });

  localStorage.setItem("notes", JSON.stringify(allNotes));
}

function loadNotes() {
  notes.forEach(noteData => {
    const note = document.createElement("div");
    note.className = "note";
    note.style.backgroundColor = noteData.color;

    const colorsdiv = document.createElement("div");
    colorsdiv.className = "colorDiv";

    const colors = ["#999", "#ffa500", "#ff7a00", "#ff778e", "#6927e3", "#0075ff"];

    colors.forEach(colorCode => {
      const color = document.createElement("span");
      color.className = "color";
      color.setAttribute("data-color", colorCode);
      color.style.backgroundColor = colorCode;
      color.addEventListener("click", () => {
        note.style.backgroundColor = color.dataset.color;
        input.style.backgroundColor = color.dataset.color;
        saveNotes();
        colorstats();
      });
      colorsdiv.appendChild(color);
    });

    const input = document.createElement("textarea");
    input.setAttribute("name", "text");
    input.className = "textnote";
    input.style.backgroundColor = noteData.color;
    input.value = noteData.text;
    input.addEventListener("input", saveNotes);

    const del = document.createElement("div");
    del.className = "del";
    del.appendChild(document.createTextNode("Delete"));
    del.addEventListener("click", () => {
      note.remove();
      saveNotes();
      colorstats();
    });

    note.appendChild(colorsdiv);
    note.appendChild(input);
    note.appendChild(del);
    notesDiv.insertBefore(note, addNote);
  });

  colorstats();
}

function colorstats() {
  const colorCounts = {};

  notesDiv.querySelectorAll(".note").forEach(note => {
    const noteColor = note.style.backgroundColor;
    const normalizedColor = normalizeColor(noteColor); 
    if (!colorCounts[normalizedColor]) {
      colorCounts[normalizedColor] = 0;
    }
    colorCounts[normalizedColor]++;
  });

  const statsContainer = document.querySelector(".colorStats") || document.createElement("div");
  statsContainer.className = "colorStats";
  statsContainer.innerHTML = '';

  Object.keys(colorCounts).forEach(color => {
    const colorDiv = document.createElement("div");
    colorDiv.className = "colorDiv";
    colorDiv.style.backgroundColor = color;

    const countSpan = document.createElement("span");
    countSpan.textContent = colorCounts[color];

    colorDiv.appendChild(countSpan);
    statsContainer.appendChild(colorDiv);
  });

  info.innerHTML = ''; 
  info.appendChild(statsContainer);
}

function normalizeColor(color) {
  const colorMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (colorMatch) {
    const [r, g, b] = colorMatch.slice(1).map(num => parseInt(num, 10));
    return `rgb(${r},${g},${b})`;
  }
  return color;
}

colorstats();
loadNotes();
addNote.addEventListener("click", addNotes);
