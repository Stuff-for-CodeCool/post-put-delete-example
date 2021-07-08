const buttons = document.querySelectorAll("button");
const output = document.querySelector("#result");

buttons.forEach((button) => button.addEventListener("click", processButton));

const api = {
    post: async function (url, payload) {
        const req = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (req.ok) {
            const res = await req.json();
            return res.result;
        }
    },
    put: async function (url, payload) {
        const req = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (req.ok) {
            const res = await req.json();
            return res.result;
        }
    },
    delete: async function (url, payload) {
        const req = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (req.ok) {
            const res = await req.json();
            return res.result;
        }
    },
};

async function processButton(e) {
    e.preventDefault();

    const func = e.target.dataset.function;
    const val = e.target.dataset.id;
    let message = "";

    if (func === "add") {
        message = await api.post("/add", { item: val });
    }
    if (func === "edit") {
        message = await api.put("/edit", { item: val });
    }
    if (func === "delete") {
        message = await api.delete("/delete", { item: val });
    }

    output.innerText = message;
}
