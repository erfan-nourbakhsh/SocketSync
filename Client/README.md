# 🌐 SocketSync Client

<div align="center">

[![React](https://img.shields.io/badge/React-18.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.8.3-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.4.0-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)

*Modern React frontend for real-time multi-tenant data management and analytics*

</div>

## 📋 Overview

The **SocketSync Client** is a sophisticated React-based web application that serves as the frontend interface for multi-tenant data management. It provides an intuitive, real-time platform for managing data records, performing statistical analysis, and facilitating inter-client communication.

## ✨ Key Features

### 👥 Data Management
- **Individual Registration**: Comprehensive record creation with personal details and performance metrics
- **Bulk CSV Import**: Efficient mass data import with drag-and-drop file upload
- **Real-time Validation**: Form validation with immediate feedback
- **Dynamic Entry**: Support for 5 performance categories per record

### 📊 Analytics Dashboard  
- **Performance Statistics**: Live computation of record averages, rankings, and extremes
- **Interactive Tables**: Sortable, styled data presentation with Material-UI components
- **Real-time Updates**: Instant synchronization with server-side calculations
- **Operation Selection**: Choose from Average, Sort, Min, Max operations

### 💬 Communication Hub
- **Live Chat System**: Real-time messaging between connected clients
- **Message Persistence**: Chat history maintained during active sessions
- **Client Identification**: Messages tagged with client names
- **Broadcast Messaging**: All connected clients receive messages instantly

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16+ and npm
- **Server Application** running on `localhost:8080`

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode on [http://localhost:3000](http://localhost:3000) |
| `npm test` | Launches the test runner in interactive watch mode |
| `npm run build` | Builds the app for production to the `build` folder |
| `npm run eject` | **One-way operation** - ejects from Create React App |

## 📦 Tech Stack

### Core Dependencies
- **React 18.1.0** - Modern component-based UI framework
- **Material-UI 5.8.3** - Professional design system components
- **Socket.IO Client 4.4.0** - Real-time WebSocket communication
- **Papa Parse 5.3.2** - CSV file processing
- **SweetAlert2 11.4.17** - Beautiful popup notifications
- **React TSParticles 2.0.6** - Interactive particle animations

## 🎯 Core Components

### TeenagerModal
Student registration with form validation and CSV import

### InformationModal  
Analytics dashboard for statistical operations (Average, Sort, Min, Max)

### Messages
Real-time chat interface for faculty communication

### CustomTable Components
Styled data presentation for different statistical operations

## 🔧 Configuration

### Socket Connection
```javascript
const newSocket = io(`http://localhost:8080/`);
```

### CSV Import Format
```csv
first_name,last_name,national_code,id_number,course1,grade1,course2,grade2,course3,grade3,course4,grade4,course5,grade5
```

## 📱 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Real-time Updates**: Instant synchronization with server
- **Material Design**: Professional UI following Google's guidelines
- **Form Validation**: Comprehensive input checking
- **File Upload**: Drag-and-drop CSV import
- **Success Notifications**: User feedback with SweetAlert2

## 🧪 Testing

```bash
# Run tests in watch mode
npm test

# Run tests with coverage
npm test -- --coverage
```

## 🚀 Deployment

The build folder contains optimized static files ready for deployment to:
- Netlify, Vercel, GitHub Pages
- Traditional web servers (Apache, Nginx)
- CDN services (CloudFront, CloudFlare)

---

<div align="center">
  <sub>SocketSync Client - Built with ❤️ using React and Material-UI</sub>
</div>
