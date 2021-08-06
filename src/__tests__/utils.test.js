import { getNumberFromPriority } from '../utils/utils'

describe('utils', () => {

  describe('getNumberFromPriority', () => {
    test('Should return 3 on HIGH', () => {
      expect(getNumberFromPriority('HIGH')).toBe(3)
    })
    test('Should return 2 on MEDIUM', () => {
      expect(getNumberFromPriority('MEDIUM')).toBe(2)
    })
    test('Should return 1 on LOW', () => {
      expect(getNumberFromPriority('LOW')).toBe(1)
    })
    test('Should return 0 on other cases', () => {
      expect(getNumberFromPriority('something else')).toBe(0)
    })
  })

})
