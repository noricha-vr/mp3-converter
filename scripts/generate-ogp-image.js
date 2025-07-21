import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
        viewport: { width: 1200, height: 630 },
        deviceScaleFactor: 1
    });
    
    // Load the HTML file
    const htmlPath = path.join(__dirname, '..', 'ogp-preview.html');
    await page.goto(`file://${htmlPath}`);
    
    // Wait for the page to fully render
    await page.waitForTimeout(1000);
    
    // Take a screenshot
    const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');
    await page.screenshot({ 
        path: outputPath,
        clip: { x: 0, y: 0, width: 1200, height: 630 }
    });
    
    console.log(`OGP image generated at: ${outputPath}`);
    
    await browser.close();
})();