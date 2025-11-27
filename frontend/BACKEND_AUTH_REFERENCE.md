# Backend Authentication Setup Required

Your frontend is now production-ready, but your backend needs to set httpOnly cookies.

## Backend Changes Needed:

### 1. Login Route (backend/routes/auth.js or similar)

```javascript
// After successful login
res.cookie('token', token, {
  httpOnly: true,        // Cannot be accessed by JavaScript
  secure: process.env.NODE_ENV === 'production', // HTTPS only in production
  sameSite: 'strict',    // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});

res.json({
  success: true,
  user: {
    id: user._id,
    name: user.name,
    email: user.email
    // Don't send sensitive data
  }
});
```

### 2. Register Route

```javascript
// After successful registration
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000
});

res.json({
  success: true,
  user: {
    id: user._id,
    name: user.name,
    email: user.email
  }
});
```

### 3. Logout Route (NEW - create this)

```javascript
router.post('/logout', (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  
  res.json({ success: true, message: 'Logged out successfully' });
});
```

### 4. CORS Configuration (backend/index.js)

```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true // IMPORTANT: Allow cookies
}));
```

### 5. Protected Routes Middleware

Your existing auth middleware should already read from cookies:

```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Read from cookie, not headers
  
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

## What Changed in Frontend:

✅ Token NO LONGER stored in localStorage (security)
✅ Only user info stored in localStorage (for UI display)
✅ Token stored in httpOnly cookie (set by backend)
✅ `credentials: 'include'` added to all auth requests
✅ Logout calls backend to clear cookie
✅ Middleware still works (reads cookie automatically)

## Testing:

1. Update your backend with the changes above
2. Test login - check browser DevTools > Application > Cookies
3. You should see a `token` cookie with HttpOnly flag ✓
4. Test protected routes - cookie sent automatically
5. Test logout - cookie should be cleared
