import 'dart:typed_data';

class ChatMessage {
  ChatMessage({
    required this.isUser,
    this.text,
    this.imageBytes,
    this.plantResult,
  });

  final bool isUser;
  final String? text;
  final Uint8List? imageBytes;
  final PlantResult? plantResult;
}

class PlantResult {
  PlantResult({
    required this.plantNameEnglish,
    required this.plantNameTamil,
    required this.scientificName,
    required this.confidence,
    required this.uses,
    required this.howToUse,
    required this.methods,
    required this.precautions,
    required this.fromOfflineDb,
    this.imagePath,
  });

  final String plantNameEnglish;
  final String plantNameTamil;
  final String scientificName;
  final double confidence;
  final String uses;
  final String howToUse;
  final String methods;
  final String precautions;
  final bool fromOfflineDb;
  final String? imagePath;
}
