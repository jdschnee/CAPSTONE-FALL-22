import { test, expect } from '@playwright/test';

test('Level 1 Nesting', async ({ page }) => {
  await page.goto('https://master.d3lx0rshiposis.amplifyapp.com/');
  const codeEditor = await page.locator('textarea#editor.code-editor');
  await codeEditor.clear();
  const codeSnippet = `for(int i = 0; i < n; i++){	
}`;
  await codeEditor.type(codeSnippet)
  // const codeSnippet = await codeEditor.inputValue();

  await page.locator('#calculate-btn').click();
  await page.locator('#calculator-section').getByRole('paragraph').filter({ hasText: 'A' }).click();
  await page.locator('#calculator-section').getByText('B').click();
  await page.locator('#calculator-section').getByRole('paragraph').filter({ hasText: 'C' }).click();
  await page.locator('#calculator-section').getByText('D').click();

  const answer = await page.locator('p[value="true"]');
  const answerTxt = await answer.innerText();
  expect(answerTxt).toBe('O(N)');
});