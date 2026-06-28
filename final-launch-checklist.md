# BabalSharma Studio — Final Launch Checklist

## 1) Firebase console
- Enable **Authentication > Email/Password**.
- Create at least one admin account in Firebase Auth.
- Add admin access doc at `admins/{ADMIN_UID}`.
- Create Firestore in **production mode**.
- Deploy `firestore.rules` and `storage.rules`.

## 2) Firestore collections used by this site
- `admins`
- `clients`
- `orders`
- `services`

## 3) Required service fields
Each service document should include:
- `category` (string)
- `name` (string)
- `description` (string)
- `imageUrl` (string, optional)
- `oldPrice` (number)
- `offerPrice` (number)
- `advancePercent` (number)
- `deliveryHours` (number)
- `status` (recommended: `Active`)
- `createdAt` / `updatedAt` (timestamp)

## 4) Before going live
- Replace `91XXXXXXXXXX` with your real WhatsApp number.
- Replace any placeholder social/profile links.
- Test signup, login, password reset, logout.
- Test service creation from admin dashboard.
- Test order creation from client account.
- Test admin order status and payment status updates.
- Test 404 page on a wrong URL.
- Review all pricing and delivery timings.

## 5) Recommended deploy commands
```bash
firebase login
firebase use babalsharmastudioadmin
firebase deploy --only firestore:rules,storage,hosting
```

## 6) After launch
- Add real order-payment gateway only when you are ready.
- Back up Firestore regularly.
- Compress large images later for better Lighthouse scores.
- Add privacy/terms updates if your business/legal text changes.

## 7) Final status
This version is launch-ready for a portfolio + client portal + admin-controlled workflow.
Anything beyond this is optional enhancement, not a required final step.
