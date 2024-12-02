// const buttonRemove = document.getElementById("remove");

document.addEventListener("click", (event) => {
  event.preventDefault();

  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    // console.log("remove", id);
    remove(id).then(() => {
      event.target.closest("div").remove();
    });
  }
});

const remove = async (id) => {
  return fetch(`/${id}`, {
    method: "DELETE",
  });
};

// const button = document.getElementById("showAlert");

document.addEventListener("click", async (event) => {
  if (event.target.dataset.type === "update") {
    const newNote = prompt("Введите новое значение");
    const id = event.target.dataset.id;
    console.log(id, "idButton");
    await update(id, newNote);
    console.log(newNote, "newNote", id, "idNote");
  }
});

// const update = async (id, newNote) => {
//   console.log(id, newNote, "fetch");
//   return fetch(`/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       id,
//       title: newNote,
//     }),
//   });

// };
const update = async (id, newNote) => {
  console.log(id, newNote, "fetch");

  // Отправка PUT-запроса на сервер
  const response = await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newNote,
    }),
  });
};
