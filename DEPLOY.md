# Deploying Skills Notebook to Vercel + Supabase

This guide gets your app live with a hosted database in about 10 minutes.

---

## Step 1 — Create a free Supabase database

1. Go to [supabase.com](https://supabase.com) and sign up (free).
2. Click **New project**, give it a name, choose a region close to you, and set a database password.
3. Wait ~1 minute for the project to finish setting up.
4. In the left sidebar, go to **Settings → Database**.
5. Scroll down to **Connection string** and choose the **URI** tab.
6. Copy the full connection string — it looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxx.supabase.co:5432/postgres
   ```
   Replace `[YOUR-PASSWORD]` with the password you set in step 2.

---

## Step 2 — Deploy to Vercel

1. Push this repo to GitHub (if you haven't already).
2. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account.
3. Click **Add New → Project** and import your GitHub repository.
4. On the configuration screen, leave all defaults as-is and click **Deploy**.
5. Once deployed, go to your project's **Settings → Environment Variables**.
6. Add a new variable:
   - **Name:** `DATABASE_URL`
   - **Value:** the connection string you copied from Supabase
7. Click **Save**, then go to **Deployments** and click **Redeploy** (so the new variable takes effect).

Your app is now live! The URL shown in Vercel is your public address.

---

## Local development

To run the app locally with the same Supabase database, create a `.env` file in the project root:

```
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxx.supabase.co:5432/postgres
```

Then install [dotenv](https://www.npmjs.com/package/dotenv) or use a tool like `dotenv-cli`:

```bash
npm install dotenv-cli --save-dev
npx dotenv node server.js
```

Or set the variable in your shell before running `npm start`.

---

## Notes

- The `comments` table is created automatically on first start — you don't need to run any SQL manually.
- All users on the Vercel URL share the same database, so comments are visible to everyone.
- To reset all comments, you can delete and recreate the table in the Supabase dashboard under **Table Editor**.
