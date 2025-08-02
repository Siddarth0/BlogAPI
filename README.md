# BlogAPI
A RESTful blog backend built with Node.js, Express, and MongoDB—featuring CRUD, comments, tags, and validation. Developed for EB Pearls' backend assignment.

A simple and robust **RESTful API** for managing blogs with **user authentication, comments, tags, search, and pagination**.  

Built with **Node.js, Express, and MongoDB**, this API demonstrates clean architecture, secure authentication using JWT, and best practices for scalability.  

---

## 📡 Live API

The Blog API is deployed on Render:

**Base URL:** [https://blogapi-evgh.onrender.com](https://blogapi-evgh.onrender.com)

### Example Endpoints

- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Login to get JWT token
- `GET /api/blogs` → Fetch all blogs (requires JWT)

---

## 🚀 Features

- **User Authentication**
  - Register and Login with JWT-based authentication.
- **Blog Management (CRUD)**
  - Create, Read, Update, and Delete blog posts.
  - Author field automatically set from logged-in user.
- **Tags and Comments**
  - Add tags to blogs.
  - Comment on blog posts (protected routes).
- **Search & Filtering**
  - Filter by tags or search blogs by title/description.
- **Pagination & Sorting**
  - Efficiently load large blog lists with page & limit queries.
  - Sort blogs by creation date (ascending or descending).
- **Secure and Scalable**
  - Passwords are hashed with bcrypt.
  - JWT protects sensitive endpoints.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Other:** Dotenv, Nodemon, bcrypt

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd blog-api
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Configure Environment Variables

1. Copy `.env.example` → `.env`  
2. Fill in the required values:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> 💡 Tip: Generate a JWT secret using:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

---

### 4️⃣ Start the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Server will start at:  
```
http://localhost:8080
```

You should see:
```
MongoDB Connected successfully
Server running on http://localhost:8080
```

---

## 📖 API Usage

### Auth Routes
| Method | Endpoint               | Description          | Protected |
|--------|------------------------|---------------------|-----------|
| POST   | `/api/auth/register`    | Register a new user | ❌        |
| POST   | `/api/auth/login`       | Login user & get JWT| ❌        |

**Register Example (POST /api/auth/register)**

```json
{
  "name": "John Tester",
  "email": "john@test.com",
  "password": "123456"
}
```

✅ Response:
```json
{
  "_id": "...",
  "name": "John Tester",
  "email": "john@test.com",
  "token": "eyJhbGciOiJI..."
}
```

---

### Blog Routes
| Method | Endpoint           | Description                 | Protected |
|--------|-------------------|----------------------------|-----------|
| GET    | `/api/blogs`       | Get all blogs (with pagination, search, and sorting) | ❌ |
| GET    | `/api/blogs/:id`   | Get single blog            | ❌        |
| POST   | `/api/blogs`       | Create new blog            | ✅        |
| PUT    | `/api/blogs/:id`   | Update existing blog       | ✅        |
| DELETE | `/api/blogs/:id`   | Delete a blog              | ✅        |
| POST   | `/api/blogs/:id/comment` | Add a comment        | ✅        |

---

### Query Parameters for GET /api/blogs

- `page` → Page number (default: 1)
- `limit` → Number of blogs per page (default: 10)
- `sort` → `asc` (oldest first) or `desc` (newest first)
- `tag` → Filter by tag
- `search` → Search by title or description (requires text index)

**Example:**
```
GET /api/blogs?page=2&limit=5&sort=asc&tag=node&search=express
```

---

### Authorization

Protected routes require a **Bearer Token**:

**Header Example:**
```
Authorization: Bearer <your-token-here>
```

---

## 💡 Example Workflows

1. **Register or Login** → Get JWT Token.  
2. **Use Token** to create a blog:  
   ```json
   {
     "title": "My First Blog",
     "description": "Testing my blog API",
     "tags": ["test", "api"]
   }
   ```
3. **View blogs with pagination & filters**:  
   ```
   GET /api/blogs?page=1&limit=3&sort=desc
   ```
4. **Add comments** to blogs:
   ```
   POST /api/blogs/:id/comment
   ```

---

## 🗄️ MongoDB Indexing for Search

To enable text search on `title` and `description`:

```js
db.blogs.createIndex({ title: "text", description: "text" });
```

---

## 📬 Postman Collection
To make testing easier, I’ve prepared a Postman collection with all API endpoints and example requests.

You can access it here:
[Open Postman Workspace & Collection](https://platform-api-team-5250.postman.co/workspace/My-Workspace~e1bcf579-9631-4aa5-8ad6-2b759527e40f/collection/45632148-8f60167f-6e51-4bd2-a745-ac8a655d108c?action=share&creator=45632148)

## 🙏 Thank You

Thank you for taking the time to review my submission for the **ebPearls API Development Challenge**.  
I truly appreciate the opportunity to demonstrate my skills.  

Looking forward to your valuable feedback!  

**– Siddartha Kunwar**

