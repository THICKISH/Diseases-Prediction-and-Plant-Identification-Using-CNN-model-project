const PLANTNET_BASE = "https://my-api.plantnet.org/v2/identify";
const KINDWISE_PLANT_ID_V3 = "https://api.plant.id/v3/identification";

const PLANT_MEDICINAL_DB = [
  {
    keys: ["ocimum tenuiflorum", "holy basil", "tulsi"],
    tamilName: "துளசி",
    medicinalUses: [
      "Supports cold/cough relief",
      "Supports throat comfort",
      "May help immunity support"
    ],
    medicinalUsesTa: ["சளி/இருமல் நிவாரணத்திற்கு உதவும்", "தொண்டை நிம்மதிக்கு உதவும்", "நோய் எதிர்ப்பு சக்திக்கு ஆதரவு"],
    diseasesHelped: ["Cold", "Cough", "Sore throat"],
    diseasesHelpedTa: ["சளி", "இருமல்", "தொண்டை வலி"],
    howToPrepare: [
      "Kashayam/Tea: Boil 5-7 leaves in water for 5-7 minutes",
      "Steam: Add leaves in hot water for inhalation support"
    ],
    howToPrepareTa: ["கஷாயம்/தேநீர்: 5-7 இலைகளை 5-7 நிமிடம் கொதிக்க வைக்கவும்", "ஆவி பிடிக்க வெந்நீரில் இலை சேர்க்கவும்"],
    howToUse: [
      "Drink warm tulsi tea 1-2 times/day",
      "Chew 2-3 leaves (small quantity only)"
    ],
    howToUseTa: ["வெதுவெதுப்பான துளசி தேநீர் தினமும் 1-2 முறை குடிக்கவும்", "2-3 இலைகள் மட்டுமே மென்று கொள்ளவும்"],
    precautions: [
      "Do not overuse daily without medical advice",
      "Pregnant women should consult doctor before regular use"
    ],
    precautionsTa: ["மருத்துவர் ஆலோசனை இல்லாமல் அதிகமாக தினமும் பயன்படுத்த வேண்டாம்", "கர்ப்பிணிகள் மருத்துவரை கேட்டுப் பயன்படுத்தவும்"]
  },
  {
    keys: ["urtica dioica", "common nettle", "nettle"],
    tamilName: "நெட்டில் கீரை",
    medicinalUses: [
      "Traditionally used for inflammation support",
      "May support joint comfort",
      "May support iron intake in diet form"
    ],
    medicinalUsesTa: ["அரிப்பு/அணற்சி குறைப்பில் பாரம்பரியமாக பயன்படுத்தப்படுகிறது", "செயல்முறைப்படி மூட்டு நிம்மதிக்கு உதவலாம்", "உணவில் இரும்புச்சத்து ஆதரவாக இருக்கலாம்"],
    diseasesHelped: ["Joint discomfort support", "General wellness support"],
    diseasesHelpedTa: ["மூட்டு அசௌகரிய ஆதரவு", "பொது உடல்நல ஆதரவு"],
    howToPrepare: [
      "Cooked leaf form is preferred",
      "Tea: Dry leaves and steep in hot water"
    ],
    howToPrepareTa: ["சமைத்த இலை வடிவில் பயன்படுத்துவது சிறந்தது", "உலர் இலைகளை சூடான நீரில் ஊறவைத்து தேநீர் போல குடிக்கவும்"],
    howToUse: [
      "Consume only cooked/processed form",
      "Use tea in moderate quantity"
    ],
    howToUseTa: ["சமைத்த/செயலாக்கப்பட்ட வடிவில் மட்டும் பயன்படுத்தவும்", "தேநீரை அளவாக பயன்படுத்தவும்"],
    precautions: [
      "Raw leaves can irritate skin due to stinging hairs",
      "Consult doctor if kidney issues or long-term medicine usage"
    ],
    precautionsTa: ["பச்சை இலைகள் தோலில் இரைப்பு உண்டாக்கலாம்", "சிறுநீரக பிரச்சனை/நீண்டகால மருந்து இருப்பின் மருத்துவரை அணுகவும்"]
  },
  {
    keys: ["azadirachta indica", "neem"],
    tamilName: "வேம்பு",
    medicinalUses: [
      "Traditionally used for skin support",
      "Supports oral hygiene in traditional practice"
    ],
    medicinalUsesTa: ["தோல் பராமரிப்பிற்கு பாரம்பரியமாக பயன்படுத்தப்படுகிறது", "வாய் சுகாதாரத்திற்கு ஆதரவாக பயன்படுத்தப்படுகிறது"],
    diseasesHelped: ["Minor skin issues support", "Oral hygiene support"],
    diseasesHelpedTa: ["சிறிய தோல் பிரச்சனை ஆதரவு", "வாய் சுகாதார ஆதரவு"],
    howToPrepare: [
      "Boil leaves in water for external wash",
      "Make leaf paste for external application"
    ],
    howToPrepareTa: ["இலைகளை நீரில் கொதிக்க வைத்து வெளிப்புற கழுவலுக்கு பயன்படுத்தவும்", "வெளிப்புற பயன்பாட்டிற்கு இலை விழுது செய்யவும்"],
    howToUse: [
      "External use preferred",
      "Internal consumption only with expert guidance"
    ],
    howToUseTa: ["வெளிப்புற பயன்பாடு முன்னுரிமை", "உள் உட்கொள்ளல் நிபுணர் ஆலோசனையுடன் மட்டும்"],
    precautions: [
      "Avoid high internal doses",
      "Not advised in pregnancy without doctor guidance"
    ],
    precautionsTa: ["அதிக உள் அளவை தவிர்க்கவும்", "கர்ப்பகாலத்தில் மருத்துவர் ஆலோசனை இல்லாமல் பயன்படுத்த வேண்டாம்"]
  },
  {
    keys: ["aloe barbadensis", "aloe vera"],
    tamilName: "கற்றாழை",
    medicinalUses: [
      "Skin soothing support",
      "May support minor burn care"
    ],
    medicinalUsesTa: ["தோல் நிம்மதிக்கு ஆதரவு", "சிறிய எரிச்சல்/எரிபுண் பராமரிப்பில் உதவலாம்"],
    diseasesHelped: ["Minor skin irritation support", "General skin hydration"],
    diseasesHelpedTa: ["சிறிய தோல் எரிச்சல் ஆதரவு", "தோல் ஈரப்பத ஆதரவு"],
    howToPrepare: [
      "Extract clear gel from fresh leaf",
      "Remove yellow latex part before use"
    ],
    howToPrepareTa: ["புதிய இலையிலிருந்து வெளிப்படையான ஜெல் எடுக்கவும்", "மஞ்சள் லேடெக்ஸ் பகுதியை அகற்றவும்"],
    howToUse: [
      "Apply gel externally on skin",
      "Internal juice only in small safe quantity"
    ],
    howToUseTa: ["ஜெல்லை தோலில் வெளிப்புறமாக பயன்படுத்தவும்", "உள் ஜூஸ் சிறிய பாதுகாப்பான அளவில் மட்டும்"],
    precautions: [
      "Patch-test before skin use",
      "Avoid excess internal use"
    ],
    precautionsTa: ["முதலில் சிறிய பகுதி சோதனை செய்யவும்", "அதிக உள் பயன்பாட்டை தவிர்க்கவும்"]
  },
  {
    keys: ["curcuma longa", "turmeric"],
    tamilName: "மஞ்சள்",
    medicinalUses: [
      "Inflammation support",
      "Traditional cold support"
    ],
    medicinalUsesTa: ["அணற்சி/வலி ஆதரவு", "பாரம்பரிய சளி ஆதரவு"],
    diseasesHelped: ["Cold support", "General inflammation support"],
    diseasesHelpedTa: ["சளி ஆதரவு", "பொது அணற்சி ஆதரவு"],
    howToPrepare: [
      "Mix pinch of turmeric in warm milk",
      "Prepare paste for external support"
    ],
    howToPrepareTa: ["வெதுவெதுப்பான பாலில் சிறிதளவு மஞ்சள் சேர்க்கவும்", "வெளிப்புற பயன்பாட்டிற்கு விழுது தயாரிக்கவும்"],
    howToUse: [
      "Use moderate quantity in food/milk",
      "Use paste externally only"
    ],
    howToUseTa: ["உணவு/பாலில் அளவாக பயன்படுத்தவும்", "விழுது வெளிப்புறமாக மட்டும் பயன்படுத்தவும்"],
    precautions: [
      "Avoid excess use",
      "Consult doctor if on blood-thinner medication"
    ],
    precautionsTa: ["அதிக பயன்பாட்டை தவிர்க்கவும்", "இரத்த உறைதல் மருந்து எடுத்தால் மருத்துவரை அணுகவும்"]
  }
];

function enrichPlantInfo(base) {
  const text = `${base.plantName || ""} ${base.scientificName || ""}`.toLowerCase();
  const hit = PLANT_MEDICINAL_DB.find((p) => p.keys.some((k) => text.includes(k)));
  if (!hit) {
    return {
      ...base,
      tamilName: "தகவல் இல்லை",
      medicinalUsesTa: ["பிராந்திய பயன்பாடு மாறுபடலாம்", "நிபுணர் ஆலோசனையுடன் மட்டும் பயன்படுத்தவும்"],
      diseasesHelpedTa: ["தகவல் இல்லை"],
      howToPrepare: ["Use expert-verified preparation only"],
      howToPrepareTa: ["நிபுணர் உறுதிப்படுத்திய தயாரிப்பு முறையை மட்டும் பின்பற்றவும்"],
      howToUse: ["Use small quantity; consult local expert"],
      howToUseTa: ["சிறிய அளவில் மட்டும் பயன்படுத்தவும்; உள்ளூர் நிபுணரை அணுகவும்"],
      precautions: [
        base.caution ||
          "Do not consume unidentified plants without expert advice."
      ],
      precautionsTa: ["அடையாளம் தெரியாத செடிகளை நிபுணர் ஆலோசனை இல்லாமல் உட்கொள்ள வேண்டாம்"]
    };
  }

  return {
    ...base,
    tamilName: hit.tamilName,
    medicinalUses: hit.medicinalUses,
    medicinalUsesTa: hit.medicinalUsesTa || [],
    diseasesHelped: hit.diseasesHelped,
    diseasesHelpedTa: hit.diseasesHelpedTa || [],
    howToPrepare: hit.howToPrepare,
    howToPrepareTa: hit.howToPrepareTa || [],
    howToUse: hit.howToUse,
    howToUseTa: hit.howToUseTa || [],
    precautions: hit.precautions
    ,
    precautionsTa: hit.precautionsTa || []
  };
}

function buildFallbackPlantInfo() {
  const base = {
    plantName: "Unknown plant",
    tamilName: "தகவல் இல்லை",
    confidence: 0,
    medicinalUses: [
      "Unable to identify confidently from image.",
      "Please retake image in daylight with clear leaf focus."
    ],
    diseasesHelped: ["Not available"],
    diseasesHelpedTa: ["தகவல் இல்லை"],
    caution: "Do not consume unidentified plants without expert advice."
  };
  return enrichPlantInfo(base);
}

function resolvePlantProvider() {
  const p = (process.env.PLANT_PROVIDER || "").toLowerCase().trim();
  if (p === "plantnet" || p === "kindwise") return p;
  if (process.env.KINDWISE_API_KEY) return "kindwise";
  if (process.env.PLANTNET_API_KEY) return "plantnet";
  return null;
}

async function identifyWithPlantNet(fileBuffer, fileName) {
  const apiKey = process.env.PLANTNET_API_KEY;
  const project = process.env.PLANTNET_PROJECT || "all";
  if (!apiKey) return buildFallbackPlantInfo();

  const formData = new FormData();
  const blob = new Blob([fileBuffer], { type: "image/jpeg" });
  formData.append("images", blob, fileName);
  formData.append("organs", "leaf");

  const response = await fetch(
    `${PLANTNET_BASE}/${project}?api-key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      body: formData
    }
  );

  if (!response.ok) {
    return buildFallbackPlantInfo();
  }

  const json = await response.json();
  const best = json?.results?.[0];

  if (!best) {
    return buildFallbackPlantInfo();
  }

  const scientificName = best?.species?.scientificNameWithoutAuthor || "Unknown";
  const commonNames = best?.species?.commonNames || [];
  const plantName = commonNames[0] || scientificName;
  const confidence = Number((best.score * 100).toFixed(2));

  const base = {
    plantName,
    scientificName,
    confidence,
    medicinalUses: [
      "Traditional medicinal uses vary by region.",
      "Consult local Siddha/Ayurveda expert for exact preparation."
    ],
    diseasesHelped: ["Cough/Cold support", "Digestive support", "General wellness"],
    caution:
      "Use only expert-verified dosage. Some medicinal plants can be toxic in wrong amounts."
  };
  return enrichPlantInfo(base);
}

async function identifyWithKindwise(fileBuffer) {
  const apiKey = process.env.KINDWISE_API_KEY;
  if (!apiKey) return buildFallbackPlantInfo();

  // Kindwise plant.id expects base64 image(s) in JSON body.
  const base64Image = Buffer.from(fileBuffer).toString("base64");

  const url = new URL(KINDWISE_PLANT_ID_V3);
  // Ask for useful details; safe default subset.
  url.searchParams.set("details", "url,common_names,taxonomy,description");

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": apiKey
    },
    body: JSON.stringify({
      images: [base64Image]
    })
  });

  if (!res.ok) {
    return buildFallbackPlantInfo();
  }

  const json = await res.json();
  const suggestion = json?.result?.classification?.suggestions?.[0];
  if (!suggestion) return buildFallbackPlantInfo();

  const plantName = suggestion?.details?.common_names?.[0] || suggestion?.name || "Unknown";
  const scientificName = suggestion?.name || "Unknown";
  const confidence = Number(((suggestion?.probability || 0) * 100).toFixed(2));

  const base = {
    plantName,
    scientificName,
    confidence,
    medicinalUses: [
      "Traditional medicinal uses vary by region.",
      "Use expert-verified preparation (Siddha/Ayurveda) before consuming."
    ],
    diseasesHelped: ["Cough/Cold support", "Digestive support", "General wellness"],
    caution:
      "Do not consume unidentified plants. Confirm with a local expert; wrong plants/doses can be harmful."
  };
  return enrichPlantInfo(base);
}

export async function identifyPlantFromImage(fileBuffer, fileName = "leaf.jpg") {
  const provider = resolvePlantProvider();
  if (!provider) return buildFallbackPlantInfo();

  if (provider === "kindwise") {
    return identifyWithKindwise(fileBuffer);
  }

  return identifyWithPlantNet(fileBuffer, fileName);
}
