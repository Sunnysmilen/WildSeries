import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);
/* ************************************************************************* */

// Define item-related routes

import categoryActions from "./modules/category/categoryActions";
/* ************************************************************************* */
import sayActions from "./modules/item/sayActions";
import programActions from "./modules/program/programActions";

router.get("/", sayActions.sayWelcome);

router.get("/api/programs", programActions.browse);
router.get("/api/programs/:id", programActions.read);

router.get("/api/categories", categoryActions.browser);
router.get("/api/categories/:id", categoryActions.reads);

export default router;
