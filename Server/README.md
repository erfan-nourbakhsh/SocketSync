# 🖥️ SocketSync Server

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.17.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.1.2-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)](https://www.microsoft.com/en-us/sql-server)

*High-performance Node.js server powering real-time multi-client data communications*

</div>

## 📋 Overview

The **SocketSync Server** is a robust Node.js application built with Express.js and Socket.IO that serves as the central hub for managing multi-client connections, data records, and real-time communications. It provides a comprehensive backend infrastructure for multi-client socket programming with integrated database management.

## ✨ Core Features

### 🔗 Real-time Socket Management
- **Multi-client Support**: Simultaneous client connections with automatic session tracking
- **Connection Lifecycle**: Automatic registration and cleanup of client connections
- **Event-driven Architecture**: WebSocket-based bidirectional communication
- **Admin Monitoring**: Socket.IO Admin UI integration for connection debugging

### 🗄️ Database Operations
- **Microsoft SQL Server Integration**: Native Windows Authentication support
- **CRUD Operations**: Complete data record management across multiple clients
- **Bulk Data Processing**: Efficient CSV import with batch operations
- **Data Integrity**: Transaction-safe database operations

### 📊 Statistical Computing Engine
- **Real-time Analytics**: On-demand performance calculations and rankings
- **Complex Queries**: Advanced SQL operations for statistical analysis
- **Performance Optimization**: Efficient query execution for large datasets
- **Result Caching**: Optimized response times for repeated operations

### 💬 Communication Hub
- **Live Chat System**: Real-time messaging between connected clients
- **Message Broadcasting**: Instant message delivery to all active clients
- **Session Persistence**: Chat history maintained during active connections
- **Client Identification**: Automatic user tagging with client information

## 🏗️ Architecture

```
Express.js HTTP Server
├── Socket.IO WebSocket Layer
│   ├── Connection Management
│   ├── Event Handlers
│   └── Room/Namespace Support
├── Database Layer (SQL Server)
│   ├── Client Management
│   ├── Data Records
│   └── Performance Data
└── Admin Interface
    ├── Connection Monitoring
    └── Real-time Debugging
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16+ and npm
- **Microsoft SQL Server** with Windows Authentication
- **Database Setup**: Create database named "Test" with required tables

### Installation

1. **Navigate to server directory**
   ```bash
   cd Server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure database connection**
   Edit the database configuration in `app.js`:
   ```javascript
   var config = {
     database: "Test",                    // Your database name
     server: "YOUR-SERVER-NAME",          // SQL Server instance name
     driver: "msnodesqlv8",              // Driver for Windows Auth
     options: { trustedConnection: true } // Use Windows Authentication
   };
   ```

4. **Start the server**
   ```bash
   node app.js
   ```

5. **Verify startup**
   - Server runs on `http://localhost:8080`
   - Console displays "Connected To SQL Successfully"
   - Socket.IO Admin UI available at configured endpoint

## 📦 Dependencies

### Core Framework
- **express** `^4.17.1` - Fast, unopinionated web framework for Node.js
- **socket.io** `^4.1.2` - Real-time bidirectional event-based communication
- **http** (built-in) - Node.js HTTP server module

### Database Integration
- **mssql** `^8.1.2` - Microsoft SQL Server client for Node.js
- **msnodesqlv8** `^2.4.8` - Native SQL Server driver with Windows Authentication

### Utilities & Security
- **crypto** `^1.0.1` - Cryptographic functionality for UUID generation
- **@socket.io/admin-ui** `^0.3.0` - Administration interface for Socket.IO

### Development Tools
- **prettier** (dev) - Code formatting for consistent style
- **pcap-parser** `^0.2.1` - Network packet analysis capabilities

## 📡 Socket Events API

### Client Registration Events
| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `connection` | Client → Server | - | Initial client connection |
| `disconnect` | Client → Server | - | Client disconnection |
| `sendFacultyName` | Client → Server | `string` | Register faculty name |

### Student Management Events
| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `sendStudents` | Client → Server | `StudentObject` | Add individual student |
| `sendStudentsCSV` | Client → Server | `CSV string` | Bulk student import |

### Statistical Operations
| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `Average` | Client → Server | - | Request GPA calculations |
| `Average-result` | Server → Client | `Array<{national_code, grade_avg}>` | GPA results |
| `Sort` | Client → Server | - | Request student ranking |
| `Sort-result` | Server → Client | `Array<{id_number, avg_deg}>` | Sorted results |
| `Max` | Client → Server | - | Request top performer |
| `Max-result` | Server → Client | `Array<{first_name, last_name, avg_deg}>` | Top student |
| `Min` | Client → Server | - | Request lowest performer |
| `Min-result` | Server → Client | `Array<{first_name, last_name, avg_deg}>` | Lowest student |

### Communication Events
| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `message` | Client → Server | `string` | Send chat message |
| `message` | Server → Client | `MessageObject` | Broadcast message |
| `getMessages` | Client → Server | - | Request message history |

## 🗄️ Database Schema

### Tables Structure

#### faculties
```sql
CREATE TABLE faculties (
    id INT IDENTITY(1,1) PRIMARY KEY,
    client_id NVARCHAR(255) UNIQUE,
    name NVARCHAR(255),
    origin NVARCHAR(255),
    address NVARCHAR(255),
    ac CHAR(1) -- Active status (1=active, 0=inactive)
);
```

#### students
```sql
CREATE TABLE students (
    id INT IDENTITY(1,1) PRIMARY KEY,
    client_id NVARCHAR(255),
    user_id NVARCHAR(255) UNIQUE,
    first_name NVARCHAR(255),
    last_name NVARCHAR(255),
    national_code NVARCHAR(20),
    id_number NVARCHAR(20),
    FOREIGN KEY (client_id) REFERENCES faculties(client_id)
);
```

#### courses
```sql
CREATE TABLE courses (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id NVARCHAR(255),
    course_name NVARCHAR(255),
    course_grade NVARCHAR(10),
    FOREIGN KEY (user_id) REFERENCES students(user_id)
);
```

## 💾 Data Models

### Student Object
```javascript
{
  first_name: "John",
  last_name: "Smith", 
  national_code: "1234567890",
  id_number: "STU001",
  courses: [
    { course_name: "Mathematics", course_grade: "85" },
    { course_name: "Physics", course_grade: "92" },
    // ... up to 5 courses
  ]
}
```

### Message Object
```javascript
{
  id: "uuid-string",
  user: "Faculty Name",
  value: "Message content",
  time: 1638360000000,
  isYou: true // If sender matches current client
}
```

### CSV Format
```csv
first_name,last_name,national_code,id_number,course1,grade1,course2,grade2,course3,grade3,course4,grade4,course5,grade5
John,Smith,1234567890,STU001,Math,85,Physics,92,Chemistry,78,Biology,88,English,90
```

## 📊 Query Examples

### Average Grade Calculation
```sql
SELECT students.national_code,
       (SELECT AVG(CAST(course_grade AS FLOAT)) 
        FROM students 
        NATURAL JOIN courses 
        ON client_id='socket_id' 
        AND students.user_id=courses.user_id) as grade_avg
FROM students 
WHERE client_id='socket_id'
```

### Student Ranking (Sort)
```sql
SELECT id_number, avg_deg
FROM students 
JOIN (SELECT user_id, AVG(CAST(courses.course_grade AS FLOAT)) as avg_deg 
      FROM courses 
      GROUP BY user_id) as x
ON students.user_id = x.user_id 
AND client_id = 'socket_id' 
ORDER BY avg_deg
```

## 🔧 Configuration

### Database Connection
Update the SQL Server configuration in `app.js`:
```javascript
var config = {
  database: "YOUR_DATABASE_NAME",
  server: "YOUR_SERVER_INSTANCE",
  driver: "msnodesqlv8",
  options: { 
    trustedConnection: true,  // Windows Authentication
    trustServerCertificate: true // For development
  }
};
```

### CORS Configuration
Socket.IO CORS settings for client connections:
```javascript
const io = require("socket.io")(server, {
  cors: {
    origin: "*",        // Allow all origins (configure for production)
    credentials: true   // Allow credentials
  }
});
```

### Admin UI Setup
```javascript
instrument(io, { 
  auth: false,  // Disable authentication for development
  mode: "development"
});
```

## 🛠️ Development Tools

### Code Formatting
```bash
npm run format  # Format code with Prettier
```

### Database Management
- Use SQL Server Management Studio (SSMS)
- Monitor connection pools and active sessions
- Analyze query performance with execution plans

### Socket.IO Admin Interface
- Access admin panel for real-time connection monitoring
- View active rooms and namespaces
- Debug socket events and payloads

## 📈 Performance Optimization

### Database Optimization
- **Connection Pooling**: Reuse database connections
- **Query Indexing**: Index on frequently queried columns
- **Batch Operations**: Group related SQL operations
- **Result Caching**: Cache statistical calculations

### Socket.IO Optimization
- **Room Management**: Organize clients into logical rooms
- **Event Throttling**: Limit high-frequency events
- **Memory Management**: Clean up disconnected sessions
- **Load Balancing**: Distribute connections across instances

## 🔒 Security Considerations

### Database Security
- Use parameterized queries to prevent SQL injection
- Implement connection string encryption
- Enable SQL Server audit logging
- Regular security updates and patches

### Socket Security
- Implement authentication middleware
- Validate all incoming data
- Rate limiting for socket events
- CORS configuration for production

### Data Protection
- Encrypt sensitive student information
- Implement data retention policies
- Regular backup procedures
- Access logging and monitoring

## 🧪 Testing

### Manual Testing
```bash
# Start server
node app.js

# Connect multiple clients
# Test socket events with browser dev tools
# Verify database operations
```

### Database Testing
```sql
-- Test data insertion
INSERT INTO faculties (client_id, name) VALUES ('test-id', 'Test Faculty');

-- Verify statistical queries
SELECT AVG(CAST(course_grade AS FLOAT)) FROM courses;
```

## 🚀 Deployment

### Production Setup
1. **Environment Configuration**
   ```bash
   export NODE_ENV=production
   export DB_SERVER=production-server
   export DB_NAME=production-db
   ```

2. **Process Management**
   ```bash
   # Using PM2
   npm install -g pm2
   pm2 start app.js --name university-server
   pm2 startup
   pm2 save
   ```

3. **Load Balancing**
   ```bash
   # Multiple instances
   pm2 start app.js -i max --name university-cluster
   ```

### Monitoring
- **Application Logs**: Winston or similar logging framework
- **Database Monitoring**: SQL Server Performance Monitor
- **Socket Metrics**: Custom Socket.IO middleware
- **Health Checks**: Express health check endpoints

## 🐛 Troubleshooting

### Common Issues

**Database Connection Failed**
- Verify SQL Server is running and accessible
- Check Windows Authentication configuration
- Confirm database name exists
- Review firewall settings

**Socket Connection Issues**
- Verify port 8080 is available and not blocked
- Check CORS configuration for client origin
- Review Socket.IO version compatibility
- Monitor connection limits and resource usage

**Performance Problems**
- Analyze SQL query execution plans
- Monitor memory usage and garbage collection
- Check database connection pool settings
- Review Socket.IO event frequency

### Debug Mode
```bash
# Enable Socket.IO debugging
DEBUG=socket.io* node app.js

# Enable SQL debugging
DEBUG=mssql* node app.js
```

## 📚 API Documentation

For detailed API documentation and socket event specifications, refer to:
- Socket.IO official documentation
- Microsoft SQL Server Node.js driver docs
- Express.js middleware documentation

## 🤝 Contributing

### Development Guidelines
1. Follow Node.js best practices
2. Implement proper error handling
3. Write comprehensive tests
4. Document new socket events
5. Maintain database schema consistency

### Code Standards
- Use async/await for asynchronous operations
- Implement proper logging
- Handle socket disconnections gracefully
- Validate all input data

---

<div align="center">
  <sub>SocketSync Server - Powered by Node.js, Express.js, and Socket.IO</sub>
</div>
