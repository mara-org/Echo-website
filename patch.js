const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'templates');
const templates = fs.readdirSync(templatesDir).filter(f => f.endsWith('.html'));

const newOptions = `
                    <option value="/ru/" data-lang="ru">Русский</option>
                    <option value="/id/" data-lang="id">Bahasa Indonesia</option>
                    <option value="/tr/" data-lang="tr">Türkçe</option>
                    <option value="/vi/" data-lang="vi">Tiếng Việt</option>
                    <option value="/th/" data-lang="th">ไทย</option>`;

templates.forEach(file => {
    const filePath = path.join(templatesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('data-lang="ru"')) {
        content = content.replace('<option value="/ko/" data-lang="ko">한국어</option>', '<option value="/ko/" data-lang="ko">한국어</option>' + newOptions);
        fs.writeFileSync(filePath, content);
        console.log(`Patched ${file}`);
    }
});
