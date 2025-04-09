import jwt from 'jsonwebtoken'

export const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Postavljamo samo ID korisnika iz tokena
      req.user = { id: decoded.id }

      next()
    } catch (error) {
      console.error('Greška sa tokenom:', error)
      return res.status(401).json({ message: 'Nevažeći token' })
    }
  } else {
    return res.status(401).json({ message: 'Token nije prosleđen' })
  }
}
