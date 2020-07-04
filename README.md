# node-jobapp-logger
Node.js REST API for logging job applications + status of applications.

Practice for building a RESTful API in Node.js.

So far only basic functionality has been implemented into this API as a proof of concept, and the information included in the JSON file is by no means exhaustive (yet). This will be moved into a SQL database and split into a walls and a pricing table later on.

## Roadmap

* Implement PostgreSQL database to replace JSON storage
* Authentication for modifications to db

## Endpoints

All responses are in JSON format and all POST/PUT requests must contain valid JSON in the message body.

| Endpoint | Request type | Description |
| --- | --- | --- |
| `/applications` | GET | Returns a list of all job applications in the database. |
| `/applications` | PUT | Insert a new job application into the database. Required fields: date, title, company, status |
| `/applications/:id` | GET | Returns information about a specific job application. |
| `/applications/:id/view` | GET | Same as the previous endpoint. |
| `/applications/:id` | PUT | Update field(s) of a specific job application. Must contain valid information in the message body sent. |
| `/applications/:id` | DELETE | Delete the specified job application. |
