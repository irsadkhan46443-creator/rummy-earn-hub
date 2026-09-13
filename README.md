# Rummy Pay: Earn & Trade

Build a complete full-stack mobile-first web app called "Rummy Pay" – exactly like a popular Indian USDT/INR trading + referral earning platform.



Use a vibrant green-to-yellow gradient header (like #00C853 to #FFB300), clean modern UI with rounded cards, soft shadows, bold fonts, and a fixed bottom navigation bar with icons: Home, Order, Team, and Profile. Add "Edit with ❤️ Lovable" badge at the bottom right like in real apps.



App must have these exact pages and features:



1. **Onboarding / Login**: Simple phone number login. After login, show "Hello, 762***541 👋" and auto-generated User ID like "ALRJDS86". Store user data (User ID, Phone, Referral Code).



2. **Home Dashboard**:

   - Big green card: "Total Balance ₹200" with Deposit button.

   - 4 quick action cards: Deposit (wallet icon), Task (clipboard), Team (people), Order (menu).

   - Current Rate banner: "1 USDT = ₹105".

   - Two buttons: Customer Service + Official Channel.

   - Newbie Task section: "No top-up orders yet" with big green "Top up now" button.



3. **Buy / Order Page** (main money-making screen):

   - Top banner: "Cashback 9% on Every Order!" with emoji.

   - Tabs: UPI and USDT.

   - List of 6 buy packages (exactly like screenshots):

     - Price ₹300 → Reward ₹27 + Bonus ₹45 = Total ₹372

     - Price ₹450 → Reward ₹40.5 + Bonus ₹68 = Total ₹558.5

     - And so on up to ₹1300+ (show Price + Reward 9% + Bonus + Total, green Buy button).

   - On Buy: Simulate successful order, add reward/bonus to wallet, show order number like "No:487298300467674118", update Total Orders.



4. **Team Page** (Invite & Earn):

   - Header: Crown icon + "Invite & Earn".

   - Stats: Total Commission ₹0.00, My Total Profit ₹0.00, Yesterday Team Commission, Today Team Commission.

   - Invitation Link section: Invite Code (auto random like RYVSX4 + copy button), full link https://rummypay.lovable.app/register?invite=RYVSX4.

   - Commission levels (colored cards): Level A = Buy × 9%, Level B = Buy × 6%, Level C = Buy × 3%.

   - My Team section: 3 cards (Level A 0, Level B 0, Level C 0 members) with yellow/blue/beige colors.



5. **My Asset Page**:

   - Three top cards: Deposit ₹0, Withdraw ₹0, Commission ₹0 (with icons).

   - User details: User ID, Phone, Total Orders = 1.

   - Menu list: Wallet, Order History, Bank Details, USDT Deposit, Service.

   - Big red Logout button at bottom.



6. **Withdrawal Page**:

   - Minimum withdrawal ₹300.

   - Available Balance ₹200 (or current wallet).

   - Tabs: UPI (selected by default) and Bank Account.

   - Input fields: UPI ID, Amount (min ₹300).

   - Green Submit button.



Backend & Logic (very important):

- Use Supabase for auth + database.

- Referral system: Multi-level MLM. New user with invite code becomes Level A of referrer → their buys give 9% to Level A, 6% to Level B, 3% to Level C of the chain.

- Every Buy automatically calculates 9% reward + bonus and adds to wallet + distributes commissions to team.

- Wallet balance in INR. All numbers and texts should match screenshots exactly.

- Fake realistic data on first load (balance ₹200, some orders, etc.).

- Make it look 100% like the screenshots (same colors, layout, texts, icons, emojis).



Start building with the bottom navigation + Home dashboard first, then add other pages with routing. Make it fully functional and beautiful.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/933029af-a710-4f7a-aa5d-75c8b5a48e0c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
