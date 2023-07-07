import { Form } from "./Options/Form";

import React from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.querySelector("#app") as HTMLDivElement);
root.render(<Form />);



// const instanceField = document.querySelector("#instance") as HTMLInputElement;

// i18n();

// async function load() {
//     const res = await GetOptions();

//     instanceField.value = res.instance;
// }

// function save() {
//     browser.storage.local.set({
//         options: {
//             instance: instanceField.value
//         }
//     });
// }

// document.addEventListener("DOMContentLoaded", load);
// document.body.addEventListener("change", save);
