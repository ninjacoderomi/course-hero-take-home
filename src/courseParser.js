export const FormatError = new Error("Invalid format");

export default function(courseString) {
  const words = courseString.split(" ");
  if (words.length < 2) {
    throw FormatError;
  }
  const [department, number, semesterWords] = extractCourse(words);
  if (!semesterWords) {
    throw FormatError;
  }
  if (Number.isNaN(number)) {
    throw FormatError;
  }
  const [semester, year] = extractSemeseter(semesterWords);
  return { department, number, semester, year };
}

function extractCourse(w = []) {
  const words = [...w];

  let dept, number;
  if (words[0].match(/^[A-Za-z]+$/)) {
    dept = words.shift();
    number = words.shift();
  } else if (words[0].match(/-|:/)) {
    [dept, number] = words[0].split(/-|:/);
    words.shift();
  } else if (words[0].match(/^([a-zA-Z]+)(\d+)$/)) {
    const matches = words[0].match(/^([a-zA-Z]+)(\d+)$/);
    dept = matches[1];
    number = matches[2];
    words.shift();
  }
  return [dept, Number(number), words];
}
const semMap = { f: "Fall", w: "Winter", s: "Spring", su: "Summer" };
function normalizeSemName(sem) {
  if (!sem) {
    throw FormatError;
  }
  return semMap[sem.toLowerCase()] || semMap[sem[0].toLowerCase()];
}
function normalizeYr(yr) {
  let normalizedYr = 2000 + (yr % 2000);
  if (Number.isNaN(normalizedYr)) {
    throw FormatError;
  }
  return normalizedYr;
}
function extractSemeseter(w = []) {
  if (!w || !w.length || w.length > 2) {
    throw FormatError;
  }
  let [sem, yr] = w;
  if (w.length > 1) {
    if (w[0].match(/^\d+$/)) {
      yr = w[0];
      sem = w[1];
    }
  } else {
    let matches = w[0].match(/^([a-zA-z]+)(\d+)$/);
    if (matches) {
      return extractSemeseter([matches[1], matches[2]]);
    } else {
      let matches = w[0].match(/^(\d+)([a-zA-z]+)$/);
      return extractSemeseter(matches && [matches[1], matches[2]]);
    }
  }

  return [normalizeSemName(sem.substr(0, 2)), normalizeYr(yr)];
}
