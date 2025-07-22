import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount, getUser, getUserByHandle, login, searchByHandle, updateProfile, uploadImage } from './handlers'
import { handleInputErrors } from './middleware/validation'
import { authenticate } from './middleware/auth'

const router = Router()

/** Auth & Registration */
router.post('/auth/register',
    body('handle')
        .notEmpty().withMessage('El Handle no puede ir vacío'),
    body('name')
        .notEmpty().withMessage('El Nombre no puede ir vacío'),
    body('email')
        .isEmail().withMessage('Correo no válido'),
    body('password')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener mínimo 8 caracteres'),
    handleInputErrors,
    createAccount
)

router.post('/auth/login',
    body('email')
        .isEmail().withMessage('Correo no válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria'),
    handleInputErrors,
    login
)

router.get('/user', authenticate, getUser)

router.patch('/user',
    body('handle')
        .notEmpty().withMessage('El Handle no puede ir vacío'),
    body('description')
        .optional(),
    handleInputErrors,
    authenticate,
    updateProfile
)

router.post('/user/image',
    authenticate,
    uploadImage
)

router.get('/:handle', getUserByHandle)

router.post('/search',
    body('handle')
        .notEmpty()
        .withMessage('El Handle no puede ir vacío'),
    handleInputErrors,
    searchByHandle
)

export default router