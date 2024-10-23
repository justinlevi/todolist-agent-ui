import { test, expect } from "@playwright/test";

test.describe("Todo Application", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("should display all todos", async ({ page }) => {
    const todos = await page.locator("li");
    await expect(todos).toHaveCount(0); 
  });

  test("should add a new todo", async ({ page }) => {
    await page.fill('input[placeholder="Add a new task"]', "New Todo");
    await page.click('button:has-text("Add")');
    await expect(page.locator("li")).toHaveText("New Todo");
  });

  test("should update a todo", async ({ page }) => {
    await page.check('input[type="checkbox"]');
    await expect(page.locator("li span")).toHaveClass(/line-through/); // Assuming completed todos have line-through class
  });

  test("should delete a todo", async ({ page }) => {
    await page.click('button[aria-label="Trash"]');
    await expect(page.locator("li")).toHaveCount(0); // Assuming one todo is deleted
  });
});
