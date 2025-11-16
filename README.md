# project-4

## My sick web app
Faux login system and website that queries SQL with node-postgres to get "account" information and use it on an Express React web app. The "questions" on the site are actually fetched from a .json file.

### How to use
1. Download and extract zip OR clone this repository
2. Create a local MySQL server under port 3000 and run `db-gen.sql` on this server.
3. Change the `password` field in `backend/db.js` to the password of the root account of this server.
4. Open two terminals (I used Git Bash, your mileage may vary) and navigate one to `frontend/fullstack-app` and the other to `backend`.
5. On the frontend terminal, run command `npm run dev` and on the backend terminal run command `nodemon server.js`. If this doesn't work, you may have to use `npm install` to install `axios` and `cors` on the frontend; and `cors`, `express` and `mysql2` on the backend.
6. Click the local link that appears in the frontend terminal. Have fun!

