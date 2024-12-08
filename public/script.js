document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      //   const title = document.querySelector(".title");
      //   title.innerHTML = "";
      //   title.innerHTML = `
      //   <div>Delete</div>
      // `;
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
    const newNote = prompt("Введите новое значение");
    const id = event.target.dataset.id;
    if (event.target.dataset.title !== newNote) {
      await update(id, newNote);
      event.target.dataset.title = newNote;

      const noteSpan = event.target.closest("li").querySelector("span");
      if (noteSpan) {
        noteSpan.textContent = newNote;
      }

      const title = document.querySelector(".title");
      title.innerHTML = "";

      title.innerHTML = `<div>Update</div>`;
    }
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
    console.error("Server responded with an error!!!!!", response.status);
    return;
  }
};
