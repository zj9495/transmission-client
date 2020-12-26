import { objectToCamelCase } from "./object";

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
