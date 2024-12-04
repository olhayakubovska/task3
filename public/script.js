document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});

const remove = async (id) => {
  return fetch(`/${id}`, {
    method: "DELETE",
  });
};

document.addEventListener("click", async (event) => {
  if (event.target.dataset.type === "update") {
    const newNote = prompt("Введите новое значение");
    const id = event.target.dataset.id;
    console.log(id, "idAddEvLis");
    await update(id, newNote);
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
