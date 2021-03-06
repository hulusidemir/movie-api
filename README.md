# Movies

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/movie | `GET` | Empty | List all movie. |
| /api/movie | `POST` | {'title':'foo', 'category':'bar', 'country':'Turkey', year:1990, director:"id", imdb_score: 9.7 } | Create a new movie. |
| /api/movie/:movie_id | `GET` | Empty | Get a movie. |
| /api/movie/:movie_id | `PUT` | {'name':'foo', 'surname':'bar'} | Update a movie with new info. |
| /api/movie/:movie_id | `DELETE` | Empty | Delete a movie. |
| /api/movie/top10 | `GET` | Empty | Get the top 10 movies. |
| /api/movie/between/:start_year/:end_year | `GET` | Empty | Movies between two dates. |

# Directors

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/directors | `GET` | Empty | List all directors. |
| /api/directors | `POST` | { name: 'foo', surname:'bar', bio:'lorem ipsum' } | Create a new director. |
| /api/directors/:director_id | `GET` | Empty | Get a director. |
| /api/directors/:director_id | `PUT` | {'name':'foo', 'surname':'bar', 'bio': 'lorem'} | Update a director with new info. |
| /api/directors/:director_id | `DELETE` | Empty | Delete a director. |
| /api/directors/:director_id/best10movie | `GET` | Empty | The director's top 10 films. |

# Index

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /register | `POST` | { username: 'foo', password:'1234' } | Create a new user. |
| /authenticate | `POST` | { username: 'foo', password:'1234' } | Generate a token. |


# Demo
[Live demo on Heroku](https://node-egitimi-movie-api.herokuapp.com/)

enjoy!
