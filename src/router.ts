import { Router } from "express"
import { createProduct, getAllProducts, getProductByID ,updateProduct,updateAvailability, deleteProduct} from './handlers/product';
import { createUser, deleteUsersById, getAllUsers, getUsersByID, updateUsersByID } from "./handlers/users";
import { handleInputErrors } from "./middleware";
import { body, param} from 'express-validator';

const router = Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 49 Pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

//create
router.post('/products',
    body('name')
    .notEmpty().withMessage('tonto te falto el nombre'),
    body('price')
    .notEmpty().withMessage('tonto te falto el nombre')
    .isNumeric().withMessage('El dato no es numerico')
    .custom(value=> value>0).withMessage('Valor no valido')
    ,handleInputErrors,createProduct)
//getAll
router.get('/products',getAllProducts)

router.get('/products:id',
    param('id').isNumeric().isInt().withMessage('Id no es numerico'),
    handleInputErrors,getProductByID)

router.put('/products:id',
    param('id').isNumeric().isInt().withMessage('Id no es numerico'),
    body('name')
    .notEmpty().withMessage('tonto te falto el nombre'),
    body('price')
    .notEmpty().withMessage('tonto te falto el nombre')
    .isNumeric().withMessage('El dato no es numerico')
    .custom(value=> value>0).withMessage('Valor no valido')
    ,handleInputErrors,updateProduct)

router.patch('/products:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability
)
router.delete('/products:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
)





// Users routes


// // GET all users
router.get("/users", getAllUsers, (req, res) => {
  res.send("Listado de usuarios obtenido correctamente");
});

// GET user by ID
router.get(
  "/users/:id",
  param("id").isNumeric().withMessage("ID tiene que ser numérico."),
  param("id").isInt().withMessage("ID tiene que ser entero."),
  handleInputErrors,
  getUsersByID,
  (req, res) => {
    res.send("Usuario obtenido por ID");
  }
);

// CREATE user
router.post(
  "/users",
  body("username")
    .notEmpty().withMessage("Falta el nombre de usuario")
    .isString().withMessage("Formato de nombre de usuario inválido"),
  body("email")
    .notEmpty().withMessage("Falta el email")
    .isEmail().withMessage("Formato de email inválido"),
  body("password")
    .notEmpty().withMessage("Falta el password")
    .isString().withMessage("Formato de password inválido")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("role")
    .optional()
    .isIn(["user", "admin"]).withMessage("Role inválido, permitido: user o admin"),
  handleInputErrors,
  createUser
);

// UPDATE user
router.put(
  "/users/:id",
  param("id").isNumeric().withMessage("ID tiene que ser numérico."),
  param("id").isInt().withMessage("ID tiene que ser entero."),
  body("username")
    .optional()
    .isString().withMessage("Formato de nombre de usuario inválido"),
  body("email")
    .optional()
    .isEmail().withMessage("Formato de email inválido"),
  body("password")
    .optional()
    .isString().withMessage("Formato de password inválido")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("role")
    .optional()
    .isIn(["user", "admin"]).withMessage("Role inválido, permitido: user o admin"),
  handleInputErrors,
  updateUsersByID,
  (req, res) => {
    res.send("Usuario actualizado");
  }
);

// DELETE user
router.delete(
  "/users/:id",
  param("id").isNumeric().withMessage("ID tiene que ser numérico."),
  param("id").isInt().withMessage("ID tiene que ser entero."),
  handleInputErrors,
  deleteUsersById,
  (req, res) => {
    res.send("Usuario eliminado");
  }
);

// PATCH user availability
router.patch(
  "/users/:id",
  param("id").isNumeric().withMessage("ID tiene que ser numérico."),
  param("id").isInt().withMessage("ID tiene que ser entero."),
  handleInputErrors,
  updateAvailability,
  (req, res) => {
    res.send("Estado de disponibilidad actualizado");
  }
);



export default router