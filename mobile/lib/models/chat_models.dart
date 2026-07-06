class ChatMessage {
  ChatMessage({
    this.text = '',
    required this.isUser,
    this.aiResponse,
  });

  final String text;
  final bool isUser;
  final MedicalAiResponse? aiResponse;
}

class HerbalRemedy {
  HerbalRemedy({
    required this.name,
    required this.imageUrl,
    required this.whenToUse,
    required this.preparation,
    required this.howToUse,
    required this.diseasesHelped,
    required this.notes,
  });

  final String name;
  final String imageUrl;
  final String whenToUse;
  final String preparation;
  final String howToUse;
  final List<String> diseasesHelped;
  final String notes;

  factory HerbalRemedy.fromJson(Map<String, dynamic> json) {
    List<String> toList(dynamic value) =>
        (value as List<dynamic>? ?? []).map((e) => e.toString()).toList();

    return HerbalRemedy(
      name: (json['name'] ?? '').toString(),
      imageUrl: (json['imageUrl'] ?? '').toString(),
      whenToUse: (json['whenToUse'] ?? '').toString(),
      preparation: (json['preparation'] ?? '').toString(),
      howToUse: (json['howToUse'] ?? '').toString(),
      diseasesHelped: toList(json['diseasesHelped']),
      notes: (json['notes'] ?? '').toString(),
    );
  }
}

class MedicalAiResponse {
  MedicalAiResponse({
    required this.conditionSummary,
    required this.basicTips,
    required this.possibleMedicines,
    required this.herbalRemedies,
    required this.precautions,
    required this.emergencySigns,
  });

  final String conditionSummary;
  final List<String> basicTips;
  final List<String> possibleMedicines;
  final List<HerbalRemedy> herbalRemedies;
  final List<String> precautions;
  final List<String> emergencySigns;

  factory MedicalAiResponse.fromJson(Map<String, dynamic> json) {
    List<String> toList(dynamic value) =>
        (value as List<dynamic>? ?? []).map((e) => e.toString()).toList();

    return MedicalAiResponse(
      conditionSummary: (json['conditionSummary'] ?? '').toString(),
      basicTips: toList(json['basicTips']),
      possibleMedicines: toList(json['possibleMedicines']),
      herbalRemedies: (json['herbalRemedies'] as List<dynamic>? ?? [])
          .map((e) => HerbalRemedy.fromJson((e as Map).cast<String, dynamic>()))
          .toList(),
      precautions: toList(json['precautions']),
      emergencySigns: toList(json['emergencySigns']),
    );
  }
}

class PlantScanResponse {
  PlantScanResponse({
    required this.plantName,
    required this.tamilName,
    required this.scientificName,
    required this.confidence,
    required this.medicinalUses,
    required this.medicinalUsesTa,
    required this.diseasesHelped,
    required this.diseasesHelpedTa,
    required this.howToPrepare,
    required this.howToPrepareTa,
    required this.howToUse,
    required this.howToUseTa,
    required this.precautions,
    required this.precautionsTa,
    required this.caution,
  });

  final String plantName;
  final String tamilName;
  final String scientificName;
  final double confidence;
  final List<String> medicinalUses;
  final List<String> medicinalUsesTa;
  final List<String> diseasesHelped;
  final List<String> diseasesHelpedTa;
  final List<String> howToPrepare;
  final List<String> howToPrepareTa;
  final List<String> howToUse;
  final List<String> howToUseTa;
  final List<String> precautions;
  final List<String> precautionsTa;
  final String caution;

  factory PlantScanResponse.fromJson(Map<String, dynamic> json) {
    List<String> toList(dynamic value) =>
        (value as List<dynamic>? ?? []).map((e) => e.toString()).toList();

    return PlantScanResponse(
      plantName: (json['plantName'] ?? 'Unknown').toString(),
      tamilName: (json['tamilName'] ?? 'தகவல் இல்லை').toString(),
      scientificName: (json['scientificName'] ?? '').toString(),
      confidence: (json['confidence'] ?? 0).toDouble(),
      medicinalUses: toList(json['medicinalUses']),
      medicinalUsesTa: toList(json['medicinalUsesTa']),
      diseasesHelped: toList(json['diseasesHelped']),
      diseasesHelpedTa: toList(json['diseasesHelpedTa']),
      howToPrepare: toList(json['howToPrepare']),
      howToPrepareTa: toList(json['howToPrepareTa']),
      howToUse: toList(json['howToUse']),
      howToUseTa: toList(json['howToUseTa']),
      precautions: toList(json['precautions']),
      precautionsTa: toList(json['precautionsTa']),
      caution: (json['caution'] ?? '').toString(),
    );
  }
}
