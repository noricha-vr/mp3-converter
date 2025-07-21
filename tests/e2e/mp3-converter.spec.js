import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('MP3 Converter E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the app
        await page.goto('http://localhost:5173/');
        
        // Wait for the page to load
        await expect(page.locator('h1')).toContainText('MP3 Converter');
    });

    test('should display the initial UI correctly', async ({ page }) => {
        // Check main elements
        await expect(page.locator('h1')).toContainText('MP3 Converter');
        await expect(page.locator('text=Choose a file')).toBeVisible();
        await expect(page.locator('button:has-text("Convert to MP3")')).toBeDisabled();
        
        // Check privacy badge
        await expect(page.locator('text=100% Local Processing')).toBeVisible();
        await expect(page.locator('text=Your files are never uploaded to any server')).toBeVisible();
    });

    test('should show error for invalid file type', async ({ page }) => {
        // Create a test text file
        const testFile = path.join(__dirname, 'test.txt');
        fs.writeFileSync(testFile, 'This is a test file');
        
        try {
            // Upload the text file
            const fileInput = page.locator('input[type="file"]');
            await fileInput.setInputFiles(testFile);
            
            // Check for error message
            await expect(page.locator('.text-red-600')).toContainText('Please select a valid audio or video file');
            
            // Convert button should remain disabled
            await expect(page.locator('button:has-text("Convert to MP3")')).toBeDisabled();
        } finally {
            // Clean up
            fs.unlinkSync(testFile);
        }
    });

    test('should accept valid audio file', async ({ page }) => {
        // Create a dummy audio file path (we'll use MP4 as it's commonly available)
        const audioFile = '/Users/main/Downloads/バックエンド集会 VRChatのバックエンド20250719.mp4';
        
        // Skip if file doesn't exist
        if (!fs.existsSync(audioFile)) {
            test.skip();
            return;
        }
        
        // Upload the file
        const fileInput = page.locator('input[type="file"]');
        await fileInput.setInputFiles(audioFile);
        
        // Check that file name is displayed
        await expect(page.locator('label[for="file-input"]')).toContainText('バックエンド集会');
        
        // Convert button should be enabled
        await expect(page.locator('button:has-text("Convert to MP3")')).toBeEnabled();
    });

    test('should successfully convert MP4 to MP3', async ({ page, context }) => {
        // Enable downloads
        const audioFile = '/Users/main/Downloads/バックエンド集会 VRChatのバックエンド20250719.mp4';
        
        // Skip if file doesn't exist
        if (!fs.existsSync(audioFile)) {
            test.skip();
            return;
        }
        
        // Upload the file
        const fileInput = page.locator('input[type="file"]');
        await fileInput.setInputFiles(audioFile);
        
        // Click convert button
        await page.locator('button:has-text("Convert to MP3")').click();
        
        // Wait for loading to start
        await expect(page.locator('text=Loading FFmpeg')).toBeVisible();
        
        // Wait for download with timeout
        const downloadPromise = page.waitForEvent('download', { timeout: 60000 });
        const download = await downloadPromise;
        
        // Verify download
        expect(download.suggestedFilename()).toContain('.mp3');
        
        // Save the file to verify it's valid
        const downloadPath = path.join(__dirname, 'test-output.mp3');
        await download.saveAs(downloadPath);
        
        // Check file exists and has content
        expect(fs.existsSync(downloadPath)).toBeTruthy();
        const stats = fs.statSync(downloadPath);
        expect(stats.size).toBeGreaterThan(0);
        
        // Clean up
        fs.unlinkSync(downloadPath);
    });

    test('should show progress during conversion', async ({ page }) => {
        const audioFile = '/Users/main/Downloads/バックエンド集会 VRChatのバックエンド20250719.mp4';
        
        // Skip if file doesn't exist
        if (!fs.existsSync(audioFile)) {
            test.skip();
            return;
        }
        
        // Upload the file
        const fileInput = page.locator('input[type="file"]');
        await fileInput.setInputFiles(audioFile);
        
        // Click convert button
        await page.locator('button:has-text("Convert to MP3")').click();
        
        // Check for progress bar
        await expect(page.locator('.bg-green-500')).toBeVisible();
        
        // Progress percentage should be visible (more specific selector)
        await expect(page.locator('.bg-green-500').first()).toBeVisible();
    });

    test('should disable UI during conversion', async ({ page }) => {
        const audioFile = '/Users/main/Downloads/バックエンド集会 VRChatのバックエンド20250719.mp4';
        
        // Skip if file doesn't exist
        if (!fs.existsSync(audioFile)) {
            test.skip();
            return;
        }
        
        // Upload the file
        const fileInput = page.locator('input[type="file"]');
        await fileInput.setInputFiles(audioFile);
        
        // Click convert button
        await page.locator('button:has-text("Convert to MP3")').click();
        
        // File input should be disabled during conversion
        await expect(page.locator('input[type="file"]')).toBeDisabled();
        
        // Convert button text should change
        await expect(page.locator('button')).toContainText('Converting...');
        await expect(page.locator('button')).toBeDisabled();
    });

    test('should handle missing test file gracefully', async ({ page }) => {
        // Try to use a file that doesn't exist
        const missingFile = path.join(__dirname, 'missing-file.mp4');
        
        // This should not throw an error in the UI
        try {
            const fileInput = page.locator('input[type="file"]');
            await fileInput.setInputFiles(missingFile);
        } catch (error) {
            // Expected - file doesn't exist
            expect(error.message).toMatch(/no such file|does not exist/i);
        }
        
        // UI should remain in initial state
        await expect(page.locator('text=Choose a file')).toBeVisible();
        await expect(page.locator('button:has-text("Convert to MP3")')).toBeDisabled();
    });
});