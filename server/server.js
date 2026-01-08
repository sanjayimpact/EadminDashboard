import app from "./src/app.js";
import { dbConnect } from "./src/Db/config.js";

const PORT = 3001;
await dbConnect();
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})