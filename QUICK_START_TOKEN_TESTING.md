# 🚀 Quick Start - Token Expiry Testing

## ⚡ Fast Testing (3 Steps)

### Step 1: Navigate to Test Page
```
http://localhost:3000/test-token-expiry
```

### Step 2: Click Buttons in Order
1. **"Set Invalid Token"** - এটি একটি invalid token set করবে
2. **"Test API Call with Expired Token"** - এটি API call করবে invalid token দিয়ে

### Step 3: Observe
- ✅ Toast message দেখবেন: "Your session has expired. Please log in to continue."
- ✅ Automatic redirect হবে `/login` page এ
- ✅ Console এ দেখবেন: "Token expired or invalid, logging out..."

---

## 🔥 Real-World Testing

### Backend Setup (Optional)
আপনার backend এ token expiry time কমিয়ে দিন:

```javascript
// In your backend JWT config
const token = jwt.sign(
    { userId: user._id }, 
    process.env.JWT_SECRET, 
    { expiresIn: '30s' } // 30 seconds instead of 7 days
)
```

### Testing Flow
1. Login করুন
2. 30 seconds অপেক্ষা করুন
3. যেকোনো protected page এ যান (My Enrollments, Dashboard, etc.)
4. Automatic logout হবে এবং login page এ redirect হবে

---

## 🎯 What Happens Behind the Scenes

```
User makes API request
    ↓
Backend returns 401/403 (Token Expired)
    ↓
Interceptor catches the error
    ↓
1. Clears localStorage token
2. Dispatches Redux logout action
3. Shows toast notification
4. Redirects to /login
    ↓
User sees login page with message
```

---

## 🐛 Troubleshooting

### Issue: Not redirecting to login
**Check:**
- Browser console for errors
- Network tab for 401/403 responses
- Redux DevTools for logout action

### Issue: Toast not showing
**Check:**
- react-hot-toast is installed
- Toaster component is in your layout

### Issue: Token not clearing
**Check:**
- Browser DevTools → Application → Local Storage
- Should see `accessToken` removed after logout

---

## ✨ Features Implemented

| Feature | Status | Description |
|---------|--------|-------------|
| Auto Logout on 401 | ✅ | RTK Query interceptor |
| Auto Logout on 403 | ✅ | RTK Query interceptor |
| Fetch API Error Handling | ✅ | Direct API calls |
| Toast Notifications | ✅ | User-friendly messages |
| Login Redirect | ✅ | Automatic navigation |
| Token Cleanup | ✅ | localStorage cleared |
| Redux State Reset | ✅ | User state cleared |

---

## 📱 Test on Different Scenarios

### Scenario 1: Dashboard Access
1. Set invalid token
2. Go to `/dashboard`
3. Should redirect to `/login`

### Scenario 2: My Enrollments
1. Set invalid token
2. Go to `/dashboard/my-enrollments`
3. Should redirect to `/login`

### Scenario 3: API Call
1. Set invalid token
2. Use test page to trigger API call
3. Should redirect to `/login`

---

## 🎉 Success Criteria

✅ User automatically logged out when token expires
✅ Toast message displayed: "Your session has expired. Please log in to continue."
✅ Redirected to `/login` page
✅ Token cleared from localStorage
✅ Redux state reset (user = null)
✅ Can login again successfully

---

## 📞 Need Help?

Check the full documentation: `TOKEN_EXPIRY_IMPLEMENTATION.md`
