require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(
    `mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    { useNewUrlParser: true, useUnifiedTopology: true },
);

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;


const Movie = mongoose.model(
    "Movie",
    {
        name: {
            type: String,
            required: true,

        },

        year: {
            type: Number
        },

        rating: {
            type: Number
        },
    }
);


const app = async () => {
    if (argv.add) {
        await createMovie(argv.name, argv.year, argv.rating);
    } else if (argv.showAll) {
        await showAll();
    } else if (argv.find) {
        await findMovie(argv.name);
    } else if (argv.movieFindYear) {
        await findMovieYear();
    } else if (argv.movieFindRating) {
        await findMovieRating();
    } else if (argv.updateName) {
        await updateMovieName(argv.updateName, argv.newName);
    } else if (argv.updateYear) {
        await updateMovieYear(argv.updateYear, argv.newYear);
    } else if (argv.updateRating) {
        await updateMovieRating(argv.updateRating, argv.newRating);
    } else if (argv.movieDelete) {
        await removeMovie(argv.name);
    }
    process.exit();
}


const createMovie = async (name, year, rating) => {
    const newMovie = new Movie({ name, year, rating });
    await newMovie.save();
    console.log(newMovie);
};


const updateMovieName = async (updateName, newName) => {
    const movieUpdateName = await Movie.updateOne({ name: updateName }, { $set: { name: newName } })
    console.log(movieUpdateName)
};


const updateMovieYear = async (updateYear, newYear) => {
    const movieUpdateYear = await Movie.updateOne({ name: updateYear }, { $set: { year: newYear } })
    console.log(movieUpdateYear)
}

const updateMovieRating = async (updateRating, newRating) => {
    const movieUpdateRating = await Movie.updateOne({ rating: updateRating }, { $set: { rating: newRating } })
    console.log(movieUpdateRating)

}
const showAll = async () => {
    const movieShowAll = await Movie.find({});
    console.log(movieShowAll);
}

const findMovie = async (name) => {
    const movieFind = await Movie.find({ name });
    console.log(movieFind);
}

const findMovieYear = async (year) => {
    const movieFindYear = await Movie.find({ year });
    console.log(movieFindYear);
}

const findMovieRating = async (rating) => {
    const movieFindRating = await Movie.find({ rating });
    console.log(movieFindRating);
}

const removeMovie = async (name) => {
    const movieDelete = await Movie.deleteOne({ name });
    console.log(movieDelete)
}


app();

