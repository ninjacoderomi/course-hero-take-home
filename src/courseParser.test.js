import courseParser from "./courseParser";

const invalidFormats = [
  "",
  "asdsad",
  "aasdsd adassd",
  "CS 40",
  "CS 40 40 f f",
  "cs 230f",
  "cs 2008 fall 20f",
  "cs111 f18gg"
];
invalidFormats.forEach(format =>
  test(`throws format is invalid for "${format}"`, () => {
    expect(() => courseParser(format)).toThrowError("Invalid format");
  })
);
const validFormats = [
  "CS 111 Fall 2018",
  "CS-111 Fall 2018",
  "CS:111 Fall 2018",
  "CS111 Fall 2018",
  "CS111 Fall2018",
  "CS111 2018 Fall",
  "CS111 2018F",
  "CS111 f2018",
  "CS111 f18",
  "CS 111 18f"
];
validFormats.forEach(format =>
  test(`parses "${format}"`, () => {
    const course = courseParser(format);
    expect(course.department).toEqual("CS");
    expect(course.number).toEqual("111");
    expect(course.year).toEqual(2018);
    expect(course.semester).toEqual("Fall");
  })
);

test("parses CS 111 18f", () => {
  const course = courseParser("CS 111 18f");
  expect(course.department).toEqual("CS");
  expect(course.number).toEqual("111");
  expect(course.year).toEqual(2018);
  expect(course.semester).toEqual("Fall");
});
