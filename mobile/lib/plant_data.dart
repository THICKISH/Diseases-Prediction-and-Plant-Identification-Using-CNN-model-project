import 'package:medical_ai_assistant/message_model.dart';
import 'package:medical_ai_assistant/models/chat_models.dart';

const Map<String, Map<String, String>> localHerbalDatabase = {
  'tulsi': {
    'tamil_name': 'துளசி',
    'scientific_name': 'Ocimum tenuiflorum',
    'uses': 'Cold, cough, sore throat, immunity support',
    'how_to_use': 'Chew 2-3 leaves or prepare as tea/kashayam',
    'methods': 'Tea, decoction, raw leaves (small quantity)',
    'precautions': 'Avoid excess use during pregnancy unless doctor advises',
    'image': 'assets/images/plants/tulsi.jpg',
  },
  'neem': {
    'tamil_name': 'வேம்பு',
    'scientific_name': 'Azadirachta indica',
    'uses': 'Skin issues, minor infections, oral hygiene support',
    'how_to_use': 'Use neem water for wash; limited internal use only by guidance',
    'methods': 'Paste, boiled water rinse, dried leaf powder (guided use)',
    'precautions': 'Avoid self-medication in high doses; not for pregnant women',
    'image': 'assets/images/plants/neem.jpg',
  },
  'aloe vera': {
    'tamil_name': 'கற்றாழை',
    'scientific_name': 'Aloe barbadensis miller',
    'uses': 'Skin soothing, minor burns, digestive support (limited)',
    'how_to_use': 'Apply gel on skin; internal use only in small safe quantity',
    'methods': 'Fresh gel, topical application, diluted juice',
    'precautions': 'Test for allergy; excessive internal use may cause stomach upset',
    'image': 'assets/images/plants/aloe_vera.jpg',
  },
  'turmeric': {
    'tamil_name': 'மஞ்சள்',
    'scientific_name': 'Curcuma longa',
    'uses': 'Anti-inflammatory support, cold relief, wound care support',
    'how_to_use': 'Use in warm milk/food; paste can be used externally',
    'methods': 'Milk, cooking powder, paste',
    'precautions': 'Use moderate quantity; consult doctor if on blood thinner medicine',
    'image': 'assets/images/plants/turmeric.jpg',
  },
};

PlantResult? getPlantFromLocalDb(String detectedPlantName, double confidence) {
  final key = _normalizePlantKey(detectedPlantName);
  final data = localHerbalDatabase[key];
  if (data == null) return null;

  return PlantResult(
    plantNameEnglish: _displayNameFromKey(key),
    plantNameTamil: data['tamil_name'] ?? '-',
    scientificName: data['scientific_name'] ?? '-',
    confidence: confidence,
    uses: data['uses'] ?? '-',
    howToUse: data['how_to_use'] ?? '-',
    methods: data['methods'] ?? '-',
    precautions: data['precautions'] ?? '-',
    fromOfflineDb: true,
    imagePath: data['image'],
  );
}

String _normalizePlantKey(String name) {
  final n = name.toLowerCase().trim();
  if (n.contains('holy basil') || n.contains('tulsi') || n.contains('thulasi')) {
    return 'tulsi';
  }
  if (n.contains('neem') || n.contains('vepp')) return 'neem';
  if (n.contains('aloe')) return 'aloe vera';
  if (n.contains('turmeric') || n.contains('manjal')) return 'turmeric';
  return n;
}

String _displayNameFromKey(String key) {
  switch (key) {
    case 'tulsi':
      return 'Tulsi (Holy Basil)';
    case 'neem':
      return 'Neem';
    case 'aloe vera':
      return 'Aloe Vera';
    case 'turmeric':
      return 'Turmeric';
    default:
      return key;
  }
}

/// Convert local plant data to HerbalRemedy for display in chat
HerbalRemedy? getLocalPlantAsHerbalRemedy(String plantName) {
  final key = _normalizePlantKey(plantName);
  final data = localHerbalDatabase[key];
  if (data == null) return null;

  final displayName = _displayNameFromKey(key);

  return HerbalRemedy(
    name: displayName,
    imageUrl: data['image'] ?? '',
    whenToUse: data['uses'] ?? '-',
    preparation: data['methods'] ?? '-',
    howToUse: data['how_to_use'] ?? '-',
    diseasesHelped: [data['uses'] ?? 'General wellness'],
    notes: data['precautions'] ?? 'Consult an expert before use',
  );
}
