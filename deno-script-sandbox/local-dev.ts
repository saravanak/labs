// Use this to mimic a new script request

fetch("http://localhost:3001/script", {
  method: "POST",
  body: `
export function logic(x,y) {
  return x == 3 ? "blue" : "black" ;
};
`,
})
  .then((res) => res.text())
  .then((text) => console.log(text));
