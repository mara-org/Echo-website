const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'locales');
const templatesDir = path.join(__dirname, 'templates');
const distDir = path.join(__dirname, 'dist');
const sharedAssets = ['logo.png', 'script.js', 'style.css'];

// Create dist dir
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Read locales
const locales = {};
fs.readdirSync(localesDir).forEach(file => {
    if (file.endsWith('.json')) {
        const lang = file.replace('.json', '');
        locales[lang] = JSON.parse(fs.readFileSync(path.join(localesDir, file), 'utf8'));
    }
});

// Copy shared assets to dist
sharedAssets.forEach(asset => {
    if (fs.existsSync(asset)) {
        fs.copyFileSync(path.join(__dirname, asset), path.join(distDir, asset));
    }
});

// Process templates
const templates = fs.readdirSync(templatesDir).filter(f => f.endsWith('.html'));

Object.keys(locales).forEach(lang => {
    const dict = locales[lang];
    const langDir = lang === 'en' ? distDir : path.join(distDir, lang);
    
    if (lang !== 'en' && !fs.existsSync(langDir)) {
        fs.mkdirSync(langDir, { recursive: true });
    }

    templates.forEach(templateFile => {
        let content = fs.readFileSync(path.join(templatesDir, templateFile), 'utf8');
        
        // Handle RTL for Arabic and other RTL languages
        const rtlLangs = ['ar', 'he', 'fa', 'ur'];
        const dir = rtlLangs.includes(lang) ? 'rtl' : 'ltr';
        content = content.replace('<html lang="en">', `<html lang="${lang}" dir="${dir}">`);
        
        // Replace translation keys
        Object.keys(dict).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            content = content.replace(regex, dict[key]);
        });
        
        
        // If not english, we need to adjust asset paths
        if (lang !== 'en') {
            content = content.replace(/href="style\.css"/g, 'href="../style.css"');
            content = content.replace(/src="script\.js"/g, 'src="../script.js"');
            content = content.replace(/src="logo\.png"/g, 'src="../logo.png"');
            
            // Adjust internal links to prefix with language
            content = content.replace(/href="\/(.*?)"/g, `href="/${lang}/$1"`);
            
            // Re-fix language switcher links if they got messed up by the above regex
            const allLangs = Object.keys(locales).filter(l => l !== 'en').join('|');
            content = content.replace(new RegExp(`value="/${lang}/(${allLangs})/"`, 'g'), 'value="/$1/"');
            content = content.replace(new RegExp(`value="/${lang}/"`, 'g'), 'value="/"'); // fix en link
            
            content = content.replace(`data-lang="${lang}"`, `data-lang="${lang}" selected`);
        } else {
            // Internal links don't need language prefix for root
            content = content.replace(/href="\/(.*?)"/g, `href="/$1"`);
            content = content.replace(`data-lang="en"`, `data-lang="en" selected`);
        }
        
        fs.writeFileSync(path.join(langDir, templateFile), content);
    });
});

console.log('Build complete! 24 localized files generated in /dist');
