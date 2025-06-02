# Make Note Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the backend directory with the following:
   ```env
   MONGO_URL=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_jwt_secret
   ```
3. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:8000`.

## API Endpoints

### Auth
- `POST /create-account` — Register a new user
  - Body: `{ fullName, email, password }`
- `POST /login` — Login user
  - Body: `{ email, password }`

### Notes (require Authorization header: `Bearer <token>`)
- `POST /add-note` — Add a new note
  - Body: `{ title, content, tags, isPinned }`
- `GET /notes` — Get all notes for the logged-in user
- `PUT /note/:id` — Update a note
  - Body: `{ title, content, tags }`
- `DELETE /note/:id` — Delete a note
- `PATCH /note/:id/pin` — Pin/unpin a note

## Models
- **User:** fullName, email, password (hashed), createdOn
- **Note:** title, content, tags, isPinned, userId, createdOn 