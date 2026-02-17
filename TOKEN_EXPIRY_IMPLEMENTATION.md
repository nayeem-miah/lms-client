# Token Expiry & Auto Logout Implementation

## 🎯 সমস্যা
যখন user এর JWT token expire হয়ে যায়, তখন automatic logout হয়ে login page এ redirect হওয়া উচিত "Please log in to continue." message সহ।

## ✅ সমাধান

তিনটি layer এ token expiry handling implement করা হয়েছে:

### 1. RTK Query API Interceptor
**File:** `lib/redux/api/apiSlice.ts`

```typescript
const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    // Check if the error is 401 (Unauthorized) or 403 (Forbidden)
    if (result.error && (result.error.status === 401 || result.error.status === 403)) {
        console.log('Token expired or invalid, logging out...')
        
        // Dispatch logout action
        api.dispatch(logOut())
        
        // Show toast notification
        toast.error('Your session has expired. Please log in to continue.')
        
        // Redirect to login page
        if (typeof window !== 'undefined') {
            window.location.href = '/login'
        }
    }

    return result
}
```

**কখন কাজ করবে:**
- যেকোনো RTK Query hook (useGetMyEnrollmentsQuery, useGetMeQuery, etc.) যখন 401/403 error পাবে

### 2. Fetch API Client Interceptor
**File:** `lib/api/client.ts`

```typescript
// Check for 401 (Unauthorized) or 403 (Forbidden)
if (response.status === 401 || response.status === 403) {
    console.log('Token expired or invalid, logging out...');
    
    // Clear token from localStorage
    if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        
        // Show toast message
        const toast = (await import('react-hot-toast')).default;
        toast.error('Your session has expired. Please log in to continue.');
        
        // Redirect to login page
        window.location.href = '/login';
    }
    
    throw new Error('Session expired. Please log in again.');
}
```

**কখন কাজ করবে:**
- যেকোনো direct API call (api.get(), api.post(), etc.) যখন 401/403 error পাবে

### 3. Redux Auth Provider
**File:** `components/providers/ReduxAuthProvider.tsx`

```typescript
useEffect(() => {
    if (isSuccess && userData) {
        dispatch(setUser(userData))
    } else if (isError) {
        console.error("Auth check failed:", error)
        dispatch(logOut())
        
        // Redirect to login page if auth fails
        if (typeof window !== 'undefined') {
            const toast = require('react-hot-toast').default
            toast.error('Please log in to continue.')
            setTimeout(() => {
                window.location.href = '/login'
            }, 1000)
        }
    }
    dispatch(setLoading(isLoading))
}, [userData, isSuccess, isError, isLoading, dispatch, error])
```

**কখন কাজ করবে:**
- App load হওয়ার সময় যদি stored token invalid/expired হয়

## 🧪 Testing

### Method 1: Test Page ব্যবহার করুন
1. Navigate to: `http://localhost:3000/test-token-expiry`
2. "Set Invalid Token" button এ click করুন
3. "Test API Call with Expired Token" button এ click করুন
4. Automatic logout এবং redirect দেখবেন

### Method 2: Backend Token Expiry কমিয়ে দিন
Backend এ JWT token এর expiry time কমিয়ে দিন:

```javascript
// Before
const token = jwt.sign(payload, secret, { expiresIn: '7d' })

// For Testing
const token = jwt.sign(payload, secret, { expiresIn: '30s' }) // 30 seconds
```

### Method 3: Manual Token Manipulation
Browser DevTools Console এ:

```javascript
// Set an expired/invalid token
localStorage.setItem('accessToken', 'invalid_token_here')

// Reload page or make an API call
window.location.reload()
```

## 📋 Expected Behavior

1. **401/403 Error পেলে:**
   - ✅ Redux store থেকে user logout হবে
   - ✅ localStorage থেকে token clear হবে
   - ✅ Toast notification দেখাবে: "Your session has expired. Please log in to continue."
   - ✅ Automatic redirect হবে `/login` page এ

2. **Login Page এ:**
   - ✅ Toast message দেখবেন
   - ✅ User login করতে পারবেন
   - ✅ Successful login এর পর dashboard এ redirect হবে

## 🔍 Debugging

### Check Console Logs
```
Token expired or invalid, logging out...
```

### Check Network Tab
- Status: 401 Unauthorized বা 403 Forbidden
- Response: Backend error message

### Check Redux DevTools
- Action: `auth/logOut`
- State: `user: null`, `token: null`, `isAuthenticated: false`

## 🎨 User Experience Flow

```
User Action → API Call → 401/403 Error
    ↓
Interceptor Catches Error
    ↓
1. Dispatch logout()
2. Clear localStorage
3. Show toast message
    ↓
Redirect to /login
    ↓
User sees: "Your session has expired. Please log in to continue."
    ↓
User logs in again
    ↓
Redirect to /dashboard
```

## 🚀 Production Considerations

1. **Token Refresh:** Consider implementing token refresh mechanism
2. **Retry Logic:** Add retry logic for failed requests
3. **Offline Handling:** Handle offline scenarios gracefully
4. **Session Timeout Warning:** Show warning before token expires
5. **Remember Me:** Implement "Remember Me" functionality with longer token expiry

## 📝 Files Modified

1. ✅ `lib/redux/api/apiSlice.ts` - RTK Query interceptor
2. ✅ `lib/api/client.ts` - Fetch API interceptor
3. ✅ `components/providers/ReduxAuthProvider.tsx` - Auth provider error handling
4. ✅ `app/test-token-expiry/page.tsx` - Test utility page (NEW)

## 🎯 Summary

এখন আপনার application এ **triple-layer protection** আছে token expiry এর জন্য:
- RTK Query calls
- Direct API calls
- Initial auth check

যেকোনো জায়গা থেকে 401/403 error আসলে user automatically logout হয়ে login page এ redirect হবে proper message সহ। 🎉
