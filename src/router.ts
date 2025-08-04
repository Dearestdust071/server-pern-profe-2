import { Router } from "express"
import { createProduct, getAllProducts, getProductByID ,updateProduct,updateAvailability, deleteProduct} from './handlers/product';
import { createUser, deleteUsersById, getAllUsers, getUsersByID, updateActive, updateUsersByID } from "./handlers/users";
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

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del usuario
 *           example: 1
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *           example: jorge123
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *           example: jorge@email.com
 *         password:
 *           type: string
 *           description: Contraseña (no se muestra)
 *           example: contraseñaSegura123
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: Rol del usuario
 *           example: user
 *         isActive:
 *           type: boolean
 *           description: Si el usuario está activo
 *           example: true
 */


/**
 * 
 * @swagger 
 *  /api/products:
 *      get:
 *          summary: Obtener una lista de los productos.
 *          tags: 
 *              - Products
 *          description: Regresa una lista de productos
 *          responses: 
 *                  200:
 *                      description: Respuesta exitosa. B) 
 *                      content: 
 *                          application/json:
 *                              schema: 
 *                                  type: array
 *                                  items: 
 *                                      $ref: '#/components/schemas/Product'
 */
//getAll
router.get('/products/',getAllProducts)

/**
 * 
 * @swagger 
 *  /api/products/{id}:
 *      get:
 *          summary: Obtener un producto por ID.
 *          tags: 
 *              - Products
 *          description: Regresa un producto.
 * 
 *          parameters: 
 *              - in: path 
 *                name: id 
 *                description: El ID del producto a consultar 
 *                required: true
 *                schema: 
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Respuesta exitosa. B) 
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Product'
 *              404: 
 *                  description: No encontrado 
 *              400:
 *                  description: Solicitud erronea  - Id invalido
 */

router.get('/products/:id',
    param('id').isNumeric().isInt().withMessage('Id no es numerico'),
    handleInputErrors,getProductByID)


/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Crea un nuevo producto 
 *      tags: 
 *          - Products
 *      description: Retorna un nuevo registro en la base de datos.
 *      
 * 
 *      responses:
 *          201: 
 *              description: Respuesta exitosa
 *              content: 
 *                  application/json:
 *                    schema: 
 *                      $ref: '#/components/schemas/Product'
 *          400:
 *              description: Mala respuesta - datos invalidos
 *              requestBody:
 *                  required: true
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                            type: object
 *                            properties: 
 *                                name:
 *                                    type: string 
 *                                    example: "Monitor curvo  49 pulgadas"
 *                                price: 
 *                                  type: number
 *                                  example: 1599
 *                                availability:
 *                                    type: bool
 *                                    example: true
 *  
 */
//create
router.post('/products/',
    body('name')
    .notEmpty().withMessage('tonto te falto el nombre'),
    body('price')
    .notEmpty().withMessage('tonto te falto el nombre')
    .isNumeric().withMessage('El dato no es numerico')
    .custom(value=> value>0).withMessage('Valor no valido')
    ,handleInputErrors,createProduct)


router.get('/products/:id',
    param('id').isNumeric().isInt().withMessage('Id no es numerico'),
    handleInputErrors,getProductByID)

router.put('/products/:id',
    param('id').isNumeric().isInt().withMessage('Id no es numerico'),
    body('name')
    .notEmpty().withMessage('tonto te falto el nombre'),
    body('price')
    .notEmpty().withMessage('tonto te falto el nombre')
    .isNumeric().withMessage('El dato no es numerico')
    .custom(value=> value>0).withMessage('Valor no valido')
    ,handleInputErrors,updateProduct)

router.patch('/products/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability
)
router.delete('/products/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
)





// Users routes



// GET all users
router.get(
  "/users",
  getAllUsers
);

// GET user by ID
router.get(
  "/users/:id",
  param("id")
    .isInt().withMessage("ID tiene que ser un entero."),
  handleInputErrors,
  getUsersByID
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

// UPDATE user (PUT)
router.put(
  "/users/:id",
  param("id")
    .isInt().withMessage("ID tiene que ser un entero."),
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
  updateUsersByID
);

// PATCH user availability
router.patch(
  "/users/:id",
  param("id")
    .isInt().withMessage("ID tiene que ser un entero."),
  handleInputErrors,
  updateActive
);

// DELETE user
router.delete(
  "/users/:id",
  param("id")
    .isInt().withMessage("ID tiene que ser un entero."),
  handleInputErrors,
  deleteUsersById
);



export default router;