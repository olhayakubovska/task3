document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      const title = document.querySelector(".title");
      title.innerHTML = "";

      title.innerHTML = `<div>Delete</div>`;

      event.target.closest("li").remove();
    });
  }
});

const remove = async (id) =>
  await fetch(`/${id}`, {
    method: "DELETE",
  });

document.addEventListener("click", async (event) => {
  if (event.target.dataset.type === "update") {
    const id = event.target.dataset.id;
    const titleFromButton = event.target.dataset.title;

    const noteElement = event.target.closest("li");
    noteElement.innerHTML = "";
    const input = document.createElement("input");
    const submitButton = document.createElement("button");
    const cancelButton = document.createElement("button");

    submitButton.textContent = "Save";
    cancelButton.textContent = "Cancel";

    submitButton.classList.add("notes-list__btn");
    cancelButton.classList.add("notes-list__cancelBtn");
    input.classList.add("note-form__input");
    input.value = titleFromButton;
    submitButton.addEventListener("click", async (event) => {
      const newValue = input.value.trim();
      await update(id, newValue);

      input.remove();
      submitButton.remove();
      noteElement.innerHTML = `  
        <span class="notes-list__title">${newValue}</span>
        <button data-type="remove"    class="notes-list__button notes-list__button--remove" data-id=${id}>&times;</button>
        <button data-type="update"    class="notes-list__button notes-list__button--remove" data-id=${id} data-title=${newValue}>
          Edit
        </button>
      `;
      const title = document.querySelector(".title");
      title.innerHTML = "";
      title.innerHTML = `<div>Update</div>`;
    });
    cancelButton.addEventListener("click", (event) => {
      noteElement.innerHTML = ` <span class="notes-list__title">${titleFromButton}</span>
        <button data-type="remove"    class="notes-list__button notes-list__button--remove" data-id=${id}>&times;</button>
        <button data-type="update"    class="notes-list__button notes-list__button--remove" data-id=${id} data-title=${titleFromButton}>
          Edit
        </button>`;
    });

    noteElement.appendChild(input);
    noteElement.appendChild(submitButton);
    noteElement.appendChild(cancelButton);
  }
});

const update = async (id, newNote) => {
  console.log(id, newNote, "fetch");

  const response = await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newNote,
    }),
  });
  if (!response.ok) {
    console.error("Server responded with an error", response.status);
    return;
  }
};
