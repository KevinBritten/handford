const gulp = require("gulp");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const tap = require("gulp-tap");
const insert = require("gulp-insert");
const del = require("del");

const pages = {
  "handford-creative": [
    "global",
    "bg-grid",
    "main",
    "hero",
    "menu",
    "vision",
    "fonts",
    "mobile-menu",
    "about",
    "services",
    "web",
    "work",
    "slider",
    "contact",
    "old-homepage-styles",
  ],
  // Add more pages here as needed.
};

// Clean task to remove previous builds
function clean() {
  return del(["styles/build/**", "!styles/build"]); // Delete everything in /styles/build but not the folder itself
}

function buildStyles(done) {
  for (const [outputName, files] of Object.entries(pages)) {
    gulp
      .src(files.map((file) => `styles/${file}.css`))
      .pipe(sourcemaps.init())
      // Tap into the stream to add comments to each file
      .pipe(
        tap(function (file) {
          const filename = file.path.split("/").pop(); // Extract just the filename
          file.contents = Buffer.concat([
            Buffer.from(`/* ${filename} */\n`),
            file.contents,
          ]);
        })
      )
      .pipe(concat(`${outputName}.css`))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("styles/build"));
  }
  done();
}

gulp.task("styles", gulp.series(clean, buildStyles));

gulp.task("default", gulp.series("styles"));
