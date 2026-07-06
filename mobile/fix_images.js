const fs = require('fs');
const https = require('https');
const path = require('path');

const plants = {
  'ajwain': 'Trachyspermum ammi',
  'aloe_vera': 'Aloe vera',
  'coriander': 'Coriander',
  'eucalyptus': 'Eucalyptus',
  'fenugreek': 'Fenugreek',
  'ginger': 'Ginger',
  'licorice': 'Liquorice',
  'neem': 'Azadirachta indica',
  'nilavembu': 'Andrographis paniculata',
  'peppermint': 'Peppermint',
  'tulsi': 'Ocimum tenuiflorum',
  'turmeric': 'Turmeric',
  'echinacea': 'Echinacea purpurea',
  'chamomile': 'Chamomile',
  'ginseng': 'Panax',
  'ashwagandha': 'Withania somnifera',
  'garlic': 'Garlic',
  'clove': 'Clove',
  'cinnamon': 'Cinnamon'
};

const outputDir = path.join(__dirname, 'assets', 'images', 'plants');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function httpsGet(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (MedicalApp 1.0; info@example.com)' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return httpsGet(res.headers.location, dest).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function fetchImage(filename, title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
  
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (MedicalApp 1.0; info@example.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          const imgUrl = pages[pageId].thumbnail?.source;
          
          if (imgUrl) {
            console.log(`Downloading ${imgUrl} for ${title}...`);
            await httpsGet(imgUrl, path.join(outputDir, `${filename}.jpg`));
            resolve();
          } else {
            console.log(`No image found for ${title}`);
            resolve();
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const [filename, title] of Object.entries(plants)) {
    try {
      await fetchImage(filename, title);
    } catch (e) {
      console.error(`Failed ${title}:`, e);
    }
  }
}

run();
