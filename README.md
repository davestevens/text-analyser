# Text Analyser

Extract text (using [Azure Cognative Services OCR](https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/concept-recognizing-text)) from image and calculate font size

## Dev

`npm run dev`

Uses webpack-dev-sever to serve content.

## Build

`npm run build`

Outputs build project in `public` directory.

## TODO

- [ ] Thresholding sometimes is a bit off
- [ ] Look at inverting colors in extracted sections
- [ ] Include information about how calculations are made
- [ ] Include output of string used to calculate body height measurement
- [ ] Load different fonts
- [ ] Look at performing some sort of diff to see if the font being checked is the font being used
- [ ] Ability to save/revist results
