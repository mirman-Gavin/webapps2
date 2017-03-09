# 9: Good MERNing
Up until now, our data layer has been a simple JSON file. For a real application, this will not be sufficient. We need a robust database solution. Traditionally, we would use _relational_ databases, controlled using a special language called **SQL**. Relational databases are still alive and well (The Moodle is based on one), but they are sometimes not the best tool for the job. Enter **NoSQL**, or Document-based Databases.

## ~~SQL~~ → NOSQL
### SQL
In a traditional database, we have **tables**. Think of them like spreadsheets of information. Maybe there's a table for Students. And each row has unique data for that student.

ID | First | Last | Year
--|--
1 | Johnny | Teststudent | 2050
2 | Jane | Teststudent | 2050
3 | Abraxas | Teststudent | 2054

You get the idea. But maybe we need another table of Classes that students can take. So like...

ID | Name | Subject | Teacher
--|--
1 | Web Apps I | Computer Science | Taggart
2 | Web Apps II | Computer Science | Taggart
3 | Intro to Patroni | Defense Against the Dark Arts | Potter

A bunch of these tables put together in a related way create a relational database. How do they relate? Well, let's say we want to enroll Abraxas in Intro to Patroni. We might have a third table called Enrollments, that looks like this:

ID | Course_ID | Student_ID
--|--
1 | 3 | 3
2 | 1 | 2
2 | 1 | 1

This table—a **join table**, to be precise—tells us that Abraxas is taking Intro to Patroni, Jane is take Web Apps II, and Johnny is taking Web Apps I. We created this database from just the related IDs of the other tables, not names or anything else. Why?

To retrieve not only enrollment data but full student info as well, we'd need to do a join operation between these two tables. An SQL query for all courses taken by Abraxas might look like:

    SELECT *
    FROM Enrollments
    INNER JOIN Courses
    ON Enrollments.Course_ID=Courses.ID
    INNER JOIN Students
    ON Enrollments.Student_ID=Students.ID;

That whole thing will return a joined table that includes matching rows/columns from Enrollments, Courses, and Students tables.

You can imagine writing these queries gets old, especially when you have to use string concatenation to produce them on the server side.

(Fun fact: such string-concatenated SQL commands were the _only_ way to get data into web applications for a long time.)

In NoSQL, we solve the problem a different way. We use document-based data structures to embed relative information.

### NoSQL
In many cases, SQL is too much solution for our problem. With data coming cheaper and cheaper, it is often easier to _embed_ related data inside a single record.

Imagining such documents as JSON is pretty easy. Consider an embedded version of `Enrollments`:

    [
      {
        id: 1,
        course: {
          name: "Web Apps I",
          teacher: {
            id: 1,
            firstName: "Michael",
            lastName: "Taggart",
          },
          student: {
            id: 1,
            firstName: "Johnny",
            lastName: "Teststudent",
            year: 2050
          }
        }
      },
      {
        id: 2,
        course: {
          name: "Web Apps I",
          teacher: {
            id: 1,
            firstName: "Michael",
            lastName: "Taggart",
          },
          student: {
            id: 2,
            firstName: "Jane",
            lastName: "Teststudent",
            year: 2050
          }
        }
      },
    ]


Now that's a pretty 1:1 reproduction of the old SQL data model. But with these embedded arrays, new possibilities open up. We could create a set of `Enrollments` that has a key for `students` and just contains an array of student records inside.

What's the downside? Well, with embedded data, when something changes, there's no automatic update for any document that uses embedded versions of the changed data. For example, if I change the year or last name of one of the students, SQL doesn't care because it just pulls the student record with an `INNER JOIN`. The ID doesn't change, so we're fine. But with embedded databases, these Enrollment records could have bad data in them if I changed the student elsewhere.

Often you'll find a hybrid approach that uses embedded data for non-volatile information and ID references for changing information. That's okay too.

So we're going to learn about a database that is easy to use with Node/Express, called [MongoDB](https://www.mongodb.com/). Mongo is a very popular NoSQL Database. I like it because it works like JavaScript and integrates well with Node. In fact, all the technologies we're discussing work so well together, they have their own group name: The MERN Stack.

Mongo, Express, React, Node: The MERN Stack.

## Primary Objective: Play with Mongo
In class, we're going to set up Mongo on your computers. Your objective is to follow the [Mongo Documentation](https://docs.mongodb.com/getting-started/shell/) to learn how to create documents from the shell and then retrieve/filter them.

## Primary Objective: Port Todos to Mongo
No React necessary; this will all be server-side. Modify our Node/Express server to use Mongo as its database instead that janky JSON file. I've already imported [Mongoose](http://mongoosejs.com/), a great Mongo driver for Node/Express. The rest is up to you.
