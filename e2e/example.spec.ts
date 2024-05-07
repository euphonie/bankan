import { test, expect } from '@playwright/test';

test('smoke test', async ({ page }) => {
  await page.goto('http://localhost/');
  await expect(page.locator('mat-toolbar')).toContainText('Bankan');
  await page.getByRole('button', { name: 'Add task' }).click();
  await page.getByLabel('Ttile:').click();
  await page.getByLabel('Ttile:').fill('Task1');
  await expect(page.getByLabel('Ttile:')).toBeVisible();
  await expect(page.getByText('Task1').first()).toBeVisible();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Mark as completed' }).nth(3).click();
  await expect(page.locator('app-task-list')).toContainText('Mark as pending');
  await page.locator('mat-card').filter({ hasText: 'Task1 CompletedLast updated:' }).getByRole('button').first().click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.locator('mat-card').filter({ hasText: 'Task1 CompletedLast updated:' }).getByRole('button').first().click();
  await page.getByLabel('Ttile:').click();
  await page.getByLabel('Ttile:').fill('Task12');
  await page.getByRole('button', { name: 'Edit' }).click();
  await expect(page.locator('app-task-list')).toContainText('Task12 Completed');
  await page.locator('button').filter({ hasText: 'delete' }).nth(1).click();
  await expect(page.locator('simple-snack-bar')).toContainText('Want to restore the item that was deleted?');
  await page.getByRole('button', { name: 'Restore' }).click();
});