# mocha-order-tests

**Order your mocha test efficiently.**

## Installation

`npm i --save-dev mocha-order-tests`

## Usage

First create a `.tests-order.json` file at the root of your project to specify the order in which tests should be ran:

```json
[
  "unit/**/*",
  "integration/**/*",
  "acceptance/**/*"
]
```

Then require the module when launching mocha: 

`"test": "mocha --require mocha-order-tests"`

Your tests will run in the given order.

## License

MIT.
