import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
const PORT = process.env.PORT || 4040;
//connections
connectToDatabase().then(() => {
    app.listen(PORT, () => { console.log(`Server connected at port ${PORT} and Database connected`); });
}).catch(err => { console.log(err); });
//# sourceMappingURL=index.js.map