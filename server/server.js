import app from "./app.js";


const PORT = process.env.PORT 



app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
});