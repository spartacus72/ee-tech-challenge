import App from "./app";

const {app} = new App();

app.listen(8000, () => {
  return console.log(`Express is listening at http://localhost:${8000}`);
});
