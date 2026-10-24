import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.resolve('assets');
const thumbDir = path.join(assetsDir, 'thumbnails');

if (!fs.existsSync(thumbDir)) {
    fs.mkdirSync(thumbDir, { recursive: true });
}

const files = fs.readdirSync(assetsDir).filter(f => f.endsWith('.png'));

console.log(`Found ${files.length} images to optimize...`);

async function optimize() {
    for (const file of files) {
        const inputPath = path.join(assetsDir, file);
        const outputPath = path.join(thumbDir, file.replace(/\.png$/, '.webp'));
        
        if (fs.existsSync(outputPath)) {
            console.log(`Skipping existing: ${file}`);
            continue;
        }

        try {
            const stats = fs.statSync(inputPath);
            await sharp(inputPath)
                .resize({ width: 720, withoutEnlargement: true })
                .webp({ quality: 82, effort: 4 })
                .toFile(outputPath);
            
            const newStats = fs.statSync(outputPath);
            const ratio = ((1 - newStats.size / stats.size) * 100).toFixed(1);
            console.log(`Optimized ${file}: ${(stats.size / 1024 / 1024).toFixed(2)}MB -> ${(newStats.size / 1024).toFixed(1)}KB (-${ratio}%)`);
        } catch (err) {
            console.error(`Error optimizing ${file}:`, err);
        }
    }
    console.log('All images optimized successfully!');
}

optimize();
