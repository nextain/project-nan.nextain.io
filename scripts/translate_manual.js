import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
// Use gemini-2.5-flash as requested
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

const TARGET_LOCALES = [
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Simplified Chinese' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ru', name: 'Russian' },
  { code: 'es', name: 'Spanish' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'id', name: 'Indonesian' },
  { code: 'vi', name: 'Vietnamese' }
];

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'manual');
const SOURCE_DIR = path.join(CONTENT_DIR, 'en');

function cleanMarkdown(text) {
  let cleaned = text.trim();
  // Remove markdown code blocks if the model wrapped the output
  if (cleaned.startsWith('```')) {
    const lines = cleaned.split('\n');
    if (lines[0].startsWith('```')) lines.shift();
    if (lines[lines.length - 1].startsWith('```')) lines.pop();
    cleaned = lines.join('\n');
  }
  return cleaned.trim();
}

async function translateFile(sourcePath, targetPath, languageName) {
  const content = fs.readFileSync(sourcePath, 'utf-8');
  
  const prompt = `You are a professional technical translator.
Translate the following Markdown documentation into ${languageName}.
Maintain all Markdown formatting, links, bold text, lists, and structure exactly as they are.
Do NOT translate code blocks, variables, URLs, or product names like 'Naia OS', 'Nextain', 'Next AI Networks', or 'API Key'.
Output ONLY the translated Markdown text.

Source Text:
${content}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const translatedText = cleanMarkdown(response.text());
    fs.writeFileSync(targetPath, translatedText, 'utf-8');
    console.log(`✓ [${languageName}] Translated ${path.basename(sourcePath)}`);
    return true;
  } catch (error) {
    console.error(`✗ [${languageName}] Error in ${path.basename(sourcePath)}:`, error.message);
    return false;
  }
}

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY is missing in .env');
    process.exit(1);
  }

  const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.md'));
  console.log(`Starting translation for ${files.length} files into ${TARGET_LOCALES.length} languages...`);

  for (const locale of TARGET_LOCALES) {
    const targetDir = path.join(CONTENT_DIR, locale.code);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    console.log(`\n>> Target: ${locale.name} (${locale.code})`);
    for (const file of files) {
      const sourcePath = path.join(SOURCE_DIR, file);
      const targetPath = path.join(targetDir, file);
      
      if (fs.existsSync(targetPath)) {
        console.log(`- Skipping ${file} (already exists)`);
        continue;
      }

      let success = false;
      let retries = 0;
      while (!success && retries < 2) {
        success = await translateFile(sourcePath, targetPath, locale.name);
        if (!success) {
          retries++;
          console.log(`  (Retry ${retries}...)`);
          await new Promise(r => setTimeout(r, 5000));
        }
      }
      // Delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  console.log('\n✨ All translations completed!');
}

main();
