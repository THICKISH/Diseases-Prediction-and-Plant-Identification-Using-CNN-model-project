import 'package:medical_ai_assistant/models/chat_models.dart';

/// Offline / demo responses when the backend is unreachable.

MedicalAiResponse localSymptomFallback(String userText, String language) {
  final t = userText.toLowerCase();
  final isTa = language == 'ta';

  if (t.contains('cold') ||
      t.contains('runny') ||
      t.contains('sneez') ||
      t.contains('சளி') ||
      t.contains('தொண்டை')) {
    return MedicalAiResponse(
      conditionSummary:
          isTa ? 'சளி / தண்டு எரிச்சல் (குறிப்பு)' : 'Common cold / throat irritation (educational)',
      basicTips: isTa
          ? [
              'நிறைய வெதுவெதுப்பான திரவம் குடிக்கவும்.',
              'ஓய்வு மற்றும் வெப்பமான குளியல்.',
            ]
          : [
              'Rest and drink warm fluids.',
              'Gargle salt water for sore throat.',
              'Use a mask if needed to avoid spreading.',
            ],
      possibleMedicines: isTa
          ? [
              'Paracetamol (காய்ச்சல்/வலிக்கு) — மருத்துவர்/லேபிள் அறிவுரைப்படி.',
            ]
          : [
              'Paracetamol for fever/aches (if suitable and label-approved).',
              'Saline nasal drops for congestion (as appropriate).',
            ],
      herbalRemedies: [
        HerbalRemedy(
          name: isTa ? 'துளசி தேநீர்' : 'Tulsi (holy basil) tea',
          imageUrl: 'assets/images/plants/tulsi.jpg',
          whenToUse: isTa ? 'சளி, தொண்டை வலி உள்ளபோது.' : 'For cold and sore throat.',
          preparation: isTa ? 'கஷாயம்/தேநீர் வடிவில்.' : 'Best as warm decoction/tea.',
          howToUse: isTa
              ? 'துளசி இலைகளை வெதுவெதுப்பான நீரில் கொதிக்க விட்டு குடிக்கவும்.'
              : 'Steep tulsi leaves in warm water and sip.',
          diseasesHelped:
              isTa ? ['சளி', 'தொண்டை வலி'] : ['Cold', 'Sore throat'],
          notes: isTa
              ? 'ஒவ்வாமை இருந்தால் தவிர்க்கவும்.'
              : 'Avoid if allergic; not for infants without doctor advice.',
        ),
        HerbalRemedy(
          name: isTa ? 'இஞ்சி + தேன்' : 'Ginger + honey',
          imageUrl: 'assets/images/plants/ginger.jpg',
          whenToUse: isTa ? 'சளி மற்றும் செரிமான சிக்கலில்.' : 'For cold and digestion discomfort.',
          preparation: isTa ? 'சாறு/தேநீர் வடிவில்.' : 'Use as tea or diluted juice.',
          howToUse: isTa
              ? 'இஞ்சி சாறுடன் தேன் கலந்து சிறிது.'
              : 'Small amount of ginger juice with warm water/honey.',
          diseasesHelped:
              isTa ? ['சளி', 'செரிமான சிக்கல்'] : ['Cold', 'Indigestion'],
          notes: isTa
              ? 'நீரிழிவு/மருந்து கலக்கம் இருந்தால் மருத்துவர் கேள்வி.'
              : 'Diabetics: mind sugar; ask doctor if on blood thinners.',
        ),
      ],
      precautions: isTa
          ? [
              'உயர் காய்ச்சல், சுவாசிப்பு கடினம், நீரின்மை — உடனே மருத்துவர்.',
            ]
          : [
              'See a doctor for high fever, breathing difficulty, chest pain, or symptoms > 3–5 days.',
            ],
      emergencySigns: isTa
          ? ['கடுமையான சுவாசிப்பு கடினம்', 'நீரிழப்பு', 'மயக்கம்']
          : ['Severe breathing difficulty', 'Confusion', 'Persistent high fever'],
    );
  }

  if (t.contains('fever') || t.contains('temperature') || t.contains('காய்ச்சல்')) {
    return MedicalAiResponse(
      conditionSummary: isTa ? 'காய்ச்சல் (குறிப்பு)' : 'Fever (educational)',
      basicTips: isTa
          ? ['நிறைய திரவம்', 'ஓய்வு', 'வெதுவெதுப்பான உடை']
          : ['Hydrate, rest, light clothing, monitor temperature.'],
      possibleMedicines: [
        isTa
            ? 'Paracetamol — மருத்துவர்/லேபிள் படி'
            : 'Paracetamol (if appropriate per label/age)',
      ],
      herbalRemedies: [
        HerbalRemedy(
          name: isTa ? 'குற்குமா / மஞ்சள் பால்' : 'Turmeric milk',
          imageUrl: 'assets/images/plants/turmeric.jpg',
          whenToUse: isTa ? 'லேசான காய்ச்சல்/உடல்வலி.' : 'For mild fever and body ache support.',
          preparation: isTa ? 'வெதுவெதுப்பான பாலில் கலந்து.' : 'Mix in warm milk.',
          howToUse: isTa
              ? 'சிறிது மஞ்சள் பொடி வெதுவெதுப்பான பாலில்.'
              : 'Warm milk with a pinch of turmeric (traditional comfort).',
          diseasesHelped: isTa ? ['காய்ச்சல் ஆதரவு'] : ['Fever support'],
          notes: isTa ? 'தொண்டை எரிச்சல் இருந்தால் கவனமாக.' : 'Avoid if allergic to dairy.',
        ),
      ],
      precautions: [
        isTa
            ? 'குழந்தைகள், கர்ப்பம், நீரிழிவு — மருத்துவர் அறிவுரை.'
            : 'Seek urgent care for stiff neck, rash with fever, or severe weakness.',
      ],
      emergencySigns: [
        isTa ? 'நீரிழிப்பு இல்லை' : 'Not drinking fluids',
        isTa ? 'மயக்கம்' : 'Seizure or confusion',
      ],
    );
  }

  return MedicalAiResponse(
    conditionSummary:
        isTa ? 'பொதுவான சுகாதார குறிப்பு (ஆஃப்லைன்)' : 'General wellness tips (offline)',
    basicTips: [
      isTa
          ? 'நிறைய திரவம், ஓய்வு, சமச்சீர் உணவு.'
          : 'Hydrate, balanced sleep, and avoid self-medicating blindly.',
    ],
    possibleMedicines: [
      isTa
          ? 'உங்கள் சிக்கலுக்கு ஏற்ற மருந்து — மருத்துவர்.'
          : 'Use medicines only as per doctor/pharmacist for your condition.',
    ],
    herbalRemedies: [
      HerbalRemedy(
        name: isTa ? 'இலைச்சீர் / கீரை வகைகள்' : 'Leafy greens & fiber',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Spinacia_oleracea_Spinazie_bloeiend.jpg/330px-Spinacia_oleracea_Spinazie_bloeiend.jpg',
        whenToUse: isTa ? 'பொது உடல்நல பராமரிப்பிற்கு.' : 'For general wellness support.',
        preparation: isTa ? 'சமைத்து உணவு வடிவில்.' : 'Use as cooked food daily.',
        howToUse: isTa
            ? 'இயற்கை உணவு மற்றும் போதுமான நீர்.'
            : 'Whole foods and hydration support general health.',
        diseasesHelped: isTa ? ['பொது நலன்'] : ['General wellness'],
        notes: isTa
            ? 'இது மருத்துவ ஆலோசனை அல்ல.'
            : 'Educational only; not a diagnosis.',
      ),
    ],
    precautions: [
      isTa
          ? 'இணையம்/சேவையை இணைத்து மேலும் விவரம் பெறவும்.'
          : 'Connect the backend (OpenAI) for full AI answers, or add your PC IP in Settings.',
    ],
    emergencySigns: [
      isTa ? 'உடனடி அபாயம் — 108 / அருகிலுள்ள மருத்துவமனை' : 'Emergency: call local emergency number',
    ],
  );
}
