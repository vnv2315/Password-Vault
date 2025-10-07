# Password Vault

Live demo: https://password-vault-dam6.vercel.app/

Short description
A Password manager that stores vault items encrypted on the client and uses JWT auth for user sessions. The frontend is a Next.js app; the backend is a Node/Express API with MongoDB.

Tech stack

- Frontend
  - Next.js (React)
  - Client-side encryption (CryptoJS)
  - JWT-based auth (client stores token)
  - Standard web tooling (PostCSS, plain CSS)

- Backend
  - Node.js + Express
  - MongoDB with Mongoose
  - jsonwebtoken for auth
  - bcrypt for password hashing

Project structure (top-level)
- server/        — backend API (Express, controllers, models, routes)
- user/          — Next.js frontend (pages/app, components, utils)
- Readme.md      — this file
- .env / .env.local — environment configs (not committed)

Quick notes
- The frontend currently uses a NEXT_PUBLIC env var for the crypto key (visible in the bundle). For production, consider deriving per-user keys or keeping secrets server-side.
- If vault items display as ciphertext in the UI, check your frontend env key and the stored token.

Support
For issues or help, please open an issue in the repository or contact the project owner.

Thank you!
