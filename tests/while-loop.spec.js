import { test, expect } from '@playwright/test';

test('0 Nested', async ({ page }) => {
  await page.goto('https://master.d3lx0rshiposis.amplifyapp.com/');

  const codeEditor = await page.locator('textarea#editor.code-editor');
  await codeEditor.clear();
  const codeSnippet = `int x = 0;
while(x < n){	
  x++;
}`;
  await codeEditor.type(codeSnippet)

  await page.locator('#calculate-btn').click();
  await page.locator('#calculator-section').getByRole('paragraph').filter({ hasText: 'A' }).click();
  await page.locator('#calculator-section').getByText('B').click();
  await page.locator('#calculator-section').getByRole('paragraph').filter({ hasText: 'C' }).click();
  await page.locator('#calculator-section').getByText('D').click();

  const answer = await page.locator('p[value="true"]');
  const answerTxt = await answer.innerText();
  expect(answerTxt).toBe('O(N)');
});



test('1 Nested', async ({ page }) => {
  await page.goto('https://master.d3lx0rshiposis.amplifyapp.com/');

  const codeEditor = await page.locator('textarea#editor.code-editor');
  await codeEditor.clear();
  const codeSnippet = `int x = 0;
while(x < n){	
  x++;
  int i;
  while(i < n){
    i++;
  }
}`;
  await codeEditor.type(codeSnippet)

  await page.locator('#calculate-btn').click();
  await page.locator('#calculator-section').getByRole('paragraph').filter({ hasText: 'A' }).click();
  await page.locator('#calculator-section').getByText('B').click();
  await page.locator('#calculator-section').getByRole('paragraph').filter({ hasText: 'C' }).click();
  await page.locator('#calculator-section').getByText('D').click();

  const answer = await page.locator('p[value="true"]');
  const answerTxt = await answer.innerText();
  expect(answerTxt).toBe('O(N2)');
});

test('2 Nested', async ({ page }) => {
  await page.goto('https://master.d3lx0rshiposis.amplifyapp.com/');

  const codeEditor = await page.locator('textarea#editor.code-editor');
  await codeEditor.clear();
  const codeSnippet = `int x = 0;
while(x < n){	
  x++;
  int i;
  while(i < n){
    i++;
    int j;
    while(j < n){
      j++;
    }
  }
}`;
  await codeEditor.type(codeSnippet)

  await page.locator('#calculate-btn').click();
  await page.locator('#calculator-section').getByRole('paragraph').filter({ hasText: 'A' }).click();
  await page.locator('#calculator-section').getByText('B').click();
  await page.locator('#calculator-section').getByRole('paragraph').filter({ hasText: 'C' }).click();
  await page.locator('#calculator-section').getByText('D').click();

  const answer = await page.locator('p[value="true"]');
  const answerTxt = await answer.innerText();
  expect(answerTxt).toBe('O(N3)');
});

test('3 Nested', async ({ page }) => {
  await page.goto('https://master.d3lx0rshiposis.amplifyapp.com/');

  const codeEditor = await page.locator('textarea#editor.code-editor');
  await codeEditor.clear();
  const codeSnippet = `int x = 0;
while(x < n){	
  x++;
  int i;
  while(i < n){
    i++;
    int j;
    while(j < n){
      j++;
      int k;
      while(k < n){
        k++;
      }
    }
  }
}`;
  await codeEditor.type(codeSnippet)

  await page.locator('#calculate-btn').click();
  await page.locator('#calculator-section').getByRole('paragraph').filter({ hasText: 'A' }).click();
  await page.locator('#calculator-section').getByText('B').click();
  await page.locator('#calculator-section').getByRole('paragraph').filter({ hasText: 'C' }).click();
  await page.locator('#calculator-section').getByText('D').click();

  const answer = await page.locator('p[value="true"]');
  const answerTxt = await answer.innerText();
  expect(answerTxt).toBe('O(N4)');
});

test('4 Nested', async ({ page }) => {
  await page.goto('https://master.d3lx0rshiposis.amplifyapp.com/');

  const codeEditor = await page.locator('textarea#editor.code-editor');
  await codeEditor.clear();
  const codeSnippet = `int x = 0;
while(x < n){	
  x++;
  int i;
  while(i < n){
    i++;
    int j;
    while(j < n){
      j++;
      int k;
      while(k < n){
        k++;
        int l;
        while(l < n){
          l++;
        }
      }
    }
  }
}`;
  await codeEditor.type(codeSnippet)

  await page.locator('#calculate-btn').click();
  await page.locator('#calculator-section').getByRole('paragraph').filter({ hasText: 'A' }).click();
  await page.locator('#calculator-section').getByText('B').click();
  await page.locator('#calculator-section').getByRole('paragraph').filter({ hasText: 'C' }).click();
  await page.locator('#calculator-section').getByText('D').click();

  const answer = await page.locator('p[value="true"]');
  const answerTxt = await answer.innerText();
  expect(answerTxt).toBe('O(N5)');
});

test('5 Nested', async ({ page }) => {
  await page.goto('https://master.d3lx0rshiposis.amplifyapp.com/');

  const codeEditor = await page.locator('textarea#editor.code-editor');
  await codeEditor.clear();
  const codeSnippet = `int x = 0;
while(x < n){	
  x++;
  int i;
  while(i < n){
    i++;
    int j;
    while(j < n){
      j++;
      int k;
      while(k < n){
        k++;
        int l;
        while(l < n){
          l++;
          int m;
          while(m < n){
            m++;
          }
        }
      }
    }
  }
}`;
  await codeEditor.type(codeSnippet)

  await page.locator('#calculate-btn').click();
  await page.locator('#calculator-section').getByRole('paragraph').filter({ hasText: 'A' }).click();
  await page.locator('#calculator-section').getByText('B').click();
  await page.locator('#calculator-section').getByRole('paragraph').filter({ hasText: 'C' }).click();
  await page.locator('#calculator-section').getByText('D').click();

  const answer = await page.locator('p[value="true"]');
  const answerTxt = await answer.innerText();
  expect(answerTxt).toBe('O(N6)');
});