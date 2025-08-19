<div align="center">

<img src="assets/fig1.png" alt="SocketSync Logo" width="200" height="200">

# SocketSync - Real-Time Multi-Client Socket Programming Platform

</div>

<div align="center">

[![React](https://img.shields.io/badge/React-18.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.1.2-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)](https://www.microsoft.com/en-us/sql-server)

*A comprehensive real-time client-server application for multi-tenant data management and analytics*

[Features](#-features) • [Architecture](#️-architecture) • [Quick Start](#-quick-start) • [Documentation](#-documentation)

</div>

## 📋 Project Overview

This project demonstrates advanced **socket programming** concepts through a real-time multi-tenant management system. Multiple client instances can simultaneously connect to a central server to manage data records, perform statistical operations, and communicate via integrated chat functionality.

### 🎯 Core Concept

The system implements a **scalable multi-client architecture** where:
- **Server**: Acts as the central data hub and coordination engine
- **Clients**: Represent different tenant instances managing their datasets
- **Real-time Communication**: Powered by WebSocket connections for instant data synchronization

## ✨ Features

### 🖥️ Server Capabilities
- **Multi-client Socket Management** with automatic connection tracking
- **Real-time Database Operations** using Microsoft SQL Server
- **Statistical Computing Engine** for data performance analytics
- **Live Chat System** with message broadcasting
- **CSV Bulk Import** support for efficient data entry

### 💻 Client Features
- **Modern React Interface** with Material-UI components
- **Interactive Data Management** with form validation
- **Real-time Data Visualization** through dynamic tables
- **Statistical Operations Dashboard** (Average, Min, Max, Sort)
- **File Upload Integration** for CSV data imports
- **Live Chat Integration** for client communication

### 📊 Statistical Operations
- **Average**: Calculate and display performance averages for all records with IDs
- **Sort**: Rank records by performance metrics
- **Max**: Identify top-performing records in the dataset
- **Min**: Find records needing attention or improvement
- **Visit**: Quick data inspection with detailed reporting

## 🏗️ Architecture

```
┌─────────────────┐    WebSocket/HTTP   ┌───────────────────┐
│   React Client  │ ◄─────────────────► │   Node.js Server  │ 
│   (Faculty UI)  │                     │  (Express + IO)   │
└─────────────────┘                     └───────────────────┘
         │                                        │
         │                                        │
    ┌────▼────┐                              ┌────▼───────┐
    │Material │                              │  SQL Server│
    │UI + CSS │                              │  Database  │
    └─────────┘                              └────────────┘
```

### Communication Flow
1. **Handshake**: Client connects to server via Socket.IO
2. **Registration**: Faculty details stored in database
3. **Data Exchange**: Student records transmitted in real-time
4. **Operations**: Statistical queries processed server-side
5. **Results**: Computed data returned to requesting client

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ and npm
- **Microsoft SQL Server** with Windows Authentication
- **Git** for cloning the repository

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/erfan-nourbakhsh/SocketSync.git
   cd SocketSync
   ```

2. **Setup the Server**
   ```bash
   cd Server
   npm install
   # Configure database connection in app.js (lines 27-32)
   npm start
   ```

3. **Setup the Client**
   ```bash
   cd ../Client
   npm install
   npm start
   ```

4. **Access the Application**
   - Server: `http://localhost:8080`
   - Client: `http://localhost:3000`
   - Multiple clients can connect simultaneously

## 📖 Documentation

### Database Schema
The system uses three main tables:
- **faculties**: Client connection and faculty information
- **students**: Personal details and academic records  
- **courses**: Subject-wise grades and performance data

### Socket Events
| Event | Direction | Description |
|-------|-----------|-------------|
| `sendFacultyName` | Client → Server | Register faculty name |
| `sendStudents` | Client → Server | Add individual student |
| `sendStudentsCSV` | Client → Server | Bulk import via CSV |
| `Average` | Client → Server | Request GPA calculations |
| `Sort` | Client → Server | Request ranked student list |
| `Max/Min` | Client → Server | Request performance extremes |

### CSV Format
```csv
first_name,last_name,national_code,id_number,course1,grade1,course2,grade2,course3,grade3,course4,grade4,course5,grade5
John,Doe,1234567890,STU001,Math,85,Physics,92,Chemistry,78,Biology,88,English,90
```

## 🛠️ Technical Stack

### Backend
- **Express.js**: Web application framework
- **Socket.IO**: Real-time bidirectional communication
- **msnodesqlv8**: Microsoft SQL Server integration
- **crypto**: UUID generation for unique identifiers

### Frontend
- **React 18**: Modern component-based UI framework
- **Material-UI v5**: Professional design system
- **Socket.IO Client**: WebSocket client implementation
- **Papa Parse**: CSV file processing
- **SweetAlert2**: Enhanced user notifications

## 🔧 Configuration

### Server Configuration
Edit `Server/app.js` to configure your SQL Server connection:
```javascript
var config = {
  database: "YOUR_DATABASE_NAME",
  server: "YOUR_SERVER_NAME", 
  driver: "msnodesqlv8",
  options: { trustedConnection: true }
};
```

### Client Configuration
The client connects to `localhost:8080` by default. Update the socket connection in `Client/src/App.js` if needed:
```javascript
const newSocket = io(`http://your-server-url:8080/`);
```

## 📚 Advanced Features

### Real-time Chat System
- Faculty members can communicate instantly
- Message persistence during session
- User identification with faculty names
- Broadcast messaging to all connected clients

### Performance Analytics
- **GPA Calculations**: Automatic average computation
- **Ranking System**: Student performance sorting
- **Statistical Insights**: Min/max performance identification
- **Data Export**: Results formatted for further analysis

### File Management
- **CSV Import**: Bulk student data upload
- **Form Validation**: Comprehensive input checking
- **Error Handling**: Graceful failure management
- **Success Notifications**: User feedback system

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

- 🍴 Fork the repository
- 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
- 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
- 📤 Push to the branch (`git push origin feature/amazing-feature`)
- 🔄 Open a Pull Request

## 📧 Contact

- 👤 Author: Erfan Nourbakhsh
- 🌐 Project Link: https://github.com/erfan-nourbakhsh/SocketSync
- 📝 Issues: Report bugs or request features
- 💼 LinkedIn: [erfan-nourbakhsh](https://www.linkedin.com/in/erfan-nourbakhsh-221540197/)

---

<div align="center">
  <sub>SocketSync - Built with ❤️ for educational purposes in network programming and real-time applications</sub>
</div>
