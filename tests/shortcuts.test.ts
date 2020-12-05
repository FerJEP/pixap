import { addShortcut } from '../src/shortcuts'

const mock = jest.fn()

beforeEach(() => mock.mockClear())

test('Shortcut: Doubling', () => {
  try {
    addShortcut('test', 'e', mock)
  } catch (e) {
    fail('Shortcut not throw any error')
  }

  // Form some reason expect(addShortcut('test', 'e', mock)) does not work
  // https://stackoverflow.com/a/61982688/12418115
  expect(() => {
    addShortcut('test', 'e', mock)
  }).toThrowError()
})

test('Shortcut: hotkeys-js', () => {
  addShortcut('hotkeys-js', 's', mock)

  document.dispatchEvent(
    new KeyboardEvent('keydown', {
      key: 's',
      // @ts-ignore
      keyCode: 83,
    })
  )

  expect(mock).toBeCalled()
})
