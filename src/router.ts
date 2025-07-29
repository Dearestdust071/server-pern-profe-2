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

//create
router.post('/',
    body('name')
    .notEmpty().withMessage('tonto te falto el nombre'),
    body('price')
    .notEmpty().withMessage('tonto te falto el nombre')
    .isNumeric().withMessage('El dato no es numerico')
    .custom(value=> value>0).withMessage('Valor no valido')
    ,handleInputErrors,createProduct)
//getAll
router.get('/',getAllProducts)

router.get('/:id',
    param('id').isNumeric().isInt().withMessage('Id no es numerico'),
    handleInputErrors,getProductByID)

router.put('/:id',
    param('id').isNumeric().isInt().withMessage('Id no es numerico'),
    body('name')
    .notEmpty().withMessage('tonto te falto el nombre'),
    body('price')
    .notEmpty().withMessage('tonto te falto el nombre')
    .isNumeric().withMessage('El dato no es numerico')
    .custom(value=> value>0).withMessage('Valor no valido')
    ,handleInputErrors,updateProduct)

router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability
)
router.delete('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
)


export default router