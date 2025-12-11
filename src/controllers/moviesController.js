const movies = require("../data/movies");

exports.getAllMovies = (req, res) => {
  const { search, year } = req.query;
  let result = movies;
  if (search) result = result.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));
  if (year) result = result.filter(m => m.year === Number(year));
  res.json(result);
};

exports.getMovieById = (req, res) => {
  const movie = movies.find(m => m.id === req.params.id);
  if (!movie) return res.status(404).json({ message: "Фильм не найден" });
  res.json(movie);
};

exports.addMovie = (req, res) => {
  const { id, title, year, runtime } = req.body;
  if (!id || !title) return res.status(400).json({ message: "id и title обязательны" });
  movies.push({ id, title, year, runtime });
  res.status(201).json({ message: "Фильм добавлен", movies });
};

exports.deleteMovie = (req, res) => {
  const index = movies.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Фильм не найден" });
  movies.splice(index, 1);
  res.json({ message: "Фильм удалён" });
};