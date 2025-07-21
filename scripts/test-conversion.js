import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
    console.log('Starting E2E test for MP3 conversion...');
    
    const browser = await chromium.launch({ 
        headless: false,
        devtools: true 
    });
    
    const context = await browser.newContext({
        acceptDownloads: true
    });
    const page = await context.newPage();
    
    // Enable console logging
    page.on('console', msg => {
        console.log(`Browser console [${msg.type()}]:`, msg.text());
    });
    
    // Enable error logging
    page.on('pageerror', err => {
        console.error('Page error:', err);
    });
    
    try {
        // Navigate to the app
        await page.goto('http://localhost:5173/');
        console.log('Navigated to app');
        
        // Wait for the upload button
        await page.waitForSelector('text=Choose a file', { timeout: 10000 });
        console.log('Upload button found');
        
        // Set the test file
        const testFile = '/Users/main/Downloads/バックエンド集会 VRChatのバックエンド20250719.mp4';
        
        // Check if file exists
        if (!fs.existsSync(testFile)) {
            throw new Error(`Test file not found: ${testFile}`);
        }
        
        // Upload the file using the hidden input
        const fileInput = await page.locator('input[type="file"]');
        await fileInput.setInputFiles(testFile);
        console.log('File uploaded');
        
        // Wait for the convert button to appear
        await page.waitForSelector('button:has-text("Convert to MP3")', { timeout: 5000 });
        console.log('Convert button found');
        
        // Click the convert button
        await page.click('button:has-text("Convert to MP3")');
        console.log('Convert button clicked');
        
        // Wait for conversion to complete or error
        console.log('Waiting for conversion...');
        
        // Wait for either success or error
        const result = await Promise.race([
            page.waitForSelector('.text-red-600', { timeout: 30000 }).then(() => 'error'),
            page.waitForEvent('download', { timeout: 30000 }).then(() => 'success'),
            page.waitForTimeout(30000).then(() => 'timeout')
        ]);
        
        console.log('Result:', result);
        
        if (result === 'error') {
            const errorText = await page.locator('.text-red-600').textContent();
            console.error('Error found:', errorText);
            
            // Take a screenshot
            await page.screenshot({ 
                path: path.join(__dirname, '..', 'conversion-error.png'),
                fullPage: true 
            });
            console.log('Screenshot saved to conversion-error.png');
        } else if (result === 'success') {
            console.log('Conversion successful! File downloaded.');
        } else {
            console.log('Conversion timed out');
            await page.screenshot({ 
                path: path.join(__dirname, '..', 'timeout-screenshot.png'),
                fullPage: true 
            });
        }
        
        // Wait for manual inspection
        console.log('Test complete. Check the browser for results.');
        await page.waitForTimeout(30000);
        
    } catch (error) {
        console.error('Test failed:', error);
        await page.screenshot({ 
            path: path.join(__dirname, '..', 'test-error.png'),
            fullPage: true 
        });
    } finally {
        await browser.close();
    }
})();