import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */
import sayActions from "./modules/item/sayActions";

router.get("/", sayActions.sayWelcome);

/* ************************************************************************* */
import programActions from "./modules/program/programActions";

router.get("/api/programs", programActions.browse);
router.get("/api/programs/:id", programActions.read);
router.post("/api/programs", programActions.validate, programActions.add);
router.put("/api/programs", programActions.validate, programActions.edit);
router.delete("/api/programs/:id", programActions.destroy);

/* ************************************************************************* */
import categoryActions from "./modules/category/categoryActions";

router.get("/api/categories", categoryActions.browser);
router.get("/api/categories/:id", categoryActions.read);
router.get("/api/categories/:id", categoryActions.edit);

/* ************************************************************************* */
import userActions from "./modules/user/userActions";

router.get("/api/user", userActions.browse);
router.get("/api/user/:id", userActions.read);
router.post("/api/user", userActions.add);
router.put("/api/user", userActions.edit);
router.delete("/api/user/:id", userActions.destroy);

router.post("/api/program", (req, res) => {
  console.log("user creation");
  console.log("hello");
});
export default router;
