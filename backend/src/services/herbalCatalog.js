const HERBS = [
  {
    key: "tulsi",
    names: ["tulsi", "holy basil", "துளசி"],
    nameEn: "Tulsi (Holy Basil)",
    nameTa: "துளசி",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Tulsi_or_Tulasi_Holy_basil.jpg/330px-Tulsi_or_Tulasi_Holy_basil.jpg",
    whenToUseEn: "Cold, mild cough, throat irritation.",
    whenToUseTa: "சளி, லேசான இருமல், தொண்டை எரிச்சல்.",
    preparationEn: "Decoction/tea is preferred; avoid eating large raw quantity.",
    preparationTa: "கஷாயம்/தேநீர் வடிவில் குடிப்பது சிறந்தது; அதிகமாக பச்சையாக சாப்பிட வேண்டாம்.",
    howToUseEn: "Boil 5-7 leaves in water for 5-7 minutes and drink warm 1-2 times/day.",
    howToUseTa: "5-7 துளசி இலைகளை நீரில் 5-7 நிமிடம் கொதிக்க வைத்து வெதுவெதுப்பாக தினமும் 1-2 முறை குடிக்கவும்.",
    diseasesHelpedEn: ["Cold", "Cough", "Sore throat"],
    diseasesHelpedTa: ["சளி", "இருமல்", "தொண்டை வலி"],
    notesEn: "Avoid excessive use during pregnancy unless advised by doctor.",
    notesTa: "கர்ப்பகாலத்தில் மருத்துவர் ஆலோசனையின்றி அதிகமாக பயன்படுத்த வேண்டாம்."
  },
  {
    key: "ginger",
    names: ["ginger", "inji", "இஞ்சி"],
    nameEn: "Ginger",
    nameTa: "இஞ்சி",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Koeh-146-no_text.jpg/330px-Koeh-146-no_text.jpg",
    whenToUseEn: "Cold with throat discomfort, nausea, poor digestion.",
    whenToUseTa: "சளி மற்றும் தொண்டை அசௌகரியம், வாந்தி உணர்வு, செரிமான சிக்கல்.",
    preparationEn: "Use as warm ginger tea or diluted juice with honey.",
    preparationTa: "இஞ்சி தேநீர் அல்லது தேனுடன் கலந்த நீர்க்கலவையாக பயன்படுத்தவும்.",
    howToUseEn: "Crush small ginger piece, boil in water, add little honey, drink warm.",
    howToUseTa: "சிறிது இஞ்சியை நசுக்கி நீரில் கொதிக்க வைத்து, சிறிது தேன் சேர்த்து குடிக்கவும்.",
    diseasesHelpedEn: ["Cold", "Throat irritation", "Indigestion"],
    diseasesHelpedTa: ["சளி", "தொண்டை எரிச்சல்", "செரிமானக் குறைபாடு"],
    notesEn: "Avoid high quantity if you have gastric irritation or are on blood thinners.",
    notesTa: "வயிற்று எரிச்சல் அல்லது blood thinner மருந்துகள் எடுத்தால் அளவாக மட்டும் பயன்படுத்தவும்."
  },
  {
    key: "nilavembu",
    names: ["nilavembu", "andrographis", "நிலவேம்பு"],
    nameEn: "Nilavembu",
    nameTa: "நிலவேம்பு",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Andrographis_paniculata_%28Kalpa%29_in_Narshapur_forest%2C_AP_W2_IMG_0867.jpg/330px-Andrographis_paniculata_%28Kalpa%29_in_Narshapur_forest%2C_AP_W2_IMG_0867.jpg",
    whenToUseEn: "Fever support and body pain (traditional use).",
    whenToUseTa: "காய்ச்சல் மற்றும் உடல்வலி நேரங்களில் (பாரம்பரிய பயன்பாடு).",
    preparationEn: "Use as kashayam/decoction; do not consume raw in large quantity.",
    preparationTa: "கஷாயமாக பயன்படுத்தவும்; பச்சையாக அதிகம் சாப்பிட வேண்டாம்.",
    howToUseEn: "Prepare nilavembu kashayam as directed by Siddha practitioner or package instructions.",
    howToUseTa: "சித்த மருத்துவர்/பொதி வழிமுறையின்படி நிலவேம்பு கஷாயம் தயாரித்து குடிக்கவும்.",
    diseasesHelpedEn: ["Fever support", "Body pain support"],
    diseasesHelpedTa: ["காய்ச்சல் ஆதரவு", "உடல்வலி ஆதரவு"],
    notesEn: "Not a replacement for medical treatment in persistent or high fever.",
    notesTa: "அதிக காய்ச்சல் அல்லது நீடித்த காய்ச்சலில் மருத்துவ சிகிச்சைக்கு மாற்றாக அல்ல."
  },
  {
    key: "turmeric",
    names: ["turmeric", "manjal", "மஞ்சள்"],
    nameEn: "Turmeric",
    nameTa: "மஞ்சள்",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Turmeric_inflorescence.jpg/330px-Turmeric_inflorescence.jpg",
    whenToUseEn: "Mild inflammation, sore throat support, skin care support.",
    whenToUseTa: "லேசான அழற்சி, தொண்டை பிரச்சனை, தோல் பராமரிப்பு ஆதரவு.",
    preparationEn: "Use as warm milk/tea or diluted paste for external use.",
    preparationTa: "வெதுவெதுப்பான பால்/தேநீர் அல்லது வெளியே தடவ பேஸ்ட் வடிவில் பயன்படுத்தலாம்.",
    howToUseEn: "Add a pinch in warm milk once daily; external paste only on intact skin.",
    howToUseTa: "சிறிதளவு மஞ்சளை வெதுவெதுப்பான பாலில் கலந்து தினம் ஒருமுறை; வெளிப்பயன்பாடு intact skin-ல் மட்டும்.",
    diseasesHelpedEn: ["Throat irritation", "Mild body pain support", "Skin support"],
    diseasesHelpedTa: ["தொண்டை எரிச்சல்", "லேசான உடல்வலி ஆதரவு", "தோல் ஆதரவு"],
    notesEn: "Avoid excess amounts; consult doctor in gallbladder disease or pregnancy.",
    notesTa: "அளவுக்கு மீறாமல் பயன்படுத்தவும்; பித்தப்பை/கர்ப்பகாலத்தில் மருத்துவர் ஆலோசனை அவசியம்."
  },
  {
    key: "peppermint",
    names: ["peppermint", "pudina", "mint", "புதினா"],
    nameEn: "Peppermint (Mint)",
    nameTa: "புதினா",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Mentha_x_piperita_001.JPG/330px-Mentha_x_piperita_001.JPG",
    whenToUseEn: "Indigestion, bloating, mild nausea.",
    whenToUseTa: "செரிமான சிக்கல், வயிற்றுப் பொத்தல், லேசான வாந்தி உணர்வு.",
    preparationEn: "Mint tea or diluted mint infusion.",
    preparationTa: "புதினா தேநீர் அல்லது நீரில் கரைத்த சாறு.",
    howToUseEn: "Steep a few leaves in hot water and sip after meals.",
    howToUseTa: "சில இலைகளை வெந்நீரில் ஊறவைத்து உணவுக்குப் பிறகு குடிக்கவும்.",
    diseasesHelpedEn: ["Indigestion", "Bloating", "Nausea support"],
    diseasesHelpedTa: ["செரிமானக் குறைபாடு", "வயிற்றுப் பொத்தல்", "வாந்தி உணர்வு ஆதரவு"],
    notesEn: "May worsen reflux in some people.",
    notesTa: "சிலருக்கு அமிலத்தன்மை/ரிஃப்ளக்ஸ் அதிகரிக்கலாம்."
  },
  {
    key: "ajwain",
    names: ["ajwain", "omam", "carom", "ஓமம்"],
    nameEn: "Ajwain (Carom)",
    nameTa: "ஓமம்",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Trachyspermum_ammi_seeds.jpg/320px-Trachyspermum_ammi_seeds.jpg",
    whenToUseEn: "Gas, stomach discomfort, mild cough support.",
    whenToUseTa: "வயிற்று காற்று, வயிற்று அசௌகரியம், லேசான இருமல் ஆதரவு.",
    preparationEn: "Warm ajwain water.",
    preparationTa: "ஓமம் கலந்த வெந்நீர்.",
    howToUseEn: "Boil 1/2 tsp ajwain in water and sip warm.",
    howToUseTa: "அரை டீஸ்பூன் ஓமத்தை நீரில் கொதிக்க வைத்து வெதுவெதுப்பாக குடிக்கவும்.",
    diseasesHelpedEn: ["Gas", "Indigestion", "Mild cough support"],
    diseasesHelpedTa: ["வயிற்றுக் காற்று", "செரிமானக் குறைபாடு", "லேசான இருமல் ஆதரவு"],
    notesEn: "Use in moderation during pregnancy.",
    notesTa: "கர்ப்பகாலத்தில் அளவாக மட்டும் பயன்படுத்தவும்."
  },
  {
    key: "aloe_vera",
    names: ["aloe", "aloe vera", "சோற்றுக்கற்றாழை", "கற்றாழை"],
    nameEn: "Aloe Vera",
    nameTa: "சோற்றுக்கற்றாழை",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Aloe_vera_flower_inset.png/330px-Aloe_vera_flower_inset.png",
    whenToUseEn: "Minor skin irritation/burn support (external).",
    whenToUseTa: "சிறிய தோல் எரிச்சல்/சுடுதல் ஆதரவு (வெளிப்பயன்பாடு).",
    preparationEn: "Use fresh gel externally on clean skin.",
    preparationTa: "புதிய ஜெலை சுத்தமான தோலில் வெளியே தடவவும்.",
    howToUseEn: "Apply thin layer 1-2 times/day on minor irritation.",
    howToUseTa: "சிறிய எரிச்சல் பகுதியில் மெல்லிய படலமாக தினம் 1-2 முறை தடவவும்.",
    diseasesHelpedEn: ["Minor skin irritation", "Minor burn support"],
    diseasesHelpedTa: ["சிறிய தோல் எரிச்சல்", "சிறிய சுடுதல் ஆதரவு"],
    notesEn: "Do not apply on deep/open/infected wounds.",
    notesTa: "ஆழமான/திறந்த/தொற்று உள்ள காயங்களில் பயன்படுத்த வேண்டாம்."
  },
  {
    key: "neem",
    names: ["neem", "veppilai", "வேப்பிலை", "வேம்பு"],
    nameEn: "Neem",
    nameTa: "வேம்பு",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Neem_%28Azadirachta_indica%29_leaves_in_Kolkata_W_IMG_4690.jpg/330px-Neem_%28Azadirachta_indica%29_leaves_in_Kolkata_W_IMG_4690.jpg",
    whenToUseEn: "Skin hygiene support and scalp care support.",
    whenToUseTa: "தோல் சுத்தம் மற்றும் தலையோட்டு பராமரிப்பு ஆதரவு.",
    preparationEn: "Use boiled/cooled neem water externally.",
    preparationTa: "வேப்பிலை நீரை கொதிக்க வைத்து குளிர வைத்து வெளியே பயன்படுத்தவும்.",
    howToUseEn: "Use neem water rinse for skin/scalp support.",
    howToUseTa: "தோல்/தலையோட்டுக்கு வேப்பிலை நீரை கழுவ பயன்படுத்தலாம்.",
    diseasesHelpedEn: ["Skin irritation support", "Scalp hygiene support"],
    diseasesHelpedTa: ["தோல் எரிச்சல் ஆதரவு", "தலையோட்டு சுத்தம் ஆதரவு"],
    notesEn: "Avoid oral neem use without clinical guidance.",
    notesTa: "மருத்துவ ஆலோசனை இல்லாமல் வாய்வழி வேம்பு உட்கொள்ள வேண்டாம்."
  },
  {
    key: "licorice",
    names: ["licorice", "athimadhuram", "அதிமதுரம்"],
    nameEn: "Licorice (Athimadhuram)",
    nameTa: "அதிமதுரம்",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Glycyrrhiza_glabra_plant.jpg/330px-Glycyrrhiza_glabra_plant.jpg",
    whenToUseEn: "Dry cough and throat irritation support.",
    whenToUseTa: "வறட்டு இருமல் மற்றும் தொண்டை எரிச்சல் ஆதரவு.",
    preparationEn: "Mild decoction or lozenge form.",
    preparationTa: "லேசான கஷாயம் அல்லது லோசென்ஜ் வடிவில்.",
    howToUseEn: "Use small quantity in warm water once daily.",
    howToUseTa: "சிறிய அளவு வெந்நீரில் கலந்து தினம் ஒருமுறை பயன்படுத்தவும்.",
    diseasesHelpedEn: ["Dry cough support", "Throat support"],
    diseasesHelpedTa: ["வறட்டு இருமல் ஆதரவு", "தொண்டை ஆதரவு"],
    notesEn: "Avoid frequent use in high BP/kidney disease.",
    notesTa: "உயர் ரத்த அழுத்தம்/சிறுநீரக நோய் இருந்தால் அடிக்கடி பயன்படுத்த வேண்டாம்."
  },
  {
    key: "fenugreek",
    names: ["fenugreek", "methi", "vendhayam", "வெந்தயம்"],
    nameEn: "Fenugreek",
    nameTa: "வெந்தயம்",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Trigonella_foenum-graecum_seed.jpg/330px-Trigonella_foenum-graecum_seed.jpg",
    whenToUseEn: "Mild blood sugar support and digestion support.",
    whenToUseTa: "லேசான இரத்த சர்க்கரை ஆதரவு மற்றும் செரிமான ஆதரவு.",
    preparationEn: "Soaked seeds or lightly boiled water.",
    preparationTa: "ஊறவைத்த விதைகள் அல்லது லேசாக கொதிக்க வைத்த நீர்.",
    howToUseEn: "Use small soaked quantity in the morning.",
    howToUseTa: "காலை நேரத்தில் சிறிய அளவு ஊறவைத்த வெந்தயம் பயன்படுத்தலாம்.",
    diseasesHelpedEn: ["Digestive support", "Metabolic support"],
    diseasesHelpedTa: ["செரிமான ஆதரவு", "மெட்டபாலிக் ஆதரவு"],
    notesEn: "Diabetes patients on medication should monitor sugar closely.",
    notesTa: "நீரிழிவு மருந்து எடுத்தால் சர்க்கரை அளவை கவனமாக கண்காணிக்கவும்."
  },
  {
    key: "coriander",
    names: ["coriander", "dhania", "kothamalli", "கொத்தமல்லி"],
    nameEn: "Coriander",
    nameTa: "கொத்தமல்லி",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coriandrum_sativum_003.JPG/330px-Coriandrum_sativum_003.JPG",
    whenToUseEn: "Mild urinary burning and digestive discomfort support.",
    whenToUseTa: "லேசான சிறுநீர் எரிச்சல் மற்றும் செரிமான அசௌகரிய ஆதரவு.",
    preparationEn: "Soaked seeds water or mild infusion.",
    preparationTa: "ஊறவைத்த விதை நீர் அல்லது லேசான கஷாயம்.",
    howToUseEn: "Drink coriander-seed infused water once or twice daily.",
    howToUseTa: "கொத்தமல்லி விதை ஊறிய நீரை தினம் 1-2 முறை குடிக்கலாம்.",
    diseasesHelpedEn: ["Urinary comfort support", "Digestive support"],
    diseasesHelpedTa: ["சிறுநீர் நிம்மதி ஆதரவு", "செரிமான ஆதரவு"],
    notesEn: "If burning urination persists, seek clinical evaluation.",
    notesTa: "சிறுநீர் எரிச்சல் நீடித்தால் உடனே மருத்துவ பரிசோதனை அவசியம்."
  },
  {
    key: "fennel",
    names: ["fennel", "fennel seeds", "saunf", "sombu", "சோம்பு"],
    nameEn: "Fennel Seeds",
    nameTa: "சோம்பு",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Fennel_seed.jpg/220px-Fennel_seed.jpg",
    whenToUseEn: "Bloating, gas and mild indigestion support.",
    whenToUseTa: "வயிற்றுப் பொத்தல், காற்று பிரச்சனை, லேசான செரிமான சிக்கல் ஆதரவு.",
    preparationEn: "Chew seeds after food or make mild fennel tea.",
    preparationTa: "உணவுக்குப் பிறகு விதைகள் மென்று கொள்ளலாம் அல்லது சோம்பு தேநீர் தயாரிக்கலாம்.",
    howToUseEn: "Use 1 tsp after meals or steep in hot water for tea.",
    howToUseTa: "உணவுக்குப் பிறகு 1 டீஸ்பூன் அல்லது வெந்நீரில் ஊறவைத்து தேநீராக குடிக்கலாம்.",
    diseasesHelpedEn: ["Bloating", "Gas", "Indigestion support"],
    diseasesHelpedTa: ["வயிற்றுப் பொத்தல்", "காற்று பிரச்சனை", "செரிமான ஆதரவு"],
    notesEn: "Use moderate quantity; seek care if pain is persistent.",
    notesTa: "அளவாக பயன்படுத்தவும்; வலி நீடித்தால் மருத்துவரை அணுகவும்."
  },
  {
    key: "triphala",
    names: ["triphala", "திரிபலா", "திரிபல"],
    nameEn: "Triphala",
    nameTa: "திரிபலா",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/A_view_of_Honey_Terminalia_chebula_%28Kadukkaai%29.jpg/330px-A_view_of_Honey_Terminalia_chebula_%28Kadukkaai%29.jpg",
    whenToUseEn: "Constipation support and digestive regularity.",
    whenToUseTa: "மலச்சிக்கல் ஆதரவு மற்றும் செரிமான ஒழுங்குபடுத்தல்.",
    preparationEn: "Use powder in warm water, usually at bedtime.",
    preparationTa: "பொடியை வெதுவெதுப்பான நீரில் கலந்து, பொதுவாக இரவில் எடுத்துக் கொள்க.",
    howToUseEn: "Use small measured quantity as advised on label/practitioner guidance.",
    howToUseTa: "லேபிள்/மருத்துவர் வழிகாட்டல்படி அளவாக பயன்படுத்தவும்.",
    diseasesHelpedEn: ["Constipation support", "Digestive support"],
    diseasesHelpedTa: ["மலச்சிக்கல் ஆதரவு", "செரிமான ஆதரவு"],
    notesEn: "Avoid overuse; consult doctor if loose stools occur.",
    notesTa: "அளவுக்கு மீறாமல் பயன்படுத்தவும்; வயிற்றுப்போக்கு வந்தால் மருத்துவரை அணுகவும்."
  }
];

function containsAny(text, words) {
  const t = text.toLowerCase();
  return words.some((w) => t.includes(w));
}

function symptomHerbKeys(userMessage = "") {
  const text = userMessage.toLowerCase();
  const keys = new Set();

  if (containsAny(text, ["cold", "cough", "sore throat", "runny", "சளி", "இருமல்", "தொண்டை"])) {
    keys.add("tulsi");
    keys.add("ginger");
    keys.add("licorice");
    keys.add("turmeric");
  }
  if (containsAny(text, ["fever", "temperature", "காய்ச்சல்"])) {
    keys.add("nilavembu");
    keys.add("tulsi");
    keys.add("turmeric");
  }
  if (containsAny(text, ["gas", "bloating", "indigestion", "acidity", "stomach", "வயிறு", "செரிமான"])) {
    keys.add("peppermint");
    keys.add("ajwain");
    keys.add("fennel");
    keys.add("ginger");
    keys.add("fenugreek");
  }
  if (containsAny(text, ["vomit", "nausea", "வாந்தி"])) {
    keys.add("ginger");
    keys.add("peppermint");
  }
  if (containsAny(text, ["skin", "rash", "itch", "eczema", "தோல்", "அரிப்பு"])) {
    keys.add("neem");
    keys.add("aloe_vera");
    keys.add("turmeric");
  }
  if (containsAny(text, ["burn", "wound", "சுடுதல்", "காயம்"])) {
    keys.add("aloe_vera");
    keys.add("turmeric");
  }
  if (containsAny(text, ["sugar", "diabetes", "நீரிழிவு"])) {
    keys.add("fenugreek");
  }
  if (containsAny(text, ["urine", "urinary", "burning urine", "சிறுநீர்", "மூத்திர"])) {
    keys.add("coriander");
  }
  if (containsAny(text, ["headache", "migraine", "தலைவலி"])) {
    keys.add("ginger");
    keys.add("peppermint");
  }
  return [...keys];
}

function mapHerb(herb, language) {
  const tamil = language === "ta";
  return {
    name: tamil ? herb.nameTa : herb.nameEn,
    imageUrl: herb.imageUrl,
    whenToUse: tamil ? herb.whenToUseTa : herb.whenToUseEn,
    preparation: tamil ? herb.preparationTa : herb.preparationEn,
    howToUse: tamil ? herb.howToUseTa : herb.howToUseEn,
    diseasesHelped: tamil ? herb.diseasesHelpedTa : herb.diseasesHelpedEn,
    notes: tamil ? herb.notesTa : herb.notesEn
  };
}

function normalizeName(value = "") {
  return String(value).toLowerCase().replace(/[^a-z0-9\u0B80-\u0BFF]+/g, " ").trim();
}

export function findCatalogImageUrlByName(name = "") {
  const normalized = normalizeName(name);
  if (!normalized) return "";
  const herb = HERBS.find((h) => h.names.some((n) => normalized.includes(normalizeName(n))));
  return herb?.imageUrl || "";
}

export function enrichWithHerbalCatalog(response, userMessage, language = "en") {
  const current = Array.isArray(response?.herbalRemedies) ? response.herbalRemedies : [];

  const pickedByName = HERBS.filter((h) =>
    current.some((r) => containsAny((r?.name || "").toLowerCase(), h.names))
  );
  const pickedBySymptoms = symptomHerbKeys(userMessage).map((k) => HERBS.find((h) => h.key === k));

  const merged = [...pickedByName, ...pickedBySymptoms].filter(Boolean);
  const unique = [];
  const seen = new Set();
  for (const herb of merged) {
    if (seen.has(herb.key)) continue;
    seen.add(herb.key);
    unique.push(herb);
  }

  const mappedUnique = unique.map((h) => mapHerb(h, language));
  const existing = current.filter((r) => r && typeof r === "object");

  const mergedRemedies = [...existing];
  const seenNames = new Set(
    existing.map((r) => String(r.name || "").toLowerCase().trim()).filter(Boolean)
  );
  for (const herb of mappedUnique) {
    const key = String(herb.name || "").toLowerCase().trim();
    if (!key || seenNames.has(key)) continue;
    mergedRemedies.push(herb);
    seenNames.add(key);
  }

  const remedies = mergedRemedies.length ? mergedRemedies.slice(0, 7) : [mapHerb(HERBS[0], language)];
  return {
    ...response,
    herbalRemedies: remedies
  };
}
