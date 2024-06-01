import express from "express";
import { deleteRelationship, getRelationship, postRelationship } from "../controllers/relationship.js";
const router = express.Router();

router.get("/",getRelationship);
router.post("/",postRelationship);
router.delete("/",deleteRelationship);

export default router;