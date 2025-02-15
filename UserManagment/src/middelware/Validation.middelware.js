import { body, validationResult } from 'express-validator';

// Validation for Signup & User Creation
const validateUser = [
    body("name").notEmpty().withMessage("Name is required").trim().escape(),
    body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Validation for Login
const validateLogin = [
    body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];



export { validateUser, validateLogin };
