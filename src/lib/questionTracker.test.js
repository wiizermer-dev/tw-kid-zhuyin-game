import { test, beforeEach, after, describe, mock } from 'node:test';
import assert from 'node:assert';

// Mock localStorage
const localStorageMock = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = String(value);
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  }
};

global.localStorage = localStorageMock;

// Mock console.warn using Node.js built-in mock
const warnMock = mock.method(global.console, 'warn', () => {});

// Import the module to test
import { questionTracker, getTotalQuestionCount, getQuestionStats } from './questionTracker.js';

describe('QuestionTracker', () => {
  beforeEach(() => {
    questionTracker.reset();
    localStorageMock.clear();
    warnMock.mock.resetCalls();
  });

  after(() => {
    warnMock.mock.restore();
  });

  test('getQuestionId should return correct format', () => {
    const word = { char: '中', target: 'middle', pinyin: 'zhōng' };
    const id = questionTracker.getQuestionId(word);
    assert.strictEqual(id, '中-middle-zhōng');
  });

  test('markAsUsed and isUsed should work correctly', () => {
    const word = { char: '中', target: 'middle', pinyin: 'zhōng' };
    assert.strictEqual(questionTracker.isUsed(word), false);

    questionTracker.markAsUsed(word);
    assert.strictEqual(questionTracker.isUsed(word), true);

    // Verify persistence
    assert.ok(localStorageMock.getItem('usedQuestions').includes('中-middle-zhōng'));
  });

  test('markMultipleAsUsed should work correctly', () => {
    const words = [
      { char: '一', target: 'one', pinyin: 'yī' },
      { char: '二', target: 'two', pinyin: 'èr' }
    ];

    questionTracker.markMultipleAsUsed(words);
    assert.strictEqual(questionTracker.isUsed(words[0]), true);
    assert.strictEqual(questionTracker.isUsed(words[1]), true);
    assert.strictEqual(questionTracker.getUsedCount(), 2);
  });

  test('filterUnused should return only unused words', () => {
    const word1 = { char: '一', target: 'one', pinyin: 'yī' };
    const word2 = { char: '二', target: 'two', pinyin: 'èr' };

    questionTracker.markAsUsed(word1);

    const filtered = questionTracker.filterUnused([word1, word2]);
    assert.strictEqual(filtered.length, 1);
    assert.strictEqual(filtered[0].char, '二');
  });

  test('reset should clear all data', () => {
    const word = { char: '中', target: 'middle', pinyin: 'zhōng' };
    questionTracker.markAsUsed(word);
    assert.strictEqual(questionTracker.getUsedCount(), 1);

    questionTracker.reset();
    assert.strictEqual(questionTracker.getUsedCount(), 0);
    assert.strictEqual(localStorageMock.getItem('usedQuestions'), null);
  });

  test('getUsageRate should return correct percentage', () => {
    const word = { char: '一', target: 'one', pinyin: 'yī' };
    questionTracker.markAsUsed(word);

    // 1 used out of 10 total = 10%
    const rate = questionTracker.getUsageRate(10);
    assert.strictEqual(rate, '10.0');
  });

  test('shouldReset should return true when usage > 80%', () => {
    // Manually add 9 items
    for (let i = 0; i < 9; i++) {
      questionTracker.markAsUsed({ char: String(i), target: 't', pinyin: 'p' });
    }

    // 9/10 = 90% > 80%
    assert.strictEqual(questionTracker.shouldReset(10), true);

    // 7/10 = 70% <= 80%
    questionTracker.reset();
    for (let i = 0; i < 7; i++) {
      questionTracker.markAsUsed({ char: String(i), target: 't', pinyin: 'p' });
    }
    assert.strictEqual(questionTracker.shouldReset(10), false);
  });

  test('loadFromLocalStorage handles invalid JSON', () => {
    localStorageMock.setItem('usedQuestions', 'invalid-json');
    questionTracker.loadFromLocalStorage();

    assert.strictEqual(warnMock.mock.callCount(), 1);
    assert.ok(warnMock.mock.calls[0].arguments[0].includes('Failed to load used questions'));
    assert.strictEqual(questionTracker.getUsedCount(), 0);
  });

  test('saveToLocalStorage handles storage errors', () => {
    const originalSetItem = localStorageMock.setItem;
    localStorageMock.setItem = () => { throw new Error('Storage full'); };

    questionTracker.markAsUsed({ char: 'a', target: 'b', pinyin: 'c' });

    assert.strictEqual(warnMock.mock.callCount(), 1);
    assert.ok(warnMock.mock.calls[0].arguments[0].includes('Failed to save used questions'));

    // Restore
    localStorageMock.setItem = originalSetItem;
  });
});

describe('Helper Functions', () => {
  test('getTotalQuestionCount returns array length', () => {
    const words = [{}, {}, {}];
    assert.strictEqual(getTotalQuestionCount(words), 3);
  });

  test('getQuestionStats returns correct stats object', () => {
    questionTracker.reset();
    const words = [
      { char: '一', target: 'one', pinyin: 'yī' },
      { char: '二', target: 'two', pinyin: 'èr' },
      { char: '三', target: 'three', pinyin: 'sān' }
    ];

    questionTracker.markAsUsed(words[0]);

    const stats = getQuestionStats(words);
    assert.strictEqual(stats.total, 3);
    assert.strictEqual(stats.used, 1);
    assert.strictEqual(stats.unused, 2);
    assert.strictEqual(stats.usageRate, '33.3');
    assert.strictEqual(stats.shouldReset, false);
  });
});
