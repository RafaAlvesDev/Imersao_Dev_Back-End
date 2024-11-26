import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controllers/postController.js";
import cors from "cors";

const corsOption = {
    origin: "http:localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage })

const routes = (app) =>{
    app.use(express.json());
    app.use(cors(corsOption));
    app.get("/posts", listarPosts);
    app.post("/posts", postarNovoPost );
    app.post("/upload", upload.single("imagem"), uploadImagem )
    app.put("/upload/:id", atualizarNovoPost)
}

export default routes;