/**
 * Server for managing students, faculties, courses, and chat messages
 * Uses Express, Socket.IO, and Microsoft SQL Server (msnodesqlv8)
 */

const express = require("express"); // Import Express.js for HTTP server
const app = express(); // Create an Express application instance
const server = require("http").createServer(app); // Create HTTP server using Express app
const { instrument } = require("@socket.io/admin-ui"); // Admin UI for Socket.IO monitoring
const sql = require("mssql/msnodesqlv8"); // Microsoft SQL Server client with Node.js driver
const crypto = require("crypto"); // Node.js crypto module for UUID generation

// Initialize Socket.IO server and enable CORS for all origins
const io = require("socket.io")(server, {
  cors: {
    origin: "*",        // Allow any origin
    credentials: true,  // Allow credentials
  },
});

const messages = new Set(); // Set to store chat messages

// Instrument Socket.IO with admin UI (no authentication)
instrument(io, { auth: false });

// SQL Server configuration
var config = {
  database: "Test",                  // Database name
  server: "LAPTOP-705E4FCS",        // SQL Server hostname
  driver: "msnodesqlv8",             // Driver type
  options: { trustedConnection: true }, // Windows Authentication
};

// Connect to SQL Server
sql.connect(config, (err) => {
  console.log("Connected To SQL Successfully"); // Log connection status
  if (!err) {
    // Clear old data for fresh start
    sql.query("DELETE FROM faculties", function (err, result) {
      if (err) throw err;
      console.log("Faculties Deleted");
    });
    sql.query("DELETE FROM students", function (err, result) {
      if (err) throw err;
      console.log("Students Deleted");
    });
    sql.query("DELETE FROM courses", function (err, result) {
      if (err) throw err;
      console.log("Courses Deleted");
    });
  }
});

// Handle Socket.IO client connections
io.on("connection", (socket) => {
  // Insert a new faculty entry for this connected client
  sql.query(
    `INSERT INTO faculties (client_id, name, origin, address, ac) VALUES ('${socket.id}',NULL,'${socket.handshake.headers.origin}','${socket.handshake.address}','1')`
  );

  // Handle client disconnect
  socket.on("disconnect", () => {
    // Mark faculty as inactive
    sql.query(`UPDATE faculties SET ac = '0' WHERE client_id = '${socket.id}'`);
  });

  // Update faculty name
  socket.on("sendFacultyName", (facultyName) => {
    sql.query(
      `UPDATE faculties SET name = '${facultyName}' WHERE client_id = '${socket.id}'`
    );
  });

  console.log("Connected", socket.id); // Log connection

  // Handle CSV upload for multiple students
  socket.on("sendStudentsCSV", (studentsList) => {
    // Split CSV by lines, skip header
    for (let i = 1; i < studentsList.split("\r\n").length - 1; i++) {
      let line = studentsList.split("\r\n")[i].split(","); // Split CSV line by comma
      let first_name = line[0];
      let last_name = line[1];
      let national_code = line[2];
      let id_number = line[3];
      const userId = crypto.randomUUID(); // Generate unique user ID

      // Insert student into database
      sql.query(
        `INSERT INTO students (client_id,user_id, first_name, last_name, national_code, id_number) VALUES ('${socket.id}','${userId}','${first_name}','${last_name}','${national_code}','${id_number}')`
      );

      // Insert courses for this student (5 courses, 2 columns per course)
      for (let j = 0; j < 10; j += 2) {
        sql.query(
          `INSERT INTO courses (user_id, course_name, course_grade) VALUES ('${userId}','${
            line[j + 4]
          }','${line[j + 5]}')`
        );
      }
    }
  });

  // Handle adding a single student manually
  socket.on("sendStudents", (studentsList) => {
    const userId = crypto.randomUUID(); // Unique user ID

    // Insert student into database
    sql.query(
      `INSERT INTO students (client_id,user_id, first_name, last_name, national_code, id_number) VALUES ('${socket.id}','${userId}','${studentsList.first_name}','${studentsList.last_name}','${studentsList.national_code}','${studentsList.id_number}')`
    );

    // Insert student's courses
    for (let i = 0; i < studentsList.courses.length; i++) {
      sql.query(
        `INSERT INTO courses (user_id, course_name, course_grade) VALUES ('${userId}','${studentsList.courses[i].course_name}','${studentsList.courses[i].course_grade}')`
      );
    }
  });

  // Handle request for Average grades
  socket.on("Average", () => {
    sql.query(
      `(SELECT students.national_code,(select avg(cast(course_grade as Float))
      from students natural join courses on client_id='${socket.id}' and students.user_id=courses.user_id) as grade_avg
      from students where client_id='${socket.id}')`,
      function (err, rows) {
        if (!err) {
          socket.emit("Average-result", rows.recordset); // Send result to client
        }
      }
    );
  });

  // Handle request for minimum average grade
  socket.on("Min", () => {
    sql.query(
      `(select first_name,last_name,avg_deg
        from students  join (SELECT  user_id,avg(cast(courses.course_grade as Float)) as avg_deg 
                 from courses group by user_id) as x
        on students.user_id = x.user_id
        where avg_deg = (SELECT min(avg_deg)
              from  students cross  join (SELECT  user_id,avg(cast(courses.course_grade as Float)) as avg_deg 
                 from courses group by user_id) as x
                where students.user_id=x.user_id and client_id='${socket.id}'))`,
      function (err, rows) {
        if (!err) {
          console.log("first");
          socket.emit("Min-result", rows.recordset);
        }
      }
    );
  });

  // Handle request for maximum average grade
  socket.on("Max", () => {
    sql.query(
      `(select first_name,last_name,avg_deg
        from students  join (SELECT  user_id,avg(cast(courses.course_grade as Float)) as avg_deg 
                 from courses group by user_id) as x
        on students.user_id = x.user_id
        where avg_deg = (SELECT max(avg_deg)
              from  students cross  join (SELECT  user_id,avg(cast(courses.course_grade as Float)) as avg_deg 
                 from courses group by user_id) as x
                where students.user_id=x.user_id and client_id='${socket.id}'))`,
      function (err, rows) {
        if (!err) {
          socket.emit("Max-result", rows.recordset);
        }
      }
    );
  });

  // Handle request to sort students by average grade
  socket.on("Sort", () => {
    sql.query(
      `select id_number,avg_deg
      from students  join (SELECT  user_id,avg(cast(courses.course_grade as Float)) as avg_deg 
               from courses group by user_id) as x
      on students.user_id = x.user_id and client_id ='${socket.id}' order by avg_deg`,
      function (err, rows) {
        if (!err) {
          socket.emit("Sort-result", rows.recordset);
        }
      }
    );
  });

  // Send all chat messages to client
  socket.on("getMessages", () => {
    messages.forEach((message) => {
      io.sockets.emit("message", message);
    });
  });

  // Handle sending a new chat message
  socket.on("message", (value) => {
    sql.query(
      `SELECT name,client_id from faculties
      WHERE client_id='${socket.id}'`,
      function (err, rows) {
        if (!err) {
          const message = {
            id: crypto.randomUUID(),           // Unique message ID
            user: rows.recordset[0].name,     // Faculty name
            value: value,                      // Message content
            time: Date.now(),                  // Timestamp
            isYou: rows.recordset[0].client_id === socket.id, // Flag if sender
          };
          messages.add(message);                // Add to message set
          io.sockets.emit("message", message); // Broadcast to all clients
        }
      }
    );
  });

  // Uncommented: Retrieve students for client (code commented out in original)
  /*
  socket.on("getStudents", () => { ... });
  */
});

// Start the HTTP server on port 8080
server.listen(8080, () => {
  console.log("listening on *:8080"); // Log listening status
});
