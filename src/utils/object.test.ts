import { objectToCamelCase, objectToKebabCase } from "./object";

describe.each`
  obj                                                                  | expected
  ${{ foo: 1 }}                                                        | ${{ foo: 1 }}
  ${{ foo: 1, "foo-bar": 1 }}                                          | ${{ foo: 1, fooBar: 1 }}
  ${{ foo: 1, "foo-bar": 1, "foo-bar-foo": { "foo-bar-foo-bar": 1 } }} | ${{ foo: 1, fooBar: 1, fooBarFoo: { fooBarFooBar: 1 } }}
  ${{ foo: [1, { "foo-bar": 1 }] }}                                    | ${{ foo: [1, { fooBar: 1 }] }}
`("test objectToCamelCase($obj)", ({ obj, expected }) => {
  test(`returns ${expected}`, () => {
    expect(objectToCamelCase(obj)).toEqual(expected);
  });
});

describe.each`
  obj                                                      | expected
  ${{ foo: 1 }}                                            | ${{ foo: 1 }}
  ${{ foo: 1, fooBar: 1 }}                                 | ${{ foo: 1, "foo-bar": 1 }}
  ${{ foo: 1, fooBar: 1, fooBarFoo: { fooBarFooBar: 1 } }} | ${{ foo: 1, "foo-bar": 1, "foo-bar-foo": { "foo-bar-foo-bar": 1 } }}
  ${{ foo: [1, { fooBar: 1 }] }}                           | ${{ foo: [1, { "foo-bar": 1 }] }}
`("test objectToKebabCase($obj)", ({ obj, expected }) => {
  test(`returns ${expected}`, () => {
    expect(objectToKebabCase(obj)).toEqual(expected);
  });
});

describe.each`
  obj                                                      | exclude       | expected
  ${{ foo: 1 }}                                            | ${["fooBar"]} | ${{ foo: 1 }}
  ${{ foo: 1, fooBar: 1 }}                                 | ${["fooBar"]} | ${{ foo: 1, fooBar: 1 }}
  ${{ foo: 1, fooBar: 1, fooBarFoo: { fooBarFooBar: 1 } }} | ${["fooBar"]} | ${{ foo: 1, fooBar: 1, "foo-bar-foo": { "foo-bar-foo-bar": 1 } }}
  ${{ foo: [1, { fooBar: 1 }] }}                           | ${["fooBar"]} | ${{ foo: [1, { fooBar: 1 }] }}
`("test objectToKebabCase($obj, $exclude)", ({ obj, exclude, expected }) => {
  test(`returns ${expected}`, () => {
    expect(objectToKebabCase(obj, exclude)).toEqual(expected);
  });
});
