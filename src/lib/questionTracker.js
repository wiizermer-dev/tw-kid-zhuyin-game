// 題目追蹤系統 - 確保題目不重複
class QuestionTracker {
  constructor() {
    this.usedQuestions = new Set(); // 儲存已出現過的題目 ID
    this.loadFromLocalStorage();
  }

  // 從 localStorage 載入已使用的題目
  loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('usedQuestions');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.usedQuestions = new Set(parsed);
      }
    } catch (error) {
      console.warn('Failed to load used questions:', error);
      this.usedQuestions = new Set();
    }
  }

  // 儲存到 localStorage
  saveToLocalStorage() {
    try {
      const array = Array.from(this.usedQuestions);
      localStorage.setItem('usedQuestions', JSON.stringify(array));
    } catch (error) {
      console.warn('Failed to save used questions:', error);
    }
  }

  // 生成題目唯一 ID
  getQuestionId(word) {
    // 使用字詞、目標字、注音組合成唯一 ID
    return `${word.char}-${word.target}-${word.pinyin}`;
  }

  // 檢查題目是否已經出現過
  isUsed(word) {
    const id = this.getQuestionId(word);
    return this.usedQuestions.has(id);
  }

  // 標記題目為已使用
  markAsUsed(word) {
    const id = this.getQuestionId(word);
    this.usedQuestions.add(id);
    this.saveToLocalStorage();
  }

  // 批量標記多個題目
  markMultipleAsUsed(words) {
    words.forEach(word => {
      const id = this.getQuestionId(word);
      this.usedQuestions.add(id);
    });
    this.saveToLocalStorage();
  }

  // 從陣列中篩選出未使用過的題目
  filterUnused(words) {
    return words.filter(word => !this.isUsed(word));
  }

  // 重置（清空所有記錄）
  reset() {
    this.usedQuestions.clear();
    localStorage.removeItem('usedQuestions');
  }

  // 獲取已使用題目數量
  getUsedCount() {
    return this.usedQuestions.size;
  }

  // 獲取使用率（相對於總題庫）
  getUsageRate(totalQuestions) {
    return (this.usedQuestions.size / totalQuestions * 100).toFixed(1);
  }

  // 檢查是否需要重置（當使用率超過 80% 時）
  shouldReset(totalQuestions) {
    return this.getUsedCount() / totalQuestions > 0.8;
  }
}

// 單例模式 - 全域唯一實例
export const questionTracker = new QuestionTracker();

// 輔助函數：計算總題庫大小
export function getTotalQuestionCount(allWords) {
  return allWords.length;
}

// 輔助函數：顯示題庫使用狀態
export function getQuestionStats(allWords) {
  const total = allWords.length;
  const used = questionTracker.getUsedCount();
  const unused = total - used;
  const usageRate = questionTracker.getUsageRate(total);
  
  return {
    total,
    used,
    unused,
    usageRate,
    shouldReset: questionTracker.shouldReset(total)
  };
}
