const fs = require('fs-extra');

// Path to the built index.html (adjust this path as needed)
const builtIndexPath = 'build/index.html';

// Path where modified index.html will be saved (functions folder)
const modifiedIndexPath = 'functions/index.html';

// Template variables for title and thumbnail
const title = '_TITLE_';
const thumbnail = '_THUMB_';

// Read the built index.html file
fs.readFile(builtIndexPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading index.html:', err);
    return;
  }

  // Perform replacements
  const modifiedData = data
    .replace('<title>Pulse Of The Underground</title>', `<title>${title}</title>`)
    .replace('<meta property="og:title" content="Pulse Of The Underground"/>', `<meta property="og:title" content="${title}"/>`)
    .replace('<meta property="og:image" content="/assets/PulseOfTheUnderground.jpg"/>', `<meta property="og:image" content="${thumbnail}"/>`);

  // Write the modified content to the functions folder
  fs.writeFile(modifiedIndexPath, modifiedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing modified index.html:', err);
      return;
    }

    console.log('index.html modified and saved successfully!');
  });
});
