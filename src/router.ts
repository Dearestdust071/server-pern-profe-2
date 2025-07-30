import { Router } from "express"
import { createProduct, getAllProducts, getProductByID ,updateProduct,updateAvailability, deleteProduct} from './handlers/product';
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


export default router