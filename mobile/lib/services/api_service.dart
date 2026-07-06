import 'package:dio/dio.dart';
import 'package:image_picker/image_picker.dart';
import 'package:medical_ai_assistant/models/chat_models.dart';
import 'package:medical_ai_assistant/services/server_config.dart';

class ApiService {
  ApiService() {
    _dio = _buildDio();
  }

  late Dio _dio;

  void reload() {
    _dio = _buildDio();
  }

  Dio _buildDio() {
    return Dio(
      BaseOptions(
        baseUrl: ServerConfig.origin,
        connectTimeout: const Duration(seconds: 30),
        receiveTimeout: const Duration(seconds: 90),
        headers: {
          'Accept': 'application/json',
        },
      ),
    );
  }

  /// Quick check that the Node server is reachable.
  Future<bool> pingHealth() async {
    try {
      final r = await _dio.get<Map<String, dynamic>>(
        '/health',
        options: Options(
          receiveTimeout: const Duration(seconds: 10),
          sendTimeout: const Duration(seconds: 10),
        ),
      );
      return r.data?['ok'] == true;
    } catch (_) {
      return false;
    }
  }

  Future<MedicalAiResponse> askMedicalAssistant(
    String message, {
    String language = 'en',
  }) async {
    final response = await _dio.post<Map<String, dynamic>>(
      '/api/chat',
      data: {
        'message': message,
        'language': language,
      },
    );
    final data = response.data?['data'] as Map<String, dynamic>? ?? {};
    return MedicalAiResponse.fromJson(data);
  }

  Future<PlantScanResponse> scanPlant(XFile imageFile) async {
    // Web has no dart:io — MultipartFile.fromFile is unsupported there.
    final bytes = await imageFile.readAsBytes();
    if (bytes.isEmpty) {
      throw StateError('Could not read image bytes.');
    }
    final formData = FormData.fromMap({
      'image': MultipartFile.fromBytes(
        bytes,
        filename: imageFile.name.isNotEmpty ? imageFile.name : 'plant.jpg',
      ),
    });

    final response = await _dio.post<Map<String, dynamic>>(
      '/api/plant-detect',
      data: formData,
    );
    final data = response.data?['data'] as Map<String, dynamic>? ?? {};
    return PlantScanResponse.fromJson(data);
  }
}
